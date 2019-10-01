import { Component, h, Element } from '@stencil/core';

@Component({
    tag: 'hv-settings',
    styleUrls: [
        'settings-component.scss'
    ]
})
export class SettingsComponent {

    @Element() el: HTMLElement;

    render() {
        return <div class="ui modal">
            <i class="close icon"></i>
            <div class="header">
                Viewer Settings
        </div>
            <div class="image content">
                <div class="ui medium image">
                    <img src="/images/avatar/large/chris.jpg" />
                </div>
                <div class="description">
                    <div class="ui header">
                        
                    </div>
                    <p>

                    </p>
                    <p>Is it okay to use this photo?</p>
                </div>
            </div>
            <div class="actions">
                <div class="ui black deny button">
                    Nope
                </div>
                <div class="ui positive right labeled icon button">
                    Apply
                <i class="checkmark icon"></i>
                </div>
            </div>
        </div>;
    }
}