interface(root).
interface(vboxi).
interface(hboxi).
interface(leafi).
interfaceAttribute(vboxi, hr).
interfaceAttribute(vboxi, rby).
interfaceAttribute(vboxi, xr).
interfaceAttribute(vboxi, canvas).
interfaceAttribute(vboxi, by).
interfaceAttribute(vboxi, wr).
interfaceAttribute(vboxi, padding).
interfaceAttribute(vboxi, h).
interfaceAttribute(vboxi, render).
interfaceAttribute(vboxi, mousey).
interfaceAttribute(vboxi, w).
interfaceAttribute(vboxi, yr).
interfaceAttribute(vboxi, mousex).
interfaceAttribute(vboxi, rx).
interfaceAttribute(vboxi, y).
interfaceAttribute(vboxi, x).
interfaceAttribute(hboxi, hr).
interfaceAttribute(hboxi, rby).
interfaceAttribute(hboxi, xr).
interfaceAttribute(hboxi, canvas).
interfaceAttribute(hboxi, by).
interfaceAttribute(hboxi, wr).
interfaceAttribute(hboxi, padding).
interfaceAttribute(hboxi, rxr).
interfaceAttribute(hboxi, h).
interfaceAttribute(hboxi, render).
interfaceAttribute(hboxi, mousey).
interfaceAttribute(hboxi, w).
interfaceAttribute(hboxi, wmin).
interfaceAttribute(hboxi, yr).
interfaceAttribute(hboxi, mousex).
interfaceAttribute(hboxi, wmax).
interfaceAttribute(hboxi, rx).
interfaceAttribute(hboxi, y).
interfaceAttribute(hboxi, x).
interfaceAttribute(leafi, hr).
interfaceAttribute(leafi, rby).
interfaceAttribute(leafi, xr).
interfaceAttribute(leafi, canvas).
interfaceAttribute(leafi, by).
interfaceAttribute(leafi, wr).
interfaceAttribute(leafi, padding).
interfaceAttribute(leafi, rxr).
interfaceAttribute(leafi, h).
interfaceAttribute(leafi, render).
interfaceAttribute(leafi, mousey).
interfaceAttribute(leafi, w).
interfaceAttribute(leafi, yr).
interfaceAttribute(leafi, mousex).
interfaceAttribute(leafi, rx).
interfaceAttribute(leafi, y).
interfaceAttribute(leafi, x).
class(top, root).
class(vbox, vboxi).
class(hbox, hboxi).
class(leaf, leafi).
classChild(top, child, vboxi).
classChild(vbox, childsunroll0, hboxi).
classChild(vbox, childsunroll1, hboxi).
classChild(vbox, childsunroll2, hboxi).
classChild(vbox, childsunrolln, hboxi).
classChild(hbox, childsunroll0, leafi).
classChild(hbox, childsunroll1, leafi).
classChild(hbox, childsunroll2, leafi).
classChild(hbox, childsunrolln, leafi).
classField(gensymattrib, gensymattrib) :- false.
classField(top, gensymattrib).
classField(top, mousey).
classField(top, mousex).
classField(top, padding).
classField(vbox, gensymattrib).
classField(hbox, gensymattrib).
classField(leaf, gensymattrib).
interfaceField(root, display).
interfaceField(root, refname).
interfaceField(vboxi, display).
interfaceField(vboxi, refname).
interfaceField(hboxi, display).
interfaceField(hboxi, refname).
interfaceField(leafi, enlargemult).
interfaceField(leafi, display).
interfaceField(leafi, refname).
assignment(top, self, hr, self, padding). %a42
assignment(top, self, hr, child, hr). %a42
assignment(top, child, xr, self, padding). %a42
assignment(top, child, rx, child, w). %a42
assignment(top, child, rx, child, x). %a42
assignment(top, child, yr, self, padding). %a42
assignment(top, child, mousex, self, mousex). %a42
assignment(top, self, canvas, self, hr). %a42
assignment(top, self, canvas, self, wr). %a42
assignment(top, child, by, child, h). %a42
assignment(top, child, by, child, y). %a42
assignment(top, child, padding, self, padding). %a42
assignment(top, self, wr, self, padding). %a42
assignment(top, self, wr, child, wr). %a42
assignment(top, child, y, self, padding). %a42
assignment(top, self, done, self, mousey). %a42
assignment(top, self, done, child, render). %a42
assignment(top, self, done, self, mousex). %a42
assignment(top, child, x, self, padding). %a42
assignment(top, child, rby, child, yr). %a42
assignment(top, child, rby, child, hr). %a42
assignment(top, child, mousey, self, mousey). %a42
assignment(top, child, canvas, self, canvas). %a42
assignment(vbox, self, render, self, hr). %a42
assignment(vbox, self, render, self, yr). %a42
assignment(vbox, self, render, self, xr). %a42
assignment(vbox, self, render, self, canvas). %a42
assignment(vbox, self, render, self, wr). %a42
assignment(vbox, self, wr, self, padding). %a42
assignment(vbox, self, wr, self, wmax_stepn). %a41
assignment(vbox, self, childs_mousex_step0, self, mousex). %a17
assignment(vbox, self, childs_mousex_step0, self, gensymattrib). %a27 childs@mouseX
assignment(vbox, self, childs_mousex_step1, self, childs_mousex_step0). %a28
assignment(vbox, self, childs_mousex_step2, self, childs_mousex_step1). %a29
assignment(vbox, self, childs_mousex_stepn, self, childs_mousex_step2). %a30
assignment(vbox, childsunroll0, mousex, self, childs_mousex_step0). %a31b
assignment(vbox, childsunroll1, mousex, self, childs_mousex_step1). %a32
assignment(vbox, childsunroll2, mousex, self, childs_mousex_step2). %a33
assignment(vbox, childsunrolln, mousex, self, childs_mousex_stepn). %a34
assignment(vbox, self, childs_x_step0, self, padding). %a17
assignment(vbox, self, childs_x_step0, self, x). %a17
assignment(vbox, self, childs_x_step0, self, gensymattrib). %a27 childs@x
assignment(vbox, self, childs_x_step1, self, childs_x_step0). %a28
assignment(vbox, self, childs_x_step2, self, childs_x_step1). %a29
assignment(vbox, self, childs_x_stepn, self, childs_x_step2). %a30
assignment(vbox, childsunroll0, x, self, childs_x_step0). %a31b
assignment(vbox, childsunroll1, x, self, childs_x_step1). %a32
assignment(vbox, childsunroll2, x, self, childs_x_step2). %a33
assignment(vbox, childsunrolln, x, self, childs_x_stepn). %a34
assignment(vbox, self, childs_rx_step0, self, childs_w_step0). %a8
assignment(vbox, self, childs_rx_step1, self, childs_w_step1). %a9
assignment(vbox, self, childs_rx_step2, self, childs_w_step2). %a10
assignment(vbox, self, childs_rx_stepn, self, childs_w_stepn). %a11
assignment(vbox, self, childs_rx_step0, self, childs_x_step0). %a8
assignment(vbox, self, childs_rx_step1, self, childs_x_step1). %a9
assignment(vbox, self, childs_rx_step2, self, childs_x_step2). %a10
assignment(vbox, self, childs_rx_stepn, self, childs_x_stepn). %a11
assignment(vbox, self, childs_rx_step0, self, gensymattrib). %a27 childs@rx
assignment(vbox, self, childs_rx_step1, self, childs_rx_step0). %a28
assignment(vbox, self, childs_rx_step2, self, childs_rx_step1). %a29
assignment(vbox, self, childs_rx_stepn, self, childs_rx_step2). %a30
assignment(vbox, childsunroll0, rx, self, childs_rx_step0). %a31b
assignment(vbox, childsunroll1, rx, self, childs_rx_step1). %a32
assignment(vbox, childsunroll2, rx, self, childs_rx_step2). %a33
assignment(vbox, childsunrolln, rx, self, childs_rx_stepn). %a34
assignment(vbox, self, h_step0, self, padding). %a18
assignment(vbox, self, h_step0, self, childs_h_step0). %a8
assignment(vbox, self, h_step1, self, childs_h_step1). %a9
assignment(vbox, self, h_step2, self, childs_h_step2). %a10
assignment(vbox, self, h_stepn, self, childs_h_stepn). %a11
assignment(vbox, self, h_step0, self, padding). %a17
assignment(vbox, self, h_step0, self, gensymattrib). %a27 h
assignment(vbox, self, h_step1, self, h_step0). %a28
assignment(vbox, self, h_step2, self, h_step1). %a29
assignment(vbox, self, h_stepn, self, h_step2). %a30
assignment(vbox, self, h, self, h_stepn). %a35
assignment(vbox, self, childs_xr_step0, self, xr). %a17
assignment(vbox, self, childs_xr_step0, self, padding). %a17
assignment(vbox, self, childs_xr_step0, self, gensymattrib). %a27 childs@xr
assignment(vbox, self, childs_xr_step1, self, childs_xr_step0). %a28
assignment(vbox, self, childs_xr_step2, self, childs_xr_step1). %a29
assignment(vbox, self, childs_xr_stepn, self, childs_xr_step2). %a30
assignment(vbox, childsunroll0, xr, self, childs_xr_step0). %a31b
assignment(vbox, childsunroll1, xr, self, childs_xr_step1). %a32
assignment(vbox, childsunroll2, xr, self, childs_xr_step2). %a33
assignment(vbox, childsunrolln, xr, self, childs_xr_stepn). %a34
assignment(vbox, self, w_step0, self, padding). %a18
assignment(vbox, self, w_step0, self, childs_w_step0). %a8
assignment(vbox, self, w_step1, self, childs_w_step1). %a9
assignment(vbox, self, w_step2, self, childs_w_step2). %a10
assignment(vbox, self, w_stepn, self, childs_w_stepn). %a11
assignment(vbox, self, w_step0, self, padding). %a17
assignment(vbox, self, w_step0, self, gensymattrib). %a27 w
assignment(vbox, self, w_step1, self, w_step0). %a28
assignment(vbox, self, w_step2, self, w_step1). %a29
assignment(vbox, self, w_stepn, self, w_step2). %a30
assignment(vbox, self, w, self, w_stepn). %a35
assignment(vbox, self, childs_by_step0, self, y). %a18
assignment(vbox, self, childs_by_step0, self, childs_h_step0). %a8
assignment(vbox, self, childs_by_step1, self, childs_h_step1). %a9
assignment(vbox, self, childs_by_step2, self, childs_h_step2). %a10
assignment(vbox, self, childs_by_stepn, self, childs_h_stepn). %a11
assignment(vbox, self, childs_by_step0, self, padding). %a17
assignment(vbox, self, childs_by_step0, self, gensymattrib). %a27 childs@by
assignment(vbox, self, childs_by_step1, self, childs_by_step0). %a28
assignment(vbox, self, childs_by_step2, self, childs_by_step1). %a29
assignment(vbox, self, childs_by_stepn, self, childs_by_step2). %a30
assignment(vbox, childsunroll0, by, self, childs_by_step0). %a31b
assignment(vbox, childsunroll1, by, self, childs_by_step1). %a32
assignment(vbox, childsunroll2, by, self, childs_by_step2). %a33
assignment(vbox, childsunrolln, by, self, childs_by_stepn). %a34
assignment(vbox, self, childs_padding_step0, self, padding). %a17
assignment(vbox, self, childs_padding_step0, self, gensymattrib). %a27 childs@padding
assignment(vbox, self, childs_padding_step1, self, childs_padding_step0). %a28
assignment(vbox, self, childs_padding_step2, self, childs_padding_step1). %a29
assignment(vbox, self, childs_padding_stepn, self, childs_padding_step2). %a30
assignment(vbox, childsunroll0, padding, self, childs_padding_step0). %a31b
assignment(vbox, childsunroll1, padding, self, childs_padding_step1). %a32
assignment(vbox, childsunroll2, padding, self, childs_padding_step2). %a33
assignment(vbox, childsunrolln, padding, self, childs_padding_stepn). %a34
assignment(vbox, self, childs_y_step0, self, childs_h_step0). %a8
assignment(vbox, self, childs_y_step1, self, childs_h_step1). %a9
assignment(vbox, self, childs_y_step2, self, childs_h_step2). %a10
assignment(vbox, self, childs_y_stepn, self, childs_h_stepn). %a11
assignment(vbox, self, childs_y_step0, self, childs_by_step0). %a8
assignment(vbox, self, childs_y_step1, self, childs_by_step1). %a9
assignment(vbox, self, childs_y_step2, self, childs_by_step2). %a10
assignment(vbox, self, childs_y_stepn, self, childs_by_stepn). %a11
assignment(vbox, self, childs_y_step0, self, gensymattrib). %a27 childs@y
assignment(vbox, self, childs_y_step1, self, childs_y_step0). %a28
assignment(vbox, self, childs_y_step2, self, childs_y_step1). %a29
assignment(vbox, self, childs_y_stepn, self, childs_y_step2). %a30
assignment(vbox, childsunroll0, y, self, childs_y_step0). %a31b
assignment(vbox, childsunroll1, y, self, childs_y_step1). %a32
assignment(vbox, childsunroll2, y, self, childs_y_step2). %a33
assignment(vbox, childsunrolln, y, self, childs_y_stepn). %a34
assignment(vbox, self, childs_yr_step0, self, childs_rby_step0). %a8
assignment(vbox, self, childs_yr_step1, self, childs_rby_step1). %a9
assignment(vbox, self, childs_yr_step2, self, childs_rby_step2). %a10
assignment(vbox, self, childs_yr_stepn, self, childs_rby_stepn). %a11
assignment(vbox, self, childs_yr_step0, self, childs_hr_step0). %a8
assignment(vbox, self, childs_yr_step1, self, childs_hr_step1). %a9
assignment(vbox, self, childs_yr_step2, self, childs_hr_step2). %a10
assignment(vbox, self, childs_yr_stepn, self, childs_hr_stepn). %a11
assignment(vbox, self, childs_yr_step0, self, gensymattrib). %a27 childs@yr
assignment(vbox, self, childs_yr_step1, self, childs_yr_step0). %a28
assignment(vbox, self, childs_yr_step2, self, childs_yr_step1). %a29
assignment(vbox, self, childs_yr_stepn, self, childs_yr_step2). %a30
assignment(vbox, childsunroll0, yr, self, childs_yr_step0). %a31b
assignment(vbox, childsunroll1, yr, self, childs_yr_step1). %a32
assignment(vbox, childsunroll2, yr, self, childs_yr_step2). %a33
assignment(vbox, childsunrolln, yr, self, childs_yr_stepn). %a34
assignment(vbox, self, wmax_step0, self, childs_wmin_step0). %a8
assignment(vbox, self, wmax_step1, self, childs_wmin_step1). %a9
assignment(vbox, self, wmax_step2, self, childs_wmin_step2). %a10
assignment(vbox, self, wmax_stepn, self, childs_wmin_stepn). %a11
assignment(vbox, self, wmax_step0, self, gensymattrib). %a27 wMax
assignment(vbox, self, wmax_step1, self, wmax_step0). %a28
assignment(vbox, self, wmax_step2, self, wmax_step1). %a29
assignment(vbox, self, wmax_stepn, self, wmax_step2). %a30
assignment(vbox, self, wmax, self, wmax_stepn). %a35
assignment(vbox, self, childs_canvas_step0, self, render). %a17
assignment(vbox, self, childs_canvas_step0, self, gensymattrib). %a27 childs@canvas
assignment(vbox, self, childs_canvas_step1, self, childs_canvas_step0). %a28
assignment(vbox, self, childs_canvas_step2, self, childs_canvas_step1). %a29
assignment(vbox, self, childs_canvas_stepn, self, childs_canvas_step2). %a30
assignment(vbox, childsunroll0, canvas, self, childs_canvas_step0). %a31b
assignment(vbox, childsunroll1, canvas, self, childs_canvas_step1). %a32
assignment(vbox, childsunroll2, canvas, self, childs_canvas_step2). %a33
assignment(vbox, childsunrolln, canvas, self, childs_canvas_stepn). %a34
assignment(vbox, self, hr_step0, self, padding). %a18
assignment(vbox, self, hr_step0, self, padding). %a17
assignment(vbox, self, hr_step0, self, childs_hr_step0). %a8
assignment(vbox, self, hr_step1, self, childs_hr_step1). %a9
assignment(vbox, self, hr_step2, self, childs_hr_step2). %a10
assignment(vbox, self, hr_stepn, self, childs_hr_stepn). %a11
assignment(vbox, self, hr_step0, self, gensymattrib). %a27 hr
assignment(vbox, self, hr_step1, self, hr_step0). %a28
assignment(vbox, self, hr_step2, self, hr_step1). %a29
assignment(vbox, self, hr_stepn, self, hr_step2). %a30
assignment(vbox, self, hr, self, hr_stepn). %a35
assignment(vbox, self, childs_mousey_step0, self, mousey). %a17
assignment(vbox, self, childs_mousey_step0, self, gensymattrib). %a27 childs@mouseY
assignment(vbox, self, childs_mousey_step1, self, childs_mousey_step0). %a28
assignment(vbox, self, childs_mousey_step2, self, childs_mousey_step1). %a29
assignment(vbox, self, childs_mousey_stepn, self, childs_mousey_step2). %a30
assignment(vbox, childsunroll0, mousey, self, childs_mousey_step0). %a31b
assignment(vbox, childsunroll1, mousey, self, childs_mousey_step1). %a32
assignment(vbox, childsunroll2, mousey, self, childs_mousey_step2). %a33
assignment(vbox, childsunrolln, mousey, self, childs_mousey_stepn). %a34
assignment(vbox, self, childs_rby_step0, self, yr). %a18
assignment(vbox, self, childs_rby_step0, self, padding). %a17
assignment(vbox, self, childs_rby_step0, self, childs_hr_step0). %a8
assignment(vbox, self, childs_rby_step1, self, childs_hr_step1). %a9
assignment(vbox, self, childs_rby_step2, self, childs_hr_step2). %a10
assignment(vbox, self, childs_rby_stepn, self, childs_hr_stepn). %a11
assignment(vbox, self, childs_rby_step0, self, gensymattrib). %a27 childs@rby
assignment(vbox, self, childs_rby_step1, self, childs_rby_step0). %a28
assignment(vbox, self, childs_rby_step2, self, childs_rby_step1). %a29
assignment(vbox, self, childs_rby_stepn, self, childs_rby_step2). %a30
assignment(vbox, childsunroll0, rby, self, childs_rby_step0). %a31b
assignment(vbox, childsunroll1, rby, self, childs_rby_step1). %a32
assignment(vbox, childsunroll2, rby, self, childs_rby_step2). %a33
assignment(vbox, childsunrolln, rby, self, childs_rby_stepn). %a34
assignment(vbox, self, childs_wmax_step0, self, wmax_stepn). %a16
assignment(vbox, self, childs_wmax_step0, self, gensymattrib). %a27 childs@wMax
assignment(vbox, self, childs_wmax_step1, self, childs_wmax_step0). %a28
assignment(vbox, self, childs_wmax_step2, self, childs_wmax_step1). %a29
assignment(vbox, self, childs_wmax_stepn, self, childs_wmax_step2). %a30
assignment(vbox, childsunroll0, wmax, self, childs_wmax_step0). %a31b
assignment(vbox, childsunroll1, wmax, self, childs_wmax_step1). %a32
assignment(vbox, childsunroll2, wmax, self, childs_wmax_step2). %a33
assignment(vbox, childsunrolln, wmax, self, childs_wmax_stepn). %a34
assignment(vbox, self, childs_rxr_step0, self, xr). %a17
assignment(vbox, self, childs_rxr_step0, self, padding). %a17
assignment(vbox, self, childs_rxr_step0, self, gensymattrib). %a27 childs@rxr
assignment(vbox, self, childs_rxr_step1, self, childs_rxr_step0). %a28
assignment(vbox, self, childs_rxr_step2, self, childs_rxr_step1). %a29
assignment(vbox, self, childs_rxr_stepn, self, childs_rxr_step2). %a30
assignment(vbox, childsunroll0, rxr, self, childs_rxr_step0). %a31b
assignment(vbox, childsunroll1, rxr, self, childs_rxr_step1). %a32
assignment(vbox, childsunroll2, rxr, self, childs_rxr_step2). %a33
assignment(vbox, childsunrolln, rxr, self, childs_rxr_stepn). %a34
assignment(vbox, self, childs_w_step0, self, gensymattrib). %a27 childs@w
assignment(vbox, self, childs_w_step1, self, childs_w_step0). %a28
assignment(vbox, self, childs_w_step2, self, childs_w_step1). %a29
assignment(vbox, self, childs_w_stepn, self, childs_w_step2). %a30
assignment(vbox, self, childs_w_step0, childsunroll0, w). %a45
assignment(vbox, self, childs_w_step1, childsunroll1, w). %a46
assignment(vbox, self, childs_w_step2, childsunroll2, w). %a47
assignment(vbox, self, childs_w_stepn, childsunrolln, w). %a48
assignment(vbox, self, childs_h_step0, self, gensymattrib). %a27 childs@h
assignment(vbox, self, childs_h_step1, self, childs_h_step0). %a28
assignment(vbox, self, childs_h_step2, self, childs_h_step1). %a29
assignment(vbox, self, childs_h_stepn, self, childs_h_step2). %a30
assignment(vbox, self, childs_h_step0, childsunroll0, h). %a45
assignment(vbox, self, childs_h_step1, childsunroll1, h). %a46
assignment(vbox, self, childs_h_step2, childsunroll2, h). %a47
assignment(vbox, self, childs_h_stepn, childsunrolln, h). %a48
assignment(vbox, self, childs_hr_step0, self, gensymattrib). %a27 childs@hr
assignment(vbox, self, childs_hr_step1, self, childs_hr_step0). %a28
assignment(vbox, self, childs_hr_step2, self, childs_hr_step1). %a29
assignment(vbox, self, childs_hr_stepn, self, childs_hr_step2). %a30
assignment(vbox, self, childs_hr_step0, childsunroll0, hr). %a45
assignment(vbox, self, childs_hr_step1, childsunroll1, hr). %a46
assignment(vbox, self, childs_hr_step2, childsunroll2, hr). %a47
assignment(vbox, self, childs_hr_stepn, childsunrolln, hr). %a48
assignment(vbox, self, childs_wmin_step0, self, gensymattrib). %a27 childs@wMin
assignment(vbox, self, childs_wmin_step1, self, childs_wmin_step0). %a28
assignment(vbox, self, childs_wmin_step2, self, childs_wmin_step1). %a29
assignment(vbox, self, childs_wmin_stepn, self, childs_wmin_step2). %a30
assignment(vbox, self, childs_wmin_step0, childsunroll0, wmin). %a45
assignment(vbox, self, childs_wmin_step1, childsunroll1, wmin). %a46
assignment(vbox, self, childs_wmin_step2, childsunroll2, wmin). %a47
assignment(vbox, self, childs_wmin_stepn, childsunrolln, wmin). %a48
assignment(hbox, self, render, self, hr). %a42
assignment(hbox, self, render, self, yr). %a42
assignment(hbox, self, render, self, xr). %a42
assignment(hbox, self, render, self, canvas). %a42
assignment(hbox, self, render, self, wr). %a42
assignment(hbox, self, wr, self, wmax). %a42
assignment(hbox, self, h_step0, self, padding). %a18
assignment(hbox, self, h_step0, self, childs_h_step0). %a8
assignment(hbox, self, h_step1, self, childs_h_step1). %a9
assignment(hbox, self, h_step2, self, childs_h_step2). %a10
assignment(hbox, self, h_stepn, self, childs_h_stepn). %a11
assignment(hbox, self, h_step0, self, padding). %a17
assignment(hbox, self, h_step0, self, gensymattrib). %a27 h
assignment(hbox, self, h_step1, self, h_step0). %a28
assignment(hbox, self, h_step2, self, h_step1). %a29
assignment(hbox, self, h_stepn, self, h_step2). %a30
assignment(hbox, self, h, self, h_stepn). %a35
assignment(hbox, self, childs_xr_step0, self, childs_rxr_step0). %a8
assignment(hbox, self, childs_xr_step1, self, childs_rxr_step1). %a9
assignment(hbox, self, childs_xr_step2, self, childs_rxr_step2). %a10
assignment(hbox, self, childs_xr_stepn, self, childs_rxr_stepn). %a11
assignment(hbox, self, childs_xr_step0, self, childs_wr_step0). %a8
assignment(hbox, self, childs_xr_step1, self, childs_wr_step1). %a9
assignment(hbox, self, childs_xr_step2, self, childs_wr_step2). %a10
assignment(hbox, self, childs_xr_stepn, self, childs_wr_stepn). %a11
assignment(hbox, self, childs_xr_step0, self, gensymattrib). %a27 childs@xr
assignment(hbox, self, childs_xr_step1, self, childs_xr_step0). %a28
assignment(hbox, self, childs_xr_step2, self, childs_xr_step1). %a29
assignment(hbox, self, childs_xr_stepn, self, childs_xr_step2). %a30
assignment(hbox, childsunroll0, xr, self, childs_xr_step0). %a31b
assignment(hbox, childsunroll1, xr, self, childs_xr_step1). %a32
assignment(hbox, childsunroll2, xr, self, childs_xr_step2). %a33
assignment(hbox, childsunrolln, xr, self, childs_xr_stepn). %a34
assignment(hbox, self, w_step0, self, padding). %a18
assignment(hbox, self, w_step0, self, childs_w_step0). %a8
assignment(hbox, self, w_step1, self, childs_w_step1). %a9
assignment(hbox, self, w_step2, self, childs_w_step2). %a10
assignment(hbox, self, w_stepn, self, childs_w_stepn). %a11
assignment(hbox, self, w_step0, self, padding). %a17
assignment(hbox, self, w_step0, self, gensymattrib). %a27 w
assignment(hbox, self, w_step1, self, w_step0). %a28
assignment(hbox, self, w_step2, self, w_step1). %a29
assignment(hbox, self, w_stepn, self, w_step2). %a30
assignment(hbox, self, w, self, w_stepn). %a35
assignment(hbox, self, wmin_step0, self, padding). %a18
assignment(hbox, self, wmin_step0, self, padding). %a17
assignment(hbox, self, wmin_step0, self, childs_wr_step0). %a8
assignment(hbox, self, wmin_step1, self, childs_wr_step1). %a9
assignment(hbox, self, wmin_step2, self, childs_wr_step2). %a10
assignment(hbox, self, wmin_stepn, self, childs_wr_stepn). %a11
assignment(hbox, self, wmin_step0, self, gensymattrib). %a27 wMin
assignment(hbox, self, wmin_step1, self, wmin_step0). %a28
assignment(hbox, self, wmin_step2, self, wmin_step1). %a29
assignment(hbox, self, wmin_stepn, self, wmin_step2). %a30
assignment(hbox, self, wmin, self, wmin_stepn). %a35
assignment(hbox, self, hr_step0, self, padding). %a18
assignment(hbox, self, hr_step0, self, padding). %a17
assignment(hbox, self, hr_step0, self, childs_hr_step0). %a8
assignment(hbox, self, hr_step1, self, childs_hr_step1). %a9
assignment(hbox, self, hr_step2, self, childs_hr_step2). %a10
assignment(hbox, self, hr_stepn, self, childs_hr_stepn). %a11
assignment(hbox, self, hr_step0, self, gensymattrib). %a27 hr
assignment(hbox, self, hr_step1, self, hr_step0). %a28
assignment(hbox, self, hr_step2, self, hr_step1). %a29
assignment(hbox, self, hr_stepn, self, hr_step2). %a30
assignment(hbox, self, hr, self, hr_stepn). %a35
assignment(hbox, self, childs_x_step0, self, childs_rx_step0). %a8
assignment(hbox, self, childs_x_step1, self, childs_rx_step1). %a9
assignment(hbox, self, childs_x_step2, self, childs_rx_step2). %a10
assignment(hbox, self, childs_x_stepn, self, childs_rx_stepn). %a11
assignment(hbox, self, childs_x_step0, self, childs_w_step0). %a8
assignment(hbox, self, childs_x_step1, self, childs_w_step1). %a9
assignment(hbox, self, childs_x_step2, self, childs_w_step2). %a10
assignment(hbox, self, childs_x_stepn, self, childs_w_stepn). %a11
assignment(hbox, self, childs_x_step0, self, gensymattrib). %a27 childs@x
assignment(hbox, self, childs_x_step1, self, childs_x_step0). %a28
assignment(hbox, self, childs_x_step2, self, childs_x_step1). %a29
assignment(hbox, self, childs_x_stepn, self, childs_x_step2). %a30
assignment(hbox, childsunroll0, x, self, childs_x_step0). %a31b
assignment(hbox, childsunroll1, x, self, childs_x_step1). %a32
assignment(hbox, childsunroll2, x, self, childs_x_step2). %a33
assignment(hbox, childsunrolln, x, self, childs_x_stepn). %a34
assignment(hbox, self, childs_mousex_step0, self, mousex). %a17
assignment(hbox, self, childs_mousex_step0, self, gensymattrib). %a27 childs@mouseX
assignment(hbox, self, childs_mousex_step1, self, childs_mousex_step0). %a28
assignment(hbox, self, childs_mousex_step2, self, childs_mousex_step1). %a29
assignment(hbox, self, childs_mousex_stepn, self, childs_mousex_step2). %a30
assignment(hbox, childsunroll0, mousex, self, childs_mousex_step0). %a31b
assignment(hbox, childsunroll1, mousex, self, childs_mousex_step1). %a32
assignment(hbox, childsunroll2, mousex, self, childs_mousex_step2). %a33
assignment(hbox, childsunrolln, mousex, self, childs_mousex_stepn). %a34
assignment(hbox, self, childs_rx_step0, self, x). %a18
assignment(hbox, self, childs_rx_step0, self, childs_w_step0). %a8
assignment(hbox, self, childs_rx_step1, self, childs_w_step1). %a9
assignment(hbox, self, childs_rx_step2, self, childs_w_step2). %a10
assignment(hbox, self, childs_rx_stepn, self, childs_w_stepn). %a11
assignment(hbox, self, childs_rx_step0, self, padding). %a17
assignment(hbox, self, childs_rx_step0, self, gensymattrib). %a27 childs@rx
assignment(hbox, self, childs_rx_step1, self, childs_rx_step0). %a28
assignment(hbox, self, childs_rx_step2, self, childs_rx_step1). %a29
assignment(hbox, self, childs_rx_stepn, self, childs_rx_step2). %a30
assignment(hbox, childsunroll0, rx, self, childs_rx_step0). %a31b
assignment(hbox, childsunroll1, rx, self, childs_rx_step1). %a32
assignment(hbox, childsunroll2, rx, self, childs_rx_step2). %a33
assignment(hbox, childsunrolln, rx, self, childs_rx_stepn). %a34
assignment(hbox, self, childs_canvas_step0, self, render). %a17
assignment(hbox, self, childs_canvas_step0, self, gensymattrib). %a27 childs@canvas
assignment(hbox, self, childs_canvas_step1, self, childs_canvas_step0). %a28
assignment(hbox, self, childs_canvas_step2, self, childs_canvas_step1). %a29
assignment(hbox, self, childs_canvas_stepn, self, childs_canvas_step2). %a30
assignment(hbox, childsunroll0, canvas, self, childs_canvas_step0). %a31b
assignment(hbox, childsunroll1, canvas, self, childs_canvas_step1). %a32
assignment(hbox, childsunroll2, canvas, self, childs_canvas_step2). %a33
assignment(hbox, childsunrolln, canvas, self, childs_canvas_stepn). %a34
assignment(hbox, self, childs_yr_step0, self, yr). %a17
assignment(hbox, self, childs_yr_step0, self, padding). %a17
assignment(hbox, self, childs_yr_step0, self, gensymattrib). %a27 childs@yr
assignment(hbox, self, childs_yr_step1, self, childs_yr_step0). %a28
assignment(hbox, self, childs_yr_step2, self, childs_yr_step1). %a29
assignment(hbox, self, childs_yr_stepn, self, childs_yr_step2). %a30
assignment(hbox, childsunroll0, yr, self, childs_yr_step0). %a31b
assignment(hbox, childsunroll1, yr, self, childs_yr_step1). %a32
assignment(hbox, childsunroll2, yr, self, childs_yr_step2). %a33
assignment(hbox, childsunrolln, yr, self, childs_yr_stepn). %a34
assignment(hbox, self, childs_by_step0, self, childs_h_step0). %a8
assignment(hbox, self, childs_by_step1, self, childs_h_step1). %a9
assignment(hbox, self, childs_by_step2, self, childs_h_step2). %a10
assignment(hbox, self, childs_by_stepn, self, childs_h_stepn). %a11
assignment(hbox, self, childs_by_step0, self, childs_y_step0). %a8
assignment(hbox, self, childs_by_step1, self, childs_y_step1). %a9
assignment(hbox, self, childs_by_step2, self, childs_y_step2). %a10
assignment(hbox, self, childs_by_stepn, self, childs_y_stepn). %a11
assignment(hbox, self, childs_by_step0, self, gensymattrib). %a27 childs@by
assignment(hbox, self, childs_by_step1, self, childs_by_step0). %a28
assignment(hbox, self, childs_by_step2, self, childs_by_step1). %a29
assignment(hbox, self, childs_by_stepn, self, childs_by_step2). %a30
assignment(hbox, childsunroll0, by, self, childs_by_step0). %a31b
assignment(hbox, childsunroll1, by, self, childs_by_step1). %a32
assignment(hbox, childsunroll2, by, self, childs_by_step2). %a33
assignment(hbox, childsunrolln, by, self, childs_by_stepn). %a34
assignment(hbox, self, childs_rby_step0, self, childs_hr_step0). %a8
assignment(hbox, self, childs_rby_step1, self, childs_hr_step1). %a9
assignment(hbox, self, childs_rby_step2, self, childs_hr_step2). %a10
assignment(hbox, self, childs_rby_stepn, self, childs_hr_stepn). %a11
assignment(hbox, self, childs_rby_step0, self, childs_yr_step0). %a8
assignment(hbox, self, childs_rby_step1, self, childs_yr_step1). %a9
assignment(hbox, self, childs_rby_step2, self, childs_yr_step2). %a10
assignment(hbox, self, childs_rby_stepn, self, childs_yr_stepn). %a11
assignment(hbox, self, childs_rby_step0, self, gensymattrib). %a27 childs@rby
assignment(hbox, self, childs_rby_step1, self, childs_rby_step0). %a28
assignment(hbox, self, childs_rby_step2, self, childs_rby_step1). %a29
assignment(hbox, self, childs_rby_stepn, self, childs_rby_step2). %a30
assignment(hbox, childsunroll0, rby, self, childs_rby_step0). %a31b
assignment(hbox, childsunroll1, rby, self, childs_rby_step1). %a32
assignment(hbox, childsunroll2, rby, self, childs_rby_step2). %a33
assignment(hbox, childsunrolln, rby, self, childs_rby_stepn). %a34
assignment(hbox, self, childs_mousey_step0, self, mousey). %a17
assignment(hbox, self, childs_mousey_step0, self, gensymattrib). %a27 childs@mouseY
assignment(hbox, self, childs_mousey_step1, self, childs_mousey_step0). %a28
assignment(hbox, self, childs_mousey_step2, self, childs_mousey_step1). %a29
assignment(hbox, self, childs_mousey_stepn, self, childs_mousey_step2). %a30
assignment(hbox, childsunroll0, mousey, self, childs_mousey_step0). %a31b
assignment(hbox, childsunroll1, mousey, self, childs_mousey_step1). %a32
assignment(hbox, childsunroll2, mousey, self, childs_mousey_step2). %a33
assignment(hbox, childsunrolln, mousey, self, childs_mousey_stepn). %a34
assignment(hbox, self, childs_y_step0, self, padding). %a17
assignment(hbox, self, childs_y_step0, self, y). %a17
assignment(hbox, self, childs_y_step0, self, gensymattrib). %a27 childs@y
assignment(hbox, self, childs_y_step1, self, childs_y_step0). %a28
assignment(hbox, self, childs_y_step2, self, childs_y_step1). %a29
assignment(hbox, self, childs_y_stepn, self, childs_y_step2). %a30
assignment(hbox, childsunroll0, y, self, childs_y_step0). %a31b
assignment(hbox, childsunroll1, y, self, childs_y_step1). %a32
assignment(hbox, childsunroll2, y, self, childs_y_step2). %a33
assignment(hbox, childsunrolln, y, self, childs_y_stepn). %a34
assignment(hbox, self, childs_rxr_step0, self, xr). %a18
assignment(hbox, self, childs_rxr_step0, self, padding). %a17
assignment(hbox, self, childs_rxr_step0, self, childs_wr_step0). %a8
assignment(hbox, self, childs_rxr_step1, self, childs_wr_step1). %a9
assignment(hbox, self, childs_rxr_step2, self, childs_wr_step2). %a10
assignment(hbox, self, childs_rxr_stepn, self, childs_wr_stepn). %a11
assignment(hbox, self, childs_rxr_step0, self, gensymattrib). %a27 childs@rxr
assignment(hbox, self, childs_rxr_step1, self, childs_rxr_step0). %a28
assignment(hbox, self, childs_rxr_step2, self, childs_rxr_step1). %a29
assignment(hbox, self, childs_rxr_stepn, self, childs_rxr_step2). %a30
assignment(hbox, childsunroll0, rxr, self, childs_rxr_step0). %a31b
assignment(hbox, childsunroll1, rxr, self, childs_rxr_step1). %a32
assignment(hbox, childsunroll2, rxr, self, childs_rxr_step2). %a33
assignment(hbox, childsunrolln, rxr, self, childs_rxr_stepn). %a34
assignment(hbox, self, childs_padding_step0, self, padding). %a17
assignment(hbox, self, childs_padding_step0, self, gensymattrib). %a27 childs@padding
assignment(hbox, self, childs_padding_step1, self, childs_padding_step0). %a28
assignment(hbox, self, childs_padding_step2, self, childs_padding_step1). %a29
assignment(hbox, self, childs_padding_stepn, self, childs_padding_step2). %a30
assignment(hbox, childsunroll0, padding, self, childs_padding_step0). %a31b
assignment(hbox, childsunroll1, padding, self, childs_padding_step1). %a32
assignment(hbox, childsunroll2, padding, self, childs_padding_step2). %a33
assignment(hbox, childsunrolln, padding, self, childs_padding_stepn). %a34
assignment(hbox, self, childs_w_step0, self, gensymattrib). %a27 childs@w
assignment(hbox, self, childs_w_step1, self, childs_w_step0). %a28
assignment(hbox, self, childs_w_step2, self, childs_w_step1). %a29
assignment(hbox, self, childs_w_stepn, self, childs_w_step2). %a30
assignment(hbox, self, childs_w_step0, childsunroll0, w). %a45
assignment(hbox, self, childs_w_step1, childsunroll1, w). %a46
assignment(hbox, self, childs_w_step2, childsunroll2, w). %a47
assignment(hbox, self, childs_w_stepn, childsunrolln, w). %a48
assignment(hbox, self, childs_h_step0, self, gensymattrib). %a27 childs@h
assignment(hbox, self, childs_h_step1, self, childs_h_step0). %a28
assignment(hbox, self, childs_h_step2, self, childs_h_step1). %a29
assignment(hbox, self, childs_h_stepn, self, childs_h_step2). %a30
assignment(hbox, self, childs_h_step0, childsunroll0, h). %a45
assignment(hbox, self, childs_h_step1, childsunroll1, h). %a46
assignment(hbox, self, childs_h_step2, childsunroll2, h). %a47
assignment(hbox, self, childs_h_stepn, childsunrolln, h). %a48
assignment(hbox, self, childs_wr_step0, self, gensymattrib). %a27 childs@wr
assignment(hbox, self, childs_wr_step1, self, childs_wr_step0). %a28
assignment(hbox, self, childs_wr_step2, self, childs_wr_step1). %a29
assignment(hbox, self, childs_wr_stepn, self, childs_wr_step2). %a30
assignment(hbox, self, childs_wr_step0, childsunroll0, wr). %a45
assignment(hbox, self, childs_wr_step1, childsunroll1, wr). %a46
assignment(hbox, self, childs_wr_step2, childsunroll2, wr). %a47
assignment(hbox, self, childs_wr_stepn, childsunrolln, wr). %a48
assignment(hbox, self, childs_hr_step0, self, gensymattrib). %a27 childs@hr
assignment(hbox, self, childs_hr_step1, self, childs_hr_step0). %a28
assignment(hbox, self, childs_hr_step2, self, childs_hr_step1). %a29
assignment(hbox, self, childs_hr_stepn, self, childs_hr_step2). %a30
assignment(hbox, self, childs_hr_step0, childsunroll0, hr). %a45
assignment(hbox, self, childs_hr_step1, childsunroll1, hr). %a46
assignment(hbox, self, childs_hr_step2, childsunroll2, hr). %a47
assignment(hbox, self, childs_hr_stepn, childsunrolln, hr). %a48
assignment(leaf, self, w, self, padding). %a42
assignment(leaf, self, render, self, mousey). %a42
assignment(leaf, self, render, self, hr). %a42
assignment(leaf, self, render, self, yr). %a42
assignment(leaf, self, render, self, mousex). %a42
assignment(leaf, self, render, self, xr). %a42
assignment(leaf, self, render, self, canvas). %a42
assignment(leaf, self, render, self, wr). %a42
assignment(leaf, self, wr, self, w). %a42
assignment(leaf, self, wr, self, mult). %a42
assignment(leaf, self, mult, self, mousey). %a42
assignment(leaf, self, mult, self, enlargemult). %a42
assignment(leaf, self, mult, self, mousex). %a42
assignment(leaf, self, mult, self, padding). %a42
assignment(leaf, self, mult, self, y). %a42
assignment(leaf, self, mult, self, x). %a42
assignment(leaf, self, h, self, padding). %a42
assignment(leaf, self, hr, self, mult). %a42
assignment(leaf, self, hr, self, h). %a42
assignment(gensymattrib, gensymattrib, gensymattrib, gensymattrib, gensymattrib) :- false.
classAttribute(top, hr). %s1
classAttribute(top, done). %s1
classAttribute(top, canvas). %s1
classAttribute(top, wr). %s1
classAttribute(vbox, wmax). %s1
classAttribute(vbox, childs_wmin_step0). %s2 childs@wmin
classAttribute(vbox, childs_wmin_step1). %s3
classAttribute(vbox, childs_wmin_step2). %s4
classAttribute(vbox, childs_wmin_stepn). %s5
classAttribute(vbox, childs_h_step0). %s2 childs@h
classAttribute(vbox, childs_h_step1). %s3
classAttribute(vbox, childs_h_step2). %s4
classAttribute(vbox, childs_h_stepn). %s5
classAttribute(vbox, childs_wmax_step0). %s2 childs@wmax
classAttribute(vbox, childs_wmax_step1). %s3
classAttribute(vbox, childs_wmax_step2). %s4
classAttribute(vbox, childs_wmax_stepn). %s5
classAttribute(vbox, hr_step0). %s2 self@hr
classAttribute(vbox, hr_step1). %s3
classAttribute(vbox, hr_step2). %s4
classAttribute(vbox, hr_stepn). %s5
classAttribute(vbox, h_step0). %s2 self@h
classAttribute(vbox, h_step1). %s3
classAttribute(vbox, h_step2). %s4
classAttribute(vbox, h_stepn). %s5
classAttribute(vbox, childs_by_step0). %s2 childs@by
classAttribute(vbox, childs_by_step1). %s3
classAttribute(vbox, childs_by_step2). %s4
classAttribute(vbox, childs_by_stepn). %s5
classAttribute(vbox, childs_rx_step0). %s2 childs@rx
classAttribute(vbox, childs_rx_step1). %s3
classAttribute(vbox, childs_rx_step2). %s4
classAttribute(vbox, childs_rx_stepn). %s5
classAttribute(vbox, wmax_step0). %s2 self@wmax
classAttribute(vbox, wmax_step1). %s3
classAttribute(vbox, wmax_step2). %s4
classAttribute(vbox, wmax_stepn). %s5
classAttribute(vbox, childs_rxr_step0). %s2 childs@rxr
classAttribute(vbox, childs_rxr_step1). %s3
classAttribute(vbox, childs_rxr_step2). %s4
classAttribute(vbox, childs_rxr_stepn). %s5
classAttribute(vbox, childs_y_step0). %s2 childs@y
classAttribute(vbox, childs_y_step1). %s3
classAttribute(vbox, childs_y_step2). %s4
classAttribute(vbox, childs_y_stepn). %s5
classAttribute(vbox, childs_canvas_step0). %s2 childs@canvas
classAttribute(vbox, childs_canvas_step1). %s3
classAttribute(vbox, childs_canvas_step2). %s4
classAttribute(vbox, childs_canvas_stepn). %s5
classAttribute(vbox, childs_hr_step0). %s2 childs@hr
classAttribute(vbox, childs_hr_step1). %s3
classAttribute(vbox, childs_hr_step2). %s4
classAttribute(vbox, childs_hr_stepn). %s5
classAttribute(vbox, childs_yr_step0). %s2 childs@yr
classAttribute(vbox, childs_yr_step1). %s3
classAttribute(vbox, childs_yr_step2). %s4
classAttribute(vbox, childs_yr_stepn). %s5
classAttribute(vbox, childs_w_step0). %s2 childs@w
classAttribute(vbox, childs_w_step1). %s3
classAttribute(vbox, childs_w_step2). %s4
classAttribute(vbox, childs_w_stepn). %s5
classAttribute(vbox, childs_x_step0). %s2 childs@x
classAttribute(vbox, childs_x_step1). %s3
classAttribute(vbox, childs_x_step2). %s4
classAttribute(vbox, childs_x_stepn). %s5
classAttribute(vbox, childs_xr_step0). %s2 childs@xr
classAttribute(vbox, childs_xr_step1). %s3
classAttribute(vbox, childs_xr_step2). %s4
classAttribute(vbox, childs_xr_stepn). %s5
classAttribute(vbox, childs_mousey_step0). %s2 childs@mousey
classAttribute(vbox, childs_mousey_step1). %s3
classAttribute(vbox, childs_mousey_step2). %s4
classAttribute(vbox, childs_mousey_stepn). %s5
classAttribute(vbox, childs_mousex_step0). %s2 childs@mousex
classAttribute(vbox, childs_mousex_step1). %s3
classAttribute(vbox, childs_mousex_step2). %s4
classAttribute(vbox, childs_mousex_stepn). %s5
classAttribute(vbox, childs_rby_step0). %s2 childs@rby
classAttribute(vbox, childs_rby_step1). %s3
classAttribute(vbox, childs_rby_step2). %s4
classAttribute(vbox, childs_rby_stepn). %s5
classAttribute(vbox, childs_padding_step0). %s2 childs@padding
classAttribute(vbox, childs_padding_step1). %s3
classAttribute(vbox, childs_padding_step2). %s4
classAttribute(vbox, childs_padding_stepn). %s5
classAttribute(vbox, w_step0). %s2 self@w
classAttribute(vbox, w_step1). %s3
classAttribute(vbox, w_step2). %s4
classAttribute(vbox, w_stepn). %s5
classAttribute(hbox, childs_h_step0). %s2 childs@h
classAttribute(hbox, childs_h_step1). %s3
classAttribute(hbox, childs_h_step2). %s4
classAttribute(hbox, childs_h_stepn). %s5
classAttribute(hbox, hr_step0). %s2 self@hr
classAttribute(hbox, hr_step1). %s3
classAttribute(hbox, hr_step2). %s4
classAttribute(hbox, hr_stepn). %s5
classAttribute(hbox, h_step0). %s2 self@h
classAttribute(hbox, h_step1). %s3
classAttribute(hbox, h_step2). %s4
classAttribute(hbox, h_stepn). %s5
classAttribute(hbox, wmin_step0). %s2 self@wmin
classAttribute(hbox, wmin_step1). %s3
classAttribute(hbox, wmin_step2). %s4
classAttribute(hbox, wmin_stepn). %s5
classAttribute(hbox, childs_by_step0). %s2 childs@by
classAttribute(hbox, childs_by_step1). %s3
classAttribute(hbox, childs_by_step2). %s4
classAttribute(hbox, childs_by_stepn). %s5
classAttribute(hbox, childs_wr_step0). %s2 childs@wr
classAttribute(hbox, childs_wr_step1). %s3
classAttribute(hbox, childs_wr_step2). %s4
classAttribute(hbox, childs_wr_stepn). %s5
classAttribute(hbox, childs_rx_step0). %s2 childs@rx
classAttribute(hbox, childs_rx_step1). %s3
classAttribute(hbox, childs_rx_step2). %s4
classAttribute(hbox, childs_rx_stepn). %s5
classAttribute(hbox, childs_rxr_step0). %s2 childs@rxr
classAttribute(hbox, childs_rxr_step1). %s3
classAttribute(hbox, childs_rxr_step2). %s4
classAttribute(hbox, childs_rxr_stepn). %s5
classAttribute(hbox, childs_y_step0). %s2 childs@y
classAttribute(hbox, childs_y_step1). %s3
classAttribute(hbox, childs_y_step2). %s4
classAttribute(hbox, childs_y_stepn). %s5
classAttribute(hbox, childs_canvas_step0). %s2 childs@canvas
classAttribute(hbox, childs_canvas_step1). %s3
classAttribute(hbox, childs_canvas_step2). %s4
classAttribute(hbox, childs_canvas_stepn). %s5
classAttribute(hbox, childs_hr_step0). %s2 childs@hr
classAttribute(hbox, childs_hr_step1). %s3
classAttribute(hbox, childs_hr_step2). %s4
classAttribute(hbox, childs_hr_stepn). %s5
classAttribute(hbox, childs_yr_step0). %s2 childs@yr
classAttribute(hbox, childs_yr_step1). %s3
classAttribute(hbox, childs_yr_step2). %s4
classAttribute(hbox, childs_yr_stepn). %s5
classAttribute(hbox, childs_w_step0). %s2 childs@w
classAttribute(hbox, childs_w_step1). %s3
classAttribute(hbox, childs_w_step2). %s4
classAttribute(hbox, childs_w_stepn). %s5
classAttribute(hbox, childs_xr_step0). %s2 childs@xr
classAttribute(hbox, childs_xr_step1). %s3
classAttribute(hbox, childs_xr_step2). %s4
classAttribute(hbox, childs_xr_stepn). %s5
classAttribute(hbox, childs_x_step0). %s2 childs@x
classAttribute(hbox, childs_x_step1). %s3
classAttribute(hbox, childs_x_step2). %s4
classAttribute(hbox, childs_x_stepn). %s5
classAttribute(hbox, childs_mousey_step0). %s2 childs@mousey
classAttribute(hbox, childs_mousey_step1). %s3
classAttribute(hbox, childs_mousey_step2). %s4
classAttribute(hbox, childs_mousey_stepn). %s5
classAttribute(hbox, childs_rby_step0). %s2 childs@rby
classAttribute(hbox, childs_rby_step1). %s3
classAttribute(hbox, childs_rby_step2). %s4
classAttribute(hbox, childs_rby_stepn). %s5
classAttribute(hbox, childs_mousex_step0). %s2 childs@mousex
classAttribute(hbox, childs_mousex_step1). %s3
classAttribute(hbox, childs_mousex_step2). %s4
classAttribute(hbox, childs_mousex_stepn). %s5
classAttribute(hbox, childs_padding_step0). %s2 childs@padding
classAttribute(hbox, childs_padding_step1). %s3
classAttribute(hbox, childs_padding_step2). %s4
classAttribute(hbox, childs_padding_stepn). %s5
classAttribute(hbox, w_step0). %s2 self@w
classAttribute(hbox, w_step1). %s3
classAttribute(hbox, w_step2). %s4
classAttribute(hbox, w_stepn). %s5
classAttribute(leaf, mult). %s1
