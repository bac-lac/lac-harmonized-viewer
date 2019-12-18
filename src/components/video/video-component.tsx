import { Component, h, Prop, Element, Host, State } from '@stencil/core';
import Axios from 'axios';

@Component({
    tag: 'harmonized-video'
})
export class VideoComponent {

    @Element() el: HTMLElement

    @Prop() url: string

    @State() sourceUrl: string
    @State() authorization: string

    async componentDidLoad() {
        await this.init()
    }

    async init() {

        try {
            const response = await Axios.get(this.url)

            //const serviceUrl = await centralResponse.text()
            const authorization = response.headers['authorization']

            const cloudResponse = await Axios.get(
                response.data, { headers: { 'Authorization': authorization } })

            // If successfull, render video player
            if (cloudResponse.status >= 200 && cloudResponse.status < 400) {

                this.sourceUrl = cloudResponse.data.url && cloudResponse.data.url
                this.authorization = cloudResponse.data.token && cloudResponse.data.token

                this.renderVideoPlayer()
            }
        }
        catch (e) {
            console.error(e)
        }
    }

    handlePlayerLoad() {
        this.init().then((value) => {

        })
    }

    render() {

        if (!this.url) {
            return undefined
        }

        return <Host class="video">

            {/* <link type="text/css" href="//amp.azure.net/libs/amp/latest/skins/amp-default/azuremediaplayer.min.css"
                rel="stylesheet" /> */}
            <script type="text/javascript" src="//amp.azure.net/libs/amp/latest/azuremediaplayer.min.js"
                onLoad={this.handlePlayerLoad.bind(this)}>
            </script>

            <video id="vid1" class="embed-responsive-item azuremediaplayer amp-default-skin amp-big-play-centered">
                <p class="amp-no-js">
                    To view this video please enable JavaScript, and consider upgrading to a web browser that supports HTML5 video
                </p>
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
                "logo": {
                    "enabled": false
                }
            }

            const videoPlayer = (window as any).amp(video, options)

            videoPlayer.src([{
                "src": this.sourceUrl,
                "type": "application/vnd.ms-sstr+xml",
                "protectionInfo": [
                    {
                        "type": "AES",
                        "authenticationToken": `Bearer=${this.authorization}`
                    }
                ]
            }])
        }
    }
}
