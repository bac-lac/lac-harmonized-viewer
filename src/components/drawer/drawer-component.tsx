import { Component, h, Element, State, Prop, Host, Method } from '@stencil/core';
import { MDCDrawer } from "@material/drawer";
import iconClose from '../../assets/material-design-icons/ic_close_18px.svg'
import iconMaximize from '../../assets/material-design-icons/ic_crop_square_24px.svg'

@Component({
    tag: 'harmonized-drawer',
    styleUrl: 'drawer-component.scss'
})
export class DrawerComponent {

    @Element() el: HTMLElement

    @Prop() placement: string = 'left'
    @Prop() toolbar: boolean = false
    @Prop() visible: boolean = false

    private drawer: MDCDrawer

    componentDidLoad() {
        this.drawer = MDCDrawer.attachTo(this.el)
    }

    componentDidUnload() {
        this.drawer.destroy()
    }

    @Method()
    async open() {
        this.drawer.open = true
    }

    render() {

        let className = 'mdc-drawer mdc-drawer--dismissible'

        if (this.placement === 'right') {
            className += ' mdc-drawer--right'
        }
        else {
            className += ' mdc-drawer--left'
        }

        if (this.visible) {
            className += ' mdc-drawer--open'
        }

        return <Host class={className}>
            <div class="mdc-drawer__content">
                {
                    this.toolbar && <div class="drawer-toolbar" role="toolbar">
                        <div class="drawer-button drawer-button__close">
                            <button
                                type="button"
                                aria-label="">
                                <div class="mdc-button__ripple"></div>
                                <div class="mdc-button__icon" innerHTML={iconClose}></div>
                                <div class="mdc-button__touch"></div>
                            </button>
                        </div>
                    </div>
                }
                <slot />
            </div>
        </Host>
    }

}