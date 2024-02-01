import { Component, Element, h, Prop, State, Host, Method, Event, EventEmitter } from '@stencil/core';
import { Unsubscribe, Store } from '@stencil/redux';
import { toggleDrawer } from '../../store/actions/viewport';
import { t } from '../../services/i18n-service';
import { resolveViewportType } from '../../utils/viewport';
import { selectCurrentItem } from '../../store/selectors/item';

@Component({
    tag: 'harmonized-viewport',
    styleUrl: 'viewport-component.scss'
})
export class ViewportComponent {

    @Element() el: HTMLElement

    @Prop({ context: "store" }) store: Store
    toggleDrawer: typeof toggleDrawer

    storeUnsubscribe: Unsubscribe

    @State() suppressGallery: boolean = false;
    @State() numberOfItems: number
    @State() currentItem: DocumentPage
    @State() configuration: MyAppState["document"]["configuration"]

    @Event({ eventName: 'harmonizedViewerViewportUpdated' }) updatedEvent: EventEmitter


    componentWillLoad() {

        this.store.mapDispatchToProps(this, { toggleDrawer })
        this.storeUnsubscribe = this.store.mapStateToProps(this, (state: MyAppState) => {
            return {
                suppressGallery: state.document.configuration ? state.document.configuration.suppressGallery : false,
                numberOfItems: state.viewport.items.length,
                currentItem: selectCurrentItem(state)
            };
        });

    }

    componentDidUpdate() {
        this.updatedEvent.emit();
    }

    componentDidUnload() {
        this.storeUnsubscribe()
    }

    @Method()
    async getViewportElement(): Promise<HTMLElement> {
        return this.el.shadowRoot.querySelector('harmonized-viewport') as HTMLElement;
    }


    render() {
        let viewportType: ViewportType = this.currentItem ? resolveViewportType(this.currentItem.contentType) : undefined;
        //let itemTitle = this.currentItem.label;
        
        let metaeCopy = this.currentItem.metadata.filter(s => s.key == 'Ecopy number')[0];
        if (metaeCopy) {
            let itemsWithBigData = ['e011865749', 'e011165212-1', 'e011165212-2', 'e011165213-1', 'e011165213-2', 'e011165213-3'];
            const exemptBigFile = metaeCopy.value[0].value;
            let checkExempt = itemsWithBigData.indexOf(exemptBigFile);
            if (checkExempt > -1) {
                var ht = document.getElementsByTagName('html')[0];
                var language = ht.getAttribute('lang');

                const originalLabelEn = "Please allow several seconds for the document to load.";
                const originalLabelFr = "Veuillez attendre plusieurs secondes pour le téléchargement de ce document.";
                setTimeout(() => {
                    let paging = this.el.querySelector('#pagingLabel');
                    paging.innerHTML = language == 'en' ? originalLabelEn : originalLabelFr;

                    const timeOutDelay = (1000 * 60); // 1 minute
                    setTimeout(() => {
                        if (this.numberOfItems > 1) {
                            paging.innerHTML =t(this.currentItem.label); 
                        }
                    }, timeOutDelay);
                }, 100);

               
            }
        }

        // TODO
        /*if (this.status.code == 'empty') {
            return undefined
        }*/
        return <Host class={`viewport viewport-${viewportType}`} id='hv-viewport'>

            {/*
                this.status.code == 'loading' &&
                <harmonized-spinner />
            */}

            {this.currentItem &&
                <div class="viewport__content">
                    {(() => {
                        switch (viewportType) {
                            case 'image':
                                return <harmonized-openseadragon id="viewport" allowPaging={!this.suppressGallery} />;

                            case 'pdf':
                                return <harmonized-embed id="viewport" url={this.currentItem.image} />;

                            case 'audio':
                                return <harmonized-audio id="viewport" url={this.currentItem.image} contentType={this.currentItem.contentType} />;

                            case 'video':
                                return <harmonized-video id="viewport" url={this.currentItem.image} contentType={this.currentItem.contentType} />;

                            default:
                                return null;
                        }
                    })()}

                    {this.numberOfItems > 1 &&
                        <div class="viewport__content-pager">
                            <div class="paging-label" id="pagingLabel">
                                {t(this.currentItem.label)}
                            </div>
                            {!this.suppressGallery &&
                                <harmonized-pager />
                            }
                        </div>
                    }
                </div>
            }
        </Host>
    }
}