function tdToLang (td) { return $(td).text().split(" (")[0]; }

function tdToDist (td) { return parseFloat($(td).text().split(" (")[1].split(")")[0]); }

function recluster(k, langs, langMap) {
  var sel = "#clusters" + k + " tr";
  $(sel).each(function (i) {
    $("tdd", this).each(function (j) {
      var l = langMap[tdToLang(this)];
      l.d = tdToDist(this);
      l.k = i;
    });
  });
}

function layout (langs) {
  var k = 0;
  $.each(langs, function (i, e) { k = Math.max(k, e.k);});
  k++;
  
  d3.select("body").data(langs)
    .enter()
      .append("span")
      .text(function(d) { return d.lang; })
      .attr("cw", function () { d.w = $(this).width(); });  
}

function calcDist() {
    var sum = 0;
    $("#active .data tdd").each(function () { sum += tdToDist(this); });
    $("#dist").text( Math.round(100.0 * sum / $("#active tdd").length) / 100.0);
}



var k;
var oldR;



var buckets = 11;
var scale = d3.scale.quantile().domain([0, 100]).range(d3.range(buckets));  
var color = colorbrewer.RdYlGn[buckets];
function scaleColor (rgb, s) {
  var cols = $.map(rgb.split("(")[1].split(")")[0].split(","),parseFloat);
  var r = $.map(cols, function (v) { return Math.round(v * s); });
  return "rgb(" + r[0] + "," + r[1] + "," + r[2] + ")";
}
function heat (c) {
  return scaleColor(color[scale(c)], 0.7);
}



function makeClick(newK) {
  return function click () {
  
    if (oldR) oldR.removeClass("selected");
    $(this).addClass("selected");
    oldR = $(this);
  
    $("#activeSupport *").remove();
    var i = 0; 
    for (; i < this.parentNode.childNodes.length; i++) {
      if (this.parentNode.childNodes[i] == this) break;
    }
    var tr = $("#support" + newK + " ul").show()[ (i-1)/2 ];    
    var tr2;
    if ($("li",tr).length == 0) {
      tr2 = $(tr).clone();
      tr2.text("(nothing significant across multiple items in this cluster)");
    } else {
      tr2 = $(tr).clone();
      tr2.prepend("(Avg rank, avg error, item)");
    }
    
    $("#activeSupport").append(tr2);
    $("#activeSupport").hide();
    $("#activeSupport").fadeIn(300);
    
    $("#activeSupport li").each(function (i) {
      var c = parseInt($(this).text().split(" (")[0]);
      $(this).css("background-color", heat(c));
    });
  
  };
}

function swap (newK) {
  var oldD = $("#clusters" + k);
  var newD = $("#clusters" + newK);
  
 
  $("#clusters" + newK + " trd").click(makeClick(newK));
  
  $("#clusters" + newK + " trd").hover(function() {
      if (oldR != $(this)) makeClick(k).apply(this);      
    });
  
  
  oldD.fadeOut(300, function() { 
    $("#data").append(oldD); 
    $("#active").append(newD);
    newD.fadeIn(300, function () {
      $("#k").text(newK);
      calcDist();
    });
    
    makeClick(k).apply($("#active trd")[0]);
    
  });
  k = newK;
}

$(function(){
  //======= bottom tables
  var data = [];
  $('trd').each(function (i) {
    var cluster = [];
    data.push(cluster);
    for (var j = 0; j < this.childNodes.length; j++) {
      var t = $(this.childNodes[j]).text();      
      if (isNaN(parseFloat(t.split(",")[1]))) continue;
      cluster.push({name: t.split(",")[0], dist: parseFloat(t.split(",")[1])});
    }        
  });

  var maxDist = 1;
  for (var i = 0; i < data.length; i++)
    for (var j = 0; j < data[i].length; j++) {
      var old = maxDist;
      maxDist = Math.max(maxDist, data[i][j].dist);
      //if (isNaN(maxDist)) alert(data[i][j].dist);
    }
  
  
  $('tdd').each(function (i) {
      var t = $(this).text();
      var v = {name: t.split(",")[0].replace("\(","[").replace("\)","]"), dist: parseFloat(t.split(",")[1])};
      var c = "hsl(200,100%," + Math.round(50.0*(1.0 - v.dist/(0.0 + maxDist))) +"%)";
      $(this).css("backgroundColor", c);
      $(this).text(v.name + " (" + v.dist + ")");      
    });
    
  //======= interactive
  
  $('tabled').hide();
  var ks = $('tabled').length;
  var smallestK = $('tabled:first-child trd').length; //no + 1 (jquery??)
  var biggestK = $("trd",$('tabled')[ks - 1]).length + 1;

  $("#increase").click(function () { if (k <= biggestK) swap(k + 1); });
  $("#increaseBig").click(function () { if (k <= biggestK - 5) swap(k + 5); });
  $("#decrease").click(function () { if (k > smallestK) swap(k - 1); });
  $("#decreaseBig").click(function () { if (k >= smallestK + 5) swap(k - 5); });
  
  k = 5;
  $('#k').text(k); //init
  $("#active").append($("#clusters" + k));  
  $("#clusters" + k).show();
  calcDist();
    
    
  swap(k);  
  makeClick(k).apply($("#active trd")[0]);
  
});