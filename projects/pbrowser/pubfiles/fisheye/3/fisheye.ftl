interface Root {  }

interface VBoxI { 
	var w : float;
	var h : float;
	var x : float;
	var rx : float;  
	var y : float;
	var by : float;
	var canvas : int;
	var render : int;
	
	var wr : float;
	var hr : float;
	var xr : float;
	var rby : float;
	var yr : float;
	var mouseX : int;
	var mouseY : int;
	
	var padding : int;
}

interface HBoxI { 
	var w : float;
	var h : float;
	var x : float;
	var rx : float;  
	var y : float;
	var by : float;
	var canvas : int;
	var render : int;
	
	var wMin : float;
	var wMax : float;
	
		
	var wr : float;
	var hr : float;
	var xr : float;
	var rxr : float;
	var rby : float;
	var yr : float;
	var mouseX : int;
	var mouseY : int;	
	
	var padding : int;	
}

interface LeafI { 
	var w : float;
	var h : float;
	var x : float;
	var rx : float;  
	var y : float;
	var by : float;
	var canvas : int;
	var render : int;
	
	var wr : float;
	var hr : float;
	var xr : float;
	var rxr : float;
	var rby : float;
	var yr : float;
	var mouseX : int;
	var mouseY : int;
	
	var padding : int;
	
	input enlargeMult : float = 2.0;
}

trait Fisheye {
	attributes {
		var mult : int;
	}
	actions {
		mult := 
			( (mouseX < (x + 2*padding)) && (mouseX > (x - 2*padding)) 
				&& (mouseY < (y + 2*padding)) && (mouseY > (y - 2*padding)))
			? enlargeMult : 1.0;
	}
}

trait Propagate {
  actions {
    loop childs {
      childs.padding := padding;

	  childs.mouseX := mouseX;
	  childs.mouseY := mouseY;			

	  childs.canvas := render;
    }
  }
}

class Top : Root { 
	children {
		child : VBoxI;
	}
	attributes {
		var done : int;		
		var canvas : int;		
		var wr : float;
		var hr : float;
		input mouseX : int;
		input mouseY : int;
		input padding : int = 10;		
	}
	actions {
		child.x := padding;
		child.rx := child.x + child.w;
		child.y := padding;
		child.by := child.y + child.h;
		
		canvas := paintStart(wr, hr, true);
		child.canvas := canvas;

		child.xr := padding;
		child.yr := padding;
		child.rby := child.yr + child.hr;
		wr := child.wr + padding * 2;
		hr := child.hr + padding * 2;
		
		child.mouseX := mouseX;
		child.mouseY := mouseY;	
		
		done := child.render + paintOval(mouseX, mouseY, 10, 10, "#FF0000");		
		
		child.padding := padding;
		
	}
}


class VBox(Propagate) : VBoxI { 
	attributes {
		var wMax : float;
	}
	children {
		childs : [ HBoxI ];
	}
	actions {
		loop childs {
			h := fold padding .. $-.h + childs$i.h + padding;
			childs.by := fold y .. childs$-.by + padding + childs$i.h;
			childs.y := childs$i.by - childs$i.h; 
			w := fold padding .. $-.w > (childs$i.w + padding * 2) ? $-.w : (childs$i.w + padding * 2);
			childs.x := x + padding;
			childs.rx := childs$i.x + childs$i.w;
			

			wMax := fold 0 .. $-.wMax > childs$i.wMin ? $-.wMax : childs$i.wMin;
			childs.wMax := $$.wMax;
						
			hr := fold padding .. $-.hr + childs$i.hr + padding;
			
			childs.rby := fold yr .. childs$-.rby + padding + childs$i.hr;
			childs.yr := childs$i.rby - childs$i.hr; 
			childs.xr := xr + padding;
			childs.rxr := xr + padding;			
			
		}
		wr := $$.wMax > 0 ? ($$.wMax + 2 * padding) : padding;
		render := canvas + paintRect(xr, yr, wr, hr, "#CCC");
	}
}


class HBox(Propagate) : HBoxI { 
	children {
		childs : [ LeafI ];
	}
	actions {
		loop childs {
			w := fold padding .. $-.w + childs$i.w + padding;
			childs.rx := fold x .. childs$-.rx + padding + childs$i.w;
			childs.x := childs$i.rx - childs$i.w; 
			h := fold padding .. $-.h > (childs$i.h + padding * 2) ? $-.h : (childs$i.h + padding * 2);
			childs.y := y + padding;
			childs.by := childs$i.y + childs$i.h;

			wMin := fold padding .. $-.wMin + childs$i.wr + padding;

			hr := fold padding .. $-.hr > (childs$i.hr + padding * 2) ? $-.hr : (childs$i.hr + padding * 2);
			childs.rxr := fold xr .. childs$-.rxr + padding + childs$i.wr;
			childs.xr := childs$i.rxr - childs$i.wr; 
			childs.yr := yr + padding;
			childs.rby := childs$i.yr + childs$i.hr;			


		}
		wr := wMax;		
		render := canvas + paintRect(xr, yr, wr, hr, "#CCC");
	}
}

class Leaf(Fisheye) : LeafI { 
	actions {
		w := padding * 2;
		h := padding * 2;
		render := 
		  canvas 
		  + paintRect(
		  	xr, yr, wr, hr, 
		  	(( (mouseX > xr) && (mouseX < (xr + wr)) && (mouseY > yr) && (mouseY < (yr + hr)))
		     ? "#F00" : "#CCF"));		  
		wr := mult * w;
		hr := mult * h;
	}
}
