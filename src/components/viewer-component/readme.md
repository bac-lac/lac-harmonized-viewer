# harmonized-viewer



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute | Description | Type                      | Default     |
| ------------ | --------- | ----------- | ------------------------- | ----------- |
| `manifest`   | --        |             | `IManifest`               | `undefined` |
| `navigation` | --        |             | `HTMLHvNavigationElement` | `undefined` |
| `topbar`     | --        |             | `HTMLHvTopbarElement`     | `undefined` |
| `viewport`   | --        |             | `HTMLHvViewportElement`   | `undefined` |


## Events

| Event            | Description | Type               |
| ---------------- | ----------- | ------------------ |
| `goto`           |             | `CustomEvent<any>` |
| `manifestLoaded` |             | `CustomEvent<any>` |


## Dependencies

### Depends on

- [hv-topbar](../topbar-component)
- [hv-navigation](../navigation)
- [hv-toolbar](../toolbar)
- [hv-viewport](../viewport-component)
- [hv-statusbar](../statusbar)

### Graph
```mermaid
graph TD;
  harmonized-viewer --> hv-topbar
  harmonized-viewer --> hv-navigation
  harmonized-viewer --> hv-toolbar
  harmonized-viewer --> hv-viewport
  harmonized-viewer --> hv-statusbar
  hv-topbar --> hv-settings
  style harmonized-viewer fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
