import { h } from "@stencil/core";
import "../../utils/icon-library";
export class PdfComponent {
    componentWillLoad() {
        this.storeUnsubscribe = this.store.mapStateToProps(this, (state) => {
            const { document: { loading: loading, url: url } } = state;
            return {
                loading: loading,
                url: url
            };
        });
    }
    componentDidUnload() {
        this.storeUnsubscribe();
    }
    render() {
        return h("embed", { src: this.url });
    }
    static get is() { return "harmonized-pdf"; }
    static get originalStyleUrls() { return {
        "$": ["pdf-component.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["pdf-component.css"]
    }; }
    static get contextProps() { return [{
            "name": "store",
            "context": "store"
        }]; }
    static get states() { return {
        "loading": {},
        "url": {}
    }; }
    static get elementRef() { return "el"; }
}
