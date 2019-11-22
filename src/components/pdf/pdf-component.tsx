import { Component, h, Element, Prop, State } from '@stencil/core';
import "../../utils/icon-library";
import { Unsubscribe, Store } from '@stencil/redux';

@Component({
    tag: 'harmonized-embed',
    styleUrl: 'pdf-component.scss'
})
export class PdfComponent {

    @Element() el: HTMLElement

    storeUnsubscribe: Unsubscribe

    @State() loading: MyAppState["document"]["loading"]
    @State() url: MyAppState["document"]["url"]

    @Prop({ context: "store" }) store: Store

    componentWillLoad() {

        this.storeUnsubscribe = this.store.mapStateToProps(this, (state: MyAppState) => {
            const {
                document: { loading: loading, url: url }
            } = state
            return {
                loading: loading,
                url: url
            }
        })
    }

    componentDidUnload() {
        this.storeUnsubscribe()
    }

    render() {
        return <embed src={this.url}></embed>
    }
}
