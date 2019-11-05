import { Component, h, Element, Listen, Prop, Event, EventEmitter, Method, State, Watch } from '@stencil/core';
import "@stencil/redux";
import 'manifesto.js';
import { Store, Unsubscribe } from "@stencil/redux";
import { configureStore } from "../../store";
import { setDocumentUrl, setDocumentContentType, setLoading, setStatus, addTag } from '../../store/actions/document';
import { MyAppState, DocumentError } from '../../interfaces';
import { AnnotationsComponent } from '../annotations/annotations-component';

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
	storeUnsubscribe: Unsubscribe

	@State() tags: MyAppState["document"["tags"]]
	@State() url: MyAppState["document"]["url"]
	@State() status: MyAppState["document"]["status"]

	@Prop({ context: "store" }) store: Store


	@Watch('documentUrl')
	handleUrlChange() {
		this.setDocumentUrl(this.documentUrl)
	}

	@Listen('click', { target: 'document' })
	handleDocumentClick(ev: MouseEvent) {

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
		this.store.mapDispatchToProps(this, { addTag, setDocumentContentType, setDocumentUrl, setStatus })
		this.store.mapStateToProps(this, (state: MyAppState) => {
			const {
				document: { tags: tags, status: status, url: url }
			} = state
			return {
				tags: tags,
				status: status,
				url: url
			}
		})

		this.setDocumentUrl(this.documentUrl)
	}

	componentDidUnload() {
		this.storeUnsubscribe()
	}

	@Method()
	async setTags() {
		return this.tags
	}

	render() {

		return (
			<div class="harmonized-viewer">

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
					navigation-location={this.navigationLocation}
					annotations-enable={this.annotationsEnable} />

				<slot name="footer" />

			</div>
		)
	}
}