import { Component, Prop, h, Element, Event, EventEmitter, Host, State, Listen } from '@stencil/core';
import { MyAppState } from '../../interfaces';
import { Unsubscribe, Store } from '@stencil/redux';
import { setPage } from '../../store/actions/document';
import { isNumber } from 'util';
import tippy, { sticky, Props, Instance } from 'tippy.js';

@Component({
    tag: 'harmonized-image',
    styleUrl: 'image-component.scss'
})
export class ImageComponent {

    @Element() el: HTMLElement

    @Prop() src: string
    @Prop() srcset: string
    @Prop() preload: boolean = false
    @Prop({ reflect: true }) page: number
    @Prop() caption: string
    @Prop() showCaption: boolean
    @Prop() showTooltip: boolean

    @State() loading: boolean = false
    @State() loaded: boolean = false
    @State() failed: boolean = false

    setPage: typeof setPage
    storeUnsubscribe: Unsubscribe

    @State() currentPage: MyAppState["document"]["page"]

    @Prop({ context: "store" }) store: Store

    @Event() imageAdded
    @Event() imageLoad

    private tooltip: Instance<Props>

    componentWillLoad() {

        this.store.mapDispatchToProps(this, { setPage })
        this.storeUnsubscribe = this.store.mapStateToProps(this, (state: MyAppState) => {
            const {
                document: { page: page }
            } = state
            return {
                currentPage: page
            }
        })
    }

    componentDidUnload() {
        this.storeUnsubscribe()
    }

    handleLoad(ev: Event) {

        this.loading = false
        this.loaded = true
        this.failed = false

        this.createTooltip()

        this.imageLoad.emit(ev)
    }

    handleError() {

        this.loading = false
        this.loaded = false
        this.failed = true
    }

    handleClick() {

        if (isNumber(this.page)) {
            this.setPage(this.page)
        }
    }

    componentDidRender() {
        this.imageAdded.emit(this.el)
    }

    createTooltip() {

        if (!this.showTooltip) {
            return undefined
        }

        if (this.loaded && this.caption) {

            if (this.tooltip) {
                this.tooltip.destroy()
                this.tooltip = null
            }

            return this.tooltip = tippy(this.el, {
                appendTo: 'parent',
                theme: 'harmonized-light',
                placement: 'bottom',
                distance: -5,
                animation: 'shift-toward',
                arrow: false,
                sticky: true,
                plugins: [sticky],
                content: this.caption
            })
        }
    }

    render() {

        let className = 'mdc-image-list__item'

        if (this.loading) {
            className += ' is-loading'
        }
        else if (this.loaded) {
            className += ' is-loaded'
        }
        else if (this.failed) {
            className += ' is-error'
        }
        else {
            className += ' is-ghost'
        }

        if (this.page === this.currentPage) {
            className += ' is-active'
        }

        const labelId = `label-page-${this.page}`

        return <Host
            role="button"
            class={className}
            onClick={this.loaded && this.handleClick.bind(this)}
            //title={this.loaded && "Go to page " + (this.page + 1)}
            tabindex={this.loaded && '0'}>

            <div class="mdc-image-list__image-aspect-container">
                <img
                    data-lazy-load
                    src={(this.preload && this.src)}
                    data-src={this.src}
                    //srcset={(this.preload && this.srcset)}
                    class="mdc-image-list__image"
                    onLoad={this.handleLoad.bind(this)}
                    onError={this.handleError.bind(this)}
                    aria-labelledby={labelId}
                    style={{
                        opacity: (this.loaded) ? '1' : '0'
                    }} />
            </div>

            {
                this.showCaption &&
                <div class="mdc-image-list__supporting">
                    <span id={labelId} class="mdc-image-list__label">
                        {this.loaded ? this.caption : <span innerHTML="&nbsp;"></span>}
                    </span>
                </div>
            }

        </Host>
    }
}