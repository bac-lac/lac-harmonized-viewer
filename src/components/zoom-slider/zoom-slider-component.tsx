import { Component, h, Element, Prop, State } from '@stencil/core';
import "../../utils/icon-library";
import { Unsubscribe, Store } from '@stencil/redux';
import { MyAppState } from '../../interfaces';
import { setZoom } from '../../store/actions/document';
import noUiSlider from 'nouislider';

@Component({
    tag: 'harmonized-zoom-slider',
    styleUrls: [
        'zoom-slider-component.scss',
        '../../../node_modules/nouislider/distribute/nouislider.css'
    ]
})
export class HvZoomSlider {

    @Element() el: HTMLElement

    setZoom: typeof setZoom

    storeUnsubscribe: Unsubscribe

    @State() loading: MyAppState["document"]["loading"]
    @State() zoom: MyAppState["document"]["zoom"]

    @Prop({ context: "store" }) store: Store

    private slider: noUiSlider.noUiSlider
    private active: boolean

    componentWillLoad() {

        this.store.mapDispatchToProps(this, { setZoom })
        this.storeUnsubscribe = this.store.mapStateToProps(this, (state: MyAppState) => {
            const {
                document: { loading: loading, zoom: zoom }
            } = state
            return {
                loading: loading,
                zoom: zoom
            }
        })
    }

    initialize() {

        if (this.slider) {
            this.slider.destroy()
            this.slider = null
        }

        if (this.zoom.max > 0) {

            const element = this.el.querySelector('.zoom-slider') as HTMLElement

            this.slider = noUiSlider.create(element, {
                start: this.zoom.min,
                connect: true,
                range: {
                    'min': this.zoom.min,
                    'max': this.zoom.max
                },

            })

            const slider = (element as any)

            slider.noUiSlider.on('start', () => {
                this.active = true
            })
            slider.noUiSlider.on('end', () => {
                this.active = false
            })

            slider.noUiSlider.on('slide', (values) => {

                const value = values[0]
                //zoom.zoom = (zoom.zoom - zoom.min) * 100 / (zoom.max - zoom.min)

                this.setZoom({
                    min: this.zoom.min,
                    max: this.zoom.max,
                    zoom: value
                })
            })
        }
    }

    componentWillRender() {
        if (!this.slider) {
            this.initialize()
        }
    }

    componentDidRender() {
        if (this.slider && !this.active) {
            this.slider.set(this.zoom.zoom)
        }
    }

    componentDidUnload() {
        this.storeUnsubscribe()
    }

    render() {

        return <div class="zoom-slider"></div>
    }
}
