/**
 * The primary interface for general pan/zoom canvas manipulation
 *
 * @module PanHandler
 * @preferred
 */
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
export declare class PanHandler {
    private ctx;
    private config;
    private scale;
    constructor(ctx: CanvasRenderingContext2D, config?: IPanHandlerConfig);
    readonly currentZoom: number;
    /**
     * Pans the canvas by (x, y) amount, scaled for the current zoom level to
     * maintain visual expectations.
     */
    pan(diffX: number, diffY: number): void;
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
    zoom(targetScale: number): void;
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
    incrementZoom(delta: number): void;
    /**
     * Clears the canvas. Should be called before each redraw after modifying zoom
     * or pan.
     */
    clear(): void;
}
