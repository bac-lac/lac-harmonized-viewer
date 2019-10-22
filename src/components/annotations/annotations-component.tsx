import { Component, Prop, h, Element, Watch, State } from '@stencil/core';
import OverlayScrollbars from 'overlayscrollbars';

@Component({
    tag: 'hv-annotations',
    styleUrls: ['annotations-component.scss', '../../../node_modules/overlayscrollbars/css/OverlayScrollbars.min.css']
})
export class AnnotationsComponent {

    @Element() el: HTMLElement;

    @Prop() manifest: Manifesto.IManifest;
    @Prop() page: number;

    @State() manifestAnnotations: Manifesto.LabelValuePair[] = [];

    private scrollbars: OverlayScrollbars;

    componentDidRender() {

        // Initialize custom scrollbars
        if (this.scrollbars) {
            this.scrollbars.destroy();
        }
        this.scrollbars = OverlayScrollbars(this.el.querySelector('.hv-annotations__content'), {});

        const annotationList = this.el.querySelector('[data-accordion]');
        if (annotationList) {
            //Accordion.create(annotationList);
        }
    }

    @Watch('manifest')
    manifestWatchHandler() {
        this.manifestAnnotations = this.manifest.getMetadata();
    }

    render() {
        return (<div class="hv-annotations__content">
            {this.manifestAnnotations.length == 0 ?
                <span></span> :
                <ul data-accordion class="bx--accordion">

                    {this.manifestAnnotations.map((annotation, index) =>
                        <li data-accordion-item class="bx--accordion__item">
                            <button class="bx--accordion__heading" aria-expanded="false" aria-controls={"panel" + index}>
                                <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" class="bx--accordion__arrow" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M11 8l-5 5-.7-.7L9.6 8 5.3 3.7 6 3z"></path></svg>
                                <div class="bx--accordion__title" innerHTML={annotation.getLabel()}></div>
                            </button>
                            <div id={"panel" + index} class="bx--accordion__content" innerHTML={annotation.getValue()}>
                            </div>
                        </li>
                    )}

                </ul>}
        </div>);
    }
}