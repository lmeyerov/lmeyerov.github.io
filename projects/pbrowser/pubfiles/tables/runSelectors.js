function runSelectors(){
    styleRules =  getStyles();
    for (var rule in styleRules)
    {
        var nodes = [];  
        if(styleRules[rule].selectorText)
            nodes = Sizzle(styleRules[rule].selectorText);
        else
            nodes.push(styleRules[rule].appliesTo);
        for (var nodeI in nodes){
            node = nodes[nodeI];
            if (!node.addedCSSRules)
                node.addedCSSRules = [];

            node.addedCSSRules.push(styleRules[rule]);
        }

    }
    var nodes = Sizzle("*");
    for(var i in nodes){
        if(nodes[i].addedCSSRules){
            nodes[i].addedCSSRules.sort(cmpRules);
            nodes[i].addedStyles = {};
            for(var j = 0; j < nodes[i].addedCSSRules.length; j++)
            {
                for(var k in nodes[i].addedCSSRules[j].style)
                {                
                    var val = nodes[i].addedCSSRules[j].style[k];
                    if(typeof(val) == "string" && isNaN(Number(k)) && val  != "" && k != "cssText"){
                        nodes[i].addedStyles[k] = val;
                    }
                }
            }
        }
    }

}

function camelCase(str){
    var i = -1;
    while((i = str.search("-")) != -1){
        if(i+1 >= str.length)
            str = str.substr(0,i);
        else
            str = (str.substr(0,i)) + (str[i+1].toUpperCase()) + (str.substr(i+2));
    }
        
    return str;
}

function cmpSpecificity(spec1, spec2){
    for(var i in spec1){
        if(spec1[i] != spec2[i])
            return spec1[i]-spec2[i];
    }
    return 0;
}

function cmpRules(rule1, rule2){
    if(rule1.origin == "author" && rule2.origin == "agent")
        return 1;
    if(rule1.origin == "agent" && rule2.origin == "author")
        return -1;

    if(rule1.important == "important" && rule2.important == "normal")
        return 1;
    if(rule1.important == "normal" && rule2.important == "important")
        return -1;

    var spec = cmpSpecificity(rule1.specificity,rule2.specificity);
    if (spec != 0)
        return spec;

    return rule1.position - rule2.position;
}
function splitPass(selectors, splitString){
    var res = [];
    for (var i in selectors)
    {
        var c  = selectors[i].split(splitString);
        for(var j in c)
            if (c[j] != "")
                res.push(c[j]);
    }

    return res;
}
function countArray(arr, reg)
{
    res = 0;
    for(var i in arr){
        var tmp = arr[i].match(reg);
        res += tmp ? tmp.length : 0;
    }
    return res;
}
function getSpecificity(selector){
   if(!selector)
      return [1,0,0,0];


   var sl = selector.split(",");
   var maxSpec = [0,0,0,0];
   for(j in sl){
       var sel = [];
       sel.push(sl[j]);
       sel = splitPass(sel, " ");
       sel = splitPass(sel, "+");
       sel = splitPass(sel, ">");
       sel = splitPass(sel, "~");
       var d = countArray(sel, /::/g);
       for(i in sel){
           if(sel[i][0] != "*" && sel[i][0] != "[" && sel[i][0] != "." && sel[i][0] != "#" && sel[i][0] != ":") 
               d += 1;
       }
       var b = countArray(sel, /#/g);
       var c = countArray(sel, /\./g) + countArray(sel, /\[*\]/g) + countArray(sel, /[^:]:[^:]/g);

       if(cmpSpecificity([0,b,c,d], maxSpec) > 0)
           maxSpec = [0,b,c,d];
   }
   //TODO: use proper specificity for pseudo-elements

   return maxSpec;

   
}
function checkMedia(rule){
    if (rule.type == 4){
        var found = false;
        for (var medium=0; medium < rule.media.length; medium++){
            if (rule.media[medium].search("screen") != -1){
                found = true;
                break;
            }
        }
        return found;
    }
    return true;
}
function parseCSS(cssText){
    var rules = cssText.split("}");
    var res = [];
    for (var i in rules){
        if(rules[i].match(/^[\s]*$/g)) //Matches empty whitespace
            continue;
        var rule = rules[i].split("{");
        var selectorText = rule[0].trim();
        var ruleText = rule[1];
        res.push({"selectorText":selectorText, "cssText": ruleText});
    }
    return res;
}
function parseStyle(styleText){
    res = {}
    var styles = styleText.split(";");
    for(var i in styles){
        if(styles[i].match(/^[\s]*$/g)) //Matches empty whitespace
            continue;
        var kvpair = styles[i].split(":");
        res[kvpair[0].trim()] = kvpair[1].trim();
    }
    return res;
}

function getStyles(){
    var result = [];
    var index = 0;
    var sheets = document.getElementsByTagName("style"); //not just head; is there a special non-global ordering semantics to inline style tags? (e.g., forward-only?)
    //for (var sheet = 0; sheet < document.styleSheets.length; sheet++){
    for (var sheet = 0; sheet < sheets.length; sheet++){
        //for (var ruleI = 0; ruleI < document.styleSheets[sheet].cssRules.length; ruleI++){
        var rules = parseCSS(sheets[sheet].innerHTML);
        for (var ruleI = 0; ruleI < rules.length; ruleI++){
            //If the rule has a media declaration, make sure it applies to screens
            //var rule = document.styleSheets[sheet].cssRules[ruleI];
            var rule = {};
            rule.style = parseStyle(rules[ruleI].cssText);
            rule.selectorText = rules[ruleI].selectorText;
            rule.type = 1;
            if(!checkMedia(rule))
                continue;
            //Get sorting data	    
            rule.origin = "author";
            //rule.important = document.styleSheets[sheet].cssRules[ruleI].cssText.search("!important") == -1 ? "normal" : "important";
            rule.important = rules[ruleI].cssText.search("!important") == -1 ? "normal" : "important";
            rule.specificity = getSpecificity(rule.selectorText);
            rule.position = index;
            result.push(rule);
            index++;
        }
    }
    //Grab styles from style attributes
    
    var nodes = Sizzle("*[style]");
    for(i in nodes){
        var rule = {};
        rule.origin = "author";
        rule.important = "normal";
        rule.specificity = getSpecificity(null);
        rule.position = index;
        rule.style = parseStyle(nodes[i].getAttribute("style"));
        rule.appliesTo = nodes[i];
        result.push(rule);
        index++;
    }

    /*
    //Set up default stylesheet
    var newStyle = document.createElement("link");
    newStyle.rel="stylesheet"
    newStyle.href = "mozhtmledit.css"
    newStyle.id = "newStyle"
    document.head.appendChild(newStyle);
    var sheet = null;

    while(sheet == null)
    {
        sheet = Sizzle("#newStyle")[0].sheet;
    }

    for(var i = 0; i < sheet.cssRules.length; i++)
    {
        var rule = sheet.cssRules[i];
        if(!checkMedia(rule))
            continue;

        rule.origin = "agent";
        rule.important = "normal";
        rule.specificity = getSpecificity(rule.selectorText);
        rule.position = index;
        result.push(rule);
        index++;
    }
    //document.head.removeChild(newStyle);
    */
    return result;
}


