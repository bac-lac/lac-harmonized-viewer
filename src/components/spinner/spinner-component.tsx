import { Component, h, Host } from '@stencil/core';

@Component({
    tag: 'harmonized-spinner',
    styleUrl: 'spinner-component.scss'
})
export class SpinnerComponent {
    render() {
        return (
            <Host role="progressbar" class={`progress-bar mdc-linear-progress__bar mdc-linear-progress--indeterminate`}>
                <div class="mdc-linear-progress__buffering-dots"></div>
                <div class="mdc-linear-progress__buffer"></div>
                <div class="mdc-linear-progress__bar mdc-linear-progress__primary-bar">
                    <span class="mdc-linear-progress__bar-inner"></span>
                </div>
                <div class="mdc-linear-progress__bar mdc-linear-progress__secondary-bar">
                    <span class="mdc-linear-progress__bar-inner"></span>
                </div>
            </Host>
        )
    }
}
