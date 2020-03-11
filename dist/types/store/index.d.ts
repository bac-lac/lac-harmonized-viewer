export declare const configureStore: (preloadedState: Partial<MyAppState>) => import("redux").Store<{
    document: DocumentState;
    manifest: ManifestState;
    viewport: ViewportState;
}, import("redux").AnyAction> & {
    dispatch: unknown;
};
