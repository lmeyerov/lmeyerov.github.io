interface Root { 
	var w : float;
	var h : float;
	var canvas : int;
	
	var wr : float;
	var hr : float;
	input mouseX : int;
	input mouseY : int;
	input radius : int = 50;
	input padding : int = 10;
}

interface Node { 
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
	
	var radius : int;
	var padding : int;
}

trait Fisheye {
	attributes {
		var mult : int;
		var absDist : int;
	}
	actions {
		absDist := sqrt(( (x + w/2 +  radius/0.5) - mouseX) * ( (x + w/2 + radius/0.5) - mouseX) 
		                + ( (y + h/2 + radius/0.5) - mouseY) * ( (y + h/2 + radius /0.5) - mouseY));
		mult := absDist > radius ? 1.0 : ((radius / 4) * ((radius - absDist + radius/3)/radius));	
	}
}

trait Propagate {
  actions {
    loop childs {
      childs.radius := radius;
      childs.padding := padding;

	  childs.mouseX := mouseX;
	  childs.mouseY := mouseY;			

	  childs.canvas := render;
    }
  }
}

class Top : Root { 
	children {
		child : Node;
	}
	attributes {
		var done : int;
	}
	actions {
		w := child.w + padding * 2;
		h := child.h + padding * 2;
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
		
		child.radius := radius;
		child.padding := padding;
		
	}
}
class HBox(Fisheye, Propagate) : Node { 
	children {
		childs : [ Node ];
	}
	actions {
		loop childs {
			w := fold padding .. $-.w + childs$i.w + padding;
			childs.rx := fold x .. childs$-.rx + padding + childs$i.w;
			childs.x := childs$i.rx - childs$i.w; 
			h := fold padding .. $-.h > (childs$i.h + padding * 2) ? $-.h : (childs$i.h + padding * 2);
			childs.y := y + padding;
			childs.by := childs$i.y + childs$i.h;

			wr := fold padding .. $-.wr + childs$i.wr + padding;
			hr := fold padding .. $-.hr > (childs$i.hr + padding * 2) ? $-.hr : (childs$i.hr + padding * 2);
			childs.rxr := fold xr .. childs$-.rxr + padding + childs$i.wr;
			childs.xr := childs$i.rxr - childs$i.wr; 
			childs.yr := yr + padding;
			childs.rby := childs$i.yr + childs$i.hr;			
		}
		render := paintRect(xr, yr, wr, hr, "#CCC");
	}
}

class VBox(Fisheye, Propagate) : Node { 
	children {
		childs : [ Node ];
	}
	actions {
		loop childs {
			h := fold padding .. $-.h + childs$i.h + padding;
			childs.by := fold y .. childs$-.by + padding + childs$i.h;
			childs.y := childs$i.by - childs$i.h; 
			w := fold padding .. $-.w > (childs$i.w + padding * 2) ? $-.w : (childs$i.w + padding * 2);
			childs.x := x + padding;
			childs.rx := childs$i.x + childs$i.w;

			hr := fold padding .. $-.hr + childs$i.hr + padding;
			wr := fold padding .. $-.wr > (childs$i.wr + padding * 2) ? $-.wr : (childs$i.wr + padding * 2);
			childs.rby := fold yr .. childs$-.rby + padding + childs$i.hr;
			childs.yr := childs$i.rby - childs$i.hr; 
			childs.xr := xr + padding;
			
		}
		render := paintRect(xr, yr, wr, hr, "#CCC");
	}
}

class Leaf(Fisheye) : Node { 
	actions {
		w := padding * 2;
		h := padding * 2;
		render := 
		  canvas 
		  + (( (mouseX > xr) && (mouseX < (xr + wr)) && (mouseY > yr) && (mouseY < (yr + hr)))
		     ? paintRect(xr, yr, wr, hr, "#F00") : paintRect(xr, yr, wr, hr, "#CCF"));
		  
		wr := mult * w;
		hr := mult * h;
	}
}
