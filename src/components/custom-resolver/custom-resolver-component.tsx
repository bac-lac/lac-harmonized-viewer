import { Component, h, Prop } from '@stencil/core';
import { id } from '../../utils/utils';

@Component({
    tag: 'harmonized-custom-resolver'
})
export class CustomResolverComponent {

    //@Prop({ reflect: true }) id: string
    @Prop({ reflect: true }) contentType: string

    @Prop() url: string

    componentDidLoad() {
        //this.id = id()
    }

}
