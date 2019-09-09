import * as Openseadragon from "@modules/openseadragon";
import { Component } from "./base";

export class Viewport extends Component {

    constructor(parent: Component) {
        super(parent);
    }

    render() {
        let openseadragon = new Openseadragon({
            id: "osd",
            tileSources: "https://openseadragon.github.io/example-images/pnp/pan/6a32000/6a32400/6a32487.dzi"
        });
    }

}