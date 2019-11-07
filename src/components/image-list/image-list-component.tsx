import { Component, h } from '@stencil/core';

@Component({
    tag: 'harmonized-image-list',
    styleUrl: 'image-list-component.scss'
})
export class ImageListComponent {

    render() {
        return <slot />
    }
}