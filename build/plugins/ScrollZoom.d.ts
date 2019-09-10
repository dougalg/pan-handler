export declare class ScrollZoom {
    private onZoom;
    constructor(onZoom: Function);
    attachHandlers(target: HTMLElement): void;
    private handleScroll;
}
