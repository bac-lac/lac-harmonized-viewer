export declare const configureStore: (preloadedState: Partial<MyAppState>) => import("redux").Store<{
    document: DocumentState;
}, import("redux").AnyAction> & {
    dispatch: unknown;
};
