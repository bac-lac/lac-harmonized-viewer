import { h, Host } from "@stencil/core";
import { MDCDialog } from '@material/dialog';
import { setLocale, addLocale } from '../../store/actions/document';
import i18next from 'i18next';
import '../../services/i18n-service';
export class SettingsComponent {
    componentWillLoad() {
        this.store.mapDispatchToProps(this, { addLocale, setLocale });
        this.storeUnsubscribe = this.store.mapStateToProps(this, (state) => {
            const { document: { locale: locale, supportedLocales: supportedLocales } } = state;
            return {
                locale: locale,
                supportedLocales: supportedLocales
            };
        });
    }
    componentDidLoad() {
        this.dialog = new MDCDialog(this.el);
    }
    componentDidUnload() {
        this.storeUnsubscribe();
    }
    async open() {
        this.dialog.open();
    }
    // @Watch('locale')
    // handleLanguageChange() {
    //     const title = this.el.querySelector('#my-dialog-title')
    //     if (title) {
    //         title.textContent = i18next.t('test1')
    //     }
    // }
    handleApplyClick() {
        i18next.changeLanguage(this.language);
    }
    render() {
        return h(Host, { class: "mdc-dialog", role: "alertdialog", "aria-modal": "true", "aria-labelledby": "my-dialog-title", "aria-describedby": "my-dialog-content" },
            h("div", { class: "mdc-dialog__container" },
                h("div", { class: "mdc-dialog__surface" },
                    h("h2", { class: "mdc-dialog__title", id: "my-dialog-title" }, i18next.t('test1')),
                    h("div", { class: "mdc-dialog__content", id: "my-dialog-content" },
                        "Dialog body text goes here.",
                        h("select", { class: "form-control", name: "language", onInput: (ev) => { this.language = ev.target.value; } }, this.supportedLocales.map(i => h("option", { value: i }, i)))),
                    h("footer", { class: "mdc-dialog__actions" },
                        h("button", { type: "button", class: "mdc-button mdc-dialog__button", "data-mdc-dialog-action": "yes", onClick: this.handleApplyClick.bind(this) },
                            h("span", { class: "mdc-button__label" }, "OK")),
                        h("button", { type: "button", class: "mdc-button mdc-dialog__button", "data-mdc-dialog-action": "no" },
                            h("span", { class: "mdc-button__label" }, "Cancel"))))),
            h("div", { class: "mdc-dialog__scrim" }));
    }
    static get is() { return "hv-settings"; }
    static get originalStyleUrls() { return {
        "$": ["settings-component.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["settings-component.css"]
    }; }
    static get contextProps() { return [{
            "name": "store",
            "context": "store"
        }]; }
    static get states() { return {
        "locale": {},
        "supportedLocales": {},
        "language": {}
    }; }
    static get methods() { return {
        "open": {
            "complexType": {
                "signature": "() => Promise<void>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "",
                "tags": []
            }
        }
    }; }
    static get elementRef() { return "el"; }
}
