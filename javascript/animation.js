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

var cmd_exe_control = new Array(15); //boolean array to store checkbox stats, initialized on window.onload()


function set_animt1(){
	document.getElementById("animt1_label").disabled = false;  //enable the commands
	document.getElementById("run_animt1").disabled = false;
	document.getElementById("reset_animt1").disabled = false;
	var start = parseFloat(document.getElementById("animt1_start").value);
	var end = parseFloat(document.getElementById("animt1_end").value);
	var increment_count = parseInt(document.getElementById("animt1_increment_count").value);
	var fps = parseInt(document.getElementById("animt1_fps").value);
	var framecount = increment_count+1;
	var totaltime = framecount/fps;
	document.getElementById("animt1_framecount").innerHTML = framecount.toString();
	document.getElementById("animt1_totaltime").innerHTML = totaltime.toFixed(4).toString();
	ANIM_T1 = start;
	_system_display("Animation Timeline 1 initialized:  [start,end,steps,fps] = ["+start+','+end+','+increment_count+','+fps+']',"green");
}
function run_animt1(){
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	
	var start = parseFloat(document.getElementById("animt1_start").value);
	var end = parseFloat(document.getElementById("animt1_end").value);
	var increment_count = parseInt(document.getElementById("animt1_increment_count").value);
	var fps = parseInt(document.getElementById("animt1_fps").value);
	var script = document.getElementById("template").value + document.getElementById("input").value;
	var step = (end-start)/increment_count;

	var id = null;
	clearInterval(id);
	
	ANIM_T1 = start;
	var i = 0
	id = setInterval(frame,1000/fps);
	function frame(){
		if(i > increment_count){ //equivalent of "i == increment_count+1"
			clearInterval(id);
			ANIM_T1-=step;  //unwanted last add
		}
		else{
			i++;
			eval(script);
			_system_display("Running Animation Timeline 1:  ["+start.toFixed(3)+' | '+ANIM_T1.toFixed(3)+' | '+end.toFixed(3)+']',"green");
			ANIM_T1+=step;
		}
	}
}
function reset_animt1(){
	var start = parseFloat(document.getElementById("animt1_start").value);
	ANIM_T1 = start;
	_system_display("ANIM_T1 successfully reset","green"); //this message stays on there if nothing bad happens
	var script = document.getElementById("template").value + document.getElementById("input").value;
	eval(script);
}
function set_animt2(){
	document.getElementById("animt2_label").disabled = false;  //enable the commands
	document.getElementById("run_animt2").disabled = false;
	document.getElementById("reset_animt2").disabled = false;
	var start = parseFloat(document.getElementById("animt2_start").value);
	var end = parseFloat(document.getElementById("animt2_end").value);
	var increment_count = parseInt(document.getElementById("animt2_increment_count").value);
	var fps = parseInt(document.getElementById("animt2_fps").value);
	var framecount = increment_count+1;
	var totaltime = framecount/fps;
	document.getElementById("animt2_framecount").innerHTML = framecount.toString();
	document.getElementById("animt2_totaltime").innerHTML = totaltime.toFixed(4).toString();
	ANIM_T2 = start;
	_system_display("Animation Timeline 2 initialized:  [start,end,steps,fps] = ["+start+','+end+','+increment_count+','+fps+']',"green");
}
function run_animt2(){
	var start = parseFloat(document.getElementById("animt2_start").value);
	var end = parseFloat(document.getElementById("animt2_end").value);
	var increment_count = parseInt(document.getElementById("animt2_increment_count").value);
	var fps = parseInt(document.getElementById("animt2_fps").value);
	var script = document.getElementById("template").value + document.getElementById("input").value;
	var step = (end-start)/increment_count;

	var id = null;
	clearInterval(id);
	
	ANIM_T2 = start;
	var i = 0
	id = setInterval(frame,1000/fps);
	function frame(){
		if(i > increment_count){
			clearInterval(id);
			ANIM_T2-=step;  //unwanted last add
		}
		else{
			i++;
			eval(script);
			_system_display("Running Animation Timeline 2:  ["+start.toFixed(3)+' | '+ANIM_T2.toFixed(3)+' | '+end.toFixed(3)+']',"green");
			ANIM_T2+=step;
		}
	}
}
function reset_animt2(){
	var start = parseFloat(document.getElementById("animt2_start").value);
	ANIM_T2 = start;
	_system_display("ANIM_T2 successfully reset","green"); //this message stays on there if nothing bad happens
	var script = document.getElementById("template").value + document.getElementById("input").value;
	eval(script);
}
function set_animt3(){
	document.getElementById("animt3_label").disabled = false;  //enable the commands
	document.getElementById("run_animt3").disabled = false;
	document.getElementById("reset_animt3").disabled = false;
	var start = parseFloat(document.getElementById("animt3_start").value);
	var end = parseFloat(document.getElementById("animt3_end").value);
	var increment_count = parseInt(document.getElementById("animt3_increment_count").value);
	var fps = parseInt(document.getElementById("animt3_fps").value);
	var framecount = increment_count+1;
	var totaltime = framecount/fps;
	document.getElementById("animt3_framecount").innerHTML = framecount.toString();
	document.getElementById("animt3_totaltime").innerHTML = totaltime.toFixed(4).toString();
	ANIM_T3 = start;
	_system_display("Animation Timeline 3 initialized:  [start,end,steps,fps] = ["+start+','+end+','+increment_count+','+fps+']',"green");
}
function run_animt3(){
	var start = parseFloat(document.getElementById("animt3_start").value);
	var end = parseFloat(document.getElementById("animt3_end").value);
	var increment_count = parseInt(document.getElementById("animt3_increment_count").value);
	var fps = parseInt(document.getElementById("animt3_fps").value);
	var script = document.getElementById("template").value + document.getElementById("input").value;
	var step = (end-start)/increment_count;

	var id = null;
	clearInterval(id);
	
	ANIM_T3 = start;
	var i = 0
	id = setInterval(frame,1000/fps);
	function frame(){
		if(i > increment_count){
			clearInterval(id);
			ANIM_T3-=step;  //unwanted last add
		}
		else{
			i++;
			eval(script);
			_system_display("Running Animation Timeline 3:  ["+start.toFixed(3)+' | '+ANIM_T3.toFixed(3)+' | '+end.toFixed(3)+']',"green");
			ANIM_T3+=step;
		}
	}
}
function reset_animt3(){
	var start = parseFloat(document.getElementById("animt3_start").value);
	ANIM_T3 = start;
	_system_display("ANIM_T3 successfully reset","green"); //this message stays on there if nothing bad happens
	var script = document.getElementById("template").value + document.getElementById("input").value;
	eval(script);
}
function set_animt4(){
	document.getElementById("animt4_label").disabled = false;  //enable the commands
	document.getElementById("run_animt4").disabled = false;
	document.getElementById("reset_animt4").disabled = false;
	var start = parseFloat(document.getElementById("animt4_start").value);
	var end = parseFloat(document.getElementById("animt4_end").value);
	var increment_count = parseInt(document.getElementById("animt4_increment_count").value);
	var fps = parseInt(document.getElementById("animt4_fps").value);
	var framecount = increment_count+1;
	var totaltime = framecount/fps;
	document.getElementById("animt4_framecount").innerHTML = framecount.toString();
	document.getElementById("animt4_totaltime").innerHTML = totaltime.toFixed(4).toString();
	ANIM_T4 = start;
	_system_display("Animation Timeline 4 initialized:  [start,end,steps,fps] = ["+start+','+end+','+increment_count+','+fps+']',"green");
}
function run_animt4(){
	var start = parseFloat(document.getElementById("animt4_start").value);
	var end = parseFloat(document.getElementById("animt4_end").value);
	var increment_count = parseInt(document.getElementById("animt4_increment_count").value);
	var fps = parseInt(document.getElementById("animt4_fps").value);
	var script = document.getElementById("template").value + document.getElementById("input").value;
	var step = (end-start)/increment_count;

	var id = null;
	clearInterval(id);
	
	ANIM_T4 = start;
	var i = 0
	id = setInterval(frame,1000/fps);
	function frame(){
		if(i > increment_count){
			clearInterval(id);
			ANIM_T4-=step;  //unwanted last add
		}
		else{
			i++;
			eval(script);
			_system_display("Running Animation Timeline 4:  ["+start.toFixed(3)+' | '+ANIM_T4.toFixed(3)+' | '+end.toFixed(3)+']',"green");
			ANIM_T4+=step;
		}
	}
}
function reset_animt4(){
	var start = parseFloat(document.getElementById("animt4_start").value);
	ANIM_T4 = start;
	_system_display("ANIM_T4 successfully reset","green"); //this message stays on there if nothing bad happens
	var script = document.getElementById("template").value + document.getElementById("input").value;
	eval(script);
}
function set_animt5(){
	document.getElementById("animt5_label").disabled = false;  //enable the commands
	document.getElementById("run_animt5").disabled = false;
	document.getElementById("reset_animt5").disabled = false;
	var start = parseFloat(document.getElementById("animt5_start").value);
	var end = parseFloat(document.getElementById("animt5_end").value);
	var increment_count = parseInt(document.getElementById("animt5_increment_count").value);
	var fps = parseInt(document.getElementById("animt5_fps").value);
	var framecount = increment_count+1;
	var totaltime = framecount/fps;
	document.getElementById("animt5_framecount").innerHTML = framecount.toString();
	document.getElementById("animt5_totaltime").innerHTML = totaltime.toFixed(4).toString();
	ANIM_T5 = start;
	_system_display("Animation Timeline 5 initialized:  [start,end,steps,fps] = ["+start+','+end+','+increment_count+','+fps+']',"green");
}
function run_animt5(){
	var start = parseFloat(document.getElementById("animt5_start").value);
	var end = parseFloat(document.getElementById("animt5_end").value);
	var increment_count = parseInt(document.getElementById("animt5_increment_count").value);
	var fps = parseInt(document.getElementById("animt5_fps").value);
	var script = document.getElementById("template").value + document.getElementById("input").value;
	var step = (end-start)/increment_count;

	var id = null;
	clearInterval(id);
	
	ANIM_T5 = start;
	var i = 0
	id = setInterval(frame,1000/fps);
	function frame(){
		if(i > increment_count){
			clearInterval(id);
			ANIM_T5-=step;  //unwanted last add
		}
		else{
			i++;
			eval(script);
			_system_display("Running Animation Timeline 5:  ["+start.toFixed(3)+' | '+ANIM_T5.toFixed(3)+' | '+end.toFixed(3)+']',"green");
			ANIM_T5+=step;
		}
	}
}
function reset_animt5(){
	var start = parseFloat(document.getElementById("animt5_start").value);
	ANIM_T5 = start;
	_system_display("ANIM_T5 successfully reset","green"); //this message stays on there if nothing bad happens
	var script = document.getElementById("template").value + document.getElementById("input").value;
	eval(script);
}
function set_animt6(){
	document.getElementById("animt6_label").disabled = false;  //enable the commands
	document.getElementById("run_animt6").disabled = false;
	document.getElementById("reset_animt6").disabled = false;
	var start = parseFloat(document.getElementById("animt6_start").value);
	var end = parseFloat(document.getElementById("animt6_end").value);
	var increment_count = parseInt(document.getElementById("animt6_increment_count").value);
	var fps = parseInt(document.getElementById("animt6_fps").value);
	var framecount = increment_count+1;
	var totaltime = framecount/fps;
	document.getElementById("animt6_framecount").innerHTML = framecount.toString();
	document.getElementById("animt6_totaltime").innerHTML = totaltime.toFixed(4).toString();
	ANIM_T6 = start;
	_system_display("Animation Timeline 6 initialized:  [start,end,steps,fps] = ["+start+','+end+','+increment_count+','+fps+']',"green");
}
function run_animt6(){
	var start = parseFloat(document.getElementById("animt6_start").value);
	var end = parseFloat(document.getElementById("animt6_end").value);
	var increment_count = parseInt(document.getElementById("animt6_increment_count").value);
	var fps = parseInt(document.getElementById("animt6_fps").value);
	var script = document.getElementById("template").value + document.getElementById("input").value;
	var step = (end-start)/increment_count;

	var id = null;
	clearInterval(id);
	
	ANIM_T6 = start;
	var i = 0
	id = setInterval(frame,1000/fps);
	function frame(){
		if(i > increment_count){
			clearInterval(id);
			ANIM_T6-=step;  //unwanted last add
		}
		else{
			i++;
			eval(script);
			_system_display("Running Animation Timeline 6:  ["+start.toFixed(3)+' | '+ANIM_T6.toFixed(3)+' | '+end.toFixed(3)+']',"green");
			ANIM_T6+=step;
		}
	}
}
function reset_animt6(){
	var start = parseFloat(document.getElementById("animt6_start").value);
	ANIM_T6 = start;
	_system_display("ANIM_T6 successfully reset","green"); //this message stays on there if nothing bad happens
	var script = document.getElementById("template").value + document.getElementById("input").value;
	eval(script);
}
function set_animt7(){
	document.getElementById("animt7_label").disabled = false;  //enable the commands
	document.getElementById("run_animt7").disabled = false;
	document.getElementById("reset_animt7").disabled = false;
	var start = parseFloat(document.getElementById("animt7_start").value);
	var end = parseFloat(document.getElementById("animt7_end").value);
	var increment_count = parseInt(document.getElementById("animt7_increment_count").value);
	var fps = parseInt(document.getElementById("animt7_fps").value);
	var framecount = increment_count+1;
	var totaltime = framecount/fps;
	document.getElementById("animt7_framecount").innerHTML = framecount.toString();
	document.getElementById("animt7_totaltime").innerHTML = totaltime.toFixed(4).toString();
	ANIM_T7 = start;
	_system_display("Animation Timeline 7 initialized:  [start,end,steps,fps] = ["+start+','+end+','+increment_count+','+fps+']',"green");
}
function run_animt7(){
	var start = parseFloat(document.getElementById("animt7_start").value);
	var end = parseFloat(document.getElementById("animt7_end").value);
	var increment_count = parseInt(document.getElementById("animt7_increment_count").value);
	var fps = parseInt(document.getElementById("animt7_fps").value);
	var script = document.getElementById("template").value + document.getElementById("input").value;
	var step = (end-start)/increment_count;

	var id = null;
	clearInterval(id);
	
	ANIM_T7 = start;
	var i = 0
	id = setInterval(frame,1000/fps);
	function frame(){
		if(i > increment_count){
			clearInterval(id);
			ANIM_T7-=step;  //unwanted last add
		}
		else{
			i++;
			eval(script);
			_system_display("Running Animation Timeline 7:  ["+start.toFixed(3)+' | '+ANIM_T7.toFixed(3)+' | '+end.toFixed(3)+']',"green");
			ANIM_T7+=step;
		}
	}
}
function reset_animt7(){
	var start = parseFloat(document.getElementById("animt7_start").value);
	ANIM_T7 = start;
	_system_display("ANIM_T7 successfully reset","green"); //this message stays on there if nothing bad happens
	var script = document.getElementById("template").value + document.getElementById("input").value;
	eval(script);
}
function set_animt8(){
	document.getElementById("animt8_label").disabled = false;  //enable the commands
	document.getElementById("run_animt8").disabled = false;
	document.getElementById("reset_animt8").disabled = false;
	var start = parseFloat(document.getElementById("animt8_start").value);
	var end = parseFloat(document.getElementById("animt8_end").value);
	var increment_count = parseInt(document.getElementById("animt8_increment_count").value);
	var fps = parseInt(document.getElementById("animt8_fps").value);
	var framecount = increment_count+1;
	var totaltime = framecount/fps;
	document.getElementById("animt8_framecount").innerHTML = framecount.toString();
	document.getElementById("animt8_totaltime").innerHTML = totaltime.toFixed(4).toString();
	ANIM_T8 = start;
	_system_display("Animation Timeline 8 initialized:  [start,end,steps,fps] = ["+start+','+end+','+increment_count+','+fps+']',"green");
}
function run_animt8(){
	var start = parseFloat(document.getElementById("animt8_start").value);
	var end = parseFloat(document.getElementById("animt8_end").value);
	var increment_count = parseInt(document.getElementById("animt8_increment_count").value);
	var fps = parseInt(document.getElementById("animt8_fps").value);
	var script = document.getElementById("template").value + document.getElementById("input").value;
	var step = (end-start)/increment_count;

	var id = null;
	clearInterval(id);
	
	ANIM_T8 = start;
	var i = 0
	id = setInterval(frame,1000/fps);
	function frame(){
		if(i > increment_count){
			clearInterval(id);
			ANIM_T8-=step;  //unwanted last add
		}
		else{
			i++;
			eval(script);
			_system_display("Running Animation Timeline 8:  ["+start.toFixed(3)+' | '+ANIM_T8.toFixed(3)+' | '+end.toFixed(3)+']',"green");
			ANIM_T8+=step;
		}
	}
}
function reset_animt8(){
	var start = parseFloat(document.getElementById("animt8_start").value);
	ANIM_T8 = start;
	_system_display("ANIM_T8 successfully reset","green"); //this message stays on there if nothing bad happens
	var script = document.getElementById("template").value + document.getElementById("input").value;
	eval(script);
}
function set_animt9(){
	document.getElementById("animt9_label").disabled = false;  //enable the commands
	document.getElementById("run_animt9").disabled = false;
	document.getElementById("reset_animt9").disabled = false;
	var start = parseFloat(document.getElementById("animt9_start").value);
	var end = parseFloat(document.getElementById("animt9_end").value);
	var increment_count = parseInt(document.getElementById("animt9_increment_count").value);
	var fps = parseInt(document.getElementById("animt9_fps").value);
	var framecount = increment_count+1;
	var totaltime = framecount/fps;
	document.getElementById("animt9_framecount").innerHTML = framecount.toString();
	document.getElementById("animt9_totaltime").innerHTML = totaltime.toFixed(4).toString();
	ANIM_T9 = start;
	_system_display("Animation Timeline 9 initialized:  [start,end,steps,fps] = ["+start+','+end+','+increment_count+','+fps+']',"green");
}
function run_animt9(){
	var start = parseFloat(document.getElementById("animt9_start").value);
	var end = parseFloat(document.getElementById("animt9_end").value);
	var increment_count = parseInt(document.getElementById("animt9_increment_count").value);
	var fps = parseInt(document.getElementById("animt9_fps").value);
	var script = document.getElementById("template").value + document.getElementById("input").value;
	var step = (end-start)/increment_count;

	var id = null;
	clearInterval(id);
	
	ANIM_T9 = start;
	var i = 0
	id = setInterval(frame,1000/fps);
	function frame(){
		if(i > increment_count){
			clearInterval(id);
			ANIM_T9-=step;  //unwanted last add
		}
		else{
			i++;
			eval(script);
			_system_display("Running Animation Timeline 9:  ["+start.toFixed(3)+' | '+ANIM_T9.toFixed(3)+' | '+end.toFixed(3)+']',"green");
			ANIM_T9+=step;
		}
	}
}
function reset_animt9(){
	var start = parseFloat(document.getElementById("animt9_start").value);
	ANIM_T9 = start;
	_system_display("ANIM_T9 successfully reset","green"); //this message stays on there if nothing bad happens
	var script = document.getElementById("template").value + document.getElementById("input").value;
	eval(script);
}
function set_animt10(){
	document.getElementById("animt10_label").disabled = false;  //enable the commands
	document.getElementById("run_animt10").disabled = false;
	document.getElementById("reset_animt10").disabled = false;
	var start = parseFloat(document.getElementById("animt10_start").value);
	var end = parseFloat(document.getElementById("animt10_end").value);
	var increment_count = parseInt(document.getElementById("animt10_increment_count").value);
	var fps = parseInt(document.getElementById("animt10_fps").value);
	var framecount = increment_count+1;
	var totaltime = framecount/fps;
	document.getElementById("animt10_framecount").innerHTML = framecount.toString();
	document.getElementById("animt10_totaltime").innerHTML = totaltime.toFixed(4).toString();
	ANIM_T10 = start;
	_system_display("Animation Timeline 10 initialized:  [start,end,steps,fps] = ["+start+','+end+','+increment_count+','+fps+']',"green");
}
function run_animt10(){
	var start = parseFloat(document.getElementById("animt10_start").value);
	var end = parseFloat(document.getElementById("animt10_end").value);
	var increment_count = parseInt(document.getElementById("animt10_increment_count").value);
	var fps = parseInt(document.getElementById("animt10_fps").value);
	var script = document.getElementById("template").value + document.getElementById("input").value;
	var step = (end-start)/increment_count;

	var id = null;
	clearInterval(id);
	
	ANIM_T10 = start;
	var i = 0
	id = setInterval(frame,1000/fps);
	function frame(){
		if(i > increment_count){
			clearInterval(id);
			ANIM_T10-=step;  //unwanted last add
		}
		else{
			i++;
			eval(script);
			_system_display("Running Animation Timeline 10:  ["+start.toFixed(3)+' | '+ANIM_T10.toFixed(3)+' | '+end.toFixed(3)+']',"green");
			ANIM_T10+=step;
		}
	}
}
function reset_animt10(){
	var start = parseFloat(document.getElementById("animt10_start").value);
	ANIM_T10 = start;
	_system_display("ANIM_T10 successfully reset","green"); //this message stays on there if nothing bad happens
	var script = document.getElementById("template").value + document.getElementById("input").value;
	eval(script);
}

function run_all_indiv_command(){
	eval(document.getElementById("template").value);  //run the blank template again(clear all previous stuff)
	eval(document.getElementById("input").value);     //run script as well
	var tmpstring = "";
	_system_display("All 15 individual commands successfully executed","blue");  //this message stays on there if nothing bad happens
	for(var i = 0;i<=14;i++){
		if(cmd_exe_control[i] == true){  //if the checkbox is checked
			tmpstring = "anim_cmd"+(i+1).toString();  //then execute that command
			eval(document.getElementById(tmpstring).value);
		}
	}
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