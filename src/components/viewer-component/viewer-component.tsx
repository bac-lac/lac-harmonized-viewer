import { Component, h, Element, Listen, Prop, Event, EventEmitter, Method } from '@stencil/core';
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
  @Prop() toolbar: HTMLHvToolbarElement;
  @Prop() navigation: HTMLHvNavigationElement;
  @Prop() annotations: HTMLHvAnnotationsElement;
  @Prop() viewport: HTMLHvViewportElement;

  @Prop() page: number;
  @Prop() totalPages: number;

  @Prop() manifest: Manifesto.IManifest;

  @Event() manifestLoaded: EventEmitter;
  @Event() goto: EventEmitter;

  @Listen('manifestLoaded')
  manifestLoadedHandler(event: CustomEvent) {

    let manifest = event.detail as Manifesto.IManifest;
    this.totalPages = manifest.getSequenceByIndex(0).getTotalCanvases();

    if (this.navigation) {
      this.navigation.manifest = manifest;
    }
    if(this.annotations) {
      this.annotations.manifest = manifest;
    }
    if (this.toolbar) {
      this.toolbar.totalPages = this.totalPages;
    }
  }

  @Listen('pageLoaded')
  pageLoadedHandler(event: CustomEvent) {

    this.page = event.detail as number;

    if (this.navigation) {
      this.navigation.page = this.page;
    }
    if(this.annotations) {
      this.annotations.page = this.page;
    }
    if (this.toolbar) {
      this.toolbar.page = this.page;
    }
  }

  @Listen('goto')
  gotoHandler(event: CustomEvent) {
    let gotoPage = event.detail as number;
    if (this.totalPages > gotoPage + 1) {
      if (this.viewport) {
        this.viewport.openseadragon.goToPage(event.detail as number);
      }
    }
  }

  @Listen('previous')
  previousHandler() {
    this.goto.emit(this.page - 1);
  }

  @Listen('next')
  nextHandler() {
    this.goto.emit(this.page + 1);
  }

  @Method()
  async currentPage() {
    return this.page;
  }

  @Method()
  async next() {
    this.nextHandler();
  }

  render() {
    return (
      <div class="harmonized-viewer">

        <hv-topbar class="hv-topbar" ref={elem => this.topbar = elem as HTMLHvTopbarElement}>
        </hv-topbar>

        <div class="hv-content">
          <hv-navigation class="hv-navigation" ref={elem => this.navigation = elem as HTMLHvNavigationElement}></hv-navigation>

          <main class="hv-main">
            <hv-toolbar class="hv-toolbar" ref={elem => this.toolbar = elem as HTMLHvToolbarElement}></hv-toolbar>
            <hv-viewport manifest="https://digital.library.villanova.edu/Item/vudl:92879/Manifest" ref={elem => this.viewport = elem as HTMLHvViewportElement}></hv-viewport>
            <hv-statusbar class="hv-statusbar"></hv-statusbar>
          </main>

          <hv-annotations class="hv-annotations" ref={elem => this.annotations = elem as HTMLHvAnnotationsElement}></hv-annotations>
        </div>

      </div>
    );
  }
}