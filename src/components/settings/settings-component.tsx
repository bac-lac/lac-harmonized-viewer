import { Component, h, Element, State, Listen, Host, Method } from '@stencil/core';
import { I18nService, t, Locale } from '../../services/locale-service';
import i18next from 'i18next';
import { MDCDialog } from '@material/dialog';

@Component({
    tag: 'hv-settings',
    styleUrl: 'settings-component.scss'
})
export class SettingsComponent {

    @Element() el: HTMLElement

    @State() language: string

    dialog: MDCDialog

    componentDidLoad() {

        this.dialog = new MDCDialog(this.el)

        const selectLanguage = this.el.querySelector('#settings-language') as HTMLSelectElement
        selectLanguage.value = Locale.get()
    }

    componentWillLoad() {

        Locale.change(() => {
            console.log('lc i18n')
        })
    }

    @Method()
    async open() {
        this.dialog.open()
    }

    apply() {

        const selectLanguage = this.el.querySelector('#settings-language') as HTMLSelectElement
        if (selectLanguage) {
            this.language = selectLanguage.value
            Locale.set(selectLanguage.value)
        }
    }

    handleCloseClick() {

        const modal = this.el.querySelector('.modal-settings')
        if (modal) {
            modal.classList.remove('is-active')
        }
    }

    render() {

        const selectedLanguage = Locale.get()

        return <Host
            class="mdc-dialog"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="my-dialog-title"
            aria-describedby="my-dialog-content">
            <div class="mdc-dialog__container">
                <div class="mdc-dialog__surface">
                    <h2 class="mdc-dialog__title" id="my-dialog-title">Settings</h2>
                    <div class="mdc-dialog__content" id="my-dialog-content">
                        Dialog body text goes here.
                            <select class="select" id="settings-language">
                            {Locale.all().map((locale) =>
                                <option value={locale} selected={selectedLanguage === locale}>{t('name', locale)}</option>)}
                        </select>
                    </div>
                    <footer class="mdc-dialog__actions">
                        <button type="button" class="mdc-button mdc-dialog__button" data-mdc-dialog-action="no">
                            <span class="mdc-button__label">No</span>
                        </button>
                        <button type="button" class="mdc-button mdc-dialog__button" data-mdc-dialog-action="yes">
                            <span class="mdc-button__label">Yes</span>
                        </button>
                    </footer>
                </div>
            </div>
            <div class="mdc-dialog__scrim"></div>
        </Host>
    }
}