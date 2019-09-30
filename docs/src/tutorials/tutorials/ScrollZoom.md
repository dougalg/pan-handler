## Demo

<canvas id="ScrollZoomCanvas" class="demo-canvas" width="300" height="300"></canvas>

## Code

### Typescript

```typescript
// Canvas/draw setup
const ctx = document.getElementById('ScrollZoomCanvas').getContext('2d');
const draw = getParticleDrawer(ctx.canvas);

// Create pan handler
const PAN_OPTIONS = {
	fill_style: "rgba(0, 0, 0, 1)",
};
const panHandler = new PanHandler(ctx, PAN_OPTIONS);

// Attach scroll zoom plugin
const scrollZoom = new ScrollZoom((scaleDiff) => {
	panHandler.incrementZoom(scaleDiff);
});
scrollZoom.addTarget(ctx.canvas);

// Run the render loop
const loop = () => {
	panHandler.clear();
	draw();
	requestAnimationFrame(loop);
};

loop();
```

### HTML

```html
<canvas id="ScrollZoomCanvas" class="demo-canvas" width="300" height="300"></canvas>
```

<script defer lang="text/javascript" src="{{relativeURLToRoot /assets/js/pan-handler/PanHandler.js}}"></script>
<script defer lang="text/javascript" src="{{relativeURLToRoot /assets/js/pan-handler/plugins/ScrollZoom.js}}"></script>
<script defer lang="text/javascript" src="{{relativeURLToRoot /assets/js/particles.js}}"></script>

<script defer lang="text/javascript" type="module">
	// Canvas/draw setup
	const ctx = document.getElementById('ScrollZoomCanvas').getContext('2d');
	const draw = getParticleDrawer(ctx.canvas);

	// Create pan handler
	const PAN_OPTIONS = {
		fill_style: "rgba(0, 0, 0, 1)",
	};
	const panHandler = new PanHandler(ctx, PAN_OPTIONS);

	// Attach scroll zoom plugin
	const scrollZoom = new ScrollZoom((scaleDiff) => {
		panHandler.incrementZoom(scaleDiff);
	});
	scrollZoom.addTarget(ctx.canvas);

	// Run the render loop
	const loop = () => {
		panHandler.clear();
		draw();
		requestAnimationFrame(loop);
	};

	loop();
</script>
