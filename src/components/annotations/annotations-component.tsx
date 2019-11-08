import { Component, h, Element, State, Prop } from '@stencil/core';
import { Unsubscribe, Store } from '@stencil/redux';
import { MyAppState } from '../../interfaces';
import { ScrollbarService } from '../../services/scrollbar-service';
import { saveAnnotationVisibility } from '../../settings';

@Component({
    tag: 'hv-annotations',
    styleUrl: 'annotations-component.scss'
})
export class AnnotationsComponent {

    @Element() el: HTMLElement

    storeUnsubscribe: Unsubscribe

    @State() annotations: MyAppState["document"]["annotations"]

    @Prop({ context: "store" }) store: Store

    scrollbars: ScrollbarService

    constructor() {
        this.scrollbars = new ScrollbarService()
    }

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

    componentDidRender() {

        // Initialize scrollbars, register new elements with lazy loading
        const inner = this.el.querySelector('.annotations-content') as HTMLElement
        if (inner) {
            this.scrollbars.init(inner)
        }
    }

    handleClick(ev: MouseEvent) {

        const target = ev.currentTarget as HTMLElement
        if (target) {

            const dt = target.closest('dt')
            const panel = dt.nextElementSibling
            const id = dt.getAttribute('data-id')

            // Toggle annotation panel
            Array.from(target.querySelectorAll('.icon')).forEach((icon) => {
                icon.classList.toggle('is-hidden')
            })
            panel.classList.toggle('is-hidden')

            // Persist state
            const visible = !panel.classList.contains('is-hidden')

            saveAnnotationVisibility(id, visible)
        }
    }

    render() {
        return (
            <div class="annotations-content">

                <ul class="mdc-list">
                    {
                        this.annotations.map((annotation, index) => (
                            <li class={!annotation.visible ? "mdc-list-item is-hidden" : "mdc-list-item"} data-id={annotation.id} tabindex={index}>
                                <span class="mdc-list-item__text" onClick={this.handleClick.bind(this)}>

                                    <span class="mdc-list-item__primary-text">
                                        {annotation.label ? annotation.label : 'Other'}
                                        {/* <span class={!annotation.visible ? "icon is-hidden" : "icon"} innerHTML={icon({ prefix: 'fas', iconName: 'plus' }).html[0]}>
                                        </span>
                                        <span class={annotation.visible ? "icon is-hidden" : "icon"} innerHTML={icon({ prefix: 'fas', iconName: 'minus' }).html[0]}>
                                        </span> */}
                                    </span>

                                    <span class="mdc-list-item__secondary-text">
                                        {annotation.content}
                                    </span>

                                </span>
                                <span class="mdc-list-item__meta">
                                    {/* <span innerHTML={icon({ prefix: 'fas', iconName: 'minus' }).html[0]}>
                                    </span> */}
                                </span>

                            </li>))
                    }
                </ul>
            </div>
        )
    }
}