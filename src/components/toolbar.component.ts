import { Component } from "./component";
import { ZoomChange } from "../events/event";

export class ToolbarComponent extends Component {

    async init() {

        this.on('zoom-change', (event: ZoomChange) => {
            const btnZoomLabel = this.element.querySelector('.hv-zoom-button > span');
            if (btnZoomLabel) {
                btnZoomLabel.textContent = Math.round(event.percentage) + '%';
            }
        });

    }

}