# harmonized-viewer



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute | Description | Type                      | Default     |
| ------------ | --------- | ----------- | ------------------------- | ----------- |
| `navigation` | --        |             | `HTMLHvNavigationElement` | `undefined` |
| `topbar`     | --        |             | `HTMLHvTopbarElement`     | `undefined` |


## Dependencies

### Depends on

- [hv-topbar](../topbar-component)
- [hv-content](../content-component)

### Graph
```mermaid
graph TD;
  harmonized-viewer --> hv-topbar
  harmonized-viewer --> hv-content
  hv-content --> hv-navigation
  hv-content --> hv-viewport
  hv-content --> hv-statusbar
  style harmonized-viewer fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
