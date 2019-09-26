import { Component, Prop, h, Element, Watch } from '@stencil/core';

@Component({
  tag: 'hv-navigation',
  styleUrls: [
    'navigation-component.scss'
  ]
})
export class NavigationComponent {

  @Element() el: HTMLElement;
  @Prop() open: boolean = true;

  private sidebar: JQuery<HTMLElement>;

  @Watch('open')
  watchHandler(newValue: boolean, oldValue: boolean) {
    this.sidebar.sidebar('toggle');
  }

  componentDidLoad() {

    this.el.classList.add('ui', 'sidebar', 'left', 'vertical', 'inverted', 'menu', 'visible');

    this.sidebar = $(this.el).sidebar({
      context: $(this.el.parentElement) as JQuery<HTMLElement>
    });
  }

  render() {
    return (
      <nav>
        <a class="item">
          1
          </a>
        <a class="item">
          2
          </a>
        <a class="item">
          3
          </a>
      </nav>
    );
  }
}