import { Component, h, Element, Host, Prop } from '@stencil/core';


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

    handleClick(ev: MouseEvent) {

    }

    render() {

        return <Host onClick={this.handleClick.bind(this)}>
            <div class="overlay-content">
                <slot />>
            </div>
        </Host>
    }

}
