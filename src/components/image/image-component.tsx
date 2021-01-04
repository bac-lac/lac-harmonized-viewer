import { Component, Prop, h, Element, Event, EventEmitter, Host, State, Method, Listen } from '@stencil/core';
import { Unsubscribe, Store } from '@stencil/redux';
import { viewItem } from '../../store/actions/viewport';
import { isNumber } from 'util';
import { resolveViewportType } from '../../utils/viewport';
import tippy, { sticky, Props, Instance } from 'tippy.js';
import { t } from '../../services/i18n-service';
import axios from 'axios'
import { selectCurrentItem } from '../../store/selectors/item';
import { getInstance,isPDFChildElement } from '../../utils/utils';
import { MDCSnackbar } from '@material/snackbar';

@Component({
    tag: 'harmonized-image',
    styleUrl: 'image-component.scss'
})
export class ImageComponent {

    @Element() el: HTMLElement

    @Prop() src: string
    @Prop() contentType: string
    @Prop() srcset: string
    @Prop() preload: boolean = false
    @Prop({ reflect: true }) page: number
    @Prop() caption: string = "" // also title
    @Prop() showCaption: boolean
    @Prop() showTooltip: boolean

    @State() loading: boolean = false
    @State() loaded: boolean = false
    @State() failed: boolean = false
    @State() props: string[] = []

    @State() currentItem: DocumentPage
    @State() items: MyAppState["viewport"]["items"] = []
    @State() configuration: MyAppState["document"]["configuration"]

    viewItem: typeof viewItem
    storeUnsubscribe: Unsubscribe

    @State() currentItemIndex: number

    @Prop({ context: "store" }) store: Store

    @Event() imageAdded
    @Event() imageLoad

    private tooltip: Instance<Props>
    @Method()
    async addImageProperty(value: string): Promise<void> {
        if (!this.props.find(prop => prop == value)) {
            this.props = [...this.props, value];
        }
    }

    @Method()
    async removeImageProperty(value: string): Promise<void> {
        if (this.props.find(prop => prop == value)) {
            this.props = this.props.filter(prop => prop != value);
        }
    }

    @Method()
    async LoadPDFSplitData(): Promise<void> {
        const eCopy = this.getImageTitle(this.currentItemIndex);
        const uccUrl = this.configuration.uccApi + '/Read/' + eCopy;
        this.getUccSetting(uccUrl, eCopy);
        setTimeout(() => {
            this.getNavigationChildElement(this.contentType);
        }, 1000)

    }
    @Method()
    async LoadImageData(index): Promise<void> {        
        this.handleImageData(index);
    }

    componentWillLoad() {
        this.store.mapDispatchToProps(this, { viewItem })
        this.storeUnsubscribe = this.store.mapStateToProps(this, (state: MyAppState) => {
            const {
                document: { configuration },
                viewport: { itemIndex, items },
            } = state
            return {
                currentItemIndex: itemIndex,
                currentItem: selectCurrentItem(state),
                configuration,
                items
            }
        })
    }
    componentDidLoad() {
        if (this.page == 0) {
            if (this.items[0].contentType.includes('pdf')) {
                this.handleClick();
            }
        }
    }

    componentDidUnload() {
        this.storeUnsubscribe()
    }

    handleLoad(ev: Event) {
        this.loading = false
        this.loaded = true

        this.createTooltip()

        this.imageLoad.emit(ev)
    }

    handleError(ev: Event) {
        this.failed = true
        this.loading = false
        this.loaded = false
    }

    handleClick() {
        this.handleImageData(this.page);
    }

    handleImageData(itemPage: number) {
        const eCopy = this.items[itemPage].label[0].value;
        const selectedContentType = this.items[itemPage].contentType;
        if (isNumber(itemPage)) {
            if (selectedContentType.includes('pdf')) {
                const uccUrl = this.configuration.uccApi + '/Read/' + eCopy;
                this.getUccSetting(uccUrl, eCopy);

                setTimeout(() => {
                    const maxCurrentItemCount = this.items.filter(s => typeof s.parentEcopy == 'undefined').length;  //Count items that has child
                    this.viewItem(maxCurrentItemCount);   //this will load the first page of the pdf child
                    this.getNavigationChildElement(selectedContentType);
                }, 1000)
            }
            else {
                this.viewItem(itemPage)
                setTimeout(() => {
                    this.getNavigationChildElement(selectedContentType);
                }, 100);
            }
        }
    }

    async getUccSetting(url: string, eCopy: string) {
        if (!url) {
            return undefined
        }
        await axios.get(url, { validateStatus: status => status === 200 })
            .then(async (response) => {
                const uccData = response.data;
                if (uccData.digitalObject) {
                    if (uccData.digitalObject.id > 0) {
                        const rootUrl = window.location.hostname.includes('localhost')?'': 'https://stdigitalmanifests.blob.core.windows.net/pdfservice/';
                        const pdfManifestUrl =rootUrl +  eCopy + '.json';
                        await this.loadJsonData(pdfManifestUrl);
                    }
                }

            })
            .catch((e) => {
                this.viewItem(this.page);
            });

        return this;

    }

    //PDF Pages 
    async loadJsonData(url) {
        await fetch(url)
            .then(response => {
                if (!response.ok) {
                    this.viewItem(this.page);
                }
                return response.json();
            })
            .then(jsonResponse => {
                var data = jsonResponse;
                if (typeof data.status != 'undefined' ) {
                    if (data.status.includes('progress')) {
                        this.viewItem(this.page);
                        this.displaySnackBarMessage();
                    } else {
                        this.addPDFPageItems(data);    
                    }
                } else {
                    this.addPDFPageItems(data);
                }
                
                
            })
            .catch((error: Error) => {
                this.viewItem(this.page);
            });
    }
    displaySnackBarMessage(){
         // Temporary - to refactor
         const snackbarElem = document.querySelector('lac-harmonized-viewer .mdc-snackbar');
         if (snackbarElem !== undefined) {
           // Change label
           const snackbarLabel = snackbarElem.querySelector('.mdc-snackbar__label');
           if (snackbarLabel) {
             snackbarLabel.textContent = t('pdfsplitprocessing');

             const snackBar = new MDCSnackbar(snackbarElem);
             const snackBarDimissButton = snackbarElem.querySelector('button');
             if (snackBarDimissButton) {
               snackBarDimissButton.addEventListener('click', function () {
                 snackBar.close();
               })
             }

             snackBar.open();
           }
         }
    }

    addPDFPageItems(data: any) {

        if (data.images.length > 0) {
            //let hvEl = getInstance(this.el);
            //let hilChild=  hvEl.querySelector('harmonized-navigation-child')[0] as HTMLElement;

            let hilChild = isPDFChildElement();
            console.log('harmonized navigation child -> harmonized image list');
            console.log(hilChild);
            const parentItemCount = this.items.length;
            data.images.forEach((element, index) => {
                const title = this.getPDFChildImageTitle(element.urlImage);
                const item = this.items.find(s => s.image == element.urlImage);
                if (!this.isExist(item)) {
                    let page = {
                        id: this.currentItem.id,
                        contentType: 'image/jpeg',
                        label: this.setLabel(title),
                        image: element.urlImage,
                        tileSources: this.setTileSource(element.urlImage),
                        thumbnail: element.urlThumbnail,
                        metadata: this.currentItem.metadata,
                        height: element.height,
                        width: element.width,
                        parentEcopy: data.parentEcopy
                    } as DocumentPage;
                    this.items.push(page);

                    if (hilChild) {
                        
                        let hvImage = document.createElement('harmonized-image') as HTMLHarmonizedImageElement;
                        hvImage.src = page.thumbnail;
                        hvImage.contentType = page.contentType;
                        hvImage.page = parentItemCount + index;
                        hvImage.caption = t(page.label);
                        hvImage.showCaption = false;
                        hvImage.showTooltip = false;
                        hvImage.preload = index < 16;
                        console.log('adding child');
                        console.log(hvImage);
                        hilChild.appendChild(hvImage);
                    }
                }
            });
        }
    }

    getNavigationChildElement(selectedContentType: string) {
        let hvEl = getInstance(this.el);
        const navigationChild =  hvEl.querySelector('harmonized-navigation-child');
        navigationChild.displayPdfChildNavigation(selectedContentType);

        const navigation = hvEl.querySelector('harmonized-navigation') as any;
        navigation.togglePDFThumbnail();
    }

    isExist(value) {
        if (typeof value === 'undefined') {
            return false;
        } else {
            return true;
        }
    }

    setLabel(value: string) {
        return [{
            "locale": "en",
            "value": value
        }, {
            "locale": "fr",
            "value": value
        }]
    }

    setTileSource(url: string): any {
        return { "type": "image", "url": url };
    }
    getImageTitle(index: number) {
        console.log(this.items[index].label);
        const imgUrl = this.items[index].image;
        let title = '';
        const url = imgUrl.split('&');
        for (let x = 0; x < url.length; x++) {
            let item = url[x];
            if (item.includes('id')) {
                const items = item.split('=');
                title = items[1]
                break;
            }
        }
        return title;
    }

    getPDFChildImageTitle(imgUrl: string) {
        let title = '';
        const url = imgUrl.split('&');
        for (let x = 0; x < url.length; x++) {
            let item = url[x];
            if (item.includes('id')) {
                const items = item.split('=');
                title = items[1]
                break;
            }
        }
        return title;
    }
    //end PDF Pages 

    componentDidRender() {
        this.imageAdded.emit(this.el)
    }

    createTooltip() {
        if (!this.showTooltip) {
            return undefined
        }

        if (this.loaded && this.caption) {

            if (this.tooltip) {
                this.tooltip.destroy()
                this.tooltip = null
            }
            return this.tooltip = tippy(this.el, {
                appendTo: 'parent',
                theme: 'harmonized-dark',
                placement: 'bottom',
                distance: -5,
                animation: 'shift-toward',
                arrow: false,
                sticky: true,
                plugins: [sticky],
                content: this.caption
            })
        }
    }

    // Temporary thumbnail placeholder solution for pdf, audio and video content types.
    determineThumbnail(viewportType: string) {
        // Replace links with CDN hosted images pre-prod

        //console.log(`Rendering thumbnail for page ${this.page} with content type=${this.contentType} and src=${this.src}`);

        // No thumbnail placeholders
        if (this.src === null || this.src === '' || this.failed)
            return 'https://baclac.blob.core.windows.net/cdn/assets/placeholder-unavailable.jpeg';

        switch (viewportType) {
            case 'image':
                return this.src;

            case 'pdf':
                return 'https://baclac.blob.core.windows.net/cdn/assets/placeholder-pdf-white.jpg';

            case 'video':
                return 'https://baclac.blob.core.windows.net/cdn/assets/placeholder-video.jpeg';

            case 'audio':
                return 'https://baclac.blob.core.windows.net/cdn/assets/placeholder-audio.jpeg';

            default:
                return 'https://baclac.blob.core.windows.net/cdn/assets/placeholder-unavailable.jpeg';
        }
    }

    render() {

        let className = 'mdc-image-list__item'

        if (this.loading) {
            className += ' is-loading'
        }
        else if (this.loaded) {
            className += ' is-loaded'
        }
        else if (this.failed) {
            className += ' is-error'
        }
        else {
            className += ' is-ghost'
        }

        if (this.page === this.currentItemIndex) {
            className += ' is-active'
        }

        const labelId = `label-page-${this.page}`

        const viewportType: string = resolveViewportType(this.contentType);
        const thumbnailSrc = this.determineThumbnail(viewportType);

        return <Host
            role="button"
            class={className}
            onClick={this.loaded && this.handleClick.bind(this)}
            title={this.caption == "" ? t('untitled') : this.caption}>

            <div class="mdc-image-list__image-aspect-container" role="list">
                <ul class="inv" role="listitem">
                    <img
                        data-lazy-load
                        src={(this.preload && thumbnailSrc)}
                        data-src={thumbnailSrc}
                        alt={this.caption == "" ? t('untitled') : this.caption}
                        //srcset={(this.preload && this.srcset)}
                        class="mdc-image-list__image mdc-elevation--z2"
                        onLoad={this.handleLoad.bind(this)}
                        onError={this.handleError.bind(this)}
                        //aria-labelledby={labelId}
                        style={{
                            opacity: (this.loaded) ? '1' : '0'
                        }}
                        role="listitem"
                    />

                    {this.props.map((prop) =>
                        <li>{prop}</li>
                    )}

                </ul>
            </div>

            {/*
                this.showCaption &&
                <div class="mdc-image-list__supporting">
                    <span id={labelId} class="mdc-image-list__label">
                        {this.loaded ? this.caption : <span innerHTML="&nbsp;"></span>}
                    </span>
                </div>
            */}

        </Host>
    }
}