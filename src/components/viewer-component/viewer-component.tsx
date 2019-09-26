import { Component, h, Element, Listen } from '@stencil/core';

@Component({
  tag: 'harmonized-viewer',
  styleUrls: [
    'viewer-component.scss',
    '../../assets/semantic-ui/semantic.css'
  ],
  shadow: true
})
export class ViewerComponent {

  @Element() el: HTMLElement;

  @Listen('navigationToggled')
  toggleNavigation(event: CustomEvent) {
    var content = this.el.shadowRoot.querySelector('.hv-content') as HTMLHvContentElement;
    console.log('viewer toggle', content);
    content.navigation.open = !content.navigation.open;
  }

  render() {
    return (
      <div class="harmonized-viewer">
        <hv-topbar class="hv-topbar" onNavigationToggled={ev => this.toggleNavigation(ev)}></hv-topbar>
        <hv-content class="hv-content"></hv-content>
      </div>
    );
  }
}