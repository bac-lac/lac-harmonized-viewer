import { DrawerComponent } from "./drawer.component";
import { PageLoad, ManifestLoad } from "../events/event";

export class AnnotationsComponent extends DrawerComponent {

    create(): HTMLElement {

        const element = super.create();

        element.classList.add('hv-annotations');
        element.classList.add('mdc-top-app-bar--fixed-adjust');

        if (this.options.annotations.enabled && this.options.annotations.opened) {
            element.classList.add('mdc-drawer--open');
        }

        // ...

        return element;

    }

    bind() {

        if (this.options.annotations.enabled) {
            this.on('annotations-toggle', () => this.toggle());
        }

        this.on('manifest-load', (event: ManifestLoad) => {
            this.buildManifest(event.manifest);
        });

        this.on('page-load', (event: PageLoad) => {
            event.canvas.getContent().forEach(x => this.appendAnnotation(x));
        });
    }

    protected buildManifest(manifest: Manifesto.Manifest): void {

        if (!manifest) {
            return undefined;
        }

        const content = this.element.querySelector('.mdc-drawer__content');

        const list = document.createElement('dl');

        manifest.getMetadata().forEach((item) => {

            const label = document.createElement('dt');
            label.textContent = item.getLabel();
            list.append(label);

            const value = document.createElement('dd');
            value.innerHTML = item.getValue();
            list.append(value);

        });

        content.append(list);
    }

    protected appendAnnotation(annotation: Manifesto.IAnnotation): void {

        if (!annotation) {
            return undefined;
        }

        const text = document.createElement('span');
        text.textContent = annotation.getDefaultLabel();
        this.element.append(text);
    }

}