function radialrect_r ( _ale_arg0,  _ale_arg1) { return _ale_arg0 / pow(1.8, _ale_arg1); }
function radialrect_child_show ( _ale_arg1,  _ale_arg0) { return _ale_arg0 * _ale_arg1; }
function radialrect_child_maxR ( _ale_arg0) { return _ale_arg0; }
function radialrect_child_level ( _ale_arg0) { return _ale_arg0 + 1; }
function radialrect_child_parentX ( _ale_arg0) { return _ale_arg0; }
function radialrect_child_parentY ( _ale_arg0) { return _ale_arg0; }
function radialrect_w ( _ale_arg1,  _ale_arg2,  _ale_arg0) { return pow(_ale_arg0, _ale_arg1) * 3.0 * _ale_arg2 / 8.0; }
function radialrect_h ( _ale_arg0) { return _ale_arg0; }
function radialrect_xOpen ( _ale_arg1,  _ale_arg2,  _ale_arg0) { return _ale_arg0 + _ale_arg1 * cos(PI() * _ale_arg2 / 180); }
function radialrect_yOpen ( _ale_arg1,  _ale_arg2,  _ale_arg0) { return _ale_arg0 + _ale_arg1 * sin(PI() * _ale_arg2 / 180); }
function radialrect_xClose ( _ale_arg0) { return _ale_arg0; }
function radialrect_yClose ( _ale_arg0) { return _ale_arg0; }
function radialrect_x ( _ale_arg1,  _ale_arg0,  _ale_arg2) { return _ale_arg0 * _ale_arg1 + (1 - _ale_arg0) * _ale_arg2; }
function radialrect_y ( _ale_arg0,  _ale_arg2,  _ale_arg1) { return _ale_arg0 * _ale_arg1 + (1 - _ale_arg0) * _ale_arg2; }
function radial_r ( _ale_arg0,  _ale_arg1) { return _ale_arg0 / pow(1.8, _ale_arg1); }
function radial_child_show ( _ale_arg1,  _ale_arg0) { return _ale_arg0 * _ale_arg1; }
function radial_child_maxR ( _ale_arg0) { return _ale_arg0; }
function radial_child_level ( _ale_arg0) { return _ale_arg0 + 1; }
function radial_child_parentX ( _ale_arg0) { return _ale_arg0; }
function radial_child_parentY ( _ale_arg0) { return _ale_arg0; }
function radial_w ( _ale_arg1,  _ale_arg2,  _ale_arg0) { return pow(_ale_arg0, _ale_arg1) * 3.0 * _ale_arg2 / 8.0; }
function radial_h ( _ale_arg0) { return _ale_arg0; }
function radial_xOpen ( _ale_arg1,  _ale_arg2,  _ale_arg0) { return _ale_arg0 + _ale_arg1 * cos(PI() * _ale_arg2 / 180); }
function radial_yOpen ( _ale_arg1,  _ale_arg2,  _ale_arg0) { return _ale_arg0 + _ale_arg1 * sin(PI() * _ale_arg2 / 180); }
function radial_xClose ( _ale_arg0) { return _ale_arg0; }
function radial_yClose ( _ale_arg0) { return _ale_arg0; }
function radial_x ( _ale_arg1,  _ale_arg0,  _ale_arg2) { return _ale_arg0 * _ale_arg1 + (1 - _ale_arg0) * _ale_arg2; }
function radial_y ( _ale_arg0,  _ale_arg2,  _ale_arg1) { return _ale_arg0 * _ale_arg1 + (1 - _ale_arg0) * _ale_arg2; }
function top_child_alpha () { return 45; }
function top_child_maxR ( _ale_arg0) { return _ale_arg0; }
function top_child_sectorAng () { return 360; }
function top_child_siblingNum () { return 1; }
function top_child_level () { return 1; }
function top_child_show () { return 1.0; }
function top_child_parentX ( _ale_arg1,  _ale_arg2,  _ale_arg0) { return (_ale_arg0 / 2 + _ale_arg1 / 2) * cos(PI() * _ale_arg2 / 180) - _ale_arg1 / 2; }
function top_child_parentY ( _ale_arg1,  _ale_arg2,  _ale_arg0) { return (_ale_arg0 / 2 + _ale_arg1 / 2) * cos(PI() * _ale_arg2 / 180) - _ale_arg1 / 2; }
function top_render ( _ale_arg0,  _ale_arg2,  _ale_arg1) { return paintStart(_ale_arg0, _ale_arg1) + paint("rect", 0, 0, _ale_arg0, _ale_arg1, _ale_arg2); }
///// pass /////
function visit_radialrect_0(node) {
  logger.log("  visit  RadialRect (id: " + node.id + "): " + 0);
  setAttribSafe(node, "r", radialrect_r(getAttribSafe(node, "maxr"), getAttribSafe(node, "level")));
  logger.log("    radialrect_r: " + getAttribSafe(node, "r"));
  logger.log("        maxR: " + getAttribSafe(node, "maxr"));
  logger.log("        level: " + getAttribSafe(node, "level"));
  setAttribSafe(node, "w", radialrect_w(getAttribSafe(node, "level"), getAttribSafe(node, "r"), getAttribSafe(node, "show")));
  logger.log("    radialrect_w: " + getAttribSafe(node, "w"));
  logger.log("        level: " + getAttribSafe(node, "level"));
  logger.log("        r: " + getAttribSafe(node, "r"));
  logger.log("        show: " + getAttribSafe(node, "show"));
  setAttribSafe(node, "h", radialrect_h(getAttribSafe(node, "w")));
  logger.log("    radialrect_h: " + getAttribSafe(node, "h"));
  logger.log("        w: " + getAttribSafe(node, "w"));
  
  (function () {
    var children = getChildren(node, "child", false);
    for (var i = 0; i < children.length; i++) {
      var child = children[i]; 
      setAttribSafe(child, "show", (getAttribSafe(node, "show") * getAttribSafe(child, "open") ));
      logger.log("         step child@show: " + getAttribSafe(child, "show"));
    }
  })();

  
  (function () {
    var children = getChildren(node, "child", false);
    for (var i = 0; i < children.length; i++) {
      var child = children[i]; 
      setAttribSafe(child, "maxr", (getAttribSafe(node, "maxr") ));
      logger.log("         step child@maxR: " + getAttribSafe(child, "maxr"));
    }
  })();

  
  setAttribSafe(node, "child_siblingnum_init", (0));
  setAttribSafe(node, "child_siblingnum_last", getAttribSafe(node, "child_siblingnum_init"));
  logger.log("      init child@siblingNum: " + getAttribSafe(node, "child_siblingnum_init"));
  logger.log("    last init child_siblingnum_last: " + getAttribSafe(node, "child_siblingnum_last"));
    (function () {
    var children = getChildren(node, "child", false);
    for (var i = 0; i < children.length; i++) {
      var child = children[i]; 
      setAttribSafe(child, "siblingnum", (getAttribSafe(i == 0 ? node : children[i-1], i == 0 ? ("child_siblingnum_init") : ("siblingnum")) + 1));
      logger.log("         step child@siblingNum: " + getAttribSafe(child, "siblingnum"));
    }
  })();

  
  (function () {
    var children = getChildren(node, "child", false);
    for (var i = 0; i < children.length; i++) {
      var child = children[i]; 
      setAttribSafe(child, "level", (getAttribSafe(node, "level") + 1));
      logger.log("         step child@level: " + getAttribSafe(child, "level"));
    }
  })();

  
  setAttribSafe(node, "numopenchildren_init", (0));
  setAttribSafe(node, "numopenchildren", getAttribSafe(node, "numopenchildren_init"));
  logger.log("      init numOpenChildren: " + getAttribSafe(node, "numopenchildren_init"));
  logger.log("    last init numopenchildren: " + getAttribSafe(node, "numopenchildren"));
    (function () {
    var children = getChildren(node, "child", false);
    for (var i = 0; i < children.length; i++) {
      var child = children[i]; 
      setAttribSafe(node, "numopenchildren", (getAttribSafe(node, "numopenchildren") + getAttribSafe(child, "show") ));
      logger.log("         step numOpenChildren: " + getAttribSafe(node, "numopenchildren"));
    }
  })();

  return true;
}
function visit_radial_0(node) {
  logger.log("  visit  Radial (id: " + node.id + "): " + 0);
  setAttribSafe(node, "r", radial_r(getAttribSafe(node, "maxr"), getAttribSafe(node, "level")));
  logger.log("    radial_r: " + getAttribSafe(node, "r"));
  logger.log("        maxR: " + getAttribSafe(node, "maxr"));
  logger.log("        level: " + getAttribSafe(node, "level"));
  setAttribSafe(node, "w", radial_w(getAttribSafe(node, "level"), getAttribSafe(node, "r"), getAttribSafe(node, "show")));
  logger.log("    radial_w: " + getAttribSafe(node, "w"));
  logger.log("        level: " + getAttribSafe(node, "level"));
  logger.log("        r: " + getAttribSafe(node, "r"));
  logger.log("        show: " + getAttribSafe(node, "show"));
  setAttribSafe(node, "h", radial_h(getAttribSafe(node, "w")));
  logger.log("    radial_h: " + getAttribSafe(node, "h"));
  logger.log("        w: " + getAttribSafe(node, "w"));
  
  (function () {
    var children = getChildren(node, "child", false);
    for (var i = 0; i < children.length; i++) {
      var child = children[i]; 
      setAttribSafe(child, "show", (getAttribSafe(node, "show") * getAttribSafe(child, "open") ));
      logger.log("         step child@show: " + getAttribSafe(child, "show"));
    }
  })();

  
  (function () {
    var children = getChildren(node, "child", false);
    for (var i = 0; i < children.length; i++) {
      var child = children[i]; 
      setAttribSafe(child, "maxr", (getAttribSafe(node, "maxr") ));
      logger.log("         step child@maxR: " + getAttribSafe(child, "maxr"));
    }
  })();

  
  setAttribSafe(node, "child_siblingnum_init", (0));
  setAttribSafe(node, "child_siblingnum_last", getAttribSafe(node, "child_siblingnum_init"));
  logger.log("      init child@siblingNum: " + getAttribSafe(node, "child_siblingnum_init"));
  logger.log("    last init child_siblingnum_last: " + getAttribSafe(node, "child_siblingnum_last"));
    (function () {
    var children = getChildren(node, "child", false);
    for (var i = 0; i < children.length; i++) {
      var child = children[i]; 
      setAttribSafe(child, "siblingnum", (getAttribSafe(i == 0 ? node : children[i-1], i == 0 ? ("child_siblingnum_init") : ("siblingnum")) + 1));
      logger.log("         step child@siblingNum: " + getAttribSafe(child, "siblingnum"));
    }
  })();

  
  (function () {
    var children = getChildren(node, "child", false);
    for (var i = 0; i < children.length; i++) {
      var child = children[i]; 
      setAttribSafe(child, "level", (getAttribSafe(node, "level") + 1));
      logger.log("         step child@level: " + getAttribSafe(child, "level"));
    }
  })();

  
  setAttribSafe(node, "numopenchildren_init", (0));
  setAttribSafe(node, "numopenchildren", getAttribSafe(node, "numopenchildren_init"));
  logger.log("      init numOpenChildren: " + getAttribSafe(node, "numopenchildren_init"));
  logger.log("    last init numopenchildren: " + getAttribSafe(node, "numopenchildren"));
    (function () {
    var children = getChildren(node, "child", false);
    for (var i = 0; i < children.length; i++) {
      var child = children[i]; 
      setAttribSafe(node, "numopenchildren", (getAttribSafe(node, "numopenchildren") + getAttribSafe(child, "show") ));
      logger.log("         step numOpenChildren: " + getAttribSafe(node, "numopenchildren"));
    }
  })();

  return true;
}
function visit_top_0(node) {
  logger.log("  visit  Top (id: " + node.id + "): " + 0);
  setAttribSafe(getChildByRefName(node,"child"), "show", top_child_show());
  logger.log("    top_child_show: " + getAttribSafe(getChildByRefName(node,"child"), "show"));
  setAttribSafe(getChildByRefName(node,"child"), "siblingnum", top_child_siblingNum());
  logger.log("    top_child_siblingNum: " + getAttribSafe(getChildByRefName(node,"child"), "siblingnum"));
  setAttribSafe(getChildByRefName(node,"child"), "sectorang", top_child_sectorAng());
  logger.log("    top_child_sectorAng: " + getAttribSafe(getChildByRefName(node,"child"), "sectorang"));
  setAttribSafe(node, "render", top_render(getAttribSafe(node, "w"), getAttribSafe(node, "bgcolor"), getAttribSafe(node, "h")));
  logger.log("    top_render: " + getAttribSafe(node, "render"));
  logger.log("        w: " + getAttribSafe(node, "w"));
  logger.log("        bgcolor: " + getAttribSafe(node, "bgcolor"));
  logger.log("        h: " + getAttribSafe(node, "h"));
  setAttribSafe(getChildByRefName(node,"child"), "level", top_child_level());
  logger.log("    top_child_level: " + getAttribSafe(getChildByRefName(node,"child"), "level"));
  setAttribSafe(getChildByRefName(node,"child"), "maxr", top_child_maxR(getAttribSafe(node, "radius")));
  logger.log("    top_child_maxR: " + getAttribSafe(getChildByRefName(node,"child"), "maxr"));
  logger.log("        radius: " + getAttribSafe(node, "radius"));
  setAttribSafe(getChildByRefName(node,"child"), "alpha", top_child_alpha());
  logger.log("    top_child_alpha: " + getAttribSafe(getChildByRefName(node,"child"), "alpha"));
  return true;
}
///// pass /////
function visit_radialrect_1(node) {
  logger.log("  visit  RadialRect (id: " + node.id + "): " + 1);
  
  setAttribSafe(node, "subtreeweight_init", (getAttribSafe(node, "show") ));
  setAttribSafe(node, "subtreeweight", getAttribSafe(node, "subtreeweight_init"));
  logger.log("      init subtreeWeight: " + getAttribSafe(node, "subtreeweight_init"));
  logger.log("    last init subtreeweight: " + getAttribSafe(node, "subtreeweight"));
    (function () {
    var children = getChildren(node, "child", false);
    for (var i = 0; i < children.length; i++) {
      var child = children[i]; 
      setAttribSafe(node, "subtreeweight", (getAttribSafe(node, "subtreeweight") + getAttribSafe(child, "subtreeweight") ));
      logger.log("         step subtreeWeight: " + getAttribSafe(node, "subtreeweight"));
    }
  })();

  return true;
}
function visit_radial_1(node) {
  logger.log("  visit  Radial (id: " + node.id + "): " + 1);
  
  setAttribSafe(node, "subtreeweight_init", (getAttribSafe(node, "show") ));
  setAttribSafe(node, "subtreeweight", getAttribSafe(node, "subtreeweight_init"));
  logger.log("      init subtreeWeight: " + getAttribSafe(node, "subtreeweight_init"));
  logger.log("    last init subtreeweight: " + getAttribSafe(node, "subtreeweight"));
    (function () {
    var children = getChildren(node, "child", false);
    for (var i = 0; i < children.length; i++) {
      var child = children[i]; 
      setAttribSafe(node, "subtreeweight", (getAttribSafe(node, "subtreeweight") + getAttribSafe(child, "subtreeweight") ));
      logger.log("         step subtreeWeight: " + getAttribSafe(node, "subtreeweight"));
    }
  })();

  return true;
}
function visit_top_1(node) {
  logger.log("  visit  Top (id: " + node.id + "): " + 1);
  setAttribSafe(getChildByRefName(node,"child"), "parenty", top_child_parentY(getAttribSafe(getChildByRefName(node,"child"), "w"), getAttribSafe(node, "centeralpha"), getAttribSafe(node, "centerradius")));
  logger.log("    top_child_parentY: " + getAttribSafe(getChildByRefName(node,"child"), "parenty"));
  logger.log("        child@w: " + getAttribSafe(getChildByRefName(node,"child"), "w"));
  logger.log("        centerAlpha: " + getAttribSafe(node, "centeralpha"));
  logger.log("        centerRadius: " + getAttribSafe(node, "centerradius"));
  setAttribSafe(getChildByRefName(node,"child"), "parentx", top_child_parentX(getAttribSafe(getChildByRefName(node,"child"), "w"), getAttribSafe(node, "centeralpha"), getAttribSafe(node, "centerradius")));
  logger.log("    top_child_parentX: " + getAttribSafe(getChildByRefName(node,"child"), "parentx"));
  logger.log("        child@w: " + getAttribSafe(getChildByRefName(node,"child"), "w"));
  logger.log("        centerAlpha: " + getAttribSafe(node, "centeralpha"));
  logger.log("        centerRadius: " + getAttribSafe(node, "centerradius"));
  return true;
}
///// pass /////
function visit_radialrect_2(node) {
  logger.log("  visit  RadialRect (id: " + node.id + "): " + 2);
  setAttribSafe(node, "xopen", radialrect_xOpen(getAttribSafe(node, "r"), getAttribSafe(node, "alpha"), getAttribSafe(node, "parentx")));
  logger.log("    radialrect_xOpen: " + getAttribSafe(node, "xopen"));
  logger.log("        r: " + getAttribSafe(node, "r"));
  logger.log("        alpha: " + getAttribSafe(node, "alpha"));
  logger.log("        parentX: " + getAttribSafe(node, "parentx"));
  setAttribSafe(node, "yclose", radialrect_yClose(getAttribSafe(node, "parenty")));
  logger.log("    radialrect_yClose: " + getAttribSafe(node, "yclose"));
  logger.log("        parentY: " + getAttribSafe(node, "parenty"));
  setAttribSafe(node, "yopen", radialrect_yOpen(getAttribSafe(node, "r"), getAttribSafe(node, "alpha"), getAttribSafe(node, "parenty")));
  logger.log("    radialrect_yOpen: " + getAttribSafe(node, "yopen"));
  logger.log("        r: " + getAttribSafe(node, "r"));
  logger.log("        alpha: " + getAttribSafe(node, "alpha"));
  logger.log("        parentY: " + getAttribSafe(node, "parenty"));
  setAttribSafe(node, "y", radialrect_y(getAttribSafe(node, "show"), getAttribSafe(node, "yclose"), getAttribSafe(node, "yopen")));
  logger.log("    radialrect_y: " + getAttribSafe(node, "y"));
  logger.log("        show: " + getAttribSafe(node, "show"));
  logger.log("        yClose: " + getAttribSafe(node, "yclose"));
  logger.log("        yOpen: " + getAttribSafe(node, "yopen"));
  setAttribSafe(node, "xclose", radialrect_xClose(getAttribSafe(node, "parentx")));
  logger.log("    radialrect_xClose: " + getAttribSafe(node, "xclose"));
  logger.log("        parentX: " + getAttribSafe(node, "parentx"));
  setAttribSafe(node, "x", radialrect_x(getAttribSafe(node, "xopen"), getAttribSafe(node, "show"), getAttribSafe(node, "xclose")));
  logger.log("    radialrect_x: " + getAttribSafe(node, "x"));
  logger.log("        xOpen: " + getAttribSafe(node, "xopen"));
  logger.log("        show: " + getAttribSafe(node, "show"));
  logger.log("        xClose: " + getAttribSafe(node, "xclose"));
  
  (function () {
    var children = getChildren(node, "child", false);
    for (var i = 0; i < children.length; i++) {
      var child = children[i]; 
      setAttribSafe(child, "sectorang", (false ? (getAttribSafe(node, "sectorang") * (getAttribSafe(child, "subtreeweight") / (getAttribSafe(node, "subtreeweight") - 1.0))):(getAttribSafe(node, "sectorang") / getAttribSafe(node, "numopenchildren") )));
logger.log("radialrect_child_sectorang_step: " + getAttribSafe(child, "sectorang"));
    }
  })();

  
  setAttribSafe(node, "child_cumulativesector_init", (getAttribSafe(node, "alpha") - getAttribSafe(node, "sectorang") / 2));
  setAttribSafe(node, "child_cumulativesector_last", getAttribSafe(node, "child_cumulativesector_init"));
  logger.log("      init child@cumulativeSector: " + getAttribSafe(node, "child_cumulativesector_init"));
  logger.log("    last init child_cumulativesector_last: " + getAttribSafe(node, "child_cumulativesector_last"));
    setAttribSafe(node, "child_alpha_init", (false ? (0):(getAttribSafe(node, "alpha") - (getAttribSafe(node, "sectorang") / 2) - (getAttribSafe(node, "sectorang") / (getAttribSafe(node, "numopenchildren") * 2)))));
  setAttribSafe(node, "child_alpha_last", getAttribSafe(node, "child_alpha_init"));
  logger.log("radialrect_child_alpha_init: " + getAttribSafe(node, "child_alpha_init"));
    (function () {
    var children = getChildren(node, "child", false);
    for (var i = 0; i < children.length; i++) {
      var child = children[i]; 
      setAttribSafe(child, "cumulativesector", (getAttribSafe(i == 0 ? node : children[i-1], i == 0 ? ("child_cumulativesector_init") : ("cumulativesector")) + getAttribSafe(child, "show") * getAttribSafe(node, "sectorang") * (getAttribSafe(child, "subtreeweight") / (getAttribSafe(node, "subtreeweight") - 1.0))));
      logger.log("         step child@cumulativeSector: " + getAttribSafe(child, "cumulativesector"));
      setAttribSafe(child, "alpha", (false ? (getAttribSafe(child, "cumulativesector") - getAttribSafe(child, "show") * getAttribSafe(child, "sectorang") / 2):(getAttribSafe(i == 0 ? node : children[i-1], i == 0 ? ("child_alpha_init") : ("alpha")) + getAttribSafe(child, "show") * (getAttribSafe(node, "sectorang") / getAttribSafe(node, "numopenchildren")))));
logger.log("radialrect_child_alpha_step: " + getAttribSafe(child, "alpha"));
    }
  })();

  
  (function () {
    var children = getChildren(node, "child", false);
    for (var i = 0; i < children.length; i++) {
      var child = children[i]; 
      setAttribSafe(child, "parentx", (getAttribSafe(node, "x") ));
      logger.log("         step child@parentX: " + getAttribSafe(child, "parentx"));
    }
  })();

  
  (function () {
    var children = getChildren(node, "child", false);
    for (var i = 0; i < children.length; i++) {
      var child = children[i]; 
      setAttribSafe(child, "parenty", (getAttribSafe(node, "y") ));
      logger.log("         step child@parentY: " + getAttribSafe(child, "parenty"));
    }
  })();

  return true;
}
function visit_radial_2(node) {
  logger.log("  visit  Radial (id: " + node.id + "): " + 2);
  setAttribSafe(node, "yclose", radial_yClose(getAttribSafe(node, "parenty")));
  logger.log("    radial_yClose: " + getAttribSafe(node, "yclose"));
  logger.log("        parentY: " + getAttribSafe(node, "parenty"));
  setAttribSafe(node, "xclose", radial_xClose(getAttribSafe(node, "parentx")));
  logger.log("    radial_xClose: " + getAttribSafe(node, "xclose"));
  logger.log("        parentX: " + getAttribSafe(node, "parentx"));
  setAttribSafe(node, "xopen", radial_xOpen(getAttribSafe(node, "r"), getAttribSafe(node, "alpha"), getAttribSafe(node, "parentx")));
  logger.log("    radial_xOpen: " + getAttribSafe(node, "xopen"));
  logger.log("        r: " + getAttribSafe(node, "r"));
  logger.log("        alpha: " + getAttribSafe(node, "alpha"));
  logger.log("        parentX: " + getAttribSafe(node, "parentx"));
  setAttribSafe(node, "x", radial_x(getAttribSafe(node, "xopen"), getAttribSafe(node, "show"), getAttribSafe(node, "xclose")));
  logger.log("    radial_x: " + getAttribSafe(node, "x"));
  logger.log("        xOpen: " + getAttribSafe(node, "xopen"));
  logger.log("        show: " + getAttribSafe(node, "show"));
  logger.log("        xClose: " + getAttribSafe(node, "xclose"));
  setAttribSafe(node, "yopen", radial_yOpen(getAttribSafe(node, "r"), getAttribSafe(node, "alpha"), getAttribSafe(node, "parenty")));
  logger.log("    radial_yOpen: " + getAttribSafe(node, "yopen"));
  logger.log("        r: " + getAttribSafe(node, "r"));
  logger.log("        alpha: " + getAttribSafe(node, "alpha"));
  logger.log("        parentY: " + getAttribSafe(node, "parenty"));
  setAttribSafe(node, "y", radial_y(getAttribSafe(node, "show"), getAttribSafe(node, "yclose"), getAttribSafe(node, "yopen")));
  logger.log("    radial_y: " + getAttribSafe(node, "y"));
  logger.log("        show: " + getAttribSafe(node, "show"));
  logger.log("        yClose: " + getAttribSafe(node, "yclose"));
  logger.log("        yOpen: " + getAttribSafe(node, "yopen"));
  
  (function () {
    var children = getChildren(node, "child", false);
    for (var i = 0; i < children.length; i++) {
      var child = children[i]; 
      setAttribSafe(child, "sectorang", (false ? (getAttribSafe(node, "sectorang") * (getAttribSafe(child, "subtreeweight") / (getAttribSafe(node, "subtreeweight") - 1.0))):(getAttribSafe(node, "sectorang") / getAttribSafe(node, "numopenchildren") )));
logger.log("radial_child_sectorang_step: " + getAttribSafe(child, "sectorang"));
    }
  })();

  
  setAttribSafe(node, "child_cumulativesector_init", (getAttribSafe(node, "alpha") - getAttribSafe(node, "sectorang") / 2));
  setAttribSafe(node, "child_cumulativesector_last", getAttribSafe(node, "child_cumulativesector_init"));
  logger.log("      init child@cumulativeSector: " + getAttribSafe(node, "child_cumulativesector_init"));
  logger.log("    last init child_cumulativesector_last: " + getAttribSafe(node, "child_cumulativesector_last"));
    setAttribSafe(node, "child_alpha_init", (false ? (0):(getAttribSafe(node, "alpha") - (getAttribSafe(node, "sectorang") / 2) - (getAttribSafe(node, "sectorang") / (getAttribSafe(node, "numopenchildren") * 2)))));
  setAttribSafe(node, "child_alpha_last", getAttribSafe(node, "child_alpha_init"));
  logger.log("radial_child_alpha_init: " + getAttribSafe(node, "child_alpha_init"));
    (function () {
    var children = getChildren(node, "child", false);
    for (var i = 0; i < children.length; i++) {
      var child = children[i]; 
      setAttribSafe(child, "cumulativesector", (getAttribSafe(i == 0 ? node : children[i-1], i == 0 ? ("child_cumulativesector_init") : ("cumulativesector")) + getAttribSafe(child, "show") * getAttribSafe(node, "sectorang") * (getAttribSafe(child, "subtreeweight") / (getAttribSafe(node, "subtreeweight") - 1.0))));
      logger.log("         step child@cumulativeSector: " + getAttribSafe(child, "cumulativesector"));
      setAttribSafe(child, "alpha", (false ? (getAttribSafe(child, "cumulativesector") - getAttribSafe(child, "show") * getAttribSafe(child, "sectorang") / 2):(getAttribSafe(i == 0 ? node : children[i-1], i == 0 ? ("child_alpha_init") : ("alpha")) + getAttribSafe(child, "show") * (getAttribSafe(node, "sectorang") / getAttribSafe(node, "numopenchildren")))));
logger.log("radial_child_alpha_step: " + getAttribSafe(child, "alpha"));
    }
  })();

  
  (function () {
    var children = getChildren(node, "child", false);
    for (var i = 0; i < children.length; i++) {
      var child = children[i]; 
      setAttribSafe(child, "parentx", (getAttribSafe(node, "x") ));
      logger.log("         step child@parentX: " + getAttribSafe(child, "parentx"));
    }
  })();

  
  (function () {
    var children = getChildren(node, "child", false);
    for (var i = 0; i < children.length; i++) {
      var child = children[i]; 
      setAttribSafe(child, "parenty", (getAttribSafe(node, "y") ));
      logger.log("         step child@parentY: " + getAttribSafe(child, "parenty"));
    }
  })();

  return true;
}
function visit_top_2(node) {
  logger.log("  visit  Top (id: " + node.id + "): " + 2);
  return true;
}
///// pass /////
function visit_radialrect_3(node) {
  logger.log("  visit  RadialRect (id: " + node.id + "): " + 3);
  
  setAttribSafe(node, "render_init", (paint("rect", getAttribSafe(node, "x") - getAttribSafe(node, "w"), getAttribSafe(node, "y") - getAttribSafe(node, "h"), 2 * getAttribSafe(node, "w"), 2 * getAttribSafe(node, "h"), getAttribSafe(node, "bgcolor"))));
  setAttribSafe(node, "render", getAttribSafe(node, "render_init"));
  logger.log("      init render: " + getAttribSafe(node, "render_init"));
  logger.log("    last init render: " + getAttribSafe(node, "render"));
    (function () {
    var children = getChildren(node, "child", false);
    for (var i = 0; i < children.length; i++) {
      var child = children[i]; 
      setAttribSafe(node, "render", (paint("edge", getAttribSafe(node, "x"), getAttribSafe(node, "y"), getAttribSafe(child, "x"), getAttribSafe(child, "y"), getAttribSafe(node, "bgcolor"))));
      logger.log("         step render: " + getAttribSafe(node, "render"));
    }
  })();

  return true;
}
function visit_radial_3(node) {
  logger.log("  visit  Radial (id: " + node.id + "): " + 3);
  
  setAttribSafe(node, "render_init", (paint("ellipse", getAttribSafe(node, "x"), getAttribSafe(node, "y"), getAttribSafe(node, "w"), getAttribSafe(node, "h"), getAttribSafe(node, "bgcolor"))));
  setAttribSafe(node, "render", getAttribSafe(node, "render_init"));
  logger.log("      init render: " + getAttribSafe(node, "render_init"));
  logger.log("    last init render: " + getAttribSafe(node, "render"));
    (function () {
    var children = getChildren(node, "child", false);
    for (var i = 0; i < children.length; i++) {
      var child = children[i]; 
      setAttribSafe(node, "render", (paint("edge", getAttribSafe(node, "x"), getAttribSafe(node, "y"), getAttribSafe(child, "x"), getAttribSafe(child, "y"), getAttribSafe(node, "bgcolor"))));
      logger.log("         step render: " + getAttribSafe(node, "render"));
    }
  })();

  return true;
}
function visit_top_3(node) {
  logger.log("  visit  Top (id: " + node.id + "): " + 3);
  return true;
}
function visit_0 (node) {
  if (node.nodeType == 1) {
    switch (node.tagName.toLowerCase()) {
      case "top":
        return visit_top_0(node);
      case "radial":
        return visit_radial_0(node);
      case "radialrect":
        return visit_radialrect_0(node);
    }
  }
  if (node.nodeType == 3) { logger.log("skipping text node 2"); return; }
  throw ("unknown node type for dispatch: " + node.tagName);
}
function visit_1 (node) {
  if (node.nodeType == 1) {
    switch (node.tagName.toLowerCase()) {
      case "top":
        return visit_top_1(node);
      case "radial":
        return visit_radial_1(node);
      case "radialrect":
        return visit_radialrect_1(node);
    }
  }
  if (node.nodeType == 3) { logger.log("skipping text node 2"); return; }
  throw ("unknown node type for dispatch: " + node.tagName);
}
function visit_2 (node) {
  if (node.nodeType == 1) {
    switch (node.tagName.toLowerCase()) {
      case "top":
        return visit_top_2(node);
      case "radial":
        return visit_radial_2(node);
      case "radialrect":
        return visit_radialrect_2(node);
    }
  }
  if (node.nodeType == 3) { logger.log("skipping text node 2"); return; }
  throw ("unknown node type for dispatch: " + node.tagName);
}
function visit_3 (node) {
  if (node.nodeType == 1) {
    switch (node.tagName.toLowerCase()) {
      case "top":
        return visit_top_3(node);
      case "radial":
        return visit_radial_3(node);
      case "radialrect":
        return visit_radialrect_3(node);
    }
  }
  if (node.nodeType == 3) { logger.log("skipping text node 2"); return; }
  throw ("unknown node type for dispatch: " + node.tagName);
}
function layout (root) {
  inherit(visit_0, root);
  synthesize(visit_1, root);
  inherit(visit_2, root);
  inherit(visit_3, root);
}
