# harmonized-viewer



<!-- Auto Generated Below -->


## Properties

| Property                    | Attribute                     | Description | Type                                     | Default     |
| --------------------------- | ----------------------------- | ----------- | ---------------------------------------- | ----------- |
| `customItemProps`           | --                            |             | `string[]`                               | `[]`        |
| `customVideoPlayer`         | `customvideoplayer`           |             | `boolean`                                | `false`     |
| `deepzoomEnabled`           | `deepzoom`                    |             | `boolean`                                | `true`      |
| `language`                  | `language`                    |             | `string`                                 | `undefined` |
| `navigationBackgroundColor` | `navigation-background-color` |             | `string`                                 | `undefined` |
| `navigationCols`            | `navigation-cols`             |             | `number`                                 | `16`        |
| `navigationEnable`          | `navigation-enable`           |             | `boolean`                                | `undefined` |
| `navigationPlacement`       | `navigation-placement`        |             | `"bottom" \| "left" \| "right" \| "top"` | `"bottom"`  |
| `navigationRows`            | `navigation-rows`             |             | `number`                                 | `1`         |
| `preventLoadOnEmpty`        | `prevent-load-on-empty`       |             | `boolean`                                | `false`     |
| `suppressGallery`           | `suppress-gallery`            |             | `boolean`                                | `false`     |
| `url`                       | `url`                         |             | `string`                                 | `undefined` |


## Events

| Event               | Description | Type               |
| ------------------- | ----------- | ------------------ |
| `hvManifestError`   |             | `CustomEvent<any>` |
| `hvManifestIsEmpty` |             | `CustomEvent<any>` |
| `hvRender`          |             | `CustomEvent<any>` |
| `itemChanged`       |             | `CustomEvent<any>` |
| `itemsLoaded`       |             | `CustomEvent<any>` |


## Methods

### `addOverlay(x: number, y: number, width: number, height: number) => Promise<void>`



#### Returns

Type: `Promise<void>`



### `getCurrentItem() => Promise<Item>`



#### Returns

Type: `Promise<Item>`



### `getCustomVideoElement() => Promise<HTMLElement>`



#### Returns

Type: `Promise<HTMLElement>`



### `getDrawerElement() => Promise<HTMLElement>`



#### Returns

Type: `Promise<HTMLElement>`



### `getItemCount() => Promise<number>`



#### Returns

Type: `Promise<number>`



### `getItems() => Promise<Item[]>`



#### Returns

Type: `Promise<Item[]>`



### `getNavigationElement() => Promise<HTMLElement>`



#### Returns

Type: `Promise<HTMLElement>`



### `getTopBarElement() => Promise<HTMLElement>`



#### Returns

Type: `Promise<HTMLElement>`



### `getViewportElement() => Promise<HTMLElement>`



#### Returns

Type: `Promise<HTMLElement>`



### `getViewportType() => Promise<ViewportType>`



#### Returns

Type: `Promise<ViewportType>`



### `setItem(index: number) => Promise<boolean>`



#### Returns

Type: `Promise<boolean>`




## Dependencies

### Depends on

- [harmonized-spinner](../spinner)
- [harmonized-message](../message)
- [harmonized-topbar](../topbar)
- [harmonized-viewport](../viewport-component)
- [harmonized-navigation](../navigation)
- [harmonized-drawer](../drawer)
- [harmonized-annotations](../annotations)

### Graph
```mermaid
graph TD;
  harmonized-viewer --> harmonized-spinner
  harmonized-viewer --> harmonized-message
  harmonized-viewer --> harmonized-topbar
  harmonized-viewer --> harmonized-viewport
  harmonized-viewer --> harmonized-navigation
  harmonized-viewer --> harmonized-drawer
  harmonized-viewer --> harmonized-annotations
  harmonized-topbar --> harmonized-button
  harmonized-viewport --> harmonized-openseadragon
  harmonized-viewport --> harmonized-embed
  harmonized-viewport --> harmonized-audio
  harmonized-viewport --> harmonized-video
  harmonized-viewport --> harmonized-pager
  harmonized-openseadragon --> harmonized-button
  harmonized-openseadragon --> harmonized-overlay
  harmonized-navigation --> harmonized-image-list
  harmonized-navigation --> harmonized-image
  harmonized-drawer --> harmonized-button
  style harmonized-viewer fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
