
//------↓↓↓↓↓↓↓↓Global variable declare zone↓↓↓↓↓↓↓↓-------------------
var _ezsetgrid = false;
var _setgrid = false;
var _globalxmax = 1;
var _globalymax = 1;
var _globalxmin = 1;
var _globalymin = 1;
var _grid_xhat = 1;		  	//global xhat
var _grid_yhat = 1;			//global yhat
var _orig_x = 0;			//global origin x coordinate
var _orig_y = 0;			//global origin y coordinate
const default_template = "// Default template\n//-------------------------\nclear();  //clear canvas\nsetcanvas(600,600,\"white\"); //set 600x600 white canvas\nezsetgrid(10,2,\"gray\",1,1); //initialize coordinate\nlabel(\"x\",9.4,-0.6,\"gray\",\"italic 20px serif\");  //x\nlabel(\"y\",-0.6,9.4,\"gray\",\"italic 20px serif\");  //y\nlabel(\"O\",-0.9,-0.9,\"gray\",\"italic 25px serif\"); //O\nfor(var tmp = -9;tmp <=9;tmp++){\nline_pp(tmp,10,tmp,-10,0.3,\"round\",\"gray\");\nline_pp(-10,tmp,10,tmp,0.3,\"round\",\"gray\");\n}\n";
var print_curpos_enabled = false;					//control boolean variable for the cursor position tool
var print_public_enabled = false;					//control boolean variable for the public display
var tdpd_enabled = false;							//control boolean variable for the tdpd display
var anim_control_enabled = false;					//control boolean variable for the animation control panel display
var main_mode = false;                              //false = static image mode. true = animation mode.
//------↑↑↑↑↑↑↑↑Global variable declare zone↑↑↑↑↑↑↑↑-------------------




window.onload = function(){
		
        var canvas = document.getElementById("myCanvas");
        var context = canvas.getContext("2d");	
		
		//document.addEventListener('keyup', input_autocomplete , false); //input_autocomplete
		
		document.getElementById("template").value = default_template;  //load default template
		var template = document.getElementById("template").value;    	//run default template
		eval(template);												//run default template
		
		dragElement(document.getElementById("curpos_display"));  //set cursorpos displayer as a draggable <div>
		dragElement(document.getElementById("public_display"));  //set public display as a draggable <div>
		dragElement(document.getElementById("tdp_dials"));       //set 3d prespective dials as a draggable <div>
		
		document.getElementById("static_mode_select").style.backgroundColor = "#d3d3d3";  //Initialize "static image" button in gray background (selected)
		
		const canvasQ = document.querySelector('canvas');		//This is for the cursor position tool
		canvasQ.addEventListener('mousedown', function(e) { 	//This is for the cursor position tool
			print_curpos(canvasQ,e);                        	//This is for the cursor position tool
		});
		
		for(var i = 0;i<=14;i++){
			cmd_exe_control[i] = false;						//Initialize all 15 indiv-command show control checkboxes as "false"
		}
		
		document.getElementById("curfontsize").innerHTML = document.getElementById("input").style.fontSize;      //Current textarea font size display
		
		document.getElementById("Run").addEventListener("click", function(){ 
			var script = document.getElementById("template").value + document.getElementById("input").value;
			eval(script);
		}); 
		document.getElementById('fileselect').addEventListener('input', function(){
            
            var fr=new FileReader();
            fr.onload=function(){
				var data = fr.result.split("\n==============================\n");  //separate template, script and animation stuff
				document.getElementById("template").value = data[0];
				document.getElementById("input").value = data[1];
				
				//decode&load timeline
				
				var tl_dat = data[2].split("\n");  //raw timeline data array, split by return
				var tl_dat_dat = "";  //variable for individual timeline
				var id = "";   //variable for object id
				for(var i = 0;i<=9;i++){
					tl_dat_dat = tl_dat[i].split("`"); //separator is '`' character, because no one uses it.
					id = "animt"+(i+1).toString()+"_start";
					document.getElementById(id).value = tl_dat_dat[0]; //start
					id = "animt"+(i+1).toString()+"_end";
					document.getElementById(id).value = tl_dat_dat[1]; //end
					id = "animt"+(i+1).toString()+"_increment_count";
					document.getElementById(id).value = tl_dat_dat[2]; //increment_count
					id = "animt"+(i+1).toString()+"_fps";
					document.getElementById(id).value = tl_dat_dat[3]; //fps
					id = "animt"+(i+1).toString()+"_label";
					document.getElementById(id).value = tl_dat_dat[4]; //note label
				}
				
				//decode&load individual commands
				
				var indiv_dat = data[3].split("||"); //raw individual command data, "||" indicates a sepaprate command section
				var indiv_dat_dat = "";
				for(var i = 0;i<=14;i++){
					indiv_dat_dat = indiv_dat[i].split("`"); //separator is '`' character, because no one uses it.
					id = "anim_cmd"+(i+1).toString();
					document.getElementById(id).value = indiv_dat_dat[0]; //command
					id = "anim_cmd"+(i+1).toString()+"_label";
					document.getElementById(id).value = indiv_dat_dat[1]; //note label
					id = "anim_cmd"+(i+1).toString()+"_ckbx";
					if(indiv_dat_dat[2] == "0"){
						document.getElementById(id).checked = false; //checkbox uncheck
						cmd_exe_control[i] = false;
					}
					else if(indiv_dat_dat[2] == "1"){
						document.getElementById(id).checked = true; //checkbox check
						cmd_exe_control[i] = true;
					}
				}
			}
			fr.readAsText(this.files[0]);
		});
		document.getElementById("savefile").addEventListener("click", function(){ 
			
			var output_file_content = document.getElementById("template").value + "\n==============================\n" + document.getElementById("input").value+"\n==============================\n"; //merge template and script
			
			//save timeline
			
			for(var i = 0;i<=9;i++){
					id = "animt"+(i+1).toString()+"_start";
					output_file_content += document.getElementById(id).value; //start
					output_file_content += "`"; //separator is '`' character, because no one uses it.
					id = "animt"+(i+1).toString()+"_end";
					output_file_content += document.getElementById(id).value; //end
					output_file_content += "`";
					id = "animt"+(i+1).toString()+"_increment_count";
					output_file_content += document.getElementById(id).value; //increment_count
					output_file_content += "`";
					id = "animt"+(i+1).toString()+"_fps";
					output_file_content += document.getElementById(id).value; //fps
					output_file_content += "`";
					id = "animt"+(i+1).toString()+"_label";
					output_file_content += document.getElementById(id).value; //note label
					output_file_content += "\n";
				}
			output_file_content += "==============================\n"
			
			//save individual commands
			
			for(var i = 0;i<=14;i++){
					id = "anim_cmd"+(i+1).toString();
					output_file_content += document.getElementById(id).value; //command
					output_file_content += "`"; //separator is '`' character, because no one uses it.
					id = "anim_cmd"+(i+1).toString()+"_label";
					output_file_content += document.getElementById(id).value; //note label
					output_file_content += "`";
					id = "anim_cmd"+(i+1).toString()+"_ckbx";
					if(document.getElementById(id).checked == false)
						output_file_content += "0"; //checkbox not checked, save as 0
					else if(document.getElementById(id).checked == true)
						output_file_content += "1"; //checkbox not checked, save as 1
					output_file_content += "`";
					output_file_content += "||";
				}
			
			var fname = document.getElementById('filename').value;
			var a = document.createElement("a");
			a.href = window.URL.createObjectURL(new Blob([output_file_content], {type: "text/plain;charset=utf-8"}));
			a.download = fname+".txt";
			a.click();
		}); 
		document.getElementById("saveimage").addEventListener("click", function(){
			downloadcanvas(document.getElementById('imagename').value);
		});
}
window.onerror = function(e){
	alert("Script Error. Press F12 for more details");
}
window.onbeforeunload = function() {            //Page refresh warning
  return "Data will be lost if you leave the page, are you sure?";
}

