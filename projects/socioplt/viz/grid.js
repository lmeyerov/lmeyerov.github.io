function project (arr, field) { return $.map(arr, function (o) { return o[field]; }); }
function filterEnabled(arr) { return $.grep(arr, function (o) { return o.enabled; }); }

//////////////////

//assign row/col  for all data
//filter what rows by filteredLangs
//filter what cols by filteredStatements
//column order by filteredStatements
//row order by value in point.statement
function sortY(points, statement, langs, statements, reverse, alphabetic, cmp) {
  if (!cmp) cmp = function(a,b) { return a.val - b.val; };

  var visibleLangVals = project($.grep(langs, function (o) { return o.enabled; }), "lang");
  var visibleStatementVals = project($.grep(statements, function (o) { return o.enabled; }), "statement");
  
  if (visibleStatementVals.indexOf(statement) == -1) statement = visibleStatementVals[0];  
  
  var visibleData = [];
  for (var i = 0; i < points.length; i++) {
    var pt = points[i];
    var col = visibleStatementVals.indexOf(pt.statement);
    var row = visibleLangVals.indexOf(pt.lang);
    if ((-1 == col) || (-1 == row)) {
      pt.row = -10;
      pt.col = -10;
      pt.enabled = false;
    } else {
      //pt.row = row;
      pt.col = col;
      pt.enabled = true;
      visibleData.push(pt);
    }
  }

  var selectedCol = $.grep(visibleData, function (o) { return o.statement == statement; })
  if (alphabetic) selectedCol.sort(function(a,b) { return (reverse ? -1 : 1) * (a.lang < b.lang ? -1 : a.lang == b.lang ? 0 : 1); });
  else selectedCol.sort(function (a,b) { return (reverse ? -1 : 1) * cmp(a,b); });
  var rowOrder = project(selectedCol, "lang");
  $.each(langs, function (i, lang) { lang.row = rowOrder.indexOf(lang.lang); });
  $.each(statements, function (i, s) { s.col = visibleStatementVals.indexOf(s.statement); });
  $.each(visibleData, function (i, pt) { pt.row = rowOrder.indexOf(pt.lang); });  
}


function clusterStatements(statements) {
  var newOrder = $.map($("#clusters td"), function (e) { return $(e).text().split(",")[0]; });
  var major = $.map($("#clusters td:first-child"), function (e) { return $(e).text().split(",")[0]; });

  for (var i = 0; i < statements.length; i++) {
    var pos = newOrder.indexOf(statements[i].statement);
    if (pos != -1) {
      newOrder[pos] = statements[i];
      statements[i].major = major.indexOf(statements[i].statement) != -1;
    } else {
      console.log("miss: " + statements[i].statement);
    }
  }
  return newOrder;
}


//////////////////////

function makeColor(data) {
  var buckets = 11;
  var vals = project(filterEnabled(data), "val");
  var mn = Math.min.apply(null, vals);
  var mx = Math.max.apply(null, vals);
  var scale = d3.scale.quantile().domain([mn, mx]).range(d3.range(buckets));  
  return function (v) {
    return colorbrewer.RdYlGn[buckets][scale(v)];
  };
}

function makeScale(opts, lBound, uBound, field, store) { 
  var ys = d3.scale.linear().domain([0, filterEnabled(opts).length]).range([lBound, uBound]).clamp(true);
  return function (d) { 
    var res = d[field] < 0 ? -100 : ys(d[field]); 
    if (store) d[store] = res;
    return res;
  }
}

function makeRScale(data, width, height, statements, langs, minV, maxV) {
  if (minV == undefined) minV = 0;
  if (maxV == undefined) maxV = 1;  
  var wBound = width / filterEnabled(statements).length;
  var hBound = height / filterEnabled(langs).length;
  var s = d3.scale.pow().exponent(.5).domain([minV, maxV]).range([1, 0.33 * Math.min(wBound, hBound)]).clamp(true);
  return function (d, v) {
    var res = s(v);
    d.dr = res;
    return res;
  };
}

function makeTooltip() {
  return d3.select("chart")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("display","inline")
    .style("visibility", "hidden")
    .style("background-color","black")
    .style("color","white")
    .style("padding","1em")
    .style("opacity",".7")
    .text("a simple tooltip");
}

function makeSettings (langs, rowOffset, height, statements, colOffset, width, data, minV, maxV) {
  return {  yScale: makeScale(langs, rowOffset, height, "row", "dy"),
            xScale: makeScale(statements, colOffset, width, "col", "dx"),
            color: makeColor(data),
            rScale: makeRScale(data, width, height, statements, langs, minV, maxV) };
}

/////////////////////////////

var colOffset = 400, rowOffset = 200, duration = 1000, maxFontSize = 30;


$(function () {

  var svg = d3.select("chart").append("svg")
      .attr("width", width)
      .attr("height", height)    
      .style("float", "left");
  
  //height = height - rowOffset;
  //width = width - colOffset;

  var rawData = loadData();
    
  //bindings with these
  var reverse = false;
  langs = rawData.langsObj;
  statements = clusterStatements(rawData.statementsObj);  //flag major
  //statements = rawData.statementsObj;
  var curSort = statements[0].statement;
  data = rawData.points;
  var dataEnabled; //filter setup by resort
  var alphabetic = true;
  var s; //scale settings


  //sortY(rawData.points, curSort, langs, statements, reverse, alphabetic);

  var tooltip = makeTooltip();

  resort = function () {    

        sortY(rawData.points, curSort, langs, statements, reverse, alphabetic);

        var minV, maxV;
        if (window.getRad) {
          var r = getRad();
          minV = r.minV;
          maxV = r.maxV;
        }            
        s = makeSettings(langs, rowOffset, height, statements, colOffset, width, data, minV, maxV);
    
        svg.selectAll("circle").data(data)
          .enter()
            .append("circle")
            .attr("display","none")
            .style("stroke-width", "1px")
            .style("stroke-opacity", ".3")
            .on("click",function (d) {                 
                alphabetic = false;
                if (curSort == d.statement) {
                  reverse = !reverse;
                } else {
                  curSort = d.statement;
                  reverse = true;
                }
                resort(d); 
            })
            .on("mouseover", function(d){ tooltip.text(d.lang + " x " + d.statement + ": " + (Math.round(100 * d.val)/100.0) );  return tooltip.style("visibility", "visible");})
            .on("mousemove", function(){ return tooltip.style("top", (d3.event.pageY + 50)+"px").style("left",(d3.event.pageX - 50)+"px");})
            .on("mouseout", function(){return tooltip.style("visibility", "hidden");});

    
        dataEnabled = filterEnabled(data);        
        svg.selectAll("circle").data(dataEnabled)
          .attr("display","auto")
          .exit()
            .attr("display","none");
      
        var pts = svg.selectAll("circle").data(dataEnabled)
          .attr("fill", function (d) { return s.color(d.val);});
        (dataEnabled.length < 6000 ? pts.transition().duration(duration) : pts) 
            .style("opacity", opacity)
            .attr("r", function (d) {  return s.rScale(d, Math.abs(d.val)); })
            .attr("cx", s.xScale)
            .attr("cy", s.yScale);

        
        //y axis (languages)
        var langD = svg.selectAll("text.lang").data(filterEnabled(langs));
        langD.enter()
              .append("svg:text")   
              .attr("class","lang")
              .attr("display","none")
              .attr("text-anchor", "left")
              .style("fill", "orange")
              .attr("x", "0px")
              .text(function(d) { return d.lang; })
              .on("click", function () {
                if (alphabetic) {
                  reverse = !reverse;
                } else {
                  alphabetic = true;
                  reverse = true;
                }
                resort();
              })
        langD.exit()
              .attr("display","none");
        var maxL = 0;
        $.each(filterEnabled(langs), function (i, l) { maxL = Math.max(maxL, l.lang.length); });
        var fs =  Math.min(maxFontSize,Math.round(((height-rowOffset) / (1.0*filterEnabled(langs).length))));
        fs = Math.max(Math.min(fs, colOffset / (1.0*maxL)), 6);
        langD
          .attr("display","auto")
          .style("font-size", "" + fs + "px")
//          .attr("x", "0px")
          .each(function(d) { d.fs = fs; })
          .transition()
            .duration(duration)
            //.attr("x", function (d) {  return colOffset - 0.7 * maxL * fs; })
            .attr("y", s.yScale)
            .text(function (d) { return d.lang; });
            
            
        //x axis (statements)
        var stateD = svg.selectAll("text.state").data(filterEnabled(statements));
        stateD.enter()
              .append("svg:text")   
              .attr("display","none")
              .attr("class","state")
              .attr("text-anchor", "center")
              .style("fill", "orange")
              .attr("y", rowOffset + "px")
              .text(function(d) { return d.statement; })              
              .on("click",function (d) {                 
                alphabetic = false;
                if (curSort == d.statement) {
                  reverse = !reverse;
                } else {
                  curSort = d.statement;
                  reverse = true;
                }
                resort(d); 
              });              
              
        stateD.exit()
              .attr("display","none");
        var maxS = 0;
        $.each(filterEnabled(statements), function (i, s) { maxS = Math.max(maxS, s.statement.length); });
        var fsS =  Math.min(maxFontSize,Math.round(((height-rowOffset) / (1.0*filterEnabled(statements).length))));
        fsS = Math.max(Math.min(fsS, rowOffset / (1.0*maxS)), 6);
        stateD
          .attr("display","auto")
          .style("font-size", "" + fsS + "px")
//          .attr("x", "0px")
          .each(function(d) { d.fs = fsS; })
          .transition()
            .duration(duration)
            //.attr("x", function (d) {  return colOffset - 0.7 * maxL * fs; })
            .attr("transform",function(d){ return "rotate(-45, " + s.xScale(d) + ", " + rowOffset + ")";})
            .attr("x", s.xScale)
            .text(function (d) { return d.statement; });
  }

  var minV, maxV;
  if (window.getRad) {
    var r = getRad();
    minV = r.minV;
    maxV = r.maxV;
  }            
  var s = makeSettings(langs, rowOffset, height, statements, colOffset, width, data);

  //////////////// toggles      



  var ss = d3.select("statements").append("div").data(statements).enter()
    .append("div").style("padding",".1em")
    .attr("class",function (d) {  return "statement" + (d.major ? " major" : ""); })
  ss.append("input")
    .attr("type","checkbox")
    .attr("value", function (d) { return d.statement; })
    .attr("class","state")
    .on("click", function (o) { 
      var delta = o.enabled != this.checked;
      o.enabled = this.checked;
      if (delta) resort();
    });
  ss.append("span").text(function (d) { return d.statement; });

  var ls = d3.select("languages").data(langs).enter().append("div")
    .style("padding",".5em")
    .style("display","inline-block")
    .attr("class","lang");
  ls.append("input")
    .attr("type","checkbox")
    .attr("value", function (d) { return d.lang; })
    .on("click", function (lang) { 
      if (lang.enabled != this.checked) {
        lang.enabled = this.checked;          
        resort();     
      }      
    });
  ls.append("span")
    .text(function (d) { return d.lang; });
    
  ///////////////////////// fisheye
  
  var fisheye = d3.fisheye()
    .radius(200)
    .power(3);

  var ft = $('#fisheye');
  ft[0].checked = false;
  var ftOn = ft[0].checked;
  ft.click(function() { ftOn = this.checked; });


  var ftx = $('#fisheyex');
  ftx[0].checked = false;
  var ftxOn = ftx[0].checked;
  ftx.click(function() { ftxOn = this.checked; });

  var fty = $('#fisheyey');
  fty[0].checked = false;
  var ftyOn = fty[0].checked;
  fty.click(function() { ftyOn = this.checked; });
  
  svg.on("mousemove", function() {
    if (s && dataEnabled) {
      fisheye.center(d3.mouse(this));
      var x = d3.mouse(this)[0];
      var y = d3.mouse(this)[1];

      if (ftOn) {
        svg.selectAll("circle").data(dataEnabled)
            .each(function(d) { d.display = fisheye({ x: d.dx, y: d.dy}); })
            .attr("cx", function(d) { return d.display.x; })
            .attr("cy", function(d) { return d.display.y; })
            .attr("r", function(d) { return d.dr * d.display.z; });
      }

      if (ftyOn) {
        svg.selectAll("text.lang").data(filterEnabled(langs))
            .each(function(d) { d.display = fisheye({ x: x, y: d.dy}); })
            .style("font-size", function (d) { return "" + (d.fs * d.display.z) + "px";})
            .attr("y", function(d) { return d.display.y; });
      }

      if (ftxOn) {
        svg.selectAll("text.state").data(filterEnabled(statements))
            .each(function(d) { d.display = fisheye({ x: d.dx, y: y}); })
            .style("font-size", function (d) { return "" + (d.fs * d.display.z) + "px";})
            .attr("x", function(d) { return d.display.x; })
            .attr("transform",function(d){ return "rotate(-45, " + d.display.x + ", " + rowOffset + ")";});
      }
    }
  });
});
