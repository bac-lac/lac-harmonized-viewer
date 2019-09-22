import "manifesto.js";
import { BaseComponent, Component } from "./base.component";
import { ManifestLoad } from "../events/manifest-load.event";
import { PageLoad } from "../events/page-load.event";
import { AspectRatio } from "../common/aspect-ratio";
import { MathHelpers } from "../helpers/math.helper";
import { PageRequest } from "../events/page-request.event";
import { HarmonizedViewer } from "..";

export class CanvasListComponent extends BaseComponent implements Component {

    private list: HTMLElement;
    private lazyLoadObserver: IntersectionObserver;

    constructor(instance: HarmonizedViewer) {
        super(instance);
        this.lazyLoadObserver = new IntersectionObserver(this.observeLazyLoading);
    }

    create() {
        this.list = document.createElement('ul');
        this.list.className = 'hv-image-list mdc-image-list';
        return this.list;
    }

    async bind() {
        this.instance.on('manifest-load', (event: ManifestLoad) => this.manifestLoad(event));

        this.addListener('click', '.hv-thumbnail', (target: HTMLElement) => {
            const page = parseInt(target.getAttribute('data-page'));
            this.setActive(page);
            this.instance.publish('page-request', new PageRequest(page));
        });
    }

    protected manifestLoad(event: ManifestLoad) {

        if (!event) {
            return undefined;
        }

        const sequence = event.manifest.getSequenceByIndex(0);
        const canvases = sequence.getCanvases();

        // Calculate the median aspect ratio for thumbnails
        // Assign clostest CSS class to the image grid

        const value = MathHelpers.median(canvases.map(i => i.getWidth() / i.getHeight()).sort());
        const closest = AspectRatio.closest(value);

        this.element.classList.add(`hv-aspect-ratio--${closest.cssClass}`);

        canvases.forEach((canvas, index) => {
            const thumbnail = this.createThumbnail(index, canvas);
            this.element.append(thumbnail);
        });

        this.setActive(0);

        const lazyImages = Array
            .from(this.element.querySelectorAll('.hv-lazyload img'))
            .map(x => x as HTMLImageElement);

        this.enableLazyLoading(lazyImages);

        this.instance.on('page-load', (event: PageLoad) => {
            this.setActive(event.page);
        });
    }

    setActive(page: number) {

        const items = Array
            .from(this.element.querySelectorAll('li > .hv-thumbnail'))
            .map(child => child as HTMLElement);

        const active = (page < items.length) ? items[page] : undefined;

        // Apply active CSS class

        items.forEach((item) => item.classList.remove('hv-thumbnail--active'));

        if (active) {
            active.classList.add('hv-thumbnail--active');
        }

        // Make sure the canvas thumbnail is visible
        // by scrolling to its corresponding element

        if (active) {
            active.scrollIntoView({ block: 'end', behavior: 'smooth' });
        }
    }

    protected createThumbnail(page: number, canvas: Manifesto.ICanvas): HTMLElement {

        if (!canvas) {
            return undefined;
        }

        let baseUrl = canvas.getImages()[0].getResource().getServices()[0].id;
        let thumbnailUrl = baseUrl + '/full/90,/0/default.jpg';

        let listitem = document.createElement("li");
        listitem.className = 'mdc-image-list__item';

        let a = document.createElement('a');
        a.href = 'javascript:;';
        a.className = 'hv-thumbnail hv-lazyload hv-lazyload--loading mdc-image-list__image-aspect-container';
        a.setAttribute('data-page', page.toString());
        //a.setAttribute('data-tippy-content', canvas.getDefaultLabel());
        listitem.append(a);

        let img = document.createElement('img');
        //img.src = thumbnailUrl;
        img.className = 'mdc-image-list__image';
        img.setAttribute('data-src', thumbnailUrl);
        //img.setAttribute('loading', 'lazy');
        // img.onload = () => {
        //     img.parentElement.classList.remove('hv-lazy--loading');
        //     img.parentElement.classList.add('hv-lazy--loaded');
        //     let placeholder = img.parentElement.parentElement.querySelector('.mdc-image-list__label');
        //     if(placeholder) {
        //         placeholder.textContent = placeholder.getAttribute('data-placeholder');
        //     }
        // };
        a.append(img);

        let supporting = document.createElement('div');
        supporting.className = 'mdc-image-list__supporting';
        listitem.append(supporting);

        let label = document.createElement('span');
        label.className = 'mdc-image-list__label';
        label.textContent = canvas.getDefaultLabel();
        supporting.append(label);

        return listitem;
    }

    private observeLazyLoading(entries, observer) {
        if (!entries) {
            return undefined;
        }
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                let lazyImage = entry.target as HTMLImageElement;
                lazyImage.src = lazyImage.dataset.src;
                //lazyImage.srcset = lazyImage.dataset.srcset;
                lazyImage.classList.remove('hv-lazyload--loading');
                lazyImage.classList.add('hv-lazyload--loaded');
                observer.unobserve(lazyImage);
            }
        });
    }

    private enableLazyLoading(images: HTMLImageElement[]) {
        if (!images) {
            return undefined;
        }
        Array.from(images)
            .forEach(image => this.lazyLoadObserver.observe(image));
    }

}