import { Component, h, Element, Prop } from '@stencil/core';

@Component({
    tag: 'harmonized-embed',
    styleUrl: 'pdf-component.scss'
})
export class PdfComponent {

    @Element() el: HTMLElement

    @Prop() url: string

    render() {
        return <embed src={this.url} type="application/pdf" width="100%" height="100%" />
    }
}
