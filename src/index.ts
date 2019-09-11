import { RootComponent } from "./components/root.component";

export class HarmonizedViewer extends RootComponent {

    //static instances: HarmonizedViewer[];

    options: any;

    constructor(id: string, options: any) {
        super(id);
        this.options = options || {};

        // if (!HarmonizedViewer.instances) {
        //     HarmonizedViewer.instances = [];
        // }
        // HarmonizedViewer.instances.push(this);
        // this.element['hv-instance-index'] = HarmonizedViewer.instances.length - 1;
    }

    async init() {
        this.build(this.element, this.options);
        this.execute();
    }
}

export function harmonizedViewer(id: string, options: any) {
    return new HarmonizedViewer(id, options).init();
}