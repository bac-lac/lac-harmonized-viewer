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

    componentDidLoad() {

        const image = this.el.querySelector('img')
        if (image) {

            if ("IntersectionObserver" in window) {

                let lazyImageObserver = new IntersectionObserver((entries, observer) => {
                    entries.forEach((entry) => {

                        let image = entry.target as HTMLImageElement
                        if (image) {

                            if (entry.isIntersecting) {

                                this.loading = true

                                image.src = this.src
                                //image.srcset = this.srcset

                                lazyImageObserver.unobserve(image)
                                this.el.classList.remove('is-observed')
                            }
                        }
                    })
                })

                lazyImageObserver.observe(image)
                this.el.classList.add('is-observed')
            }

        } else {
            // Possibly fall back to a more compatible method here
        }
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

    render() {

        if (this.failed) {
            return 'error'
        }
        else {

            let className = 'mdc-image-list__item'

            if (this.loading) {
                className += ' is-loading'
            }
            else if (this.loaded) {
                className += ' is-loaded'
            }
            else {
                className += ' is-ghost'
            }

            if (this.page === this.currentPage) {
                className += ' is-active'
            }

            return <Host
                class={className}
                onClick={this.handleClick.bind(this)}
                title={"Go to page " + (this.page + 1)}
                role="button"
                tabindex="0">

                <div class="mdc-image-list__image-aspect-container">
                    <img
                        src={(this.preload && this.src)}
                        //srcset={(this.preload && this.srcset)}
                        class="mdc-image-list__image"
                        onLoad={this.handleLoad.bind(this)}
                        onError={this.handleError.bind(this)} />
                </div>

                <div class="mdc-image-list__supporting" title={this.loaded && this.caption}>
                    <span class="mdc-image-list__label">
                        {this.loaded ? this.caption : <span innerHTML="&nbsp;"></span>}
                    </span>
                </div>

            </Host>
        }
    }
}