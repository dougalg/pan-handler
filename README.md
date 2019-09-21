# Pan Handler 🥘

A simple zoom and pan library for canvas.

[View the documentation at https://dougalg.github.io/pan-handler/](https://dougalg.github.io/pan-handler/).

## Installation

```sh
npm install --save-dev pan-handler
```

## Usage

### Example

```js
// Full default config
const options = {
	fill_style: "rgba(0, 0, 0, 0.1)",
	full_height: null,
	full_width: null,
	max_zoom: 4,
	min_zoom: 0.5,
};
const ctx = document.getElementById('myCanvas').getContext('2d');
const panHandler = new PanHandler(ctx, options);

// Custom draw function...
function draw() {
	// After each pan/zoom use, you will need to clear your canvas and draw it again
	panHandler.clear();
	ctx.beginPath();
	ctx.rect(20, 20, 20, 20);
	ctx.stroke();
	ctx.fill();
}

// Initial draw
draw();

// Zoom to a 2x level
panHandler.zoom(2);
draw(); // redraw after each call

// Zoom to a 4x level
panHandler.incrementZoom(2);
draw(); // redraw after each call

// Pan left by 500
panHandler.pan(-500, 0);
draw(); // redraw after each call
```

### Plugins

Plugins are provided for common interfaces for zoom and pan. [Please see docs for more details](https://dougalg.github.io/pan-handler/).
