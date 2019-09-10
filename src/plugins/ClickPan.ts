export class ClickPan {

    private onPan: Function;
    private mouseIsDown: boolean;
    private lastX: number;
    private lastY: number;

    constructor(onPan: Function) {
        this.onPan = onPan;
        this.mouseIsDown = false;
        this.lastX = 0;
        this.lastY = 0;
    }

    public attachHandlers(target: HTMLElement) {
        target.addEventListener("mousedown", () => { this.mouseIsDown = true; }, false);
        target.addEventListener("mousemove", (e) => this.handleMouseMove(e), false);
        target.addEventListener("mouseup", () => { this.mouseIsDown = false; }, false);
    }
    
    private handleMouseMove(event: MouseEvent) {
        const { clientX, clientY } = event;
        const target = event.target as HTMLElement;
        var X = clientX - target.offsetLeft - target.clientLeft + target.scrollLeft;
        var Y = clientY - target.offsetTop - target.clientTop + target.scrollTop;

        if (this.mouseIsDown) {
            this.onPan(X - this.lastX, Y - this.lastY);
        }
        this.lastX = X;
        this.lastY = Y;
    }
}