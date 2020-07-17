//##############################################################################
//## CANVAS HELLOWORLD                                                        ##
//##############################################################################

//****various Linter configs****
// jshint esversion: 6
// jshint browser: true
// jshint node: true
// jshint -W097
"use strict";

// source: https://www.w3schools.com/html/html5_canvas.asp

var c;
var ctx;

function main(){
  console.log("executing");

  c = document.getElementById("canvas");
  ctx = c.getContext("2d");

  ctx.font = "30px Consolas";
  ctx.fillText("Hello World", 10, 50)
}
