import { Component, h, Element, Listen, Prop, Method, State, Watch } from '@stencil/core';
import "@stencil/redux";
import 'manifesto.js';
import { Store, Unsubscribe } from "@stencil/redux";
import { configureStore } from "../../store";
import { setDocumentUrl, setDocumentContentType, setStatus, addOverlay, setOptions, setLanguage, addLanguage } from '../../store/actions/document';
import i18next from 'i18next';
import i18nextXHRBackend from 'i18next-xhr-backend';
import i18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';
import { EventEmitter } from 'events';
import iconError from '../../assets/material-icons/ic_error_24px.svg'

@Component({
	tag: 'harmonized-viewer',
	styleUrls: [
		'viewer-component.scss'
	],
	shadow: true
})
export class ViewerComponent {

	@Element() el: HTMLElement

	//@Prop() language: string

	@Prop() navigationEnable: boolean
	@Prop() navigationHeight?: number
	@Prop() navigationLocation: PlacementType

	@Prop() annotationsEnable: boolean

	@Prop() backgroundColor: string = '#181818'

	// @Prop() page: number
	// @Prop() totalPages: number

	@Prop({ attribute: 'url' }) documentUrl: string

	addLanguage: typeof addLanguage
	addOverlayState: typeof addOverlay
	setDocumentContentType: typeof setDocumentContentType
	setDocumentUrl: typeof setDocumentUrl
	setLanguage: typeof setLanguage
	setStatus: typeof setStatus
	setOptions: typeof setOptions

	storeUnsubscribe: Unsubscribe

	@State() language: MyAppState["document"]["language"]
	@State() availableLanguages: MyAppState["document"]["availableLanguages"]
	@State() page: MyAppState["document"]["page"]
	@State() url: MyAppState["document"]["url"]
	@State() status: MyAppState["document"]["status"]
	@State() viewport: MyAppState["document"]["viewport"]

	@Prop({ context: "store" }) store: Store

	@Method()
	async getPage(): Promise<number> {
		return this.page
	}

	@Method()
	async addOverlay(x: number, y: number, width: number, height: number): Promise<void> {
		this.addOverlayState(x, y, width, height)
	}

	@Watch('documentUrl')
	handleUrlChange() {
		this.setDocumentUrl(this.documentUrl)
	}

	@Listen('click', { target: 'document' })
	handleDocumentClick() {

		// On any click inside the document, close all active dropdowns
		// Events responsible to open dropdowns must stop propagation

		const dropdowns = Array.from(this.el.shadowRoot.querySelectorAll(
			'.dropdown.is-active, .navbar-item.has-dropdown.is-active'))

		if (dropdowns) {
			dropdowns.forEach((dropdown) => dropdown.classList.remove('is-active'))
		}
	}

	@Listen('languageChanged')
	handleLanguageChange() {
		//this.setLanguage(this.language)
	}

	componentWillLoad() {

		this.store.setStore(configureStore({}))
		this.store.mapDispatchToProps(this, { addLanguage: addLanguage, addOverlay, setDocumentContentType, setDocumentUrl, setLanguage: setLanguage, setOptions, setStatus })
		this.store.mapStateToProps(this, (state: MyAppState) => {
			const {
				document: { language: language, availableLanguages: availableLanguages, page: page, url: url, status: status, viewport: viewport }
			} = state
			return {
				language: language,
				availableLanguages: availableLanguages,
				page: page,
				status: status,
				url: url,
				viewport: viewport
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
	}

	componentDidUnload() {
		this.storeUnsubscribe()
	}

	configure() {

		this.addLanguage('en', 'English')
		this.addLanguage('fr', 'Français')

		i18next
			.use(i18nextXHRBackend)
			.use(i18nextBrowserLanguageDetector)
			.init({
				lng: 'en',
				fallbackLng: 'en',
				debug: false,
				// ns: ['common'],
				// defaultNS: 'common',
				backend: {
					loadPath: './locales/{{lng}}.json?ns={{ns}}'
				}
			}, (err, t) => {

				i18next.on('languageChanged', (language: string) => {
					const availableLanguage = this.availableLanguages.find(i => i.code && i.code === language)
					if (availableLanguage) {
						this.setLanguage(availableLanguage.code)
					}
				})
			})
	}

	render() {

		return <div class="harmonized-viewer" style={{ backgroundColor: this.backgroundColor }}>

			{
				!this.status.error &&
				<harmonized-topbar />
			}

			{
				this.status.error &&
				<div class="error-message">
					<i innerHTML={iconError}></i>
					<div class="error-message__text">{this.status.error.message}</div>
				</div>
			}

			{
				!this.status.error &&
				<harmonized-viewport
					navigation-enable={this.navigationEnable}
					navigation-placement={this.viewport.navigationPlacement}
					annotations-enable={this.annotationsEnable}
				/>
			}

			<slot name="footer" />
		</div>
	}
}