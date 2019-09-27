import { Component, h, Event, EventEmitter, Listen, Prop } from '@stencil/core';

@Component({
    tag: 'hv-statusbar',
    styleUrls: [
        'statusbar-component.scss'
    ]
})
export class HvStatusbar {

    render() {
        return <div class="hv-statusbar__inner">
            <div class="ui bottom attached secondary menu">
                <a class="item active">JPG</a>
                <a class="item">PDF</a>
            </div>
        </div>;
    }
}
