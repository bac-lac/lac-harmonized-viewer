import { h, Host } from "@stencil/core";
import { isIE11 } from '../../utils/viewport';
import { t } from '../../services/i18n-service';
export class PdfComponent {
    supportsActiveXPdf() {
        return !!this.createActiveXObject("AcroPDF.PDF") || !!this.createActiveXObject("PDF.PdfCtrl");
    }
    createActiveXObject(type) {
        let activeX;
        try {
            activeX = new window.ActiveXObject(type);
        }
        catch (e) {
            activeX = null;
        }
        return activeX;
    }
    render() {
        if (isIE11()) {
            return h(Host, { id: "pdf-ie11" }, this.supportsActiveXPdf()
                ? h("embed", { src: this.url, type: "application/pdf", height: "100%", width: "100%" },
                    h("span", null, t('pdfNoEmbed')))
                : h("div", null,
                    h("span", null, t('pdfIE11NoRenderLine1')),
                    h("span", null, t('pdfIE11NoRenderLine2'))));
        }
        return h(Host, { id: "pdf-other" },
            h("embed", { src: this.url, type: "application/pdf", width: "100%", height: "100%" },
                h("span", null, t('pdfNoEmbed'))));
    }
    static get is() { return "harmonized-embed"; }
    static get originalStyleUrls() { return {
        "$": ["pdf-component.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["pdf-component.css"]
    }; }
    static get properties() { return {
        "url": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "url",
            "reflect": false
        }
    }; }
    static get elementRef() { return "el"; }
}
