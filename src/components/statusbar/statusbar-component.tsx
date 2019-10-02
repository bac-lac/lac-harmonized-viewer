import { Component, h } from '@stencil/core';

@Component({
    tag: 'hv-statusbar',
    styleUrl: 'statusbar-component.scss'
})
export class HvStatusbar {

    render() {
        return <div class="hv-statusbar__inner">
            <div class="">
                <a class="item active">JPG</a>
                <a class="item">PDF</a>
            </div>
        </div>;
    }
}
