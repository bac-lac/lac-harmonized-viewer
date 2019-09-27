import { Component, Element, h, Prop, Event, EventEmitter, State } from '@stencil/core';
import openseadragon from 'openseadragon';
import 'manifesto.js';

@Component({
    tag: 'hv-viewport',
    styleUrl: 'viewport-component.scss'
})
export class ViewportComponent {

    @Element() el: HTMLElement;

    @Prop() manifest: string;
    @Prop() openseadragon: any;

    @State() current: number = 0;

    @Event() manifestLoaded: EventEmitter;
    @Event() pageLoaded: EventEmitter;

    componentDidLoad() {

        if (this.openseadragon) {
            this.openseadragon.destroy();
            this.openseadragon = null;
        }

        var topbar = this.root().querySelector('.hv-topbar') as HTMLHvTopbarElement;

        var instance = this.el.querySelector('.hv-openseadragon');

        manifesto.loadManifest(this.manifest)
            .then((manifestJson: string) => {

                const manifest = manifesto.create(manifestJson) as Manifesto.IManifest;

                this.manifestLoaded.emit(manifest);

                topbar.title = manifest.getDefaultLabel();
                topbar.publisher = manifest.getMetadata().find(x => x.getLabel() == 'Creator').getValue();
                topbar.thumbnail = manifest.getLogo();

            })
            .finally(() => {

                this.openseadragon = openseadragon({
                    element: instance,
                    prefixUrl: "/dist/vendors/openseadragon/images/",
                    animationTime: 0.25,
                    springStiffness: 10.0,
                    showNavigator: true,
                    navigatorPosition: "BOTTOM_RIGHT",
                    showNavigationControl: false,
                    showSequenceControl: false,
                    sequenceMode: true,
                    tileSources: {
                        type: 'legacy-image-pyramid',
                        levels: [{
                            url: 'https://openseadragon.github.io/example-images/rbc/rbc0001/2003/2003rosen1799/0001q.jpg',
                            height: 889,
                            width: 600
                        }, {
                            url: 'https://openseadragon.github.io/example-images/rbc/rbc0001/2003/2003rosen1799/0001r.jpg',
                            height: 2201,
                            width: 1485
                        }, {
                            url: 'https://openseadragon.github.io/example-images/rbc/rbc0001/2003/2003rosen1799/0001v.jpg',
                            height: 4402,
                            width: 2970
                        }]
                    }
                });

                this.openseadragon.addHandler('open', (eventSource: any) => {

                    var shadow = document.createElement('div');
                    shadow.style.backgroundColor = 'transparent';

                    // context.rect(188, 40, 200, 100);
                    // context.shadowColor = '#999';
                    // context.shadowBlur = 20;
                    // context.shadowOffsetX = 15;
                    // context.shadowOffsetY = 15;
                    // context.fill();
                    // context.clearRect(188, 40, 200, 100);

                    var bounds = this.openseadragon.world.getItemAt(0).getBounds();

                    shadow.style.width = bounds.width.toString() + 'px';
                    shadow.style.height = bounds.height.toString() + 'px';
                    shadow.style.boxShadow = '5px 5px 12px 3px rgba(76, 86, 106, 0.3)';

                    this.openseadragon.addOverlay(shadow, bounds, 'CENTER');

                    this.pageLoaded.emit(this.openseadragon.currentPage());

                });
            });
    }

    private root(element?: HTMLElement) {

        if (!element) {
            element = this.el;
        }

        if (element.parentElement) {
            return this.root(element.parentElement);
        }
        else {
            return element;
        }
    }

    render() {
        return (
            <div class="hv-viewport__inner">
                <button type="button" class="hv-navigation__prev ui button">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <div class="hv-openseadragon">
                </div>
            </div>
        );
    }
}