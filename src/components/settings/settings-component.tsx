import { Component, h, Element, State, Listen } from '@stencil/core';
import { I18nService } from '../../services/i18n-service';
import i18next from 'i18next';

@Component({
    tag: 'hv-settings',
    styleUrl: 'settings-component.scss'
})
export class SettingsComponent {

    @Element() el: HTMLElement
    @State() language: string

    locale: I18nService = new I18nService()

    componentDidLoad() {

        const selectLanguage = this.el.querySelector('#settings-language') as HTMLSelectElement
        selectLanguage.value = this.locale.get()
    }

    componentWillLoad() {

        this.locale.onChange(() => {
            console.log('lc i18n')
        })
    }

    apply() {

        const selectLanguage = this.el.querySelector('#settings-language') as HTMLSelectElement
        if (selectLanguage) {
            this.language = selectLanguage.value
            this.locale.change(selectLanguage.value)
        }
    }

    handleCloseClick() {

        const modal = this.el.querySelector('.modal-settings')
        if (modal) {
            modal.classList.remove('is-active')
        }
    }

    render() {

        const selectedLanguage = this.locale.get()

        return (
            <div class="modal modal-settings" role="dialog" aria-modal="true" tabindex="-1">
                <div class="modal-background" onClick={this.handleCloseClick.bind(this)}></div>
                <div class="modal-card">
                    <header class="modal-card-head">
                        <p class="modal-card-title">Settings</p>
                        <button class="delete" title="Close" aria-label="close" onClick={this.handleCloseClick.bind(this)}></button>
                    </header>
                    <section class="modal-card-body">

                        <div class="columns">
                            <div class="column">
                                <div class="field">
                                    <label class="label" htmlFor="settings-language">Language</label>
                                    <div class="description">
                                        Your preferred interface language.
                                    </div>
                                    <div class="control control-settings">
                                        <div class="select">
                                            <select class="select" id="settings-language">
                                                {this.locale.all().map((locale) =>
                                                    <option value={locale} selected={selectedLanguage === locale}>{this.locale.label('name', locale)}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </section>
                    <footer class="modal-card-foot is-right">
                        <button class="button is-primary" onClick={this.apply.bind(this)}>Apply</button>
                        <button class="button" onClick={this.handleCloseClick.bind(this)}>Close</button>
                    </footer>
                </div>
            </div>
        )
    }
}