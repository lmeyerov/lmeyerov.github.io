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
  
  var langs = nodesToSet($("#rankings thead tr td"));
  var statements = nodesToSet($("#rankings thead tr td"));
  
  var data = {}; //lang => statement => val
  var points = [];
  var langToLangID = {};
  for (var l = 0; l < langs.length; l++) {
    data[l] = {};
    langToLangID[langs[l]] = l;
  }
  var statementToStatementID = {};
  for (var s = 0; s < statements.length; s++)
    statementToStatementID[statements[s]] = s;
      
  //data 
  $("#rankings tbody tr").each(function (i) {
    for (var j = 0; j < statements.length; j++) {
      var lang = langs[i];
      var langID = langToLangID[lang];   
  
      var statement = statements[j];
      var statementID = statementToStatementID[statement];
      
      var val = parseFloat($(this.childNodes[j]).text());
  
      if (true && (val > 1 || val < -1)) {
        alert("bad val: " + val);
        val = 0;
      }
      
      data[langID][statementID] = val;
      
      points.push({ lang: lang, 
                    statement: statement, 
                    val: val, 
                    enabled: false});
    }
  });
  
  return {points: points, 
          langsObj: $.map(langs, function (o) { return {lang: o, enabled: false}; }),
          statementsObj: $.map(statements, function (o) { return {statement: o, enabled: false}; })};  
}
