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
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	
	var start = parseFloat(document.getElementById("animt1_start").value);
	var end = parseFloat(document.getElementById("animt1_end").value);
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
			console.log(end);
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
	var start = parseFloat(document.getElementById("animt2_start").value);
	var end = parseFloat(document.getElementById("animt2_end").value);
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
	var start = parseFloat(document.getElementById("animt3_start").value);
	var end = parseFloat(document.getElementById("animt3_end").value);
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
	var start = parseFloat(document.getElementById("animt4_start").value);
	var end = parseFloat(document.getElementById("animt4_end").value);
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


function run_anim_cmd1(){
	var script = document.getElementById("anim_cmd1").value;
	eval(script);
}
function run_anim_cmd2(){
	var script = document.getElementById("anim_cmd2").value;
	eval(script);
}
function run_anim_cmd3(){
	var script = document.getElementById("anim_cmd3").value;
	eval(script);
}
function run_anim_cmd4(){
	var script = document.getElementById("anim_cmd4").value;
	eval(script);
}
function run_anim_cmd5(){
	var script = document.getElementById("anim_cmd5").value;
	eval(script);
}
function run_anim_cmd6(){
	var script = document.getElementById("anim_cmd6").value;
	eval(script);
}
function run_anim_cmd7(){
	var script = document.getElementById("anim_cmd7").value;
	eval(script);
}
function run_anim_cmd8(){
	var script = document.getElementById("anim_cmd8").value;
	eval(script);
}
function run_anim_cmd9(){
	var script = document.getElementById("anim_cmd9").value;
	eval(script);
}
function run_anim_cmd10(){
	var script = document.getElementById("anim_cmd10").value;
	eval(script);
}
function run_anim_cmd11(){
	var script = document.getElementById("anim_cmd11").value;
	eval(script);
}
function run_anim_cmd12(){
	var script = document.getElementById("anim_cmd12").value;
	eval(script);
}
function run_anim_cmd13(){
	var script = document.getElementById("anim_cmd13").value;
	eval(script);
}
function run_anim_cmd14(){
	var script = document.getElementById("anim_cmd14").value;
	eval(script);
}
function run_anim_cmd15(){
	var script = document.getElementById("anim_cmd15").value;
	eval(script);
}

function clearall_indivcommands() {
	x = confirm("Are you sure you want to clear all 15 commands?");
	if(x){
		document.getElementById("anim_cmd1").value = "";
		document.getElementById("anim_cmd2").value = "";
		document.getElementById("anim_cmd3").value = "";
		document.getElementById("anim_cmd4").value = "";
		document.getElementById("anim_cmd5").value = "";
		document.getElementById("anim_cmd6").value = "";
		document.getElementById("anim_cmd7").value = "";
		document.getElementById("anim_cmd8").value = "";
		document.getElementById("anim_cmd9").value = "";
		document.getElementById("anim_cmd10").value = "";
		document.getElementById("anim_cmd11").value = "";
		document.getElementById("anim_cmd12").value = "";
		document.getElementById("anim_cmd13").value = "";
		document.getElementById("anim_cmd14").value = "";
		document.getElementById("anim_cmd15").value = "";
		var tmp_note_list = document.getElementById("anim_indiv_commands").getElementsByClassName("note_labels");
		for(var i = 0;i<=14;i++)
			tmp_note_list[i].value = "";
	}
}
function clearall_indivcommandplots() {
		var template = document.getElementById("template").value;
		eval(template);
}