import { Component, h, Element, State, Prop } from '@stencil/core';
import { Unsubscribe, Store } from '@stencil/redux';
import { saveAnnotationVisibility } from '../../settings';
import iconOpenNew from '../../assets/material-icons/ic_open_new_24px.svg'
import iconExpand from '../../assets/material-design-icons/ic_add_24px.svg'
import iconCollapse from '../../assets/material-design-icons/ic_remove_24px.svg'
import { animate } from '../../utils/utils';
import { label } from '../../services/i18n-service';

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

    componentDidLoad() {

        const links = this.el.querySelectorAll('.mdc-list-item__secondary-text a')
        if (links) {

        }
    }

    componentDidUnload() {
        this.storeUnsubscribe()
    }

    componentDidRender() {

        const links = Array.from(this.el.querySelectorAll('.mdc-list .mdc-list-item .mdc-list-item__secondary-text a'))
        if (links) {
            links.forEach((link) => {

                const svg = document.createElement('i')
                svg.innerHTML = iconOpenNew
                link.append(svg)
            })
        }
    }

    handleExpandClick(ev: MouseEvent) {


    }

    render() {

        return <nav class="mdc-list mdc-list--two-line mdc-list--dense mdc-list--non-interactive">
            {
                this.annotations.map((annotation) => <div>
                    <div
                        tabindex="0"
                        class={this.renderAnnotationClass(annotation)}>
                        <span class="mdc-list-item__text">
                            {
                                annotation.label && <span class="mdc-list-item__primary-text">
                                    {label(annotation.label)}</span>
                            }
                            <span
                                class="mdc-list-item__secondary-text"
                                innerHTML={annotation.content}>
                            </span>
                        </span>
                    </div>

                    {/* {
                        this.isCollapsed(annotation) && <harmonized-button
                            label="Show More"
                            title="Show More"
                            fullWidth={true}
                            onClick={this.handleExpandClick.bind(this)} />
                    } */}

                </div>)
            }
        </nav>
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

        let className = 'mdc-list-item'

        if (this.isCollapsed(annotation)) {
            className += ' is-collapsed'
        }

        return className
    }
}