



var blockTypes = /^(block|table|list-item|-moz-box)$/;
var inlineTypes = /^(inline|inline-table|inline-block|input|-moz-inline-stack)$/;

var looksLikeJS = /(function(\s)*\()|(\/\*(.*)\*\/)|(function(\s)+[a-zA-z]([a-zA-Z0-9]*)(\s*)\()|(\{(\s*)"([a-zA-Z0-9_]*)":)|(<!--)|(\svar(\s+)([a-zA-Z0-9_]+)(\s+)=(\s))|(\{(\s*)'([a-zA-Z0-9_]*)':)/;
var looksLikeCSS = /(width:)|(height:)|( href=)|( HREF=)|(src=")|(src=\\")/;


try
{
    otherAttrs.push("refName");
}
catch(e)
{
    otherAttrs = ["refName"];
}

function getComputedStyleHelper (o, property){
  if (o.currentStyle) return o.currentStyle[property];
  var computed = document.defaultView.getComputedStyle(o, null);
  property = property == 'cssFloat' || property == 'styleFloat' ? 'float' : property;
  return (computed) ? computed.getPropertyValue([property]) : null;
}


function getStructure (d) {

  //if (d.tagName == 'script' || d.tagName == 'style') return undefined;

  //console.log('get struct of ' + d.tagName);
  var str = "";
  for (var i = 0; i < d.childNodes.length; i++) {
    str += ", " + d.childNodes[i].tagName + "[" + (d.childNodes[i].childNodes ? d.childNodes[i].childNodes.length : 0) + "]";
  }
  //console.log("children: " + str);
  var maybeStyle = false;
  try {    
    //maybeStyle = window.getComputedStyle(d, null).getPropertyValue('display');
    maybeStyle = getComputedStyleHelper(d, 'display');    
    //if (maybeStyle == 'none') { return undefined; }
  } catch (e) {
    //console.log('display exn on ' + d.tagName);
    return getUndefinedStructure(d);
  }
  var maybeFloat = false;
  try {    
    var floating = getComputedStyleHelper(d, 'float');    
    if (floating == 'left' || floating == 'right') { maybeFloat = true; }
  } catch (e) {
    console.log('float exn on ' + d.tagName);
    return getUndefinedStructure(d);
  }  
  var res = {tagName: d.tagName, addedStyles: d.addedStyles, display: maybeStyle, float: maybeFloat, children: []};
  for(var i = 0; i < otherAttrs.length; i++)
  {
    try {
    if(d.getAttribute(otherAttrs[i]))
        res[otherAttrs[i]] = d.getAttribute(otherAttrs[i]);
    } catch (e) {
      logger.log('Text node', d);
      return getUndefinedStructure(d);
    }
  }
  if (d.childNodes) {
    for (var i = 0; i < d.childNodes.length; i++) {
      try {
        var c = getStructure(d.childNodes[i]);
        if (c && !(c == undefined)) { res.children.push(c); }
      } catch (e) {
        //console.log('exn on child: ' + e);
      }
    }
  }
  return res;
}

function getStructureMain (d, frames) {
  var res = getStructure(d);
  if (frames) {
    for (var i = 0; i < frames.length; i++) 
      try {
      res.children.push(getStructure(frames[i].document.getElementsByTagName('body')[0]));
      } catch (e) { console.log('could not get a frame: ' + e); }
  }
  return res;
}

function negTablePass (o, dt, ft, match) {
  if (!o || o == undefined) console.log('neg o is null');
  var injected = false;
  var removed = false;
  
    var inject = null;
    for (var i = 0; i < o.children.length; i++) {
      if (o.children[i]) {
        if (!o.children[i].display.match(match)) {
          if (!inject) {
             inject = {
               tagName: "anon DT",
               display: dt,
               float: ft,  
               children: [o.children[i]]             
             };
             o.children[i] = inject;
             injected = true;
          } else {
            inject.children.push(o.children[i]);
            o.children[i] = null; //removed later
            removed = true;
          }        
        } else {
          inject = null;
        }
      }
    }
  return [injected,removed];
}

function normalizeFlow (o) {
  if (!o || o == undefined) console.log('norm f o is null');

  var hasInline = false;
  var hasBlock = false;
  for (var i = 0; i < o.children.length; i++) {
    var c = o.children[i];
    if ( !c.float ) { //looks buggy..
      hasInline |= null != c.display.match(inlineTypes);
      hasBlock |= null != c.display.match(blockTypes);
      if (!hasInline && !hasBlock && !c.display.match(/^(table-cell|table-row|table-row-group|table-header-group|table-caption|table-column)$/)) {
        console.log("unknown normalize dt: " + c.display);
      }
    }
  }
  switch (o.display) {
    case 'inline':
      if (!hasBlock) {
        o.inlines = true;
        return o;
      } else {
        var root = {
          tagName: "root",
          display: 'block',
          float: false,
          inlines: false,
          children: []        
        };
        
        var inlineGroup = null;  
        for (var i = 0; i < o.children.length; i++) {
          var c = o.children[i];
          switch (o.display) {
            case 'inline':
            case 'inline-block':
            case 'inline-table':
              if (!inlineGroup) {
                inlineGroup = {
                  tagName: "anonblock",
                  display: 'block',
                  float: false,
                  inlines: true,
                  children: [c]
                };
                root.children.push(inlineGroup);              
              } else {
                //no need to zero
                inlineGroup.children.push(c);
              }
              break;
            case 'block':
            case 'table':
              inlineGroup = null;
              root.children.push(c);
            case 'none':
              break;
            default:
              console.log("unexpected display " + o.display);
          }
        }
        return root;
      }
      break;
    case '-moz-box':
    case 'block':
    case 'inline-block':
    case '-moz-inline-stack':
    case 'table-cell':
    case 'list-item':
    case 'table-caption':
      if (!hasBlock || !hasInline) {
        if (hasInline) o.inlines = true;
        else o.inlines = false;
        return o;
      } else {
        o.inlines = false;
        var hasNulls = false;
        var inlineGroup = null;  
        for (var i = 0; i < o.children.length; i++) {
          switch (o.children[i].display) {
            case 'inline':
            case 'inline-block':
            case 'inline-table':
            case 'input':
              if (!inlineGroup) {
                inlineGroup = {
                  tagName: "anonblock",
                  display: 'block',
                  float: false,
                  inlines: true,
                  children: [o.children[i]]                  
                };
                o.children[i] = inlineGroup;              
              } else {
                inlineGroup.children.push(o.children[i]);
                o.children[i] = null;
                hasNulls = true;
              }
              break;
            case 'block':
            case 'table':
            case 'list-item':
              inlineGroup = null;
            case 'none':
              break;
            default:
              console.log("unexpected inline child " + o.children[i].display);
          }
        }
        //TODO erase nulls
        if (hasNulls) {
          var newChildren = [];
          for (var i = 0; i < o.children.length; i++) if (o.children[i]) newChildren.push(o.children[i]);
          o.children = newChildren;
        }
        return o;
      }
      break;
    case 'table':
    case 'inline-table':
    case 'table-row':
    case 'table-header-group':
    case 'table-row-group':
    case 'table-column':
    case 'none':
      return o;
      break;
    default:
      console.log("unknown n case " + o.display);
      return o;
      break;
  }                                                       
  
}

function normalize (o) {
  if (!o || o == undefined) console.log('norm o is null');  
  var res = {children: [], tagName: o.tagName, float: o.float, text: o.text, nodeType: 1, x: 0, y: 0};
  for(var i = 0; i < otherAttrs.length; i++)
  {
    if(o[otherAttrs[i]])
        res[otherAttrs[i]] = o[otherAttrs[i]];
  }
 
  if(o.addedStyles){
    for(var i in o.addedStyles){
      res[i] = o.addedStyles[i];
    }
  }
  if (o.children) {
    for (var i = 0; i < o.children.length; i++) {
      res.children.push(normalize(o.children[i]));
    }
  }
  var children = res.children;
  
  var hasBlocks = false;
  var hasInlines = false;
  var hasCells = false;
  var hasRows = false;
  var hasNotRows = false;
  var hasNotCells = false;
  var hasNulls = false;
 
  //floats are blocks
  res.display = res.float ? 'block' : o.display;
  if (res.float) {
    if (res.display != 'block') console.log('had to convert float to block from ' + o.display);
    res.display = 'block';
  }

  for (var i = 0; i < children.length; i++) {
    var c = children[i];
    hasBlocks |= c.float || (null != c.display.match(blockTypes));
    hasInlines |= !c.float && (null != c.display.match(inlineTypes));
    switch (c.display) {
      case 'none': 
        break;
      case 'inline':
      case 'inline-block':
      case 'inline-table':
      case 'table-header-group':
      case 'table-row-group':
      case 'table-caption':
      case 'table':
      case 'block':
      case '-moz-box':
      case '-moz-inline-stack':
      case 'list-item':
      case 'table-column':
        hasNotRows = true;
        hasNotCells = true;
        break;
      case 'table-cell':
        hasCells = true;
        hasNotRows = true;
        break;
      case 'table-row':
        hasRows = true;
        hasNotCells = true;
        break;
      default:
        console.log("unknown display type:" + c.display);
        throw 'err';
    }    
  }

//1  
  if (res.display != 'table-row' && hasCells) {
    var normalized = posTablePass(res, 'table-row', false, /^(table-cell)$/);
    if (!normalized[0]) console.log("Did not actually create any rows above cells");
//    console.log('created table-row');    
    hasNulls |= normalized[1];

    hasNotCells = true;
    hasRows = true;
    hasCells = false;
  }

//2a
  if (hasRows && !res.display.match(/^(table|inline-table|table-header-group|table-footer-group|table-row-group)$/)) {
    var normalized = posTablePass(res, 'table', false, /^(table-row|table-row-group|table-header-group|table-footer-group|table-column|table-column-group|table-caption)$/);
    if (!normalized[0]) console.log("Did not actually create a table above a row");
//    console.log("Created table");
    hasNotRows = true;
    hasNulls |= normalized[1];
  }     
//2b
  else if (hasRows && res.display == 'inline') {
    var normalized = posTablePass(res, 'inline-table', false, /^(table-row|table-row-group|table-header-group|table-footer-group|table-column|table-column-group|table-caption)$/);
    hasNotRows |= normalized[0];
    hasNotCells |= normalized[0];
    hasNulls |= normalized[1];
  }
//6  
  var has6Rows = false;
  if (res.display.match(/^(table|inline-table)$/) && hasNotRows) {
    var normalized = negTablePass(res, 'table-row', false, /^(table-row-group|table-header-group|table-footer-group|table-caption|table-column|table-column-group|table-row)$/);
    hasNotCells |= normalized[0];
    hasNulls |= normalized[1];
    has6Rows = true;
  }
//7
  var has7Rows = false;
  if (res.display.match(/^(table-row-group|table-header-group|table-footer-group)$/)) {
    var normalized = negTablePass(res, 'table-row', false, /^(table-row-group|table-header-group|table-footer-group|table-caption|table-column|table-column-group|table-row)$/);
    hasNotCells |= normalized[0];
    hasNulls |= normalized[1];
    has7Rows = true;
  }

  //8a
  if (has6Rows || has7Rows) {
    for (var i = 0; i < res.children.length; i++) {
      if (res.children[i] && (res.children[i].display == 'table-row')) {      
        var tr = res.children[i];      
        var normalized = negTablePass(tr, 'table-cell', false, /^table-cell$/);      
        if (normalized[1]) {
          var newTRChildren = [];
          for (var j = 0; j < tr.children.length; j++)  {
            if (tr.children[j]) {
              newChildren.push(tr.children[j]);
            }
          }
          tr.children = newTRChildren;
        }                                                         
      }
    }
  }   
//8b  
  if ((res.display == 'table-row') && hasNotCells) {
    var normalized = negTablePass(res, 'table-cell', false, /^table-cell$/);
    hasNulls |= normalized[1];
  }
  if (hasNulls) {
    var newChildren = [];
    for (var i = 0; i < children.length; i++) if (children[i]) newChildren.push(children[i]);
    children = [];
    res.children = children;
  }
  
  var preRes = normalizeFlow(res);
  for (var i = 0; i < preRes.children.length; i++) {
    preRes.children[i].parentNode = preRes;
  }
  return preRes;
}

function posTablePass (o, dt, ft, match) {
  if (!o || o == undefined) console.log('pos o is null');
  var injected = false;
  var removed = false;
  
    var inject = null;
    //TODO make hasCells first matched index?
    for (var i = 0; i < o.children.length; i++) {
      if (o.children[i]) {
        if (o.children[i].display.match(match)) {
          if (!inject) {
             inject = {
               tagName: "anon DT",
               display: dt,
               float: ft,               
               children: [o.children[i]]
             };
             o.children[i] = inject;
             injected = true;
          } else {
            inject.children.push(o.children[i]);
            o.children[i] = null; //removed later
            removed = true;
          }        
        } else {
          inject = null;
        }
      }
    }    
  return [injected,removed];
}


function getUndefinedStructure (d) {
  if (d.tagName) console.log("  unknown " + d.tagName);
  //else console.log("unknown '" + d.tagName + "' with no tag and " + d.childNodes.length + " children");

  if (d.nodeType == 3 && !d.nodeValue.match(/^(\s)*$/) && !d.nodeValue.match(looksLikeJS) && !d.nodeValue.match(looksLikeCSS)) {
    if (d.nodeValue.length > 500) console.log("LONG TEXT: " + d.nodeValue.substr(0, 1000));
  }
   
  //if (d.nodeType == 3 && (d.nodeValue.match(looksLikeJS) || d.nodeValue.match(looksLikeCSS))) console.log(d.nodeValue.substr(0, 50));

  //if (d.nodeType == 3 && d.nodeValue.length > 1000 && !d.nodeValue.match(looksLikeJS) && !d.nodeValue.match(looksLikeCSS)) console.log(d.nodeValue.substr(0, 100));

  return (
    (d.nodeType == 4 || d.nodeType == 8) ? undefined :
    (d.nodeType == 3 && !d.nodeValue.match(/^(\s)*$/) && !d.nodeValue.match(looksLikeJS) && !d.nodeValue.match(looksLikeCSS)) ? {tagName: "text", display: 'inline', float: false, children: [], text: ' ' + d.nodeValue} :
    (d.nodeType == 3) ? undefined :
    (d.childNodes.length == 0 ) ? undefined :
    (d.childNodes.length == 1) ? getStructure(d.childNodes[0])  : (function () {
           
      var res = {tagName: 'unknown', addedStyles: d.addedStyles, display: 'block', float: false, children: []};
      for(var i = 0; i < otherAttrs.length; i++)
      {
        if(d.getAttribute(otherAttrs[i]))
            res[otherAttrs[i]] = d.getAttribute(otherAttrs[i]);
      }
 
      for (var i = 0; i < d.childNodes.length; i++) {
        var c = getStructure(d.childNodes[i]);
        if (c != undefined ) res.children.push(c);
      }
      return res;
    })());
}


function convertPage(root){
  var body = Sizzle(root)[0];
  return normalize(getStructureMain(body, null));
}
