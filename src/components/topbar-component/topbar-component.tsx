import { Component, h, Event, EventEmitter, Listen, Prop } from '@stencil/core';

@Component({
  tag: 'hv-topbar',
  styleUrls: [
    'topbar-component.scss'
  ]
})
export class TopbarComponent {

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

  @Listen('click')
  navigationToggledHandler(event: CustomEvent) {
    this.navigationToggled.emit(event);
  }

  render() {
    return <div class="ui container fluid">
      <div class="ui middle aligned three column padded grid">
        <div class="row">
          <div>
            <img src={this.thumbnail} class="ui tiny image" alt={this.publisher} />
          </div>
          <div class="six wide column">
            <div class={this.title ? "" : "ui placeholder"}>
              <div class="image header">
                <h1 class={this.title ? "" : "line"} innerHTML={this.title}></h1>
                <a class={this.publisher ? "" : "line"} innerHTML={this.publisher}></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
  }
}
