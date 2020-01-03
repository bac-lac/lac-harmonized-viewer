import { Component, h, Prop, Element, Host, State } from '@stencil/core';
import Axios from 'axios';

@Component({
    tag: 'harmonized-video',
    styleUrl: 'video-component.scss'
})
export class VideoComponent {

    @Element() el: HTMLElement

    @Prop() url: string
    @Prop() contentType: string

    private sourceUrl: string
    private authorization: string

    private player: any;

    async componentDidLoad() {
        //await this.init()
    }

    async init() {

        try {
            const response = await Axios.get(this.url)

            //const serviceUrl = await centralResponse.text()
            this.authorization = response.headers['authorization'].replace("Bearer ", "")

            this.sourceUrl = response.data
            this.renderVideoPlayer()
        }
        catch (e) {
            console.error(e)
        }
    }

    async handlePlayerLoad() {
        await this.init()
    }

    render() {

        if (!this.url) {
            return undefined
        }

        return <Host class="video">
            <style id="azuremediaplayerstyles"></style>
            <script type="text/javascript" src="//amp.azure.net/libs/amp/latest/azuremediaplayer.min.js" onLoad={this.handlePlayerLoad.bind(this)}>
            </script>

            <video id="azuremediaplayer" class="azuremediaplayer amp-default-skin amp-big-play-centered embed-responsive-item" tabindex="0">
            </video>
        </Host>
    }

    renderVideoPlayer() {

        const video = this.el.querySelector('video')
        if (video) {

            const options = {
                "nativeControlsForTouch": false,
                "controls": true,
                "autoplay": true,
                "fluid": true
            }

            const videoPlayer = (window as any).amp(video, options)
            const style = this.el.querySelector('style');
            const resize = function() {
                const vjsStylesDimensions = document.querySelector('.vjs-styles-dimensions');
                style.innerHTML = vjsStylesDimensions ? vjsStylesDimensions.innerHTML : null;
            };
            window.addEventListener('resize', resize);
            window.dispatchEvent(new Event('resize'));

            videoPlayer.src([{
                "src": this.sourceUrl, //"https://www.radiantmediaplayer.com/media/bbb-360p.mp4",
                "type": this.contentType, //"video/mp4",
                "protectionInfo": [
                    {
                        "type": "AES",
                        "authenticationToken": `Bearer=${this.authorization}`
                    }
                ]
            }]);
        }
    }
}
