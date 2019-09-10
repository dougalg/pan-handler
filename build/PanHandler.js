const BASE_CONFIG = {
    max_zoom: 4,
    min_zoom: 0.5,
    fill_style: 'rgba(0, 0, 0, 0.1)',
    full_height: null,
    full_width: null,
};
export class PanHandler {
    constructor(ctx, config) {
        this.ctx = ctx;
        this.config = Object.assign({
            full_height: this.ctx.canvas.height,
            full_width: this.ctx.canvas.width,
        }, BASE_CONFIG, config);
        this.scale = 1;
    }
    pan(diffX, diffY) {
        const xleftView = diffX / this.scale;
        const ytopView = diffY / this.scale;
        this.ctx.transform(1, 0, 0, 1, xleftView, ytopView);
    }
    zoom(targetScale) {
        targetScale = Math.max(Math.min(targetScale, this.config.max_zoom), this.config.min_zoom);
        const prevScale = this.scale;
        const innerScale = targetScale / this.scale;
        this.scale = targetScale;
        this.ctx.scale(innerScale, innerScale);
        // We need to pan slightly to ensure we are still centred
        const distX = ((prevScale - targetScale) * this.config.full_width) / 2;
        const distY = ((prevScale - targetScale) * this.config.full_height) / 2;
        this.pan(distX, distY);
    }
    incrementZoom(delta) {
        if ((this.scale <= this.config.min_zoom && delta < 0) || (this.scale >= this.config.max_zoom && delta > 0)) {
            return;
        }
        this.zoom(delta + this.scale);
    }
    clear() {
        this.ctx.save();
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.fillStyle = this.config.fill_style;
        this.ctx.clearRect(0, 0, this.config.full_width, this.config.full_height);
        this.ctx.fillRect(0, 0, this.config.full_width, this.config.full_height);
        this.ctx.restore();
    }
}
