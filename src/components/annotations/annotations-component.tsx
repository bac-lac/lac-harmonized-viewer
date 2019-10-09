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
    }

    @Watch('manifest')
    manifestWatchHandler() {
        this.manifestAnnotations = this.manifest.getMetadata();
    }

    render() {
        return (<div class="hv-annotations__content">
            <dl>
                {this.manifestAnnotations.map(annotation => [
                    <dt innerHTML={annotation.getLabel()}></dt>,
                    <dd innerHTML={annotation.getValue()}></dd>]
                )}
            </dl>
        </div>);
    }
}