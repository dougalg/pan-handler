This example shows how you can easily customize the input sources for scrolling
and panning your canvas to be whatever you'd like. Here, we use `&lt;input type="range" /&gt;`
and the `input` event to externally control the pan and zoom.

## Demo

Controls
- Zoom: <input id="customZoom" type="range" value="1" min="0.01" max="10" step="0.001" />
- Horizontal Pan: <input id="customHPan" type="range" value="0" min="-100" max="100" />
- Vertical Pan: <input id="customVPan" type="range" value="0" min="-100" max="100" />

<canvas id="CustomCanvas" class="demo-canvas" width="300" height="300"></canvas>

## Code

### Typescript

```typescript
// Setup canvas and draw function
const ctx = document.getElementById('CustomCanvas').getContext('2d');
const draw = getParticleDrawer(ctx.canvas);

// Create pan handler
const PAN_OPTIONS = {
	fill_style: "rgba(0, 0, 0, 1)",
	min_zoom: 0.01,
	max_zoom: 10,
};
const panHandler = new PanHandler(ctx, PAN_OPTIONS);

// Zoom on "input" event
const zoom = document.getElementById('customZoom');
zoom.addEventListener('input', () => panHandler.zoom(zoom.value));

// Pan on "input" event
let lastX = 0;
let lastY = 0;
const hPan = document.getElementById('customHPan');
const vPan = document.getElementById('customVPan');
hPan.addEventListener('input', () => {
	const current = hPan.value;
	panHandler.pan(lastX - current, 0);
	lastX = current;
});
vPan.addEventListener('input', () => {
	const current = vPan.value;
	panHandler.pan(0, -(lastY - current));
	lastY = current;
});

// Run a draw loop
const loop = () => {
	panHandler.clear();
	draw();
	requestAnimationFrame(loop);
};

loop();
```

### HTML

```html
<ul>
	<li>Zoom: <input id="customZoom" type="range" value="0" min="0.01" max="10" step="0.001" /></li>
	<li>Horizontal Pan: <input id="customHPan" type="range" value="0" min="-100" max="100" /></li>
	<li>Vertical Pan: <input id="customVPan" type="range" value="0" min="-100" max="100" /></li>
</ul>

<canvas id="CustomCanvas" class="demo-canvas" width="300" height="300"></canvas>
```

<script defer lang="text/javascript" src="{{relativeURLToRoot /assets/js/pan-handler/PanHandler.js}}"></script>
<script defer lang="text/javascript" src="{{relativeURLToRoot /assets/js/pan-handler/plugins/ScrollZoom.js}}"></script>
<script defer lang="text/javascript" src="{{relativeURLToRoot /assets/js/pan-handler/plugins/ClickPan.js}}"></script>
<script defer lang="text/javascript" src="{{relativeURLToRoot /assets/js/particles.js}}"></script>

<script defer lang="text/javascript" type="module">
	// Setup canvas and draw function
	const ctx = document.getElementById('CustomCanvas').getContext('2d');
	const draw = getParticleDrawer(ctx.canvas);

	// Create pan handler
	const PAN_OPTIONS = {
		fill_style: "rgba(0, 0, 0, 1)",
		min_zoom: 0.01,
		max_zoom: 10,
	};
	const panHandler = new PanHandler(ctx, PAN_OPTIONS);

	// Zoom on "input" event
	const zoom = document.getElementById('customZoom');
	zoom.addEventListener('input', () => panHandler.zoom(zoom.value));

	// Pan on "input" event
	let lastX = 0;
	let lastY = 0;
	const hPan = document.getElementById('customHPan');
	const vPan = document.getElementById('customVPan');
	hPan.addEventListener('input', () => {
		const current = hPan.value;
		panHandler.pan(lastX - current, 0);
		lastX = current;
	});
	vPan.addEventListener('input', () => {
		const current = vPan.value;
		panHandler.pan(0, -(lastY - current));
		lastY = current;
	});

	// Run a draw loop
	const loop = () => {
		panHandler.clear();
		draw();
		requestAnimationFrame(loop);
	};

	loop();
</script>
