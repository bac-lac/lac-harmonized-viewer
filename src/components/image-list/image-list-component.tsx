import { Component, h, Host } from '@stencil/core';

@Component({
    tag: 'harmonized-image-list',
    styleUrl: 'image-list-component.scss'
})
export class ImageListComponent {

    render() {

        return <Host class="page-list">
            <slot />
        </Host>
    }
}