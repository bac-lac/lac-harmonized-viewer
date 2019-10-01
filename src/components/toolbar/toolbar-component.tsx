import { Component, h } from '@stencil/core';

@Component({
  tag: 'hv-toolbar',
  styleUrls: [
    'toolbar-component.scss'
  ]
})
export class HVToolbar {

  render() {
    return <div class="ui menu">
      <div class="menu">
        <a id="menu-toggle-navigation" class="item">
          About Us
        </a>
        <a class="item">
          Jobs
        </a>
        <a class="item">
          Locations
        </a>
      </div>
      <div class="menu right">
        <a class="item">
          <i class="fas fa-cog"></i>
        </a>
      </div>
    </div>;
  }
}
