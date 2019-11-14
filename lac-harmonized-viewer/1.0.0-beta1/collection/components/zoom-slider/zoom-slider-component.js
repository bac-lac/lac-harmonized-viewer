import { h } from "@stencil/core";
import "../../utils/icon-library";
import { setZoomRequest } from '../../store/actions/document';
import noUiSlider from 'nouislider';
export class ZoomSliderComponent {
    componentWillLoad() {
        this.store.mapDispatchToProps(this, { setZoomRequest });
        this.storeUnsubscribe = this.store.mapStateToProps(this, (state) => {
            const { document: { loading: loading, zoom: zoom } } = state;
            return {
                loading: loading,
                zoom: zoom
            };
        });
    }
    initialize() {
        if (this.active) {
            return undefined;
        }
        if (this.slider) {
            this.slider.destroy();
            this.slider = null;
        }
        if (this.zoom.max > 0) {
            const element = this.el.querySelector('.zoom-slider');
            this.slider = noUiSlider.create(element, {
                start: this.zoom.value,
                connect: true,
                range: {
                    'min': this.zoom.min,
                    'max': this.zoom.max
                }
            });
            const slider = element;
            slider.noUiSlider.on('start', () => {
                this.active = true;
            });
            slider.noUiSlider.on('end', () => {
                this.active = false;
            });
            slider.noUiSlider.on('slide', (values) => {
                this.setZoomRequest({
                    min: this.zoom.min,
                    max: this.zoom.max,
                    value: values[0]
                });
            });
        }
    }
    componentDidRender() {
        this.initialize();
        if (this.slider && !this.active) {
            const slider = this.slider;
            slider.set(this.zoom.value);
        }
    }
    componentDidUnload() {
        this.storeUnsubscribe();
    }
    getZoomRatio() {
        const min = this.zoom.min;
        const max = this.zoom.max;
        const value = this.zoom.value;
        let ratio = (value - min) / (max - min);
        if (ratio < 0)
            ratio = 0;
        if (ratio > 1)
            ratio = 1;
        return ratio;
    }
    render() {
        const ratio = this.getZoomRatio() * 100;
        return (h("div", { class: "navbar-item" },
            h("div", { class: "zoom-slider" }),
            h("div", { class: "zoom-value" },
                !isNaN(ratio) && Math.round(ratio),
                "%")));
    }
    static get is() { return "harmonized-zoom-slider"; }
    static get originalStyleUrls() { return {
        "$": ["zoom-slider-component.scss", "../../../node_modules/nouislider/distribute/nouislider.css"]
    }; }
    static get styleUrls() { return {
        "$": ["zoom-slider-component.css", "../../../node_modules/nouislider/distribute/nouislider.css"]
    }; }
    static get contextProps() { return [{
            "name": "store",
            "context": "store"
        }]; }
    static get states() { return {
        "loading": {},
        "zoom": {}
    }; }
    static get elementRef() { return "el"; }
}
