import { BaseComponent, Component } from "./base.component";

export class AlertComponent extends BaseComponent implements Component {

    create() {

        const alert = document.createElement('div');
        alert.className = 'hv-error';
    
        const icon = document.createElement('span');
        icon.className = 'hv-error-icon material-icons';
        icon.textContent = 'error_outline';
        alert.append(icon);
    
        const text = document.createElement('span');
        text.innerHTML = 'An unexpected error happened.<br>Please try again later.';
        alert.append(text);

        return alert;
    }

}