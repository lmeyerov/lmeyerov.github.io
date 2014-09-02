//=========== on the second traversal of a table, generate the columns
function addCols(table) {
  var numCols = getAttribSafe(table, "colcount");
  var columns = getChildByRefName(table, "columns");  
  for (var i = 0; i < numCols; i++) {
    var col = {parentNode: columns, tagName: "COL", children: []};
    setAttribSafe(col, "refName", "cols");
    columns.children.push(col);
  }
}

//=========== when visiting a column, find its children by examining rows
var getChildrenRaw;
function patchedGetChildren(col, children) {
  var res = [];
  var table = col.parentNode.parentNode;
  var rows = getChildrenRaw(table, "rows", false);
  var colNum = getAttribSafe(col, "colnum");
  for (var i = 0; i < rows.length; i++) {
    var row = rows[i];
    var cells = getChildrenRaw(row, "childs", false);
    for (var j = 0; j < cells.length; j++) {
      var cell = cells[j];
      if (getAttribSafe(cell, "column") == colNum) {
        res.push(cell);
      }
    }
  }
  return res;      
}
function patchGetChildren(visit_i) {
  return function (node, colv) {
    var oldGet = getChildren;
    getChildrenRaw = getChildren;
    getChildren = patchedGetChildren;
    visit_i(node, colv);
    getChildren = oldGet;
  };
}

//=========== breadth first traversal of a table
function visit_table_col_all(table, visitor) {
  var columns = getChildByRefName(table, "columns");
  for (var i = 0; i < columns.children.length; i++) {
    var node = columns.children[i];
    if (node.tagName.toLowerCase() == "col")
      visitor(node);
  }
}

//=========== helpers to monkey patch visit_i calls
function reroute(visit_i, tag, newv) {
  return function (node) {
    if (node.tagName.toLowerCase() == tag) {
      return newv(node);
    } else return visit_i(node);
  };
}


function ignoreTag (visit_i, tag) { return reroute(visit_i, tag,function(){}); }
function before(visit_i, tag, beforev) { 
  return reroute(visit_i, tag, function (node) {
      beforev(node);
      visit_i(node);
    });
}
function after(visit_i, tag, afterv) { 
  return reroute(visit_i, tag, function (node) {
      visit_i(node);
      afterv(node);
    });
}


function inhTable(i) {
  var ignoredV = ignoreTag(ignoreTag(ignoreTag(window["visit_" + i], "col"), "cols"), "row");
  return reroute(ignoredV, "tablebox", function (table) { 
      window["visit_tablebox_" + i](table);
      window["visit_cols_" + i](getChildByRefName(table, "columns")); 
      var rows = getChildren(table, "rows");
      for (var r = 0; r < rows.length; r++) window["visit_row_" + i](rows[r]);
      (patchGetChildren(visit_table_col_all))(table, window["visit_col_" + i]);
    });
}
function synTable(i) {
  var ignoredV = ignoreTag(ignoreTag(ignoreTag(window["visit_" + i], "col"), "cols"), "row");
  return reroute(ignoredV, "tablebox", function (table) { 
      (patchGetChildren(visit_table_col_all))(table, window["visit_col_" + i]);
      window["visit_cols_" + i](getChildByRefName(table, "columns")); 
      var rows = getChildren(table, "rows");
      for (var r = 0; r < rows.length; r++) window["visit_row_" + i](rows[r]);
      window["visit_tablebox_" + i](table);
    });
}

//========= monkey patch the visit calls
function layout (root) { 
  inherit(inhTable(0), root);  
  
  var old_tablebox_1 = visit_tablebox_1;
  visit_tablebox_1 = function (node) { old_tablebox_1(node); addCols(node); };
  inherit(inhTable(1), root);    
  visit_tablebox_1 = old_tablebox_1;  
  
  synthesize(synTable(2), root);
  inherit(inhTable(3), root);
  inherit(inhTable(4), root);
  synthesize(synTable(5), root);
  inherit(inhTable(6), root);
}
