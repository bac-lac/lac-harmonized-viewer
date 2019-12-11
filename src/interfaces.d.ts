interface AppConfig {
    errors?: DocumentError[]
    languages?: Language[]
    contentTypes?: ContentTypeMapping[]
}

interface ContentTypeMapping {
    formats: string[]
    component: string
}

interface DocumentState {
    error: DocumentError
    configuration: Configuration,
    loading: boolean
    alternateFormats: DocumentAlternateFormat[]
    annotations: DocumentAnnotation[]
    contentType: string
    document: DocumentBase
    fullscreen: boolean,
    infoShown: boolean,
    language: Language
    availableLanguages: Language[]
    options: Options[]
    overlays: DocumentOverlay[]
    page: number
    pageCount: number
    pages: DocumentPage[]
    customResolvers: string[]
    tags: DocumentTag[]
    theme: string,
    themes: string[],
    status: DocumentStatus
    url: string
    viewport: Viewport
    zoom: DocumentZoom
    zoomRequest: DocumentZoom
}

type ErrorCode = 'request-failed' | 'request-failed-notfound' | 'contenttype-unsupported'
type ErrorSeverity = 'fatal' | 'error' | 'warning'

interface Viewport {
    navigationEnable: boolean
    navigationPlacement: PlacementType
    pagingEnable: boolean
}

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
    code: ErrorCode
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

//type DocumentContentType = 'IIIF' | 'application/pdf';

interface MyAppState {
    document: DocumentState
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

interface Configuration {
    language: LanguageConfiguration
}

interface LanguageConfiguration {
    enable: boolean
}