const SCROLL_SCALE = 100;
export class ScrollZoom {
    constructor(onZoom) {
        this.onZoom = onZoom;
    }
    attachHandlers(target) {
        target.addEventListener('wheel', (e) => this.handleScroll(e), false);
    }
    handleScroll(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        var delta = evt.deltaY * 0.8;
        if (delta) {
            delta = delta / SCROLL_SCALE;
            this.onZoom(delta);
        }
        return false;
    }
    ;
}
