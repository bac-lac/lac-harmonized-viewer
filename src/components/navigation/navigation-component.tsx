import { Component, Prop, h, Element, Event, Listen, EventEmitter } from '@stencil/core';
import 'manifesto.js';

@Component({
  tag: 'hv-navigation',
  styleUrl: 'navigation-component.scss'
})
export class NavigationComponent {

  @Element() el: HTMLElement;

  @Prop() page: number = 0;
  @Prop() manifest: Manifesto.IManifest;

  @Event() goto: EventEmitter;

  getItems() {
    if (!this.manifest) {
      return [];
    }
    return this.manifest
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

  // @Watch('items')
  // watchItemsHandler() {
  //   console.log('watch');

  //   var lazyImages = this.el.querySelectorAll('img.hv-lazy');
  //   lazyload(lazyImages);
  // }

  @Listen('goto')
  gotoHandler(event: CustomEvent) {

    this.page = event.detail as number;

    const items = Array
      .from(this.el.querySelectorAll('.hv-navigation li'))
      .map(child => child as HTMLElement);

    // Apply active CSS class
    items.forEach((item, index) => (this.page == index) ? item.classList.add('active') : item.classList.remove('active'));

    // Make sure the canvas thumbnail is visible
    // by scrolling to its corresponding element
    items[this.page].scrollIntoView({ block: 'end', behavior: 'smooth' });
  }

  onClick(event: MouseEvent, page: number) {
    this.goto.emit(page);
  }

  render() {
    return (
      <ul class="hv-navigation__list">
        {this.getItems().map((item, index) =>
          <li class={(this.page == index) ? "active" : ""}>
            <a href="javascript:;" onClick={(e) => this.onClick(e, index)}>
              <img src={item.thumbnailUrl} class="hv-lazy" alt={item.title} />
            </a>
          </li>)}
      </ul>
    );
  }
}