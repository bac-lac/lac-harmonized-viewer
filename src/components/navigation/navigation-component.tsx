import { Component, Prop, h, Element, Event, Listen, EventEmitter, Watch } from '@stencil/core';
import 'manifesto.js';
import OverlayScrollbars from 'overlayscrollbars';
import { NavigationOptions } from './navigation-options';

@Component({
  tag: 'hv-navigation',
  styleUrls: ['navigation-component.scss', '../../../node_modules/overlayscrollbars/css/OverlayScrollbars.min.css']
})
export class NavigationComponent {

  @Element() el: HTMLElement;

  @Prop() options: NavigationOptions;

  @Prop() page: number;
  @Prop() manifest: Manifesto.IManifest;

  @Event() goto: EventEmitter;

  private scrollbars: OverlayScrollbars;

  componentDidLoad() {

  }

  componentDidRender() {

    // Initialize custom scrollbars
    if (this.scrollbars) {
      this.scrollbars.destroy();
    }
    this.scrollbars = OverlayScrollbars(this.el.querySelector('.hv-navigation__content'), {});

    // Initialize lazy loading for navigation items
    var lazyImages = [].slice.call(this.el.querySelectorAll('.hv-lazyload'));

    if ("IntersectionObserver" in window) {
      let lazyImageObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
          let lazyImage = entry.target.querySelector('img') as HTMLImageElement;
          if (lazyImage) {
            lazyImage.classList.remove('hv-lazyload--complete');
            if (entry.isIntersecting) {
              lazyImage.src = lazyImage.dataset.src;
              //lazyImage.srcset = lazyImage.dataset.srcset;
              lazyImage.classList.remove('hv-lazyload--loading');
              lazyImage.classList.add('hv-lazyload--complete');
              lazyImageObserver.unobserve(lazyImage);
            }
          }
        });
      });

      lazyImages.forEach(function (lazyImage) {
        lazyImageObserver.observe(lazyImage);
      });
    } else {
      // Possibly fall back to a more compatible method here
    }
  }

  getItems() {
    if (!this.manifest) {
      return undefined;
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

  @Watch('manifest')
  manifestWatchHandler() {
    const content = this.el.querySelector('.hv-navigation__content');
    if (content) {
      content.classList.remove('hv-navigation__content--loading');
      content.classList.add('hv-navigation__content--complete');
    }
  }

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

  click(event: MouseEvent, page: number) {
    this.goto.emit(page);
  }

  imageLoad(event: Event) {

    const item = (event.target as HTMLElement).parentElement.parentElement;

    // Sync lazy loading status classes
    if (item) {
      item.classList.remove('hv-lazyload--loading');
      item.classList.add('hv-lazyload--complete');
    }
  }

  render() {

    const items = this.getItems();
    const loading = (items ? false : true);
    const skeleton = Array.apply(null, Array(24)).map(function () { });
    const source = (loading ? skeleton : items);

    return (
      <div class="hv-navigation__content hv-navigation__content--loading">
        <div class="bx--grid bx--grid--condensed">
          <ul class={(loading ? "bx--row hv-navigation__list" : "bx--row hv-navigation__list")}>
            {source.map((item, index) =>
              <li class={(this.page == index) ? "bx--col-lg-1 hv-lazyload hv-lazyload--loading active" : "bx--col-lg-1 hv-lazyload hv-lazyload--loading"}>
                {(
                  loading ? <span class="navigation-item"></span> :
                  <a href="javascript:;" class="navigation-item" onClick={(e) => this.click(e, index)}>
                    <img data-src={item.thumbnailUrl} onLoad={this.imageLoad} alt={item.title} />
                  </a>
                )}
              </li>)}
          </ul>
        </div>
      </div>
    );
  }
}