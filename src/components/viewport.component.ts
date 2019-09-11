import "manifesto.js";
import { Component } from "./component";
import { ManifestLoaded } from "../events/manifest-loaded.event";

const openseadragon = require('openseadragon');

export class ViewportComponent extends Component {

    //private manifest: Manifesto.Manifest;
    private openseadragon: any;
    private manifest: Manifesto.Manifest;

    async init() {

        this.manifest = manifesto.create(
            await manifesto.loadManifest(this.options.manifestUrl)) as Manifesto.Manifest;

        this.publish<ManifestLoaded>('manifest-loaded', new ManifestLoaded(this.manifest));
    }

    async render() {

        let sequence = this.manifest.getSequences()[0];

        let sources = sequence.getCanvases().map(function (canvas) {
            var images = canvas.getImages();
            return images[0].getResource().getServices()[0].id + "/info.json";
        });

        this.openseadragon = openseadragon({
            id: "osd",
            prefixUrl: "/vendors/openseadragon/images/",
            sequenceMode: true,
            tileSources: sources
        });
    }
}

export interface IViewportOptions {
    element: HTMLElement;
    manifest: Manifesto.Manifest;
}