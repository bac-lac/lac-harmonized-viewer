interface DocumentState {
    contentType: DocumentContentType;
    url: string;
}

type DocumentContentType = 'IIIF' | 'PDF';

interface MyAppState {
    document: DocumentState;
}