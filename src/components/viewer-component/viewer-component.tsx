import { Component, h, Element, Listen, Prop, Event, EventEmitter, Method, State } from '@stencil/core';
import "@stencil/redux";
import 'manifesto.js';
import { LocationOption } from './viewer-options';
import { Store, Unsubscribe } from "@stencil/redux";
import { configureStore } from "../../store";
import { setDocumentUrl } from '../../store/actions/document';

@Component({
	tag: 'harmonized-viewer',
	styleUrls: [
		'viewer-component.scss'
	],
	shadow: true
})
export class ViewerComponent {

	@Element() el: HTMLElement;

	@Prop() language: string = "en";

	@Prop() enableTopbar: boolean = true;
	@Prop() toolbarShow: boolean = true;

	@Prop() annotationsShow: boolean = true;

	@Prop() navigationHeight?: number = null;
	@Prop() navigationLocation: LocationOption = LocationOption.Left;

	// @Prop() toolbar: HTMLHvToolbarElement;
	// @Prop() navigationElement: HTMLHvNavigationElement;
	// @Prop() annotations: HTMLHvAnnotationsElement;
	// @Prop() viewport: HTMLHvViewportElement;

	@Prop() page: number;
	@Prop() totalPages: number;

	@Prop() url: string;

	@Event() manifestLoaded: EventEmitter;
	@Event() canvasLoaded: EventEmitter;
	@Event() goto: EventEmitter;
	@Event() nextLoad: EventEmitter;

	//@State() manifest: Manifesto.IManifest;

	//private topbar: HTMLHarmonizedViewerTopbarElement;

	setDocumentUrl: typeof setDocumentUrl;
	storeUnsubscribe: Unsubscribe;




	@State() documentUrl: MyAppState["document"]["url"];

	@Prop({ context: "store" }) store: Store;

	async componentWillLoad() {

		this.store.setStore(configureStore({}));
		this.store.mapDispatchToProps(this, { setDocumentUrl });
		this.store.mapStateToProps(this, (state: MyAppState) => {
			const {
				document: { url: url }
			} = state;
			return {
				documentUrl: url
			};
		});
	}

	componentDidLoad() {

		this.setDocumentUrl(this.url, 'IIIF');

		// setTimeout(() => {
		// 	console.log("timeout");
		// 	this.setDocumentUrl("https://d.lib.ncsu.edu/collections/catalog/nubian-message-1992-11-30/manifest");
		// }, 3000);
	}

	componentDidUnload() {
		this.storeUnsubscribe();
	}



	@Method()
	async currentPage(): Promise<number> {
		return Promise.resolve(this.page);
	}

	@Method()
	async next(): Promise<void> {
		this.nextLoad.emit();
	}

	@Listen('manifestLoaded')
	onManifestLoaded(event: CustomEvent) {

		const manifest = event.detail as Manifesto.IManifest;

		const title: string = manifest.getDefaultLabel();
		this.totalPages = manifest.getSequenceByIndex(0).getTotalCanvases();

		// if (this.topbar) {
		// 	this.topbar.text = title;
		// }
		// if (this.navigationElement) {
		// 	this.navigationElement.manifest = manifest;
		// }
		// if (this.annotations) {
		// 	this.annotations.manifest = manifest;
		// }
		// if (this.toolbar) {
		// 	this.toolbar.totalPages = this.totalPages;
		// }
	}

	@Listen('canvasLoaded')
	onCanvasLoaded(event: CustomEvent) {

		this.page = event.detail as number;

		// if (this.navigationElement) {
		// 	this.navigationElement.page = this.page;
		// }
		// if (this.annotations) {
		// 	this.annotations.page = this.page;
		// }
		// if (this.toolbar) {
		// 	this.toolbar.page = this.page;
		// }
	}

	@Listen('goto')
	gotoHandler(event: CustomEvent) {
		const gotoPage = event.detail as number;
		// if (this.totalPages > gotoPage + 1) {
		// 	if (this.viewport) {
		// 		this.viewport.openseadragon.goToPage(event.detail as number);
		// 	}
		// }
	}

	// @Listen('previous')
	// previousHandler() {
	// 	this.goto.emit(this.page - 1);
	// 	this.increment();
	// }

	// @Listen('next')
	// nextHandler() {
	// 	this.goto.emit(this.page + 1);
	// }

	// @Method()
	// async next() {
	// 	this.nextHandler();
	// }

	render() {
		return <div class="harmonized-viewer">

			<h1>Hello, my name is {this.url}</h1>

			{/* Topbar */}
			{(this.enableTopbar ? this.renderTopbar() : undefined)}

			{this.renderNavigation(LocationOption.Top)}

			<div class="hv-content">
				{this.renderNavigation(LocationOption.Left)}

				<main class="hv-main">
					{this.renderToolbar()}
					<div class="hv-main__content">
						<hv-viewport></hv-viewport>
						{this.renderAnnotations()}
					</div>
				</main>

				{this.renderNavigation(LocationOption.Right)}
			</div>

			<slot name="footer" />

			{this.renderNavigation(LocationOption.Bottom)}

		</div>;
	}

	renderTopbar() {
		if (!this.enableTopbar) {
			return undefined;
		}
		return (
			<harmonized-viewer-topbar></harmonized-viewer-topbar>
		);
	}

	renderNavigation(location: LocationOption) {
		if (!location || !this.navigationLocation) {
			return undefined;
		}
		if (location == this.navigationLocation) {
			return (
				<hv-navigation
					class={"hv-navigation hv-navigation--" + this.navigationLocation}
					style={{
						height: (this.navigationHeight ? this.navigationHeight + "px" : null)
					}}></hv-navigation>
			);
		}
	}

	renderToolbar() {
		if (!this.toolbarShow) {
			return undefined;
		}
		return (
			<hv-toolbar class="hv-toolbar"></hv-toolbar>
		);
	}

	renderAnnotations() {
		if (!this.annotationsShow) {
			return undefined;
		}
		return (
			<hv-annotations class="hv-annotations"></hv-annotations>
		);
	}
}