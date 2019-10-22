import { Component, h, Prop } from "@stencil/core";

@Component({
    tag: 'harmonized-viewer-message',
    styleUrl: 'message-component.scss'
})
export class MessageComponent {

    @Prop() text: string;
    @Prop() type: string;

    @Prop({ reflect: true }) class: string;

    getClass() {
        let className = "message";
        switch (this.type) {
            case "error":
                className += " is-danger";
                break;
        }
        return className;
    }

    render() {

        return <article class={this.getClass()}>
            <div class="message-header">
                <p>{this.text}</p>
            </div>
            <div class="message-body">
                <slot />
            </div>
        </article>;
    }
}