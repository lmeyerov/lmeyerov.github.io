if (false) logger = {log: function () {}, group: function (){}, groupEnd: function(){}, error: function() {} };
else logger = console;
currentDOM = null;
try{
    attribMap[""] = null;
}
catch(e)
{
    var attribMap = {};
}
function getAttribSafe(node, attrib){
    var attr = attribMap[attrib] ? attribMap[attrib] : attrib;
    var a = node.hasOwnProperty(attr) ? node[attr] : node.addedStyles ? node.addedStyles[attr] : undefined;
    if (!a) return a;
    if (typeof(a) == 'object') return a;
    if (typeof(a) != 'string') return a;
    
    n = parseFloat(a);    
    if (isNaN(n)){
        if (a == "true") return true;
        else if (a == "false") return false;
        else return a;
    } else return n;
}
function getInputAttribSafe(node, attrib, def) {
    var attr = attribMap[attrib] ? attribMap[attrib] : attrib;
    var a = node.hasOwnProperty(attr) ? node[attr] : node.addedStyles ? node.addedStyles[attr] : undefined;

    if (!node.hasOwnProperty(attrib.toLowerCase()) && (!node.addedStyles || !node.addedStyles.hasOwnProperty(attrib))) return def;
    if (!a) return a;
    
    if (typeof(a) == 'object') return a;
    if (typeof(a) != 'string') return a;
    
    n = parseFloat(a);    
    if (isNaN(n)){
        if (a == "true") return true;
        else if (a == "false") return false;
        else return a;
    } else return n;  
    
    
}

function getInputMaybeAttribSafe(node, attrib) { // => [true, undefined] + [false, 'a] 
    var attr = attribMap[attrib] ? attribMap[attrib] : attrib;
    if (node.hasOwnProperty(attr.toLowerCase())) {
      var a = node[attr];
      if (!a) return [false, a];
      if (typeof(a) == 'object') return [false, a];
      if (typeof(a) != 'string') return [false, a];
      
      n = parseFloat(a);      
      if (isNaN(n)){
          if (a == "true") return [false,true];
          else if (a == "false") return [false,false];
          else return [false,a];
      } else return [false,n];
    } else return [true, undefined];
}
function setAttribSafe(node, attrib, val){
    var attr = attribMap[attrib] ? attribMap[attrib] : attrib
    return node[attr] = val;
}
function getChildByRefName (node, refName){
    for (var i = 0; i < node.children.length; i++) {
        if (getAttribSafe(node.children[i], "refname") == refName){
            return node.children[i];
        }
    }
    
    console.error("no child in ", node, "want ", refName);
    for (var i = 0; i < node.children.length; i++) {
      console.error("child " + i + ", ref " + getAttribSafe(node.children[i], "refname"), node.children[i]);
    }
    
    throw("child not found 1: node(" + node.tagName + ", " + getAttribSafe(node, "refname") + ") goal child (" + refName + ")");
}
function getChildren (node, refName, includeText){
    var res = []
    for(var i = 0; i < node.children.length; i++) {
        if (getAttribSafe(node.children[i], "refname") == refName){
            res.push(node.children[i]);
        }
    }
    return res;
}

function isEmptyFtl (m) { return m[0]; }
var isEmptyInt = isEmptyFtl;
var isEmptyBool = isEmptyFtl;
var isEmptyFloat = isEmptyFtl;
var isEmptyColor = isEmptyFtl;
var isEmptyString = isEmptyFtl;

function valueFtl (m) { return m[1]; }
var valueInt = valueFtl;
var valueBool = valueFtl;
var valueFloat = valueFtl;
var valueColor = valueFtl;
var valueString = valueFtl;


function inherit(visit, node) {
  visit(node);
  for (var i = 0; i < node.children.length; i++) {
    var child = node.children[i];
    inherit(visit, child);
  }
}
function synthesize(visit, node) {
  for (var i = 0; i < node.children.length; i++) {
    var child = node.children[i];
    synthesize(visit, child);
  }
  visit(node);
}

function render (node, ctx) {
  if (node.nodeType == 1) {
    logger.log(node.tagName  + "::" + getAttribSafe(node,"w") + " x " + getAttribSafe(node,"h") + ": " + getAttribSafe(node,"x") + ", " + getAttribSafe(node,"y"));
  }
  
  var x = getAttribSafe(node, "x");
  var y = getAttribSafe(node, "y");
  var w = getAttribSafe(node, "w");
  var h = getAttribSafe(node, "h");

  if (isNaN(x) || isNaN(y) || isNaN(w) || isNaN(h)) return;

  var bgc = getAttribSafe(node, "bgcolor");
  var hasStyle =  bgc && bgc.length > 0;
  if (!hasStyle) bgc = getAttribSafe(node, "backgroundcolor");
  hasStyle =  bgc && bgc.length > 0;

  if (hasStyle) {
      ctx.save();
      ctx.fillStyle = bgc;
      ctx.fillRect(x, y, w, h);
      ctx.strokeRect(x, y, w, h);
      ctx.restore();
  } else {
      if (node.nodeType == 1) {
        var x1 = Math.round(x) + 0.5
        var y1 = Math.round(y) + 0.5
        var w1 = Math.round(w)
        var h1 = Math.round(h)
        ctx.strokeRect(x1, y1, w1, h1);
      }
  }

  var text = getAttribSafe(node, "text");
  if (text) {
    var m = ctx.measureText(text);
    ctx.fillText(text, x + w / 2, y + h / 2);
  }

  for (var i = 0; i < node.children.length; i++) {
    var child = node.children[i];
    if (child.nodeType == 1 || child.nodeType == 3)
      render(node.children[i], ctx);
  }
}

function init () {
  displayDoc(0);
}

function displayDoc (docId, allowText) {
  logger.log("Displaying doc " + docId);
  var body = Sizzle("#contents")[0];
  body.style.display = "none";
  runSelectors();
  var root = convertPage("#contents", allowText);
  draw(root.children[docId]);
}


var ctx = null;
var canvas = null;
var paintStarted = false;
//unnecessary in JS
function paintStart(w, h, resizeCanvas) { 
  if (!w || !h) {
    w = 1000;
    h = 1000;
  }
  paintStarted = true; //can ignore normal rendering calls now..
  if (resizeCanvas) {
    canvas.width = w;
    canvas.height = h;
//    canvas.style.width = w;
//    canvas.style.height = h;
  }
//  console.log("canvas",w,h, canvas);
  return 1;
}
function paintDone() { return 1;}
function initFonts () { return 1; }
function runRequests () { return 1; }
function requestGlyphs () { return 1; }

///////////////////////////

function cnv(degRaw) {
  var deg = Math.PI * degRaw / 180.0;
  return deg;
//  if (deg < 0) return deg + 2 * Math.PI;
//  else if (deg > 2 * Math.PI) return deg - 2 * Math.PI;
//  else return deg;
}


function cnv1(degRaw1, degRaw2) {
  return cnv(degRaw1);
  var deg1 = cnv(degRaw1);
  var deg2 = cnv(degRaw2);
  return Math.min(deg1, deg2);
}

function cnv2(degRaw1, degRaw2) {
  return cnv(degRaw2);
  var deg1 = cnv(degRaw1);
  var deg2 = cnv(degRaw2);
  return Math.max(deg1,deg2);
}


function paintArc (x, y, r, alpha, sectorAng, w, bgc, skip) {

//  var alpha = (start + end)/2;
//  var sectorAng = (end - start);
  var start = alpha - sectorAng / 2;
  var end = alpha + sectorAng / 2;
  
  ctx.save();
    try {            

      ctx.fillStyle = bgc;
      ctx.beginPath();

            ctx.lineWidth = 2;
      ctx.strokeStyle = "black";
      
      if (sectorAng == 360) {
        paintArc (x, y, r, 0, 180, w, bgc, true);
        paintArc (x, y, r, 180, 180, w, bgc, true);
      } else {        
        ctx.arc(x, y, r, cnv1(start, end), cnv2(start,end), false);
        ctx.lineTo(x + (r - w) * Math.cos(cnv(end)), y + (r - w) * Math.sin(cnv(end)));
        ctx.arc(x, y, r - w, cnv2(start, end), cnv1(start,end), true);        
        ctx.lineTo(x + r * Math.cos(cnv(start)), y + r * Math.sin(cnv(start)));
        if (!skip) ctx.stroke();
      }
    
      
      
      ctx.closePath();
      ctx.fill();
 
    } catch (e) {
      console.log(["bad ellipse: ", x, y, r, start, end, false, w, bgc, e]);
    }

  ctx.restore();

  return 1;
}

function paintLine (x, y, w, h, bgc) {
  if (isNaN(x) || isNaN(y) || isNaN(w) || isNaN(h)) return;
  if (x == "NaN" || y == "NaN" || w == "NaN" || h == "NaN") return;

  ctx.save();
    try {
      ctx.beginPath();
      ctx.moveTo(x,y);
      ctx.lineTo(w,h);
      ctx.closePath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = bgc;
      ctx.stroke();
    } catch (e) {
      console.log(["bad edge: ", x, y, w, h]);
    }
  ctx.restore();

  return 1;
}

function paintOval (x, y, w, h, bgc, ignore) {

  if (isNaN(x) || isNaN(y) || isNaN(w) || isNaN(h)) return;
  if (x == "NaN" || y == "NaN" || w == "NaN" || h == "NaN") return;

  ctx.save();
    try {
      ctx.beginPath();
      ctx.translate(canvas.width/2, canvas.height/2);
//      ctx.scale(1, (h+0.0)/(w+0.0));
      ctx.arc(x - canvas.width/2, y - canvas.height/2, w, 0, Math.PI*2, false);
      ctx.fillStyle = bgc;
      ctx.fill(x, y, w, h);
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.closePath();
    } catch (e) {
      console.log(["bad ellipse: ", x, y, w, h]);
    }

  ctx.restore();

  return 1;
}

function paintRect (x, y, w, h, bgc) {

  if (isNaN(x) || isNaN(y) || isNaN(w) || isNaN(h)) return;
  if (x == "NaN" || y == "NaN" || w == "NaN" || h == "NaN") return;

  ctx.save();
    if (isNaN(x) || isNaN(y) || isNaN(w) || isNaN(h)) return;  
    var hasStyle =  bgc && bgc.length > 0;
    ctx.lineWidth = 2;
    if (hasStyle) {
      ctx.fillStyle = bgc;
      if (bgc != "#00000000") ctx.fillRect(x, y, w, h);
      ctx.strokeRect(x, y, w, h);
    } else {
      ctx.strokeRect(x, y, w, h);
    }
  
  ctx.restore();

  return 1;
}


///////////////////////////
//old paint
function paint (shape, x, y, w, h, bgc) {

  if (isNaN(x) || isNaN(y) || isNaN(w) || isNaN(h)) return;
  if (x == "NaN" || y == "NaN" || w == "NaN" || h == "NaN") return;

  logger.log(["special paint!", shape, x, y, w, h, bgc]);
  
  ctx.save();
  if  (shape == "rect") {
    if (isNaN(x) || isNaN(y) || isNaN(w) || isNaN(h)) return;  
    var hasStyle =  bgc && bgc.length > 0;
    ctx.lineWidth = 2;
    if (hasStyle) {
      ctx.fillStyle = bgc;
      if (bgc != "#00000000") ctx.fillRect(x, y, w, h);
      ctx.strokeRect(x, y, w, h);
    } else {
      ctx.strokeRect(x, y, w, h);
    }
  } else if (shape == "ellipse") {
    try {
      ctx.beginPath();
      ctx.translate(canvas.width/2, canvas.height/2);
//      ctx.scale(1, (h+0.0)/(w+0.0));
      ctx.arc(x - canvas.width/2, y - canvas.height/2, w, 0, Math.PI*2, false);
      ctx.fillStyle = bgc;
      ctx.fill(x, y, w, h);
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.closePath();
    } catch (e) {
      console.log(["bad ellipse: ", x, y, w, h]);
    }
      
  } else if (shape == "edge") {
    try {
      ctx.beginPath();
      ctx.moveTo(x,y);
      ctx.lineTo(w,h);
      ctx.closePath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#000";
      ctx.stroke();
    } catch (e) {
      console.log(["bad edge: ", x, y, w, h]);
    }
  }
  ctx.restore();

  return 1;
}
////////////////////////
function paintParagraph (text, font, fontSize, x, y, maxWidth, allowOverflow, lineHeight, color, lineSpacing) {
  if (!text || text.trim().length == 0) return;
  
  if (color && color.length > 0) ctx.fillStyle = color;
  ctx.font = (fontSize ? fontSize : 20) + "px " + (font ? font + " " : "");
  var rx = 0;
  var ry = lineHeight; //baseline?
  var space = ctx.measureText(" ").width;
  var lines = ("" + text).trim().split("\n");
  for (var l = 0; l < lines.length; l++) {
    if (rx) { //clear previous line
      rx = 0;
      ry += lineHeight + lineSpacing;
    }
    var words = lines[l].trim().split(" ");
    for (var w = 0; w < words.length; w++) {
      var ww = ctx.measureText(words[w].trim()).width;
      if (maxWidth && rx && ((rx + space + ww) > maxWidth)) {
        ry += lineHeight + lineSpacing;
        ctx.fillText(words[w].trim(), x, y + ry);
        rx = ww;
      } else {
        ctx.fillText((rx ? " " : "") + words[w].trim(), x + rx, y + ry);
        rx += (rx ? space : 0) + ww;
      }
    }
    
  }
}
function getSumWordW (text, font, fontSize) { 
    ctx.font = (fontSize ? fontSize : 20) + "px " + (font ? font + " " : "");

    var lines = ("" + text).trim().split("\n");
    var max = 0;
    for (var n = 0; n < lines.length; n++) {
      var line = ctx.measureText(lines[n].trim()).width;
      if (line > max) max = line;
    }
    return max;
}
function getMaxWordW (text) { 
    ctx.font = (fontSize ? fontSize : 20) + "px " + (font ? font + " " : "");

    var lines = ("" + text).trim().split("\n");
    var max = 0;
    for (var n = 0; n < lines.length; n++) {
      var words = lines[n].split(" ");
      for (var i = 0; i < words.length; i++) {
        var word = ctx.measureText(words[i].trim()).width;      
        if (word > max) max = word;
      }
    }
    return max;
}
function getLineHeight (text, font, fontSize) { 
  ctx.font = (fontSize ? fontSize : 20) + "px " + (font ? font + " " : "");

  return ctx.measureText("m").width; //OMG seriously?
}
function getNumberLines(text, _, _, maxWidth) {
    logger.log("Text: " + text);
    var returns = ("" + text).trim().split("\n");    
    var lines = [];
    var lastPhrase = "";
    function splitWord() {
        var width = ctx.measureText(lastPhrase).width;
        var posA = 0;
        var posZ = 0;
        if (width > maxWidth) {
            for (var n = 0, length = lastPhrase.length; n < length; n ++) {
                var width = ctx.measureText(lastPhrase.substr(posA, posZ ++)).width;
                if (maxWidth && width > maxWidth) {
                    lines.push(lastPhrase.substr(posA, posZ - 2));
                    posA = n - 1;
                    posZ = 2;
                }
            }
            return lastPhrase.substr(posA, posZ + 2);
        }
    };
    for (var n = 0; n < returns.length; n++) {
        if (lastPhrase) lines.push(lastPhrase);
        var phrase = returns[n];
        var spaces = phrase.split(" ");
        var lastPhrase = "";
        for (var i = 0; i < spaces.length; i++) {
            var measure = ctx.measureText(lastPhrase + " " + spaces[i]).width;
            if (!maxWidth || measure < maxWidth) {
                lastPhrase += ((lastPhrase ? " " : "") + spaces[i]);
            } else {
                if (measure > maxWidth) {
                    var split = splitWord();
                    if (split) {
                        lastPhrase = split + " " + spaces[i];
                    } else {
                        lines.push(lastPhrase);
                        lastPhrase = spaces[i];
                    }
                }
            }
            if (i == spaces.length - 1) {
                lines.push(lastPhrase);
                lastPhrase = "";
                break;
            }
        }
    }
    if (lines.length == 1) {
      return (ctx.measureText("" + lines[0]).width == 0) ? 0 : 1;
    } else return lines.length;
};

function sin (x) {
  return Math.sin(x);
}

function cos (x) {
  return Math.cos(x);
}

function PI() {
  return Math.PI;
}

function pow(x,y) {
  return Math.pow(x,y);
}

function max(x,y) {
  return Math.max(x,y);
}

function min(x,y) {
  return Math.min(x,y);
}


//default
function draw (root) {
  currentDOM = root;
  canvas = $('#canvas').get(0);

  coreDraw2(root, canvas);  
  
  if (!paintStarted) { //if layout didn't do its own paint calls
    console.error("Grammars should make their own paint calls!");
    canvas.width = parseFloat(root.getAttribute("w") + 1);
    canvas.height = parseFloat(root.getAttribute("h") + 1);
    render(root, ctx);  
  }
}

function coreDraw2(root,canvas) {
  ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  layout(root);  
  return root;
}

function coreDraw(domRoot,cnv, skipSelectors, skipNormalize, allowText) {
  if (!skipSelectors) runSelectors();
  var jsRoot = (getStructureMain(domRoot, null, allowText));
  if (!skipNormalize) jsRoot = normalize(jsRoot); 
  domRoot.style.display = "none";
  currentDOM = jsRoot;
  canvas = cnv;
  
  coreDraw2(jsRoot, cnv);
  return jsRoot;
}



function demux(node, state) {
  if (node.nodeName == "MUX") {
    var fun = node.getAttribute("selector");
    if (fun) {
      var i = eval(fun);
      return demux(node.childNodes[i], state);
    } else {
      console.log("No Selector for Mux!");
      return demux(node.childNodes[0], state);
    }
  } else {
    var res = node.cloneNode(false);
    for (var i = 0; i < node.childNodes.length; i++) {
      var child = node.childNodes[i];
      res.appendChild(demux(child, state));
    }
    return res;
  }
}
/*
var skipping = false;
function skipDefaultRender () {
  skipping = true;
}
window.addEventListener("load", function () { if (!skipping) init(); }, false);
*/
