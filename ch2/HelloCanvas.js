function main() {
    let canvas = document.getElementById('webgl');
    let gl = canvas.getContext('webgl');

    if (!gl) {
	console.log('Failed to get the rendering context');
	return;
    }

    gl.clearColor(0.5, 0.5, 0.5, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
}
