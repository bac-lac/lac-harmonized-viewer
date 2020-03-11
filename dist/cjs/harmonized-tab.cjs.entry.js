'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core = require('./core-9a4b3343.js');

const TabComponent = class {
    constructor(hostRef) {
        core.registerInstance(this, hostRef);
    }
    render() {
        let className = '';
        if (this.active)
            className += ' active';
        return core.h(core.Host, { class: className });
    }
    get el() { return core.getElement(this); }
    static get style() { return "harmonized-tab{width:100%;height:100%;overflow-y:auto;display:none}harmonized-tab.active{display:inline-block}"; }
};

exports.harmonized_tab = TabComponent;
