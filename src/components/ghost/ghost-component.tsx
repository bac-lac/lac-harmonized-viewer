import { Component, h, Element } from '@stencil/core';

@Component({
    tag: 'harmonized-ghost',
    styleUrl: 'ghost-component.scss'
})
export class GhostComponent {

    @Element() el: HTMLElement

    render() {

        return (<div />)
    }
}