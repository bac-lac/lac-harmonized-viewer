import { Component, h, Element, State, Prop, Host, Method } from '@stencil/core';
import { MDCDrawer } from "@material/drawer";
import iconDockLeft from '../../assets/material-icons/ic_dock_left_24px.svg'
import iconClose from '../../assets/material-design-icons/ic_close_18px.svg'

@Component({
    tag: 'harmonized-drawer',
    styleUrl: 'drawer-component.scss'
})
export class DrawerComponent {

    @Element() el: Element

    @Prop() placement: string = 'left'
    @Prop() toolbar: boolean = false
    @Prop() visible: boolean = false

    private drawer: MDCDrawer

    componentDidLoad() {
        this.drawer = new MDCDrawer(this.el)
    }

    componentDidUnload() {
        if (this.drawer) this.drawer.destroy()
    }

    @Method()
    async open() {
        this.drawer.open = true
    }

    @Method()
    async close() {
        this.drawer.open = false
    }

    handleClick() {
        this.close()
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

            {
                this.toolbar && <div class="mdc-drawer__toolbar" role="toolbar">

                    <harmonized-button
                        icon={iconDockLeft}
                        size="sm"
                        title="Dock"
                        aria-label="Dock"
                        disabled={true} />

                    <harmonized-button
                        icon={iconClose}
                        size="sm"
                        title="Close sidebar"
                        aria-label="Close sidebar"
                        onClick={this.handleClick.bind(this)} />

                </div>
            }

            <div class="mdc-drawer__content">
                <slot />
            </div>

        </Host>
    }

}