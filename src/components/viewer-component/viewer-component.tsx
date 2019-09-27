import { Component, h, Element, Listen, Prop } from '@stencil/core';

@Component({
  tag: 'harmonized-viewer',
  styleUrls: [
    'viewer-component.scss',
    '../../assets/semantic-ui/semantic.css',
    '../../../node_modules/@fortawesome/fontawesome-free/css/all.css'
  ],
  shadow: true
})
export class ViewerComponent {

  @Element() el: HTMLElement;
  @Prop() topbar: HTMLHvTopbarElement;

  @Listen('navigationToggled')
  toggleNavigation(event: CustomEvent) {
    var content = this.el.shadowRoot.querySelector('.hv-content') as HTMLHvContentElement;
    content.navigation.open = !content.navigation.open;
  }

  render() {
    return (
      <div class="harmonized-viewer">
        <hv-topbar class="hv-topbar" ref={elem => this.topbar = elem as HTMLHvTopbarElement} onNavigationToggled={ev => this.toggleNavigation(ev)}></hv-topbar>
        {/* <hv-toolbar class="hv-toolbar"></hv-toolbar> */}
        <hv-content class="hv-content"></hv-content>
      </div>
    );
  }
}