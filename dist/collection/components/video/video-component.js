import { h, Host } from "@stencil/core";
import { t } from '../../services/i18n-service';
/*
    To provide a custom video, you must:
    1 - Listen to the 'hvCustomVideoPlayerRender' DOM event
    2 - On event, querySelect the harmonized viewer (#harmonized-viewer)
    3 - then querySelect the harmonized-viewer's shadow-root for the #harmonized-viewer-custom-video container
    4 - inject your on video within this element => do not inject any <link /> elements
*/
export class VideoComponent {
    constructor() {
        this.customVideoPlayer = false;
    }
    componentWillLoad() {
        this.storeUnsubscribe = this.store.mapStateToProps(this, (state) => {
            const { document: { configuration: { customVideoPlayer } } } = state;
            return {
                customVideoPlayer
            };
        });
    }
    componentDidLoad() {
        if (this.customVideoPlayer) {
            this.customVideoPlayerRender.emit({ url: this.url, contentType: this.contentType });
        }
    }
    componentDidUnload() {
        this.storeUnsubscribe();
    }
    componentDidUpdate() {
        if (this.customVideoPlayer) {
            this.customVideoPlayerRender.emit({ url: this.url, contentType: this.contentType });
        }
    }
    render() {
        if (!this.url) {
            return undefined;
        }
        return h(Host, { class: "video" }, this.customVideoPlayer
            ? h("div", { id: "harmonized-viewer-custom-video" })
            : h("div", { id: "harmonized-viewer-html5-video" },
                h("video", { controls: true },
                    h("source", { src: this.url, type: this.contentType }, t('browserNoVideo')))));
    }
    static get is() { return "harmonized-video"; }
    static get originalStyleUrls() { return {
        "$": ["video-component.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["video-component.css"]
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
        },
        "contentType": {
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
            "attribute": "content-type",
            "reflect": false
        }
    }; }
    static get contextProps() { return [{
            "name": "store",
            "context": "store"
        }]; }
    static get states() { return {
        "customVideoPlayer": {}
    }; }
    static get events() { return [{
            "method": "customVideoPlayerRender",
            "name": "hvCustomVideoPlayerRender",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get elementRef() { return "el"; }
}
