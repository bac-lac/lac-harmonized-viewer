import { Component, Prop, h, Element, Listen, State, Watch } from '@stencil/core';
import 'manifesto.js';
import { Unsubscribe, Store } from '@stencil/redux';
import { MyAppState } from '../../interfaces';
import { setPage } from '../../store/actions/document';
import { MDCRipple } from '@material/ripple';
import { MDCTabBar } from '@material/tab-bar';
import iconClose from '../../assets/material-design-icons/ic_close_18px.svg'
import iconMaximize from '../../assets/material-design-icons/ic_crop_square_24px.svg'
import iconList from '../../assets/material-icons/ic_list_24px.svg'
import iconGrid from '../../assets/material-icons/ic_grid_24px.svg'

@Component({
    tag: 'harmonized-navigation',
    styleUrl: 'navigation-component.scss',
    assetsDir: ''
})
export class NavigationComponent {

    @Element() el: HTMLElement

    @Prop() cols: number = 2
    @Prop() rows: number = 1
    @Prop() placement: PlacementType = 'left'

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

    @State() loadedImageCount: number = 0

    private tabs: MDCTabBar

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

    componentDidLoad() {

        this.tabs = MDCTabBar.attachTo(this.el.querySelector('.mdc-tab-bar'))
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
        this.resize()
    }

    @Listen('resize', { target: 'window' })
    handleResize() {
        this.resize()
    }

    resize() {

        if (this.placement != 'top' && this.placement != 'bottom') {
            return undefined
        }

        // Adjust the height of the navigation to show a specific number of rows
        const item = this.el.querySelector('harmonized-image-list > .is-loaded')
        if (item) {

            const paddingTop = this.getComputedStyle(item, 'padding-top')
            const paddingBottom = this.getComputedStyle(item, 'padding-bottom')

            const marginTop = this.getComputedStyle(item, 'margin-top')
            const marginBottom = this.getComputedStyle(item, 'margin-bottom')

            const paddingY = paddingTop + paddingBottom
            const marginY = marginTop + marginBottom

            // Padding already included in clientHeight
            const rowHeight = (item.clientHeight + marginY)

            const height = (rowHeight * this.rows) + this.getListTopOffset()

            this.el.style.height = `${height}px`
        }
    }

    getListTopOffset() {

        const list = this.el.querySelector('harmonized-image-list')
        if (list) {

            const paddingTop = this.getComputedStyle(list, 'padding-top')
            const paddingBottom = this.getComputedStyle(list, 'padding-bottom')

            const marginTop = this.getComputedStyle(list, 'margin-top')
            const marginBottom = this.getComputedStyle(list, 'margin-bottom')

            return paddingTop + paddingBottom + marginTop + marginBottom
        }
        else {
            return 0
        }
    }

    getComputedStyle(element: Element, name: string) {

        if (!element || !name) {
            return undefined
        }

        const value = window.getComputedStyle(element, null).getPropertyValue(name)

        // Strip units
        const matches = value.match(/(([-0-9\.]+)+)/gi)
        if (matches) {
            return Number(matches[0])
        }
    }

    render() {

        let className = 'mdc-image-list'

        if (this.placement == 'left' || this.placement == 'right') {
            className += ' mdc-image-list--2col'
        }

        return <div class="navigation-content">

            <div class="mdc-tab-bar" role="tablist">
                <div class="mdc-tab-scroller">
                    <div class="mdc-tab-scroller__scroll-area">
                        <div class="mdc-tab-scroller__scroll-content">

                            <button class="mdc-tab mdc-tab--active" role="tab" aria-selected="true" tabindex="0">
                                <span class="mdc-tab__content">
                                    <span
                                        class="mdc-tab__icon"
                                        aria-hidden="true"
                                        innerHTML={iconList} />
                                    {/* <span class="mdc-tab__text-label">Favorites</span> */}
                                </span>
                                <span class="mdc-tab-indicator mdc-tab-indicator--active">
                                    <span class="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
                                </span>
                                <span class="mdc-tab__ripple"></span>
                            </button>

                            <button class="mdc-tab" role="tab" tabindex="0">
                                <span class="mdc-tab__content">
                                    <span
                                        class="mdc-tab__icon"
                                        aria-hidden="true"
                                        innerHTML={iconGrid} />
                                    {/* <span class="mdc-tab__text-label">Images</span> */}
                                </span>
                                <span class="mdc-tab-indicator">
                                    <span class="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
                                </span>
                                <span class="mdc-tab__ripple"></span>
                            </button>

                        </div>
                    </div>
                </div>
            </div>

            <harmonized-image-list class={className}>
                {
                    this.pages.map((page, index) =>

                        <harmonized-image
                            src={page.thumbnail}
                            page={index}
                            caption={page.label}
                            showCaption={true}
                            showTooltip={false}
                            preload={index < 16}
                            onImageLoad={this.handleThumbnailLoad.bind(this)} />
                    )
                }
            </harmonized-image-list>
        </div>
    }
}