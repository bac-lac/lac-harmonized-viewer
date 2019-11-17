import { Component, h, Element, Prop, Host } from '@stencil/core';
import { MDCRipple } from '@material/ripple';

@Component({
    tag: 'harmonized-tab',
    styleUrl: 'tab-component.scss'
})
export class TabComponent {

    @Element() el: HTMLElement

    @Prop() icon: string
    @Prop() label: string
    @Prop() active: boolean

    render() {

        let className = ''

        if (this.active) className += ' active'

        return <Host class={className}></Host>
    }
}