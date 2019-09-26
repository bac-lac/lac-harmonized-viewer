import { Component, h, Prop, Element } from '@stencil/core';

@Component({
  tag: 'hv-content',
  styleUrl: 'content-component.scss'
})
export class ContentComponent {

  @Element() el: HTMLElement;
  @Prop() navigation: HTMLHvNavigationElement;

  render() {
    return (
      <div class="ui attached pushable">

        <hv-navigation class="hv-navigation" ref={ elem => this.navigation = elem as HTMLHvNavigationElement }></hv-navigation>

        <main class="hv-main pusher">
          <hv-viewport class="hv-viewport"></hv-viewport>
        </main>

      </div>
    );
  }
}