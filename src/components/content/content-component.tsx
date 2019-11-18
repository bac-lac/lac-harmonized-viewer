import { Component, Element, h, Prop, Host, Listen } from '@stencil/core'
import '../../utils/manifest'
import { Unsubscribe, Store } from '@stencil/redux'
import iconGrid from '../../assets/material-icons/ic_grid_24px.svg'
import iconInfo from '../../assets/material-icons/ic_info_24px.svg'

@Component({
    tag: 'harmonized-content',
    styleUrl: 'content-component.scss'
})
export class ContentComponent {

    @Element() el: HTMLElement

    @Prop() placement: PlacementType = 'left'
    @Prop() showNavigation: boolean = false
    @Prop() showMetadata: boolean = false
    @Prop() rows: number
    @Prop() width: number
    @Prop() visible: boolean = true

    @Listen('MDCDrawer:opened')
    handleDrawerOpen() {
        this.visible = true
    }

    @Listen('MDCDrawer:closed')
    handleDrawerClose() {
        this.visible = false
    }

    render() {

        if (!this.visible) {
            return undefined
        }

        const tabCount = (this.showNavigation ? 1 : 0) + (this.showMetadata ? 1 : 0)
        const showTabs = (tabCount > 0)

        return <Host style={{ width: `${this.width}px` }}>

            <harmonized-drawer placement={this.placement} toolbar={true} visible={true}>

                {showTabs && this.renderTabs()}
                {showTabs === false && this.showMetadata && <hv-annotations />}

            </harmonized-drawer>
        </Host>
    }

    renderTabs() {

        return <harmonized-tabs>
            {
                this.showNavigation &&
                <harmonized-tab
                    label="Thumbnails"
                    icon={iconGrid}>
                    <harmonized-navigation placement={this.placement} rows={this.rows} />
                </harmonized-tab>
            }
            {
                this.showMetadata &&
                <harmonized-tab
                    label="Metadata"
                    icon={iconInfo}>
                    <hv-annotations />
                </harmonized-tab>
            }
        </harmonized-tabs>
    }
}