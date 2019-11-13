import { Component, h, Element, State, Host, Method, Prop } from '@stencil/core';
import { MDCDialog } from '@material/dialog';
import { MDCSelect } from '@material/select';
import { Unsubscribe, Store } from '@stencil/redux';
import { MyAppState } from '../../interfaces';
import { setLocale, addLocale } from '../../store/actions/document';
import i18next from 'i18next';
import '../../services/i18n-service';

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
    private language: MDCSelect

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
        this.language = new MDCSelect(this.el.querySelector('.mdc-select'))
    }

    componentDidUnload() {
        this.storeUnsubscribe()
    }

    @Method()
    async open() {
        this.dialog.open()
    }

    // @Watch('locale')
    // handleLanguageChange() {

    //     const title = this.el.querySelector('#my-dialog-title')
    //     if (title) {
    //         title.textContent = i18next.t('test1')
    //     }
    // }

    handleApplyClick() {
        i18next.changeLanguage('fr')
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
                    <h2 class="mdc-dialog__title" id="my-dialog-title">
                        {i18next.t('labels.test1')}
                    </h2>
                    <div class="mdc-dialog__content" id="my-dialog-content">
                        Dialog body text goes here.

                        <div class="mdc-select">

                            <div class="mdc-select__anchor">
                                <i class="mdc-select__dropdown-icon"></i>
                                <div class="mdc-select__selected-text"></div>
                                <span class="mdc-floating-label">Language</span>
                                <div class="mdc-line-ripple"></div>
                            </div>

                            <div class="mdc-select__menu mdc-menu mdc-menu-surface">
                                <ul class="mdc-list">
                                    <li class="mdc-list-item mdc-list-item--selected" data-value="" aria-selected="true"></li>
                                    {this.supportedLocales.map((locale) =>
                                        <li class="mdc-list-item" data-value={locale.toString()}>{locale.toString()}</li>)}
                                </ul>
                            </div>

                        </div>

                    </div>
                    <footer class="mdc-dialog__actions">
                        <button type="button" class="mdc-button mdc-dialog__button" data-mdc-dialog-action="yes" onClick={this.handleApplyClick.bind(this)}>
                            <span class="mdc-button__label">OK</span>
                        </button>
                        <button type="button" class="mdc-button mdc-dialog__button" data-mdc-dialog-action="no">
                            <span class="mdc-button__label">Cancel</span>
                        </button>
                    </footer>
                </div>
            </div>
            <div class="mdc-dialog__scrim"></div>
        </Host>
    }
}