interface(node).
interface(root).
interface(celli).
interface(rowi).
interface(coli).
interface(colsi).
interfaceAttribute(node, relx).
interfaceAttribute(node, canvas).
interfaceAttribute(node, relrightx).
interfaceAttribute(node, relboty).
interfaceAttribute(node, computedwidth).
interfaceAttribute(node, render).
interfaceAttribute(node, computedheight).
interfaceAttribute(node, intrinsminwidth).
interfaceAttribute(node, lineh).
interfaceAttribute(node, availablewidth).
interfaceAttribute(node, absy).
interfaceAttribute(node, intrinsprefwidth).
interfaceAttribute(node, absx).
interfaceAttribute(node, intrinsheight).
interfaceAttribute(node, rely).
interfaceAttribute(celli, cellnum).
interfaceAttribute(celli, relx).
interfaceAttribute(celli, canvas).
interfaceAttribute(celli, relboty).
interfaceAttribute(celli, computedwidth).
interfaceAttribute(celli, row).
interfaceAttribute(celli, render).
interfaceAttribute(celli, computedheight).
interfaceAttribute(celli, intrinsminwidth).
interfaceAttribute(celli, availablewidth).
interfaceAttribute(celli, column).
interfaceAttribute(celli, absy).
interfaceAttribute(celli, intrinsprefwidth).
interfaceAttribute(celli, absx).
interfaceAttribute(celli, intrinsheight).
interfaceAttribute(celli, rely).
interfaceAttribute(rowi, cells).
interfaceAttribute(rowi, tablecontentwidth).
interfaceAttribute(rowi, relboty).
interfaceAttribute(rowi, canvas).
interfaceAttribute(rowi, computedwidth).
interfaceAttribute(rowi, colcount).
interfaceAttribute(rowi, computedheight).
interfaceAttribute(rowi, render).
interfaceAttribute(rowi, intrinscolcount).
interfaceAttribute(rowi, absy).
interfaceAttribute(rowi, colassignment).
interfaceAttribute(rowi, absx).
interfaceAttribute(rowi, intrinsheight).
interfaceAttribute(rowi, rownum).
interfaceAttribute(rowi, rely).
interfaceAttribute(coli, relx).
interfaceAttribute(coli, canvas).
interfaceAttribute(coli, relrightx).
interfaceAttribute(coli, computedwidth).
interfaceAttribute(coli, colcount).
interfaceAttribute(coli, tablecontentheight).
interfaceAttribute(coli, render).
interfaceAttribute(coli, colnum).
interfaceAttribute(coli, computedheight).
interfaceAttribute(coli, intrinsminwidth).
interfaceAttribute(coli, cellsready).
interfaceAttribute(coli, availablewidth).
interfaceAttribute(coli, intrinsprefwidth).
interfaceAttribute(coli, absy).
interfaceAttribute(coli, absx).
interfaceAttribute(coli, intrinsheight).
interfaceAttribute(coli, rely).
interfaceAttribute(colsi, intrinsminwidth).
interfaceAttribute(colsi, cellsready).
interfaceAttribute(colsi, availablewidth).
interfaceAttribute(colsi, tablecontentwidth).
interfaceAttribute(colsi, canvas).
interfaceAttribute(colsi, absy).
interfaceAttribute(colsi, intrinsprefwidth).
interfaceAttribute(colsi, absx).
interfaceAttribute(colsi, colcount).
interfaceAttribute(colsi, tablecontentheight).
class(top, root).
class(leaf, node).
class(wrapbox, node).
class(cell, celli).
class(row, rowi).
class(col, coli).
class(cols, colsi).
class(tablebox, node).
classChild(top, child, node).
classChild(wrapbox, childs, node).
classChild(cell, childs, node).
classChild(row, childs, celli).
classChild(col, childs, celli).
classChild(cols, cols, coli).
classChild(tablebox, columns, colsi).
classChild(tablebox, rows, rowi).
classField(gensymattrib, gensymattrib) :- false.
classField(top, gensymattrib).
classField(leaf, gensymattrib).
classField(leaf, borderc).
classField(wrapbox, gensymattrib).
classField(wrapbox, borderc).
classField(cell, gensymattrib).
classField(cell, borderc).
classField(row, gensymattrib).
classField(row, borderc).
classField(col, gensymattrib).
classField(col, height).
classField(col, minwidth).
classField(col, width).
classField(col, borderc).
classField(col, maxwidth).
classField(col, percentwidth).
classField(cols, gensymattrib).
classField(tablebox, gensymattrib).
classField(tablebox, borderc).
interfaceField(node, height).
interfaceField(node, minwidth).
interfaceField(node, width).
interfaceField(node, maxwidth).
interfaceField(node, display).
interfaceField(node, refname).
interfaceField(node, percentwidth).
interfaceField(root, w).
interfaceField(root, display).
interfaceField(root, refname).
interfaceField(root, h).
interfaceField(celli, height).
interfaceField(celli, minwidth).
interfaceField(celli, colspan).
interfaceField(celli, width).
interfaceField(celli, maxwidth).
interfaceField(celli, rowspan).
interfaceField(celli, display).
interfaceField(celli, refname).
interfaceField(celli, percentwidth).
interfaceField(rowi, height).
interfaceField(rowi, display).
interfaceField(rowi, refname).
interfaceField(coli, display).
interfaceField(coli, refname).
interfaceField(colsi, display).
interfaceField(colsi, refname).
:- dynamic(assignment/5).
assignment(top, child, absy, self, gensymattrib).
assignment(top, child, relrightx, self, gensymattrib).
assignment(top, child, absx, self, gensymattrib).
assignment(top, child, canvas, child, computedwidth).
assignment(top, child, canvas, child, computedheight).
assignment(top, child, relboty, self, gensymattrib).
assignment(top, child, relx, self, gensymattrib).
assignment(top, child, rely, self, gensymattrib).
assignment(top, child, availablewidth, self, w).
assignment(leaf, self, computedheight, self, height).
assignment(leaf, self, computedheight, self, intrinsheight).
assignment(leaf, self, render, self, borderc).
assignment(leaf, self, render, self, canvas).
assignment(leaf, self, render, self, computedwidth).
assignment(leaf, self, render, self, absy).
assignment(leaf, self, render, self, absx).
assignment(leaf, self, render, self, computedheight).
assignment(leaf, self, intrinsminwidth, self, gensymattrib).
assignment(leaf, self, intrinsheight, self, gensymattrib).
assignment(leaf, self, computedwidth, self, intrinsminwidth).
assignment(leaf, self, computedwidth, self, availablewidth).
assignment(leaf, self, computedwidth, self, minwidth).
assignment(leaf, self, computedwidth, self, width).
assignment(leaf, self, computedwidth, self, maxwidth).
assignment(leaf, self, computedwidth, self, intrinsprefwidth).
assignment(leaf, self, computedwidth, self, percentwidth).
assignment(leaf, self, intrinsprefwidth, self, gensymattrib).
assignment(wrapbox, self, computedheight, self, height).
assignment(wrapbox, self, computedheight, self, intrinsheight).
assignment(wrapbox, self, render, self, borderc).
assignment(wrapbox, self, render, self, canvas).
assignment(wrapbox, self, render, self, computedwidth).
assignment(wrapbox, self, render, self, absy).
assignment(wrapbox, self, render, self, absx).
assignment(wrapbox, self, render, self, computedheight).
assignment(wrapbox, self, computedwidth, self, intrinsminwidth).
assignment(wrapbox, self, computedwidth, self, availablewidth).
assignment(wrapbox, self, computedwidth, self, minwidth).
assignment(wrapbox, self, computedwidth, self, width).
assignment(wrapbox, self, computedwidth, self, maxwidth).
assignment(wrapbox, self, computedwidth, self, intrinsprefwidth).
assignment(wrapbox, self, computedwidth, self, percentwidth).
assignment(wrapbox, self, intrinsheight_step, self, childs_lineh_step).
assignment(wrapbox, self, intrinsheight_step, self, childs_rely_step).
assignment(wrapbox, self, intrinsheight_step, self, gensymattrib).
assignment(wrapbox, self, intrinsheight_last, self, intrinsheight_step).
assignment(wrapbox, self, intrinsheight, self, intrinsheight_step).
assignment(wrapbox, self, childs_relrightx_step, self, childs_relx_step).
assignment(wrapbox, self, childs_relrightx_step, self, childs_computedwidth_step).
assignment(wrapbox, self, childs_relrightx_step, self, gensymattrib).
assignment(wrapbox, self, childs_relrightx_last, self, childs_relrightx_step).
assignment(wrapbox, childs, relrightx, self, childs_relrightx_step).
assignment(wrapbox, self, childs_rely_step, self, childs_relx_step).
assignment(wrapbox, self, childs_rely_step, self, childs_lineh_step).
assignment(wrapbox, self, childs_rely_step, self, gensymattrib).
assignment(wrapbox, self, childs_rely_last, self, childs_rely_step).
assignment(wrapbox, childs, rely, self, childs_rely_step).
assignment(wrapbox, self, childs_relx_step, self, childs_computedwidth_step).
assignment(wrapbox, self, childs_relx_step, self, computedwidth).
assignment(wrapbox, self, childs_relx_step, self, childs_computedwidth_step).
assignment(wrapbox, self, childs_relx_step, self, gensymattrib).
assignment(wrapbox, self, childs_relx_last, self, childs_relx_step).
assignment(wrapbox, childs, relx, self, childs_relx_step).
assignment(wrapbox, self, childs_availablewidth_step, self, computedwidth).
assignment(wrapbox, self, childs_availablewidth_step, self, gensymattrib).
assignment(wrapbox, self, childs_availablewidth_last, self, childs_availablewidth_step).
assignment(wrapbox, childs, availablewidth, self, childs_availablewidth_step).
assignment(wrapbox, self, childs_relboty_step, self, childs_computedheight_step).
assignment(wrapbox, self, childs_relboty_step, self, childs_rely_step).
assignment(wrapbox, self, childs_relboty_step, self, gensymattrib).
assignment(wrapbox, self, childs_relboty_last, self, childs_relboty_step).
assignment(wrapbox, childs, relboty, self, childs_relboty_step).
assignment(wrapbox, self, intrinsminwidth_step, self, numchilds_last).
assignment(wrapbox, self, intrinsminwidth_step, self, childs_intrinsminwidth_step).
assignment(wrapbox, self, intrinsminwidth_step, self, gensymattrib).
assignment(wrapbox, self, intrinsminwidth_last, self, intrinsminwidth_step).
assignment(wrapbox, self, intrinsminwidth, self, intrinsminwidth_step).
assignment(wrapbox, self, childs_absy_step, self, absy).
assignment(wrapbox, self, childs_absy_step, self, childs_rely_step).
assignment(wrapbox, self, childs_absy_step, self, gensymattrib).
assignment(wrapbox, self, childs_absy_last, self, childs_absy_step).
assignment(wrapbox, childs, absy, self, childs_absy_step).
assignment(wrapbox, self, numchilds_step, self, gensymattrib).
assignment(wrapbox, self, numchilds_last, self, numchilds_step).
assignment(wrapbox, self, numchilds, self, numchilds_step).
assignment(wrapbox, self, intrinsprefwidth_step, self, numchilds_last).
assignment(wrapbox, self, intrinsprefwidth_step, self, childs_intrinsprefwidth_step).
assignment(wrapbox, self, intrinsprefwidth_step, self, gensymattrib).
assignment(wrapbox, self, intrinsprefwidth_last, self, intrinsprefwidth_step).
assignment(wrapbox, self, intrinsprefwidth, self, intrinsprefwidth_step).
assignment(wrapbox, self, childs_canvas_step, self, render).
assignment(wrapbox, self, childs_canvas_step, self, gensymattrib).
assignment(wrapbox, self, childs_canvas_last, self, childs_canvas_step).
assignment(wrapbox, childs, canvas, self, childs_canvas_step).
assignment(wrapbox, self, childs_lineh_step, self, childs_relx_step).
assignment(wrapbox, self, childs_lineh_step, self, childs_computedheight_step).
assignment(wrapbox, self, childs_lineh_step, self, gensymattrib).
assignment(wrapbox, self, childs_lineh_last, self, childs_lineh_step).
assignment(wrapbox, childs, lineh, self, childs_lineh_step).
assignment(wrapbox, self, childs_absx_step, self, childs_relx_step).
assignment(wrapbox, self, childs_absx_step, self, absx).
assignment(wrapbox, self, childs_absx_step, self, gensymattrib).
assignment(wrapbox, self, childs_absx_last, self, childs_absx_step).
assignment(wrapbox, childs, absx, self, childs_absx_step).
assignment(wrapbox, self, childs_intrinsprefwidth_step, childs, intrinsprefwidth).
assignment(wrapbox, self, childs_computedwidth_step, childs, computedwidth).
assignment(wrapbox, self, childs_intrinsminwidth_step, childs, intrinsminwidth).
assignment(wrapbox, self, childs_computedheight_step, childs, computedheight).
assignment(cell, self, computedwidth, self, intrinsminwidth).
assignment(cell, self, computedwidth, self, availablewidth).
assignment(cell, self, computedwidth, self, minwidth).
assignment(cell, self, computedwidth, self, width).
assignment(cell, self, computedwidth, self, maxwidth).
assignment(cell, self, computedwidth, self, intrinsprefwidth).
assignment(cell, self, computedwidth, self, percentwidth).
assignment(cell, self, computedheight, self, height).
assignment(cell, self, computedheight, self, intrinsheight).
assignment(cell, self, render, self, borderc).
assignment(cell, self, render, self, canvas).
assignment(cell, self, render, self, computedwidth).
assignment(cell, self, render, self, absy).
assignment(cell, self, render, self, absx).
assignment(cell, self, render, self, computedheight).
assignment(cell, self, numchilds_step, self, gensymattrib).
assignment(cell, self, numchilds_last, self, numchilds_step).
assignment(cell, self, numchilds, self, numchilds_step).
assignment(cell, self, childs_lineh_step, self, childs_relx_step).
assignment(cell, self, childs_lineh_step, self, childs_computedheight_step).
assignment(cell, self, childs_lineh_step, self, gensymattrib).
assignment(cell, self, childs_lineh_last, self, childs_lineh_step).
assignment(cell, childs, lineh, self, childs_lineh_step).
assignment(cell, self, childs_relx_step, self, childs_computedwidth_step).
assignment(cell, self, childs_relx_step, self, computedwidth).
assignment(cell, self, childs_relx_step, self, childs_computedwidth_step).
assignment(cell, self, childs_relx_step, self, gensymattrib).
assignment(cell, self, childs_relx_last, self, childs_relx_step).
assignment(cell, childs, relx, self, childs_relx_step).
assignment(cell, self, childs_relrightx_step, self, childs_relx_step).
assignment(cell, self, childs_relrightx_step, self, childs_computedwidth_step).
assignment(cell, self, childs_relrightx_step, self, gensymattrib).
assignment(cell, self, childs_relrightx_last, self, childs_relrightx_step).
assignment(cell, childs, relrightx, self, childs_relrightx_step).
assignment(cell, self, childs_canvas_step, self, render).
assignment(cell, self, childs_canvas_step, self, gensymattrib).
assignment(cell, self, childs_canvas_last, self, childs_canvas_step).
assignment(cell, childs, canvas, self, childs_canvas_step).
assignment(cell, self, intrinsheight_step, self, childs_lineh_step).
assignment(cell, self, intrinsheight_step, self, childs_rely_step).
assignment(cell, self, intrinsheight_step, self, gensymattrib).
assignment(cell, self, intrinsheight_last, self, intrinsheight_step).
assignment(cell, self, intrinsheight, self, intrinsheight_step).
assignment(cell, self, childs_availablewidth_step, self, computedwidth).
assignment(cell, self, childs_availablewidth_step, self, gensymattrib).
assignment(cell, self, childs_availablewidth_last, self, childs_availablewidth_step).
assignment(cell, childs, availablewidth, self, childs_availablewidth_step).
assignment(cell, self, childs_relboty_step, self, childs_computedheight_step).
assignment(cell, self, childs_relboty_step, self, childs_rely_step).
assignment(cell, self, childs_relboty_step, self, gensymattrib).
assignment(cell, self, childs_relboty_last, self, childs_relboty_step).
assignment(cell, childs, relboty, self, childs_relboty_step).
assignment(cell, self, childs_rely_step, self, childs_relx_step).
assignment(cell, self, childs_rely_step, self, childs_lineh_step).
assignment(cell, self, childs_rely_step, self, gensymattrib).
assignment(cell, self, childs_rely_last, self, childs_rely_step).
assignment(cell, childs, rely, self, childs_rely_step).
assignment(cell, self, childs_absx_step, self, childs_relx_step).
assignment(cell, self, childs_absx_step, self, absx).
assignment(cell, self, childs_absx_step, self, gensymattrib).
assignment(cell, self, childs_absx_last, self, childs_absx_step).
assignment(cell, childs, absx, self, childs_absx_step).
assignment(cell, self, intrinsminwidth_step, self, numchilds_last).
assignment(cell, self, intrinsminwidth_step, self, childs_intrinsminwidth_step).
assignment(cell, self, intrinsminwidth_step, self, gensymattrib).
assignment(cell, self, intrinsminwidth_last, self, intrinsminwidth_step).
assignment(cell, self, intrinsminwidth, self, intrinsminwidth_step).
assignment(cell, self, intrinsprefwidth_step, self, numchilds_last).
assignment(cell, self, intrinsprefwidth_step, self, childs_intrinsprefwidth_step).
assignment(cell, self, intrinsprefwidth_step, self, gensymattrib).
assignment(cell, self, intrinsprefwidth_last, self, intrinsprefwidth_step).
assignment(cell, self, intrinsprefwidth, self, intrinsprefwidth_step).
assignment(cell, self, childs_absy_step, self, absy).
assignment(cell, self, childs_absy_step, self, childs_rely_step).
assignment(cell, self, childs_absy_step, self, gensymattrib).
assignment(cell, self, childs_absy_last, self, childs_absy_step).
assignment(cell, childs, absy, self, childs_absy_step).
assignment(cell, self, childs_intrinsprefwidth_step, childs, intrinsprefwidth).
assignment(cell, self, childs_computedwidth_step, childs, computedwidth).
assignment(cell, self, childs_intrinsminwidth_step, childs, intrinsminwidth).
assignment(cell, self, childs_computedheight_step, childs, computedheight).
assignment(row, self, computedheight, self, height).
assignment(row, self, computedheight, self, intrinsheight).
assignment(row, self, render, self, tablecontentwidth).
assignment(row, self, render, self, borderc).
assignment(row, self, render, self, canvas).
assignment(row, self, render, self, absy).
assignment(row, self, render, self, absx).
assignment(row, self, render, self, computedheight).
assignment(row, self, childs_row_step, self, rownum).
assignment(row, self, childs_row_step, self, gensymattrib).
assignment(row, self, childs_row_last, self, childs_row_step).
assignment(row, childs, row, self, childs_row_step).
assignment(row, self, cells_step, self, childs_colspan_step).
assignment(row, self, cells_step, self, childs_rowspan_step).
assignment(row, self, cells_step, self, gensymattrib).
assignment(row, self, cells_last, self, cells_step).
assignment(row, self, cells, self, cells_step).
assignment(row, self, childs_cellnum_step, self, gensymattrib).
assignment(row, self, childs_cellnum_last, self, childs_cellnum_step).
assignment(row, childs, cellnum, self, childs_cellnum_step).
assignment(row, self, childs_rely_step, self, gensymattrib).
assignment(row, self, childs_rely_last, self, childs_rely_step).
assignment(row, childs, rely, self, childs_rely_step).
assignment(row, self, childs_availablewidth_step, self, gensymattrib).
assignment(row, self, childs_availablewidth_last, self, childs_availablewidth_step).
assignment(row, childs, availablewidth, self, childs_availablewidth_step).
assignment(row, self, intrinscolcount_step, self, childs_colspan_step).
assignment(row, self, intrinscolcount_step, self, gensymattrib).
assignment(row, self, intrinscolcount_last, self, intrinscolcount_step).
assignment(row, self, intrinscolcount, self, intrinscolcount_step).
assignment(row, self, childs_absx_step, self, gensymattrib).
assignment(row, self, childs_absx_last, self, childs_absx_step).
assignment(row, childs, absx, self, childs_absx_step).
assignment(row, self, childs_column_step, childs, cellnum).
assignment(row, self, childs_column_step, self, colassignment).
assignment(row, self, childs_column_step, self, gensymattrib).
assignment(row, self, childs_column_last, self, childs_column_step).
assignment(row, childs, column, self, childs_column_step).
assignment(row, self, childs_absy_step, self, absy).
assignment(row, self, childs_absy_step, self, childs_rely_step).
assignment(row, self, childs_absy_step, self, gensymattrib).
assignment(row, self, childs_absy_last, self, childs_absy_step).
assignment(row, childs, absy, self, childs_absy_step).
assignment(row, self, computedwidth_step, self, childs_intrinsminwidth_step).
assignment(row, self, computedwidth_step, self, gensymattrib).
assignment(row, self, computedwidth_last, self, computedwidth_step).
assignment(row, self, computedwidth, self, computedwidth_step).
assignment(row, self, childs_relboty_step, self, childs_computedheight_step).
assignment(row, self, childs_relboty_step, self, gensymattrib).
assignment(row, self, childs_relboty_last, self, childs_relboty_step).
assignment(row, childs, relboty, self, childs_relboty_step).
assignment(row, self, childs_relx_step, self, gensymattrib).
assignment(row, self, childs_relx_last, self, childs_relx_step).
assignment(row, childs, relx, self, childs_relx_step).
assignment(row, self, intrinsheight_step, self, childs_computedheight_step).
assignment(row, self, intrinsheight_step, self, childs_rowspan_step).
assignment(row, self, intrinsheight_step, self, gensymattrib).
assignment(row, self, intrinsheight_last, self, intrinsheight_step).
assignment(row, self, intrinsheight, self, intrinsheight_step).
assignment(row, self, childs_colspan_step, childs, colspan).
assignment(row, self, childs_rowspan_step, childs, rowspan).
assignment(row, self, childs_intrinsminwidth_step, childs, intrinsminwidth).
assignment(row, self, childs_computedheight_step, childs, computedheight).
assignment(col, self, render, self, borderc).
assignment(col, self, render, self, canvas).
assignment(col, self, render, self, computedwidth).
assignment(col, self, render, self, absy).
assignment(col, self, render, self, absx).
assignment(col, self, render, self, tablecontentheight).
assignment(col, self, computedheight, self, height).
assignment(col, self, computedheight, self, intrinsheight).
assignment(col, self, computedwidth, self, intrinsminwidth).
assignment(col, self, computedwidth, self, availablewidth).
assignment(col, self, computedwidth, self, minwidth).
assignment(col, self, computedwidth, self, width).
assignment(col, self, computedwidth, self, maxwidth).
assignment(col, self, computedwidth, self, intrinsprefwidth).
assignment(col, self, computedwidth, self, percentwidth).
assignment(col, self, childs_cellnum_step, self, gensymattrib).
assignment(col, self, childs_cellnum_last, self, childs_cellnum_step).
assignment(col, childs, cellnum, self, childs_cellnum_step).
assignment(col, self, intrinsminwidth_step, self, childs_colspan_step).
assignment(col, self, intrinsminwidth_step, self, childs_intrinsminwidth_step).
assignment(col, self, intrinsminwidth_step, self, gensymattrib).
assignment(col, self, intrinsminwidth_last, self, intrinsminwidth_step).
assignment(col, self, intrinsminwidth, self, intrinsminwidth_step).
assignment(col, self, childs_relboty_step, self, gensymattrib).
assignment(col, self, childs_relboty_last, self, childs_relboty_step).
assignment(col, childs, relboty, self, childs_relboty_step).
assignment(col, self, childs_rely_step, self, gensymattrib).
assignment(col, self, childs_rely_last, self, childs_rely_step).
assignment(col, childs, rely, self, childs_rely_step).
assignment(col, self, childs_column_step, self, gensymattrib).
assignment(col, self, childs_column_last, self, childs_column_step).
assignment(col, childs, column, self, childs_column_step).
assignment(col, self, childs_relx_step, self, gensymattrib).
assignment(col, self, childs_relx_last, self, childs_relx_step).
assignment(col, childs, relx, self, childs_relx_step).
assignment(col, self, intrinsprefwidth_step, self, childs_colspan_step).
assignment(col, self, intrinsprefwidth_step, self, childs_intrinsprefwidth_step).
assignment(col, self, intrinsprefwidth_step, self, gensymattrib).
assignment(col, self, intrinsprefwidth_last, self, intrinsprefwidth_step).
assignment(col, self, intrinsprefwidth, self, intrinsprefwidth_step).
assignment(col, self, childs_absx_step, self, childs_relx_step).
assignment(col, self, childs_absx_step, self, absx).
assignment(col, self, childs_absx_step, self, gensymattrib).
assignment(col, self, childs_absx_last, self, childs_absx_step).
assignment(col, childs, absx, self, childs_absx_step).
assignment(col, self, childs_row_step, self, gensymattrib).
assignment(col, self, childs_row_last, self, childs_row_step).
assignment(col, childs, row, self, childs_row_step).
assignment(col, self, intrinsheight_step, self, numchilds_last).
assignment(col, self, intrinsheight_step, self, childs_computedheight_step).
assignment(col, self, intrinsheight_step, self, gensymattrib).
assignment(col, self, intrinsheight_last, self, intrinsheight_step).
assignment(col, self, intrinsheight, self, intrinsheight_step).
assignment(col, self, childs_canvas_step, self, render).
assignment(col, self, childs_canvas_step, self, gensymattrib).
assignment(col, self, childs_canvas_last, self, childs_canvas_step).
assignment(col, childs, canvas, self, childs_canvas_step).
assignment(col, self, childs_absy_step, self, gensymattrib).
assignment(col, self, childs_absy_last, self, childs_absy_step).
assignment(col, childs, absy, self, childs_absy_step).
assignment(col, self, numchilds_step, self, gensymattrib).
assignment(col, self, numchilds_last, self, numchilds_step).
assignment(col, self, numchilds, self, numchilds_step).
assignment(col, self, childs_availablewidth_step, self, computedwidth).
assignment(col, self, childs_availablewidth_step, self, gensymattrib).
assignment(col, self, childs_availablewidth_last, self, childs_availablewidth_step).
assignment(col, childs, availablewidth, self, childs_availablewidth_step).
assignment(col, self, childs_colspan_step, childs, colspan).
assignment(col, self, childs_intrinsprefwidth_step, childs, intrinsprefwidth).
assignment(col, self, childs_intrinsminwidth_step, childs, intrinsminwidth).
assignment(col, self, childs_computedheight_step, childs, computedheight).
assignment(cols, self, cols_tablecontentheight_step, self, tablecontentheight).
assignment(cols, self, cols_tablecontentheight_step, self, gensymattrib).
assignment(cols, self, cols_tablecontentheight_last, self, cols_tablecontentheight_step).
assignment(cols, cols, tablecontentheight, self, cols_tablecontentheight_step).
assignment(cols, self, cols_absy_step, self, absy).
assignment(cols, self, cols_absy_step, self, cols_rely_step).
assignment(cols, self, cols_absy_step, self, gensymattrib).
assignment(cols, self, cols_absy_last, self, cols_absy_step).
assignment(cols, cols, absy, self, cols_absy_step).
assignment(cols, self, cols_relrightx_step, self, cols_computedwidth_step).
assignment(cols, self, cols_relrightx_step, self, gensymattrib).
assignment(cols, self, cols_relrightx_last, self, cols_relrightx_step).
assignment(cols, cols, relrightx, self, cols_relrightx_step).
assignment(cols, self, tablecontentwidth_step, self, cols_computedwidth_step).
assignment(cols, self, tablecontentwidth_step, self, gensymattrib).
assignment(cols, self, tablecontentwidth_last, self, tablecontentwidth_step).
assignment(cols, self, tablecontentwidth, self, tablecontentwidth_step).
assignment(cols, self, intrinsminwidth_step, self, cols_intrinsminwidth_step).
assignment(cols, self, intrinsminwidth_step, self, gensymattrib).
assignment(cols, self, intrinsminwidth_last, self, intrinsminwidth_step).
assignment(cols, self, intrinsminwidth, self, intrinsminwidth_step).
assignment(cols, self, cols_relx_step, self, cols_computedwidth_step).
assignment(cols, self, cols_relx_step, self, cols_relrightx_step).
assignment(cols, self, cols_relx_step, self, gensymattrib).
assignment(cols, self, cols_relx_last, self, cols_relx_step).
assignment(cols, cols, relx, self, cols_relx_step).
assignment(cols, self, cols_colcount_step, self, colcount).
assignment(cols, self, cols_colcount_step, self, gensymattrib).
assignment(cols, self, cols_colcount_last, self, cols_colcount_step).
assignment(cols, cols, colcount, self, cols_colcount_step).
assignment(cols, self, cols_rely_step, self, gensymattrib).
assignment(cols, self, cols_rely_last, self, cols_rely_step).
assignment(cols, cols, rely, self, cols_rely_step).
assignment(cols, self, cols_cellsready_step, self, cellsready).
assignment(cols, self, cols_cellsready_step, self, gensymattrib).
assignment(cols, self, cols_cellsready_last, self, cols_cellsready_step).
assignment(cols, cols, cellsready, self, cols_cellsready_step).
assignment(cols, self, cols_canvas_step, self, canvas).
assignment(cols, self, cols_canvas_step, self, gensymattrib).
assignment(cols, self, cols_canvas_last, self, cols_canvas_step).
assignment(cols, cols, canvas, self, cols_canvas_step).
assignment(cols, self, intrinsprefwidth_step, self, cols_intrinsprefwidth_step).
assignment(cols, self, intrinsprefwidth_step, self, gensymattrib).
assignment(cols, self, intrinsprefwidth_last, self, intrinsprefwidth_step).
assignment(cols, self, intrinsprefwidth, self, intrinsprefwidth_step).
assignment(cols, self, cols_absx_step, self, cols_relx_step).
assignment(cols, self, cols_absx_step, self, absx).
assignment(cols, self, cols_absx_step, self, gensymattrib).
assignment(cols, self, cols_absx_last, self, cols_absx_step).
assignment(cols, cols, absx, self, cols_absx_step).
assignment(cols, self, cols_availablewidth_step, self, availablewidth).
assignment(cols, self, cols_availablewidth_step, self, gensymattrib).
assignment(cols, self, cols_availablewidth_last, self, cols_availablewidth_step).
assignment(cols, cols, availablewidth, self, cols_availablewidth_step).
assignment(cols, self, cols_colnum_step, self, gensymattrib).
assignment(cols, self, cols_colnum_last, self, cols_colnum_step).
assignment(cols, cols, colnum, self, cols_colnum_step).
assignment(cols, self, cols_intrinsminwidth_step, cols, intrinsminwidth).
assignment(cols, self, cols_intrinsprefwidth_step, cols, intrinsprefwidth).
assignment(cols, self, cols_computedwidth_step, cols, computedwidth).
assignment(tablebox, columns, colcount, self, colcount).
assignment(tablebox, self, computedheight, self, height).
assignment(tablebox, self, computedheight, self, intrinsheight).
assignment(tablebox, columns, canvas, self, render).
assignment(tablebox, columns, tablecontentheight, self, intrinsheight).
assignment(tablebox, self, intrinsminwidth, columns, intrinsminwidth).
assignment(tablebox, columns, cellsready, self, cellsready).
assignment(tablebox, self, intrinsprefwidth, columns, intrinsprefwidth).
assignment(tablebox, self, render, self, borderc).
assignment(tablebox, self, render, self, canvas).
assignment(tablebox, self, render, self, computedwidth).
assignment(tablebox, self, render, self, absy).
assignment(tablebox, self, render, self, absx).
assignment(tablebox, self, render, self, computedheight).
assignment(tablebox, self, computedwidth, self, intrinsminwidth).
assignment(tablebox, self, computedwidth, self, availablewidth).
assignment(tablebox, self, computedwidth, self, minwidth).
assignment(tablebox, self, computedwidth, self, width).
assignment(tablebox, self, computedwidth, self, maxwidth).
assignment(tablebox, self, computedwidth, self, intrinsprefwidth).
assignment(tablebox, self, computedwidth, self, percentwidth).
assignment(tablebox, columns, absx, self, absx).
assignment(tablebox, columns, availablewidth, self, computedwidth).
assignment(tablebox, columns, absy, self, absy).
assignment(tablebox, self, rows_colassignment_step, self, colcount).
assignment(tablebox, self, rows_colassignment_step, self, rows_cells_step).
assignment(tablebox, self, rows_colassignment_step, self, rows_rownum_step).
assignment(tablebox, self, rows_colassignment_step, self, gensymattrib).
assignment(tablebox, self, rows_colassignment_last, self, rows_colassignment_step).
assignment(tablebox, rows, colassignment, self, rows_colassignment_step).
assignment(tablebox, self, rows_tablecontentwidth_step, columns, tablecontentwidth).
assignment(tablebox, self, rows_tablecontentwidth_step, self, gensymattrib).
assignment(tablebox, self, rows_tablecontentwidth_last, self, rows_tablecontentwidth_step).
assignment(tablebox, rows, tablecontentwidth, self, rows_tablecontentwidth_step).
assignment(tablebox, self, rows_canvas_step, self, render).
assignment(tablebox, self, rows_canvas_step, self, gensymattrib).
assignment(tablebox, self, rows_canvas_last, self, rows_canvas_step).
assignment(tablebox, rows, canvas, self, rows_canvas_step).
assignment(tablebox, self, rows_rownum_step, self, gensymattrib).
assignment(tablebox, self, rows_rownum_last, self, rows_rownum_step).
assignment(tablebox, rows, rownum, self, rows_rownum_step).
assignment(tablebox, self, rows_rely_step, self, rows_computedheight_step).
assignment(tablebox, self, rows_rely_step, self, rows_relboty_step).
assignment(tablebox, self, rows_rely_step, self, gensymattrib).
assignment(tablebox, self, rows_rely_last, self, rows_rely_step).
assignment(tablebox, rows, rely, self, rows_rely_step).
assignment(tablebox, self, colcount_step, self, rows_intrinscolcount_step).
assignment(tablebox, self, colcount_step, self, gensymattrib).
assignment(tablebox, self, colcount_last, self, colcount_step).
assignment(tablebox, self, colcount, self, colcount_step).
assignment(tablebox, self, rows_relboty_step, self, rows_computedheight_step).
assignment(tablebox, self, rows_relboty_step, self, gensymattrib).
assignment(tablebox, self, rows_relboty_last, self, rows_relboty_step).
assignment(tablebox, rows, relboty, self, rows_relboty_step).
assignment(tablebox, self, rows_colcount_step, self, colcount_last).
assignment(tablebox, self, rows_colcount_step, self, gensymattrib).
assignment(tablebox, self, rows_colcount_last, self, rows_colcount_step).
assignment(tablebox, rows, colcount, self, rows_colcount_step).
assignment(tablebox, self, rows_absx_step, self, absx).
assignment(tablebox, self, rows_absx_step, self, gensymattrib).
assignment(tablebox, self, rows_absx_last, self, rows_absx_step).
assignment(tablebox, rows, absx, self, rows_absx_step).
assignment(tablebox, self, rows_absy_step, self, rows_rely_step).
assignment(tablebox, self, rows_absy_step, self, absy).
assignment(tablebox, self, rows_absy_step, self, gensymattrib).
assignment(tablebox, self, rows_absy_last, self, rows_absy_step).
assignment(tablebox, rows, absy, self, rows_absy_step).
assignment(tablebox, self, intrinsheight_step, self, rows_computedheight_step).
assignment(tablebox, self, intrinsheight_step, self, gensymattrib).
assignment(tablebox, self, intrinsheight_last, self, intrinsheight_step).
assignment(tablebox, self, intrinsheight, self, intrinsheight_step).
assignment(tablebox, self, cellsready_step, self, rows_colassignment_last).
assignment(tablebox, self, cellsready_step, self, gensymattrib).
assignment(tablebox, self, cellsready_last, self, cellsready_step).
assignment(tablebox, self, cellsready, self, cellsready_step).
assignment(tablebox, self, rows_cells_step, rows, cells).
assignment(tablebox, self, rows_intrinscolcount_step, rows, intrinscolcount).
assignment(tablebox, self, rows_computedheight_step, rows, computedheight).
classAttribute(wrapbox, numchilds).
classAttribute(wrapbox, childs_intrinsprefwidth_step).
classAttribute(wrapbox, childs_computedwidth_step).
classAttribute(wrapbox, childs_relboty_step).
classAttribute(wrapbox, childs_relx_step).
classAttribute(wrapbox, childs_rely_step).
classAttribute(wrapbox, childs_intrinsminwidth_step).
classAttribute(wrapbox, childs_relrightx_step).
classAttribute(wrapbox, childs_absy_step).
classAttribute(wrapbox, childs_canvas_step).
classAttribute(wrapbox, childs_computedheight_step).
classAttribute(wrapbox, childs_availablewidth_step).
classAttribute(wrapbox, childs_absx_step).
classAttribute(wrapbox, childs_lineh_step).
classAttribute(wrapbox, childs_relboty_step).
classAttribute(wrapbox, childs_relboty_last).
classAttribute(wrapbox, intrinsheight_step).
classAttribute(wrapbox, intrinsheight_last).
classAttribute(wrapbox, intrinsminwidth_step).
classAttribute(wrapbox, intrinsminwidth_last).
classAttribute(wrapbox, numchilds_step).
classAttribute(wrapbox, numchilds_last).
classAttribute(wrapbox, childs_canvas_step).
classAttribute(wrapbox, childs_canvas_last).
classAttribute(wrapbox, childs_absx_step).
classAttribute(wrapbox, childs_absx_last).
classAttribute(wrapbox, childs_relx_step).
classAttribute(wrapbox, childs_relx_last).
classAttribute(wrapbox, childs_rely_step).
classAttribute(wrapbox, childs_rely_last).
classAttribute(wrapbox, childs_absy_step).
classAttribute(wrapbox, childs_absy_last).
classAttribute(wrapbox, childs_lineh_step).
classAttribute(wrapbox, childs_lineh_last).
classAttribute(wrapbox, childs_availablewidth_step).
classAttribute(wrapbox, childs_availablewidth_last).
classAttribute(wrapbox, intrinsprefwidth_step).
classAttribute(wrapbox, intrinsprefwidth_last).
classAttribute(wrapbox, childs_relrightx_step).
classAttribute(wrapbox, childs_relrightx_last).
classAttribute(cell, numchilds).
classAttribute(cell, childs_intrinsprefwidth_step).
classAttribute(cell, childs_computedwidth_step).
classAttribute(cell, childs_relboty_step).
classAttribute(cell, childs_relx_step).
classAttribute(cell, childs_rely_step).
classAttribute(cell, childs_intrinsminwidth_step).
classAttribute(cell, childs_relrightx_step).
classAttribute(cell, childs_absy_step).
classAttribute(cell, childs_canvas_step).
classAttribute(cell, childs_computedheight_step).
classAttribute(cell, childs_availablewidth_step).
classAttribute(cell, childs_absx_step).
classAttribute(cell, childs_lineh_step).
classAttribute(cell, childs_relboty_step).
classAttribute(cell, childs_relboty_last).
classAttribute(cell, intrinsheight_step).
classAttribute(cell, intrinsheight_last).
classAttribute(cell, intrinsminwidth_step).
classAttribute(cell, intrinsminwidth_last).
classAttribute(cell, numchilds_step).
classAttribute(cell, numchilds_last).
classAttribute(cell, childs_canvas_step).
classAttribute(cell, childs_canvas_last).
classAttribute(cell, childs_absx_step).
classAttribute(cell, childs_absx_last).
classAttribute(cell, childs_relx_step).
classAttribute(cell, childs_relx_last).
classAttribute(cell, childs_lineh_step).
classAttribute(cell, childs_lineh_last).
classAttribute(cell, childs_rely_step).
classAttribute(cell, childs_rely_last).
classAttribute(cell, childs_absy_step).
classAttribute(cell, childs_absy_last).
classAttribute(cell, childs_availablewidth_step).
classAttribute(cell, childs_availablewidth_last).
classAttribute(cell, intrinsprefwidth_step).
classAttribute(cell, intrinsprefwidth_last).
classAttribute(cell, childs_relrightx_step).
classAttribute(cell, childs_relrightx_last).
classAttribute(row, childs_colspan_step).
classAttribute(row, childs_cellnum_step).
classAttribute(row, childs_rowspan_step).
classAttribute(row, childs_relboty_step).
classAttribute(row, childs_column_step).
classAttribute(row, childs_relx_step).
classAttribute(row, childs_rely_step).
classAttribute(row, childs_intrinsminwidth_step).
classAttribute(row, childs_absy_step).
classAttribute(row, childs_computedheight_step).
classAttribute(row, childs_availablewidth_step).
classAttribute(row, childs_row_step).
classAttribute(row, childs_absx_step).
classAttribute(row, childs_relboty_step).
classAttribute(row, childs_relboty_last).
classAttribute(row, childs_cellnum_step).
classAttribute(row, childs_cellnum_last).
classAttribute(row, intrinsheight_step).
classAttribute(row, intrinsheight_last).
classAttribute(row, childs_absx_step).
classAttribute(row, childs_absx_last).
classAttribute(row, intrinscolcount_step).
classAttribute(row, intrinscolcount_last).
classAttribute(row, childs_row_step).
classAttribute(row, childs_row_last).
classAttribute(row, childs_relx_step).
classAttribute(row, childs_relx_last).
classAttribute(row, childs_rely_step).
classAttribute(row, childs_rely_last).
classAttribute(row, childs_column_step).
classAttribute(row, childs_column_last).
classAttribute(row, childs_absy_step).
classAttribute(row, childs_absy_last).
classAttribute(row, childs_availablewidth_step).
classAttribute(row, childs_availablewidth_last).
classAttribute(row, cells_step).
classAttribute(row, cells_last).
classAttribute(row, computedwidth_step).
classAttribute(row, computedwidth_last).
classAttribute(col, numchilds).
classAttribute(col, childs_colspan_step).
classAttribute(col, childs_cellnum_step).
classAttribute(col, childs_intrinsprefwidth_step).
classAttribute(col, childs_relboty_step).
classAttribute(col, childs_column_step).
classAttribute(col, childs_relx_step).
classAttribute(col, childs_rely_step).
classAttribute(col, childs_intrinsminwidth_step).
classAttribute(col, childs_absy_step).
classAttribute(col, childs_canvas_step).
classAttribute(col, childs_computedheight_step).
classAttribute(col, childs_availablewidth_step).
classAttribute(col, childs_row_step).
classAttribute(col, childs_absx_step).
classAttribute(col, childs_relboty_step).
classAttribute(col, childs_relboty_last).
classAttribute(col, childs_cellnum_step).
classAttribute(col, childs_cellnum_last).
classAttribute(col, intrinsminwidth_step).
classAttribute(col, intrinsminwidth_last).
classAttribute(col, intrinsheight_step).
classAttribute(col, intrinsheight_last).
classAttribute(col, childs_absx_step).
classAttribute(col, childs_absx_last).
classAttribute(col, childs_canvas_step).
classAttribute(col, childs_canvas_last).
classAttribute(col, numchilds_step).
classAttribute(col, numchilds_last).
classAttribute(col, childs_relx_step).
classAttribute(col, childs_relx_last).
classAttribute(col, childs_row_step).
classAttribute(col, childs_row_last).
classAttribute(col, childs_rely_step).
classAttribute(col, childs_rely_last).
classAttribute(col, childs_column_step).
classAttribute(col, childs_column_last).
classAttribute(col, childs_absy_step).
classAttribute(col, childs_absy_last).
classAttribute(col, childs_availablewidth_step).
classAttribute(col, childs_availablewidth_last).
classAttribute(col, intrinsprefwidth_step).
classAttribute(col, intrinsprefwidth_last).
classAttribute(cols, cols_colcount_step).
classAttribute(cols, cols_intrinsminwidth_step).
classAttribute(cols, cols_cellsready_step).
classAttribute(cols, cols_absx_step).
classAttribute(cols, cols_canvas_step).
classAttribute(cols, cols_absy_step).
classAttribute(cols, cols_colnum_step).
classAttribute(cols, cols_tablecontentheight_step).
classAttribute(cols, cols_intrinsprefwidth_step).
classAttribute(cols, cols_availablewidth_step).
classAttribute(cols, cols_computedwidth_step).
classAttribute(cols, cols_relx_step).
classAttribute(cols, cols_rely_step).
classAttribute(cols, cols_relrightx_step).
classAttribute(cols, cols_absx_step).
classAttribute(cols, cols_absx_last).
classAttribute(cols, cols_canvas_step).
classAttribute(cols, cols_canvas_last).
classAttribute(cols, cols_absy_step).
classAttribute(cols, cols_absy_last).
classAttribute(cols, cols_cellsready_step).
classAttribute(cols, cols_cellsready_last).
classAttribute(cols, cols_relrightx_step).
classAttribute(cols, cols_relrightx_last).
classAttribute(cols, cols_colnum_step).
classAttribute(cols, cols_colnum_last).
classAttribute(cols, intrinsminwidth_step).
classAttribute(cols, intrinsminwidth_last).
classAttribute(cols, cols_tablecontentheight_step).
classAttribute(cols, cols_tablecontentheight_last).
classAttribute(cols, tablecontentwidth_step).
classAttribute(cols, tablecontentwidth_last).
classAttribute(cols, intrinsprefwidth_step).
classAttribute(cols, intrinsprefwidth_last).
classAttribute(cols, cols_colcount_step).
classAttribute(cols, cols_colcount_last).
classAttribute(cols, cols_relx_step).
classAttribute(cols, cols_relx_last).
classAttribute(cols, cols_rely_step).
classAttribute(cols, cols_rely_last).
classAttribute(cols, cols_availablewidth_step).
classAttribute(cols, cols_availablewidth_last).
classAttribute(tablebox, cellsready).
classAttribute(tablebox, colcount).
classAttribute(tablebox, rows_absy_step).
classAttribute(tablebox, rows_absx_step).
classAttribute(tablebox, rows_colassignment_step).
classAttribute(tablebox, rows_rownum_step).
classAttribute(tablebox, rows_colcount_step).
classAttribute(tablebox, rows_relboty_step).
classAttribute(tablebox, rows_rely_step).
classAttribute(tablebox, rows_cells_step).
classAttribute(tablebox, rows_canvas_step).
classAttribute(tablebox, rows_tablecontentwidth_step).
classAttribute(tablebox, rows_intrinscolcount_step).
classAttribute(tablebox, rows_computedheight_step).
classAttribute(tablebox, rows_relboty_step).
classAttribute(tablebox, rows_relboty_last).
classAttribute(tablebox, rows_colassignment_step).
classAttribute(tablebox, rows_colassignment_last).
classAttribute(tablebox, rows_tablecontentwidth_step).
classAttribute(tablebox, rows_tablecontentwidth_last).
classAttribute(tablebox, rows_canvas_step).
classAttribute(tablebox, rows_canvas_last).
classAttribute(tablebox, cellsready_step).
classAttribute(tablebox, cellsready_last).
classAttribute(tablebox, rows_colcount_step).
classAttribute(tablebox, rows_colcount_last).
classAttribute(tablebox, intrinsheight_step).
classAttribute(tablebox, intrinsheight_last).
classAttribute(tablebox, rows_absx_step).
classAttribute(tablebox, rows_absx_last).
classAttribute(tablebox, colcount_step).
classAttribute(tablebox, colcount_last).
classAttribute(tablebox, rows_absy_step).
classAttribute(tablebox, rows_absy_last).
classAttribute(tablebox, rows_rely_step).
classAttribute(tablebox, rows_rely_last).
classAttribute(tablebox, rows_rownum_step).
classAttribute(tablebox, rows_rownum_last).
