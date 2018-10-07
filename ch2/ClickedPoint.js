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
	
	if (a_Position < 0) {
		console.log('Failed to get the storage location of a_Position');
		return;
	}
	
	canvas.onmousedown = function(ev) { click(ev, gl, canvas, a_Position) };
	
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);
}

let g_points = [];
function click(ev, gl, canvas, a_Position) {
	let x = ev.clientX;
	let y = ev.clientY;
	
	// Returns a DOMRect object with position info of canvas
	// in the client area
	let rect = ev.target.getBoundingClientRect();
	
	// Transform from client area to canvas coords
	// and transform to WebGL coords
	x = ((x - rect.left) - canvas.height/2)/(canvas.height/2);
	y = (canvas.width/2 - (y - rect.top))/(canvas.width/2);
	g_points.push([x, y]);
	
	gl.clear(gl.COLOR_BUFFER_BIT);
	
	let len = g_points.length;
	for (let i = 0; i < len; i++) {
		gl.vertexAttrib3f(a_Position, g_points[i][0], g_points[i][1], 0.0);
		gl.drawArrays(gl.POINTS, 0, 1);
	}
}
