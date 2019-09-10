/**
 * @module plugins
 */

/**
 * Callback interface for handling the scroll event
 *
 * ```typescript
 * const onZoom = (scaleDiff: number) => {
 *     panHandler.incrementZoom(scaleDiff);
 *     clearAndDraw();
 * }
 * ```
 */
export type OnZoom = (delta: number) => void;

const SCROLL_SCALE = 100;

/**
 * A simple scroll to zoom handler
 *
 * ```typescript
 * import { PanHandler } from 'pan-handler/PanHandler.js';
 * import { ScrollZoom } from 'pan-handler/plugins/ScrollZoom.js';
 *
 * const ctx = document.getElementById('myCanvas').getContext('2d');
 * const panHandler = new PanHandler(ctx, PAN_OPTIONS);
 *
 * const clearAndDraw = () => {
 *     panHandler.clear();
 *     // Your draw logic here...
 * };
 *
 * const scrollZoom = new ScrollZoom((scaleDiff) => {
 *     panHandler.incrementZoom(scaleDiff);
 *     clearAndDraw();
 * });
 * scrollZoom.addTarget(ctx.canvas);
 * ```
 */
export class ScrollZoom {

	private onZoom: OnZoom;

	constructor(onZoom: OnZoom) {
		this.onZoom = onZoom;
	}

	/**
	 * Attach wheel handlers to an element. When that element is mousewheeled
	 * the [[OnZoom]] callback will fire
	 *
	 * You may call `addTarget` multiple times with different elements to attach
	 * handlers to multiple elements.
	 */
	public addTarget(target: HTMLElement) {
		target.addEventListener("wheel", (e) => this.handleScroll(e), false);
	}

	private handleScroll(evt: WheelEvent) {
		evt.preventDefault();
		evt.stopPropagation();
		let delta = evt.deltaY * 0.8;
		if (delta) {
			delta = delta / SCROLL_SCALE;
			this.onZoom(delta);
		}
		return false;
	}

}
