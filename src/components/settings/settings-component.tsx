import { Component, h, Element, State } from '@stencil/core';
import { Locale } from '../../utils/utils.locale';

@Component({
    tag: 'hv-settings',
    styleUrl: 'settings-component.scss'
})
export class SettingsComponent {

    @Element() el: HTMLElement;
    @State() language: string;

    private locale: Locale = new Locale();

    componentWillLoad() {
        return this.locale.init();
    }

    componentDidLoad() {
        var selectLanguage = this.el.querySelector('#settings-language') as HTMLSelectElement;
        selectLanguage.value = this.locale.get();
    }

    apply() {
        var selectLanguage = this.el.querySelector('#settings-language') as HTMLSelectElement;
        if (selectLanguage) {
            this.language = selectLanguage.value;
            this.locale.change(selectLanguage.value);
        }
    }

    render() {
        return (
            <div id="modal-settings" data-modal class="bx--modal" role="dialog" aria-modal="true" aria-labelledby="modal-settings-label" aria-describedby="modal-settings-heading" tabindex="-1">
                <div class="bx--modal-container">

                    <div class="bx--modal-header">
                        <p class="bx--modal-header__label bx--type-delta" id="modal-t8w9vdmwn6e-label">
                            Harmonized Viewer
                    </p>
                        <p
                            class="bx--modal-header__heading bx--type-beta"
                            id="modal-t8w9vdmwn6e-heading"
                            innerHTML={this.locale.label('settings')}>
                        </p>
                        <button class="bx--modal-close" type="button" data-modal-close aria-label="close modal" >
                            <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" class="bx--modal-close__icon" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M12 4.7l-.7-.7L8 7.3 4.7 4l-.7.7L7.3 8 4 11.3l.7.7L8 8.7l3.3 3.3.7-.7L8.7 8z"></path></svg>
                        </button>
                    </div>

                    <div class="bx--modal-content">
                        <div class="bx--form-item">

                            <label class="bx--label">
                                Language
                            </label>
                            <div class="bx--form__helper-text">
                                Your preferred interface language.
                            </div>

                            <div class="bx--select">
                                <div class="bx--select-input__wrapper">
                                    <select id="settings-language" class="bx--select-input">
                                        {this.locale.all().map((locale) =>
                                            <option
                                                class="bx--select-option"
                                                value={locale}
                                                innerHTML={this.locale.label('name', locale)}>
                                            </option>
                                        )}
                                    </select>
                                    <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" class="bx--select__arrow" width="10" height="6" viewBox="0 0 10 6" aria-hidden="true"><path d="M5 6L0 1 .7.3 5 4.6 9.3.3l.7.7z"></path></svg>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div class="bx--modal-footer">
                        <button class="bx--btn bx--btn--secondary" type="button" data-modal-close>
                            Cancel
                        </button>
                        <button
                            type="button"
                            class="bx--btn bx--btn--primary"
                            onClick={e => this.apply()}
                            data-modal-primary-focus
                            innerHTML={this.locale.label('apply')}></button>
                    </div>

                </div>
            </div>
        );
    }
}