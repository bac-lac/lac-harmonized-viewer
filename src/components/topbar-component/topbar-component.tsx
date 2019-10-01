import { Component, h, Element, Event, EventEmitter, Listen, Prop } from '@stencil/core';

@Component({
  tag: 'hv-topbar',
  styleUrls: [
    'topbar-component.scss'
  ]
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

  settingsHandler(event: MouseEvent) {
    //var settings = document.querySelector('.hv-settings');
    //console.log($('.hv-settings .ui.modal'));

  }

  componentDidLoad() {
    console.log('did load');
    $('.hv-settings .ui.modal').modal({
      detachable: false
    }).modal('show');
  }

  render() {
    return <div class="ui container fluid">
      <div class="ui grid">
        <div class="row">
          <div>
            <img src={this.thumbnail} class="ui tiny image" alt={this.publisher} />
          </div>
          <div class="ten wide column">

            <div class={this.title ? "" : "ui placeholder"}>
              <div class="image header">
                <h1 class={this.title ? "" : "line"} innerHTML={this.title}></h1>
                <a class={this.publisher ? "" : "line"} innerHTML={this.publisher}></a>
              </div>
            </div>

          </div>
          <div class="right aligned two wide column">

            {/* <button type="button" class="ui icon button" onClick={(e) => this.settingsHandler(e)}>
              <i class="fas fa-cog"></i>
            </button> */}

          </div>
        </div>
      </div>
    </div>;
  }
}
