import { Component, h, Element, Host, Prop, State } from '@stencil/core'
import { MDCRipple } from '@material/ripple'
import { MDCTabBar } from '@material/tab-bar'
import i18next from 'i18next'
import { Store, Unsubscribe } from '@stencil/redux'

@Component({
    tag: 'harmonized-tabs',
    styleUrl: 'tabs-component.scss'
})
export class TabsComponent {

    @Element() el: HTMLElement

    @State() language: MyAppState["document"]["language"]

    @Prop({ context: "store" }) store: Store

    storeUnsubscribe: Unsubscribe

    private tabBar: MDCTabBar

    componentWillLoad() {

        this.storeUnsubscribe = this.store.mapStateToProps(this, (state: MyAppState) => {
            const {
                document: { language: language }
            } = state
            return {
                language: language
            }
        })
    }

    componentDidLoad() {

        const element = this.el.querySelector('.mdc-tab-bar')
        if (element) {

            this.tabBar = new MDCTabBar(element)
            this.tabBar.listen('MDCTabBar:activated', (ev: CustomEvent) => {

                const tabs = this.findTabs()
                tabs.forEach((tab) => { tab.active = false })

                const selectedIndex: number = ev.detail.index
                if (tabs.length > selectedIndex) {
                    tabs[selectedIndex].active = true
                }
            })

            this.tabBar.activateTab(0)
        }
    }

    componentDidUnload() {
        if (this.tabBar) this.tabBar.destroy()
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
                                tabs && tabs.map((tab) => <button
                                    class={(tab.active ? "mdc-tab mdc-tab--active" : "mdc-tab")}
                                    role="tab"
                                    tabindex="0"
                                    aria-selected={tab.active}>
                                    <span class="mdc-tab__content">

                                        {
                                            tab.icon && <span class="mdc-tab__icon" aria-hidden="true" innerHTML={tab.icon}></span>
                                        }
                                        {
                                            tab.label && <span class="mdc-tab__text-label">{tab.label}</span>
                                        }

                                    </span>
                                    <span class={(tab.active ? "mdc-tab-indicator mdc-tab-indicator--active" : "mdc-tab-indicator")}>
                                        <span class="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
                                    </span>
                                    <span class="mdc-tab__ripple"></span>
                                </button>)
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