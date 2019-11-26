import { Component, h, Element, Listen, Prop, Method, State, Watch, Event, EventEmitter } from '@stencil/core';
import "@stencil/redux";
import 'manifesto.js';
import { Store, Unsubscribe } from "@stencil/redux";
import { configureStore } from "../../store";
import { addTheme, setDocumentUrl, setDocumentContentType, setStatus, addOverlay, setOptions, setLanguage, addLanguage, setViewport, enterFullscreen, exitFullscreen, addCustomResolver } from '../../store/actions/document';
import i18next from 'i18next';
import iconError from '../../assets/material-icons/ic_error_24px.svg'
import { loadPersistedState } from '../../services/persisted-state-service';
import { AppConfig } from '../../app.config';
import { id } from '../../utils/utils';

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
	@Prop() navigationPlacement: PlacementType = "left"
	@Prop() navigationCols: number = 16
	@Prop() navigationBackgroundColor: string
	@Prop() pagingEnable: boolean
	@Prop({ attribute: 'url' }) documentUrl: string

	@Prop({ attribute: 'language' }) defaultLanguage: string
	@Prop({ attribute: 'theme' }) defaultTheme: string

	addCustomResolver: typeof addCustomResolver
	addLanguage: typeof addLanguage
	addOverlayState: typeof addOverlay
	setDocumentContentType: typeof setDocumentContentType
	setDocumentUrl: typeof setDocumentUrl
	setLanguage: typeof setLanguage
	enterFullscreen: typeof enterFullscreen
	_exitFullscreen: typeof exitFullscreen
	setStatus: typeof setStatus
	setOptions: typeof setOptions
	setViewport: typeof setViewport

	storeUnsubscribe: Unsubscribe

	@State() language: MyAppState["document"]["language"]
	@State() availableLanguages: MyAppState["document"]["availableLanguages"]
	@State() page: MyAppState["document"]["page"]
	@State() pages: MyAppState["document"]["pages"]
	@State() url: MyAppState["document"]["url"]
	@State() status: MyAppState["document"]["status"]
	@State() statusCode: MyAppState["document"]["status"]["code"]
	@State() theme: MyAppState["document"]["theme"]

	@Prop({ context: "store" }) store: Store

	@Event({ eventName: 'statusChanged' }) statusChanged: EventEmitter

	@Watch('statusCode')
	handleStatusChange(newValue: StatusCode, oldValue: StatusCode) {
		this.statusChanged.emit(newValue)
	}

	@Method()
	async getUrl(): Promise<string> {

		if (this.pages.length > this.page) {
			return this.pages[this.page].image
		}
		else {
			return null
		}
	}

	@Method()
	async getPage(): Promise<number> {
		return this.page
	}

	@Method()
	async fullscreen() {
		this.enterFullscreen(this.el)
	}

	@Method()
	async exitFullscreen() {
		this._exitFullscreen()
	}

	@Method()
	async addOverlay(x: number, y: number, width: number, height: number) {
		console.log('aded')
		this.addOverlayState(x, y, width, height)
	}

	@Method()
	async addResolver() {
		const resolverId = id()
		this.addCustomResolver(resolverId)
	}

	@Watch('documentUrl')
	handleUrlChange() {
		this.setDocumentUrl(this.documentUrl)
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
		this.store.mapDispatchToProps(this, { addCustomResolver, addLanguage, addOverlay, setDocumentContentType, enterFullscreen, exitFullscreen, setDocumentUrl, setLanguage, setOptions, setViewport, setStatus })
		this.storeUnsubscribe = this.store.mapStateToProps(this, (state: MyAppState) => {
			const {
				document: { language: language, availableLanguages: availableLanguages, page: page, pages: pages, url: url, status: status, theme: theme }
			} = state
			return {
				language: language,
				availableLanguages: availableLanguages,
				page: page,
				pages: pages,
				status: status,
				statusCode: status.code,
				theme: theme,
				url: url
			}
		})

		this.initCustomFlags()

		this.initLanguage()

		this.setDocumentUrl(this.documentUrl)
	}

	componentDidLoad() {
		// this.setViewport({
		// 	navigationEnable: this.navigationEnable,
		// 	navigationPlacement: this.navigationPlacement,
		// 	pagingEnable: this.pagingEnable
		// })
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

		return <div class={className}>

			<harmonized-topbar />

			<div class="viewer__content mdc-top-app-bar--dense-fixed-adjust full-height">

				{
					this.status.error ?
						this.renderError(this.status.error) : <harmonized-viewport />
				}

			</div>

			<slot name="footer" />

			{this.renderNavigation("bottom")}

		</div>
	}

	renderNavigation(placement: PlacementType) {

		const conditions = (this.pages && this.pages.length > 0) && (this.navigationPlacement == placement)

		if (conditions) {

			if (placement == "left" || placement == "right") {

				return <harmonized-drawer
					placement={placement} toolbar={true} visible={true} width={250}>
					<harmonized-navigation style={{ backgroundColor: this.navigationBackgroundColor }}></harmonized-navigation>
				</harmonized-drawer>
			}
			else {
				return <harmonized-navigation cols={this.navigationCols} style={{ backgroundColor: this.navigationBackgroundColor }}></harmonized-navigation>
			}
		}
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