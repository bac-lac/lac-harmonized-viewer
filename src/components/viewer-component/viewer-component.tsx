import { Component, h, Element, Listen, Prop, Method, State, Watch, Event, EventEmitter } from '@stencil/core';
import "@stencil/redux";
import 'manifesto.js';
import { Store, Unsubscribe } from "@stencil/redux";
import { configureStore } from "../../store";
import { setDocumentUrl, setDocumentContentType, setStatus, addOverlay, setOptions, setLanguage, addLanguage, setViewport, enterFullscreen, exitFullscreen, addCustomResolver } from '../../store/actions/document';
import i18next from 'i18next';
import i18nextXHRBackend from 'i18next-xhr-backend';
import i18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';
import iconError from '../../assets/material-icons/ic_error_24px.svg'
import { loadPersistedState } from '../../services/persisted-state-service';
import { AppConfig } from '../../app.config';
import { id } from '../../utils/utils';

@Component({
	tag: 'harmonized-viewer',
	styleUrls: [
		'viewer-component.scss',
		'../../themes/all.scss'
	],
	shadow: true
})
export class ViewerComponent {

	@Element() el: HTMLElement

	//@Prop() language: string

	@Prop() navigationEnable: boolean
	@Prop() navigationPlacement: PlacementType
	@Prop() pagingEnable: boolean
	@Prop({ attribute: 'url' }) documentUrl: string

	@Prop({ attribute: 'language' }) defaultLanguage: string = 'en'
	@Prop() theme: string = 'dark'

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
	@State() url: MyAppState["document"]["url"]
	@State() status: MyAppState["document"]["status"]
	@State() statusCode: MyAppState["document"]["status"]["code"]

	@Prop({ context: "store" }) store: Store

	@Event({ eventName: 'statusChanged' }) statusChanged: EventEmitter

	@Watch('statusCode')
	handleStatusChange(newValue: StatusCode, oldValue: StatusCode) {
		this.statusChanged.emit(newValue)
	}

	@Method()
	async getPage() {
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
		this.store.mapStateToProps(this, (state: MyAppState) => {
			const {
				document: { language: language, availableLanguages: availableLanguages, page: page, url: url, status: status }
			} = state
			return {
				language: language,
				availableLanguages: availableLanguages,
				page: page,
				status: status,
				statusCode: status.code,
				url: url
			}
		})

		//let options: Options[] = []
		Array.from(this.el.attributes).forEach((attr) => {

			const matches = attr.name.match(
				/data\-options\-([a-zA-Z0-9]+)\-([a-zA-Z0-9]+)/gi)

			if (matches) {
				matches.forEach((match) => {

					//const namePath = `{${matches.groups[1]}: { component: '${matches.groups[2]}' }}`
					// const option: Options = {
					// 	component: matches.groups[1],
					// 	name: matches.groups[2],
					// 	value: JSON.parse(attr.value)
					// }

					const nodes = match.toLowerCase().split('-')
					this.setOptions(nodes[2], nodes[3], JSON.parse(attr.value))
				})
			}
		})

		this.configure()

		this.setDocumentUrl(this.documentUrl)
	}

	componentDidLoad() {
		this.setViewport({
			navigationEnable: this.navigationEnable,
			navigationPlacement: this.navigationPlacement,
			pagingEnable: this.pagingEnable
		})
	}

	componentDidUnload() {
		this.storeUnsubscribe()
	}

	configure() {

		i18next
			.use(i18nextBrowserLanguageDetector)
			.init({
				fallbackLng: 'en',
				debug: false,
				//ns: ['common'],
				// defaultNS: 'common'
			}, (err, t) => {

				const language = this.resolveLanguage()
				this.setLanguage(language.code)

				// i18next.on('languageChanged', (language: string) => {
				// 	const availableLanguage = this.availableLanguages.find(i => i.code && i.code === language)
				// 	if (availableLanguage) {
				// 		this.setLanguage(availableLanguage.code)
				// 	}
				// })
			})

		AppConfig.languages.forEach((language) => {
			this.addLanguage(language.code, language.name)
			i18next.addResourceBundle(language.code, 'translation', language, true, true)
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

	render() {

		let className = 'harmonized-viewer'

		if (this.theme) {
			className += ' harmonized-viewer__theme--' + this.theme
		}

		return <div class={className}>

			<harmonized-topbar />

			<div class="viewer__content mdc-top-app-bar--fixed-adjust full-height">

				{
					this.status.error ? (
						<div class="error-message">
							<i innerHTML={iconError}></i>
							<div class="error-message__text">
								<strong>
									{i18next.t(`errors.${this.status.error.code}`)}
								</strong>
								{this.status.error.parameters.map((param) => (
									<div>
										{param}
									</div>
								))}

							</div>
						</div>
					) : <harmonized-viewport />
				}
			</div>

			<slot name="footer" />

			{/* <harmonized-navigation
				placement="bottom" rows={1} /> */}
		</div>
	}
}