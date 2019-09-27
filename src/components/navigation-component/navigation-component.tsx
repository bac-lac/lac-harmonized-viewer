import { Component, Prop, h, Element, Watch, State, Listen } from '@stencil/core';
import 'manifesto.js';
import { NavigationItem } from '../../models/navigation-item';

@Component({
  tag: 'hv-navigation',
  styleUrls: [
    'navigation-component.scss'
  ]
})
export class NavigationComponent {

  @Element() el: HTMLElement;

  @Prop() current: number = 0;
  @Prop() open: boolean = true;
  @Prop() manifest: Manifesto.IManifest;

  @State() items: NavigationItem[] = [];

  private sidebar: JQuery<HTMLElement>;

  @Watch('open')
  watchHandler(newValue: boolean, oldValue: boolean) {
    this.sidebar.sidebar('toggle');
  }

  componentDidLoad() {

    this.el.classList.add('ui', 'sidebar', 'left', 'vertical', 'inverted', 'visible');

    this.sidebar = $(this.el).sidebar({
      context: $(this.el.parentElement) as JQuery<HTMLElement>,
      dimPage: false,
      closable: false
    });
  }

  @Watch('manifest')
  manifestLoadedHandler() {
    this.items = this.page();
  }

  page() {

    if (this.manifest) {

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
    else {
      return Array.from([]);
    }
  }

  render() {
    return (
      <div>
        <ul class="hv-navigation_list ui two column compact centered grid">
          {this.items.map((item, index) =>
            <li class={(this.current == index) ? "active" : ""}>
              <a href="javascript:;">
                <img src={item.thumbnailUrl} class="ui image tiny" alt={item.title} />
              </a>
              {/* <span class="ui bottom attached label">
                {item.title}
              </span> */}
            </li>
          )}
        </ul>
      </div>
    );
  }
}