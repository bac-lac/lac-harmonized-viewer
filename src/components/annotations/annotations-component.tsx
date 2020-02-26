import { Component, h, Element, State, Prop } from '@stencil/core';
import { Unsubscribe, Store } from '@stencil/redux';
import { t } from '../../services/i18n-service';
import { selectCurrentItem } from '../../store/selectors/item';
import viewport from '../../store/reducers/viewport';
import { getLanguageKvpValue } from '../../utils/lang';

@Component({
    tag: 'harmonized-annotations',
    styleUrl: 'annotations-component.scss'
})
export class AnnotationsComponent {

    @Element() el: HTMLElement

    @Prop({ context: "store" }) store: Store

    storeUnsubscribe: Unsubscribe

    @State() language: string

    @State() title: MyAppState['viewport']['title']
    @State() metadata: MyAppState['viewport']['metadata']
    @State() currentItem: DocumentPage

    componentWillLoad() {
        this.storeUnsubscribe = this.store.mapStateToProps(this, (state: MyAppState) => {
            return {
                language: state.document.configuration.language,

                title: state.viewport.title,
                metadata: state.viewport.metadata,
                currentItem: selectCurrentItem(state)
            }
        })
    }

    componentDidUnload() {
        this.storeUnsubscribe()
    }

    render() {
        // Record level of manifest
        // Title
        const recordTitle: string = getLanguageKvpValue(this.title, this.language);
        // Metadata
        const recordMetadata: any = this.metadata.map(
            function(metadata: DocumentMetadata) {
                const label: string = getLanguageKvpValue(metadata.label, this.language);
                const value: string = getLanguageKvpValue(metadata.value, this.language);

                return { label, value };
            }.bind(this)
        );

        // Item level
        // Title
        const itemTitle: string = this.currentItem ? getLanguageKvpValue(this.currentItem.label, this.language) : '';
        // Metadata
        const itemMetadata: any = this.currentItem
                                    ? this.currentItem.metadata.map(
                                        function(metadata: DocumentMetadata) {
                                            const label: string = getLanguageKvpValue(metadata.label, this.language);
                                            const value: string = getLanguageKvpValue(metadata.value, this.language);

                                            return { label, value };
                                        }.bind(this))
                                    : [];



        return  <dl class="annotation-list">
                    {this.renderAnnotation(t('title'), recordTitle)}
                    {
                        recordMetadata.map(
                            (pair, index) => {
                                if (pair.value && pair.value.trim() != "") {
                                    return this.renderAnnotation(pair.label, pair.value)
                                } else {
                                    return undefined;
                                }
                            }
                        )
                    }

                    {this.renderAnnotation(t('titleItem'), itemTitle)}
                    {
                        itemMetadata.map(
                            (pair) => {
                                if (pair.value && pair.value.trim() != "") {
                                    return this.renderAnnotation(pair.label, pair.value)
                                } else {
                                    return undefined;
                                }
                            }
                        )
                    }
                    
                </dl>;
    }

   

    private renderAnnotation(label: string, value: string) {
        return [
            <dt tabindex="0">
                <span>{label}</span>
            </dt>,
            <dd>
                <span>{value}</span>
            </dd>
        ];
    }
}