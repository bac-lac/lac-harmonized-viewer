import { RootComponent } from "./components/root.component";
import { Options } from "./options";

const deepmerge = require('deepmerge');

export class HarmonizedViewer extends RootComponent {

    //static instances: HarmonizedViewer[];

    options: Options;

    private defaults: Options = {
        manifestUrl: undefined,
        navigation: {
            enabled: true,
            opened: false
        }
    };

    constructor(id: string, options: Options) {
        super(id);
        this.options = deepmerge(this.defaults, options);
        console.log(this.options);

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

export function harmonizedViewer(id: string, options: Options) {
    return new HarmonizedViewer(id, options).init();
}