import { Component, h, Element, Listen, Prop, Method, State, Watch } from '@stencil/core';
import "@stencil/redux";
import 'manifesto.js';
import { Store, Unsubscribe } from "@stencil/redux";
import { configureStore } from "../../store";
import { setDocumentUrl, setDocumentContentType, setStatus, addTag, setOptions } from '../../store/actions/document';
import { MyAppState, Options } from '../../interfaces';
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
	@Prop() navigationLocation: LocationOption

	@Prop() annotationsEnable: boolean

	@Prop() backgroundColor: string = '#181818'

	// @Prop() page: number
	// @Prop() totalPages: number

	@Prop({ attribute: 'url' }) documentUrl: string

	// @Event() manifestLoaded: EventEmitter
	// @Event() canvasLoaded: EventEmitter
	// @Event() goto: EventEmitter
	// @Event() nextLoad: EventEmitter

	addTag: typeof addTag
	setDocumentContentType: typeof setDocumentContentType
	setDocumentUrl: typeof setDocumentUrl
	setStatus: typeof setStatus
	setOptions: typeof setOptions

	storeUnsubscribe: Unsubscribe

	//@State() tags: MyAppState["document"["tags"]
	@State() url: MyAppState["document"]["url"]
	@State() status: MyAppState["document"]["status"]

	@Prop({ context: "store" }) store: Store


	// @Method()
	// async addOverlay(element: Element, x: number, y: number): Promise<void> {

	// 	if (!element) {
	// 		return undefined
	// 	}


	// }

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
		this.store.mapDispatchToProps(this, { addTag, setDocumentContentType, setDocumentUrl, setOptions, setStatus })
		this.store.mapStateToProps(this, (state: MyAppState) => {
			const {
				document: { status: status, url: url }
			} = state
			return {
				//tags: tags,
				status: status,
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

		this.setDocumentUrl(this.documentUrl)
	}

	componentDidUnload() {
		this.storeUnsubscribe()
	}

	render() {

		return (
			<div class="harmonized-viewer" style={{ backgroundColor: this.backgroundColor }}>

				<harmonized-topbar backgroundColor={this.backgroundColor} />

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
					navigation-location={this.navigationLocation}
					annotations-enable={this.annotationsEnable}
				/>

				<slot name="footer" />
				<slot name="overlays" />
			</div>
		)
	}
}