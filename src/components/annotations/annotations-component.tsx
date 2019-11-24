import { Component, h, Element, State, Prop } from '@stencil/core';
import { Unsubscribe, Store } from '@stencil/redux';
import iconExpand from '../../assets/material-design-icons/ic_add_24px.svg'
import iconCollapse from '../../assets/material-design-icons/ic_remove_24px.svg'
import { animate } from '../../utils/utils';
import { translate } from '../../services/i18n-service';

@Component({
    tag: 'harmonized-annotations',
    styleUrl: 'annotations-component.scss'
})
export class AnnotationsComponent {

    @Element() el: HTMLElement

    storeUnsubscribe: Unsubscribe

    @State() annotations: MyAppState["document"]["annotations"]

    @Prop({ context: "store" }) store: Store

    componentWillLoad() {

        this.storeUnsubscribe = this.store.mapStateToProps(this, (state: MyAppState) => {
            const {
                document: { annotations: annotations }
            } = state
            return {
                annotations: annotations
            }
        })
    }

    componentDidLoad() {

        const links = this.el.querySelectorAll('.mdc-list-item__secondary-text a')
        if (links) {

        }
    }

    componentDidUnload() {
        this.storeUnsubscribe()
    }

    handleExpandClick(ev: MouseEvent) {


    }

    render() {

        return <dl class="annotation-list">
            {
                this.annotations.map((annotation) => [
                    <dt tabindex="0" class={this.renderAnnotationClass(annotation)}>
                        {
                            annotation.label &&
                            <span>{translate(annotation.label)}</span>
                        }
                    </dt>,
                    <dd>
                        <span innerHTML={annotation.content}>
                        </span>
                    </dd>
                ])
            }
        </dl>
    }

    isCollapsed(annotation: DocumentAnnotation) {
        if (!annotation) {
            return undefined
        }
        return annotation.content.length > 100
    }

    renderAnnotationClass(annotation: DocumentAnnotation) {

        if (!annotation) {
            return undefined
        }

        let className = ''

        if (this.isCollapsed(annotation)) {
            className += ' is-collapsed'
        }

        return className
    }
}