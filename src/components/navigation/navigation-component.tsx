import { Component, Prop, h, Element, Listen, State, Watch, Host } from '@stencil/core';
import 'manifesto.js';
import { Unsubscribe, Store } from '@stencil/redux';
import { setPage } from '../../store/actions/document';
import { label } from '../../services/i18n-service';

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
    @Prop() theme: string

    @Watch('rows')
    handleRowsChange() {
        this.resize()
    }

    setPage: typeof setPage
    storeUnsubscribe: Unsubscribe

    @State() loading: MyAppState["document"]["loading"]
    @State() language: MyAppState["document"]["language"]
    @State() page: MyAppState["document"]["page"]
    @State() pages: MyAppState["document"]["pages"]

    @Prop({ context: "store" }) store: Store

    @State() loadedImageCount: number = 0

    componentWillLoad() {

        this.store.mapDispatchToProps(this, { setPage })
        this.storeUnsubscribe = this.store.mapStateToProps(this, (state: MyAppState) => {
            const {
                document: { language, loading, page, pages }
            } = state
            return {
                language,
                loading,
                page,
                pages
            }
        })
    }

    componentDidUnload() {
        this.storeUnsubscribe()
    }

    componentDidLoad() {
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

    @Watch('page')
    handlePageChange() {
        if (this.pages && this.pages.length > this.page) {
            const image: HTMLElement = this.el.querySelector('harmonized-image[page="' + this.page + '"]')
            if (image) {
                image.scrollIntoView({ behavior: "smooth", block: "nearest" })
            }
        }
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

        return <Host class={this.theme}>
            <div class="navigation-content">

                <harmonized-image-list class={className}>
                    {
                        this.pages.map((page, index) =>

                            <harmonized-image
                                src={page.thumbnail}
                                page={index}
                                caption={label(page.label)}
                                show-caption={true}
                                show-tooltip={false}
                                preload={index < 16}
                                onImageLoad={this.handleThumbnailLoad.bind(this)} />
                        )
                    }
                </harmonized-image-list>
            </div>
        </Host>
    }
}