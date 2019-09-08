export class Component {

    protected element: HTMLElement;

    protected EnsureElementId(): string {

        if (!this.element.hasAttribute("id")) {
            // Generate and assign ID to the element
            this.element.setAttribute("id", "test123");
        }

        return this.element.getAttribute("id");
    }

    public GetElement(): HTMLElement {
        return this.element;
    }

    public append(element: HTMLElement) {
        this.element.append(element);
    }

}