import { Component, h, Element, State, Prop, Host, Event } from '@stencil/core';
import { Unsubscribe, Store } from '@stencil/redux';
import { kStringMaxLength } from 'buffer';
import { t } from '../../services/i18n-service';
import { viewItem } from '../../store/actions/viewport';
import { getLanguageKvpValue } from '../../utils/lang';
import { selectCurrentItem } from '../../store/selectors/item';

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

    private imageList: HTMLElement;  
    private kwicItems: any[] = [];
    private kwicQ = "";
    private kwicQExact = "";
    private kwicQAny = "";
    private kwicCount = "";
    private kwicPagesArr = [];
    private kwicEcopiesArr = [];

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
                currentItem: selectCurrentItem(state),
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
      
        this.getKWICPagedata();
        this.getKwicItems();
      

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
            </dl>

            <div id="KwicContent" class="kwic-content">
                {(this.kwicEcopiesArr.length > 0 ) ?
                    this.renderDivKwic() : ""
                }
                <div id="detailsSearchLabel">
                    {(this.kwicEcopiesArr.length > 0 ) ?
                        <span id="detailsSearchLabel1"><br />{t('yourSearchFor')} </span> : ""
                    }
                    {(this.kwicQ != "") ?
                        <span id="detailsSearchLabel2"><br />{t('allTheseWords')} {this.kwicQ}</span> : ""
                    }
                    {(this.kwicQExact != "") ?
                        <span id="detailsSearchLabel3"><br />{t('thisExactPhrase')} {this.kwicQExact}</span> : ""
                    }
                    {(this.kwicQAny != "") ?
                        <span id="detailsSearchLabel4"><br />{t('anyOfTheseWords')} {this.kwicQAny}</span> : ""
                    }
                    {(this.kwicCount != "") ?
                        <span id="detailsSearchLabel5"><br /><br />{t('wasFound')} <br />{this.kwicCount} {t('pages')}<br /><br /></span> : ""
                    }
                </div>
                {(this.kwicEcopiesArr.length > 0) ?
                    this.renderKwic() : ""
                }
            </div>
        </Host>;
    }

    private getKWICPagedata(): void{
        this.kwicQ = "";
        this.kwicQExact = "";
        this.kwicQAny = "";
        this.kwicCount = "";
        this.kwicPagesArr = [];
        this.kwicEcopiesArr = [];
        const hvEl = document.querySelector("lac-harmonized-viewer");
        if (hvEl) {
            if (hvEl.getAttribute("kwic-ecopies") && hvEl.getAttribute("kwic-ecopies") != "") {
                    this.kwicEcopiesArr = hvEl.getAttribute("kwic-ecopies").split(',');
            }

            if (this.kwicEcopiesArr.length > 0) {
                if (hvEl.getAttribute("kwic-q") && hvEl.getAttribute("kwic-q") != "") {
                    this.kwicQ = hvEl.getAttribute("kwic-q");
                }
                if (hvEl.getAttribute("kwic-q-exact") && hvEl.getAttribute("kwic-q-exact") != "") {
                    this.kwicQExact = hvEl.getAttribute("kwic-q-exact");
                }
                if (hvEl.getAttribute("kwic-q-any") && hvEl.getAttribute("kwic-q-any") != "") {
                    this.kwicQAny = hvEl.getAttribute("kwic-q-any");
                }
                if (hvEl.getAttribute("kwic-count") && hvEl.getAttribute("kwic-count") != "") {
                    this.kwicCount =hvEl.getAttribute("kwic-count");
                }
            }
        }
    }

    private getKwicItems(): void {
        this.kwicItems = [];
        this.kwicPagesArr = [];
        this.items.forEach((element,index) => {
            const urlThumbnail = element.thumbnail;
            if (urlThumbnail) {
                let searchParam = new URLSearchParams(urlThumbnail.replace('?','&'));
                const itemEcopy = searchParam.get('id');
                let checkKwicItem = this.kwicEcopiesArr.find(s=>s == itemEcopy); 
                if (checkKwicItem) {
                    this.kwicItems.push(element);
                    this.kwicPagesArr.push(index);
                }
            }
            
        });        
    }

    private renderAnnotation(label: string, value: string) {
        return [
            <dt>
                <span>{label}</span>
            </dt>,
            <dd>
                <span>{value}</span>
            </dd>
        ];
    }

    private renderKwic() {
        return <div class="kwic-annotation">
            {
                this.kwicItems.map((page, index) => {
                    return <div><br />{t(page.label)} <br />
                        <harmonized-image
                            src={page.thumbnail}
                            contentType={page.contentType}
                            page={this.kwicPagesArr[index]}
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

    private renderDivKwic() {
        if (this.language == "en")
            return [<div class="kwic-border-top" title="Search"><br />{t('search')}</div>];
        else
            return [<div class="kwic-border-top" title="Recherche"><br />{t('search')}</div>];
    }
}