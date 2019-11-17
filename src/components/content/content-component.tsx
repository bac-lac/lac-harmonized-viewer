import { Component, Element, h, Prop, State, Host, Listen } from '@stencil/core'
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
    @Prop() showMetadata: boolean = true
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

        return <Host style={{ width: `${this.width}px` }}>
            <harmonized-drawer placement={this.placement} toolbar={true} visible={true}>
                <harmonized-tabs>

                    {
                        this.showNavigation &&
                        <harmonized-tab
                            label="Pages"
                            icon={iconGrid}>
                            <harmonized-navigation />
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

                    <harmonized-tab
                        label="License"
                        icon={iconInfo}>
                    </harmonized-tab>

                </harmonized-tabs>
            </harmonized-drawer>
        </Host>
    }
}