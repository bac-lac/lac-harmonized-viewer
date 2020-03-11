import { h, Host } from "@stencil/core";
import { MDCTabBar } from '@material/tab-bar';
export class TabsComponent {
    componentWillLoad() {
        this.storeUnsubscribe = this.store.mapStateToProps(this, (state) => {
            const { document: { language: language } } = state;
            return {
                language: language
            };
        });
    }
    componentDidLoad() {
        const element = this.el.querySelector('.mdc-tab-bar');
        if (element) {
            this.tabBar = new MDCTabBar(element);
            this.tabBar.listen('MDCTabBar:activated', (ev) => {
                const tabs = this.findTabs();
                tabs.forEach((tab) => { tab.active = false; });
                const selectedIndex = ev.detail.index;
                if (tabs.length > selectedIndex) {
                    tabs[selectedIndex].active = true;
                }
            });
            this.tabBar.activateTab(0);
        }
    }
    componentDidUnload() {
        if (this.tabBar)
            this.tabBar.destroy();
    }
    findTabs() {
        return Array.from(this.el.querySelectorAll('harmonized-tab'));
    }
    render() {
        const tabs = this.findTabs();
        return h(Host, null,
            h("div", { class: "mdc-tab-bar", role: "tablist" },
                h("div", { class: "mdc-tab-scroller" },
                    h("div", { class: "mdc-tab-scroller__scroll-area" },
                        h("div", { class: "mdc-tab-scroller__scroll-content" }, tabs && tabs.map((tab) => h("button", { class: (tab.active ? "mdc-tab mdc-tab--active" : "mdc-tab"), role: "tab", tabindex: "0", "aria-selected": tab.active },
                            h("span", { class: "mdc-tab__content" },
                                tab.icon && h("span", { class: "mdc-tab__icon", "aria-hidden": "true", innerHTML: tab.icon }),
                                tab.label && h("span", { class: "mdc-tab__text-label" }, tab.label)),
                            h("span", { class: (tab.active ? "mdc-tab-indicator mdc-tab-indicator--active" : "mdc-tab-indicator") },
                                h("span", { class: "mdc-tab-indicator__content mdc-tab-indicator__content--underline" })),
                            h("span", { class: "mdc-tab__ripple" }))))))),
            h("div", { class: "tabs__panels", role: "tabpanels" },
                h("slot", null)));
    }
    static get is() { return "harmonized-tabs"; }
    static get originalStyleUrls() { return {
        "$": ["tabs-component.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["tabs-component.css"]
    }; }
    static get contextProps() { return [{
            "name": "store",
            "context": "store"
        }]; }
    static get states() { return {
        "language": {}
    }; }
    static get elementRef() { return "el"; }
}
