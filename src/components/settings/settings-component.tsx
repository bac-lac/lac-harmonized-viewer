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
        return (
            <div class="modal modal-settings" role="dialog" aria-modal="true" tabindex="-1">
                <div class="modal-background"></div>
                <div class="modal-card">
                    <header class="modal-card-head">
                        <p class="modal-card-title">Harmonized Viewer Settings</p>
                        <button class="delete" aria-label="close"></button>
                    </header>
                    <section class="modal-card-body">

                        <div class="field">
                            <label class="label">Language</label>
                            <div class="help mb-3">
                                Your preferred interface language.
                        </div>
                            <div class="control">
                                <div class="select">
                                    <select id="settings-language" class="select">
                                        {this.locale.all().map((locale) =>
                                            <option value={locale}>{this.locale.label('name', locale)}</option>
                                        )}
                                    </select>
                                </div>
                            </div>
                        </div>

                    </section>
                    <footer class="modal-card-foot">
                        <button class="button is-success" onClick={this.apply.bind(this)}>Save changes</button>
                        <button class="button">Cancel</button>
                    </footer>
                </div>
            </div>
        )
    }
}