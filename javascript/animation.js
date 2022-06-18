var ANIM_T1 = 0;             //animation timeline 1
var ANIM_T2 = 0;             //animation timeline 2
var ANIM_T3 = 0;             //animation timeline 3
var ANIM_T4 = 0;             //animation timeline 4
var ANIM_T5 = 0;             //animation timeline 5
var ANIM_T6 = 0;             //animation timeline 6
var ANIM_T7 = 0;             //animation timeline 7
var ANIM_T8 = 0;             //animation timeline 8
var ANIM_T9 = 0;             //animation timeline 9
var ANIM_T10 = 0;            //animation timeline 10

function set_animt1(){
	var start = parseInt(document.getElementById("animt1_start").value);
	var end = parseInt(document.getElementById("animt1_end").value);
	var increment_count = parseInt(document.getElementById("animt1_increment_count").value);
	var fps = parseInt(document.getElementById("animt1_fps").value);
	var framecount = increment_count+1;
	var totaltime = framecount/fps;
	document.getElementById("animt1_framecount").innerHTML = framecount.toString();
	document.getElementById("animt1_totaltime").innerHTML = totaltime.toFixed(4).toString();
	ANIM_T1 = start;
}
function run_animt1(){
	var start = parseInt(document.getElementById("animt1_start").value);
	var end = parseInt(document.getElementById("animt1_end").value);
	var increment_count = parseInt(document.getElementById("animt1_increment_count").value);
	var fps = parseInt(document.getElementById("animt1_fps").value);
	var framecount = increment_count+1;
	var totaltime = framecount/fps;
	var script = document.getElementById("template").value + document.getElementById("input").value;
	var step = (end-start)/increment_count;

	var id = null;
	clearInterval(id);
	
	ANIM_T1 = start;
	var i = 0
	id = setInterval(frame,1000/fps);
	function frame(){
		if(i == increment_count){
			clearInterval(id);
		}
		else{
			ANIM_T1+=step;
			i++;
			eval(script);
		}
	}
}
function set_animt2(){
	var start = parseInt(document.getElementById("animt2_start").value);
	var end = parseInt(document.getElementById("animt2_end").value);
	var increment_count = parseInt(document.getElementById("animt2_increment_count").value);
	var fps = parseInt(document.getElementById("animt2_fps").value);
	var framecount = increment_count+1;
	var totaltime = framecount/fps;
	document.getElementById("animt2_framecount").innerHTML = framecount.toString();
	document.getElementById("animt2_totaltime").innerHTML = totaltime.toFixed(4).toString();
	ANIM_T2 = start;
}
function run_animt2(){
	var start = parseInt(document.getElementById("animt2_start").value);
	var end = parseInt(document.getElementById("animt2_end").value);
	var increment_count = parseInt(document.getElementById("animt2_increment_count").value);
	var fps = parseInt(document.getElementById("animt2_fps").value);
	var framecount = increment_count+1;
	var totaltime = framecount/fps;
	var script = document.getElementById("template").value + document.getElementById("input").value;
	var step = (end-start)/increment_count;

	var id = null;
	clearInterval(id);
	
	ANIM_T2 = start;
	var i = 0
	id = setInterval(frame,1000/fps);
	function frame(){
		if(i == increment_count){
			clearInterval(id);
		}
		else{
			ANIM_T2+=step;
			i++;
			eval(script);
		}
	}
}
function set_animt3(){
	var start = parseInt(document.getElementById("animt3_start").value);
	var end = parseInt(document.getElementById("animt3_end").value);
	var increment_count = parseInt(document.getElementById("animt3_increment_count").value);
	var fps = parseInt(document.getElementById("animt3_fps").value);
	var framecount = increment_count+1;
	var totaltime = framecount/fps;
	document.getElementById("animt3_framecount").innerHTML = framecount.toString();
	document.getElementById("animt3_totaltime").innerHTML = totaltime.toFixed(4).toString();
	ANIM_T3 = start;
}
function run_animt3(){
	var start = parseInt(document.getElementById("animt3_start").value);
	var end = parseInt(document.getElementById("animt3_end").value);
	var increment_count = parseInt(document.getElementById("animt3_increment_count").value);
	var fps = parseInt(document.getElementById("animt3_fps").value);
	var framecount = increment_count+1;
	var totaltime = framecount/fps;
	var script = document.getElementById("template").value + document.getElementById("input").value;
	var step = (end-start)/increment_count;

	var id = null;
	clearInterval(id);
	
	ANIM_T3 = start;
	var i = 0
	id = setInterval(frame,1000/fps);
	function frame(){
		if(i == increment_count){
			clearInterval(id);
		}
		else{
			ANIM_T3+=step;
			i++;
			eval(script);
		}
	}
}
function set_animt4(){
	var start = parseInt(document.getElementById("animt4_start").value);
	var end = parseInt(document.getElementById("animt4_end").value);
	var increment_count = parseInt(document.getElementById("animt4_increment_count").value);
	var fps = parseInt(document.getElementById("animt4_fps").value);
	var framecount = increment_count+1;
	var totaltime = framecount/fps;
	document.getElementById("animt4_framecount").innerHTML = framecount.toString();
	document.getElementById("animt4_totaltime").innerHTML = totaltime.toFixed(4).toString();
	ANIM_T4 = start;
}
function run_animt4(){
	var start = parseInt(document.getElementById("animt4_start").value);
	var end = parseInt(document.getElementById("animt4_end").value);
	var increment_count = parseInt(document.getElementById("animt4_increment_count").value);
	var fps = parseInt(document.getElementById("animt4_fps").value);
	var framecount = increment_count+1;
	var totaltime = framecount/fps;
	var script = document.getElementById("template").value + document.getElementById("input").value;
	var step = (end-start)/increment_count;

	var id = null;
	clearInterval(id);
	
	ANIM_T4 = start;
	var i = 0
	id = setInterval(frame,1000/fps);
	function frame(){
		if(i == increment_count){
			clearInterval(id);
		}
		else{
			ANIM_T4+=step;
			i++;
			eval(script);
		}
	}
}