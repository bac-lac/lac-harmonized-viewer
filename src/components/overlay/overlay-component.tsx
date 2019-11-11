import { Component, h, Element, Host, Prop } from '@stencil/core';
import openseadragon from 'openseadragon';
import Popper from 'popper.js'
import Tooltip from 'tooltip.js'

@Component({
    tag: 'harmonized-overlay',
    styleUrl: 'overlay-component.scss'
})
export class OverlayComponent {

    @Element() el: HTMLElement

    @Prop() x: number
    @Prop() y: number

    @Prop() width: number
    @Prop() height: number

    @Prop() mouseTracker: any

    componentDidLoad() {


    }

    handleClick(ev: MouseEvent) {

    }

    render() {

        return <Host class="overlay" onClick={this.handleClick.bind(this)}>
            <div class="overlay__content">
                <slot />>
            </div>
        </Host>
    }

}
