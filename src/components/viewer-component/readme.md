# harmonized-viewer



<!-- Auto Generated Below -->


## Properties

| Property             | Attribute             | Description | Type                                     | Default     |
| -------------------- | --------------------- | ----------- | ---------------------------------------- | ----------- |
| `annotationsEnable`  | `annotations-enable`  |             | `boolean`                                | `undefined` |
| `documentUrl`        | `url`                 |             | `string`                                 | `undefined` |
| `language`           | `language`            |             | `string`                                 | `undefined` |
| `navigationEnable`   | `navigation-enable`   |             | `boolean`                                | `undefined` |
| `navigationHeight`   | `navigation-height`   |             | `number`                                 | `undefined` |
| `navigationLocation` | `navigation-location` |             | `"bottom" \| "left" \| "right" \| "top"` | `undefined` |


## Dependencies

### Depends on

- [harmonized-topbar](../topbar)
- [harmonized-message](../message-component)
- [harmonized-viewport](../viewport-component)

### Graph
```mermaid
graph TD;
  harmonized-viewer --> harmonized-topbar
  harmonized-viewer --> harmonized-message
  harmonized-viewer --> harmonized-viewport
  harmonized-topbar --> hv-settings
  harmonized-viewport --> harmonized-spinner
  harmonized-viewport --> hv-annotations
  harmonized-viewport --> hv-navigation
  harmonized-viewport --> harmonized-openseadragon
  harmonized-viewport --> harmonized-pdf
  style harmonized-viewer fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
