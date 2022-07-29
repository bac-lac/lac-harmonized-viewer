import { Component, h, Element, State, Prop, Host, Event, EventEmitter, Watch } from '@stencil/core';
import { MDCDrawer } from "@material/drawer";
import { t } from '../../services/i18n-service';
import { isIE11 } from '../../utils/viewport';
import arrowRight from '../../assets/material-design-icons/ic_chevron_right_36px.svg'

@Component({
    tag: 'harmonized-drawer',
    styleUrl: 'drawer-component.scss'
})
export class DrawerComponent {

    @Element() el: HTMLElement

    @Prop() headerTitle: string
    @Prop() shown: boolean = false;

    @Event() viewerDrawerToggle: EventEmitter;

    private drawer: MDCDrawer

    componentDidLoad() {
        this.drawer = new MDCDrawer(this.el)
    }

    componentDidUnload() {
        if (this.drawer) this.drawer.destroy()
    }

    @Watch('shown')
    handleOpen(newValue: boolean, oldValue: boolean): void {
        
        if (newValue !== oldValue && newValue) {
            this.drawer.open = true;
            this.el.setAttribute('aria-expanded','true');
            this.el.querySelector('button').setAttribute('aria-hidden','false');
            this.el.querySelector('button').setAttribute('aria-label', t('hideInfo'));
        }
        else {
            this.el.setAttribute('aria-expanded','false');
        }
    }

    handleClose() : void {
        this.drawer.open = false;      
        this.el.querySelector('button').setAttribute('aria-hidden','false');
        this.viewerDrawerToggle.emit();
    }

    // Use rtl to force material design in popping drawer from the right side (other options??)
    render() {
        return <Host dir="rtl" class='mdc-drawer mdc-drawer--dismissible'>
                    <div dir="ltr" class="mdc-drawer__header">
                        <div class="mdc-drawer__close">
                            <harmonized-button
                            icon={arrowRight}
                            title={t('closeSidebar')}
                            tooltip={this.headerTitle}                           
                            aria-controls='hv-drawer'
                            onClick={this.handleClose.bind(this)} />
                        </div>
                        <div class="mdc-drawer__title" title={this.headerTitle}>
                            {this.headerTitle}
                        </div>
                    </div>
                    <div dir="ltr" class="mdc-drawer__content">
                        <slot />
                    </div>
                    {isIE11() && <iframe src="about:blank" style={{position: 'absolute', overflow: 'hidden', top: '0', left: '0', zIndex: '-1', border: 'none', minWidth: '100%', minHeight: '100%'}} />}
                </Host>;
    }

}