import { Component, Prop, h, Element, Event, EventEmitter } from '@stencil/core';
import { getInstance } from '../../utils/utils';
import { icon } from '@fortawesome/fontawesome-svg-core';
import "../../utils/icon-library";

@Component({
    tag: 'hv-toolbar',
    styleUrls: [
        'toolbar-component.scss'
    ]
})
export class HVToolbar {

    @Element() el: HTMLElement;

    @Prop() page: number;
    @Prop() totalPages: number;

    @Event() previous: EventEmitter;
    @Event() next: EventEmitter;

    nextHandler() {
        this.next.emit();
    }

    previousHandler() {
        this.previous.emit();
    }

    fullscreenClick() {
        const root = getInstance(this.el);
        if (root) {
            root.requestFullscreen();
        }
    }

    render() {
        const loading = !Number.isInteger(this.page) || !Number.isInteger(this.totalPages);

        return (loading ? <div></div> :
            <div class="hv-toolbar__content">
                <div class="hv-flex hv-full-width">
                    <div class="hv-flex-align-left">

                        <button class="button" type="button" title="Fullscreen" onClick={this.fullscreenClick.bind(this)}>
                            <span class="icon"></span>
                        </button>

                    </div>
                    <div class="hv-flex-align-right hv-flex">

                        <button class="button" type="button" title="Previous" onClick={this.previousHandler.bind(this)}>
                            <span class="icon" innerHTML={icon({ prefix: 'fas', iconName: 'chevron-left' }).html[0]}></span>
                        </button>

                        <div class="hv-flex hv-flex-align-center">
                            <span>{(this.page + 1)} of {this.totalPages} pages</span>
                        </div>

                        <div class="">
                            <button class="button" type="button" title="Next" onClick={this.nextHandler.bind(this)}>
                                <span class="icon" innerHTML={icon({ prefix: 'fas', iconName: 'chevron-right' }).html[0]}></span>
                            </button>
                        </div>

                    </div>
                </div>
            </div>);
    }
}
