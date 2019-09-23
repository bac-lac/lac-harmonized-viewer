import { SidebarComponent } from "./sidebar.component";
import { Component } from "./base.component";
import { MDCList } from "@material/list/component";
import { ManifestLoad } from "~/events/manifest-load.event";

export class AnnotationsComponent extends SidebarComponent implements Component {

    private list: HTMLElement;
    private mdclist: MDCList;

    create() {

        const sidebar = super.create();

        sidebar.classList.add('hv-annotations');
        sidebar.classList.add('mdc-top-app-bar--fixed-adjust');

        if (this.options.enable && this.options.open) {
            sidebar.classList.add('mdc-drawer--open');
        }

        this.list = document.createElement('dt');
        this.list.className = 'hv-annotations__list';
        sidebar.firstElementChild.append(this.list);

        this.mdclist = MDCList.attachTo(this.list);

        return sidebar;
    }

    async bind() {
        this.instance.on('manifest-load', (event: ManifestLoad) => this.manifestLoaded(event));
        this.instance.on('annotations-toggle', () => this.toggle());
    }

    protected manifestLoaded(event: ManifestLoad) {

        if (!event) {
            return undefined;
        }

        event.manifest.getMetadata().forEach((item) => {

            const dt = document.createElement('dt');
            dt.className = 'hv-annotations__list-term';
            dt.textContent = item.getLabel();

            const dd = document.createElement('dd');
            dd.className = 'hv-annotations__list-definition';
            dd.innerHTML = item.getValue();

            this.list.append(dt);
            this.list.append(dd);
        });
    }

}