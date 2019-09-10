interface PanHandlerConfig {
    max_zoom: number;
    min_zoom: number;
    fill_style: string;
    full_width: number;
    full_height: number;
}
export declare class PanHandler {
    private ctx;
    private config;
    private scale;
    constructor(ctx: CanvasRenderingContext2D, config: PanHandlerConfig);
    pan(diffX: number, diffY: number): void;
    zoom(targetScale: number): void;
    incrementZoom(delta: number): void;
    clear(): void;
}
export {};
