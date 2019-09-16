import { Component } from "./component";
import { ManifestLoad, GoToPage, PageLoaded } from "../events/event";
import { median } from "../helpers/math.helper";
import { AspectRatio } from "../helpers/aspect-ratio.helper";

export class ImageListComponent extends Component {

    async init() {

        this.on('manifest-load', (event: ManifestLoad) => this.build(event.manifest));

        this.addListener('click', '.hv-canvas-thumbnail', (eventTarget: HTMLElement) => {
            const canvasIndex = parseInt(eventTarget.getAttribute('data-page'));
            return new GoToPage(canvasIndex);
        });
    }

    private build(manifest: Manifesto.Manifest) {

        if (!manifest) {
            return;
        }

        const sequence = manifest.getSequenceByIndex(0);
        const canvases = sequence.getCanvases();

        // Calculate the median aspect ratio for thumbnails
        // Assign clostest CSS class to the image grid

        const aspectRatio = median(canvases.map(i => i.getWidth() / i.getHeight()).sort());
        const closest = AspectRatio.closest(aspectRatio);

        this.element.classList.add(`hv-aspect-ratio--${closest.cssClass}`);

        canvases.forEach((canvas, index) => {
            let thumbnail = this.createThumbnail(index, canvas);
            this.element.append(thumbnail);
        });

        this.setActive(0);
        this.on('page-loaded', (event: PageLoaded) => this.setActive(event.page));

    }

    setActive(index: number) {

        const items = Array.from(this.element.children).map(child => child as HTMLElement);

        items.forEach(item =>
            item.classList.remove('active'));

        if (index < items.length) {
            items[index].classList.add('active');
        }
    }

    private createThumbnail(index: number, canvas: Manifesto.ICanvas): HTMLElement {

        if (!canvas) {
            return undefined;
        }

        let baseUrl = canvas.getImages()[0].getResource().getServices()[0].id;
        let thumbnailUrl = baseUrl + '/full/90,/0/default.jpg';

        let li = document.createElement("li");
        li.className = 'mdc-image-list__item';

        let a = document.createElement('a');
        a.href = 'javascript:;';
        a.className = 'hv-canvas-thumbnail mdc-image-list__image-aspect-container hv-lazy--loading';
        a.setAttribute('data-page', index.toString());
        //a.setAttribute('data-tippy-content', canvas.getDefaultLabel());
        li.append(a);

        let img = document.createElement('img');
        img.src = thumbnailUrl;
        img.className = 'mdc-image-list__image';
        img.setAttribute('loading', 'lazy');
        img.onload = () => {
            img.parentElement.classList.remove('hv-lazy--loading');
            img.parentElement.classList.add('hv-lazy--loaded');
            let placeholder = img.parentElement.parentElement.querySelector('.mdc-image-list__label');
            if(placeholder) {
                placeholder.textContent = placeholder.getAttribute('data-placeholder');
            }
        };
        a.append(img);

        let supporting = document.createElement('div');
        supporting.className = 'mdc-image-list__supporting';
        li.append(supporting);

        let label = document.createElement('span');
        label.className = 'mdc-image-list__label';
        label.setAttribute('data-placeholder', canvas.getDefaultLabel());
        //label.textContent = canvas.getDefaultLabel();
        supporting.append(label);

        return li;

    }

}