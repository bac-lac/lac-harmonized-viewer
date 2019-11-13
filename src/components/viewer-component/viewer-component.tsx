import { Component, h, Element, Listen, Prop, Method, State, Watch } from '@stencil/core';
import "@stencil/redux";
import 'manifesto.js';
import { Store, Unsubscribe } from "@stencil/redux";
import { configureStore } from "../../store";
import { setDocumentUrl, setDocumentContentType, setStatus, addOverlay, setOptions, setLocale, addLocale } from '../../store/actions/document';
import { MyAppState } from '../../interfaces';
import i18next from 'i18next';
import i18nextXHRBackend from 'i18next-xhr-backend';
import i18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';

@Component({
	tag: 'harmonized-viewer',
	styleUrls: [
		'viewer-component.scss'
	],
	shadow: true
})
export class ViewerComponent {

	@Element() el: HTMLElement

	@Prop() language: string

	@Prop() navigationEnable: boolean
	@Prop() navigationHeight?: number
	@Prop() navigationLocation: PlacementType

	@Prop() annotationsEnable: boolean

	@Prop() backgroundColor: string = '#181818'

	// @Prop() page: number
	// @Prop() totalPages: number

	@Prop({ attribute: 'url' }) documentUrl: string

	addLocale: typeof addLocale
	addOverlayState: typeof addOverlay
	setDocumentContentType: typeof setDocumentContentType
	setDocumentUrl: typeof setDocumentUrl
	setLocale: typeof setLocale
	setStatus: typeof setStatus
	setOptions: typeof setOptions

	storeUnsubscribe: Unsubscribe

	@State() locale: MyAppState["document"]["locale"]
	@State() page: MyAppState["document"]["page"]
	@State() url: MyAppState["document"]["url"]
	@State() status: MyAppState["document"]["status"]
	@State() viewport: MyAppState["document"]["viewport"]

	@Prop({ context: "store" }) store: Store

	@Method()
	async getPage() {
		return this.page
	}

	@Method()
	async addOverlay(x: number, y: number, width: number, height: number, text: string) {
		this.addOverlayState(x, y, width, height, text)
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

	componentWillLoad() {

		this.store.setStore(configureStore({}))
		this.store.mapDispatchToProps(this, { addLocale, addOverlay, setDocumentContentType, setDocumentUrl, setLocale, setOptions, setStatus })
		this.store.mapStateToProps(this, (state: MyAppState) => {
			const {
				document: { locale: locale, page: page, url: url, status: status, viewport: viewport }
			} = state
			return {
				locale: locale,
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

		this.initLocale()
		this.setDocumentUrl(this.documentUrl)
	}

	componentDidLoad() {

	}

	componentDidUnload() {
		this.storeUnsubscribe()
	}

	initLocale() {

		this.addLocale('en')
		this.addLocale('fr')

		i18next
			.use(i18nextXHRBackend)
			.use(i18nextBrowserLanguageDetector)
			.init({
				lng: 'en',
				fallbackLng: 'en',
				debug: true,
				// ns: ['common'],
				// defaultNS: 'common',
				backend: {
					loadPath: './locales/{{lng}}.json?ns={{ns}}'
				}
			}, (err, t) => {
				i18next.on('languageChanged', (language: string) => this.setLocale(language))
			})
	}

	render() {

		return <div class="harmonized-viewer" style={{ backgroundColor: this.backgroundColor }}>

			<harmonized-topbar />

			{
				this.status.error &&
				<harmonized-message type="error">
					<p>
						<strong>{this.status.error.code}</strong>
						<span>&nbsp;&ndash;&nbsp;</span>
						<span>{this.status.error.message}</span>
					</p>
				</harmonized-message>
			}

			<harmonized-viewport
				navigation-enable={this.navigationEnable}
				navigation-placement={this.viewport.navigationPlacement}
				annotations-enable={this.annotationsEnable}
			/>

			<slot name="footer" />
		</div>
	}
}