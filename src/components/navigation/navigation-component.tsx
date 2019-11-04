import { Component, Prop, h, Element, Listen, State, Host } from '@stencil/core';
import 'manifesto.js';
import { Unsubscribe, Store } from '@stencil/redux';
import { MyAppState } from '../../interfaces';
import { Lazy } from '../../services/lazy-service';
import { setPage } from '../../store/actions/document';
import { ScrollbarService } from '../../services/scrollbar-service';

@Component({
    tag: 'hv-navigation',
    styleUrls: [
        'navigation-component.scss',
        '../../../node_modules/overlayscrollbars/css/OverlayScrollbars.min.css'
    ]
})
export class NavigationComponent {

    @Element() el: HTMLElement
    setPage: typeof setPage
    storeUnsubscribe: Unsubscribe

    @State() loading: MyAppState["document"]["loading"]
    @State() page: MyAppState["document"]["page"]
    @State() pages: MyAppState["document"]["pages"]

    @Prop({ context: "store" }) store: Store

    scrollbars: ScrollbarService

    constructor() {
        this.scrollbars = new ScrollbarService()
    }

    componentWillLoad() {

        this.store.mapDispatchToProps(this, { setPage })
        this.storeUnsubscribe = this.store.mapStateToProps(this, (state: MyAppState) => {
            const {
                document: { loading: loading, page: page, pages: pages }
            } = state
            return {
                loading: loading,
                page: page,
                pages: pages
            }
        })
    }

    componentDidLoad() {
        // Initialize scrollbars
        const inner = this.el.querySelector('.navigation-content') as HTMLElement
        if (inner) {
            this.scrollbars.init(inner)
        }

        // Scroll to the active navigation item
        // const active = this.el.querySelector('.active')
        // if (active) {
        //     active.scrollIntoView({
        //         block: 'nearest'
        //     })
        // }
    }

    componentDidUnload() {
        this.storeUnsubscribe()
    }

    @Listen('keydown', { target: 'window' })
    handleKeyDown(ev: KeyboardEvent) {

        // Handle keyboard previous/next navigation
        if (ev.key === 'ArrowRight' || ev.key == 'ArrowDown') {
            this.setPage(this.page + 1)
        }
        else if (ev.key === 'ArrowLeft' || ev.key == 'ArrowUp') {
            this.setPage(this.page - 1)
        }
    }

    handlePageClick(page: number) {
        this.setPage(page)
    }

    imageLoad(ev: Event) {

        const image = ev.target as HTMLElement
        if (image) {
            image.classList.remove('is-loading')
            image.classList.add('is-loaded')
        }
    }

    componentDidRender() {

        // Register new elements with lazy loading
        const navigationContent = this.el.querySelector('.navigation-content') as HTMLElement
        if (navigationContent) {
            Lazy.register(navigationContent)
        }

        // const thumbnail = this.el.querySelector('img.is-loaded') as HTMLImageElement
        // if (thumbnail) {
        //     const li = thumbnail.closest('li')
        //     if (li) {
        //         this.el.style.minHeight = (li.clientHeight + 30) + 'px'
        //     }
        // }
    }

    render() {

        const hasPages = this.pages && this.pages.length > 0
        const skeleton = Array.apply(null, Array(16)).map(function () { })

        return (
            <Host class={hasPages ? 'navigation is-loaded' : 'navigation'}>
                <div class="navigation-content">
                    <ul class="mdc-image-list navigation-list">
                        {
                            (hasPages) ?
                                this.pages.map((page, index) => (

                                    <li class={(this.page === index ? "mdc-image-list__item active" : "mdc-image-list__item")}>
                                        <a class="navigation-item" title={page.label} onClick={this.handlePageClick.bind(this, index)}>
                                            <div class="mdc-image-list__image-aspect-container">
                                                <img class="mdc-image-list__image" data-src={page.thumbnail} onLoad={this.imageLoad.bind(this)} /></div>
                                            <div class="mdc-image-list__supporting">
                                                <span class="mdc-image-list__label">{page.label}</span>
                                            </div>
                                        </a>
                                    </li>
                                )) :
                                skeleton.map(() => (
                                    <li>
                                        <span class="skeleton"></span>
                                    </li>
                                ))
                        }
                    </ul>

                </div>
            </Host>
        )
    }
}