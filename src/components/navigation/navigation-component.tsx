import { Component, Prop, h, Element, Event, Listen, EventEmitter } from '@stencil/core';
import { Tooltip } from 'carbon-components';
import 'manifesto.js';
import OverlayScrollbars from 'overlayscrollbars';

@Component({
  tag: 'hv-navigation',
  styleUrls: ['navigation-component.scss', '../../../node_modules/overlayscrollbars/css/OverlayScrollbars.min.css']
})
export class NavigationComponent {

  @Element() el: HTMLElement;

  @Prop() page: number = 0;
  @Prop() manifest: Manifesto.IManifest;

  @Event() goto: EventEmitter;

  componentDidLoad() {

  }

  componentDidRender() {

    OverlayScrollbars(this.el.querySelector('.hv-navigation__content'), {});

    var lazyImages = [].slice.call(this.el.querySelectorAll(".hv-lazyload"));

    if ("IntersectionObserver" in window) {
      let lazyImageObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            let lazyImage = entry.target.querySelector('img') as HTMLImageElement;
            if (lazyImage) {
              lazyImage.src = lazyImage.dataset.src;
              //lazyImage.srcset = lazyImage.dataset.srcset;
              lazyImage.classList.remove("hv-lazyload--loading");
              lazyImage.classList.add("hv-lazyload--complete");
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

  onImageLoad(event: Event) {
    var target = event.target as HTMLElement;
    var li = target.parentElement.parentElement;
    li.classList.remove('hv-lazyload--loading');
    li.classList.add('hv-lazyload--complete', 'animated', 'fadeIn', 'faster');

  }

  render() {

    const items = this.getItems();
    const loading = (items ? false : true);
    const skeleton = Array.apply(null, Array(10)).map(function () { });
    const source = (loading ? skeleton : items);

    return (
      <div class="hv-navigation__content">
        <div class="bx--grid bx--grid--condensed">
          <ul class={(loading ? "bx--row hv-navigation__list" : "bx--row hv-navigation__list")}>
            {source.map((item, index) =>
              <li class={(this.page == index) ? "bx--col-lg-6 hv-lazyload hv-lazyload--loading active" : "bx--col-lg-6 hv-lazyload hv-lazyload--loading"}>
                <span class="hv-skeleton" aria-hidden="true"></span>
                {(loading ? <span></span> :
                  <a href="javascript:;" onClick={(e) => this.onClick(e, index)}>
                    <img data-src={item.thumbnailUrl} onLoad={this.onImageLoad} alt={item.title} />
                  </a>
                )}
              </li>)}
          </ul>
        </div>
      </div>
    );
  }
}