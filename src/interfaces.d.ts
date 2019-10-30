export interface DocumentState {
    alternateFormats: DocumentAlternateFormat[]
    annotations: DocumentAnnotation[]
    contentType: string
    loading: boolean
    page: number
    pageCount: number
    pages: DocumentPage[]
    title: string
    url: string,
    zoom: DocumentZoom
}

interface DocumentPage {
    id: string
    label: string
    thumbnail: string
}

interface DocumentAnnotation {
    id: string
    label: string
    content: string
    collapsed: boolean
}

interface DocumentAlternateFormat {
    contentType: string
    label: string
    url: string
}

interface DocumentZoom {
    min: number
    max: number
    zoom: number
}

//type DocumentContentType = 'IIIF' | 'application/pdf';

interface MyAppState {
    document: DocumentState
}