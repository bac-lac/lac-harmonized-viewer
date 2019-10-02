import { Component, Prop, h, Element, Watch, State, Event, EventEmitter } from '@stencil/core';
import { NavigationItem } from '../../models/navigation-item';
import 'manifesto.js';

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

  @Event() goTo: EventEmitter;

  @Watch('open')
  watchHandler(newValue: boolean, oldValue: boolean) {
    this.sidebar.sidebar('toggle');
  }

  @Watch('manifest')
  manifestLoadedHandler() {
    this.items = this.page();
  }

  page() {

    if (this.manifest) {

      
    }
    else {
      return Array.from([]);
    }
  }

  

  render() {
    return (
      <div>
        
      </div>
    );
  }
}