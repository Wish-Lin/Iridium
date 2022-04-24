//functions with _ at the front of the name is a system function, same goes for variables
function _isnat(num){         // Check if input is natural number. [SYSTEM FUNC]
	if(num > 0 && Number.isInteger(num))
		return true;
	else
		return false;
}
function clear(){             //clear the canvas. [SYSTEM FUNC][USER FUNC]
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, canvas.width, canvas.height);
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
function dot_line_pp(x1,y1,x2,y2,linewidth,linecap,color,dash,space){//(real,real,real,real,real,string,string,real,real) Draw dotted line segment between two points [USER FUNC] 
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
function point(x,y,size,color){ //print dot on canvas ("real,real,real,"string") [USER FUNC]
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
function circle(x,y,radius,width,color,fill){ //Draw a hollow or filled circle (real,real,real,real,"string",bool) [USER FUNC]
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	if(fill == true){    //fill mode
		ctx.fillStyle = color;
		ctx.beginPath();
		ctx.arc(_real2pix_x(x),_real2pix_y(y),radius*_ezgrid_xhat, 0, 2 * Math.PI);
		ctx.fill();
	}
	else if(fill == false){
		ctx.strokeStyle = color;
		ctx.lineWidth = width;
		ctx.beginPath();
		ctx.arc(_real2pix_x(x),_real2pix_y(y),radius*_ezgrid_xhat, 0, 2 * Math.PI);
		ctx.stroke();
	}
}
function ez_init(xmax){ // Easy initializng for newbies (real)[USER FUNC][NEWBIE FUNC]
	if(xmax <= 10){
		clear();
		setcanvas(600,600,"white");
		ezsetgrid(xmax,3,"gray",1,1);
	}
	else if(xmax > 10 && xmax <= 50){
		clear();
		setcanvas(600+10*(xmax-10),600+10*(xmax-10),"white");
		ezsetgrid(xmax,5,"gray",1,1);
	}
	else if(xmax >= 50){
		clear();
		setcanvas(600+10*(xmax-5),600+10*(xmax-5),"white");
		ezsetgrid(xmax,5,"gray",1,1);
	}
}
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
		
		document.getElementById("Run").addEventListener("click", function(){ 
			program = document.getElementById("input").value;
			eval(program);
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