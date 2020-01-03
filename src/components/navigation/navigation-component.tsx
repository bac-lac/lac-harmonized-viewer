import { Component, Prop, h, Element, Listen, State, Watch, Host } from '@stencil/core';
import 'manifesto.js';
import { Unsubscribe, Store } from '@stencil/redux';
import { viewItem } from '../../store/actions/viewport';
import { t } from '../../services/i18n-service';

@Component({
    tag: 'harmonized-navigation',
    styleUrl: 'navigation-component.scss',
    assetsDir: ''
})
export class NavigationComponent {

    @Element() el: HTMLElement

    @Prop() cols: number = 10
    @Prop() rows: number = 1

    @Prop() autoResize: boolean = false

    @Watch('rows')
    handleRowsChange() {
        this.resize()
    }

    viewItem: typeof viewItem
    storeUnsubscribe: Unsubscribe

    @State() currentItemIndex: MyAppState["viewport"]["itemIndex"] = 0
    @State() items: MyAppState["viewport"]["items"] = []

    @Prop({ context: "store" }) store: Store

    @State() loadedImageCount: number = 0

    private imageList: HTMLElement

    componentWillLoad() {

        this.store.mapDispatchToProps(this, { viewItem })
        this.storeUnsubscribe = this.store.mapStateToProps(this, (state: MyAppState) => {
            const {
                viewport: { itemIndex, items }
            } = state
            return {
                currentItemIndex: itemIndex,
                items
            }
        })
    }

    componentDidLoad() {
        this.imageList = this.el.querySelector('harmonized-image-list')

        this.resize()
        this.scaleScroll();
    }

    componentDidUnload() {
        this.storeUnsubscribe()
    }

    @Listen('keydown', { target: 'window' })
    handleKeyDown(ev: KeyboardEvent) {

        // Handle keyboard previous/next navigation
        if (ev.key === 'ArrowRight' || ev.key == 'ArrowDown') {
            this.viewItem(this.currentItemIndex + 1)
        }
        else if (ev.key === 'ArrowLeft' || ev.key == 'ArrowUp') {
            this.viewItem(this.currentItemIndex - 1)
        }
    }

    handleThumbnailClick(page: number) {
        this.viewItem(page)
    }

    handleThumbnailLoad(ev: Event) {
        if (this.autoResize) {
            this.resize()
        }
    }

    @Watch('currentItemIndex')
    handlePageChange() {
        if (this.items.length > this.currentItemIndex) {
            const image: HTMLElement = this.el.querySelector(`harmonized-image[page="${this.currentItemIndex}"]`);
            if (image) {
                this.scaleScroll()
                //image.scrollIntoView({ behavior: "smooth", block: "nearest" })
            }
        }
    }

    @Listen('resize', { target: 'window' })
    handleResize() {
        if (this.autoResize) {
            this.resize()
        }
    }

    // Keeps the select item visible as a user goes through the thumbnail list
    scaleScroll() {
        const currentItem = (this.el.querySelector(`harmonized-image[page="${this.currentItemIndex}"]`) as HTMLElement);
        if (this.imageList && currentItem) {
            // The value 4 in calculations is the margin
            // Image is past the left border of the overflow
            if (currentItem.offsetLeft < this.imageList.scrollLeft) {
                this.imageList.scrollLeft = this.imageList.scrollLeft - currentItem.clientWidth - 4;
            }
            // Image is past the right border of the overflow
            else if (currentItem.offsetLeft + currentItem.clientWidth > this.imageList.scrollLeft + this.imageList.clientWidth) {
                this.imageList.scrollLeft += currentItem.clientWidth + 4;
            }
        }
    }

    resize() {

        // Adjust the height of the navigation to show a specific number of rows
        if (this.imageList) {
            this.el.style.height = `${this.imageList.offsetHeight}px`
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
        if (this.items.length <= 1) {
            return null;
        }

        const className = `mdc-image-list mdc-image-list--horizontal mdc-image-list--${this.cols}col`

        return  <harmonized-image-list class={className} tabindex={0}>
                    {
                        this.items.map((page, index) =>

                            <harmonized-image
                                src={page.thumbnail}
                                contentType={page.contentType}
                                page={index}
                                caption={t(page.label)}
                                show-caption={false}
                                show-tooltip={false}
                                preload={index < 16}
                                onImageLoad={this.handleThumbnailLoad.bind(this)}
                            />
                        )
                    }
                </harmonized-image-list>
    }
}