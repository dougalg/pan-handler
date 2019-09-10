const SCROLL_SCALE = 100;

export class ScrollZoom {

    private onZoom: Function;

    constructor(onZoom: Function) {
        this.onZoom = onZoom;
    }

    public attachHandlers(target: HTMLElement) {
        target.addEventListener('wheel', (e) => this.handleScroll(e), false);
    }
    
    private handleScroll(evt: WheelEvent) {
        evt.preventDefault();
        evt.stopPropagation();
        var delta = evt.deltaY * 0.8;
        if (delta) {
            delta = delta / SCROLL_SCALE;
            this.onZoom(delta);
        }
        return false;
    };
}