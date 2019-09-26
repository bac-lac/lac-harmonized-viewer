import { Component, Prop, h } from '@stencil/core';
//import { HeaderNavigation } from 'carbon-components';
// import { getAttributes, toString } from '@carbon/icon-helpers';
// import settingIcon from '@carbon/icons/es/settings/32';

@Component({
  tag: 'harmonized-viewer',
  styleUrls: [
    'viewer-component.scss',
  ]
})
export class ViewerComponent {

  @Prop() name: string;

  componentDidLoad() {
    console.log('loaded');
    //ContentSwitcher.create(document.getElementById('my-content-switcher'));
  }

  render() {

    return (
      <div class="container">

        
        <button type="button" class="hv--btn hv--btn--primary">
          aa
        </button>
        

      </div>
    );
  }
}