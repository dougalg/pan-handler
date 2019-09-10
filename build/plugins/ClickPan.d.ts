/**
 * @module plugins
 */
/**
 * Callback interface for handling the pan event
 *
 * ```typescript
 * const onPan = (deltaX: number, deltaY: number) => {
 *     panHandler.pan(deltaX, deltaY);
 *     clearAndDraw();
 * }
 * ```
 */
export declare type OnPan = (deltaX: number, deltaY: number) => void;
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
export declare class ClickPan {
    private onPan;
    private mouseIsDown;
    private lastX;
    private lastY;
    constructor(onPan: OnPan);
    /**
     * Attach mousedown/up/move handlers to an element. When that element is clicked
     * and dragged the [[OnPan]] callback will fire.
     *
     * You may call `addTarget` multiple times with different elements to attach
     * handlers to multiple elements.
     */
    addTarget(target: HTMLElement): void;
    private handleMouseMove;
}
