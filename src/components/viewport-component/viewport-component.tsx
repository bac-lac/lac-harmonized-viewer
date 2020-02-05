import { Component, Element, h, Prop, State, Host, Listen, Event, EventEmitter } from '@stencil/core';
import { Unsubscribe, Store } from '@stencil/redux';
import { toggleDrawer } from '../../store/actions/viewport';
import { t } from '../../services/i18n-service';
import { resolveViewportType } from '../../utils/viewport';
import { selectCurrentItem } from '../../store/selectors/item';
import viewport from '../../store/reducers/viewport';

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

    @Event({ eventName: 'harmonizedViewerViewportUpdated'}) updatedEvent: EventEmitter

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
    
    render() {
        let viewportType: ViewportType = this.currentItem ? resolveViewportType(this.currentItem.contentType) : undefined;

        // TODO
        /*if (this.status.code == 'empty') {
            return undefined
        }*/

        return <Host class={`viewport viewport-${viewportType}`}>

            {/*
                this.status.code == 'loading' &&
                <harmonized-spinner />
            */}

            {this.currentItem && 
                <div class="viewport__content">
                    {(() => {
                        switch(viewportType) {
                            case 'image':
                                return <harmonized-openseadragon id="viewport" allowPaging={!this.suppressGallery}/>;

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
                            <div class="paging-label">
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