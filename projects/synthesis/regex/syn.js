function synRegex () {


	var TIMEOUTCHECKEVERYNITERATIONS = 10000;

	var counter = 0;
	function getCount () { return counter; }

	var pres = [];
	var leaves = [];
	var binops = [];
	var posts = [];
	
	function reset () {
		counter = 0;
		pres = ["", "^"];
		leaves = [""];
		binops = ["", "*", "|", "+"];
		posts = ["", "$"];	
	}
	
	function add (from, to, prepend) {
		if (!from) return;
		for (var x of from)
			if (to.indexOf(x) == -1) { 
				if (prepend) {
					if (to.length) { //want "" first
						var first = to.shift();
						to.unshift(x);
						to.unshift(first);
					} else {
						to.unshift(x);
					}					
				} else {
					to.push(x);
				}
			}
	}

	function addLeaves (examples) {
		var options = ["\\d", "\\w", "\\s", "[a-zA-Z]", "_", ":", ",", ".", "\\.", '"', "'", '!', '@', '#', "\\$", '%', "\\^", '&', '\\*', '\\(', '\\)', '-', '\\+', '_', '=', '~','`', '<','>','\\?', '/', '\\\\'];
		options = options.concat( options.map(function (o) { return o + "+"; }));
		var res = [];	
		var text = examples.map(function (ex) { return ex[0];}).join('');		
		for (var str of options) {

			var v = "(" + str + ")";
			var found = false;
			if (res.indexOf(v) == -1 && leaves.indexOf(v) == -1) {
				for (var ex of examples) {				
					for (var itemGoal of ex[1]) {
							var hit = ex[0].match(new RegExp(v));
							if (hit && hit.length >= 2 && hit[1] == itemGoal) {
								res.push(v);
								found = true;
								break;
							}				
					}
					if (found) break;
				}
			}

			if (res.indexOf(str) == -1 && leaves.indexOf(str) == -1) { 
			  if (text.match(new RegExp(str)))
				res.push(str);
			}
			
		}
		add(res, leaves, false);
	}


	function synRegexNext (data, rgxI, gen) {
	  console.log('searching for', rgxI);
	  var startTimeMS = new Date().getTime();
	  var timer = data.maxAttempts;
	  var timerT = new Date().getTime();
	  var good = false;
	  var dateCheck = TIMEOUTCHECKEVERYNITERATIONS;
	  for (var ast of gen) {
		if (check(ast, data.ioTriplets, rgxI)) {
			yield {
			rgx: ast,
			steps: data.maxAttempts - timer, 
			timeMS: new Date().getTime() - startTimeMS};
		}
		if (!timer--) 
			throw "fail after " + data.maxAttempts + " (last tried: " + ast + ")";
		if (dateCheck-- == 0) {
			dateCheck = TIMEOUTCHECKEVERYNITERATIONS;
			var elapsedTime = (new Date().getTime() - timerT);
			if (elapsedTime > (data.timeout * 1000)) {
				throw "timeout fail after " + data.maxAttempts + " (last tried: " + ast + "), " + elapsedTime + "ms";
			}
		}
	  }
	  //throw 'done'
	}
	
	function synRegexes(data) {
	  var rgxs = [];
	  var nfo = [];	  
	  var gens = [];
	  //function unroll (n)  { return (n == 0) ? [] : [n - 1].concat(unroll(n-1)); }
	  for (var rgxI = 0; rgxI < data.ioTriplets[0][1].length; rgxI++) {
		  var gen = synRegexNext(data, rgxI, reGen(data.depth));
		  var rgxO = gen.next();
		  gens.push(gen);
		  var rgx = rgxO.rgx;
		  if (rgx) {
			var raw = rgx.toString();
			if (raw.length > 2) {
				var clean = raw.substring(1, raw.length - 1).replace("(","").replace(")","");
				add([ clean ], leaves, true);
				console.log("added", clean, leaves);			
			}
		  } else throw "fail on " + rgxI + " (good: " + rgxs.join(', ') + ")";	
		  rgxs.push(rgx);
		  nfo.push(rgxO);
	  }
	  yield {rgxs: rgxs, nfo: nfo};
	  var ans = {rgxs: rgxs.slice(), nfo: nfo.slice()};	
	  for (var rgxI = 0; rgxI < data.ioTriplets[0][1].length; rgxI++) {
	  	console.log('enum rgxI', rgxI); 
	  	for (var rgxOSucc of gens[rgxI]) {
	  			console.log('got', rgxOSucc); 
				ans.rgxs[rgxI] = rgxOSucc.rgx;
				ans.nfo[rgxI] = rgxO;
				yield ans;
		}
	  }	
	}
	
	function syn (data) {
	  reset();
	  if (data.extras) {
	  	add(data.extras.pre, pres, false);
	  	add(data.extras.leaves, leaves, false);
	  	add(data.extras.binops, binops, false);
	  	add(data.extras.posts, posts, false);
	  }
	  addLeaves(data.ioTriplets);
	  
	  console.log({
	  	pres: pres,
	  	leaves: leaves,
	  	binops: binops,
	  	posts: posts
	  });
	  
	  var regexesGen = synRegexes(data);
	  var template = synTemplate(
	  	data.template, data.ioTriplets, data.maxAttempts,
	  	data.splitter ?  data.splitter : "?");
	  for (var regexes of regexesGen) {
	  	yield {rgxs: regexes.rgxs, nfo: regexes.nfo, template: template};
	  }
	}

	
	//var hasParens = false; //only 1 intermediate match (might overlap w/ leaves though)
	function astGenH (depth) {
		if (depth == 0) {
		  for (var leaf of leaves) 
			yield leaf;
		} else {
		  for (var op of binops) //try non-concatenation operators *last* 
			for (var left of astGenH(depth - 1)) {
			  for (var right of astGenH(depth - 1))
				yield "" + left + op + right;
			  if (left != "") {
			    //hasParens = true;
			  	yield "(" + left + ")";
			  	//hasParens = false;
			  }
			}
		}
	}
	
	function reGen(depth) {
		for (var pre of pres) 
		  for (var post of posts)
			for (var body of astGenH(depth)) {
			  counter++;
			  try {			  
			    yield (new RegExp(pre + body + post));
			  } catch (e) {
			    continue;
			  }
			}
	}
	
	function check (re, examples, rgxI) {
		for (var example of examples) {
			var hit = example[0].match(re);
			if (!hit || hit.length < 2) return false;
			if (hit[1] != example[1][rgxI]) return false;
		}
		return true;
	}
	
	
	
	function applyTemplate (template, matches) {
		var res = "";
		for (var sym of template)
			res += typeof(sym) == "string" ? sym : matches[sym];
		return res;
	}
	
	function genTemplateH (rawTemplate, numOptions) {
	  if (rawTemplate.length == 1) yield [rawTemplate[0]];
	  else {
	      var rest = rawTemplate.slice(1)
		  for (var i = 0; i < numOptions; i++)
		     for (var genRest of genTemplateH(rest, numOptions))
		       yield [rawTemplate[0], i].concat(genRest);
	  }
	}
	function genTemplate(rawTemplate, examples, splitter) {
		var template = rawTemplate.split(splitter);
		for (var gen of genTemplateH(template, examples[0][1].length)) {
		  counter++;
		  yield gen;
		}
	}
	function checkTemplate(template, examples) {
		for (var example of examples) {
			if (applyTemplate(template, example[1]) != example[2])
				return false;
		}
		return true;
	}
	function synTemplate(rawTemplate, examples, timeout, splitter) {	
		var c = 0;
		var gen = genTemplate(rawTemplate, examples, splitter);
		for (var template of gen) {
			if (checkTemplate(template, examples)) 
				return template;
			c++;
		}
		throw "could not find template after " + c + " attempts; check for template bug";
	}
	
	
	
	return {reGen: reGen, 
		templateGen: genTemplate, 
		templateApply: applyTemplate, 
		syn: syn, 
		getCount: getCount};

}