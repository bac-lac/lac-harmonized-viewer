import { Component, h, Element, State, Prop, Host, Event } from '@stencil/core';
import { Unsubscribe, Store } from '@stencil/redux';
import { kStringMaxLength } from 'buffer';
import { t } from '../../services/i18n-service';
import { viewItem } from '../../store/actions/viewport';
import { getLanguageKvpValue } from '../../utils/lang';

@Component({
    tag: 'harmonized-annotations',
    styleUrl: 'annotations-component.scss'
})

export class AnnotationsComponent {

    @Element() el: HTMLElement

    @Prop({ context: "store" }) store: Store

    viewItem: typeof viewItem

    storeUnsubscribe: Unsubscribe

    @State() language: string
    @State() title: MyAppState['viewport']['title']
    @State() metadata: MyAppState['viewport']['metadata']
    @State() currentItemIndex: MyAppState["viewport"]["itemIndex"] = 0
    @State() items: MyAppState["viewport"]["items"] = []
    @State() currentItem: DocumentPage
    @State() loading: boolean = false
    @State() loaded: boolean = false

    @Event({ eventName: "hvNavigationUpdated" }) updatedEvent;

    private imageList: HTMLElement

    componentWillLoad() {

        this.store.mapDispatchToProps(this, { viewItem })
        this.storeUnsubscribe = this.store.mapStateToProps(this, (state: MyAppState) => {
            const {
                viewport: { itemIndex, items }
            } = state
            return {

                language: state.document.configuration.language,
                title: state.viewport.title,
                metadata: state.viewport.metadata,
                //currentItem: selectCurrentItem(state),
                currentItemIndex: itemIndex,
                items
            }
        })
    }

    componentDidUpdate() {
        if (!this.imageList) {
            this.imageList = (this.el.querySelector('.harmonized-image-list') as HTMLElement);
        }
        this.updatedEvent.emit();
    }

    componentDidUnload() {
        this.storeUnsubscribe()
    }

    render() {

        // Record level of manifest
        // Title
        const recordTitle: string = getLanguageKvpValue(this.title, this.language);

        const recordMetadata: any = this.metadata.map(
            function (metadata: DocumentMetadata) {
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
                function (metadata: DocumentMetadata) {
                    const label: string = getLanguageKvpValue(metadata.label, this.language);
                    const value: string = getLanguageKvpValue(metadata.value, this.language);
                    return { label, value };
                }.bind(this))
            : [];

        // Kwic begin
        var kwicQ = "";
        var kwicQExact = "";
        var kwicQAny = "";
        var kwicCount = "";
        var kwicPagesArr = [];
        var kwicEcopiesArr = [];
        if (document.querySelector("lac-harmonized-viewer"))
        {
            if (document.querySelector("lac-harmonized-viewer").getAttribute("kwic-pages") &&
                document.querySelector("lac-harmonized-viewer").getAttribute("kwic-pages") != "")
            {
                kwicPagesArr = document.querySelector("lac-harmonized-viewer").getAttribute("kwic-pages").split(',');
            }
            if (document.querySelector("lac-harmonized-viewer").getAttribute("kwic-ecopies") &&
                document.querySelector("lac-harmonized-viewer").getAttribute("kwic-ecopies") != "")
            {
                kwicEcopiesArr = document.querySelector("lac-harmonized-viewer").getAttribute("kwic-ecopies").split(',');
            }

            if (kwicEcopiesArr.length > 0 && kwicPagesArr.length > 0 && kwicEcopiesArr.length == kwicPagesArr.length)
            {
                if (document.querySelector("lac-harmonized-viewer").getAttribute("kwic-q") &&
                document.querySelector("lac-harmonized-viewer").getAttribute("kwic-q") != "")
                {
                    kwicQ = document.querySelector("lac-harmonized-viewer").getAttribute("kwic-q");
                }
                if (document.querySelector("lac-harmonized-viewer").getAttribute("kwic-q-exact") &&
                    document.querySelector("lac-harmonized-viewer").getAttribute("kwic-q-exact") != "")
                {
                    kwicQExact = document.querySelector("lac-harmonized-viewer").getAttribute("kwic-q-exact");
                }
                if (document.querySelector("lac-harmonized-viewer").getAttribute("kwic-q-any") &&
                    document.querySelector("lac-harmonized-viewer").getAttribute("kwic-q-any") != "")
                {
                    kwicQAny = document.querySelector("lac-harmonized-viewer").getAttribute("kwic-q-any");
                }
                if (document.querySelector("lac-harmonized-viewer").getAttribute("kwic-count") &&
                    document.querySelector("lac-harmonized-viewer").getAttribute("kwic-count") != "")
                {
                    kwicCount = document.querySelector("lac-harmonized-viewer").getAttribute("kwic-count");
                }
            } 
        } 
        // Kwic end

        return <Host >
            <dl class="annotation-list">

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

                {(itemTitle != "") ? this.renderAnnotation(t('titleItem'), itemTitle) : ""}
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

                {(kwicEcopiesArr.length > 0 && kwicPagesArr.length > 0 && kwicEcopiesArr.length == kwicPagesArr.length) ?
                    this.renderAnnotation("----------------------", "") :
                    ""
                }
                {(kwicEcopiesArr.length > 0 && kwicPagesArr.length > 0 && kwicEcopiesArr.length == kwicPagesArr.length) ?
                    this.renderAnnotation(t('yourSearchFor'), "") :
                    ""
                }
                {(kwicQ != "") ?
                    this.renderAnnotation(t('allTheseWords') + kwicQ, "") :
                    ""
                }
                {(kwicQExact != "") ?
                    this.renderAnnotation(t('thisExactPhrase') + kwicQExact, "") :
                    ""
                }
                {(kwicQAny != "") ?
                    this.renderAnnotation(t('anyOfTheseWords') + kwicQAny, "") :
                    ""
                }
                {(kwicCount != "") ?
                    this.renderAnnotation(t('wasFound') + kwicCount + t('pages'), "") :
                    ""
                }
                {(kwicEcopiesArr.length > 0 && kwicPagesArr.length > 0 && kwicEcopiesArr.length == kwicPagesArr.length) ?
                    this.renderKwic(kwicEcopiesArr, kwicPagesArr) :
                    ""
                }

            </dl>
        </Host>;
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

    private renderKwic(kwicEcopiesArr, kwicPagesArr) {

        var kwicItems = [];
        for (var i = 0; i < kwicEcopiesArr.length; i++) {
            var index = parseInt(kwicPagesArr[i]) - 1;
            var kItem = this.items[index];
                kItem["pageIndex"] = index;
            kwicItems.push(kItem);
        }

        var cols = kwicEcopiesArr.length;
        var className = 'harmonized-image-list mdc-image-list mdc-image-list--horizontal mdc-image-list--'+cols+'col';

        /*
        return <harmonized-image-list class={className} tabindex={0}>
        {
            kwicItems.map((page, index) => 
            {
                return <div>{t(page.label).replace('Page ','Page ')}
                    <harmonized-image
                        src={page.thumbnail}
                        contentType={page.contentType}
                        page={page.pageIndex}
                        caption={t(page.label)}
                        show-caption={true}
                        show-tooltip={true}
                        preload={index < 999}
                    />
                </div>
            }
            )
        }
        </harmonized-image-list>

        return <div class="kwic-annotation">
        {
            kwicItems.map((page, index) => 
            {
                return <div>{t(page.label).replace('Page ','Page ')}
                    <harmonized-image
                        src={page.thumbnail}
                        contentType={page.contentType}
                        page={page.pageIndex}
                        caption={t(page.label)}
                        show-caption={true}
                        show-tooltip={true}
                        preload={index < 999}
                    />
                </div>
            }
            )
        }
        </div>
        */

        return <div class="kwic-annotation">
        {
            kwicItems.map((page, index) => 
            {
                return <div>{t(page.label).replace('Page ','Page ')}
                    <harmonized-image
                        src={page.thumbnail}
                        contentType={page.contentType}
                        page={page.pageIndex}
                        caption={t(page.label)}
                        show-caption={true}
                        show-tooltip={true}
                        preload={index < 999}
                    />
                </div>
            }
            )
        }
        </div>
    }
}