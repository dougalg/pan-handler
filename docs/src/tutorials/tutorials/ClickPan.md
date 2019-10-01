## Demo

Click and drag the canvas to move the content.

<canvas id="ClickPanCanvas" class="demo-canvas" width="300" height="300"></canvas>

This animation is based on [an original codepen by Elton Kamami](https://codepen.io/eltonkamami/pen/ECrKd).

## Code

### Typescript

```typescript
// Canvas/draw setup
const ctx = document.getElementById('ClickPanCanvas').getContext('2d');
const draw = getParticleDrawer(ctx.canvas);

// Create pan handler
const PAN_OPTIONS = {
	fill_style: "rgba(0, 0, 0, 1)",
};
const panHandler = new PanHandler(ctx, PAN_OPTIONS);

// Attach scroll zoom plugin
const clickPan = new ClickPan((deltaX, deltaY) => {
	panHandler.pan(deltaX, deltaY);
});
clickPan.addTarget(ctx.canvas);

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
<canvas id="ClickPanCanvas" class="demo-canvas" width="300" height="300"></canvas>
```

<script defer lang="text/javascript" src="{{relativeURLToRoot /assets/js/pan-handler/PanHandler.js}}"></script>
<script defer lang="text/javascript" src="{{relativeURLToRoot /assets/js/pan-handler/plugins/ClickPan.js}}"></script>
<script defer lang="text/javascript" src="{{relativeURLToRoot /assets/js/particles.js}}"></script>

<script defer lang="text/javascript" type="module">
	// Canvas/draw setup
	const ctx = document.getElementById('ClickPanCanvas').getContext('2d');
	const draw = getParticleDrawer(ctx.canvas);

	// Create pan handler
	const PAN_OPTIONS = {
		fill_style: "rgba(0, 0, 0, 1)",
	};
	const panHandler = new PanHandler(ctx, PAN_OPTIONS);

	// Attach scroll zoom plugin
	const clickPan = new ClickPan((deltaX, deltaY) => {
		panHandler.pan(deltaX, deltaY);
	});
	clickPan.addTarget(ctx.canvas);

	// Run the render loop
	const loop = () => {
		panHandler.clear();
		draw();
		requestAnimationFrame(loop);
	};

	loop();
</script>
