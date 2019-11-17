import { Component, h, Element, Host, Prop, Event, EventEmitter } from '@stencil/core';
import { MDCRipple } from '@material/ripple';

@Component({
    tag: 'harmonized-button',
    styleUrl: 'button-component.scss'
})
export class ButtonComponent {

    @Element() el: HTMLElement

    //@Prop() className: string
    @Prop() disabled: boolean
    @Prop() icon: string
    @Prop() size: string
    @Prop() fontSize: number
    @Prop() label: string
    @Prop() tooltip: string
    @Prop() fullWidth: boolean
    @Prop() raised: boolean

    componentDidLoad() {

        const button = new MDCRipple(this.el.querySelector('.mdc-icon-button'))
        if (button) button.unbounded = true
    }

    render() {

        let className = null

        if (this.icon) {

            className = 'mdc-icon-button'

            if (this.size === 'lg') className += ' mdc-icon-button--lg'
            else if (this.size === 'md') className += ' mdc-icon-button--md'
            else if (this.size === 'sm') className += ' mdc-icon-button--sm'
        }
        else
            className = 'mdc-button'

        if (this.raised) className += ' mdc-button--raised'

        if (this.fullWidth) className += ' full-width'

        return <Host>
            <button
                type="button"
                class={className}
                disabled={this.disabled}
                title={this.tooltip}
                aria-label={this.tooltip}>

                <div class="mdc-button__ripple"></div>

                {this.icon && <i class="mdc-button__icon" aria-hidden={true} innerHTML={this.icon}></i>}

                {this.label && <span class="mdc-button__label" style={{ fontSize: `${this.fontSize}em` }}>{this.label}</span>}

                <div class="mdc-button__touch"></div>
            </button>
        </Host>
    }
}