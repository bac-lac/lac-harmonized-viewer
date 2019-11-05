import { Component, Prop, h, Element, Listen, State, Watch } from '@stencil/core';
import 'manifesto.js';
import { Unsubscribe, Store } from '@stencil/redux';
import { MyAppState } from '../../interfaces';
import { setPage } from '../../store/actions/document';

@Component({
    tag: 'harmonized-navigation',
    styleUrl: 'navigation-component.scss'
})
export class NavigationComponent {

    @Element() el: HTMLElement

    @Prop() cols: number = 2
    @Prop() rows: number = 1

    @Watch('rows')
    handleRowsChange() {
        this.resize()
    }

    setPage: typeof setPage
    storeUnsubscribe: Unsubscribe

    @State() loading: MyAppState["document"]["loading"]
    @State() page: MyAppState["document"]["page"]
    @State() pages: MyAppState["document"]["pages"]

    @Prop({ context: "store" }) store: Store

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
        this.resize()
    }

    componentDidUnload() {
        this.storeUnsubscribe()
    }

    componentDidRender() {
        this.resize()
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

    handleThumbnailClick(page: number) {
        this.setPage(page)
    }

    handleThumbnailLoad(ev: Event) {
        this.syncLazyLoadingClass(ev.currentTarget as HTMLElement)
    }

    @Listen('resize', { target: 'window' })
    handleResize() {
        this.resize()
    }

    resize() {

        const item = this.el.querySelector('.mdc-image-list__item')
        if (item) {

            // Adjust the height of the navigation to show a specific number of rows

            const paddingTop = Number(window.getComputedStyle(item, null)
                .getPropertyValue('padding-top').replace('px', ''))

            const paddingBottom = Number(window.getComputedStyle(item, null)
                .getPropertyValue('padding-bottom').replace('px', ''))

            const marginBottom = Number(window.getComputedStyle(item, null)
                .getPropertyValue('margin-bottom').replace('px', ''))

            const rowHeight = (item.clientHeight + paddingTop + paddingBottom + marginBottom)

            // Substract paddingBottom once at the end in order to cut in half the vertical padding of the last row
            const height = (rowHeight * this.rows) + this.getListTopOffset() + paddingBottom + marginBottom

            this.el.style.minHeight = height + 'px'
        }
    }

    private syncLazyLoadingClass(element: HTMLElement) {

        if (!element) {
            return undefined
        }

        const classNames = ['is-loading', 'is-loaded', 'is-observed', 'is-ghost', 'is-error']

        const parent = element.closest('li')
        if (parent) {

            classNames.forEach((className) => {

                if (element.classList.contains(className)) {
                    parent.classList.add(className)
                }
                else {
                    parent.classList.remove(className)
                }
            })
        }
    }

    private getListTopOffset(): number {

        const list = this.el.querySelector('.mdc-image-list')
        if (list) {

            const margin = Number(window.getComputedStyle(list, null)
                .getPropertyValue('margin-top').replace('px', ''))

            const borderWidth = Number(window.getComputedStyle(this.el, null)
                .getPropertyValue('border-top-width').replace('px', ''))

            return margin + borderWidth
        }
        else {
            return 0
        }
    }

    render() {

        const hasPages = this.pages && this.pages.length > 0
        const skeleton = Array.apply(null, Array(16)).map(function () { })

        return (
            <div class="navigation-content">
                <ul class="mdc-image-list navigation-list">
                    {
                        (hasPages) ? this.pages.map((page, index) => (

                            <li class={(this.page === index ? "mdc-image-list__item active" : "mdc-image-list__item")}>
                                <a class="navigation-item" title={page.label} onClick={this.handleThumbnailClick.bind(this, index)}>
                                    <div class="mdc-image-list__image-aspect-container">

                                        <harmonized-thumbnail
                                            src={page.thumbnail}
                                            imgClass="mdc-image-list__image"
                                            onLoad={this.handleThumbnailLoad.bind(this)}
                                            alt={page.label} />

                                    </div>
                                    <div class="mdc-image-list__supporting">
                                        <span class="mdc-image-list__label">{page.label}</span>
                                    </div>
                                </a>
                            </li>

                        )) : skeleton.map(() => (
                            <li class="mdc-image-list__item is-ghost">
                                <harmonized-thumbnail ghost />
                            </li>
                        ))
                    }
                </ul>
            </div>
        )
    }
}