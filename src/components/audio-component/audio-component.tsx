import { Component, h, Element, Prop } from '@stencil/core';

@Component({
    tag: 'harmonized-audio',
    styleUrl: 'audio-component.scss'
})
export class AudioComponent {

    @Element() el: HTMLElement

    @Prop() url: string
    @Prop() contentType: string

    render() {
        return  <audio controls>
                    <source src={this.url} type={this.contentType} />
                </audio>
    }
}

