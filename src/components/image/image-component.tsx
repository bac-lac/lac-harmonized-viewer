import { Component, Prop, h, Element, Event, EventEmitter, Host, State, Listen } from '@stencil/core';
import { MyAppState } from '../../interfaces';
import { Unsubscribe, Store } from '@stencil/redux';
import { setPage } from '../../store/actions/document';
import { isNumber } from 'util';

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

    @State() loading: boolean = false
    @State() loaded: boolean = false
    @State() failed: boolean = false

    setPage: typeof setPage
    storeUnsubscribe: Unsubscribe

    @State() currentPage: MyAppState["document"]["page"]

    @Prop({ context: "store" }) store: Store

    @Event() imageAdded
    @Event() imageLoad

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
            class={className}
            onClick={this.loaded && this.handleClick.bind(this)}
            title={this.loaded && "Go to page " + (this.page + 1)}
            role="button"
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

            <div class="mdc-image-list__supporting" title={this.loaded && this.caption}>
                <span id={labelId} class="mdc-image-list__label">
                    {this.loaded ? this.caption : <span innerHTML="&nbsp;"></span>}
                </span>
            </div>

        </Host>
    }
}