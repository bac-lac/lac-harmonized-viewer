import { Component, h, Element, Listen, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'harmonized-viewer',
  styleUrls: [
    'viewer-component.scss',
    '../../assets/semantic-ui/semantic.css',
    '../../../node_modules/@fortawesome/fontawesome-free/css/all.css'
  ],
  shadow: true
})
export class ViewerComponent {

  @Element() el: HTMLElement;

  @Prop() topbar: HTMLHvTopbarElement;
  @Prop() navigation: HTMLHvNavigationElement;

  //@Event() manifestLoaded: EventEmitter;

  @Listen('navigationToggled')
  toggleNavigation(event: CustomEvent) {
    var content = this.el.shadowRoot.querySelector('.hv-content') as HTMLHvContentElement;
    content.navigation.open = !content.navigation.open;
  }

  @Listen('manifestLoaded')
  manifestLoadedHandler(event: CustomEvent) {
    var navigation = this.el.shadowRoot.querySelector('.hv-navigation') as HTMLHvNavigationElement;
    navigation.manifest = event.detail as Manifesto.IManifest;
  }

  @Listen('canvasLoaded')
  pageLoadedHandler(event: CustomEvent) {
    var navigation = this.el.shadowRoot.querySelector('.hv-navigation') as HTMLHvNavigationElement;
    navigation.current = event.detail as number;
  }

  @Listen('goTo')
  goToHandler(event: CustomEvent) {
    var viewport = this.el.shadowRoot.querySelector('.hv-viewport') as HTMLHvViewportElement;
    if (viewport) {
      viewport.openseadragon.goToPage(event.detail as number);
    }
  }

  render() {
    return (
      <div class="harmonized-viewer">
        <hv-topbar class="hv-topbar" ref={elem => this.topbar = elem as HTMLHvTopbarElement} onNavigationToggled={ev => this.toggleNavigation(ev)}></hv-topbar>
        {/* <hv-toolbar class="hv-toolbar"></hv-toolbar> */}
        <hv-content class="hv-content"></hv-content>
        {/* <hv-settings class="hv-settings"></hv-settings> */}
      </div>
    );
  }
}