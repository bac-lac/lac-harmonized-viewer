import { Component, h, Element, Listen, Prop, Event, EventEmitter } from '@stencil/core';
import 'manifesto.js';

@Component({
  tag: 'harmonized-viewer',
  styleUrls: [
    'viewer-component.scss',
    '../../../node_modules/carbon-components/css/carbon-components.css'
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

  // private observer: IntersectionObserver;

  // componentDidLoad() {
  //   const img: HTMLImageElement =
  //     this.el.shadowRoot.querySelector('img.hv-lazy');

  //   if (img) {
  //     this.observer = new IntersectionObserver(this.onIntersection);
  //     this.observer.observe(img);
  //   }
  // }

  // private onIntersection = async (entries) => {
  //   for (const entry of entries) {
  //     if (entry.isIntersecting) {
  //       if (this.observer) {
  //         this.observer.disconnect();
  //       }

  //       if (entry.target.getAttribute('data-src')) {
  //         entry.target.setAttribute('src',
  //           entry.target.getAttribute('data-src'));
  //         entry.target.removeAttribute('data-src');
  //       }
  //     }
  //   }
  // };

  @Listen('manifestLoaded')
  manifestLoadedHandler(event: CustomEvent) {
    if (this.navigation) {
      this.navigation.manifest = event.detail as Manifesto.IManifest;
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
            <hv-viewport manifest="https://digital.library.villanova.edu/Item/vudl:92879/Manifest" ref={elem => this.viewport = elem as HTMLHvViewportElement}></hv-viewport>
            <hv-statusbar class="hv-statusbar"></hv-statusbar>
          </main>
        </div>

      </div>
    );
  }
}