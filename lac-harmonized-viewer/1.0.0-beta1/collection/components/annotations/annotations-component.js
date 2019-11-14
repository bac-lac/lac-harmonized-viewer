import { h } from "@stencil/core";
import iconExpand from '../../assets/material-design-icons/ic_add_24px.svg';
import iconCollapse from '../../assets/material-design-icons/ic_remove_24px.svg';
import { label } from '../../services/i18n-service';
export class AnnotationsComponent {
    componentWillLoad() {
        this.storeUnsubscribe = this.store.mapStateToProps(this, (state) => {
            const { document: { annotations: annotations } } = state;
            return {
                annotations: annotations
            };
        });
    }
    componentDidUnload() {
        this.storeUnsubscribe();
    }
    handleClick(ev) {
        const target = ev.currentTarget;
        if (target) {
            //const collapsed = target.classList.contains('is-collapsed')
            target.classList.toggle('is-collapsed');
            // Persist state
            // const visible = !panel.classList.contains('is-hidden')
            // saveAnnotationVisibility(id, visible)
        }
        const icons = Array.from(this.el.querySelectorAll('.annotation-icon'));
        icons.forEach((icon) => {
            target.setAttribute('aria-hidden', icon.closest('.mdc-list-item').classList.contains('is-collapsed').toString());
        });
    }
    render() {
        return h("nav", { class: "mdc-list mdc-list--two-line mdc-list--dense" }, this.annotations.map((annotation) => (h("a", { class: this.renderAnnotationClass(annotation), onClick: this.handleClick.bind(this), "data-id": annotation.id, tabindex: "0" },
            h("span", { class: "mdc-list-item__text" },
                annotation.label && h("span", { class: "mdc-list-item__primary-text" },
                    h("span", null, label(annotation.label)),
                    h("span", { class: "annotation-icon annotation-icon--expand", "aria-hidden": true, innerHTML: iconExpand }),
                    h("span", { class: "annotation-icon annotation-icon--collapse", "aria-hidden": true, innerHTML: iconCollapse })),
                h("span", { class: "mdc-list-item__secondary-text", innerHTML: annotation.content }))))));
    }
    renderAnnotationClass(annotation) {
        if (!annotation) {
            return undefined;
        }
        let className = 'mdc-list-item';
        if (!annotation.name) {
            className += ' mdc-list--non-interactive';
        }
        if (!annotation.visible) {
            className += ' is-collapsed';
        }
        return className;
    }
    static get is() { return "hv-annotations"; }
    static get originalStyleUrls() { return {
        "$": ["annotations-component.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["annotations-component.css"]
    }; }
    static get contextProps() { return [{
            "name": "store",
            "context": "store"
        }]; }
    static get states() { return {
        "annotations": {}
    }; }
    static get elementRef() { return "el"; }
}
