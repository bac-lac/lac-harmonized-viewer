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

    private fseAuthorization: string
    private fseUrl: string

    private sourceAuthorization: string
    private sourceUrl : string

    // We currently assume that all video files have an authorization flow like so:
    // - Get authorization token from internal provider
    // - Check authorization token to FSE and receive new token and url to media storage
    // - Set AES + streaming location in video player
    async handlePlayerLoad() {
        // Shadow DOM doesn't support font face setting. Have to bring it up to the HEAD of the document.
        if (!document.querySelector('#harmonized-viewer-azuremediaplayer-style')) {
            const fontFaceStyle = document.createElement('style');
            fontFaceStyle.id = 'harmonized-viewer-azuremediaplayer-style';
            document.head.appendChild(fontFaceStyle);
            fontFaceStyle.innerHTML = `
                @font-face {
                    font-family: azuremediaplayer;
                    src: url("http://amp.azure.net/libs/amp/latest/skins/amp-default/assets/fonts/azuremediaplayer.eot");
                    src: url("http://amp.azure.net/libs/amp/latest/skins/amp-default/assets/fonts/azuremediaplayer.woff") format("woff"), url("http://amp.azure.net/libs/amp/latest/skins/amp-default/assets/fonts/azuremediaplayer.ttf") format("truetype"), url("http://amp.azure.net/libs/amp/latest/skins/amp-default/assets/fonts/azuremediaplayer.svg#icomoon") format("svg");
                    font-weight: normal;
                    font-style: normal
                }
            `;
        }

        await Axios.get(this.url)
        .then((response) => {
            if (response.status === 200) {
                this.fseAuthorization = response.headers['authorization'].replace("Bearer ", "");
                this.fseUrl = response.data;

                return Axios.get(this.fseUrl, { headers: { 'Authorization': 'bearer ' + this.fseAuthorization }});
            } else {
                // error
            }
        })
        .then((response) => {
            if (response.status === 200 && response.data) {
                this.sourceAuthorization = response.data.token;
                this.sourceUrl = response.data.url;

                this.renderVideoPlayer();
            } else {
                // error
            }
        })
        .catch((e) => {
            console.log(e);
            // Render video error
        });
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
                "type": "application/vnd.ms-sstr+xml", //"video/mp4",
                "protectionInfo": [
                    {
                        "type": "AES",
                        "authenticationToken": `Bearer=${this.sourceAuthorization}`
                    }
                ]
            }]);
        }
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
}
