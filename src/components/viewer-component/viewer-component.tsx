import { Component, h, Element, Listen, Prop, Event, EventEmitter, Method, State, Watch } from '@stencil/core';
import "@stencil/redux";
import 'manifesto.js';
import { LocationOption } from './viewer-options';
import { Store, Unsubscribe } from "@stencil/redux";
import { configureStore } from "../../store";
import { setDocumentUrl, setDocumentContentType } from '../../store/actions/document';
import { MyAppState } from '../../interfaces';

@Component({
	tag: 'harmonized-viewer',
	styleUrls: [
		'viewer-component.scss'
	],
	shadow: true
})
export class ViewerComponent {

	@Element() el: HTMLElement

	@Prop() language: string = 'en'

	@Prop() enableTopbar: boolean = true
	@Prop() enableToolbar: boolean = true
	@Prop() enableNavigation: boolean = true

	@Prop() annotationsShow: boolean = true

	@Prop() navigationHeight?: number = null
	@Prop() navigationLocation: LocationOption = LocationOption.Left

	@Prop() page: number
	@Prop() totalPages: number

	@Prop({ attribute: 'url' }) parameterUrl: string

	@Event() manifestLoaded: EventEmitter
	@Event() canvasLoaded: EventEmitter
	@Event() goto: EventEmitter
	@Event() nextLoad: EventEmitter

	setDocumentContentType: typeof setDocumentContentType
	setDocumentUrl: typeof setDocumentUrl
	storeUnsubscribe: Unsubscribe

	@State() error: MyAppState["document"]["error"]
	@State() url: MyAppState["document"]["url"]
	@State() loading: MyAppState["document"]["loading"]

	@Prop({ context: "store" }) store: Store

	@Watch('parameterUrl')
	handleUrlChange() {
		console.log('HV url changed')
		this.setDocumentUrl(this.parameterUrl)
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
		this.store.mapDispatchToProps(this, { setDocumentContentType, setDocumentUrl })
		this.store.mapStateToProps(this, (state: MyAppState) => {
			const {
				document: { error: error, loading: loading, url: url }
			} = state
			return {
				error: error,
				loading: loading,
				url: url
			}
		})
	}

	componentDidLoad() {

		this.setDocumentUrl(this.parameterUrl)
		//this.setDocumentContentType('application/json')

		// FetchService.execute(
		// 	this.parameterUrl,
		// 	'HEAD',
		// 	CorsMode.Enable
		// )
		// 	.then((value) => {
		// 		//console.log(value)
		// 		this.setDocumentContentType(value.type)
		// 	}, (reason) => {
		// 		console.error(reason)
		// 	})

		// setTimeout(() => {
		// 	console.log("timeout");
		// 	this.setDocumentUrl("https://d.lib.ncsu.edu/collections/catalog/nubian-message-1992-11-30/manifest");
		// }, 3000);
	}

	componentDidUnload() {
		this.storeUnsubscribe()
	}

	render() {

		if (this.error) {
			return <harmonized-viewer-message>
				{this.error.message}
			</harmonized-viewer-message>
		}
		else if (this.loading) {
			return <harmonized-spinner />
		}
		else {
			return (
				<div class="harmonized-viewer">

					{
						(this.enableTopbar && !this.loading) &&
						<harmonized-viewer-topbar></harmonized-viewer-topbar>
					}

					{
						(this.enableNavigation && !this.loading) &&
						this.renderNavigation(LocationOption.Top)
					}

					<div class="hv-content">

						{
							(this.enableNavigation && !this.loading) &&
							this.renderNavigation(LocationOption.Left)
						}

						<main class="hv-main">

							{
								(this.enableToolbar && !this.loading) &&
								<hv-toolbar class="hv-toolbar" />
							}

							<div class="hv-main__content">
								<hv-viewport></hv-viewport>
							</div>

						</main>

						{
							(this.enableNavigation && !this.loading) &&
							this.renderNavigation(LocationOption.Right)
						}

					</div>

					<slot name="footer" />

					{
						(this.enableNavigation && !this.loading) &&
						this.renderNavigation(LocationOption.Bottom)
					}

				</div>
			)
		}
	}

	renderNavigation(location: LocationOption) {

		if (location == this.navigationLocation) {
			return (
				<hv-navigation
					class={"navigation navigation-" + this.navigationLocation}
					style={{
						height: (this.navigationHeight && this.navigationHeight + "px")
					}} />
			)
		}
	}
}