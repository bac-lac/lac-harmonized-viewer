import { Component, h, Event, EventEmitter, Listen } from '@stencil/core';

@Component({
  tag: 'hv-topbar',
  styleUrls: [
    'topbar-component.scss'
  ]
})
export class TopbarComponent {

  @Event({
    eventName: 'navigationToggled',
    composed: false,
    cancelable: true,
    bubbles: true
  })
  navigationToggled: EventEmitter;

  @Listen('click')
  navigationToggledHandler(event: CustomEvent) {
    this.navigationToggled.emit(event);
  }

  render() {
    return <div class="hv-topbar ui inverted menu">
      <div class="header item">
        Our Company
    </div>
      <a id="menu-toggle-navigation" class="item">
        About Us
    </a>
      <a class="item">
        Jobs
    </a>
      <a class="item">
        Locations
    </a>
    </div>;
  }
}
