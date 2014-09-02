function nodesToSet(nodes) {
  var res = [];
  (function () {
    var dict = {};
    nodes.each(function (i) {
      var name = $(this).text();
      if (!dict.hasOwnProperty(name)) {
        dict[name] = true;
        res.push(name);
      }      
    });
  })();
  res.sort();
  return res;
}

function loadData() {
  var langIdx = 3;
  var stateIdx = 4;
  var valIdx = 1;
  var devIdx = 0;
  
  var langs = nodesToSet($("#rankings tbody tr td:nth-child(" + (langIdx + 1) + ")"));
  var statements = nodesToSet($("#rankings tbody tr td:nth-child(" + (stateIdx + 1) + ")"));
  
  function rLang(r) { return r.childNodes[langIdx]; }
  function rState(r) { return r.childNodes[stateIdx]; }
  function rVal(r) { return r.childNodes[valIdx]; }
  function rDev(r) { return r.childNodes[devIdx]; }
  
  var data = {}; //lang => statement => val
  var points = [];
  var given = {};
  var langToLangID = {};
  for (var l = 0; l < langs.length; l++) {
    data[l] = {};
    given[l] = {};
    langToLangID[langs[l]] = l;
  }
  var statementToStatementID = {};
  for (var s = 0; s < statements.length; s++)
    statementToStatementID[statements[s]] = s;
      
  //data 
  var rollMax = 0;
  var rollMin = 1000000;
  $("#rankings tbody tr").each(function (i) {
    var lang = $(rLang(this)).text();
    var langID = langToLangID[lang];   
    
    var statement = $(rState(this)).text();
    var statementID = statementToStatementID[statement];

    var val = parseFloat($(rVal(this)).text()); //ranking
    var base = parseFloat($(rDev(this)).text());  //deviation
    if (true && (val > 3000 || val < 0)) {
      alert("bad val: " + val);
      val = 1000;
      base = 1000;
    }
    rollMax = Math.max(rollMax, val);
    rollMin = Math.min(rollMin, val);
    
    data[langID][statementID] = val;
    given[langID][statementID] = 2 * base; //95% confidence: +/- this
    
    points.push({ lang: lang, 
                  statement: statement, 
                  val: val, 
                  base: base,
                  enabled: false});
  });
  
  return {points: points, 
          langsObj: $.map(langs, function (o) { return {lang: o, enabled: false}; }),
          statementsObj: $.map(statements, function (o) { return {statement: o, enabled: false}; }),
          rollMax: rollMax,
          rollMin: rollMin};  
}
