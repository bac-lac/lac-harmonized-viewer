import { h } from "@stencil/core";
import { Locale } from '../../utils/utils.locale';
export class SettingsComponent {
    constructor() {
        this.locale = new Locale();
    }
    componentWillLoad() {
        return this.locale.init();
    }
    componentDidLoad() {
        var selectLanguage = this.el.querySelector('#settings-language');
        selectLanguage.value = this.locale.get();
    }
    apply() {
        var selectLanguage = this.el.querySelector('#settings-language');
        if (selectLanguage) {
            this.language = selectLanguage.value;
            this.locale.change(selectLanguage.value);
        }
    }
    render() {
        return (h("div", { id: "modal-settings", "data-modal": true, class: "bx--modal", role: "dialog", "aria-modal": "true", "aria-labelledby": "modal-settings-label", "aria-describedby": "modal-settings-heading", tabindex: "-1" },
            h("div", { class: "bx--modal-container" },
                h("div", { class: "bx--modal-header" },
                    h("p", { class: "bx--modal-header__label bx--type-delta", id: "modal-t8w9vdmwn6e-label" }, "Harmonized Viewer"),
                    h("p", { class: "bx--modal-header__heading bx--type-beta", id: "modal-t8w9vdmwn6e-heading", innerHTML: this.locale.label('settings') }),
                    h("button", { class: "bx--modal-close", type: "button", "data-modal-close": true, "aria-label": "close modal" },
                        h("svg", { focusable: "false", preserveAspectRatio: "xMidYMid meet", xmlns: "http://www.w3.org/2000/svg", class: "bx--modal-close__icon", width: "16", height: "16", viewBox: "0 0 16 16", "aria-hidden": "true" },
                            h("path", { d: "M12 4.7l-.7-.7L8 7.3 4.7 4l-.7.7L7.3 8 4 11.3l.7.7L8 8.7l3.3 3.3.7-.7L8.7 8z" })))),
                h("div", { class: "bx--modal-content" },
                    h("div", { class: "bx--form-item" },
                        h("label", { class: "bx--label" }, "Language"),
                        h("div", { class: "bx--form__helper-text" }, "Your preferred interface language."),
                        h("div", { class: "bx--select" },
                            h("div", { class: "bx--select-input__wrapper" },
                                h("select", { id: "settings-language", class: "bx--select-input" }, this.locale.all().map((locale) => h("option", { class: "bx--select-option", value: locale, innerHTML: this.locale.label('name', locale) }))),
                                h("svg", { focusable: "false", preserveAspectRatio: "xMidYMid meet", xmlns: "http://www.w3.org/2000/svg", class: "bx--select__arrow", width: "10", height: "6", viewBox: "0 0 10 6", "aria-hidden": "true" },
                                    h("path", { d: "M5 6L0 1 .7.3 5 4.6 9.3.3l.7.7z" })))))),
                h("div", { class: "bx--modal-footer" },
                    h("button", { class: "bx--btn bx--btn--secondary", type: "button", "data-modal-close": true }, "Cancel"),
                    h("button", { type: "button", class: "bx--btn bx--btn--primary", onClick: e => this.apply(), "data-modal-primary-focus": true, innerHTML: this.locale.label('apply') })))));
    }
    static get is() { return "hv-settings"; }
    static get originalStyleUrls() { return {
        "$": ["settings-component.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["settings-component.css"]
    }; }
    static get states() { return {
        "language": {}
    }; }
    static get elementRef() { return "el"; }
}
