function top_hr ( _ale_arg1,  _ale_arg0) { return _ale_arg0 + _ale_arg1 * 2; }
function top_child_xr ( _ale_arg0) { return _ale_arg0; }
function top_child_rx ( _ale_arg1,  _ale_arg0) { return _ale_arg0 + _ale_arg1; }
function top_child_yr ( _ale_arg0) { return _ale_arg0; }
function top_child_mouseX ( _ale_arg0) { return _ale_arg0; }
function top_canvas ( _ale_arg1,  _ale_arg0) { return paintStart(_ale_arg0, _ale_arg1, true); }
function top_child_by ( _ale_arg1,  _ale_arg0) { return _ale_arg0 + _ale_arg1; }
function top_child_padding ( _ale_arg0) { return _ale_arg0; }
function top_wr ( _ale_arg1,  _ale_arg0) { return _ale_arg0 + _ale_arg1 * 2; }
function top_child_y ( _ale_arg0) { return _ale_arg0; }
function top_done ( _ale_arg2,  _ale_arg0,  _ale_arg1) { return _ale_arg0 + paintOval(_ale_arg1, _ale_arg2, 10, 10, "#FF0000"); }
function top_child_x ( _ale_arg0) { return _ale_arg0; }
function top_child_rby ( _ale_arg0,  _ale_arg1) { return _ale_arg0 + _ale_arg1; }
function top_child_mouseY ( _ale_arg0) { return _ale_arg0; }
function top_child_canvas ( _ale_arg0) { return _ale_arg0; }
function leaf_w ( _ale_arg0) { return _ale_arg0 * 2; }
function leaf_render ( _ale_arg6,  _ale_arg4,  _ale_arg2,  _ale_arg5,  _ale_arg1,  _ale_arg0,  _ale_arg3) { return _ale_arg0 + paintRect(_ale_arg1, _ale_arg2, _ale_arg3, _ale_arg4, ((((_ale_arg5 > _ale_arg1) && (_ale_arg5 < (_ale_arg1 + _ale_arg3)) && (_ale_arg6 > _ale_arg2) && (_ale_arg6 < (_ale_arg2 + _ale_arg4)))) ? "#F00" : "#CCF")); }
function leaf_wr ( _ale_arg1,  _ale_arg0) { return _ale_arg0 * _ale_arg1; }
function leaf_mult ( _ale_arg3,  _ale_arg5,  _ale_arg0,  _ale_arg2,  _ale_arg4,  _ale_arg1) { return (((_ale_arg0 < (_ale_arg1 + 2 * _ale_arg2)) && (_ale_arg0 > (_ale_arg1 - 2 * _ale_arg2)) && (_ale_arg3 < (_ale_arg4 + 2 * _ale_arg2)) && (_ale_arg3 > (_ale_arg4 - 2 * _ale_arg2)))) ? _ale_arg5 : 1.0; }
function leaf_h ( _ale_arg0) { return _ale_arg0 * 2; }
function leaf_hr ( _ale_arg0,  _ale_arg1) { return _ale_arg0 * _ale_arg1; }
function vbox_childs_mouseX ( _ale_arg0) { return _ale_arg0; }
function vbox_childs_x ( _ale_arg1,  _ale_arg0) { return _ale_arg0 + _ale_arg1; }
function vbox_childs_rx ( _ale_arg1,  _ale_arg0) { return _ale_arg0 + _ale_arg1; }
function vbox_childs_xr ( _ale_arg0,  _ale_arg1) { return _ale_arg0 + _ale_arg1; }
function vbox_render ( _ale_arg4,  _ale_arg2,  _ale_arg1,  _ale_arg0,  _ale_arg3) { return _ale_arg0 + paintRect(_ale_arg1, _ale_arg2, _ale_arg3, _ale_arg4, "#CCC"); }
function vbox_childs_padding ( _ale_arg0) { return _ale_arg0; }
function vbox_wr ( _ale_arg1,  _ale_arg0) { return _ale_arg0 > 0 ? (_ale_arg0 + 2 * _ale_arg1) : _ale_arg1; }
function vbox_childs_y ( _ale_arg1,  _ale_arg0) { return _ale_arg0 - _ale_arg1; }
function vbox_childs_yr ( _ale_arg0,  _ale_arg1) { return _ale_arg0 - _ale_arg1; }
function vbox_childs_canvas ( _ale_arg0) { return _ale_arg0; }
function vbox_childs_mouseY ( _ale_arg0) { return _ale_arg0; }
function vbox_childs_wMax ( _ale_arg0) { return _ale_arg0; }
function vbox_childs_rxr ( _ale_arg0,  _ale_arg1) { return _ale_arg0 + _ale_arg1; }
function hbox_childs_xr ( _ale_arg0,  _ale_arg1) { return _ale_arg0 - _ale_arg1; }
function hbox_render ( _ale_arg4,  _ale_arg2,  _ale_arg1,  _ale_arg0,  _ale_arg3) { return _ale_arg0 + paintRect(_ale_arg1, _ale_arg2, _ale_arg3, _ale_arg4, "#CCC"); }
function hbox_childs_x ( _ale_arg0,  _ale_arg1) { return _ale_arg0 - _ale_arg1; }
function hbox_childs_mouseX ( _ale_arg0) { return _ale_arg0; }
function hbox_childs_canvas ( _ale_arg0) { return _ale_arg0; }
function hbox_childs_yr ( _ale_arg0,  _ale_arg1) { return _ale_arg0 + _ale_arg1; }
function hbox_childs_by ( _ale_arg1,  _ale_arg0) { return _ale_arg0 + _ale_arg1; }
function hbox_wr ( _ale_arg0) { return _ale_arg0; }
function hbox_childs_rby ( _ale_arg1,  _ale_arg0) { return _ale_arg0 + _ale_arg1; }
function hbox_childs_mouseY ( _ale_arg0) { return _ale_arg0; }
function hbox_childs_y ( _ale_arg1,  _ale_arg0) { return _ale_arg0 + _ale_arg1; }
function hbox_childs_padding ( _ale_arg0) { return _ale_arg0; }
function isInorder(node, pass) {
  switch (pass) {
    case 0:
     throw "did not expect inorder call for pass 0";
    case 1:
     throw "did not expect inorder call for pass 1";
    case 2:
     throw "did not expect inorder call for pass 2";
    case 3:
     throw "did not expect inorder call for pass 3";
    case 4:
     throw "did not expect inorder call for pass 4";
    case 5:
     throw "did not expect inorder call for pass 5";
    default: throw ("unknown pass " + pass);
  }
}
///// pass /////
function visit_top_0(node) {
  logger.log("  visit  Top (id: " + node.id + "): " + 0);
  setAttribSafe(getChildByRefName(node,"child"), "mousex", top_child_mouseX(getAttribSafe(node, "mousex")));
  logger.log("    top_child_mouseX: " + getAttribSafe(getChildByRefName(node,"child"), "mousex"));
  logger.log("        mouseX: " + getAttribSafe(node, "mousex"));
  setAttribSafe(getChildByRefName(node,"child"), "mousey", top_child_mouseY(getAttribSafe(node, "mousey")));
  logger.log("    top_child_mouseY: " + getAttribSafe(getChildByRefName(node,"child"), "mousey"));
  logger.log("        mouseY: " + getAttribSafe(node, "mousey"));
  setAttribSafe(getChildByRefName(node,"child"), "padding", top_child_padding(getInputAttribSafe(node, "padding", '10')));
  logger.log("    top_child_padding: " + getAttribSafe(getChildByRefName(node,"child"), "padding"));
  logger.log("        padding: " + getInputAttribSafe(node, "padding", '10'));
  setAttribSafe(getChildByRefName(node,"child"), "x", top_child_x(getInputAttribSafe(node, "padding", '10')));
  logger.log("    top_child_x: " + getAttribSafe(getChildByRefName(node,"child"), "x"));
  logger.log("        padding: " + getInputAttribSafe(node, "padding", '10'));
  setAttribSafe(getChildByRefName(node,"child"), "xr", top_child_xr(getInputAttribSafe(node, "padding", '10')));
  logger.log("    top_child_xr: " + getAttribSafe(getChildByRefName(node,"child"), "xr"));
  logger.log("        padding: " + getInputAttribSafe(node, "padding", '10'));
  setAttribSafe(getChildByRefName(node,"child"), "y", top_child_y(getInputAttribSafe(node, "padding", '10')));
  logger.log("    top_child_y: " + getAttribSafe(getChildByRefName(node,"child"), "y"));
  logger.log("        padding: " + getInputAttribSafe(node, "padding", '10'));
  setAttribSafe(getChildByRefName(node,"child"), "yr", top_child_yr(getInputAttribSafe(node, "padding", '10')));
  logger.log("    top_child_yr: " + getAttribSafe(getChildByRefName(node,"child"), "yr"));
  logger.log("        padding: " + getInputAttribSafe(node, "padding", '10'));
  return true;
}
function visit_hbox_0(node) {
  logger.log("  visit  HBox (id: " + node.id + "): " + 0);

(function () {
    var children = getChildren(node, "childs", false);
    for (var i = 0; i < children.length; i++) {
      var child = children[i]; 
      setAttribSafe(child, "mousex", (getAttribSafe(node, "mousex") ));
      logger.log("         step childs@mouseX: " + getAttribSafe(child, "mousex"));
      setAttribSafe(child, "mousey", (getAttribSafe(node, "mousey") ));
      logger.log("         step childs@mouseY: " + getAttribSafe(child, "mousey"));
      setAttribSafe(child, "padding", (getAttribSafe(node, "padding") ));
      logger.log("         step childs@padding: " + getAttribSafe(child, "padding"));
    }
  })();

  return true;
}
function visit_leaf_0(node) {
  logger.log("  visit  Leaf (id: " + node.id + "): " + 0);
  setAttribSafe(node, "h", leaf_h(getAttribSafe(node, "padding")));
  logger.log("    leaf_h: " + getAttribSafe(node, "h"));
  logger.log("        padding: " + getAttribSafe(node, "padding"));
  setAttribSafe(node, "w", leaf_w(getAttribSafe(node, "padding")));
  logger.log("    leaf_w: " + getAttribSafe(node, "w"));
  logger.log("        padding: " + getAttribSafe(node, "padding"));
  return true;
}
function visit_vbox_0(node) {
  logger.log("  visit  VBox (id: " + node.id + "): " + 0);

(function () {
    var children = getChildren(node, "childs", false);
    for (var i = 0; i < children.length; i++) {
      var child = children[i]; 
      setAttribSafe(child, "mousex", (getAttribSafe(node, "mousex") ));
      logger.log("         step childs@mouseX: " + getAttribSafe(child, "mousex"));
      setAttribSafe(child, "mousey", (getAttribSafe(node, "mousey") ));
      logger.log("         step childs@mouseY: " + getAttribSafe(child, "mousey"));
      setAttribSafe(child, "padding", (getAttribSafe(node, "padding") ));
      logger.log("         step childs@padding: " + getAttribSafe(child, "padding"));
      setAttribSafe(child, "rxr", (getAttribSafe(node, "xr") + getAttribSafe(node, "padding") ));
      logger.log("         step childs@rxr: " + getAttribSafe(child, "rxr"));
      setAttribSafe(child, "x", (getAttribSafe(node, "x") + getAttribSafe(node, "padding") ));
      logger.log("         step childs@x: " + getAttribSafe(child, "x"));
      setAttribSafe(child, "xr", (getAttribSafe(node, "xr") + getAttribSafe(node, "padding") ));
      logger.log("         step childs@xr: " + getAttribSafe(child, "xr"));
    }
  })();

  return true;
}
///// pass /////
function visit_top_1(node) {
  logger.log("  visit  Top (id: " + node.id + "): " + 1);
  setAttribSafe(getChildByRefName(node,"child"), "by", top_child_by(getAttribSafe(getChildByRefName(node,"child"), "h"), getAttribSafe(getChildByRefName(node,"child"), "y")));
  logger.log("    top_child_by: " + getAttribSafe(getChildByRefName(node,"child"), "by"));
  logger.log("        child@h: " + getAttribSafe(getChildByRefName(node,"child"), "h"));
  logger.log("        child@y: " + getAttribSafe(getChildByRefName(node,"child"), "y"));
  setAttribSafe(getChildByRefName(node,"child"), "rx", top_child_rx(getAttribSafe(getChildByRefName(node,"child"), "w"), getAttribSafe(getChildByRefName(node,"child"), "x")));
  logger.log("    top_child_rx: " + getAttribSafe(getChildByRefName(node,"child"), "rx"));
  logger.log("        child@w: " + getAttribSafe(getChildByRefName(node,"child"), "w"));
  logger.log("        child@x: " + getAttribSafe(getChildByRefName(node,"child"), "x"));
  return true;
}
function visit_hbox_1(node) {
  logger.log("  visit  HBox (id: " + node.id + "): " + 1);

(function () {
    var children = getChildren(node, "childs", false);
    for (var i = 0; i < children.length; i++) {
      var child = children[i]; 
    }
  })();


  setAttribSafe(node, "childs_rx_init", (getAttribSafe(node, "x") ));
  setAttribSafe(node, "childs_rx_last", getAttribSafe(node, "childs_rx_init"));
  logger.log("      init childs@rx: " + getAttribSafe(node, "childs_rx_init"));
  logger.log("    last init childs_rx_last: " + getAttribSafe(node, "childs_rx_last"));
    setAttribSafe(node, "h_init", (getAttribSafe(node, "padding") ));
  setAttribSafe(node, "h", getAttribSafe(node, "h_init"));
  logger.log("      init h: " + getAttribSafe(node, "h_init"));
  logger.log("    last init h: " + getAttribSafe(node, "h"));
    setAttribSafe(node, "w_init", (getAttribSafe(node, "padding") ));
  setAttribSafe(node, "w", getAttribSafe(node, "w_init"));
  logger.log("      init w: " + getAttribSafe(node, "w_init"));
  logger.log("    last init w: " + getAttribSafe(node, "w"));
  (function () {
    var children = getChildren(node, "childs", false);
    for (var i = 0; i < children.length; i++) {
      var child = children[i]; 
      setAttribSafe(child, "rx", (getAttribSafe(i == 0 ? node : children[i-1], i == 0 ? ("childs_rx_init") : ("rx")) + getAttribSafe(node, "padding") + getAttribSafe(child, "w") ));
      logger.log("         step childs@rx: " + getAttribSafe(child, "rx"));
      setAttribSafe(node, "h", (getAttribSafe(node, "h") > (getAttribSafe(child, "h") + getAttribSafe(node, "padding") * 2) ? getAttribSafe(node, "h") : (getAttribSafe(child, "h") + getAttribSafe(node, "padding") * 2)));
      logger.log("         step h: " + getAttribSafe(node, "h"));
      setAttribSafe(node, "w", (getAttribSafe(node, "w") + getAttribSafe(child, "w") + getAttribSafe(node, "padding") ));
      logger.log("         step w: " + getAttribSafe(node, "w"));
    }
  })();


(function () {
    var children = getChildren(node, "childs", false);
    for (var i = 0; i < children.length; i++) {
      var child = children[i]; 
      setAttribSafe(child, "x", (getAttribSafe(child, "rx") - getAttribSafe(child, "w") ));
      logger.log("         step childs@x: " + getAttribSafe(child, "x"));
    }
  })();

  return true;
}
function visit_leaf_1(node) {
  logger.log("  visit  Leaf (id: " + node.id + "): " + 1);
  return true;
}
function visit_vbox_1(node) {
  logger.log("  visit  VBox (id: " + node.id + "): " + 1);

  setAttribSafe(node, "childs_by_init", (getAttribSafe(node, "y") ));
  setAttribSafe(node, "childs_by_last", getAttribSafe(node, "childs_by_init"));
  logger.log("      init childs@by: " + getAttribSafe(node, "childs_by_init"));
  logger.log("    last init childs_by_last: " + getAttribSafe(node, "childs_by_last"));
  (function () {
    var children = getChildren(node, "childs", false);
    for (var i = 0; i < children.length; i++) {
      var child = children[i]; 
      setAttribSafe(child, "by", (getAttribSafe(i == 0 ? node : children[i-1], i == 0 ? ("childs_by_init") : ("by")) + getAttribSafe(node, "padding") + getAttribSafe(child, "h") ));
      logger.log("         step childs@by: " + getAttribSafe(child, "by"));
    }
  })();


  setAttribSafe(node, "h_init", (getAttribSafe(node, "padding") ));
  setAttribSafe(node, "h", getAttribSafe(node, "h_init"));
  logger.log("      init h: " + getAttribSafe(node, "h_init"));
  logger.log("    last init h: " + getAttribSafe(node, "h"));
    setAttribSafe(node, "w_init", (getAttribSafe(node, "padding") ));
  setAttribSafe(node, "w", getAttribSafe(node, "w_init"));
  logger.log("      init w: " + getAttribSafe(node, "w_init"));
  logger.log("    last init w: " + getAttribSafe(node, "w"));
  (function () {
    var children = getChildren(node, "childs", false);
    for (var i = 0; i < children.length; i++) {
      var child = children[i]; 
      setAttribSafe(child, "rx", (getAttribSafe(child, "x") + getAttribSafe(child, "w") ));
      logger.log("         step childs@rx: " + getAttribSafe(child, "rx"));
      setAttribSafe(node, "h", (getAttribSafe(node, "h") + getAttribSafe(child, "h") + getAttribSafe(node, "padding") ));
      logger.log("         step h: " + getAttribSafe(node, "h"));
      setAttribSafe(node, "w", (getAttribSafe(node, "w") > (getAttribSafe(child, "w") + getAttribSafe(node, "padding") * 2) ? getAttribSafe(node, "w") : (getAttribSafe(child, "w") + getAttribSafe(node, "padding") * 2)));
      logger.log("         step w: " + getAttribSafe(node, "w"));
    }
  })();


(function () {
    var children = getChildren(node, "childs", false);
    for (var i = 0; i < children.length; i++) {
      var child = children[i]; 
      setAttribSafe(child, "y", (getAttribSafe(child, "by") - getAttribSafe(child, "h") ));
      logger.log("         step childs@y: " + getAttribSafe(child, "y"));
    }
  })();

  return true;
}
///// pass /////
function visit_top_2(node) {
  logger.log("  visit  Top (id: " + node.id + "): " + 2);
  return true;
}
function visit_hbox_2(node) {
  logger.log("  visit  HBox (id: " + node.id + "): " + 2);

(function () {
    var children = getChildren(node, "childs", false);
    for (var i = 0; i < children.length; i++) {
      var child = children[i]; 
      setAttribSafe(child, "y", (getAttribSafe(node, "y") + getAttribSafe(node, "padding") ));
      logger.log("         step childs@y: " + getAttribSafe(child, "y"));
      setAttribSafe(child, "by", (getAttribSafe(child, "y") + getAttribSafe(child, "h") ));
      logger.log("         step childs@by: " + getAttribSafe(child, "by"));
    }
  })();

  return true;
}
function visit_leaf_2(node) {
  logger.log("  visit  Leaf (id: " + node.id + "): " + 2);
  setAttribSafe(node, "mult", leaf_mult(getAttribSafe(node, "mousey"), getInputAttribSafe(node, "enlargemult", '2.0'), getAttribSafe(node, "mousex"), getAttribSafe(node, "padding"), getAttribSafe(node, "y"), getAttribSafe(node, "x")));
  logger.log("    leaf_mult: " + getAttribSafe(node, "mult"));
  logger.log("        mouseY: " + getAttribSafe(node, "mousey"));
  logger.log("        enlargeMult: " + getInputAttribSafe(node, "enlargemult", '2.0'));
  logger.log("        mouseX: " + getAttribSafe(node, "mousex"));
  logger.log("        padding: " + getAttribSafe(node, "padding"));
  logger.log("        y: " + getAttribSafe(node, "y"));
  logger.log("        x: " + getAttribSafe(node, "x"));
  setAttribSafe(node, "hr", leaf_hr(getAttribSafe(node, "mult"), getAttribSafe(node, "h")));
  logger.log("    leaf_hr: " + getAttribSafe(node, "hr"));
  logger.log("        mult: " + getAttribSafe(node, "mult"));
  logger.log("        h: " + getAttribSafe(node, "h"));
  setAttribSafe(node, "wr", leaf_wr(getAttribSafe(node, "w"), getAttribSafe(node, "mult")));
  logger.log("    leaf_wr: " + getAttribSafe(node, "wr"));
  logger.log("        w: " + getAttribSafe(node, "w"));
  logger.log("        mult: " + getAttribSafe(node, "mult"));
  return true;
}
function visit_vbox_2(node) {
  logger.log("  visit  VBox (id: " + node.id + "): " + 2);
  return true;
}
///// pass /////
function visit_top_3(node) {
  logger.log("  visit  Top (id: " + node.id + "): " + 3);
  setAttribSafe(getChildByRefName(node,"child"), "rby", top_child_rby(getAttribSafe(getChildByRefName(node,"child"), "yr"), getAttribSafe(getChildByRefName(node,"child"), "hr")));
  logger.log("    top_child_rby: " + getAttribSafe(getChildByRefName(node,"child"), "rby"));
  logger.log("        child@yr: " + getAttribSafe(getChildByRefName(node,"child"), "yr"));
  logger.log("        child@hr: " + getAttribSafe(getChildByRefName(node,"child"), "hr"));
  setAttribSafe(node, "hr", top_hr(getInputAttribSafe(node, "padding", '10'), getAttribSafe(getChildByRefName(node,"child"), "hr")));
  logger.log("    top_hr: " + getAttribSafe(node, "hr"));
  logger.log("        padding: " + getInputAttribSafe(node, "padding", '10'));
  logger.log("        child@hr: " + getAttribSafe(getChildByRefName(node,"child"), "hr"));
  setAttribSafe(node, "wr", top_wr(getInputAttribSafe(node, "padding", '10'), getAttribSafe(getChildByRefName(node,"child"), "wr")));
  logger.log("    top_wr: " + getAttribSafe(node, "wr"));
  logger.log("        padding: " + getInputAttribSafe(node, "padding", '10'));
  logger.log("        child@wr: " + getAttribSafe(getChildByRefName(node,"child"), "wr"));
  setAttribSafe(node, "canvas", top_canvas(getAttribSafe(node, "hr"), getAttribSafe(node, "wr")));
  logger.log("    top_canvas: " + getAttribSafe(node, "canvas"));
  logger.log("        hr: " + getAttribSafe(node, "hr"));
  logger.log("        wr: " + getAttribSafe(node, "wr"));
  setAttribSafe(getChildByRefName(node,"child"), "canvas", top_child_canvas(getAttribSafe(node, "canvas")));
  logger.log("    top_child_canvas: " + getAttribSafe(getChildByRefName(node,"child"), "canvas"));
  logger.log("        canvas: " + getAttribSafe(node, "canvas"));
  return true;
}
function visit_hbox_3(node) {
  logger.log("  visit  HBox (id: " + node.id + "): " + 3);

(function () {
    var children = getChildren(node, "childs", false);
    for (var i = 0; i < children.length; i++) {
      var child = children[i]; 
    }
  })();


  setAttribSafe(node, "childs_rxr_init", (getAttribSafe(node, "xr") ));
  setAttribSafe(node, "childs_rxr_last", getAttribSafe(node, "childs_rxr_init"));
  logger.log("      init childs@rxr: " + getAttribSafe(node, "childs_rxr_init"));
  logger.log("    last init childs_rxr_last: " + getAttribSafe(node, "childs_rxr_last"));
    setAttribSafe(node, "hr_init", (getAttribSafe(node, "padding") ));
  setAttribSafe(node, "hr", getAttribSafe(node, "hr_init"));
  logger.log("      init hr: " + getAttribSafe(node, "hr_init"));
  logger.log("    last init hr: " + getAttribSafe(node, "hr"));
    setAttribSafe(node, "wmin_init", (getAttribSafe(node, "padding") ));
  setAttribSafe(node, "wmin", getAttribSafe(node, "wmin_init"));
  logger.log("      init wMin: " + getAttribSafe(node, "wmin_init"));
  logger.log("    last init wmin: " + getAttribSafe(node, "wmin"));
  (function () {
    var children = getChildren(node, "childs", false);
    for (var i = 0; i < children.length; i++) {
      var child = children[i]; 
      setAttribSafe(child, "rxr", (getAttribSafe(i == 0 ? node : children[i-1], i == 0 ? ("childs_rxr_init") : ("rxr")) + getAttribSafe(node, "padding") + getAttribSafe(child, "wr") ));
      logger.log("         step childs@rxr: " + getAttribSafe(child, "rxr"));
      setAttribSafe(node, "hr", (getAttribSafe(node, "hr") > (getAttribSafe(child, "hr") + getAttribSafe(node, "padding") * 2) ? getAttribSafe(node, "hr") : (getAttribSafe(child, "hr") + getAttribSafe(node, "padding") * 2)));
      logger.log("         step hr: " + getAttribSafe(node, "hr"));
      setAttribSafe(node, "wmin", (getAttribSafe(node, "wmin") + getAttribSafe(child, "wr") + getAttribSafe(node, "padding") ));
      logger.log("         step wMin: " + getAttribSafe(node, "wmin"));
    }
  })();


(function () {
    var children = getChildren(node, "childs", false);
    for (var i = 0; i < children.length; i++) {
      var child = children[i]; 
      setAttribSafe(child, "xr", (getAttribSafe(child, "rxr") - getAttribSafe(child, "wr") ));
      logger.log("         step childs@xr: " + getAttribSafe(child, "xr"));
    }
  })();

  return true;
}
function visit_leaf_3(node) {
  logger.log("  visit  Leaf (id: " + node.id + "): " + 3);
  return true;
}
function visit_vbox_3(node) {
  logger.log("  visit  VBox (id: " + node.id + "): " + 3);

(function () {
    var children = getChildren(node, "childs", false);
    for (var i = 0; i < children.length; i++) {
      var child = children[i]; 
    }
  })();


  setAttribSafe(node, "childs_rby_init", (getAttribSafe(node, "yr") ));
  setAttribSafe(node, "childs_rby_last", getAttribSafe(node, "childs_rby_init"));
  logger.log("      init childs@rby: " + getAttribSafe(node, "childs_rby_init"));
  logger.log("    last init childs_rby_last: " + getAttribSafe(node, "childs_rby_last"));
    setAttribSafe(node, "hr_init", (getAttribSafe(node, "padding") ));
  setAttribSafe(node, "hr", getAttribSafe(node, "hr_init"));
  logger.log("      init hr: " + getAttribSafe(node, "hr_init"));
  logger.log("    last init hr: " + getAttribSafe(node, "hr"));
    setAttribSafe(node, "wmax_init", (0));
  setAttribSafe(node, "wmax", getAttribSafe(node, "wmax_init"));
  logger.log("      init wMax: " + getAttribSafe(node, "wmax_init"));
  logger.log("    last init wmax: " + getAttribSafe(node, "wmax"));
  (function () {
    var children = getChildren(node, "childs", false);
    for (var i = 0; i < children.length; i++) {
      var child = children[i]; 
      setAttribSafe(child, "rby", (getAttribSafe(i == 0 ? node : children[i-1], i == 0 ? ("childs_rby_init") : ("rby")) + getAttribSafe(node, "padding") + getAttribSafe(child, "hr") ));
      logger.log("         step childs@rby: " + getAttribSafe(child, "rby"));
      setAttribSafe(node, "hr", (getAttribSafe(node, "hr") + getAttribSafe(child, "hr") + getAttribSafe(node, "padding") ));
      logger.log("         step hr: " + getAttribSafe(node, "hr"));
      setAttribSafe(node, "wmax", (getAttribSafe(node, "wmax") > getAttribSafe(child, "wmin") ? getAttribSafe(node, "wmax") : getAttribSafe(child, "wmin") ));
      logger.log("         step wMax: " + getAttribSafe(node, "wmax"));
    }
  })();


(function () {
    var children = getChildren(node, "childs", false);
    for (var i = 0; i < children.length; i++) {
      var child = children[i]; 
      setAttribSafe(child, "yr", (getAttribSafe(child, "rby") - getAttribSafe(child, "hr") ));
      logger.log("         step childs@yr: " + getAttribSafe(child, "yr"));
    }
  })();

  setAttribSafe(node, "wr", vbox_wr(getAttribSafe(node, "padding"), getAttribSafe(node, "wmax")));
  logger.log("    vbox_wr: " + getAttribSafe(node, "wr"));
  logger.log("        padding: " + getAttribSafe(node, "padding"));
  logger.log("        wMax$$: " + getAttribSafe(node, "wmax"));

(function () {
    var children = getChildren(node, "childs", false);
    for (var i = 0; i < children.length; i++) {
      var child = children[i]; 
      setAttribSafe(child, "wmax", (getAttribSafe(node, "wmax") ));
      logger.log("         step childs@wMax: " + getAttribSafe(child, "wmax"));
    }
  })();

  return true;
}
///// pass /////
function visit_top_4(node) {
  logger.log("  visit  Top (id: " + node.id + "): " + 4);
  return true;
}
function visit_hbox_4(node) {
  logger.log("  visit  HBox (id: " + node.id + "): " + 4);
  setAttribSafe(node, "wr", hbox_wr(getAttribSafe(node, "wmax")));
  logger.log("    hbox_wr: " + getAttribSafe(node, "wr"));
  logger.log("        wMax: " + getAttribSafe(node, "wmax"));
  setAttribSafe(node, "render", hbox_render(getAttribSafe(node, "hr"), getAttribSafe(node, "yr"), getAttribSafe(node, "xr"), getAttribSafe(node, "canvas"), getAttribSafe(node, "wr")));
  logger.log("    hbox_render: " + getAttribSafe(node, "render"));
  logger.log("        hr: " + getAttribSafe(node, "hr"));
  logger.log("        yr: " + getAttribSafe(node, "yr"));
  logger.log("        xr: " + getAttribSafe(node, "xr"));
  logger.log("        canvas: " + getAttribSafe(node, "canvas"));
  logger.log("        wr: " + getAttribSafe(node, "wr"));

(function () {
    var children = getChildren(node, "childs", false);
    for (var i = 0; i < children.length; i++) {
      var child = children[i]; 
      setAttribSafe(child, "yr", (getAttribSafe(node, "yr") + getAttribSafe(node, "padding") ));
      logger.log("         step childs@yr: " + getAttribSafe(child, "yr"));
      setAttribSafe(child, "rby", (getAttribSafe(child, "yr") + getAttribSafe(child, "hr") ));
      logger.log("         step childs@rby: " + getAttribSafe(child, "rby"));
    }
  })();


(function () {
    var children = getChildren(node, "childs", false);
    for (var i = 0; i < children.length; i++) {
      var child = children[i]; 
      setAttribSafe(child, "canvas", (getAttribSafe(node, "render") ));
      logger.log("         step childs@canvas: " + getAttribSafe(child, "canvas"));
    }
  })();

  return true;
}
function visit_leaf_4(node) {
  logger.log("  visit  Leaf (id: " + node.id + "): " + 4);
  setAttribSafe(node, "render", leaf_render(getAttribSafe(node, "mousey"), getAttribSafe(node, "hr"), getAttribSafe(node, "yr"), getAttribSafe(node, "mousex"), getAttribSafe(node, "xr"), getAttribSafe(node, "canvas"), getAttribSafe(node, "wr")));
  logger.log("    leaf_render: " + getAttribSafe(node, "render"));
  logger.log("        mouseY: " + getAttribSafe(node, "mousey"));
  logger.log("        hr: " + getAttribSafe(node, "hr"));
  logger.log("        yr: " + getAttribSafe(node, "yr"));
  logger.log("        mouseX: " + getAttribSafe(node, "mousex"));
  logger.log("        xr: " + getAttribSafe(node, "xr"));
  logger.log("        canvas: " + getAttribSafe(node, "canvas"));
  logger.log("        wr: " + getAttribSafe(node, "wr"));
  return true;
}
function visit_vbox_4(node) {
  logger.log("  visit  VBox (id: " + node.id + "): " + 4);
  setAttribSafe(node, "render", vbox_render(getAttribSafe(node, "hr"), getAttribSafe(node, "yr"), getAttribSafe(node, "xr"), getAttribSafe(node, "canvas"), getAttribSafe(node, "wr")));
  logger.log("    vbox_render: " + getAttribSafe(node, "render"));
  logger.log("        hr: " + getAttribSafe(node, "hr"));
  logger.log("        yr: " + getAttribSafe(node, "yr"));
  logger.log("        xr: " + getAttribSafe(node, "xr"));
  logger.log("        canvas: " + getAttribSafe(node, "canvas"));
  logger.log("        wr: " + getAttribSafe(node, "wr"));

(function () {
    var children = getChildren(node, "childs", false);
    for (var i = 0; i < children.length; i++) {
      var child = children[i]; 
      setAttribSafe(child, "canvas", (getAttribSafe(node, "render") ));
      logger.log("         step childs@canvas: " + getAttribSafe(child, "canvas"));
    }
  })();

  return true;
}
///// pass /////
function visit_top_5(node) {
  logger.log("  visit  Top (id: " + node.id + "): " + 5);
  setAttribSafe(node, "done", top_done(getAttribSafe(node, "mousey"), getAttribSafe(getChildByRefName(node,"child"), "render"), getAttribSafe(node, "mousex")));
  logger.log("    top_done: " + getAttribSafe(node, "done"));
  logger.log("        mouseY: " + getAttribSafe(node, "mousey"));
  logger.log("        child@render: " + getAttribSafe(getChildByRefName(node,"child"), "render"));
  logger.log("        mouseX: " + getAttribSafe(node, "mousex"));
  return true;
}
function visit_hbox_5(node) {
  logger.log("  visit  HBox (id: " + node.id + "): " + 5);
  return true;
}
function visit_leaf_5(node) {
  logger.log("  visit  Leaf (id: " + node.id + "): " + 5);
  return true;
}
function visit_vbox_5(node) {
  logger.log("  visit  VBox (id: " + node.id + "): " + 5);
  return true;
}
function visit_0 (node, isGlobalCall, parent) {
  if (node.nodeType == 1) {
    switch (node.tagName.toLowerCase()) {
      case "top":
        logger.log("global: " + isGlobalCall + ", parent: " + parent);
        return visit_top_0(node);
      case "vbox":
        logger.log("global: " + isGlobalCall + ", parent: " + parent);
        return visit_vbox_0(node);
      case "hbox":
        logger.log("global: " + isGlobalCall + ", parent: " + parent);
        return visit_hbox_0(node);
      case "leaf":
        logger.log("global: " + isGlobalCall + ", parent: " + parent);
        return visit_leaf_0(node);
    }
  }
  if (node.nodeType == 3) { logger.log("skipping text node 2"); return; }
  throw ("unknown node type for dispatch: " + node.tagName);
}
function visit_1 (node, isGlobalCall, parent) {
  if (node.nodeType == 1) {
    switch (node.tagName.toLowerCase()) {
      case "top":
        logger.log("global: " + isGlobalCall + ", parent: " + parent);
        return visit_top_1(node);
      case "vbox":
        logger.log("global: " + isGlobalCall + ", parent: " + parent);
        return visit_vbox_1(node);
      case "hbox":
        logger.log("global: " + isGlobalCall + ", parent: " + parent);
        return visit_hbox_1(node);
      case "leaf":
        logger.log("global: " + isGlobalCall + ", parent: " + parent);
        return visit_leaf_1(node);
    }
  }
  if (node.nodeType == 3) { logger.log("skipping text node 2"); return; }
  throw ("unknown node type for dispatch: " + node.tagName);
}
function visit_2 (node, isGlobalCall, parent) {
  if (node.nodeType == 1) {
    switch (node.tagName.toLowerCase()) {
      case "top":
        logger.log("global: " + isGlobalCall + ", parent: " + parent);
        return visit_top_2(node);
      case "vbox":
        logger.log("global: " + isGlobalCall + ", parent: " + parent);
        return visit_vbox_2(node);
      case "hbox":
        logger.log("global: " + isGlobalCall + ", parent: " + parent);
        return visit_hbox_2(node);
      case "leaf":
        logger.log("global: " + isGlobalCall + ", parent: " + parent);
        return visit_leaf_2(node);
    }
  }
  if (node.nodeType == 3) { logger.log("skipping text node 2"); return; }
  throw ("unknown node type for dispatch: " + node.tagName);
}
function visit_3 (node, isGlobalCall, parent) {
  if (node.nodeType == 1) {
    switch (node.tagName.toLowerCase()) {
      case "top":
        logger.log("global: " + isGlobalCall + ", parent: " + parent);
        return visit_top_3(node);
      case "vbox":
        logger.log("global: " + isGlobalCall + ", parent: " + parent);
        return visit_vbox_3(node);
      case "hbox":
        logger.log("global: " + isGlobalCall + ", parent: " + parent);
        return visit_hbox_3(node);
      case "leaf":
        logger.log("global: " + isGlobalCall + ", parent: " + parent);
        return visit_leaf_3(node);
    }
  }
  if (node.nodeType == 3) { logger.log("skipping text node 2"); return; }
  throw ("unknown node type for dispatch: " + node.tagName);
}
function visit_4 (node, isGlobalCall, parent) {
  if (node.nodeType == 1) {
    switch (node.tagName.toLowerCase()) {
      case "top":
        logger.log("global: " + isGlobalCall + ", parent: " + parent);
        return visit_top_4(node);
      case "vbox":
        logger.log("global: " + isGlobalCall + ", parent: " + parent);
        return visit_vbox_4(node);
      case "hbox":
        logger.log("global: " + isGlobalCall + ", parent: " + parent);
        return visit_hbox_4(node);
      case "leaf":
        logger.log("global: " + isGlobalCall + ", parent: " + parent);
        return visit_leaf_4(node);
    }
  }
  if (node.nodeType == 3) { logger.log("skipping text node 2"); return; }
  throw ("unknown node type for dispatch: " + node.tagName);
}
function visit_5 (node, isGlobalCall, parent) {
  if (node.nodeType == 1) {
    switch (node.tagName.toLowerCase()) {
      case "top":
        logger.log("global: " + isGlobalCall + ", parent: " + parent);
        return visit_top_5(node);
      case "vbox":
        logger.log("global: " + isGlobalCall + ", parent: " + parent);
        return visit_vbox_5(node);
      case "hbox":
        logger.log("global: " + isGlobalCall + ", parent: " + parent);
        return visit_hbox_5(node);
      case "leaf":
        logger.log("global: " + isGlobalCall + ", parent: " + parent);
        return visit_leaf_5(node);
    }
  }
  if (node.nodeType == 3) { logger.log("skipping text node 2"); return; }
  throw ("unknown node type for dispatch: " + node.tagName);
}
function layout (root) {
  inherit(visit_0, root);
  synthesize(visit_1, root);
  inherit(visit_2, root);
  synthesize(visit_3, root);
  inherit(visit_4, root);
  synthesize(visit_5, root);
}
