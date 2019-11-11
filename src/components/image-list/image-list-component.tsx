import { Component, h, Element, State, Listen, Host, Prop, Watch } from '@stencil/core';
import tippy, { sticky } from 'tippy.js';

@Component({
    tag: 'harmonized-image-list',
    styleUrl: 'image-list-component.scss'
})
export class ImageListComponent {

    @Element() el: HTMLElement

    @State() children: number = 0

    private observer: IntersectionObserver

    componentDidLoad() {
        this.observer = this.createObserver()
        this.bind()
    }

    componentDidUnload() {
        this.observer.disconnect()
    }

    componentDidRender() {
        this.bind()
    }

    @Listen('imageAdded', { capture: true })
    handleImageAdded() {
        this.children = this.el.children.length
    }

    createObserver() {
        return new IntersectionObserver(this.handleObserve)
    }

    bind() {

        const images: HTMLElement[] = Array.from(
            this.el.querySelectorAll('img[data-lazy-load]'))

        images.forEach((image) => this.bindOne(image))
    }

    bindOne(element: Element) {

        if (!element) {
            return undefined
        }

        if (!this.observer) {
            this.observer = this.createObserver()
        }

        if (element.classList.contains('is-observed') === false) {
            this.observer.observe(element)
            element.classList.add('is-observed')
        }
    }

    handleObserve(entries: IntersectionObserverEntry[], observer: IntersectionObserver) {

        if (!entries || !observer) {
            return undefined
        }

        entries.forEach((entry) => {

            let image = entry.target as HTMLImageElement
            if (image) {

                if (entry.isIntersecting) {

                    image.classList.remove('is-observed')

                    image.src = image.dataset.src
                    //image.srcset = this.srcset

                    observer.unobserve(image)
                }
            }
        })
    }

    // render() {
    //     return <Host />
    // }
}