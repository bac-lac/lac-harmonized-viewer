import { Component, h, Element, Listen, Prop, Event, EventEmitter, Method, State } from '@stencil/core';
import 'manifesto.js';
import { LocationOption } from './viewer-options';
import Tunnel from "../../state";

@Component({
	tag: 'harmonized-viewer',
	styleUrls: [
		'viewer-component.scss',
		'../../assets/nunito-sans/nunito-sans.css'
	],
	shadow: true
})
export class ViewerComponent {

	@Element() el: HTMLElement;

	@State() message: string = "Hello!";
	@Prop() page: number = 0;

	@Prop() topbarShow: boolean = true;
	@Prop() toolbarShow: boolean = true;

	@Prop() annotationsShow: boolean = true;

	@Prop() navigationHeight?: number = null;
	@Prop() navigationLocation: LocationOption = LocationOption.Left;

	@Prop() topbar: HTMLHvTopbarElement;
	@Prop() toolbar: HTMLHvToolbarElement;
	@Prop() navigationElement: HTMLHvNavigationElement;
	@Prop() annotations: HTMLHvAnnotationsElement;
	@Prop() viewport: HTMLHvViewportElement;

	//@Prop() page: number;
	@Prop() totalPages: number;

	@Prop() url: string;

	@Prop() manifest: Manifesto.IManifest;

	@Event() manifestLoaded: EventEmitter;
	@Event() goto: EventEmitter;

	@Listen('manifestLoaded')
	manifestLoadedHandler(event: CustomEvent) {

		const manifest = event.detail as Manifesto.IManifest;
		this.totalPages = manifest.getSequenceByIndex(0).getTotalCanvases();

		if (this.topbar) {
			this.topbar.manifest = manifest;
		}
		if (this.navigationElement) {
			this.navigationElement.manifest = manifest;
		}
		if (this.annotations) {
			this.annotations.manifest = manifest;
		}
		if (this.toolbar) {
			this.toolbar.totalPages = this.totalPages;
		}
	}

	@Listen('pageLoaded')
	pageLoadedHandler(event: CustomEvent) {

		this.increment();

		this.page = event.detail as number;

		if (this.navigationElement) {
			this.navigationElement.page = this.page;
		}
		if (this.annotations) {
			this.annotations.page = this.page;
		}
		if (this.toolbar) {
			this.toolbar.page = this.page;
		}
	}

	@Listen('goto')
	gotoHandler(event: CustomEvent) {
		const gotoPage = event.detail as number;
		if (this.totalPages > gotoPage + 1) {
			if (this.viewport) {
				this.viewport.openseadragon.goToPage(event.detail as number);
			}
		}
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

	@Method()
	async currentPage() {
		return this.page;
	}

	// @Method()
	// async next() {
	// 	this.nextHandler();
	// }

	count: number = 0;

	componentWillLoad() {
		this.increment();
	}

	increment = () => {
		this.count = this.count + 1;
		this.message = `State: ${this.count}`;
	}

	render() {
		const tunnelState = {
			message: this.message,
			page: this.page
			//increment: this.increment
		};
		return (
			<div class="harmonized-viewer">
				<Tunnel.Provider state={tunnelState}>

					{this.renderTopbar()}

					{this.renderNavigation(LocationOption.Top)}

					<div class="hv-content">
						{this.renderNavigation(LocationOption.Left)}

						<main class="hv-main">
							{this.renderToolbar()}
							<div class="hv-main__content">
								<hv-viewport url={this.url} ref={elem => this.viewport = elem as HTMLHvViewportElement}></hv-viewport>
								{this.renderAnnotations()}
							</div>
						</main>

						{this.renderNavigation(LocationOption.Right)}
					</div>

					<slot name="footer" />

					{this.renderNavigation(LocationOption.Bottom)}

				</Tunnel.Provider>
			</div>
		);
	}

	renderTopbar() {
		if (!this.topbarShow) {
			return undefined;
		}
		return (
			<hv-topbar class="hv-topbar" ref={elem => this.topbar = elem as HTMLHvTopbarElement}>
			</hv-topbar>
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
					}}
					ref={elem => this.navigationElement = elem as HTMLHvNavigationElement}></hv-navigation>
			);
		}
	}

	renderToolbar() {
		if (!this.toolbarShow) {
			return undefined;
		}
		return (
			<hv-toolbar class="hv-toolbar" ref={elem => this.toolbar = elem as HTMLHvToolbarElement}></hv-toolbar>
		);
	}

	renderAnnotations() {
		if (!this.annotationsShow) {
			return undefined;
		}
		return (
			<hv-annotations class="hv-annotations" ref={elem => this.annotations = elem as HTMLHvAnnotationsElement}></hv-annotations>
		);
	}
}