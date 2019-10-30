import OverlayScrollbars from "overlayscrollbars"

export class ScrollbarService {

    scrollbars: OverlayScrollbars

    init(element: HTMLElement) {

        if (!element) {
            return undefined
        }

        // Initialize custom scrollbars
        if (this.scrollbars) {
            this.scrollbars.destroy()
        }
        this.scrollbars = OverlayScrollbars(element, {})
    }

}