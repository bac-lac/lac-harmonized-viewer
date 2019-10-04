import { Component, h, Element, Event, EventEmitter, Prop } from '@stencil/core';
import { Modal } from 'carbon-components';

@Component({
  tag: 'hv-topbar',
  styleUrl: 'topbar-component.scss'
})
export class TopbarComponent {

  @Element() el: HTMLElement;

  @Prop() title: string;
  @Prop() publisher: string;
  @Prop() thumbnail: string;

  @Event({
    eventName: 'navigationToggled',
    composed: false,
    cancelable: true,
    bubbles: true
  })
  navigationToggled: EventEmitter;

  showSettings() {
    var modal = this.el.querySelector('#modal-settings');
    console.log(modal);
    
    var modalInstance = Modal.create(modal);
    modalInstance.show();
  }

  render() {
    return (
      <div class="">
        <div class="bx--row">
          <div class="">
            <img src={this.thumbnail} class="hv--logo" alt={this.publisher} />
          </div>
          <div class="bx--col">
            <h1 innerHTML={this.title}></h1>
            <a innerHTML={this.publisher}></a>
          </div>
          <div class="bx--col">

            <button type="button" class="bx--btn bx--btn--secondary bx--btn--icon-only" onClick={e => this.showSettings()}>
              <i class="fas fa-cog"></i>
            </button>
            
            <hv-settings></hv-settings>

          </div>
        </div>
      </div>
    );
  }
}
