//##############################################################################
//## CANVAS WEBGL TRIANGLE                                                    ##
//##############################################################################

//****various Linter configs****
// jshint esversion: 6
// jshint browser: true
// jshint node: true
// jshint -W097
"use strict";

// source: https://www.w3schools.com/html/html5_canvas.asp

var c;
var gl;

var vertexShaderText = [
  'precision mediump float;',

  'attribute vec2 vertPosition;',

  'void main()',
  '{',
  ' gl_Position = vec4(vertPosition, 0.0, 1.0);',
  '}',
].join('\n');

var fragmentShaderText = [
  'precision mediump float;',

  'void main()',
  '{',
  ' gl_FragColor = vec4(0.9, 0.2, 0.1, 1.0);',
  '}',
].join('\n');

function init(){
  console.log("initialising...");

  //initialise the canvas with it's webGL context
  c = document.getElementById('canvas');
  gl = c.getContext('webgl');

  if(!gl){
    console.log("falling back on experimental webGL");
    gl = c.getContext('experimental-webgl');
    if(!gl){
      console.log('failed to initialise. your browser does not support webGL');
      return false;
    }
  }


  //initialise the Background color
  gl.clearColor(0.75, 0.85, 0.8 ,1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  //
  //initialise the shaders
  var vertexShader = gl.createShader(gl.VERTEX_SHADER);
  var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(vertexShader, vertexShaderText);
  gl.shaderSource(fragmentShader, fragmentShaderText);
  gl.compileShader(vertexShader);
  gl.compileShader(fragmentShader);

  //check that shaders work
  if(!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)){
    console.error('ERROR compiling vertex shader!',
      gl.getShaderInfoLog(vertexShader));
    return;
  }
  if(!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)){
    console.error('ERROR compiling fragment shader!',
      gl.getShaderInfoLog(fragmentShader));
    return;
  }

  //
  //initialise program
  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  //check that it works properly
  if(!gl.getProgramParameter(program, gl.LINK_STATUS)){
    console.error("ERROR linking program!",
      gl.getProgramInfoLog(program));
    return;
  }
  //this apparently helps for error finding, but is computationally expensive:
  gl.validateProgram(program);
  if(!gl.getProgramParameter(program, gl.VALIDATE_STATUS)){
    console.error("ERROR validating program!",
      gl.getProgramInfoLog(program));
    return;
  }


  //
  //create buffer
  var triangleVerts =[
     0.0,  0.5,
    -0.5, -0.5,
     0.5, -0.5
  ];

  //bind and fill buffer
  var triangleVertexBufferObject = gl.createBuffer();
  gl.bindBuffer(
    gl.ARRAY_BUFFER,
    triangleVertexBufferObject
  );
  gl.bufferData(
    gl.ARRAY_BUFFER,
      //float32Array is necessary because openGL expects that datatype
    new Float32Array(triangleVerts),
    gl.STATIC_DRAW
  );

  //get glsl-position of vertPositions
  var positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');
  //set its layout
  gl.vertexAttribPointer(
    positionAttribLocation,   //attribute location
    2,                        //Number of elements per attribute
    gl.FLOAT,                 //Type of elements
    gl.false,                 //Whether or not data is normalised
    2 * Float32Array.BYTES_PER_ELEMENT, //size of individual vertex
    0                   //offset from beginning of single vertex to this attrib
  );
  gl.enableVertexAttribArray(positionAttribLocation);


  //
  // RENDER LOOP
  //
  gl.useProgram(program);
  gl.drawArrays(gl.TRIANGLES,
    0,  //how many vertices to skip
    3  //how many vertices we have
  );

}
