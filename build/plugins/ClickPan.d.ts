export declare class ClickPan {
    private onPan;
    private mouseIsDown;
    private lastX;
    private lastY;
    constructor(onPan: Function);
    attachHandlers(target: HTMLElement): void;
    private handleMouseMove;
}
