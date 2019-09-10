declare abstract class Component implements IComponent {
    children: Component[];
    element: Element;
    parent: Component;
    constructor(parent: Component);
    init(): void;
    configure(): void;
    render(): void;
    bind(element: Element): Component;
    protected generateId(): string;
}
interface IComponent {
    children: Component[];
    element: Element;
    parent: Component;
}
