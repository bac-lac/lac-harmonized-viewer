import { Component, h, Element, State } from '@stencil/core';
import { Locale } from '../../services/locale';

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
        return <div class="modal modal-settings" role="dialog" aria-modal="true" tabindex="-1">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Modal title</p>
                    <button class="delete" aria-label="close"></button>
                </header>
                <section class="modal-card-body">

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

                </section>
                <footer class="modal-card-foot">
                    <button class="button is-success" onClick={this.apply.bind(this)}>Save changes</button>
                    <button class="button">Cancel</button>
                </footer>
            </div>
        </div>;
    }
}