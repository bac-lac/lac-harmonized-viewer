import { Component, Host, h, Element, Prop, Method, State, Watch, Event, EventEmitter, Listen } from '@stencil/core';
import "@stencil/redux";
import { Store, Unsubscribe } from "@stencil/redux";
import { configureStore } from "../../store";
import { addOverlay, setOptions, setLanguage, addLanguage, setConfiguration } from '../../store/actions/document';
import i18next from 'i18next';
import { AppConfig } from '../../app.config';
import { fetchManifest } from '../../store/actions/manifest';
import { viewItem, toggleFullscreen, toggleDrawer } from '../../store/actions/viewport';
import iconError from '../../assets/material-icons/ic_error_24px.svg'
import { Item } from '../../models/item';
import { t } from '../../services/i18n-service';
import { resolveViewportType } from '../../utils/viewport';
import { addEventListenerToRunOnce } from '../../utils/utils';

@Component({
	tag: 'harmonized-viewer',
	styleUrls: [
		'viewer-component.scss',
		'../../themes/index.scss'
	],
	shadow: true
})
export class ViewerComponent {
	@Element() el: HTMLElement

	//@Prop() language: string

	@Prop() navigationEnable: boolean
	@Prop() navigationPlacement: PlacementType = "bottom"
	@Prop() navigationCols: number = 16
	@Prop() navigationRows: number = 1
	@Prop() navigationBackgroundColor: string

	@Prop() url: string
	@Prop() manifestFallBackUrl: string;
	@Prop() language: string
	@Prop({ attribute: 'customvideoplayer'}) customVideoPlayer: boolean = false;
	@Prop() customItemProps: string[] = [];
	@Prop() preventLoadOnEmpty: boolean = false;
	@Prop({ attribute: 'deepzoom'}) deepzoomEnabled: boolean = true
	@Prop() suppressGallery: boolean = false;

	addLanguage: typeof addLanguage
	addOverlayState: typeof addOverlay
	setConfiguration: typeof setConfiguration
	setLanguage: typeof setLanguage
	setOptions: typeof setOptions

	fetchManifest: typeof fetchManifest

	viewItem: typeof viewItem
	toggleFullscreen: typeof toggleFullscreen
	toggleDrawer: typeof toggleDrawer

	storeUnsubscribe: Unsubscribe

	@State() configuration: MyAppState["document"]["configuration"]
	@State() theme: MyAppState["document"]["theme"]

	@State() manifestError: MyAppState['manifest']['error']
	@State() manifestFetching: MyAppState['manifest']['fetching']
	@State() manifestFetched: MyAppState['manifest']['fetched']

	@State() currentItemIndex: MyAppState['viewport']['itemIndex']
	@State() items: MyAppState['viewport']['items']
	@State() fullscreen: MyAppState['viewport']['fullscreen']
	@State() infoShown: MyAppState['viewport']['infoShown']

	@Prop({ context: "store" }) store: Store

	// Change all event names to prefix hv *eventually*
	@Event({ eventName: 'hvRender' }) rendered: EventEmitter
	@Event({ eventName: 'hvManifestError' }) manifestErrorOccurred: EventEmitter
	@Event({ eventName: 'hvManifestIsEmpty' }) manifestIsEmpty: EventEmitter
	@Event({ eventName: 'itemChanged' }) itemChanged: EventEmitter
	@Event({ eventName: 'itemsLoaded' }) itemsLoaded: EventEmitter


	// Currently assume that the manifest is only fetched once
	@Watch('currentItemIndex')
	async emitItemChangeEvent(newValue: number, oldValue: number) : Promise<void> {
		if (!this.items || newValue >= this.items.length)
			return null;

		addEventListenerToRunOnce(this.el, 'hvRender', function() {
			this.itemChanged.emit();
		}.bind(this));
	}

	@Watch('items')
	async emitItemsLoadedEvent(newValue: DocumentPage[], oldValue: DocumentPage[]) : Promise<void> {
		// We avoid emitting an event on the initial componentLoad (goes from undefined => [])
		if (!oldValue && (!newValue || newValue.length === 0))
			return;

		addEventListenerToRunOnce(this.el, 'hvRender', function() {
			this.itemsLoaded.emit();
		}.bind(this));
	}

	@Method()
	async getCurrentItem(): Promise<Item> {
		if (!this.items || !this.items[this.currentItemIndex])
			return;

		return new Item(this.items[this.currentItemIndex]);
	}

	@Method()
	async setItem(index: number): Promise<boolean> {
		if (!this.items || index >= this.items.length || index < 0 || this.currentItemIndex == index) {
			return false;
		}

		this.viewItem(index);
		return true;
	}

	@Method()
	async getItems() : Promise<Item[]> {
		return this.items.map(item => new Item(item));
	}

	@Method()
	async getItemCount() : Promise<number> {
		return this.items.length;
	}

	@Method()
	async getViewportType(): Promise<ViewportType> {
		const currentItem: DocumentPage = this.items[this.currentItemIndex];
		const viewportType: ViewportType = currentItem ? resolveViewportType(currentItem.contentType) : undefined;
		return viewportType;
	}

	@Method()
	async getTopBarElement(): Promise<HTMLElement> {
		return this.el.shadowRoot.querySelector('harmonized-topbar') as HTMLElement;
	}

	@Method()
	async getViewportElement(): Promise<HTMLElement> {
		return this.el.shadowRoot.querySelector('harmonized-viewport') as HTMLElement;
	}

	@Method()
	async getCustomVideoElement(): Promise<HTMLElement> {
		return this.el.shadowRoot.querySelector('#harmonized-viewer-custom-video') as HTMLElement;
	}

	@Method()
	async getNavigationElement(): Promise<HTMLElement> {
		return this.el.shadowRoot.querySelector('harmonized-navigation') as HTMLElement;
	}

	@Method()
	async getDrawerElement(): Promise<HTMLElement> {
		return this.el.shadowRoot.querySelector('harmonized-drawer') as HTMLElement;
	}

	/* ??? */
	@Method()
	async addOverlay(x: number, y: number, width: number, height: number) {
		this.addOverlayState(x, y, width, height)
	}

	@Listen('viewerDrawerToggle')
    handleDrawerToggle() {
        this.toggleDrawer()
	}
	
	@Listen('fullscreenchange', { target: 'document' })
    @Listen('MSFullscreenChange', { target: 'document' })
    @Listen('mozfullscreenchange', { target: 'document' })
    @Listen('webkitfullscreenchange', { target: 'document' })
    handleFullscreenToggleByOther() {
        // Possibilities - fullscreenElement is null, our current element or some other element
        const documentElement: any = document;
        // Remove our element from fullscreen if any other element is in fullscreen
        if (documentElement.fullscreenElement === this.el ||
			this.el.contains((documentElement as any).msFullscreenElement) || // IE11
            documentElement.mozFullScreenElement === this.el ||
            documentElement.webkitFullscreenElement === this.el) { // or others? 

            if (!this.fullscreen) {
                this.toggleFullscreen();
            }

            return;  
            
        } else if (this.fullscreen) {
            this.toggleFullscreen();
        }
    }

	// @Listen('click', { target: 'document' })
	// handleDocumentClick() {

	// 	// On any click inside the document, close all active dropdowns
	// 	// Events responsible to open dropdowns must stop propagation

	// 	const dropdowns = Array.from(this.el.shadowRoot.querySelectorAll(
	// 		'.dropdown.is-active, .navbar-item.has-dropdown.is-active'))

	// 	if (dropdowns) {
	// 		dropdowns.forEach((dropdown) => dropdown.classList.remove('is-active'))
	// 	}
	// }

	componentWillLoad() {
		this.store.setStore(configureStore({}))
		this.store.mapDispatchToProps(this, { addLanguage, addOverlay, setLanguage, setConfiguration, setOptions, fetchManifest, viewItem, toggleFullscreen, toggleDrawer })
		this.storeUnsubscribe = this.store.mapStateToProps(this, (state: MyAppState) => {
			const {
				document: { configuration, theme },
				manifest: { error, fetching, fetched },
				viewport: { itemIndex, items, fullscreen, infoShown }
			} = state
			return {
				configuration,
				theme,

				manifestError: error,
				manifestFetching: fetching,
				manifestFetched: fetched,

				currentItemIndex: itemIndex,
				items,
				fullscreen,
				infoShown
			}
		})

		this.initCustomFlags()

		this.initLanguage()

		this.setConfiguration({
			language: this.language,
			customVideoPlayer: this.customVideoPlayer,
			customItemProps: this.customItemProps,
			deepzoom: this.deepzoomEnabled,
			suppressGallery: this.suppressGallery			
		});
	}

	componentDidLoad() {
		// Move this into WillLoad (needs tests)
		console.log('component did load');
		console.log(this.manifestFallBackUrl);
		this.fetchManifest(this.url, this.manifestFallBackUrl);
		
		
		
	}

	componentDidUpdate() {
		if (this.manifestError) {
			this.manifestErrorOccurred.emit();
		}

		if (this.preventLoadOnEmpty) {
			// Check if manifest is loaded & empty
			if (this.manifestFetched && this.items.length === 0) {
				this.manifestIsEmpty.emit();
			}
		}
	}

	componentDidRender() {
		this.rendered.emit();
	}

	componentDidUnload() {
		this.storeUnsubscribe();
	}

	initCustomFlags() {

		Array.from(this.el.attributes).forEach((attr) => {

			const matches = attr.name.match(
				/data\-options\-([a-zA-Z0-9]+)\-([a-zA-Z0-9]+)/gi)

			if (matches) {
				matches.forEach((match) => {

					const nodes = match.toLowerCase().split('-')
					this.setOptions(nodes[2], nodes[3], JSON.parse(attr.value))
				})
			}
		})
	}

	initLanguage() {

		i18next
			.init({
				lng: this.language,
				fallbackLng: 'en',
				debug: false,
				//ns: ['common'],
				// defaultNS: 'common'
			}, (err, t) => {

				const language = this.language || 'en';
				this.setLanguage(language)
			})

		AppConfig.languages.forEach((language) => {
			this.addLanguage(language.code, language.name)
			i18next.addResourceBundle(language.code, 'translation', language, true, true)
		});
	}

	render() {

		if (this.manifestFetching) {
			return 	<div class="centered-box">
						<span>{t('loadingManifest')}</span>
						<div class="spinner-container">
						<harmonized-spinner></harmonized-spinner>
						</div>
					</div>
		}

		if (this.manifestError) {
			return  <div class="centered-box">
						<harmonized-message type="error">
								{t(`errors.${this.manifestError.code}`)}
						</harmonized-message>
					</div>
		}

		if (this.preventLoadOnEmpty) {
			return;
		}


		let className = 'harmonized-viewer harmonized-viewer-theme--light'

		if (this.fullscreen) {
			className += ` harmonized-viewer-fullscreen`;
		}

		// Errors not shown - to restructure like this:
		// - Error with manifest fetching => Show here
		// - Error with item loading/showing => Show in viewport
		return  <div class={className}>
			
					<harmonized-topbar />

					<harmonized-viewport />

					{!this.suppressGallery &&
						<harmonized-navigation 	cols={this.navigationCols}
												rows={this.navigationRows}
												auto-resize={true}
												style={{ backgroundColor: this.navigationBackgroundColor }} 
						/>
					}

					<harmonized-drawer headerTitle="Details" shown={this.infoShown}>
						<harmonized-annotations></harmonized-annotations>
					</harmonized-drawer>
					
				</div>
	}

	/*renderError(error: DocumentError) {

		if (!error) {
			return undefined
		}

		let errorParameters = {}

		if (error && error.optionalParameters) {
			error.optionalParameters.forEach((parameter) => {
				errorParameters[parameter.key] = parameter.value
			})
		}

		return <div class="error-message">
			<div innerHTML={iconError}></div>
			<div class="error-message__text">
				{i18next.t(`errors.${error.code}`, { ...errorParameters, errorParameters, interpolation: { escapeValue: false } })}
			</div>
		</div>
	}*/
}