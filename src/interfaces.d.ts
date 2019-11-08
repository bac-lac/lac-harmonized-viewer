export interface DocumentState {
    error: DocumentError
    loading: boolean
    alternateFormats: DocumentAlternateFormat[]
    annotations: DocumentAnnotation[]
    contentType: string
    document: Document
    options: Options[]
    page: number
    pageCount: number
    pages: DocumentPage[]
    tags: DocumentTag[]
    status: DocumentStatus
    url: string
    zoom: DocumentZoom
    zoomRequest: DocumentZoom
}

interface Document {
    title: string
}

interface Options {
    component: string
    name: string
    value: any
}

interface DocumentError {
    code: string
    message: string
}

interface DocumentStatus {
    code: StatusCode
    loading: boolean
    error: DocumentError
}
type StatusCode = 'initial' | 'prefetching' | 'prefetched' | 'loading' | 'loaded' | 'failed'

interface DocumentPage {
    id: string
    label: string
    image: string
    thumbnail: string
}

interface DocumentAnnotation {
    id: string
    name: string
    label: string
    content: string
    visible: boolean
}

interface DocumentAlternateFormat {
    contentType: string
    label: string
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

interface ViewerSettings {
    locale: string
    annotations: AnnotationState[]
}

interface AnnotationState {
    id: string,
    visible: boolean
}
