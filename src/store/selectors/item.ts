export function selectCurrentItem(state: MyAppState) {
    return state.viewport.items[state.viewport.itemIndex];
}