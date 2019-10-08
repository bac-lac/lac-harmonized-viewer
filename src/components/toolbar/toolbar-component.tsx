import { Component, h } from '@stencil/core';

@Component({
  tag: 'hv-toolbar',
  styleUrls: [
    'toolbar-component.scss'
  ]
})
export class HVToolbar {

  render() {
    return (
      <div class="hv-flex hv-full-width">
        <div class="hv-flex-align-left">

          <button class="bx--btn bx--btn--ghost bx--btn--sm" type="button" title="Fullscreen">
            <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32" aria-hidden="true"><path d="M21 2v2h5.59L17 13.58 18.41 15 28 5.41V11h2V2h-9zm-6 16.42L13.59 17 4 26.59V21H2v9h9v-2H5.41L15 18.42z"></path><title>Fullscreen</title></svg>
          </button>

        </div>
        <div class="hv-flex-align-right hv-flex">

          <div class="">
            <button class="bx--btn bx--btn--ghost bx--btn--sm" type="button" title="Previous">
              <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32" aria-hidden="true"><path d="M10 16L20 6l1.4 1.4-8.6 8.6 8.6 8.6L20 26z"></path><title>Previous</title></svg>
            </button>
          </div>

          <div class="">
            1 of 400 pages
          </div>

          <div class="">
            <button class="bx--btn bx--btn--ghost bx--btn--sm" type="button" title="Next">
              <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32" aria-hidden="true"><path d="M22 16L12 26l-1.4-1.4 8.6-8.6-8.6-8.6L12 6z"></path><title>Next</title></svg>
            </button>
          </div>

        </div>
      </div>);
  }
}
