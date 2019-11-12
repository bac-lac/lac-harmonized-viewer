import { Component, h, Element, Listen, Prop, Method, State, Watch } from '@stencil/core';
import "@stencil/redux";
import 'manifesto.js';
import { Store, Unsubscribe } from "@stencil/redux";
import { configureStore } from "../../store";
import { setDocumentUrl, setDocumentContentType, setStatus, addOverlay, setOptions } from '../../store/actions/document';
import { MyAppState } from '../../interfaces';
import { i18n } from '../../services/i18n/i18n-service';

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

	addOverlayState: typeof addOverlay
	setDocumentContentType: typeof setDocumentContentType
	setDocumentUrl: typeof setDocumentUrl
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
		this.store.mapDispatchToProps(this, { addOverlay, setDocumentContentType, setDocumentUrl, setOptions, setStatus })
		this.store.mapStateToProps(this, (state: MyAppState) => {
			const {
				document: { locale: locale, status: status, page: page, url: url, viewport: viewport }
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

		this.setDocumentUrl(this.documentUrl)
	}

	componentDidLoad() {

	}

	componentDidUnload() {
		this.storeUnsubscribe()
	}

	render() {

		return (
			<div class="harmonized-viewer" style={{ backgroundColor: this.backgroundColor }}>

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
		)
	}
}