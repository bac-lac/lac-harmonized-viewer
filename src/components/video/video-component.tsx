import { Component, h, Prop, Element, Host, State, Event, EventEmitter } from '@stencil/core';
import { Unsubscribe, Store } from '@stencil/redux';

@Component({
    tag: 'harmonized-video',
    styleUrl: 'video-component.scss'
})
/*
    To provide a custom video, you must:
    1 - Listen to the 'hvCustomVideoPlayerRender' DOM event
    2 - On event, querySelect the harmonized viewer (#harmonized-viewer)
    3 - then querySelect the harmonized-viewer's shadow-root for the #harmonized-viewer-custom-video container
    4 - inject your on video within this element => do not inject any <link /> elements
*/
export class VideoComponent {

    @Element() el: HTMLElement

    @Prop({ context: "store" }) store: Store

    @Prop() url: string
    @Prop() contentType: string

    storeUnsubscribe: Unsubscribe

    @State() customVideoPlayer: boolean = false;

    @Event({ eventName: 'hvCustomVideoPlayerRender' }) customVideoPlayerRender: EventEmitter;

    componentWillLoad() {
        this.storeUnsubscribe = this.store.mapStateToProps(this, (state: MyAppState) => {
            const {
                document: { configuration: { customVideoPlayer } }
            } = state
            return {
                customVideoPlayer
            }
        });
    }

    componentDidLoad() {
        if (this.customVideoPlayer) {
            this.customVideoPlayerRender.emit({ url: this.url, contentType: this.contentType });
        }
    }

    componentDidUnload() {
        this.storeUnsubscribe()
    }

    componentDidUpdate() {
        if (this.customVideoPlayer) {
            this.customVideoPlayerRender.emit({ url: this.url, contentType: this.contentType });
        }
    }

    render() {
        if (!this.url) {
            return undefined
        }

        return <Host class="video">
                    {this.customVideoPlayer
                        ?   <div id="harmonized-viewer-custom-video">

                            </div>
                        :   <div id="harmonized-viewer-html5-video">
                                <video controls>
                                    <source src={this.url} type={this.contentType}>
                                        This browser does not support the HTML5 video element.
                                    </source>
                                </video>
                            </div>
                    }
                </Host>;
    }
}
