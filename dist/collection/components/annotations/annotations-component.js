import { h } from "@stencil/core";
import { t } from '../../services/i18n-service';
import { selectCurrentItem } from '../../store/selectors/item';
import { getLanguageKvpValue } from '../../utils/lang';
export class AnnotationsComponent {
    componentWillLoad() {
        this.storeUnsubscribe = this.store.mapStateToProps(this, (state) => {
            return {
                language: state.document.configuration.language,
                title: state.viewport.title,
                metadata: state.viewport.metadata,
                currentItem: selectCurrentItem(state)
            };
        });
    }
    componentDidUnload() {
        this.storeUnsubscribe();
    }
    render() {
        // Record level of manifest
        // Title
        const recordTitle = getLanguageKvpValue(this.title, this.language);
        // Metadata
        const recordMetadata = this.metadata.map(function (metadata) {
            const label = getLanguageKvpValue(metadata.label, this.language);
            const value = getLanguageKvpValue(metadata.value, this.language);
            return { label, value };
        }.bind(this));
        // Item level
        // Title
        const itemTitle = this.currentItem ? getLanguageKvpValue(this.currentItem.label, this.language) : '';
        // Metadata
        const itemMetadata = this.currentItem
            ? this.currentItem.metadata.map(function (metadata) {
                const label = getLanguageKvpValue(metadata.label, this.language);
                const value = getLanguageKvpValue(metadata.value, this.language);
                return { label, value };
            }.bind(this))
            : [];
        return h("dl", { class: "annotation-list" },
            this.renderAnnotation(t('title'), recordTitle),
            recordMetadata.map((pair, index) => {
                if (pair.value && pair.value.trim() != "") {
                    return this.renderAnnotation(pair.label, pair.value);
                }
                else {
                    return undefined;
                }
            }),
            this.renderAnnotation(t('titleItem'), itemTitle),
            itemMetadata.map((pair) => {
                if (pair.value && pair.value.trim() != "") {
                    return this.renderAnnotation(pair.label, pair.value);
                }
                else {
                    return undefined;
                }
            }));
    }
    renderAnnotation(label, value) {
        return [
            h("dt", { tabindex: "0" },
                h("span", null, label)),
            h("dd", null,
                h("span", null, value))
        ];
    }
    static get is() { return "harmonized-annotations"; }
    static get originalStyleUrls() { return {
        "$": ["annotations-component.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["annotations-component.css"]
    }; }
    static get contextProps() { return [{
            "name": "store",
            "context": "store"
        }]; }
    static get states() { return {
        "language": {},
        "title": {},
        "metadata": {},
        "currentItem": {}
    }; }
    static get elementRef() { return "el"; }
}
