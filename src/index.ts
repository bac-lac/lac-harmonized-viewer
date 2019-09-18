import { RootComponent } from "./components/root.component";
import { Options } from "./options";

const deepmerge = require('deepmerge');

export class HarmonizedViewer extends RootComponent {

    options: Options;

    private defaults: Options = {
        manifestUrl: undefined,
        navigation: {
            enabled: true,
            opened: false
        },
        annotations: {
            enabled: true,
            opened: false
        }
    };

    constructor(id: string, options: Options) {
        super(id);
        this.options = deepmerge(this.defaults, options);
    }

    init() {
        this.execute(this.options);
    }
}

export function harmonizedViewer(id: string, options: Options) {
    return new HarmonizedViewer(id, options).init();
}