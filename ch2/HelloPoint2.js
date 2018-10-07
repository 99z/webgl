function main() {
	let canvas = document.getElementById('webgl');
	let gl = canvas.getContext('webgl');

 	if (!gl) {
 		console.log('Failed to get the rendering context');
		return;
	}

	let vertexShaderSrc = document.getElementById('2d-vertex-shader').text;
	let fragShaderSrc = document.getElementById('2d-fragment-shader').text;
	
	if (!initShaders(gl, vertexShaderSrc, fragShaderSrc)) {
		console.log('Failed to initialize shaders.');
		return;
	}
	
	let a_Position = gl.getAttribLocation(gl.program, 'a_Position');
	let a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');
	
	if (a_Position < 0) {
		console.log('Failed to get the storage location of a_Position');
		return;
	}
	
	gl.vertexAttrib1f(a_Position, 0.0);
	gl.vertexAttrib1f(a_PointSize, 20.0);
	
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);
	gl.drawArrays(gl.POINTS, 0, 1);
}
