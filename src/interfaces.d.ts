interface AppConfig {
    errors?: DocumentError[]
    languages?: Language[]
    contentTypes?: ContentTypeMapping[]
}

interface MetadataMapping {
    key: string,
    values: DocumentLabel[]
}

interface ContentTypeMapping {
    formats: string[]
    component: string
}

interface DocumentState {
    error: DocumentError
    configuration: Configuration,
    language: Language
    availableLanguages: Language[]
    options: Options[]
    overlays: DocumentOverlay[]
    tags: DocumentTag[]
    theme: string,
    themes: string[]
}

interface ManifestState {
    fetching: boolean,
    fetched: boolean,
    error: DocumentError,
    manifest: Manifesto.IManifest
}

interface ViewportState {
    title: DocumentLabel[],
    metadata: DocumentMetadata[],
    itemIndex: number,
    items: DocumentPage[]
    fullscreen: boolean,
    infoShown: boolean
}

// Used in viewport, topbar, etc.
type ViewportType = 'image' | 'pdf' | 'video' | 'audio';

type ErrorCode = 'manifest-not-found' | 'manifest-incorrect-format' | 'request-failed' | 'request-failed-notfound' | 'contenttype-unsupported'
type ErrorSeverity = 'fatal' | 'error' | 'warning'

interface DocumentBase {
    label: DocumentLabel[]
}

interface Options {
    component: string
    name: string
    value: any
}

interface Language {
    code: string
    name: string
}

interface DocumentError {
    code: ErrorCode,
    severity: ErrorSeverity
    optionalParameters?: DocumentErrorParameter[]
}

interface DocumentErrorParameter {
    key: string
    value: any
}

interface DocumentStatus {
    code: StatusCode
    loading: boolean
    error: DocumentError
    visible: boolean
}
type StatusCode = 'initial' | 'prefetching' | 'prefetched' | 'loading' | 'loaded' | 'failed' | 'empty'

interface DocumentPage {
    id: string
    contentType: string
    label: DocumentLabel[]
    image: string
    thumbnail: string
    tileSources: string[]
    metadata: DocumentMetadata[]
    parent: string;
}

interface DocumentAnnotation {
    id: string
    name: string
    label: DocumentLabel[]
    content: string
    collapsed?: boolean
}

interface DocumentAlternateFormat {
    contentType: string
    label: DocumentLabel[]
    url: string
}

interface DocumentZoom {
    min: number
    max: number
    ratio?: number
    value: number
}

interface DocumentTag {
    x: number
    y: number
    text: string
}

interface MyAppState {
    document: DocumentState,
    manifest: ManifestState,
    viewport: ViewportState
}

interface HVPersistedState {
    language: string
    theme: string
}

interface AnnotationState {
    id: string,
    visible: boolean
}

interface DocumentOverlay {
    id: string,
    x: number,
    y: number,
    width: number,
    height: number,
    page?: number
}

interface DocumentLabel {
    locale: string
    value: string
}

interface DocumentMetadata {
    key: string,
    label: DocumentLabel[],
    value: DocumentLabel[]
}

interface Configuration {
    language: string
    customVideoPlayer: boolean
    customItemProps: string[]
    deepzoom: boolean
    suppressGallery: boolean
    pdfManifestUri: string
}