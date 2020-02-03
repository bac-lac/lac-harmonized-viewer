import { Component, Prop, h, Element, Event, EventEmitter, Host, State, Method, Listen } from '@stencil/core';
import { Unsubscribe, Store } from '@stencil/redux';
import { viewItem } from '../../store/actions/viewport';
import { isNumber } from 'util';
import { resolveViewportType } from '../../utils/viewport';
import tippy, { sticky, Props, Instance } from 'tippy.js';
import { t } from '../../services/i18n-service';

@Component({
    tag: 'harmonized-image',
    styleUrl: 'image-component.scss'
})
export class ImageComponent {

    @Element() el: HTMLElement

    @Prop() src: string
    @Prop() contentType: string
    @Prop() srcset: string
    @Prop() preload: boolean = false
    @Prop({ reflect: true }) page: number
    @Prop() caption: string = "" // also title
    @Prop() showCaption: boolean
    @Prop() showTooltip: boolean

    @State() loading: boolean = false
    @State() loaded: boolean = false
    @State() failed: boolean = false
    @State() props: string[] = []

    viewItem: typeof viewItem
    storeUnsubscribe: Unsubscribe

    @State() currentItemIndex: number

    @Prop({ context: "store" }) store: Store

    @Event() imageAdded
    @Event() imageLoad

    private tooltip: Instance<Props>

    @Method()
    async addImageProperty(value: string): Promise<void> {
        if (!this.props.find(prop => prop == value)) {
            this.props = [ ...this.props, value];
        }
    }

    @Method()
    async removeImageProperty(value: string): Promise<void> {
        if (this.props.find(prop => prop == value)) {
            this.props = this.props.filter(prop => prop != value);
        }
    }


    componentWillLoad() {

        this.store.mapDispatchToProps(this, { viewItem })
        this.storeUnsubscribe = this.store.mapStateToProps(this, (state: MyAppState) => {
            const {
                viewport: { itemIndex }
            } = state
            return {
                currentItemIndex: itemIndex
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
            this.viewItem(this.page)
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
                theme: 'harmonized-dark',
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

    // Temporary thumbnail placeholder solution for pdf, audio and video content types.
    determineThumbnail(viewportType: string) {
        // Replace links with CDN hosted images pre-prod

        //console.log(`Rendering thumbnail for page ${this.page} with content type=${this.contentType} and src=${this.src}`);

        // No thumbnail placeholders
        if (this.src === null || this.src === '')
            return 'https://baclac.blob.core.windows.net/cdn/assets/placeholder-unavailable.jpeg';

        switch (viewportType) {
            case 'image':
                return this.src;

            case 'pdf':
                return 'https://baclac.blob.core.windows.net/cdn/assets/placeholder-pdf.jpeg';

            case 'video':
                return 'https://baclac.blob.core.windows.net/cdn/assets/placeholder-video.jpeg';

            case 'audio':
                return 'https://baclac.blob.core.windows.net/cdn/assets/placeholder-audio.jpeg';

            default:
                return 'https://baclac.blob.core.windows.net/cdn/assets/placeholder-unavailable.jpeg';
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

        if (this.page === this.currentItemIndex) {
            className += ' is-active'
        }

        const labelId = `label-page-${this.page}`

        const viewportType: string = resolveViewportType(this.contentType);
        const thumbnailSrc = this.determineThumbnail(viewportType);

        return <Host
            role="button"
            class={className}
            onClick={this.loaded && this.handleClick.bind(this)}
            title={this.caption == "" ? t('untitled') : this.caption}>

            <div class="mdc-image-list__image-aspect-container" role="list">
                <img
                    data-lazy-load
                    src={(this.preload && thumbnailSrc)}
                    data-src={thumbnailSrc}
                    alt={this.caption == "" ? t('untitled') : this.caption}
                    //srcset={(this.preload && this.srcset)}
                    class="mdc-image-list__image mdc-elevation--z2"
                    onLoad={this.handleLoad.bind(this)}
                    onError={this.handleError.bind(this)}
                    //aria-labelledby={labelId}
                    style={{
                        opacity: (this.loaded) ? '1' : '0'
                    }}
                    role="listitem"
                />

                <ul class="inv" role="listitem">
                    {this.props.map((prop) => 
                        <li>{prop}</li>
                    )}
                </ul>
            </div>

            {/*
                this.showCaption &&
                <div class="mdc-image-list__supporting">
                    <span id={labelId} class="mdc-image-list__label">
                        {this.loaded ? this.caption : <span innerHTML="&nbsp;"></span>}
                    </span>
                </div>
            */}

        </Host>
    }
}