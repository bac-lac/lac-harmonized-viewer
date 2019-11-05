import { Component, h, Element, Event, EventEmitter } from '@stencil/core';


@Component({
    tag: 'harmonized-overlay',
    styleUrl: 'overlay-component.scss'
})
export class OverlayComponent {

    @Element() el: HTMLElement

    handleClick(ev: MouseEvent) {

    }

    render() {
        return <div class="overlay-content" onClick={this.handleClick.bind(this)}></div>
    }

}
