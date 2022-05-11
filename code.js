//functions with _ at the front of the name is a system function, same goes for variables
function _isnat(num){         // Check if input is natural number. [SYSTEM FUNC]
	if(num > 0 && Number.isInteger(num))
		return true;
	else if(Math.abs(num-Math.round(num)) <= 0.0000001 && num > 0) //float error compensation.
		return true;
	else
		return false;
}
function clear(){             //clear the canvas and its transparency settings. [SYSTEM FUNC][USER FUNC]
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.globalAlpha = 1;
}
function _real2pix_x(xcord){  // translate calculation result to drawable pixel positions. X coordinate only. [SYSTEM FUNC]
	if(_ezsetgrid == true && _setgrid == false){   //ezsetgrid mode
		var out = document.getElementById('canvas_cont').width/2 + _grid_xhat*xcord;
		return out;
	}
	else if(_ezsetgrid == false && _setgrid == true){ //setgrid mode
		var out = _orig_x + _grid_xhat*xcord;
		return out;
	}
}
function _real2pix_y(ycord){  // translate calculation result to drawable pixel positions. Y coordinate only. [SYSTEM FUNC]
	if(_ezsetgrid == true && _setgrid == false){   //ezsetgrid mode
		var out = document.getElementById('canvas_cont').height/2 - _grid_yhat*ycord;
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
		alert("setcanvas(width,height,\"color\"): \"width\" is not a natural number");
	else if(width < 50)
		alert("setcanvas(width,height,\"color\"): \"width\" too small(<50)");
	else if(_isnat(height) == 0)
		alert("setcanvas(width,height,\"color\"): \"height\" is not a natural number");
	else if(height <50)
		alert("setcanvas(width,height,\"color\"): \"height\" too small(<50)");
	else{
	if(!isNaN(color)){
		alert("setcanvas(width,height,\"color\"): \"color\" invalid.");
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
		alert("setgrid() error");
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
}
function transparency(percentage){ //change drawing transparency (real) [USER FUNC]
	if(percentage < 0 || percentage > 100)
		alert("transparency():  0<=percentage<=100");
	else{
		var canvas = document.getElementById("myCanvas");
		var ctx = canvas.getContext("2d");
		ctx.globalAlpha = percentage/100;
	}
}
function auto_init(xmax){ // Automatically initialize the system (real)[USER FUNC][NEWBIE FUNC]
	if(xmax <= 0){
		alert("Canvas size invalid!!");
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
			alert("Beware of canvas size(>1200x1200)");
		}
	}
}
function ezplot(func,start,end,width,color,increment,dash,space){ //plot basic univariate functions ("string",real,real,real,"string",real,nat,nat)[USER FUNC]
	//----process input function argument----------
	func = func.replace(/x/g, "x[i]");  // x -> x[i]
	func = func.replace(/y/g, "y[i]");  // y -> y[i]
	func = func+';';   //add ';' at the end
	//---------------------------------------------
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	ctx.setLineDash([]);  //clear out dotline settings
	ctx.strokeStyle = color;
	ctx.lineWidth = width;
	ctx.lineCap = "round";
	if(!_isnat((end-start)/increment+1)){   
		alert("ezplot increment error");
	}
	else{
		var point_count = Math.round((end-start)/increment+1);
		var x = new Array(point_count);
		var y = new Array(point_count);
		for(var i = 0;i<point_count;i++){  //the function is being plotted using many,many line segments
			x[i] = start+increment*i;  //generate x coord list
			eval(func);                //generate y coord list (y[i] = f(x[i]))
		}
		for(var i = 0;i<point_count;i++){  //vertical asymptote prevention
			if(y[i] > _globalymax && y[i+1] < _globalymin){
				x[i+1] = "NaN";
				y[i+1] = "NaN";
				i++;
			}
			else if(y[i] < _globalymin && y[i+1] > _globalymax){
				x[i+1] = "NaN";
				y[i+1] = "NaN";
				i++;
			}
		}
		if(dash == null || space == null){  //solid line mode
			for(var i = 0;i<point_count;i++){            //#For some reason, drawing as one consecutive line results in bad resolution.
				ctx.beginPath();
				ctx.moveTo(_real2pix_x(x[i]),_real2pix_y(y[i]));
				ctx.lineTo(_real2pix_x(x[i+1]),_real2pix_y(y[i+1]));
				ctx.stroke();
				ctx.closePath();
				//console.log(y[i]);
			}
		}
		else{ //dotted line mode
		ctx.lineCap = "butt";	
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
function ezplot_polar(func,start,end,width,color,increment,dash,space){ //plot basic polar functions ("string",real,real,real,"string",real,nat,nat)[USER FUNC]
	//----process input function argument----------
	func = func.replace(/t/g, "t[i]");  // t -> t[i]
	func = func.replace(/r/g, "r[i]");  // r -> r[i]
	func = func+';';   //add ';' at the end
	//---------------------------------------------
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	ctx.setLineDash([]);  //clear out dotline settings
	ctx.strokeStyle = color;
	ctx.lineWidth = width;
	ctx.lineCap = "round";	
	if(!_isnat((end-start)/increment+1)){   
		alert("ezplot_polar increment error");
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
	ctx.strokeStyle = color;
	ctx.lineWidth = width;
	ctx.lineCap = "round";	
	if(!_isnat((end-start)/increment+1)){
		alert("ezplot_param increment error");
	}
	else{
		var point_count = Math.round((end-start)/increment+1);
		var t = new Array(point_count);
		var x = new Array(point_count);
		var y = new Array(point_count);
		for(var i = 0;i<point_count;i++){  //the function is being plotted using many,many line segments
			t[i] = start+increment*i;  //generate t coord list
			eval(func_x);                //generate x coord list (x[i] = fx(t[i]))
			eval(func_y);                //generate y coord list (y[i] = fy(t[i]))
		}
		if(dash == null || space == null){  //solid line mode
			for(var i = 0;i<point_count;i++){     //#For some reason, drawing as one consecutive line results in bad resolution.
				ctx.beginPath();
				ctx.moveTo(_real2pix_x(x[i]),_real2pix_y(y[i]));
				ctx.lineTo(_real2pix_x(x[i+1]),_real2pix_y(y[i+1]));
				ctx.closePath();
				ctx.stroke();
			}
		}
		else{ //dotted line mode
			var count = 0;
			for(var i = 0;i<point_count;i++){
				ctx.beginPath();
				ctx.moveTo(_real2pix_x(x[i]),_real2pix_y(y[i]));
				ctx.lineTo(_real2pix_x(x[i+1]),_real2pix_y(y[i+1]));
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
function foh_ode_euler(p_x,q_x,x0,y0,start,end,increment,width,color){ //numerically plot basic first order homogenous ODE using Euler's method. ("string","string",real,real,real,real,real,real,"string") [USER FUNC]
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	ctx.setLineDash([]);  //clear out dotline settings
	ctx.strokeStyle = color;
	ctx.lineWidth = width;
	ctx.lineCap = "round";
	if(!_isnat((end-start)/increment+1) || !_isnat((end-x0)/increment+1) || !_isnat((x0-start)/increment+1)){
		alert("foh_ode_euler increment error");
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
			//console.log(cmd);
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
			//console.log(cmd);
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
	if(Number.isInteger(start) && Number.isInteger(end) && start < end && start >= -360 && end <= 360){ 
		func_x = "x = "+x.toString()+"+"+radius.toString()+"*cos(t)";
		func_y = "y = "+y.toString()+"+"+radius.toString()+"*sin(t)";
		eval(ezplot_param(func_x,func_y,PI*start/180,PI*end/180,width,color,PI/180));
	}
	else
		alert("arc() error");
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
function bounded_area(func1,func2,start,end,color,increment){ //Draw bounded area of functions on canvas ("string","string",real,real,"string",real) [USER FUNC]
	if(!_isnat((end-start)/increment+1)){   
		alert("bounded_area error");
	}
	else{
		if(func1 == "x-axis")
			func1 = "y = x**0 -1";
		else if(func2 == "x-axis")
			func2 = "y = x**0 -1";
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
function bounded_area_polar(func,start,end,color,increment){ //Draw bounded area of polar functions on canvas ("string",real,real,"string",real) [USER FUNC]
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
		alert("bounded_area_polar increment error");
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




//------↓↓↓↓↓↓↓↓Mathematical constant and function declare zone↓↓↓↓↓↓↓↓-------------------
const PI = 3.1415926535;              //π
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
//----------------------------------
function factorial(x){
	var out = 1;
	if(x == 0)
		return 1;
	else if(!_isnat(x))
		alert("factorial() error: x is not a natural number");
	else if(x>20)
		alert("factorial() error: x too large(>20)");
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
		alert("nPr() error");
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
		alert("nCr() error");
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
		alert("normPDF() error: variance <= 0");
	else{
		var stdev = sqrt(variance);
		var out = (1/(stdev*sqrt(2*PI)))*pow(E,-0.5*((x-mean)/stdev)**2);
		return out;
	}
}
function normCDF(mean,variance,x){
	if(variance <= 0)
		alert("normCDF() error: variance <= 0");
	else{
		var stdev = sqrt(variance);
		var out = 0.5*(1+erf((x-mean)/(stdev*sqrt(2))));
		return out;
	}
}






//------↑↑↑↑↑↑↑↑Mathematical constant and function declare zone↑↑↑↑↑↑↑↑-------------------
//------↓↓↓↓↓↓↓↓Global variable declare zone↓↓↓↓↓↓↓↓-------------------
var _ezsetgrid = false;
var _setgrid = false;
var _globalxmax = 1;
var _globalymax = 1;
var _globalxmin = 1;
var _globalymin = 1;
var _grid_xhat = 1;		  	//global xhat
var _grid_yhat = 1;			//global yhat
var _orig_x = 0;			//global origin x coordinate
var _orig_y = 0;			//global origin y coordinate
const default_template = "clear();  //clear canvas\nsetcanvas(600,600,\"white\"); //set 600x600 white canvas\nezsetgrid(10,2,\"gray\",1,1); //initialize coordinate\nlabel(\"x\",9.4,-0.6,\"gray\",\"italic 20px serif\");  //x\nlabel(\"y\",-0.6,9.4,\"gray\",\"italic 20px serif\");  //y\nlabel(\"O\",-0.9,-0.9,\"gray\",\"italic 25px serif\"); //O\nfor(var tmp = -9;tmp <=9;tmp++){\nline_pp(tmp,10,tmp,-10,0.3,\"round\",\"gray\");\nline_pp(-10,tmp,10,tmp,0.3,\"round\",\"gray\");\n}\n//------------------------------------------------\n";
var print_curpos_enabled = false;					//This is for the cursor position tool
//------↑↑↑↑↑↑↑↑Global variable declare zone↑↑↑↑↑↑↑↑-------------------




window.onload = function(){
        var canvas = document.getElementById("myCanvas");
        var context = canvas.getContext("2d");	
		
		document.addEventListener('keyup', input_autocomplete , false); //input_autocomplete
		
		document.getElementById("input").value = default_template;  //load default template
		var script = document.getElementById("input").value;    	//run default template
		eval(script);												//run default template
		
		dragElement(document.getElementById("curpos_display"));  //set cursorpos displayer as a draggable <div>
		
		const canvasQ = document.querySelector('canvas');		//This is for the cursor position tool
		canvasQ.addEventListener('mousedown', function(e) { 	//This is for the cursor position tool
			print_curpos(canvasQ,e);                        	//This is for the cursor position tool
		});
		
		document.getElementById("curfontsize").innerHTML = document.getElementById("input").style.fontSize;      //Current textarea font size display
		
		document.getElementById("Run").addEventListener("click", function(){ 
			var script = document.getElementById("input").value;
			eval(script);
		}); 
		document.getElementById('fileselect').addEventListener('input', function(){
            
            var fr=new FileReader();
            fr.onload=function(){
				document.getElementById("input").value = fr.result;
			}
			fr.readAsText(this.files[0]);
		});
		document.getElementById("savefile").addEventListener("click", function(){ 
		var output_file_content = document.getElementById("input").value;
		var fname = document.getElementById('filename').value;
		var a = document.createElement("a");
		a.href = window.URL.createObjectURL(new Blob([output_file_content], {type: "text/plain;charset=utf-8"}));
		a.download = fname+".txt";
		a.click();
		//alert("success");
		}); 
		document.getElementById("saveimage").addEventListener("click", function(){
			downloadcanvas(document.getElementById('imagename').value);
		});
}
window.onerror = function(e){
	alert("Script Error. Press F12 for more details");
}
window.onbeforeunload = function() {            //Page refresh warning
  return "Data will be lost if you leave the page, are you sure?";
}

//-------------------------Collapsable side panel from W3School(file)
function colaps_file_open() {
  document.getElementById("colaps_file").style.width = "250px";
}
function colaps_file_close() {
  document.getElementById("colaps_file").style.width = "0px";
}
//-------------------------Collapsable side panel from W3School(file)
//-------------------------Collapsable side panel from W3School(help)
function colaps_help_open() {
  document.getElementById("colaps_help").style.width = "300px";
}
function colaps_help_close() {
  document.getElementById("colaps_help").style.width = "0px";
}
//-------------------------Collapsable side panel from W3School(help)
//-------------------------Collapsable side panel from W3School(settings)
function colaps_settings_open() {
  document.getElementById("colaps_settings").style.width = "280px";
}
function colaps_settings_close() {
  document.getElementById("colaps_settings").style.width = "0px";
}
//-------------------------Collapsable side panel from W3School(settings)
//-------------------------Collapsable side panel from W3School(other)
function colaps_other_open() {
  document.getElementById("colaps_other").style.width = "280px";
}
function colaps_other_close() {
  document.getElementById("colaps_other").style.width = "0px";
}
//-------------------------Collapsable side panel from W3School(other)


//-------------------------Textarea font size management
function textbox_font_bigger(){
	var newsize = document.getElementById("input").style.fontSize.slice(0, -2); //npx -> n
	newsize = (parseInt(newsize,10)+1).toString() + "px";                       //n -> n+1px
	//console.log(newsize);
	document.getElementById("input").style.fontSize = newsize;
	document.getElementById("curfontsize").innerHTML = newsize;
}
function textbox_font_smaller(){
	var newsize = document.getElementById("input").style.fontSize.slice(0, -2); //npx -> n
	if(parseInt(newsize,10) > 12){                                              //always >=12px
		newsize = (parseInt(newsize,10)-1).toString() + "px";                   //n -> n-1px
			//console.log(newsize);
		document.getElementById("input").style.fontSize = newsize;
		document.getElementById("curfontsize").innerHTML = newsize;
	}
}


function dragElement(elmnt) {	//-------Driver for draggable <div> from W3School
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}


//-------Cursor position tool related functions
function curpos_show_control() { //(from W3School)
	// Get the checkbox
	var checkBox = document.getElementById("show_curpos");
	var div = document.getElementById("curpos_display");
	var txt = document.getElementById("curpos_displaycontent");
	if(checkBox.checked == true){
		div.style.display = "block";
		if(_ezsetgrid == false && _setgrid == false){     //coordinate hasn't been set yet
			txt.innerHTML = "coordinate undefined!!!";
		}
		else if(_ezsetgrid == true || _setgrid == true){  //coordinate properly set
			print_curpos_enabled = true;
		}
	}
	else{
		print_curpos_enabled = false;
		div.style.display = "none";
		txt.innerHTML = "(X: 0.000, Y: 0.000)";
	}
}
function print_curpos(canvasQ, event) {
	if(print_curpos_enabled == true){
	    var rect = canvasQ.getBoundingClientRect();
		var x = event.clientX - rect.left;
		var y = event.clientY - rect.top;
		var actual_x = (x-_orig_x)/_grid_xhat;
		var actual_y = (_orig_y-y)/_grid_yhat;
		document.getElementById("curpos_displaycontent").innerHTML = "(X: "+actual_x.toFixed(3).toString()+", Y: "+actual_y.toFixed(3).toString()+")";	
	}
}


//-------------------------Special character inserter related functions
function insert_symbol(){
	window.open("symbol_list.html", "_blank",'height=300,width=400,status=yes,top=150,left=250,toolbar=no,menubar=no,location=no');
	
}
function typeInTextarea(newText, el = document.getElementById("input")) {
	el.focus();
	const [start, end] = [el.selectionStart, el.selectionEnd];
	el.setRangeText(newText, start, end, 'end');
}

//-------------------------Function inserter related functions
function insert_function(){
	window.open("function_list.html", "_blank",'height=300,width=400,status=yes,top=150,left=250,toolbar=no,menubar=no,location=no');
	
}

//-------------------------Command inserter related functions
function add_command(){
	window.open("add_command.html", "_blank",'height=450,width=800,status=yes,top=100,left=250,toolbar=no,menubar=no,location=no');
	
}

//-------------------------Input autocompleter related functions
function input_autocomplete(e){
	if(document.activeElement == document.getElementById("input")){
		if (e.key === '(') {
			el = el = document.getElementById("input");
			const [start, end] = [el.selectionStart, el.selectionEnd];    //This make the caret at the middle of the brackets, like this: "(|)"
			el.setRangeText(')', start, end, 'select');
			el.setRangeText('', start, end, 'end');
		}	
		else if (e.key === '[') {
			el = el = document.getElementById("input");
			const [start, end] = [el.selectionStart, el.selectionEnd];
			el.setRangeText(']', start, end, 'select');
			el.setRangeText('', start, end, 'end');
		}
		else if (e.key === '{') {
			el = el = document.getElementById("input");
			const [start, end] = [el.selectionStart, el.selectionEnd];
			el.setRangeText('}', start, end, 'select');
			el.setRangeText('', start, end, 'end');
		}
		else if (e.key === '\'') {
			el = el = document.getElementById("input");
			const [start, end] = [el.selectionStart, el.selectionEnd];
			el.setRangeText('\'', start, end, 'select');
			el.setRangeText('', start, end, 'end');
		}
		else if (e.key === '\"') {
			el = el = document.getElementById("input");
			const [start, end] = [el.selectionStart, el.selectionEnd];
			el.setRangeText('\"', start, end, 'select');
			el.setRangeText('', start, end, 'end');
		}
	}
}

//-------------------------Small calculator driver
function quick_calculator(){
	var out = 0;
	var input = document.getElementById("calc_input").value;
	var command = "out = "+input;
	eval(command);
	document.getElementById("calc_display").innerHTML = out.toFixed(6);
}


