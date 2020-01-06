import { Component, Element, h, Prop, State, Host, Listen } from '@stencil/core';
import { Unsubscribe, Store } from '@stencil/redux';
import { toggleDrawer } from '../../store/actions/viewport';
import { t } from '../../services/i18n-service';
import { resolveViewportType } from '../../utils/viewport';

@Component({
    tag: 'harmonized-viewport',
    styleUrl: 'viewport-component.scss'
})
export class ViewportComponent {

    @Element() el: HTMLElement

    @Prop({ context: "store" }) store: Store

    toggleDrawer: typeof toggleDrawer

    storeUnsubscribe: Unsubscribe

    @State() currentItemIndex: MyAppState['viewport']['itemIndex']
    @State() items: MyAppState['viewport']['items']
    @State() infoShown: MyAppState["viewport"]["infoShown"];

    componentWillLoad() {

        this.store.mapDispatchToProps(this, { toggleDrawer })
        this.storeUnsubscribe = this.store.mapStateToProps(this, (state: MyAppState) => {
            const {
                viewport: { itemIndex, items, infoShown }
            } = state
            return {
                currentItemIndex: itemIndex,
                items,
                infoShown
            }
        });
    }

    componentDidUnload() {
        this.storeUnsubscribe()
    }

    @Listen('viewerDrawerToggle')
    handleDrawerToggle() {
        this.toggleDrawer()
    }

    render() {
        const currentItem: DocumentPage = this.items[this.currentItemIndex];
        const viewportType: ViewportType = currentItem ? resolveViewportType(currentItem.contentType) : undefined;

        // TODO
        /*if (this.status.code == 'empty') {
            return undefined
        }*/

        return <Host class={`viewport viewport-${viewportType}`}>

            {/*
                this.status.code == 'loading' &&
                <harmonized-spinner />
            */}

            {currentItem && 
                <div class="viewport__content">
                    {(() => {
                        switch(viewportType) {
                            case 'image':
                            return <harmonized-openseadragon />;
                            case 'pdf':
                                return <harmonized-embed url={currentItem.image} />;
                            case 'video':
                                return <harmonized-video url={currentItem.image} contentType={currentItem.contentType} />;
                            default:
                                return null;
                        }
                    })()}

                    {this.items.length > 1 &&
                        <div class="viewport__content-pager">
                            <div class="paging-label">
                                {t(currentItem.label)}
                            </div>
                            <harmonized-pager />
                        </div>
                    }  
                </div>
            }

            {this.infoShown &&
                <harmonized-drawer headerTitle="Details" placement="right">
                    <harmonized-annotations></harmonized-annotations>
                </harmonized-drawer>
            }

        </Host>
    }
}