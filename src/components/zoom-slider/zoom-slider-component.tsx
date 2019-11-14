import { Component, h, Element, Prop, State } from '@stencil/core';
import "../../utils/icon-library";
import { Unsubscribe, Store } from '@stencil/redux';
import { setZoomRequest } from '../../store/actions/document';
import noUiSlider from 'nouislider';

@Component({
    tag: 'harmonized-zoom-slider',
    styleUrls: [
        'zoom-slider-component.scss',
        '../../../node_modules/nouislider/distribute/nouislider.css'
    ]
})
export class ZoomSliderComponent {

    @Element() el: HTMLElement

    setZoomRequest: typeof setZoomRequest

    storeUnsubscribe: Unsubscribe

    @State() loading: MyAppState["document"]["loading"]
    @State() zoom: MyAppState["document"]["zoom"]

    @Prop({ context: "store" }) store: Store

    private slider: noUiSlider.noUiSlider
    private active: boolean

    componentWillLoad() {

        this.store.mapDispatchToProps(this, { setZoomRequest })
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

        if (this.active) {
            return undefined
        }

        if (this.slider) {
            this.slider.destroy()
            this.slider = null
        }

        if (this.zoom.max > 0) {

            const element = this.el.querySelector('.zoom-slider') as HTMLElement

            this.slider = noUiSlider.create(element, {
                start: this.zoom.value,
                connect: true,
                range: {
                    'min': this.zoom.min,
                    'max': this.zoom.max
                }
            })

            const slider = (element as any)

            slider.noUiSlider.on('start', () => {
                this.active = true
            })
            slider.noUiSlider.on('end', () => {
                this.active = false
            })

            slider.noUiSlider.on('slide', (values) => {
                this.setZoomRequest({
                    min: this.zoom.min,
                    max: this.zoom.max,
                    value: values[0]
                })
            })
        }
    }

    componentDidRender() {

        this.initialize()

        if (this.slider && !this.active) {
            const slider = (this.slider as any)
            slider.set(this.zoom.value)
        }
    }

    componentDidUnload() {
        this.storeUnsubscribe()
    }

    getZoomRatio() {

        const min = this.zoom.min
        const max = this.zoom.max
        const value = this.zoom.value

        let ratio = (value - min) / (max - min)

        if (ratio < 0) ratio = 0
        if (ratio > 1) ratio = 1

        return ratio
    }

    render() {

        const ratio = this.getZoomRatio() * 100

        return (
            <div class="navbar-item">
                <div class="zoom-slider"></div>
                <div class="zoom-value">
                    {!isNaN(ratio) && Math.round(ratio)}%
                </div>
            </div>
        )
    }
}
