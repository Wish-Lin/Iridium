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
		var out = document.getElementById('canvas_cont').width/2 + _ezgrid_xhat*xcord;
		return out;
	}
	else if(_ezsetgrid == false && _setgrid == true){ //setgrid mode
		
	}
}
function _real2pix_y(ycord){  // translate calculation result to drawable pixel positions. Y coordinate only. [SYSTEM FUNC]
	if(_ezsetgrid == true && _setgrid == false){   //ezsetgrid mode
		var out = document.getElementById('canvas_cont').height/2 - _ezgrid_yhat*ycord;
		return out;
	}
	else if(_ezsetgrid == false && _setgrid == true){ //setgrid mode
		
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
	var origin_x = document.getElementById('canvas_cont').width / 2;
	var origin_y = document.getElementById('canvas_cont').height / 2;
	var ymax = xmax*document.getElementById('canvas_cont').height/document.getElementById('canvas_cont').width;
	_ezgrid_xhat = origin_x / xmax;
	_ezgrid_yhat = _ezgrid_xhat;
	_ezsetgrid = true;
	_setgrid = false;
	if(showaxis == true){
		var canvas = document.getElementById("myCanvas");
		var ctx = canvas.getContext("2d");
		ctx.strokeStyle = color;
		ctx.lineWidth = linewidth;
		ctx.beginPath();
		ctx.moveTo(0,origin_y);
		ctx.lineTo(2*origin_x,origin_y);       
		ctx.stroke();                          //draw x axis
		ctx.moveTo(origin_x,0);
		ctx.lineTo(origin_x,2*origin_y);    
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
function ez_circle(x,y,radius,width,color,fill){ //Draw a hollow or filled circle (real,real,real,real,"string",bool) [USER FUNC]
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	ctx.strokeStyle = color;
	ctx.fillStyle = color;
	ctx.lineWidth = width;
	ctx.beginPath();
	ctx.arc(_real2pix_x(x),_real2pix_y(y),radius*_ezgrid_xhat, 0, 2 * Math.PI);
	if(fill == false)
		ctx.stroke();
	else if(fill == true)
		ctx.fill();
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
		if(dash == null || space == null){  //solid line mode
			for(var i = 0;i<point_count;i++){            //#For some reason, drawing as one consecutive line results in bad resolution.
				ctx.beginPath();
				ctx.moveTo(_real2pix_x(x[i]),_real2pix_y(y[i]));
				ctx.lineTo(_real2pix_x(x[i+1]),_real2pix_y(y[i+1]));
				ctx.stroke();
				ctx.closePath();
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
			eval(func_y);                //generate x coord list (y[i] = fy(t[i]))
		}
		if(dash == null || space == null){  //solid line mode
			for(var i = 0;i<point_count;i++){     //#For some reason, drawing as one consecutive line results in bad resolution.
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
			console.log(cmd);
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
			console.log(cmd);
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


//------↓↓↓↓↓↓↓↓Mathematical constant and function declare zone↓↓↓↓↓↓↓↓-------------------
const PI = 3.1415926535;              //π
const E = 2.7182818284;               //Euler's number
const GOLD = 1.61803;       //Golden ratio
const SLIVER = 2.41421;     //Sliver ratio
const BRONZE = 3.30277;     //Bronze ratio
const GAMMA = 0.57721;       //Euler-Mascheroni constant
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









//------↑↑↑↑↑↑↑↑Mathematical constant and function declare zone↑↑↑↑↑↑↑↑-------------------
//------↓↓↓↓↓↓↓↓Global variable declare zone↓↓↓↓↓↓↓↓-------------------
var _ezsetgrid = false;
var _setgrid = false;
var _ezgrid_xhat = 1;   //xhat for ezgrid related processing only
var _ezgrid_yhat = 1;   //yhat for ezgrid related processing only
//------↑↑↑↑↑↑↑↑Global variable declare zone↑↑↑↑↑↑↑↑-------------------
window.onload = function(){
        var canvas = document.getElementById("myCanvas");
        var context = canvas.getContext("2d");	
		
		n =  new Date();
		y = n.getFullYear();
		m = n.getMonth() + 1;
		d = n.getDate();
		document.getElementById("date").innerHTML = y + "/" + m + "/" + d;      //Automatic display date
		document.getElementById("year").innerHTML = y;      //Automatic display year
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
//-------------------------Collapsable side panel from W3School(file)-------
function colaps_file_open() {
  document.getElementById("colaps_file").style.width = "250px";
}
function colaps_file_close() {
  document.getElementById("colaps_file").style.width = "0px";
}
//-------------------------Collapsable side panel from W3School(file)-------
//-------------------------Collapsable side panel from W3School(help)-------
function colaps_help_open() {
  document.getElementById("colaps_help").style.width = "200px";
}
function colaps_help_close() {
  document.getElementById("colaps_help").style.width = "0px";
}
//-------------------------Collapsable side panel from W3School(help)-------
//-------------------------Collapsable side panel from W3School(settings)-------
function colaps_settings_open() {
  document.getElementById("colaps_settings").style.width = "280px";
}
function colaps_settings_close() {
  document.getElementById("colaps_settings").style.width = "0px";
}
//-------------------------Collapsable side panel from W3School(settings)-------
//-------------------------Collapsable side panel from W3School(other)-------
function colaps_other_open() {
  document.getElementById("colaps_other").style.width = "280px";
}
function colaps_other_close() {
  document.getElementById("colaps_other").style.width = "0px";
}
//-------------------------Collapsable side panel from W3School(other)-------
//-------------------------Textarea font size management-------
function textbox_font_bigger(){
	var newsize = document.getElementById("input").style.fontSize.slice(0, -2); //npx -> n
	newsize = (parseInt(newsize,10)+1).toString() + "px";                       //n -> n+1px
	console.log(newsize);
	document.getElementById("input").style.fontSize = newsize;
	document.getElementById("curfontsize").innerHTML = newsize;
}
function textbox_font_smaller(){
	var newsize = document.getElementById("input").style.fontSize.slice(0, -2); //npx -> n
	if(parseInt(newsize,10) > 12){                                              //always >=12px
		newsize = (parseInt(newsize,10)-1).toString() + "px";                   //n -> n-1px
			console.log(newsize);
		document.getElementById("input").style.fontSize = newsize;
		document.getElementById("curfontsize").innerHTML = newsize;
	}
}
//-------------------------Textarea font size management-------
//-------------------------Autofill----------------------------
function autofill(){
	var input = document.getElementById("autofill_inp").value;
	//-----Brute force start------------------------------
	if(input == "clear")
		document.getElementById("input").value += "clear();";
	else if(input == "line_pp")
		document.getElementById("input").value += "line_pp(x1,y1,x2,y2,linewidth,linecap,color);";
	else if(input == "dotline_pp")
		document.getElementById("input").value += "dotline_pp(x1,y1,x2,y2,linewidth,linecap,color,dash,space);";
	else if(input == "setcanvas")
		document.getElementById("input").value += "setcanvas(width,height,color);";
	else if(input == "ezsetgrid")
		document.getElementById("input").value += "ezsetgrid(xmax,linewidth,color,showtick,showaxis);";
	else if(input == "label")
		document.getElementById("input").value += "label(value,x,y,color,font);";
	else if(input == "point")
		document.getElementById("input").value += "point(x,y,size,color);";
	else if(input == "ez_circle")
		document.getElementById("input").value += "ez_circle(x,y,radius,width,color,fill);";
	else if(input == "auto_init")
		document.getElementById("input").value += "auto_init(xmax);";
	else if(input == "downloadcanvas")
		document.getElementById("input").value += "downloadcanvas(filename);";
	else if(input == "ezplot")
		document.getElementById("input").value += "ezplot(func,start,end,width,color,increment,dash,space);";
	else if(input == "ezplot_polar")
		document.getElementById("input").value += "ezplot_polar(func,start,end,width,color,increment,dash,space);";
	else if(input == "ezplot_param")
		document.getElementById("input").value += "ezplot_param(func_x,func_y,start,end,width,color,increment,dash,space);";
	else if(input == "rectangle")
		document.getElementById("input").value += "rectangle(x,y,width,height,linewidth,color,fill);";
	else if(input == "triangle")
		document.getElementById("input").value += "triangle(x1,y1,x2,y2,x3,y3,linewidth,color,fill);";
	else if(input == "transparency")
		document.getElementById("input").value += "transparency(percentage);";
	else if(input == "foh_ode_euler")
		document.getElementById("input").value += "foh_ode_euler(p_x,q_x,x0,y0,start,end,increment,width,color);";
	else
		alert("Insert error: not a supported function");
}
//-------------------------Autofill----------------------------