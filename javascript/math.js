//functions with _ at the front of the name is a system function, same goes for variables
function _isnat(num){         // Check if input is natural number. [SYSTEM FUNC]
	if(num > 0 && Number.isInteger(num))
		return true;
	else if(Math.abs(num-Math.round(num)) <= 0.0000001 && num > 0) //float error compensation.
		return true;
	else
		return false;
}
function _dist2D(x1,y1,x2,y2){// return distance between two points in 2D. [SYSTEM FUNC]
	return Math.sqrt((x2-x1)**2+(y2-y1)**2);
}
function clear(){             // Clear the canvas and its transparency settings. [SYSTEM FUNC][USER FUNC]
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.globalAlpha = 1;
}
function _real2pix_x(xcord){  // Translate calculation result to drawable pixel positions. X coordinate only. [SYSTEM FUNC]
	if(_ezsetgrid == true && _setgrid == false){   //ezsetgrid mode
		var out = document.getElementById('myCanvas').width/2 + _grid_xhat*xcord;
		return out;
	}
	else if(_ezsetgrid == false && _setgrid == true){ //setgrid mode
		var out = _orig_x + _grid_xhat*xcord;
		return out;
	}
}
function _real2pix_y(ycord){  // Translate calculation result to drawable pixel positions. Y coordinate only. [SYSTEM FUNC]
	if(_ezsetgrid == true && _setgrid == false){   //ezsetgrid mode
		var out = document.getElementById('myCanvas').height/2 - _grid_yhat*ycord;
		return out;
	}
	else if(_ezsetgrid == false && _setgrid == true){ //setgrid mode
		var out = _orig_y - _grid_yhat*ycord;
		return out;
	}
}
function line_pp(x1,y1,x2,y2,linewidth,linecap,color){//(real,real,real,real,real,string,string) Draw line segment between two points [USER FUNC] 
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	ctx.setLineDash([]);  //clear out dotline settings
	ctx.strokeStyle = color;
	ctx.lineWidth = linewidth;
	ctx.beginPath();
	ctx.lineCap = linecap;
	ctx.moveTo(_real2pix_x(x1),_real2pix_y(y1));
	ctx.lineTo(_real2pix_x(x2),_real2pix_y(y2));       
	ctx.stroke();                          
}
function dotline_pp(x1,y1,x2,y2,linewidth,linecap,color,dash,space){//(real,real,real,real,real,string,string,real,real) Draw dotted line segment between two points [USER FUNC] 
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	ctx.strokeStyle = color;
	ctx.lineWidth = linewidth;
	ctx.setLineDash([dash, space]);
	ctx.beginPath();
	ctx.lineCap = linecap;
	ctx.moveTo(_real2pix_x(x1),_real2pix_y(y1));
	ctx.lineTo(_real2pix_x(x2),_real2pix_y(y2));       
	ctx.stroke();                          
}
function setcanvas(width,height,color){ //(nat,nat,string)(width >= 50px, height >= 50px)(Exception handling done) [USER FUNC]
	//---------Exception handling---------
	if(_isnat(width) == 0)
		_system_display("setcanvas(width,height,\"color\"): \"width\" is not a natural number","red");
	else if(width < 50)
		_system_display("setcanvas(width,height,\"color\"): \"width\" too small (<50)","red");
	else if(_isnat(height) == 0)
		_system_display("setcanvas(width,height,\"color\"): \"height\" is not a natural number","red");
	else if(height <50)
		_system_display("setcanvas(width,height,\"color\"): \"height\" too small (<50)","red");
	else{
		if(!isNaN(color)){
			_system_display("setcanvas(width,height,\"color\"): \"color\" invalid.","red");
			color = "white";
	}
	//-------------------------------------
	document.getElementById('canvas_cont').width = width;
	document.getElementById('canvas_cont').height = height;
	document.getElementById('myCanvas').width = width;
	document.getElementById('myCanvas').height = height;
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	ctx.fillStyle = color;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	
	}
}
function ezsetgrid(xmax,linewidth,color,showtick,showaxis){ //(real,real,string,bool,bool) [USER FUNC]
	_orig_x = document.getElementById('myCanvas').width / 2;
	_orig_y = document.getElementById('myCanvas').height / 2;
	var ymax = xmax*document.getElementById('myCanvas').height/document.getElementById('myCanvas').width;
	_grid_xhat = _orig_x / xmax;
	_grid_yhat = _orig_x / xmax;
	_globalxmax = xmax;
	__globalxmin = -xmax;
	_globalymax = ymax;
	__globalymin = -ymax;
	_ezsetgrid = true;
	_setgrid = false;
	if(showaxis == true){
		var canvas = document.getElementById("myCanvas");
		var ctx = canvas.getContext("2d");
		ctx.strokeStyle = color;
		ctx.lineWidth = linewidth;
		ctx.beginPath();
		ctx.moveTo(0,_orig_y);
		ctx.lineTo(2*_orig_x,_orig_y);       
		ctx.stroke();                          //draw x axis
		ctx.moveTo(_orig_x,0);
		ctx.lineTo(_orig_x,2*_orig_y);    
		ctx.stroke();                          //draw y axis
		if(showtick == true){
			for(var i = 1;i<xmax;i++){                           
				line_pp(i,0.1,i,-0.1,linewidth/2,"round",color);  //right side. The thickness of the ticks are currently set to axis width/2 and height is 0.2 unit length.
			}
			for(var i = -1;i>-xmax;i--){                           
				line_pp(i,0.1,i,-0.1,linewidth/2,"round",color);  //left side. The thickness of the ticks are currently set to axis width/2 and height is 0.2 unit length.
			}
			for(var i = 1;i<ymax;i++){                           
				line_pp(0.1,i,-0.1,i,linewidth/2,"round",color);  //up side. The thickness of the ticks are currently set to axis width/2 and height is 0.2 unit length.
			}
			for(var i = -1;i>-ymax;i--){                           
				line_pp(0.1,i,-0.1,i,linewidth/2,"round",color);  //down side. The thickness of the ticks are currently set to axis width/2 and height is 0.2 unit length.
			}
		}
	}
}
function setgrid(x0,y0,xhat,yhat,xtick,ytick,linewidth,color,showtick,showaxis){ //(real,real,real,real,real,real,real,"string",bool,bool) [USER FUNC]
	_orig_x = x0;
	_orig_y = y0;
	var cheight = document.getElementById('myCanvas').height;
	var cwidth = document.getElementById('myCanvas').width;
	if(x0 > cwidth || y0 > cheight)
		_system_display("setgrid() error","red");
	else{
		_grid_xhat = xhat;
		_grid_yhat = yhat;
		_global_xmax = (cwidth-x0)/xhat;
		_global_xmin = (0-x0)/xhat;
		_global_ymax = y0/yhat;
		_global_ymin = (y0-cheight)/yhat;
		_ezsetgrid = false;
		_setgrid = true;
		if(showaxis == true){
			var canvas = document.getElementById("myCanvas");
			var ctx = canvas.getContext("2d");
			ctx.strokeStyle = color;
			ctx.lineWidth = linewidth;
			ctx.beginPath();
			ctx.moveTo(0,_orig_y);
			ctx.lineTo(cwidth,_orig_y);       
			ctx.stroke();                          //draw x axis
			ctx.moveTo(_orig_x,0);
			ctx.lineTo(_orig_x,cheight);    
			ctx.stroke();                          //draw y axis
			if(showtick == true){
				for(var i = 1;i<_global_xmax;i++){                           
					line_pp(i,xtick,i,-xtick,linewidth/2,"round",color);  //right side. The thickness of the ticks are currently set to axis width/2.
				}
				for(var i = -1;i>_global_xmin;i--){                           
					line_pp(i,xtick,i,-xtick,linewidth/2,"round",color);  //left side. The thickness of the ticks are currently set to axis width/2.
				}
				for(var i = 1;i<_global_ymax;i++){                           
					line_pp(ytick,i,-ytick,i,linewidth/2,"round",color);  //up side. The thickness of the ticks are currently set to axis width/2.
				}
				for(var i = -1;i>_global_ymin;i--){                           
					line_pp(ytick,i,-ytick,i,linewidth/2,"round",color);  //down side. The thickness of the ticks are currently set to axis width/2.
				}
			}
		}
	}
}
function label(value,x,y,color,font){ //print text on canvas ("string",real,real,"string","string") [USER FUNC]
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	if(font == null)
		ctx.font = "italic 20px serif";
	else
		ctx.font = font;
	ctx.fillStyle = color;
	ctx.fillText(value,_real2pix_x(x),_real2pix_y(y));
}
function point(x,y,size,color){ //print dot on canvas (real,real,real,"string") [USER FUNC]
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(_real2pix_x(x),_real2pix_y(y),size, 0, 2 * Math.PI);
    ctx.fill();
}
function downloadcanvas(filename){ //download the entire canvas. [SYSTEM FUNC][USER FUNC]
	// src: https://instructobit.com/tutorial/109/Downloading-and-saving-an-HTML-canvas-as-an-image-using-Javascript
    // get canvas data  
    var image = document.getElementById('myCanvas').toDataURL();  
  
    // create temporary link  
    var tmpLink = document.createElement( 'a' );  
    tmpLink.download = filename; // set the name of the download file 
    tmpLink.href = image;  
  
    // temporarily add link to body and initiate the download  
    document.body.appendChild( tmpLink );  
    tmpLink.click();  
    document.body.removeChild( tmpLink );  
	_system_display(filename+".png downloaded","blue");
}
function transparency(percentage){ //change drawing transparency (real) [USER FUNC]
	if(percentage < 0 || percentage > 100)
		_system_display("transparency():  0<=percentage<=100","red");
	else{
		var canvas = document.getElementById("myCanvas");
		var ctx = canvas.getContext("2d");
		ctx.globalAlpha = percentage/100;
	}
}
function auto_init(xmax){ // Automatically initialize the system (real)[USER FUNC][NEWBIE FUNC]
	if(xmax <= 0){
		_system_display("Canvas size invalid!!","red");
	}
	else if(xmax <= 10){
		clear();
		setcanvas(600,600,"white");
		ezsetgrid(xmax,3,"gray",1,1);
	}
	else if(xmax > 10 && xmax <= 50){
		clear();
		setcanvas(600+5*(xmax-10),600+5*(xmax-10),"white");
		ezsetgrid(xmax,3,"gray",1,1);
	}
	else if(xmax >= 50){
		clear();
		setcanvas(600+3*(xmax-10),600+3*(xmax-10),"white");
		ezsetgrid(xmax,3,"gray",1,1);
		if(xmax >= 210){           //big canvas notification
			_system_display("Beware of canvas size(>1200x1200)","red");
		}
	}
}
function ezplot(func,start,end,width,color,increment,dash,space){ //plot basic univariate functions ("string",real,real,real,"string",real,nat,nat)[USER FUNC]
	//----process input function argument----------
	func = func+';';   //add ';' at the end
	//---------------------------------------------
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	ctx.setLineDash([]);  //clear out dotline settings
	ctx.strokeStyle = color;
	ctx.lineWidth = width;
	ctx.lineCap = "round";
	if(!_isnat((end-start)/increment+1)){   
		_system_display("ezplot increment error","red");
	}
	else{
		var point_count = Math.round((end-start)/increment+1);
		var X = new Array(point_count);
		var Y = new Array(point_count);
		var x = 0; //buffer for the eval(), a measure to prevent functions with 'x', 'y', 'r', 't' in their names being processed away.
		var y = 0;
		for(var i = 0;i<point_count;i++){  //the function is being plotted using many,many line segments
			x = start+increment*i;
			eval(func);
			X[i] = x;  //generate x coord list
			Y[i] = y;  //generate y coord list (Y[i] = f(X[i]))
		}
		for(var i = 0;i<point_count;i++){  //vertical asymptote prevention
			if(Y[i] > _globalymax && Y[i+1] < _globalymin){
				X[i+1] = "NaN";
				Y[i+1] = "NaN";
				i++;
			}
			else if(Y[i] < _globalymin && Y[i+1] > _globalymax){
				X[i+1] = "NaN";
				Y[i+1] = "NaN";
				i++;
			}
		}
		if(dash == null || space == null){  //solid line mode
			for(var i = 0;i<point_count;i++){            //#For some reason, drawing as one consecutive line results in bad resolution.
				ctx.beginPath();
				ctx.moveTo(_real2pix_x(X[i]),_real2pix_y(Y[i]));
				ctx.lineTo(_real2pix_x(X[i+1]),_real2pix_y(Y[i+1]));
				ctx.stroke();
				ctx.closePath();
				//_system_display(y[i]);
			}
		}
		else{ //dotted line mode
		ctx.lineCap = "butt";	
			var count = 0;
			for(var i = 0;i<point_count;i++){
				ctx.beginPath();
				ctx.moveTo(_real2pix_x(X[i]),_real2pix_y(Y[i]));
				ctx.lineTo(_real2pix_x(X[i+1]),_real2pix_y(Y[i+1]));
				ctx.stroke();
				ctx.closePath();
				count++;
				if(count == dash){
					count = 0;
					i+=space;
				}
			}
		}
	}
}
function ezplot_polar(func,start,end,width,color,increment,dash,space){ //plot basic polar functions ("string",real,real,real,"string",real,nat,nat)[USER FUNC]
	//----process input function argument----------
	func = func+';';   //add ';' at the end
	//---------------------------------------------
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	ctx.setLineDash([]);  //clear out dotline settings
	ctx.strokeStyle = color;
	ctx.lineWidth = width;
	ctx.lineCap = "round";	
	if(!_isnat((end-start)/increment+1)){   
		_system_display("ezplot_polar increment error","red");
	}
	else{
		var point_count = Math.round((end-start)/increment+1);
		var T = new Array(point_count);
		var R = new Array(point_count);
		var x = new Array(point_count);
		var y = new Array(point_count);
		var t = 0; //buffer for the eval(), a measure to prevent functions with 'x', 'y', 'r', 't' in their names being processed away.
		var r = 0;
		for(var i = 0;i<point_count;i++){  //the function is being plotted using many,many line segments
			t = start+increment*i;
			eval(func);
			T[i] = t;  //generate t coord list
			R[i] = r;  //generate r coord list (r[i] = f(t[i]))
		}
		for(var i = 0;i<point_count;i++){  //translate(r,theta) into (x,y)
			x[i] = R[i]*Math.cos(T[i]);
			y[i] = R[i]*Math.sin(T[i]);
		}
		for(var i = 0;i<point_count;i++){  //vertical asymptote prevention
			if(x[i] > _globalymax && x[i+1] < _globalymin){
				x[i+1] = "NaN";
				y[i+1] = "NaN";
				i++;
			}
			else if(x[i] < _globalymin && y[i+1] > _globalymax){
				x[i+1] = "NaN";
				y[i+1] = "NaN";
				i++;
			}
		}
		if(dash == null || space == null){  //solid line mode 
			for(var i = 0;i<point_count;i++){       //#For some reason, drawing as one consecutive line results in bad resolution.
				ctx.beginPath();
				ctx.moveTo(_real2pix_x(x[i]),_real2pix_y(y[i]));
				ctx.lineTo(_real2pix_x(x[i+1]),_real2pix_y(y[i+1]));
				ctx.stroke();
				ctx.closePath();
			}
		}
		else{ //dotted line mode
			var count = 0;
			for(var i = 0;i<point_count;i++){
				ctx.beginPath();
				ctx.moveTo(_real2pix_x(x[i]),_real2pix_y(y[i]));
				ctx.lineTo(_real2pix_x(x[i+1]),_real2pix_y(y[i+1]));
				ctx.stroke();
				ctx.closePath();
				count++;
				if(count == dash){
					count = 0;
					i+=space;
				}
			}
		}
	}
}
function ezplot_param(func_x,func_y,start,end,width,color,increment,dash,space){ //plot basic 2D parametric functions ("string","string",real,real,real,"string",real,nat,nat)[USER FUNC]
	//----process input function_x argument----------
	func_x = func_x+';';   //add ';' at the end
	//----process input function_y argument----------
	func_y = func_y+';';   //add ';' at the end
	//---------------------------------------------
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	ctx.setLineDash([]);  //clear out dotline settings
	ctx.strokeStyle = color;
	ctx.lineWidth = width;
	ctx.lineCap = "round";	
	if(!_isnat((end-start)/increment+1)){
		_system_display("ezplot_param increment error","red");
	}
	else{
		var point_count = Math.round((end-start)/increment+1);
		var T = new Array(point_count);
		var X = new Array(point_count);
		var Y = new Array(point_count);
		var t = 0;		//buffer for the eval(), a measure to prevent functions with 'x', 'y', 'r', 't' in their names being processed away.
		var x = 0;
		var y = 0;
		for(var i = 0;i<point_count;i++){  //the function is being plotted using many,many line segments
			t = start+increment*i;  //generate t coord list
			eval(func_x);           //generate x coord list (x[i] = fx(t[i]))
			eval(func_y);           //generate y coord list (y[i] = fy(t[i]))
			T[i] = t;
			X[i] = x;
			Y[i] = y;
		}
		if(dash == null || space == null){  //solid line mode
			for(var i = 0;i<point_count;i++){     //#For some reason, drawing as one consecutive line results in bad resolution.
				ctx.beginPath();
				ctx.moveTo(_real2pix_x(X[i]),_real2pix_y(Y[i]));
				ctx.lineTo(_real2pix_x(X[i+1]),_real2pix_y(Y[i+1]));
				ctx.closePath();
				ctx.stroke();
			}
		}
		else{ //dotted line mode
			var count = 0;
			for(var i = 0;i<point_count;i++){
				ctx.beginPath();
				ctx.moveTo(_real2pix_x(X[i]),_real2pix_y(Y[i]));
				ctx.lineTo(_real2pix_x(X[i+1]),_real2pix_y(Y[i+1]));
				ctx.closePath();				
				ctx.stroke();
				count++;
				if(count == dash){
					count = 0;
					i+=space;
				}
			}
		}
	}
}
function rectangle(x,y,width,height,linewidth,color,fill){//(real,real,real,real,real,string,bool) Draw rectangle[USER FUNC] 
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	ctx.setLineDash([]);  //clear out dotline settings
	ctx.strokeStyle = color;
	ctx.fillStyle = color;
	ctx.lineWidth = linewidth;
	ctx.beginPath();
	ctx.lineCap = "round";
	ctx.lineJoin = "miter";
	ctx.moveTo(_real2pix_x(x),_real2pix_y(y));
	ctx.lineTo(_real2pix_x(x+width),_real2pix_y(y));
	ctx.lineTo(_real2pix_x(x+width),_real2pix_y(y+height));
	ctx.lineTo(_real2pix_x(x),_real2pix_y(y+height));
	ctx.lineTo(_real2pix_x(x),_real2pix_y(y));
	ctx.closePath();
	if(fill == false)
		ctx.stroke();
	else if(fill == true)
		ctx.fill();
}
function triangle(x1,y1,x2,y2,x3,y3,linewidth,color,fill){//(real,real,real,real,real,real,real,string,bool) Draw triangle[USER FUNC] 
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	ctx.setLineDash([]);  //clear out dotline settings
	ctx.strokeStyle = color;
	ctx.fillStyle = color;
	ctx.lineWidth = linewidth;
	ctx.beginPath();
	ctx.lineCap = "round";
	ctx.lineJoin = "round";
	ctx.moveTo(_real2pix_x(x1),_real2pix_y(y1));
	ctx.lineTo(_real2pix_x(x2),_real2pix_y(y2));
	ctx.lineTo(_real2pix_x(x3),_real2pix_y(y3));
	ctx.lineTo(_real2pix_x(x1),_real2pix_y(y1));
	ctx.closePath();
	if(fill == false)
		ctx.stroke();
	else if(fill == true)
		ctx.fill();
}
function fo_ode_euler(p_x,q_x,x0,y0,start,end,increment,width,color){ //numerically plot basic first order ODE using Euler's method. ("string","string",real,real,real,real,real,real,"string") [USER FUNC]
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	ctx.setLineDash([]);  //clear out dotline settings
	ctx.strokeStyle = color;
	ctx.lineWidth = width;
	ctx.lineCap = "round";
	if(!_isnat((end-start)/increment+1) || !_isnat((end-x0)/increment+1) || !_isnat((x0-start)/increment+1)){
		_system_display("foh_ode_euler increment error","red");
	}
	else{ 
		//----process p(x) argument----------
		p_x__r = p_x.replace(/x/g, "x__r[i]");  // x -> x[i] (right side use)
		p_x__l = p_x.replace(/x/g, "x__l[i]");  // x -> x[i] (left side use)
		//----process q(x) argument----------
		q_x__r = q_x.replace(/x/g, "x__r[i]");  // x -> x[i] (right side use)
		q_x__l = q_x.replace(/x/g, "x__l[i]");  // x -> x[i] (left side use)
		//---------------------------------------------
		if(end > x0){ //right side
			var cmd = "y_prime__r[i] = ("+q_x__r+")-("+p_x__r+")*(y__r[i]);";           // ##y'[n] = q_x[n]-p_x[n]*y[n]## ->  y' = q(x) - p(x)y   //Euler's method related argument
			//_system_display(cmd);
			//----process input function argument----------
			var point_count__r = Math.round((end-x0)/increment+1);
			var x__r = new Array(point_count__r);
			var y__r = new Array(point_count__r);
			var y_prime__r = new Array(point_count__r);
			x__r[0] = x0;
			for(var i = 0;i<point_count__r;i++){ //generate x coord list
				x__r[i] = x0+increment*i;     											//from center to right
			}
			y__r[0] = y0;
			for(var i = 0;i<point_count__r;i++){ //generate y coord list
				eval(cmd);
				y__r[i+1] = y__r[i]+increment*y_prime__r[i];               			 //Euler's method related argument
			}
			for(var i = 0;i<point_count__r;i++){            						 //#For some reason, drawing as one consecutive line results in bad resolution.
				ctx.beginPath();
				ctx.moveTo(_real2pix_x(x__r[i]),_real2pix_y(y__r[i]));
				ctx.lineTo(_real2pix_x(x__r[i+1]),_real2pix_y(y__r[i+1]));
				ctx.stroke();
				ctx.closePath();
			}
		}
		//---------------------------------------------
		if(start < x0){ //left side
			var cmd = "y_prime__l[i] = ("+q_x__l+")-("+p_x__l+")*(y__l[i]);";           // ##y'[n] = q_x[n]-p_x[n]*y[n]## ->  y' = q(x) - p(x)y   //Euler's method related argument
			//_system_display(cmd);
			//----process input function argument----------
			var point_count__l = Math.round((x0-start)/increment+1);
			var x__l = new Array(point_count__l);
			var y__l = new Array(point_count__l);
			var y_prime__l = new Array(point_count__l);
			x__l[0] = x0;
			for(var i = 0;i<point_count__l;i++){ //generate x coord list
				x__l[i] = x0-increment*i;                                             //from center to left
			}
			y__l[0] = y0;
			for(var i = 0;i<point_count__l;i++){ //generate y coord list
				eval(cmd);
				y__l[i+1] = y__l[i]-increment*y_prime__l[i];               			 //Euler's method related argument
			}
			for(var i = 0;i<point_count__l;i++){            						 //#For some reason, drawing as one consecutive line results in bad resolution.
				ctx.beginPath();
				ctx.moveTo(_real2pix_x(x__l[i]),_real2pix_y(y__l[i]));
				ctx.lineTo(_real2pix_x(x__l[i+1]),_real2pix_y(y__l[i+1]));
				ctx.stroke();
				ctx.closePath();
			}
		}
		
	}
}
function circle(x,y,radius,width,color,fill){ //Draw circle (real,real,real,real,"string",bool)[USER FUNC] 
	func_x = "x = "+x.toString()+"+"+radius.toString()+"*cos(t)";
	func_y = "y = "+y.toString()+"+"+radius.toString()+"*sin(t)";
	
//--------------ezplot_param(modified)---------------------------------------
	func_x = func_x.replace(/x/g, "x[i]");  // x -> x[i]
	func_x = func_x.replace(/t/g, "t[i]");  // t -> t[i]
	func_x = func_x+';';   //add ';' at the end
	//----process input function_y argument----------
	func_y = func_y.replace(/y/g, "y[i]");  // y -> y[i]
	func_y = func_y.replace(/t/g, "t[i]");  // t -> t[i]
	func_y = func_y+';';   //add ';' at the end
	//---------------------------------------------
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	ctx.setLineDash([]);  //clear out dotline settings
	ctx.fillStyle = color;
	ctx.strokeStyle = color;
	ctx.lineWidth = width;
	ctx.lineCap = "round";
	
	var increment = PI/45;
	var start = 0;
	var end = 2*PI;
	
		var point_count = Math.round((end-start)/increment+1);
		var t = new Array(point_count);
		var x = new Array(point_count);
		var y = new Array(point_count);
		for(var i = 0;i<point_count;i++){  //the function is being plotted using many,many line segments
			t[i] = start+increment*i;  //generate t coord list
			eval(func_x);                //generate x coord list (x[i] = fx(t[i]))
			eval(func_y);                //generate y coord list (y[i] = fy(t[i]))
		}
		if(fill == false){  //hollow circle
			for(var i = 0;i<point_count;i++){     //#For some reason, drawing as one consecutive line results in bad resolution.
				ctx.beginPath();
				ctx.moveTo(_real2pix_x(x[i]),_real2pix_y(y[i]));
				ctx.lineTo(_real2pix_x(x[i+1]),_real2pix_y(y[i+1]));
				ctx.closePath();
				ctx.stroke();
			}
		}
		else if(fill == true){ //solid circle
			ctx.beginPath();
			ctx.moveTo(_real2pix_x(x[0]),_real2pix_y(y[0]));
			for(var i = 0;i<point_count-1;i++){     //#For some reason, drawing as one consecutive line results in bad resolution.
				ctx.lineTo(_real2pix_x(x[i+1]),_real2pix_y(y[i+1]));
			}
			ctx.closePath();
			ctx.fill();
		}
}
function arc(x,y,radius,width,color,start,end){ //Draw part of circle (real,real,real,real,"string",nat,nat)[USER FUNC]
	if(Number.isInteger(start) && Number.isInteger(end) && start <= end && start >= -360 && end <= 360){ 
		func_x = "x = "+x.toString()+"+"+radius.toString()+"*cos(t)";
		func_y = "y = "+y.toString()+"+"+radius.toString()+"*sin(t)";
		eval(ezplot_param(func_x,func_y,PI*start/180,PI*end/180,width,color,PI/180));
	}
	else
		_system_display("arc() error","red");
}
function drawimage(x,y,path){ //Draw image on canvas (real,real,"string") [USER FUNC]
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	base_image = new Image();
	base_image.src = path;
	base_image.onload = function(){
		ctx.drawImage(base_image, _real2pix_x(x), _real2pix_y(y));
	}
}
function bounded_area(func1,func2,start,end,color,increment){ //Draw bounded area of functions on canvas. ("string","string",real,real,"string",real) [USER FUNC]
	if(!_isnat((end-start)/increment+1)){   
		_system_display("bounded_area() error","red");
	}
	else{
		//----process input function argument----------
		func1 = func1.replace(/x/g, "x[i]");  // x -> x[i]
		func1 = func1.replace(/y/g, "y1[i]");  // y -> y1[i]
		func1 = func1+';';   //add ';' at the end
		func2 = func2.replace(/x/g, "x[i]");  // x -> x[i]
		func2 = func2.replace(/y/g, "y2[i]");  // y -> y2[i]
		func2 = func2+';';   //add ';' at the end
		//---------------------------------------------
		var point_count = Math.round((end-start)/increment+1);
		var x = new Array(point_count);
		var y1 = new Array(point_count);
		var y2 = new Array(point_count);
		for(var i = 0;i<point_count;i++){  //the function is being plotted using many,many line segments
			x[i] = start+increment*i;  //generate x coord list
			eval(func1);               //generate y1 coord list (y1[i] = f(x[i]))
			eval(func2);               //generate y2 coord list (y2[i] = f(x[i]))
		}
		var canvas = document.getElementById("myCanvas");
		var ctx = canvas.getContext("2d");
		
		ctx.setLineDash([]);  //clear out dotline settings
		ctx.fillStyle = color;
		ctx.lineWidth = 0.1;
		ctx.lineCap = "round";
		ctx.lineJoin = "miter";
		
		ctx.beginPath();
		ctx.moveTo(_real2pix_x(x[0]),_real2pix_y(y1[0]));
		for(var i = 0;i<point_count-1;i++){
			ctx.lineTo(_real2pix_x(x[i+1]),_real2pix_y(y1[i+1]));
		}
		ctx.lineTo(_real2pix_x(x[point_count-1]),_real2pix_y(y2[point_count-1]));
		for(var i = point_count-1;i>0;i--){
			ctx.lineTo(_real2pix_x(x[i-1]),_real2pix_y(y2[i-1]));
		}
		ctx.lineTo(_real2pix_x(x[0]),_real2pix_y(y1[0]));
		ctx.closePath();
		ctx.fill();
		}
	}
function bounded_area_polar(func,start,end,color,increment){ //Draw bounded area of polar functions on canvas. ("string",real,real,"string",real) [USER FUNC]
	//----process input function argument----------
	func = func.replace(/t/g, "t[i]");  // t -> t[i]
	func = func.replace(/r/g, "r[i]");  // r -> r[i]
	func = func+';';   //add ';' at the end
	//---------------------------------------------
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	ctx.setLineDash([]);  //clear out dotline settings
	ctx.fillStyle = color;
	ctx.lineWidth = 0.1;
	ctx.lineCap = "round";	
	if(!_isnat((end-start)/increment+1)){   
		_system_display("bounded_area_polar increment error","red");
	}
	else{
		var point_count = Math.round((end-start)/increment+1);
		var t = new Array(point_count);
		var r = new Array(point_count);
		var x = new Array(point_count);
		var y = new Array(point_count);
		for(var i = 0;i<point_count;i++){  //the function is being plotted using many,many line segments
			t[i] = start+increment*i;  //generate t coord list
			eval(func);                //generate r coord list (r[i] = f(t[i]))
		}
		for(var i = 0;i<point_count;i++){  //translate(r,theta) into (x,y)
			x[i] = r[i]*Math.cos(t[i]);
			y[i] = r[i]*Math.sin(t[i]);
		}
		ctx.beginPath();
		ctx.moveTo(_real2pix_x(0),_real2pix_y(0));
		for(var i = 0;i<point_count;i++){
			ctx.lineTo(_real2pix_x(x[i]),_real2pix_y(y[i]));
		}
		ctx.lineTo(_real2pix_x(0),_real2pix_y(0));
		ctx.closePath();
		ctx.fill();
	}
}
function display(str){ //Display text on Public Display ("string") [SYSTEM FUNC][USER FUNC]
	document.getElementById("public_displaycontent").innerHTML = str;
}
function ellipse(c1x,c1y,c2x,c2y,a,width,color,fill){ //Draw ellipse of any angle. (real,real,real,real,real,real,"string",bool)[USER FUNC]
	if(c1x > c2x){ //swap two points to make sure c2x >= c1x
		var tmp;
		tmp = c1x;
		c1x = c2x;
		c2x = tmp;
		tmp = c1y;
		c1y = c2y;
		c2y = tmp;
	}
	var center_x = (c1x+c2x)/2;
	var center_y = (c1y+c2y)/2;
	var c = Math.sqrt((c2x-c1x)**2+(c2y-c1y)**2)/2;
	var b = Math.sqrt(a**2 - c**2); // a^2 = b^2 + c^2
	var cos_theta = cos(arctan((c2y-c1y)/abs((c2x-c1x))));
	var sin_theta = sin(arctan((c2y-c1y)/abs((c2x-c1x))));
	
	func_x = "x = "+a.toString()+"*cos(t)";
	func_y = "y = "+b.toString()+"*sin(t)";
	
//--------------ezplot_param(modified)---------------------------------------
	func_x = func_x.replace(/x/g, "x[i]");  // x -> x[i]
	func_x = func_x.replace(/t/g, "t[i]");  // t -> t[i]
	func_x = func_x+';';   //add ';' at the end
	//----process input function_y argument----------
	func_y = func_y.replace(/y/g, "y[i]");  // y -> y[i]
	func_y = func_y.replace(/t/g, "t[i]");  // t -> t[i]
	func_y = func_y+';';   //add ';' at the end
	//---------------------------------------------
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	ctx.setLineDash([]);  //clear out dotline settings
	ctx.fillStyle = color;
	ctx.strokeStyle = color;
	ctx.lineWidth = width;
	ctx.lineCap = "round";
	
	var increment = PI/45;
	var start = 0;
	var end = 2*PI;
	
		var point_count = Math.round((end-start)/increment+1);
		var t = new Array(point_count);
		var x = new Array(point_count);
		var y = new Array(point_count);
		for(var i = 0;i<point_count;i++){  //the function is being plotted using many,many line segments
			t[i] = start+increment*i;  //generate t coord list
			eval(func_x);                //generate x coord list (x[i] = fx(t[i]))
			eval(func_y);                //generate y coord list (y[i] = fy(t[i]))
		}
		var tempx = 0;
		var tempy = 0;
		for(var i = 0;i<point_count;i++){  //apply rotation matrix and center dispalcement
			tempx = cos_theta*x[i] - sin_theta*y[i] + center_x;
			tempy = sin_theta*x[i] + cos_theta*y[i] + center_y;
			x[i] = tempx;
			y[i] = tempy;
		}
		if(fill == false){  //hollow circle
			for(var i = 0;i<point_count;i++){     //#For some reason, drawing as one consecutive line results in bad resolution.
				ctx.beginPath();
				ctx.moveTo(_real2pix_x(x[i]),_real2pix_y(y[i]));
				ctx.lineTo(_real2pix_x(x[i+1]),_real2pix_y(y[i+1]));
				ctx.closePath();
				ctx.stroke();
			}
		}
		else if(fill == true){ //solid circle
			ctx.beginPath();
			ctx.moveTo(_real2pix_x(x[0]),_real2pix_y(y[0]));
			for(var i = 0;i<point_count-1;i++){     //#For some reason, drawing as one consecutive line results in bad resolution.
				ctx.lineTo(_real2pix_x(x[i+1]),_real2pix_y(y[i+1]));
			}
			ctx.closePath();
			ctx.fill();
		}
}
function slope_field(p_x,q_x,xmin,xmax,ymin,ymax,increment,length,width,color){ //Draw slope field of basic first order ODE. ("string","string",real,real,real,real,real,real,real,"string") [USER FUNC]
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	ctx.setLineDash([]);  //clear out dotline settings
	ctx.strokeStyle = color;
	ctx.lineWidth = width;
	ctx.lineCap = "round";
	if(!_isnat((xmax-xmin)/increment+1) || !_isnat((ymax-ymin)/increment+1)){
		_system_display("slope_field increment or range error","red");
	}
	else{
		var slope;
		//----process p(x) argument----------
		p = p_x.replace(/x/g, "i");  // x -> i
		//----process q(x) argument----------
		q = q_x.replace(/x/g, "i");  // x -> i
		//---------------------------------------------
		var cmd = "slope = ("+q+")-("+p+")*(j);";
		var x_dis = 0;
		var y_dis = 0;
		for(var i = xmin;i<=xmax;i+=increment){
			for(var j = ymin;j<=ymax;j+=increment){
				eval(cmd);
				x_dis = (length/2)*Math.cos(Math.atan(slope));
				y_dis = (length/2)*Math.sin(Math.atan(slope));
				ctx.beginPath();
				ctx.moveTo(_real2pix_x(i-x_dis),_real2pix_y(j-y_dis));
				ctx.lineTo(_real2pix_x(i+x_dis),_real2pix_y(j+y_dis));  
				ctx.stroke();				
				ctx.closePath();
			}
		}
	}
}
function polygon_rc(cx,cy,r,n,theta,linewidth,color,fill){  //Draw circumscribed regular polygons. (real,real,real,nat,real,real,"string",bool) [USER FUNC]
	if(!_isnat(n) || n<3)
		_system_display("polygon_rc n incorrect","red","red");
	else{
		var x = new Array(n);
		var y = new Array(n);
		var angle = 2*PI/n;
		var theta_now = 0;
		x[0] = 0;
		y[0] = r;
		for(var i = 0;i<n-1;i++){
			theta_now+=angle;			                        //generate the list of points by rotating counterclockwise
			x[i+1] = cos(theta_now)*x[0] - sin(theta_now)*y[0];
			y[i+1] = sin(theta_now)*x[0] + cos(theta_now)*y[0];
		}
		var temp_x = 0;
		var temp_y = 0;
		for(var i = 0;i<n;i++){		                            //rotate it theta degrees + displace (cx,cy)
			temp_x = cos(theta*PI/180)*x[i] - sin(theta*PI/180)*y[i];
			temp_y = sin(theta*PI/180)*x[i] + cos(theta*PI/180)*y[i];
			x[i] = temp_x+cx;
			y[i] = temp_y+cy;
		}
		var canvas = document.getElementById("myCanvas");
		var ctx = canvas.getContext("2d");
		ctx.setLineDash([]);  //clear out dotline settings
		ctx.strokeStyle = color;
		ctx.fillStyle = color;
		ctx.lineWidth = linewidth;
		ctx.lineCap = "round";
		ctx.beginPath();
		ctx.moveTo(_real2pix_x(x[0]),_real2pix_y(y[0]));
			for(var i = 0;i<n-1;i++){
				ctx.lineTo(_real2pix_x(x[i+1]),_real2pix_y(y[i+1]));
		}    
		ctx.closePath();
		if(fill == false)
			ctx.stroke();
		else if(fill == true)
			ctx.fill();
		
	}
}
function polygon_ri(cx,cy,r,n,theta,linewidth,color,fill){	//Draw inscribed regular polygons. (real,real,real,nat,real,real,"string",bool) [USER FUNC]
	if(!_isnat(n) || n<3)
		_system_display("polygon_ri n incorrect","red");
	else{
		var r2 = r*sec(2*PI/(2*n));
		polygon_rc(cx,cy,r2,n,theta,linewidth,color,fill);
	}
}
function polygon_rs(cx,cy,s,n,theta,linewidth,color,fill){  //Draw regular polygons by defining center and sidelength. (real,real,real,nat,real,real,"string",bool) [USER FUNC]
	if(!_isnat(n) || n<3)
		_system_display("polygon_rs n incorrect","red");
	else{
		var r2 = (s/2)*csc(2*PI/(2*n));
		polygon_rc(cx,cy,r2,n,theta,linewidth,color,fill);
	}
}
function polygon_rv(cx,cy,vx,vy,n,linewidth,color,fill){    //Draw regular polygons by defining center and one vertex. (real,real,real,real,nat,real,"string",bool) [USER FUNC]
	if(!_isnat(n) || n<3)
		_system_display("polygon_rv n incorrect","red");
	else if(cx == vx && cy == vy)
		_system_display("polygon_rv center and vertex are the same point","red");
	else{
		var angle = 0;
		if(vx-cx > 0)
			angle = arctan((vy-cy)/(vx-cx));
		else if(vx-cx < 0)
			angle = arctan((vy-cy)/(vx-cx))+PI;
		else if(vx-cx == 0){
			if(vy > cy)
				angle = PI/2;
			else if(vy < cy)
				angle = -PI/2;
		}
		var r = _dist2D(cx,cy,vx,vy);
		polygon_rc(cx,cy,r,n,-90+(angle*180/PI),linewidth,color,fill);
	}
}
function la_line_pp(x1,y1,x2,y2,linewidth,linecap,color){//(real,real,real,real,real,string,string) Draw line segment between two points(linear transformable) [USER FUNC] 
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	ctx.setLineDash([]);  //clear out dotline settings
	ctx.strokeStyle = color;
	ctx.lineWidth = linewidth;
	ctx.beginPath();
	ctx.lineCap = linecap;
	ctx.moveTo(_real2pix_x(x1*lin_tran[0]+y1*lin_tran[1]),_real2pix_y(x1*lin_tran[2]+y1*lin_tran[3]));
	ctx.lineTo(_real2pix_x(x2*lin_tran[0]+y2*lin_tran[1]),_real2pix_y(x2*lin_tran[2]+y2*lin_tran[3]));       
	ctx.stroke();                          
}
function la_rectangle(x,y,width,height,linewidth,color,fill){//(real,real,real,real,real,string,bool) Draw rectangle(linear transformable) [USER FUNC] 
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	ctx.setLineDash([]);  //clear out dotline settings
	ctx.strokeStyle = color;
	ctx.fillStyle = color;
	ctx.lineWidth = linewidth;
	ctx.beginPath();
	ctx.lineCap = "round";
	ctx.lineJoin = "miter";
	
	ctx.moveTo(_real2pix_x(x*lin_tran[0]+y*lin_tran[1]),_real2pix_y(x*lin_tran[2]+y*lin_tran[3]));
	ctx.lineTo(_real2pix_x((x+width)*lin_tran[0]+y*lin_tran[1]),_real2pix_y((x+width)*lin_tran[2]+y*lin_tran[3]));
	ctx.lineTo(_real2pix_x((x+width)*lin_tran[0]+(y+height)*lin_tran[1]),_real2pix_y((x+width)*lin_tran[2]+(y+height)*lin_tran[3]));
	ctx.lineTo(_real2pix_x(x*lin_tran[0]+(y+height)*lin_tran[1]),_real2pix_y(x*lin_tran[2]+(y+height)*lin_tran[3]));
	ctx.lineTo(_real2pix_x(x*lin_tran[0]+y*lin_tran[1]),_real2pix_y(x*lin_tran[2]+y*lin_tran[3]));
	ctx.closePath();
	
	if(fill == false)
		ctx.stroke();
	else if(fill == true)
		ctx.fill();
}
function line_ps(x,y,m,ll,rl,linewidth,linecap,color){//(real,real,real/string,real,real,real,string,string) Draw line segment with point and slope [USER FUNC] 
	if(m == NaN || m == "inf"){ //manual or function-returned infinity
		line_pp(x,y-ll,x,y+rl,linewidth,linecap,color);
	}
	else{
		line_pp(x-Math.sqrt((ll**2)/(m**2+1)),y-m*Math.sqrt((ll**2)/(m**2+1)),x+Math.sqrt((rl**2)/(m**2+1)),y+m*Math.sqrt((rl**2)/(m**2+1)),linewidth,linecap,color);
	}
}
function n_derivative(fx,xpos){ //(string,real) Estimate derivative using symmetric difference quotient with h = 0.001[USER FUNC]
	var x = xpos; //buffer for the eval(), a measure to prevent functions with 'x', 'y', 'r', 't' in their names being processed away.
	var y,y1,y2 = 0;
	x-=0.001;
	eval(fx);
	y1 = y;
	x+=0.002;
	eval(fx);
	y2 = y;
	return (y2-y1)/(0.002);
}
function _system_display(str,color){ //Display text on system_display. ("string","string")[SYSTEM FUNC]
	document.getElementById("system_display").style.color = color;
	document.getElementById("system_display").innerHTML = str;
}
function magnify(sx,sy,sw,sh,dx,dy,dw,dh){ //Magnify certain parts of canvas onto another part of canvas. (real,real,real,real,real,real,real,real)[USER FUNC]
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	ctx.drawImage(myCanvas,_real2pix_x(sx),_real2pix_y(sy),sw*_grid_xhat,sh*_grid_yhat,_real2pix_x(dx),_real2pix_y(dy),dw*_grid_xhat,dh*_grid_yhat);
}
function arrow_pp(){
	
}





//------↓↓↓↓↓↓↓↓Mathematical variables declare zone↓↓↓↓↓↓↓↓-------------------
var lin_tran = new Array(1,0,0,1);  //linear transformation matrix, default is unit matrix(no transformation).


//------↑↑↑↑↑↑↑↑Mathematical variables and function declare zone↑↑↑↑↑↑↑↑-------------------


//------↓↓↓↓↓↓↓↓Mathematical constant and function declare zone↓↓↓↓↓↓↓↓-------------------
const PI = 3.1415926535;              //PI
const E = 2.7182818284;               //Euler's number
const GOLD = 1.6180339888;       	  //Golden ratio
const SLIVER = 2.4142135623;          //Sliver ratio
const BRONZE = 3.3027756377;          //Bronze ratio
const GAMMA = 0.5772156649;           //Euler-Mascheroni constant
const APERY = 1.2020569032;           //Apery's constant
function sin(x){           
	return Math.sin(x);
}
function cos(x){
	return Math.cos(x);
}
function tan(x){
	return Math.tan(x);
}
function cot(x){
	return 1 / Math.tan(x);
}
function sec(x){
	return 1 / Math.cos(x);
}
function csc(x){
	return 1 / Math.sin(x);
}
function arcsin(x){
	return Math.asin(x);
}
function arccos(x){
	return Math.acos(x);
}
function arctan(x){
	return Math.atan(x);
}
function arccot(x){
	return Math.atan(1/x);
}
function arcsec(x){
	return Math.acos(1/x);
}
function arccsc(x){
	return Math.asin(1/x);
}
function sinh(x){
	return Math.sinh(x);
}
function cosh(x){
	return Math.cosh(x);
}
function tanh(x){
	return Math.tanh(x);
}
function coth(x){
	return 1/Math.tanh(x);
}
function sech(x){
	return 1/Math.cosh(x);
}
function csch(x){
	return 1/Math.sinh(x);
}
function arsinh(x){
	return Math.asinh(x);
}
function arcosh(x){
	return Math.acosh(x);
}
function artanh(x){
	return Math.atanh(x);
}
function arcoth(x){
	return Math.atanh(1/x);
}
function arsech(x){
	return Math.acosh(1/x);
}
function arcsch(x){
	return Math.asinh(1/x);
}
//----------------------------------
function abs(x){
	return Math.abs(x);
}
function pow(base,exponent){
	return Math.pow(base,exponent);
}
function log(base,real){
	return Math.log(real)/Math.log(base);
}
function sqrt(x){
	return Math.sqrt(x);
}
function cbrt(x){
	return Math.cbrt(x);
}
//----------------------------------
function floor(x){
	return Math.floor(x);
}
function round(x){
	return Math.round(x);
}
function ceil(x){
	return Math.ceil(x);
}
function trunc(x){
	return Math.trunc(x);
}
function sgn(x){
	return Math.sign(x);
}
function sinc(x){
	if(x == 0)
		return 1;
	else
		return Math.sin(x)/x;
}
//----------------------------------
function factorial(x){
	var out = 1;
	if(x == 0)
		return 1;
	else if(!_isnat(x))
		_system_display("factorial() error: x is not a natural number","red");
	else if(x>20)
		_system_display("factorial() error: x too large(>20)","red");
	else{
		for(var i = 1;i<=x;i++){
			out*=i;
		}
		return out;
	}
}
function nPr(n,r){
	if(r == 0)
		return 1;
	else if(!_isnat(n) || !_isnat(r) || r>n)
		_system_display("nPr() error","red");
	else{
		var tmp = n;
		var out = 1;
		for(var i = 0;i<r;i++){
			out *= tmp;
			tmp--;
		}
		return out;
	}
}
function nCr(n,r){
	if(r == 0)
		return 1;
	else if(!_isnat(n) || !_isnat(r) || r>n)
		_system_display("nCr() error","red");
	else{
		if(r > n/2)
			r = n-r;
		return nPr(n,r)/factorial(r);
	}
}
//----------------------------------
function erf(x){
	if(x > 6)
		return 1;
	else if(x < -6)
		return -1;
	else if(x == 0)
		return 0;
	else if(x<=6 && x > 0){
		var out = 1-(1/(pow((1+0.278393*x+0.230389*pow(x,2)+0.000972*pow(x,3)+0.078108*pow(x,4)),4)));
		return out;
	}
	else if(x>=-6 && x < 0){
		var k = -x;
		var out = 1-(1/(pow((1+0.278393*k+0.230389*pow(k,2)+0.000972*pow(k,3)+0.078108*pow(k,4)),4)));
		return -out;
	}
}
function normPDF(mean,variance,x){
	if(variance <= 0)
		_system_display("normPDF() error: variance <= 0","red");
	else{
		var stdev = sqrt(variance);
		var out = (1/(stdev*sqrt(2*PI)))*pow(E,-0.5*((x-mean)/stdev)**2);
		return out;
	}
}
function normCDF(mean,variance,x){
	if(variance <= 0)
		_system_display("normCDF() error: variance <= 0","red");
	else{
		var stdev = sqrt(variance);
		var out = 0.5*(1+erf((x-mean)/(stdev*sqrt(2))));
		return out;
	}
}
//------↑↑↑↑↑↑↑↑Mathematical constant and function declare zone↑↑↑↑↑↑↑↑-------------------