import { Component, h } from '@stencil/core';

@Component({
    tag: 'harmonized-spinner',
    styleUrl: 'spinner-component.scss'
})
export class SpinnerComponent {

    render() {

        return (
            <div>
                <div class="lds-css ng-scope">
                    <div style={{ width: '100%', height: '100%' }} class="lds-interwind">
                        <div></div>
                        <div></div>
                    </div>
                </div>
                <div class="has-text-centered">
                    Please wait
                </div>
            </div>
        )
    }
}
