var colaps_file_enabled = false;
var colaps_help_enabled = false;
var colaps_settings_enabled = false;
var colaps_other_enabled = false;
var insert_id = "input";	//This variable keeps the record of the "last" focused element (i.e, the textbox/textarea where the inserter should insert their stuff). Default is "input".


//-------------------------Collapsable side panel from W3School(file)
function colaps_file_open() {
	if(colaps_file_enabled == false){
		document.getElementById("colaps_file").style.width = "250px";
		colaps_file_enabled = true;
	}
	else if(colaps_file_enabled == true){
		document.getElementById("colaps_file").style.width = "0px";
		colaps_file_enabled = false;
	}
}
//-------------------------Collapsable side panel from W3School(file)


//-------------------------Collapsable side panel from W3School(help)
function colaps_help_open() {
  	if(colaps_help_enabled == false){
		document.getElementById("colaps_help").style.width = "300px";
		colaps_help_enabled = true;
	}
	else if(colaps_help_enabled == true){
		document.getElementById("colaps_help").style.width = "0px";
		colaps_help_enabled = false;
	}
}
//-------------------------Collapsable side panel from W3School(help)


//-------------------------Collapsable side panel from W3School(settings)
function colaps_settings_open() {
  	if(colaps_settings_enabled == false){
		document.getElementById("colaps_settings").style.width = "280px";
		colaps_settings_enabled = true;
	}
	else if(colaps_settings_enabled == true){
		document.getElementById("colaps_settings").style.width = "0px";
		colaps_settings_enabled = false;
	}
}
//-------------------------Collapsable side panel from W3School(settings)


//-------------------------Collapsable side panel from W3School(other)
function colaps_other_open() {
  	if(colaps_other_enabled == false){
		document.getElementById("colaps_other").style.width = "280px";
		colaps_other_enabled = true;
	}
	else if(colaps_other_enabled == true){
		document.getElementById("colaps_other").style.width = "0px";
		colaps_other_enabled = false;
	}
}
//-------------------------Collapsable side panel from W3School(other)


//-------------------------Textarea font size management
function textbox_font_bigger(){
	var newsize = document.getElementById("input").style.fontSize.slice(0, -2); //npx -> n
	if(parseInt(newsize,10) < 16){												//always <=16px
		newsize = (parseInt(newsize,10)+1).toString() + "px";                   //n -> n+1px
		//console.log(newsize);
		document.getElementById("template").style.fontSize = newsize;
		document.getElementById("input").style.fontSize = newsize;
		document.getElementById("curfontsize").innerHTML = newsize;
	}
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
function curpos_show_control(){ //(from W3School)
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
function public_show_control(){ //(from W3School)
	// Get the checkbox
	var checkBox = document.getElementById("show_public");
	var div = document.getElementById("public_display");
	if(checkBox.checked == true){
		div.style.display = "block";
		print_public_enabled = true;
	}
	else{
		print_public_enabled = false;
		div.style.display = "none";
	}
}

//-------3D perspective dials related functions
function tdpd_show_control(){   //(from W3School)
	// Get the checkbox
	var checkBox = document.getElementById("show_tdpd");
	var div = document.getElementById("tdp_dials");
	if(checkBox.checked == true){
		div.style.display = "block";
		tdpd_enabled = true;
	}
	else{
		tdpd_enabled = false;
		div.style.display = "none";
	}
}

//-------------------------Special character inserter related functions
function insert_symbol(){
	window.open("subwindows/symbol_list.html", "_blank",'height=300,width=400,status=yes,top=150,left=250,toolbar=no,menubar=no,location=no');
}
function typeInTextarea(newText, el = document.getElementById(insert_id)) {
	if(el.nodeName == "TEXTAREA" || el.nodeName == "INPUT"){ //A filter for textbox&textarea. Extra precaution is always a good thing. 
		el.focus();
		const [start, end] = [el.selectionStart, el.selectionEnd];
		el.setRangeText(newText, start, end, 'end');   //setRangeText() automatically limited the element to either textbox or texarea.
	}
}

//-------------------------Function inserter related functions
function insert_function(){
	window.open("subwindows/function_list.html", "_blank",'height=300,width=400,status=yes,top=150,left=250,toolbar=no,menubar=no,location=no');
}

//-------------------------Command inserter related functions
function add_command(){
	window.open("subwindows/add_command.html", "_blank",'height=450,width=600,status=yes,top=250,left=10,toolbar=no,menubar=no,location=no');
}

//-------------------------Template loader related functions
function load_template_only(){
	window.open("subwindows/templates/template_list.html", "_blank",'height=500,width=750,status=yes,top=75,left=250,toolbar=no,menubar=no,location=no');
}
function update_selected_template(){
	var data = document.getElementById("template").value;
	eval(data);
	data = document.getElementById("input").value;
	eval(data);
}

//-------------------------All pop-up window returned data processing
window.addEventListener('message', event => {
	if(event.data[0] == "Iridium"){ //Verification
		if(event.data[1] == "command"){	  //data from add_command.html
			typeInTextarea(event.data[2]);
			_system_display("Command \""+event.data[2]+"\" inserted to \""+insert_id+"\"","#82caff"); //color of inserters
		}
		else if(event.data[1] == "symbol"){	  //data from symbol_list.html
			typeInTextarea(event.data[2]);
			_system_display("Symbol \'"+event.data[2]+"\' inserted to \""+insert_id+"\"","#82caff"); //color of inserters
		}
		else if(event.data[1] == "function"){	  //data from function_list.html
			typeInTextarea(event.data[2]);
			_system_display("Function \""+event.data[2]+"\" inserted to \""+insert_id+"\"","#82caff"); //color of inserters
		}
		else if(event.data[1] == "template"){	  //data from template_list.html
			document.getElementById("template").value = event.data[2];
			update_selected_template();
			_system_display("Template \""+event.data[3]+"\" selected","#82caff"); //color of inserters
		}
	}
});

//-------------------------Input autocompleter related functions (disabled starting from v1.4.0)
/*function input_autocomplete(e){
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
	else if(document.activeElement == document.getElementById("template")){ //Identical function for the template section
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
*/

//-------------------------Small calculator driver
function quick_calculator(){
	_system_display("Calculator successfully executed","blue"); //this message stays on there if nothing bad happens
	document.getElementById("calc_display").innerHTML = "";
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

//-------------------------Static Image/Animation edit mode switch
function switch_to_static(){
	main_mode = false;
	document.getElementById("static_mode_select").style.backgroundColor = "#d3d3d3";
	document.getElementById("anim_mode_select").style.backgroundColor = "#ffffff";
	document.getElementById("inputzone_static").style.display = "inline";
	document.getElementById("inputzone_anim").style.display = "none";
}
function switch_to_anim(){
	main_mode = true;
	document.getElementById("static_mode_select").style.backgroundColor = "#ffffff";
	document.getElementById("anim_mode_select").style.backgroundColor = "#d3d3d3";
	document.getElementById("inputzone_static").style.display = "none";
	document.getElementById("inputzone_anim").style.display = "inline";
}

//-------------------------Record last focused element for the inserters to insert
function setId(id){
    insert_id = id;
}

//-------------------------Manual command insert
function blank_cmd_insert(){
	typeInTextarea(document.getElementById("blank_cmd_input").value);
	_system_display("Command \""+document.getElementById("blank_cmd_input").value+"\" inserted to \""+insert_id+"\"","#CD7F32");
}
//-------------------------from https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
function mobileCheck() {
	let check = false;
	(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
	return check;
};
