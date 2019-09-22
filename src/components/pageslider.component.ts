import { BaseComponent, Component } from "./base.component";
import * as noUiSlider from 'nouislider';
import { PageRequest } from "~/events/page-request.event";
import { PageLoad } from "~/events/page-load.event";
import { ManifestLoad } from "~/events/manifest-load.event";

export class PageSliderComponent extends BaseComponent implements Component {

    slider: noUiSlider.noUiSlider;

    create() {

        const paging = document.createElement('div');
        paging.className = 'hv-paging';

        const status = document.createElement('div');
        status.className = 'hv-paging__status';
        paging.append(status);

        status.append('Page');

        const statusPage = document.createElement('span');
        statusPage.className = 'hv-paging__status-page';
        status.append(statusPage);

        status.append('of');

        const statusTotal = document.createElement('span');
        statusTotal.className = 'hv-paging__status-total';
        status.append(statusTotal);

        const slider = document.createElement('div');
        slider.className = 'hv-paging__slider';
        paging.append(slider);

        return paging;
    }

    async bind() {
        this.instance.on('manifest-load', (event: ManifestLoad) => this.manifestLoad(event));
        this.instance.on('page-request', (event: PageRequest) => this.updateStatus(event.page));
        this.instance.on('page-load', (event: PageLoad) => this.updateStatus(event.page));
    }

    protected manifestLoad(event: ManifestLoad) {
        if(!event) {
            return undefined;
        }
        const pageCount = event.manifest.getSequenceByIndex(0).getTotalCanvases();
        this.updatePageCount(pageCount);
    }

    private initPageSlider(pageCount: number) {

        const nouiSlider = this.element.querySelector('.hv-paging__slider');
        if (nouiSlider) {

            if (this.slider) {
                this.slider.destroy();
                this.slider = undefined;
            }

            nouiSlider.id = this.uniqueid();

            this.slider = noUiSlider.create(
                document.getElementById(nouiSlider.id), {
                start: 1,
                connect: true,
                range: {
                    'min': 1,
                    'max': pageCount
                },
                orientation: 'horizontal'
            });

            this.slider.on('update', function (values, handle) {
                console.log(values[handle]);
            });
        }

    }

    private updateStatus(page: number) {
        const status = this.element.querySelector('.hv-paging__status-page');
        if (status) {
            status.textContent = (page + 1).toString();
        }
    }

    private updatePageCount(pageCount: number) {
        const status = this.element.querySelector('.hv-paging__status-total');
        if (status) {
            status.textContent = pageCount.toString();
        }
        this.initPageSlider(pageCount);
    }

}