import { MDCRipple } from "@material/ripple";
import { BaseComponent, Component } from "./base.component";
import { ZoomChange } from "../events/zoom-change.event";

export class ToolbarComponent extends BaseComponent implements Component {

    create() {

        const element = document.createElement('div');
        element.className = 'hv-toolbar';

        const inner = document.createElement('div');
        inner.className = 'hv-toolbar__inner';
        element.append(inner);

        const left = document.createElement('div');
        left.className = 'hv-toolbar__cell mdc-layout-grid__cell--span-10';
        inner.append(left);

        const right = document.createElement('div');
        right.className = 'hv-toolbar__cell hv-toolbar__cell--right mdc-layout-grid__cell--span-2';
        inner.append(right);

        const buttonHome = this.createButtonHome();
        left.append(buttonHome);

        const buttonDisplayMode = this.createButtonDisplayMode();
        left.append(buttonDisplayMode);

        const buttonFullscreen = this.createButtonFullscreen();
        right.append(buttonFullscreen);

        return element;
    }

    async bind() {

        this.instance.on('zoom-change', (event: ZoomChange) => {

            const buttonZoom = this.element.querySelector('.hv-zoom-button');
            if (buttonZoom) {

                const label = buttonZoom.querySelector('span');
                if (label) {
                    label.textContent = Math.round(event.percentage) + '%';
                }
            }

        });

    }

    private createButtonHome() {

        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'mdc-button';
        button.setAttribute('data-tippy-content', 'Home');

        const icon = document.createElement('i');
        icon.className = 'mdc-button__icon material-icons';
        icon.setAttribute('aria-hidden', 'true');
        icon.textContent = 'home';
        button.append(icon);

        return button;
    }

    private createButtonDisplayMode() {

        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'mdc-button';
        button.setAttribute('data-tippy-content', 'Display mode');

        const icon = document.createElement('i');
        icon.className = 'mdc-button__icon material-icons';
        icon.setAttribute('aria-hidden', 'true');
        icon.textContent = 'desktop_windows';
        button.append(icon);

        const label = document.createElement('span');
        label.className = 'mdc-button__label';
        label.textContent = 'Display mode';
        button.append(label);

        return button;
    }

    private createButtonFullscreen() {

        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'mdc-button';
        button.setAttribute('data-tippy-content', 'Fullscreen');

        const icon = document.createElement('i');
        icon.className = 'mdc-button__icon material-icons';
        icon.setAttribute('aria-hidden', 'true');
        icon.textContent = 'fullscreen';
        button.append(icon);

        return button;
    }

}