function set_animt0(){
	var start = parseInt(document.getElementById("animt0_start").value);
	var end = parseInt(document.getElementById("animt0_end").value);
	var increment_count = parseInt(document.getElementById("animt0_increment_count").value);
	var fps = parseInt(document.getElementById("animt0_fps").value);
	var framecount = increment_count+1;
	var totaltime = framecount/fps;
	document.getElementById("animt0_framecount").innerHTML = framecount.toString();
	document.getElementById("animt0_totaltime").innerHTML = totaltime.toFixed(4).toString();
}
function run_animt0(){
	var start = parseInt(document.getElementById("animt0_start").value);
	var end = parseInt(document.getElementById("animt0_end").value);
	var increment_count = parseInt(document.getElementById("animt0_increment_count").value);
	var fps = parseInt(document.getElementById("animt0_fps").value);
	var framecount = increment_count+1;
	var totaltime = framecount/fps;
	var script = document.getElementById("template").value + document.getElementById("input").value;
	var step = (end-start)/increment_count;
	
	
	var id = null;
	clearInterval(id);
	
	ANIM_T0 = start;
	var i = 0
	
	id = setInterval(frame,1000/fps);
	
	function frame(){
		if(i == increment_count){
			clearInterval(id);
		}
		else{
			ANIM_T0+=step;
			i++;
			eval(script);
		}
	}
}