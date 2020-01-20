import { Component, h, Element, Host, Prop } from '@stencil/core';
import iconChevronDown from "../../assets/material-icons/chevron-down.svg";
import { MDCRipple } from '@material/ripple';

@Component({
    tag: 'harmonized-button',
    styleUrl: 'button-component.scss'
})
export class ButtonComponent {

    @Element() el: HTMLElement

    @Prop() disabled: boolean
    @Prop() dropdown: boolean
    @Prop() icon: string
    @Prop() iconClassName: string
    @Prop() size: string
    @Prop() label: string
    @Prop() tooltip: string
    @Prop() fullWidth: boolean

    @Prop() raised: boolean
    @Prop() outline: boolean

    componentDidLoad() {

        const element = this.el.querySelector("button")
        if (element) {
            /*
            const ripple = new MDCRipple(element)
            if (ripple) {
                ripple.unbounded = true
            }*/
        }
    }

    render() {

        let className = null
        let buttonClassName = null

        className = "-target-wrapper"

        if (this.icon && !this.label) {
            buttonClassName = 'mdc-icon-button'
        }
        else {
            buttonClassName = 'mdc-button'
        }

        if (this.size == 'lg') buttonClassName += ` ${buttonClassName}--lg`
        else if (this.size == 'md') buttonClassName += ` ${buttonClassName}--md`
        else if (this.size == 'sm') buttonClassName += ` ${buttonClassName}--sm`

        buttonClassName += " mdc-button--touch"

        if (this.raised) buttonClassName += ' mdc-button--raised'
        if (this.outline) buttonClassName += ' mdc-button--outlined'

        if (this.fullWidth) className += ' full-width'

        return <Host class={className}>

            <button
                type="button"
                class={buttonClassName}
                disabled={this.disabled}
                title={this.tooltip}
                aria-label={this.tooltip}>


                <div class="mdc-button__ripple"></div>

                {this.icon && <span class={this.iconClassName} aria-hidden={true} innerHTML={this.icon}></span>}
                {this.label && <span class="mdc-button__label">{this.label}</span>}

                {this.dropdown && <span class="dropdown-arrow" innerHTML={iconChevronDown}></span>}

                <div class="mdc-button__touch"></div>
            </button>
            <slot />
        </Host>
    }
}