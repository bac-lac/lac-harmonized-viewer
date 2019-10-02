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
        return <div data-modal id="modal-settings" class="bx--modal " role="dialog" aria-modal="true" aria-labelledby="modal-d0m1qhtmngb-label" aria-describedby="modal-d0m1qhtmngb-heading" tabindex="-1">
            <div class="bx--modal-container">

                <div class="bx--modal-header">
                    <p class="bx--modal-header__label bx--type-delta" id="modal-t8w9vdmwn6e-label">Optional label</p>
                    <p class="bx--modal-header__heading bx--type-beta" id="modal-t8w9vdmwn6e-heading">Modal heading</p>
                    <button class="bx--modal-close" type="button" data-modal-close aria-label="close modal" >
                        <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" class="bx--modal-close__icon" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M12 4.7l-.7-.7L8 7.3 4.7 4l-.7.7L7.3 8 4 11.3l.7.7L8 8.7l3.3 3.3.7-.7L8.7 8z"></path></svg>
                    </button>
                </div>

                <div class="bx--modal-content">
                    <div class="bx--form-item">

                        <div class="bx--select">
                            <label for="select-language" class="bx--label">
                                test
                            </label>

                            <div class="bx--select-input__wrapper">
                                <select id="select-language" class="bx--select-input">
                                    <option class="bx--select-option" value="" disabled selected hidden>Choose an option </option>
                                </select>
                                <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" class="bx--select__arrow" width="10" height="6" viewBox="0 0 10 6" aria-hidden="true"><path d="M5 6L0 1 .7.3 5 4.6 9.3.3l.7.7z"></path></svg>
                            </div>
                        </div>

                    </div>
                </div>

                <div class="bx--modal-footer">
                    <button class="bx--btn bx--btn--secondary" type="button" data-modal-close>Secondary button</button>
                    <button class="bx--btn bx--btn--primary" type="button" aria-label="Danger" data-modal-primary-focus>Primary button</button>
                </div>
            </div>
        </div>;
    }
}