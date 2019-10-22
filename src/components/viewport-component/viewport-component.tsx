import { Component, Element, h, Prop, Event, EventEmitter, Watch, Method, Listen, State } from '@stencil/core';
import '../../utils/manifest';

@Component({
    tag: 'hv-viewport',
    styleUrls: [
        'viewport-component.scss',
        '../../../node_modules/animate.css/animate.min.css']
})
export class ViewportComponent {

    @Element() el: HTMLElement;

    page: number = 0;
    totalPages: number = 0;

    //@Prop() url: string;

    @Event() manifestLoaded: EventEmitter;
    @Event() canvasLoaded: EventEmitter;
    @Event() pageLoaded: EventEmitter;


    @Listen('nextLoad')
    onNextLoad(event: CustomEvent) {
        console.log('nextload');
    }



    private buttonPrevious: HTMLButtonElement;
    private buttonNext: HTMLButtonElement;

    @Method()
    async addOverlay(x: number, y: number) {

    }



    @Watch('page')
    pageHandler() {
        this.buttonPrevious.disabled = (this.page === 0);
        this.buttonNext.disabled = (this.page === this.totalPages - 1);
    }

    private handleCanvasLoad(tiledImage: any, callback: () => any) {

        if (tiledImage.getFullyLoaded()) {
            setTimeout(callback, 1); // So both paths are asynchronous
        } else {
            tiledImage.addOnceHandler('fully-loaded-change', function () {
                callback(); // Calling it this way keeps the arguments consistent (if we passed callback into addOnceHandler it would get an event on this path but not on the setTimeout path above)
            });
        }
    }



    // private drawShadow() {

    //     var shadow = document.createElement('div');
    //     shadow.style.backgroundColor = 'transparent';

    //     var bounds = this.openseadragon.world.getItemAt(0).getBounds();

    //     shadow.style.width = bounds.width.toString() + 'px';
    //     shadow.style.height = bounds.height.toString() + 'px';
    //     shadow.style.boxShadow = '5px 5px 12px 3px rgba(76, 86, 106, 0.3)';

    //     this.openseadragon.addOverlay(shadow, bounds, 'CENTER');

    // }

    handlePreviousClick(ev: MouseEvent) {

        // const page = this.openseadragon.currentPage();
        // if (page > 0) {
        //     this.openseadragon.goToPage(page - 1);
        // }
    }

    handleNextClick(ev: MouseEvent) {

        // const page = this.openseadragon.currentPage();
        // const totalPages = this.openseadragon.tileSources.length;
        // if (page < (totalPages - 1)) {
        //     this.openseadragon.goToPage(page + 1);
        // }
    }

    render() {
        return <div class="hv-viewport">
            <button type="button" class="bx--btn bx--btn--secondary bx--btn--icon-only hv-navigation__prev" onClick={this.handlePreviousClick.bind(this)}>
                <slot name="viewport-previous">
                    <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32" aria-hidden="true"><path d="M10 16L20 6l1.4 1.4-8.6 8.6 8.6 8.6L20 26z"></path><title>Chevron left</title></svg>
                </slot>
            </button>
            <div class="viewport-document">
                {this.renderDocument()}
            </div>
            <button type="button" class="bx--btn bx--btn--secondary bx--btn--icon-only hv-navigation__next" onClick={this.handleNextClick.bind(this)}>
                <slot name="viewport-next">
                    <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32" aria-hidden="true"><path d="M22 16L12 26l-1.4-1.4 8.6-8.6-8.6-8.6L12 6z"></path><title>Chevron right</title></svg>
                </slot>
            </button>
        </div>;
    }

    renderDocument() {
        return this.renderOpenSeadragon();
    }

    renderOpenSeadragon() {
        return <harmonized-viewer-openseadragon></harmonized-viewer-openseadragon>;
    }
}