import { Component, h, Element, State, Prop } from '@stencil/core';
import { Unsubscribe, Store } from '@stencil/redux';
import { t } from '../../services/i18n-service';
import { selectCurrentItem } from '../../store/selectors/item';

@Component({
    tag: 'harmonized-annotations',
    styleUrl: 'annotations-component.scss'
})
export class AnnotationsComponent {

    @Element() el: HTMLElement

    @Prop({ context: "store" }) store: Store

    storeUnsubscribe: Unsubscribe

    @State() language: string
    @State() currentItem: DocumentPage

    componentWillLoad() {
        this.storeUnsubscribe = this.store.mapStateToProps(this, (state: MyAppState) => {
            return {
                language: state.document.configuration.language,
                currentItem: selectCurrentItem(state)
            }
        })
    }

    componentDidUnload() {
        this.storeUnsubscribe()
    }

    render() {
        return  <dl class="annotation-list">
                    {this.currentItem
                        ?   this.currentItem.metadata.map((annotation) => {
                                const label = annotation.label.find(label => label.locale === this.language);
                                const content = annotation.value.find(value => value.locale === this.language);
                                if (!label || label.value == "" || !content) {
                                    return null;
                                }

                                return [
                                    <dt tabindex="0">
                                        <span>{t(label.value)}</span>
                                    </dt>,
                                    <dd>
                                        <span innerHTML={content.value != "" ? content.value : t('noAnnovationValue')}>
                                        </span>
                                    </dd>
                                ]
                            })
                        :   <span>{t('noAnnotations')}</span>
                    }
                </dl>;
    }
}