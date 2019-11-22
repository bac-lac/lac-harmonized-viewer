import { Component, h, Element, Host, Prop } from '@stencil/core';
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
    @Prop() outline: boolean

    componentDidLoad() {

        const button = this.el.querySelector('button')
        if (button) {
            const ripple = new MDCRipple(button)
            if (ripple) {
                ripple.unbounded = true
            }
        }
    }

    render() {

        let className = null
        let iconClassName = null

        if (this.icon && !this.label) {
            className = 'mdc-icon-button'
            iconClassName = 'mdc-button__icon'
        }
        else {
            className = 'mdc-button'
            iconClassName = 'mdc-icon-button__icon'
        }

        className += ' mdc-button--touch'

        if (this.size == 'lg') className += ` ${className}--lg`
        else if (this.size == 'md') className += ` ${className}--md`
        else if (this.size == 'sm') className += ` ${className}--sm`

        if (this.raised) className += ' mdc-button--raised'
        if (this.outline) className += ' mdc-button--outlined'
        if (this.fullWidth) className += ' full-width'

        return <Host class="mdc-touch-target-wrapper">
            <button
                type="button"
                class={className}
                disabled={this.disabled}
                title={this.tooltip}
                aria-label={this.tooltip}>

                <div class="mdc-button__ripple"></div>

                {this.icon && <i class={iconClassName} aria-hidden={true} innerHTML={this.icon}></i>}
                {this.label && <span class="mdc-button__label" style={{ fontSize: `${this.fontSize}em` }}>{this.label}</span>}

                <div class="mdc-button__touch"></div>
            </button>
            <slot />
        </Host>
    }
}