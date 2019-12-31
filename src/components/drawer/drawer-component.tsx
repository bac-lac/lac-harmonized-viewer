import { Component, h, Element, State, Prop, Host, Event, EventEmitter } from '@stencil/core';
import { MDCDrawer } from "@material/drawer";
import iconClose from '../../assets/material-design-icons/ic_close_18px.svg'

@Component({
    tag: 'harmonized-drawer',
    styleUrl: 'drawer-component.scss'
})
export class DrawerComponent {

    @Element() el: HTMLElement

    @Prop() headerTitle: string
    @Prop() placement: PlacementType = 'left'
    @Prop() width: number = 300

    @Event() viewerDrawerToggle: EventEmitter;

    private drawer: MDCDrawer

    componentDidLoad() {
        this.drawer = new MDCDrawer(this.el)
    }

    componentDidUnload() {
        if (this.drawer) this.drawer.destroy()
    }

    handleClose() {
        this.drawer.open = false;
        this.viewerDrawerToggle.emit();
    }

    render() {

        let className = `mdc-drawer mdc-drawer--${this.placement} mdc-drawer--dismissible mdc-drawer--open`;

        return <Host class={className} style={{ width: `${this.width}px` }}>
                    <div class="mdc-drawer__header">
                        <div class="mdc-drawer__title">
                            {this.headerTitle}
                        </div>
                        <div class="mdc-drawer__close">
                            <harmonized-button
                            icon={iconClose}
                            size="sm"
                            title="Close sidebar"
                            aria-label="Close sidebar"
                            onClick={this.handleClose.bind(this)} />
                        </div>
                    </div>
                    <div class="mdc-drawer__content">
                        <slot />
                    </div>
                </Host>;
    }

}