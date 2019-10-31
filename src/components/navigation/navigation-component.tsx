import { Component, Prop, h, Element, Event, Listen, EventEmitter, Watch, State, Host } from '@stencil/core';
import 'manifesto.js';
import { Unsubscribe, Store } from '@stencil/redux';
import { MyAppState } from '../../interfaces';
import { LazyLoading } from '../../services/lazy-service';
import { setPage } from '../../store/actions/document';
import { ScrollbarService } from '../../services/scrollbar-service';

@Component({
    tag: 'hv-navigation',
    styleUrls: ['navigation-component.scss', '../../../node_modules/overlayscrollbars/css/OverlayScrollbars.min.css']
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

    componentDidUnload() {
        this.storeUnsubscribe()
    }

    componentDidRender() {

        // Initialize scrollbars, register new elements with lazy loading
        const inner = this.el.querySelector('.navigation-content') as HTMLElement
        if (inner) {
            this.scrollbars.init(inner)
            LazyLoading.register(inner)
        }

        // Scroll to the active navigation item
        const active = this.el.querySelector('.active')
        if (active) {
            active.scrollIntoView({
                block: 'nearest'
            })
        }
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

    handlePageClick(ev: MouseEvent, page: number) {
        this.setPage(page)
    }

    imageLoad(ev: Event) {

        const image = ev.target as HTMLElement
        if (image) {
            image.classList.remove('is-loading')
            image.classList.add('is-loaded')
        }
    }

    render() {

        const skeleton = Array.apply(null, Array(16)).map(function () { })

        return (
            <Host class={this.loading ? "navigation" : "navigation is-loaded"}>
                <div class="navigation-content">
                    <div class="">
                        <ul class="hv-navigation__list">
                            {(
                                this.pages && this.pages.map((page, index) =>

                                    <li class={(this.page == index) && 'active'}>
                                        <a class="navigation-item" onClick={(ev) => this.handlePageClick(ev, index)}>
                                            <div class="navigation-thumbnail">
                                                <img data-src={page.thumbnail} onLoad={this.imageLoad} alt="" />
                                            </div>
                                            <div class="navigation-label">
                                                {page.label}
                                            </div>
                                        </a>
                                    </li>
                                )
                            )}
                            {(
                                this.loading && skeleton.map(() =>

                                    <li>
                                        <span class="skeleton"></span>
                                    </li>
                                )
                            )}
                        </ul>
                    </div>
                </div>
            </Host>
        )
    }
}