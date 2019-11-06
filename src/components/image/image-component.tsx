import { Component, Prop, h, Element, Event, EventEmitter, Host, State, Listen } from '@stencil/core';

@Component({
    tag: 'harmonized-image',
    styleUrl: 'image-component.scss'
})
export class ImageComponent {

    @Element() el: HTMLElement

    @Prop() src: string
    @Prop() srcset: string
    @Prop() class: string
    @Prop() caption: string

    @State() failed: boolean = false

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
        this.el.classList.remove('is-error')

        this.failed = false

        //this.load.emit(ev)
    }

    handleError() {

        this.el.classList.remove('is-observed')
        this.el.classList.remove('is-loading')
        this.el.classList.remove('is-loaded')
        this.el.classList.add('is-error')

        this.failed = true
    }

    render() {

        if (this.failed) {
            return 'error'
        }
        else if (!this.src && !this.srcset) {
            return <harmonized-ghost class="mdc-image-list__item" />
        }
        else {

            return <div class="mdc-image-list__item">
                <div class="mdc-image-list__image-aspect-container">
                    <img
                        class=""
                        onLoad={this.handleLoad.bind(this)}
                        onError={this.handleError.bind(this)} />
                </div>
                <div class="mdc-image-list__supporting">
                    <span class="mdc-image-list__label">{this.caption}</span>
                </div>
            </div>
        }
    }
}