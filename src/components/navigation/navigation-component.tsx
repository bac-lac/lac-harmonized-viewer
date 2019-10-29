import { Component, Prop, h, Element, Event, Listen, EventEmitter, Watch, State } from '@stencil/core';
import OverlayScrollbars from 'overlayscrollbars';
import 'manifesto.js';
import { Unsubscribe, Store } from '@stencil/redux';
import { MyAppState } from '../../interfaces';
import { LazyLoading } from '../../services/lazy-service';
import { setPage } from '../../store/actions/document';

@Component({
    tag: 'hv-navigation',
    styleUrls: ['navigation-component.scss', '../../../node_modules/overlayscrollbars/css/OverlayScrollbars.min.css']
})
export class NavigationComponent {

    @Element() el: HTMLElement

    setPage: typeof setPage
    storeUnsubscribe: Unsubscribe

    @State() page: MyAppState["document"]["page"]
    @State() pages: MyAppState["document"]["pages"]

    @Prop({ context: "store" }) store: Store

    private scrollbars: OverlayScrollbars

    componentWillLoad() {

        this.store.mapDispatchToProps(this, { setPage })
        this.storeUnsubscribe = this.store.mapStateToProps(this, (state: MyAppState) => {
            const {
                document: { page: page, pages: pages }
            } = state
            return {
                page: page,
                pages: pages
            }
        })
    }

    componentDidUnload() {
        this.storeUnsubscribe()
    }

    componentDidRender() {

        // Initialize custom scrollbars
        if (this.scrollbars) {
            this.scrollbars.destroy()
        }
        this.scrollbars = OverlayScrollbars(
            this.el.querySelector('.navigation-content'), {})

        const active = this.el.querySelector('.navigation-content .active')
        if (active) {
            active.scrollIntoView({
                block: 'nearest'
            })
        }

        LazyLoading.register(this.el)
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
        const pages = (this.pages.length > 0) ? this.pages : skeleton

        return (
            <div class="navigation-content">
                <div class="">
                    <ul class="hv-navigation__list">
                        {(
                            pages &&
                            pages.map((page, index) =>

                                <li class={(this.page == index) && "active"}>
                                    <a class="navigation-item" onClick={(ev) => this.handlePageClick(ev, index)}>
                                        {
                                            page && page.thumbnail ?
                                                <img data-src={page.thumbnail} onLoad={this.imageLoad} alt="" /> :
                                                <img data-src />
                                        }
                                    </a>
                                </li>
                            )
                        )}
                    </ul>
                </div>
            </div>
        );
    }
}