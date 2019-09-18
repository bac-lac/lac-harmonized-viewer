import { Component } from "./component";
import { ZoomChange } from "../events/event";
import { MDCRipple } from "@material/ripple";

export class ToolbarComponent extends Component {

    create(): HTMLElement {
        
        const element = document.createElement('div');
        element.className = 'hv-toolbar';

        const buttonDisplay = document.createElement('button');
        buttonDisplay.type = 'button';
        buttonDisplay.className = 'mdc-button';
        buttonDisplay.setAttribute('data-tippy-content', 'Display mode');
        element.append(buttonDisplay);

        const buttonDisplayIcon = document.createElement('i');
        buttonDisplayIcon.className = 'mdc-button__icon material-icons';
        buttonDisplayIcon.setAttribute('aria-hidden', 'true');
        buttonDisplayIcon.textContent = 'desktop_windows';
        buttonDisplay.append(buttonDisplayIcon);

        const buttonDisplayLabel = document.createElement('span');
        buttonDisplayLabel.className = 'mdc-button__label';
        buttonDisplayLabel.textContent = 'Display mode';
        buttonDisplay.append(buttonDisplayLabel);

        MDCRipple.attachTo(buttonDisplay);

        return element;
    }

    bind(): void {

        this.on('zoom-change', (event: ZoomChange) => {
            const buttonZoom = this.element.querySelector('.hv-zoom-button');
            if (buttonZoom) {
                const label = buttonZoom.querySelector('span');
                if (label) {
                    label.textContent = Math.round(event.percentage) + '%';
                }
            }
        });

    }

}