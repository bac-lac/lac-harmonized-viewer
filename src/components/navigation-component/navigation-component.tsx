import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'hv-navigation',
  styleUrls: [
    'navigation-component.scss'
  ]
})
export class NavigationComponent {

  @Prop() name: string;

  componentDidLoad() {
    console.log('loaded');
  }

  render() {

    return (
      <nav class="bx--side-nav__navigation bx--side-nav bx--side-nav--expanded bx--side-nav--ux">
        test
      </nav>
    );
  }
}