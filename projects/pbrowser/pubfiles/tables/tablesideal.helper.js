//=====
//functional interface to table grid manipulations
//=====

function mtIntPairList () { return []; };

function appendIntPairList (lst, rowSpanColSpanPair) { 
  var rowSpan = rowSpanColSpanPair[0];
  var colSpan = rowSpanColSpanPair[1];  
  return lst.concat([[rowSpan, colSpan]]); 
}

function pairInt (a, b) { return [a, b]; };
function columnsGetCol(data, i) { 
  var cols = data.mapping;
  for (var c = 0; c < cols.length; c++)
    if (cols[c][0] == i) return cols[c][1];
  throw ("did not find a col for cell " + i + " in the row");
}

function emptyColumnList (numCols) { 
 var res = []; //next free row in column i is res[i]
 for (var i = 0; i < numCols + 1; i++) res[i] = 0;
 return {mapping: [], cols: res};
}

function columnsAppendRow(data /* {mapping: [(int,int)]; cols: [ nextFreeRow ]} */, cells /* [ (rowSpan,colSpan) ] */, row /* int */) {
  var mapping  = [];
  var cols = data.cols;
  var nextCol = 0;
  for (var cell = 0; cell < cells.length; cell++) {
    nextCol++;
    var rowSpan = cells[cell][0];
    var colSpan = cells[cell][1];
    while (nextCol < cols.length && cols[nextCol] > row) {
      nextCol++; 
    }
    mapping.push([cell + 1, nextCol]);
    for (var c = 0; c < colSpan && (nextCol + c) < cols.length; c++) {      
      cols[nextCol + c] = Math.max(row + rowSpan, cols[nextCol + c]);
    }
  }
  return {mapping: mapping, cols: cols};
}