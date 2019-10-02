import { Component, h, Element, Listen, Prop, State, Event, EventEmitter } from '@stencil/core';
import { NavigationItem } from '../../models/navigation-item';

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

  @Prop() current: number = 0;
  @Prop() topbar: HTMLHvTopbarElement;
  @Prop() navigation: HTMLHvNavigationElement;
  @Prop() manifest: Manifesto.IManifest;

  @State() items: NavigationItem[] = [];

  @Event() goto: EventEmitter;

  //@Event() manifestLoaded: EventEmitter;

  @Listen('navigationToggled')
  toggleNavigation() {
    // var content = this.el.shadowRoot.querySelector('.hv-content') as HTMLHvContentElement;
    // content.navigation.open = !content.navigation.open;
  }

  @Listen('manifestLoaded')
  manifestLoadedHandler(event: CustomEvent) {

    var manifest = event.detail as Manifesto.IManifest;

    this.items = manifest
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

  @Listen('canvasLoaded')
  pageLoadedHandler(event: CustomEvent) {
    //var navigation = this.el.shadowRoot.querySelector('.hv-navigation') as HTMLHvNavigationElement;
    //navigation.current = event.detail as number;
  }

  @Listen('goTo')
  goToHandler(event: CustomEvent) {
    var viewport = this.el.shadowRoot.querySelector('.hv-viewport') as HTMLHvViewportElement;
    if (viewport) {
      viewport.openseadragon.goToPage(event.detail as number);
    }
  }

  onCanvasSelected(event: MouseEvent, page: number) {
    this.goto.emit(page);
  }

  render() {
    return (
      <div class="harmonized-viewer">

        <hv-topbar class="hv-topbar" ref={elem => this.topbar = elem as HTMLHvTopbarElement} onNavigationToggled={() => this.toggleNavigation()}>
        </hv-topbar>

        <div class="hv-content">
          <div class="hv-navigation">
            <ul class="hv-navigation__list">
              {this.items.map((item, index) =>
                <li class={(this.current == index) ? "active" : ""}>
                  <a href="javascript:;" onClick={(e) => this.onCanvasSelected(e, index)}>
                    <img src={item.thumbnailUrl} alt={item.title} />
                  </a>
                </li>
              )}
            </ul>
          </div>

          <main class="hv-main">
            <hv-viewport manifest="https://d.lib.ncsu.edu/collections/catalog/nubian-message-1992-11-30/manifest"></hv-viewport>
            <hv-statusbar class="hv-statusbar"></hv-statusbar>
          </main>
        </div>

      </div>
    );
  }
}