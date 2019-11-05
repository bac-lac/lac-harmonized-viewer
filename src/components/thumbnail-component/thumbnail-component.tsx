import { Component, Prop, h, Element, Event, EventEmitter, Host, State, Listen } from '@stencil/core';

@Component({
    tag: 'harmonized-thumbnail',
    styleUrl: 'thumbnail-component.scss'
})
export class ThumbnailComponent {

    @Element() el: HTMLElement

    @Prop() src: string
    @Prop() srcset: string
    @Prop() class: string
    @Prop() ghost: boolean = false
    @Prop() imgClass: string
    @Prop() alt: string

    @State() failed: boolean = false

    @Event() load: EventEmitter
    @Event() error: EventEmitter

    componentDidLoad() {

        const image = this.el.querySelector('img')
        if (image) {

            if ("IntersectionObserver" in window) {

                let lazyImageObserver = new IntersectionObserver((entries, observer) => {
                    entries.forEach((entry) => {

                        let image = entry.target as HTMLImageElement
                        if (image) {

                            if (entry.isIntersecting) {

                                this.el.classList.remove('is-loaded')
                                this.el.classList.add('is-loading')

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

    handleLoad(ev: Event) {

        this.el.classList.remove('is-observed')
        this.el.classList.remove('is-loading')
        this.el.classList.add('is-loaded')
        this.el.classList.remove('is-ghost')
        this.el.classList.remove('is-error')

        this.failed = false

        this.load.emit(ev)
    }

    handleError() {

        this.el.classList.remove('is-observed')
        this.el.classList.remove('is-loading')
        this.el.classList.remove('is-loaded')
        this.el.classList.remove('is-ghost')
        this.el.classList.add('is-error')

        this.failed = true
    }

    componentWillRender() {

        if (this.failed) {
            this.el.classList.add('is-error')
        }
        else {
            this.el.classList.remove('is-error')
        }

        if (this.ghost) {
            this.el.classList.add('is-ghost')
        }
        else {
            this.el.classList.remove('is-ghost')
        }
    }

    render() {

        if (this.failed) {
            return <div class="navigation-item"></div>
        }
        else if (this.ghost) {
            return <div class="navigation-item">
                <div class="mdc-image-list__image-aspect-container"></div>
                <div class="mdc-image-list__supporting">
                    <span class="mdc-image-list__label">&nbsp;</span>
                </div>
            </div>
        }
        else {
            return <img
                class={this.imgClass}
                onLoad={this.handleLoad.bind(this)}
                onError={this.handleError.bind(this)}
                alt={this.alt} />
        }
    }
}