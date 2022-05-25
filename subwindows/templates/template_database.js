function get_actual_data(name){
	return eval(name);
}

//default template
const def = "// Default template\n//-------------------------\nclear();  //clear canvas\nsetcanvas(600,600,\"white\"); //set 600x600 white canvas\nezsetgrid(10,2,\"gray\",1,1); //initialize coordinate\nlabel(\"x\",9.4,-0.6,\"gray\",\"italic 20px serif\");  //x\nlabel(\"y\",-0.6,9.4,\"gray\",\"italic 20px serif\");  //y\nlabel(\"O\",-0.9,-0.9,\"gray\",\"italic 25px serif\"); //O\nfor(var tmp = -9;tmp <=9;tmp++){\nline_pp(tmp,10,tmp,-10,0.3,\"round\",\"gray\");\nline_pp(-10,tmp,10,tmp,0.3,\"round\",\"gray\");\n}\n";

//first quadrant only
const first_quadrant = "// First Quadrant\n//-------------------------\nclear();  //clear canvas\nsetcanvas(600,600,\"white\"); //set 600x600 white canvas\nsetgrid(50,550,50,50,0.2,0.2,1,\"black\",1,1)\nlabel(\"x\",10.6,-0.4,\"black\",\"italic 25px serif\");   //x\nlabel(\"y\",-0.4,10.6,\"black\",\"italic 25px serif\");   //y\nlabel(\"O\",-0.65,-0.65,\"black\",\"italic 25px serif\"); //O\nlabel(\"2\",1.85,-0.65,\"black\",\"25px Arial\");\nlabel(\"4\",3.85,-0.65,\"black\",\"25px Arial\");\nlabel(\"6\",5.85,-0.65,\"black\",\"25px Arial\");\nlabel(\"8\",7.85,-0.65,\"black\",\"25px Arial\");\nlabel(\"10\",9.75,-0.65,\"black\",\"25px Arial\");\nlabel(\"2\",-0.65,1.85,\"black\",\"25px Arial\");\nlabel(\"4\",-0.65,3.85,\"black\",\"25px Arial\");\nlabel(\"6\",-0.65,5.85,\"black\",\"25px Arial\");\nlabel(\"8\",-0.65,7.85,\"black\",\"25px Arial\");\nlabel(\"10\",-0.75,9.85,\"black\",\"25px Arial\");\nfor(var tmp = 1;tmp <=9;tmp+=2){                    //thin\nline_pp(tmp,11,tmp,0,0.3,\"round\",\"gray\");\nline_pp(0,tmp,11,tmp,0.3,\"round\",\"gray\");\n}\nfor(var tmp = 2;tmp <=10;tmp+=2){                   //thick\nline_pp(tmp,11,tmp,0,0.7,\"round\",\"gray\");\nline_pp(0,tmp,11,tmp,0.7,\"round\",\"gray\");\n}\n";

//basic polar coordinate
const basic_polar = "// Basic Polar\n//-------------------------\nclear();  //clear canvas\nsetcanvas(600,600,\"white\"); //set 600x600 white canvas\nezsetgrid(10,2,\"gray\",0,0); //initialize coordinate\nlabel(\"0\",9.3,0.2,\"gray\",\"italic 20px serif\");\nlabel(\"π/6\",8.867,5.751,\"gray\",\"italic 20px serif\");\nlabel(\"π/3\",5.833,9.251,\"gray\",\"italic 20px serif\");\nlabel(\"π/2\",0.2,9.251,\"gray\",\"italic 20px serif\");\nlabel(\"2π/3\",-7.033,9.251,\"gray\",\"italic 20px serif\");\nlabel(\"5π/6\",-9.667,5.751,\"gray\",\"italic 20px serif\");\nlabel(\"π\",-9.7,0.2,\"gray\",\"italic 20px serif\");\nlabel(\"7π/6\",-9.667,-6.251,\"gray\",\"italic 20px serif\");\nlabel(\"4π/3\",-6.933,-9.651,\"gray\",\"italic 20px serif\");\nlabel(\"3π/2\",0.2,-9.651,\"gray\",\"italic 20px serif\");\nlabel(\"5π/3\",5.833,-9.651,\"gray\",\"italic 20px serif\");\nlabel(\"11π/6\",8.267,-6.251,\"gray\",\"italic 20px serif\");\nlabel(\"2\",1.8,-0.5,\"black\",\"15px Arial\");\nlabel(\"4\",3.8,-0.5,\"black\",\"15px Arial\");\nlabel(\"6\",5.8,-0.5,\"black\",\"15px Arial\");\nlabel(\"8\",7.8,-0.5,\"black\",\"15px Arial\");\nlabel(\"10\",9.3,-0.5,\"black\",\"15px Arial\");\nlabel(\"2\",-2.1,-0.5,\"black\",\"15px Arial\");\nlabel(\"4\",-4.1,-0.5,\"black\",\"15px Arial\");\nlabel(\"6\",-6.1,-0.5,\"black\",\"15px Arial\");\nlabel(\"8\",-8.1,-0.5,\"black\",\"15px Arial\");\nlabel(\"10\",-9.9,-0.5,\"black\",\"15px Arial\");\nlabel(\"2\",-0.4,1.8,\"black\",\"15px Arial\");\nlabel(\"4\",-0.4,3.8,\"black\",\"15px Arial\");\nlabel(\"6\",-0.4,5.8,\"black\",\"15px Arial\");\nlabel(\"8\",-0.4,7.8,\"black\",\"15px Arial\");\nlabel(\"10\",-0.7,9.5,\"black\",\"15px Arial\");\nlabel(\"2\",-0.4,-2.2,\"black\",\"15px Arial\");\nlabel(\"4\",-0.4,-4.2,\"black\",\"15px Arial\");\nlabel(\"6\",-0.4,-6.2,\"black\",\"15px Arial\");\nlabel(\"8\",-0.4,-8.2,\"black\",\"15px Arial\");\nlabel(\"10\",-0.7,-9.9,\"black\",\"15px Arial\");\nfor(var tmp = 1;tmp <=10;tmp++){\ncircle(0,0,tmp,0.3,'gray',0)\n}\nline_pp(-10,0,10,0,2,\"round\",\"black\");\nline_pp(0,10,0,-10,2,\"round\",\"black\");\nline_pp(-10,-5.7735,10,5.7735,0.5,\"round\",\"gray\");\nline_pp(-10,5.7735,10,-5.7735,0.5,\"round\",\"gray\");\nline_pp(-5.7735,-10,5.7735,10,0.5,\"round\",\"gray\");\nline_pp(-5.7735,10,5.7735,-10,0.5,\"round\",\"gray\");\nline_pp(-10,-10,10,10,0.5,\"round\",\"gray\");\nline_pp(-10,10,10,-10,0.5,\"round\",\"gray\");\nline_pp(-10,-2.6794,10,2.6794,0.5,\"round\",\"gray\");\nline_pp(-10,2.6794,10,-2.6794,0.5,\"round\",\"gray\");\nline_pp(-2.6794,-10,2.6794,10,0.5,\"round\",\"gray\");\nline_pp(-2.6794,10,2.6794,-10,0.5,\"round\",\"gray\");\n";