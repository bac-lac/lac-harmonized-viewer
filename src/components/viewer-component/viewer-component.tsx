import { Component, h, Element, Listen, Prop, State, Event, EventEmitter } from '@stencil/core';
import 'manifesto.js';

@Component({
  tag: 'harmonized-viewer',
  styleUrls: [
    'viewer-component.scss',
    '../../../node_modules/carbon-components/css/carbon-components.css',
    '../../../node_modules/@fortawesome/fontawesome-free/css/all.css'
  ],
  shadow: true
})
export class ViewerComponent {

  @Element() el: HTMLElement;

  @Prop() topbar: HTMLHvTopbarElement;
  @Prop() navigation: HTMLHvNavigationElement;
  @Prop() viewport: HTMLHvViewportElement;

  @Prop() manifest: Manifesto.IManifest;

  @Event() manifestLoaded: EventEmitter;
  @Event() goto: EventEmitter;

  @Listen('manifestLoaded')
  manifestLoadedHandler(event: CustomEvent) {
    if (this.navigation) {
      //this.navigation.manifest = event.detail as Manifesto.Manifest;

      var manifest = event.detail as Manifesto.Manifest;

      this.navigation.items = manifest
        .getSequenceByIndex(0)
        .getCanvases()
        .map(canvas => {

          let imageUrl: string;

          if (canvas.getThumbnail()) {
            imageUrl = canvas.getThumbnail().id;
          }
          else if (!imageUrl) {
            let baseUrl = canvas.getImages()[0].getResource().getServices()[0].id;
            imageUrl = baseUrl + '/full/90,/0/default.jpg';
          }

          return {
            title: canvas.getDefaultLabel(),
            thumbnailUrl: imageUrl
          };
        });
    }
  }

  @Listen('pageLoaded')
  pageLoadedHandler(event: CustomEvent) {
    if (this.navigation) {
      this.navigation.page = event.detail as number;
    }
  }

  @Listen('goto')
  gotoHandler(event: CustomEvent) {
    if (this.viewport) {
      this.viewport.openseadragon.goToPage(event.detail as number);
    }
  }

  render() {
    return (
      <div class="harmonized-viewer">

        <hv-topbar class="hv-topbar" ref={elem => this.topbar = elem as HTMLHvTopbarElement}>
        </hv-topbar>

        <div class="hv-content">
          <hv-navigation class="hv-navigation" ref={elem => this.navigation = elem as HTMLHvNavigationElement}></hv-navigation>

          <main class="hv-main">
            <hv-viewport manifest="https://d.lib.ncsu.edu/collections/catalog/nubian-message-1992-11-30/manifest" ref={elem => this.viewport = elem as HTMLHvViewportElement}></hv-viewport>
            <hv-statusbar class="hv-statusbar"></hv-statusbar>
          </main>
        </div>

      </div>
    );
  }
}