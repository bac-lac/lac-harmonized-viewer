import { Component, Element, h, Prop, State, Host, Listen, Event } from '@stencil/core';
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

    @State() numberOfItems: number
    @State() currentItem: DocumentPage

    componentWillLoad() {

        this.store.mapDispatchToProps(this, { toggleDrawer })
        this.storeUnsubscribe = this.store.mapStateToProps(this, (state: MyAppState) => {
            return {
                numberOfItems: state.viewport.items.length,
                currentItem: selectCurrentItem(state)
            };
        });
    }

    componentDidUnload() {
        this.storeUnsubscribe()
    }

    render() {
        const viewportType: ViewportType = this.currentItem ? resolveViewportType(this.currentItem.contentType) : undefined;

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
                            return <harmonized-openseadragon id="viewport" />;
                            case 'pdf':
                                return <harmonized-embed id="viewport" url={this.currentItem.image} />;
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
                            <harmonized-pager />
                        </div>
                    }  
                </div>
            }
        </Host>
    }
}