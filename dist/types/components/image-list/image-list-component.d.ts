import 'intersection-observer';
export declare class ImageListComponent {
    el: HTMLElement;
    children: number;
    private observer;
    componentDidLoad(): void;
    componentDidUnload(): void;
    componentDidRender(): void;
    handleImageAdded(): void;
    createObserver(): IntersectionObserver;
    bind(): void;
    bindOne(element: Element): any;
    handleObserve(entries: IntersectionObserverEntry[], observer: IntersectionObserver): any;
}
