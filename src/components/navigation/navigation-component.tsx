import { Component, Prop, h, Element, Event, EventEmitter, Listen, Watch, State } from '@stencil/core';
import { NavigationItem } from '../../models/navigation-item';
import 'manifesto.js';

@Component({
  tag: 'hv-navigation',
  styleUrl: 'navigation-component.scss'
})
export class NavigationComponent {

  @Element() el: HTMLElement;

  @Prop() page: number = 0;
  @Prop() items: NavigationItem[] = [];

  @Event() goto: EventEmitter;

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
        {this.items.map((item, index) =>
          <li class={(this.page == index) ? "active" : ""}>
            <a href="javascript:;" onClick={(e) => this.onClick(e, index)}>
              <img src={item.thumbnailUrl} alt={item.title} />
            </a>
          </li>)}
      </ul>
    );
  }
}