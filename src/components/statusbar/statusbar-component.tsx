import { Component, h, Event, EventEmitter, Listen, Prop } from '@stencil/core';

@Component({
    tag: 'hv-statusbar',
    styleUrls: [
        'statusbar-component.scss'
    ]
})
export class HvStatusbar {

    render() {
        return <div>
            <div class="ui bottom attached secondary menu">
                <a class="item active" data-tab="fourth">JPG</a>
                <a class="item" data-tab="fifth">PDF</a>
            </div>
            <div class="ui active tab segment" data-tab="fourth">
                4
            </div>
            <div class="ui tab segment" data-tab="fifth">
                5
            </div>
            <div class="ui tab segment" data-tab="sixth">
                6
            </div>
        </div>;
    }
}
