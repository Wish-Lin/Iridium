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
	document.getElementById("template").style.fontSize = newsize;
	document.getElementById("input").style.fontSize = newsize;
	document.getElementById("curfontsize").innerHTML = newsize;
}
function textbox_font_smaller(){
	var newsize = document.getElementById("input").style.fontSize.slice(0, -2); //npx -> n
	if(parseInt(newsize,10) > 12){                                              //always >=12px
		newsize = (parseInt(newsize,10)-1).toString() + "px";                   //n -> n-1px
		//console.log(newsize);
		document.getElementById("template").style.fontSize = newsize;
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


//-------Cursor Position Tool related functions
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


//-------Public Display related functions
function public_show_control() { //(from W3School)
	// Get the checkbox
	var checkBox = document.getElementById("show_public");
	var div = document.getElementById("public_display");
	var txt = document.getElementById("public_displaycontent");
	if(checkBox.checked == true){
		div.style.display = "block";
		print_public_enabled = true;
	}
	else{
		print_public_enabled = false;
		div.style.display = "none";
	}
}


//-------------------------Special character inserter related functions
function insert_symbol(){
	window.open("subwindows/symbol_list.html", "_blank",'height=300,width=400,status=yes,top=150,left=250,toolbar=no,menubar=no,location=no');
}
function typeInTextarea(newText, el = document.getElementById("input")) {
	el.focus();
	const [start, end] = [el.selectionStart, el.selectionEnd];
	el.setRangeText(newText, start, end, 'end');
}

//-------------------------Function inserter related functions
function insert_function(){
	window.open("subwindows/function_list.html", "_blank",'height=300,width=400,status=yes,top=150,left=250,toolbar=no,menubar=no,location=no');
	
}


//-------------------------Command inserter related functions
function add_command(){
	window.open("subwindows/add_command.html", "_blank",'height=450,width=800,status=yes,top=100,left=250,toolbar=no,menubar=no,location=no');
	
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
	else if(document.activeElement == document.getElementById("template")){
		if (e.key === '(') {
			el = el = document.getElementById("template");
			const [start, end] = [el.selectionStart, el.selectionEnd];   
			el.setRangeText(')', start, end, 'select');
			el.setRangeText('', start, end, 'end');
		}	
		else if (e.key === '[') {
			el = el = document.getElementById("template");
			const [start, end] = [el.selectionStart, el.selectionEnd];
			el.setRangeText(']', start, end, 'select');
			el.setRangeText('', start, end, 'end');
		}
		else if (e.key === '{') {
			el = el = document.getElementById("template");
			const [start, end] = [el.selectionStart, el.selectionEnd];
			el.setRangeText('}', start, end, 'select');
			el.setRangeText('', start, end, 'end');
		}
		else if (e.key === '\'') {
			el = el = document.getElementById("template");
			const [start, end] = [el.selectionStart, el.selectionEnd];
			el.setRangeText('\'', start, end, 'select');
			el.setRangeText('', start, end, 'end');
		}
		else if (e.key === '\"') {
			el = el = document.getElementById("template");
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


//-------------------------template & script textarea size switch
function t_s_switch(){
	var temp_size = document.getElementById("template").rows;
	var script_size = document.getElementById("input").rows;
	if(temp_size < script_size){
		document.getElementById("template").rows = 18;
		document.getElementById("input").rows = 2;
	}
	else if(temp_size > script_size){
		document.getElementById("template").rows = 2;
		document.getElementById("input").rows = 18;
	}
}


//-------------------------Template loader related functions
function load_template_only(){
	window.open("subwindows/templates/template_list.html", "_blank",'height=500,width=750,status=yes,top=75,left=250,toolbar=no,menubar=no,location=no');
}
function update_selected_template(){
	var template = document.getElementById("template").value;
	eval(template);		
}