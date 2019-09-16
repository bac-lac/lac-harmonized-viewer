import { DrawerComponent } from "./drawer.component";
import { PageLoad, ManifestLoad } from "../events/event";

export class AnnotationsDrawerComponent extends DrawerComponent {

    async init() {
        await super.init();

        if (this.options.annotations.enabled) {

            if (this.options.annotations.opened) {
                this.element.classList.add('mdc-drawer--open');
            }

            this.on('annotations-toggle', () => this.toggle());
        }

        this.on('manifest-load', (event: ManifestLoad) => {
            if (event.manifest) {
                this.buildManifestMetadata(event.manifest);
            }
        });

        this.on('page-load', (event: PageLoad) => {
            if (event.canvas) {
                const annotations = event.canvas.getContent();
                annotations.forEach((annotation) => this.append);
            }
        });
    }

    private buildManifestMetadata(manifest: Manifesto.Manifest) {

        if (!manifest) {
            return undefined;
        }

        const content = this.element.querySelector('.mdc-drawer__content');
        const list = document.createElement('dl');

        manifest.getMetadata().forEach((pair) => {

            const label = document.createElement('dt');
            label.textContent = pair.getLabel();
            list.append(label);

            const value = document.createElement('dd');
            value.innerHTML = pair.getValue();
            list.append(value);

        });

        content.append(list);

    }

    private append(annotation: Manifesto.IAnnotation): void {

        if (!annotation) {
            return undefined;
        }

        console.log('anot');
        const text = document.createElement('span');
        text.textContent = annotation.getDefaultLabel();
        this.element.append(text);
    }

}