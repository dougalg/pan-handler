/**
 * @module plugins
 */
/**
 * A simple click and drag to pan handler
 *
 * ```typescript
 * import { PanHandler } from 'pan-handler/PanHandler.js';
 * import { clickPan } from 'pan-handler/plugins/ClickPan.js';
 *
 * const ctx = document.getElementById('myCanvas').getContext('2d');
 * const panHandler = new PanHandler(ctx, PAN_OPTIONS);
 *
 * const clearAndDraw = () => {
 *     panHandler.clear();
 *     // Your draw logic here...
 * };
 *
 * const clickPan = new ClickPan((deltaX, deltaY) => {
 *     panHandler.pan(deltaX, deltaY);
 *     clearAndDraw();
 * });
 * clickPan.addTarget(ctx.canvas);
 * ```
 */
export class ClickPan {
    constructor(onPan) {
        this.onPan = onPan;
        this.mouseIsDown = false;
        this.lastX = 0;
        this.lastY = 0;
    }
    /**
     * Attach mousedown/up/move handlers to an element. When that element is clicked
     * and dragged the [[OnPan]] callback will fire.
     *
     * You may call `addTarget` multiple times with different elements to attach
     * handlers to multiple elements.
     */
    addTarget(target) {
        target.addEventListener("mousedown", () => { this.mouseIsDown = true; }, false);
        target.addEventListener("mousemove", (e) => this.handleMouseMove(e), false);
        document.addEventListener("mouseup", () => { this.mouseIsDown = false; }, false);
    }
    handleMouseMove(event) {
        const { clientX, clientY } = event;
        const target = event.target;
        const X = clientX - target.offsetLeft - target.clientLeft + target.scrollLeft;
        const Y = clientY - target.offsetTop - target.clientTop + target.scrollTop;
        if (this.mouseIsDown) {
            this.onPan(X - this.lastX, Y - this.lastY);
        }
        this.lastX = X;
        this.lastY = Y;
    }
}
