

function returnData(selected) {
	window.opener.postMessage(["Iridium","command",selected],'*'); //Send back an array [a,b,c] to EVERY WINDOW. My not so good way of verifying sender and type of data, whiling remaning offline testability is by using an array and checking it in "gui_driver.js".
}

function ezplot_insert(){
	var a = document.getElementById("ezplot1").value;
	var b = document.getElementById("ezplot2").value;
	var c = document.getElementById("ezplot3").value;
	var d = document.getElementById("ezplot4").value;
	var e = document.getElementById("ezplot5").value;
	var f = document.getElementById("ezplot6").value;
	var g = document.getElementById("ezplot7").value;
	var h = document.getElementById("ezplot8").value;
	var cmd = "ezplot(\"y = "+a+"\","+b+","+c+","+d+",\""+e+"\","+f;
	if(g == '0' || h == '0'){
		cmd = cmd+");\n";
		return cmd;		
	}
	else{
		cmd = cmd+","+g+","+h+");\n";
		return cmd;		
	}
}
//ezplot("y = sin(x)*x",-10,10,1,"red",0.1,1,2);

function ezplot_polar_insert(){
	var a = document.getElementById("ezplot_polar1").value;
	var b = document.getElementById("ezplot_polar2").value;
	var c = document.getElementById("ezplot_polar3").value;
	var d = document.getElementById("ezplot_polar4").value;
	var e = document.getElementById("ezplot_polar5").value;
	var f = document.getElementById("ezplot_polar6").value;
	var g = document.getElementById("ezplot_polar7").value;
	var h = document.getElementById("ezplot_polar8").value;
	var cmd = "ezplot_polar(\"r = "+a+"\","+b+","+c+","+d+",\""+e+"\","+f;
	if(g == '0' || h == '0'){
		cmd = cmd+");\n";
		return cmd;		
	}
	else{
		cmd = cmd+","+g+","+h+");\n";
		return cmd;		
	}
}
//ezplot_polar("r = 1+2*sin(t)",0,2*PI,1,"red",PI/180);

function line_pp_insert(){
	var a = document.getElementById("line_pp1").value;
	var b = document.getElementById("line_pp2").value;
	var c = document.getElementById("line_pp3").value;
	var d = document.getElementById("line_pp4").value;
	var e = document.getElementById("line_pp5").value;
	var f = document.getElementById("line_pp6").value;
	var g = document.getElementById("line_pp7").value;
	var cmd = "line_pp("+a+","+b+","+c+","+d+","+e+",\""+f+"\",\""+g+"\");\n"
	return cmd;		
}
//line_pp(-3,-4,5,7,1,"round","#ff0000");