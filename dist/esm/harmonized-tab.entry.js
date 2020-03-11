import { r as registerInstance, h, c as getElement, H as Host } from './core-37f3e3a6.js';

const TabComponent = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        let className = '';
        if (this.active)
            className += ' active';
        return h(Host, { class: className });
    }
    get el() { return getElement(this); }
    static get style() { return "harmonized-tab{width:100%;height:100%;overflow-y:auto;display:none}harmonized-tab.active{display:inline-block}"; }
};

export { TabComponent as harmonized_tab };
