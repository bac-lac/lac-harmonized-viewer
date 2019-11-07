import { Component, Prop, h, Element, Listen, State, Watch } from '@stencil/core';
import 'manifesto.js';
import { Unsubscribe, Store } from '@stencil/redux';
import { MyAppState, DocumentPage } from '../../interfaces';
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

    @State() loadedImageCount: number = 0

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

        if (this.loadedImageCount === 0) {
            this.resize()
        }

        this.loadedImageCount++
    }

    @Listen('resize', { target: 'window' })
    handleResize() {
        this.resize()
    }

    resize() {

        let height = 0

        // Adjust the height of the navigation to show a specific number of rows

        const item = this.el.querySelector('harmonized-image-list > .is-loaded')
        if (item) {

            const paddingTop = Number(window.getComputedStyle(item, null)
                .getPropertyValue('padding-top').replace('px', ''))

            const paddingBottom = Number(window.getComputedStyle(item, null)
                .getPropertyValue('padding-bottom').replace('px', ''))

            const marginTop = Number(window.getComputedStyle(item, null)
                .getPropertyValue('margin-top').replace('px', ''))

            const marginBottom = Number(window.getComputedStyle(item, null)
                .getPropertyValue('margin-bottom').replace('px', ''))

            const rowHeight = (item.clientHeight + paddingTop + paddingBottom + marginTop + marginBottom)

            // Substract paddingBottom once at the end in order to cut in half the vertical padding of the last row
            height = (rowHeight * this.rows) + this.getListTopOffset() + paddingBottom + marginBottom
        }

        this.el.style.minHeight = height + 'px'
    }

    syncLazyLoadingClass(element: Element) {

        if (!element) {
            return undefined
        }

        const classNames = ['is-loading', 'is-loaded', 'is-observed', 'is-ghost', 'is-error']

        // const parent = element.closest('li')
        // if (parent) {

        //     classNames.forEach((className) => {

        //         if (element.classList.contains(className)) {
        //             parent.classList.add(className)
        //         }
        //         else {
        //             parent.classList.remove(className)
        //         }
        //     })
        // }
    }

    getListTopOffset(): number {

        let marginTop = 0

        const borderWidth = Number(window.getComputedStyle(this.el, null)
            .getPropertyValue('border-top-width').replace('px', ''))

        const list = this.el.querySelector('harmonized-image-list')
        if (list) {

            marginTop = Number(window.getComputedStyle(list, null)
                .getPropertyValue('margin-top').replace('px', ''))
        }

        return (marginTop + borderWidth)
    }

    render() {

        return <div class="navigation-content">
            <harmonized-image-list class="mdc-image-list">
                {
                    this.pages.map((page, index) =>
                        <harmonized-image
                            src={page.thumbnail}
                            caption={page.label}
                            page={index}
                            preload={(index < 16)}
                            onImageLoad={this.handleThumbnailLoad.bind(this)} />)
                }
            </harmonized-image-list>
        </div>
    }
}