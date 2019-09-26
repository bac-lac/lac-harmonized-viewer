import { Component, h } from '@stencil/core';
//import "manifesto.js";

import openseadragon from "openseadragon";
//var openseadragon = require('openseadragon');

@Component({
    tag: 'hv-viewport',
    styleUrl: 'viewport-component.scss'
})
export class ViewerComponent {

    openseadragon: any;

    componentDidLoad() {

        var doc = document.querySelector('harmonized-viewer').shadowRoot;
        var instance = doc.querySelector("#openseadragon");
        console.log(instance);

        this.openseadragon = openseadragon({
            element: instance,
            prefixUrl: "/dist/vendors/openseadragon/images/",
            animationTime: 0.25,
            springStiffness: 10.0,
            showNavigator: true,
            navigatorPosition: "BOTTOM_RIGHT",
            showNavigationControl: false,
            showSequenceControl: false,
            sequenceMode: true,
            tileSources: {
                type: 'legacy-image-pyramid',
                levels: [{
                    url: 'https://openseadragon.github.io/example-images/rbc/rbc0001/2003/2003rosen1799/0001q.jpg',
                    height: 889,
                    width: 600
                }, {
                    url: 'https://openseadragon.github.io/example-images/rbc/rbc0001/2003/2003rosen1799/0001r.jpg',
                    height: 2201,
                    width: 1485
                }, {
                    url: 'https://openseadragon.github.io/example-images/rbc/rbc0001/2003/2003rosen1799/0001v.jpg',
                    height: 4402,
                    width: 2970
                }]
            }
        });
    }

    render() {
        return (
            <div id="openseadragon" class="hv-openseadragon">
                aaa
            </div>
        );
    }
}