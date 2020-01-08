import { Component, Host, h, Element, Prop, Method, State, Watch, Event, EventEmitter, Listen } from '@stencil/core';
import "@stencil/redux";
import { Store, Unsubscribe } from "@stencil/redux";
import { configureStore } from "../../store";
import { addOverlay, setOptions, setLanguage, addLanguage, setConfiguration } from '../../store/actions/document';
import i18next from 'i18next';
import { loadPersistedState } from '../../services/persisted-state-service';
import { AppConfig } from '../../app.config';
import { fetchManifest } from '../../store/actions/manifest';
import { toggleFullscreen } from '../../store/actions/viewport';
import iconError from '../../assets/material-icons/ic_error_24px.svg'
import { Item } from '../../models/item';
import { resolveViewportType } from '../../utils/viewport';

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
	@Prop({ attribute: 'language' }) defaultLanguage: string
	@Prop({ attribute: 'theme' }) defaultTheme: string
	@Prop() languageEnable: boolean
	@Prop() customVideoPlayer: boolean = false;
	@Prop({ attribute: 'deepzoom'}) deepzoomEnabled: boolean = true

	addLanguage: typeof addLanguage
	addOverlayState: typeof addOverlay
	setConfiguration: typeof setConfiguration
	setLanguage: typeof setLanguage
	setOptions: typeof setOptions

	fetchManifest: typeof fetchManifest

	toggleFullscreen: typeof toggleFullscreen

	storeUnsubscribe: Unsubscribe

	@State() currentItemIndex: MyAppState['viewport']['itemIndex']
	@State() items: MyAppState['viewport']['items']
	@State() fullscreen: MyAppState['viewport']['fullscreen']

	@State() configuration: MyAppState["document"]["configuration"]
	@State() language: MyAppState["document"]["language"]
	@State() availableLanguages: MyAppState["document"]["availableLanguages"]
	@State() theme: MyAppState["document"]["theme"]

	@Prop({ context: "store" }) store: Store

	@Event({ eventName: 'statusChanged' }) statusChanged: EventEmitter
	@Event({ eventName: 'itemChanged' }) itemChanged: EventEmitter
	@Event({ eventName: 'itemsLoaded' }) itemsLoaded: EventEmitter

	@Watch('statusCode')
	handleStatusChange(newValue: StatusCode, oldValue: StatusCode) {
		this.statusChanged.emit(newValue)
	}

	// Currently assume that the manifest is only fetched once
	@Watch('currentItemIndex')
	async emitItemChangeEvent(newValue: number, oldValue: number) : Promise<any> {
		if (!this.items || newValue >= this.items.length)
			return null;

		return this.itemChanged.emit(this.items[newValue]);
	}

	@Watch('items')
	async emitItemsLoadedEvent(newValue: DocumentPage[], oldValue: DocumentPage[]) : Promise<any> {
		// We avoid emitting an event on the initial componentLoad (goes from undefined => [])
		if (!oldValue && (!newValue || newValue.length === 0))
			return;

		return this.itemsLoaded.emit();
	}

	// ??
	@Method()
	async getUrl(): Promise<string> {
		return this.items[this.currentItemIndex].image;
	}

	@Method()
	async getCurrentItem() {
		if (!this.items || !this.items[this.currentItemIndex])
			return;

		return new Item(this.items[this.currentItemIndex]);
	} 

	@Method()
	async getViewportType(): Promise<ViewportType> {
		const currentItem: DocumentPage = this.items[this.currentItemIndex];
		const viewportType: ViewportType = currentItem ? resolveViewportType(currentItem.contentType) : undefined;
		return viewportType;
	}

	// ??
	@Method()
	async getPage(): Promise<number> {
		return this.currentItemIndex + 1;
	}

	@Method()
	async addOverlay(x: number, y: number, width: number, height: number) {
		this.addOverlayState(x, y, width, height)
	}

	@Listen('fullscreenchange')
	async handleFullscreenChange() {
		this.toggleFullscreen();
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
		this.store.mapDispatchToProps(this, { addLanguage, addOverlay, setLanguage, setConfiguration, setOptions, fetchManifest, toggleFullscreen })
		this.storeUnsubscribe = this.store.mapStateToProps(this, (state: MyAppState) => {
			const {
				document: { configuration, language, availableLanguages, theme },
				viewport: { itemIndex, items, fullscreen }
			} = state
			return {
				configuration,
				language,
				availableLanguages,
				theme,

				currentItemIndex: itemIndex,
				items,
				fullscreen
			}
		})

		this.initCustomFlags()

		this.initLanguage()

		this.setConfiguration({
			language: {
				enable: this.languageEnable
			},
			customVideoPlayer: this.customVideoPlayer,
			deepzoom: this.deepzoomEnabled
		})
	}

	async componentDidLoad() {
		this.fetchManifest(this.url);
	}

	componentDidUnload() {
		this.storeUnsubscribe()
	}

	initLanguage() {

		i18next
			//.use(i18nextBrowserLanguageDetector)
			.init({
				fallbackLng: 'en',
				debug: false,
				//ns: ['common'],
				// defaultNS: 'common'
			}, (err, t) => {

				const language = this.resolveLanguage()
				this.setLanguage(language.code)
			})

		AppConfig.languages.forEach((language) => {
			this.addLanguage(language.code, language.name)
			i18next.addResourceBundle(language.code, 'translation', language, true, true)
		})

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

	resolveLanguage(): Language {

		let resolved = null

		const persistedState = loadPersistedState()

		if (persistedState && persistedState.language) {
			resolved = persistedState.language
		}
		else if (this.defaultLanguage) {
			resolved = this.defaultLanguage
		}
		else {
			resolved = 'en'
		}

		return this.availableLanguages.find(i => i.code && i.code == resolved)
	}

	resolveTheme(): string {

		let resolved = null

		const persistedState = loadPersistedState()

		if (persistedState && persistedState.theme) {
			resolved = persistedState.theme
		}
		else if (this.defaultTheme) {
			resolved = this.defaultTheme
		}
		else {
			resolved = 'light'
		}

		return resolved
	}

	render() {

		let className = 'harmonized-viewer'

		const theme = this.resolveTheme()
		if (theme) {
			className += ` harmonized-viewer-theme--${theme}`
		}

		if (this.fullscreen) {
			className += ` harmonized-viewer-fullscreen`;
		}

		// Errors not shown - to restructure like this:
		// - Error with manifest fetching => Show here
		// - Error with item loading/showing => Show in viewport
		return  <div class={className}>
					<harmonized-topbar />

					<harmonized-viewport />

					<harmonized-navigation 	cols={this.navigationCols}
											rows={this.navigationRows}
											auto-resize={true}
											style={{ backgroundColor: this.navigationBackgroundColor }} 
					/>
					
				</div>
	}

	renderError(error: DocumentError) {

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
	}
}