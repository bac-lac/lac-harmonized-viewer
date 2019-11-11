import { Component, h, Element, State, Prop } from '@stencil/core';
import { Unsubscribe, Store } from '@stencil/redux';
import { MyAppState, DocumentAnnotation } from '../../interfaces';
import { saveAnnotationVisibility } from '../../settings';
import iconExpand from '../../assets/material-design-icons/ic_add_24px.svg'
import iconCollapse from '../../assets/material-design-icons/ic_remove_24px.svg'
import { animate } from '../../utils/utils';

@Component({
    tag: 'hv-annotations',
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

    componentDidUnload() {
        this.storeUnsubscribe()
    }

    handleClick(ev: MouseEvent) {

        const target = ev.currentTarget as HTMLElement
        if (target) {

            //const collapsed = target.classList.contains('is-collapsed')
            target.classList.toggle('is-collapsed')

            // Persist state
            // const visible = !panel.classList.contains('is-hidden')

            // saveAnnotationVisibility(id, visible)
        }

        const icons = Array.from(this.el.querySelectorAll('.annotation-icon'))
        icons.forEach((icon) => {

            target.setAttribute('aria-hidden',
                icon.closest('.mdc-list-item').classList.contains('is-collapsed').toString())
        })
    }

    render() {

        return <nav class="mdc-list mdc-list--two-line mdc-list--dense">
            {
                this.annotations.map((annotation) => (
                    <a
                        class={this.renderAnnotationClass(annotation)}
                        onClick={this.handleClick.bind(this)}
                        data-id={annotation.id}
                        tabindex="0">

                        <span class="mdc-list-item__text">
                            {
                                annotation.label && <span class="mdc-list-item__primary-text">
                                    <span>{annotation.label}</span>
                                    <span
                                        class="annotation-icon annotation-icon--expand"
                                        aria-hidden={true}
                                        innerHTML={iconExpand}></span>
                                    <span
                                        class="annotation-icon annotation-icon--collapse"
                                        aria-hidden={true}
                                        innerHTML={iconCollapse}></span>
                                </span>
                            }
                            <span class="mdc-list-item__secondary-text" innerHTML={annotation.content}>
                            </span>
                        </span>

                    </a>
                ))
            }
        </nav>
    }

    renderAnnotationClass(annotation: DocumentAnnotation) {

        if (!annotation) {
            return undefined
        }

        let className = 'mdc-list-item'

        if (!annotation.name) {
            className += ' mdc-list--non-interactive'
        }

        if (!annotation.visible) {
            className += ' is-collapsed'
        }

        return className
    }
}