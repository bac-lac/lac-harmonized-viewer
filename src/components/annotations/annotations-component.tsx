import { Component, h, Element, State, Prop } from '@stencil/core';
import OverlayScrollbars from 'overlayscrollbars';
import { Unsubscribe, Store } from '@stencil/redux';
import { MyAppState } from '../../interfaces';
import { icon } from '@fortawesome/fontawesome-svg-core';
import { LocalStorage } from '../../services/storage-service';
import { ScrollbarService } from '../../services/scrollbar-service';

@Component({
    tag: 'hv-annotations',
    styleUrls: ['annotations-component.scss', '../../../node_modules/overlayscrollbars/css/OverlayScrollbars.min.css']
})
export class AnnotationsComponent {

    @Element() el: HTMLElement

    storeUnsubscribe: Unsubscribe

    @State() annotations: MyAppState["document"]["annotations"]

    @Prop({ context: "store" }) store: Store

    storage: LocalStorage
    scrollbars: ScrollbarService

    constructor() {
        this.scrollbars = new ScrollbarService()
        this.storage = new LocalStorage()
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
            const collapsed = panel.classList.contains('is-hidden')
            this.storage.set('annotation-' + id, JSON.stringify(collapsed))
        }
    }

    render() {
        return (
            <div class="annotations-content">
                {
                    this.annotations &&
                    <dl>
                        {
                            this.annotations.map((annotation) => [
                                <dt data-id={annotation.id}>
                                    <a onClick={this.handleClick.bind(this)}>
                                        {annotation.label ? annotation.label : 'Other'}
                                        <span class={!annotation.collapsed ? "icon is-hidden" : "icon"} innerHTML={icon({ prefix: 'fas', iconName: 'chevron-left' }).html[0]}>

                                        </span>
                                        <span class={annotation.collapsed ? "icon is-hidden" : "icon"} innerHTML={icon({ prefix: 'fas', iconName: 'chevron-down' }).html[0]}>

                                        </span>
                                    </a>
                                </dt>,
                                <dd class={annotation.collapsed && "is-hidden"} innerHTML={annotation.content}></dd>
                            ])
                        }
                    </dl>
                }
            </div>
        )
    }
}