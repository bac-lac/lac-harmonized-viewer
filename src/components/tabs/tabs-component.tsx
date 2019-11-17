import { Component, h, Element, Host } from '@stencil/core'
import { MDCRipple } from '@material/ripple'
import { MDCTabBar } from '@material/tab-bar'

@Component({
    tag: 'harmonized-tabs',
    styleUrl: 'tabs-component.scss'
})
export class TabsComponent {

    @Element() el: HTMLElement

    private tabbar: MDCTabBar

    componentDidLoad() {

        const element = this.el.querySelector('.mdc-tab-bar')
        if (element) {

            this.tabbar = new MDCTabBar(element)
            this.tabbar.listen('MDCTabBar:activated', (ev: CustomEvent) => {

                const tabs = this.findTabs()
                tabs.forEach((tab) => { tab.active = false })

                const selectedIndex: number = ev.detail.index
                if (tabs.length > selectedIndex) {
                    tabs[selectedIndex].active = true
                }
            })

            this.tabbar.activateTab(0)
        }
    }

    componentDidUnload() {
        if (this.tabbar) this.tabbar.destroy()
    }

    findTabs(): HTMLHarmonizedTabElement[] {
        return Array.from(this.el.querySelectorAll('harmonized-tab'))
    }

    render() {

        const tabs = this.findTabs()

        return <Host>
            <div class="mdc-tab-bar" role="tablist">
                <div class="mdc-tab-scroller">
                    <div class="mdc-tab-scroller__scroll-area">
                        <div class="mdc-tab-scroller__scroll-content">

                            {
                                tabs && tabs.map((tab) => (
                                    <button
                                        class={(tab.active ? "mdc-tab mdc-tab--active" : "mdc-tab")}
                                        role="tab"
                                        tabindex="0"
                                        aria-selected={tab.active}>
                                        <span class="mdc-tab__content">

                                            <span class="mdc-tab__icon" aria-hidden="true" innerHTML={tab.icon}></span>
                                            {
                                                tab.label && <span class="mdc-tab__text-label">{tab.label}</span>
                                            }

                                        </span>
                                        <span class={(tab.active ? "mdc-tab-indicator mdc-tab-indicator--active" : "mdc-tab-indicator")}>
                                            <span class="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
                                        </span>
                                        <span class="mdc-tab__ripple"></span>
                                    </button>
                                ))
                            }

                        </div>
                    </div>
                </div>
            </div>
            <div class="tabs__panels" role="tabpanels">
                <slot />
            </div>
        </Host>
    }
}