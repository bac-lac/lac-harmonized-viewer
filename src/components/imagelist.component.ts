import { Component } from "./component";
import { ManifestLoad } from "../events/manifest-load.event";

export class ImageListComponent extends Component {

    async init() {
        
        // this.bind('click', 'canvas-load', (eventTarget: HTMLElement) => {
        //     return {
        //         sequenceIndex: 0,
        //         canvasIndex: parseInt(eventTarget.getAttribute('data-canvas'))
        //     }
        // }, '[data-goto]');

        //this.on('click', '.hv-canvas-thumbnail', (event: any) => {
        // ??
        //});

        this.on('manifest-load', (event: ManifestLoad) => this.build(event.manifest));
    }

    private build(manifest: Manifesto.Manifest) {

        let sequence = manifest.getSequenceByIndex(0);
        let canvases = sequence.getCanvases();

        canvases.forEach((canvas, index) => {
            let thumbnail = this.createThumbnail(index, canvas);
            this.element.append(thumbnail);
        });

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
        a.className = 'hv-canvas-thumbnail mdc-image-list__image-aspect-container';
        a.setAttribute('data-canvas', index.toString());
        //a.setAttribute('data-tippy-content', canvas.getDefaultLabel());
        li.append(a);

        let img = document.createElement('img');
        img.src = thumbnailUrl;
        img.className = 'mdc-image-list__image';
        a.append(img);

        let supporting = document.createElement('div');
        supporting.className = 'mdc-image-list__supporting';
        li.append(supporting);

        let label = document.createElement('span');
        label.className = 'mdc-image-list__label';
        label.textContent = canvas.getDefaultLabel();
        supporting.append(label);

        return li;

    }

}