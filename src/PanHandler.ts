/**
 * The primary interface for general pan/zoom canvas manipulation
 *
 * @module PanHandler
 * @preferred
 */

/** */
interface IPanHandlerConfigInternal {
	fill_style: string;
	full_height: number;
	full_width: number;
	max_zoom: number;
	min_zoom: number;
}

/**
 * @internal
 *
 * PanHandler configuration interface
 */
export interface IPanHandlerConfig {
	/** The default style to use on clearing the canvas (default: `"rgba(0, 0, 0, 0.1)"`) */
	fill_style?: string;
	/** The full height of the canvas, (default `ctx.canvas.height`) */
	full_height?: number;
	/** The full width of the canvas, (default `ctx.canvas.width`) */
	full_width?: number;
	/** The maximum allowed zoom (default: 4) */
	max_zoom?: number;
	/** The minimum allowed zoom (default: 0.5) */
	min_zoom?: number;
}

const BASE_CONFIG = {
	fill_style: "rgba(0, 0, 0, 0.1)",
	full_height: null,
	full_width: null,
	max_zoom: 4,
	min_zoom: 0.5,
};

export class PanHandler {

	private ctx: CanvasRenderingContext2D;
	private config: IPanHandlerConfigInternal;
	private scale: number;

	constructor(ctx: CanvasRenderingContext2D, config?: IPanHandlerConfig) {
		this.ctx = ctx;
		this.config = Object.assign(
			{},
			BASE_CONFIG,
			{
				full_height: this.ctx.canvas.height,
				full_width: this.ctx.canvas.width,
			},
			config,
		);
		this.scale = 1;
	}

	get currentZoom() {
		return this.scale;
	}

	/**
	 * Pans the canvas by (x, y) amount, scaled for the current zoom level to
	 * maintain visual expectations.
	 */
	public pan(diffX: number, diffY: number) {
		const xleftView = diffX / this.scale;
		const ytopView = diffY / this.scale;

		this.ctx.transform(1, 0, 0, 1, xleftView, ytopView);
	}

	/**
	 * Sets the zoom to an exact level.
	 * *Note*: Limited by `max_zoom` and `min_zoom`
	 *
	 * ```typescript
	 * panHandler.zoom(3);
	 * // Zoom is now set to 3x magnification
	 *
	 * panHandler.zoom(0.5);
	 * // Zoom is now set to 0.5x magnification
	 * ```
	 */
	public zoom(targetScale: number) {
		targetScale = Math.max(Math.min(targetScale, this.config.max_zoom), this.config.min_zoom);

		if (targetScale === this.scale) {
			return;
		}

		const prevScale = this.scale;
		const innerScale = targetScale / this.scale;
		this.scale = targetScale;

		this.ctx.scale(innerScale, innerScale);

		// We need to pan slightly to ensure we are still centred
		const distX = ((prevScale - targetScale) * this.config.full_width) / 2;
		const distY = ((prevScale - targetScale) * this.config.full_height) / 2;
		this.pan(distX, distY);
	}

	/**
	 * Increments the current zoom by a specific amount
	 * *Note*: Limited by `max_zoom` and `min_zoom`
	 *
	 * ```typescript
	 * panHandler.zoom(3);
	 * // Zoom is now set to 3x magnification
	 *
	 * panHandler.incrementZoom(0.5);
	 * // Zoom is now set to 3.5x magnification
	 *
	 * panHandler.incrementZoom(-3);
	 * // Zoom is now set to 0.5x magnification
	 * ```
	 */
	public incrementZoom(delta: number) {
		if ((this.scale <= this.config.min_zoom && delta < 0) || (this.scale >= this.config.max_zoom && delta > 0)) {
			return;
		}
		this.zoom(delta + this.scale);
	}

	/**
	 * Clears the canvas. Should be called before each redraw after modifying zoom
	 * or pan.
	 */
	public clear() {
		this.ctx.save();

		this.ctx.setTransform(1, 0, 0, 1, 0, 0);
		this.ctx.fillStyle = this.config.fill_style;
		this.ctx.clearRect(0, 0, this.config.full_width, this.config.full_height);
		this.ctx.fillRect(0, 0, this.config.full_width, this.config.full_height);

		this.ctx.restore();
	}

}
