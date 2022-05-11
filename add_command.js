function returnData(selected) {
	var main_page = window.opener;
	main_page.typeInTextarea(selected);
	window.close();
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
		cmd = cmd+");";
		return cmd;		
	}
	else{
		cmd = cmd+","+g+","+h+");";
		return cmd;		
	}
}
//ezplot(“y = sin(x)*x”,-10,10,1,“red”,0.1,1,2);