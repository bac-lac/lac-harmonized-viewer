import { Component, h, Element, State, Listen, Host, Method, Prop } from '@stencil/core';
import i18next from 'i18next';
import { MDCDialog } from '@material/dialog';
import { Unsubscribe, Store } from '@stencil/redux';
import { MyAppState } from '../../interfaces';
import { setLocale, addLocale } from '../../store/actions/document';
import { Locale } from '../../services/i18n/locale';

@Component({
    tag: 'hv-settings',
    styleUrl: 'settings-component.scss'
})
export class SettingsComponent {

    @Element() el: HTMLElement

    @State() locale: MyAppState["document"]["locale"]
    @State() supportedLocales: MyAppState["document"]["supportedLocales"]

    @Prop({ context: "store" }) store: Store

    addLocale: typeof addLocale
    setLocale: typeof setLocale

    storeUnsubscribe: Unsubscribe

    private dialog: MDCDialog

    componentWillLoad() {

        this.store.mapDispatchToProps(this, { addLocale, setLocale })
        this.storeUnsubscribe = this.store.mapStateToProps(this, (state: MyAppState) => {
            const {
                document: { locale: locale, supportedLocales: supportedLocales }
            } = state
            return {
                locale: locale,
                supportedLocales: supportedLocales
            }
        })
    }

    componentDidLoad() {
        this.dialog = new MDCDialog(this.el)
    }

    componentDidUnload() {
        this.storeUnsubscribe()
    }

    @Method()
    async open() {
        this.dialog.open()
    }

    handleApplyClick() {

        this.setLocale(Locale.create('en-CA'))
    }

    render() {

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
                            {this.supportedLocales.map((locale) =>
                                <option value={locale.toString()} selected={this.locale === locale}>{locale.toString()}</option>)}
                        </select>
                    </div>
                    <footer class="mdc-dialog__actions">
                        <button type="button" class="mdc-button mdc-dialog__button" data-mdc-dialog-action="no">
                            <span class="mdc-button__label">No</span>
                        </button>
                        <button type="button" class="mdc-button mdc-dialog__button" data-mdc-dialog-action="yes" onClick={this.handleApplyClick.bind(this)}>
                            <span class="mdc-button__label">Yes</span>
                        </button>
                    </footer>
                </div>
            </div>
            <div class="mdc-dialog__scrim"></div>
        </Host>
    }
}