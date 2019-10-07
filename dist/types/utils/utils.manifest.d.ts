import { Locale } from "./utils.locale";
export declare class ManifestExtensions {
    locale: Locale;
    manifest: Manifesto.IManifest;
    constructor(manifest: Manifesto.IManifest);
    label(): string;
    creator(): string;
    description(): string;
    private localize;
    private format;
}
