# hv-viewport



<!-- Auto Generated Below -->


## Events

| Event                             | Description | Type               |
| --------------------------------- | ----------- | ------------------ |
| `harmonizedViewerViewportUpdated` |             | `CustomEvent<any>` |


## Dependencies

### Used by

 - [harmonized-viewer](../viewer-component)

### Depends on

- [harmonized-openseadragon](../openseadragon)
- [harmonized-embed](../pdf)
- [harmonized-audio](../audio-component)
- [harmonized-video](../video)
- [harmonized-pager](../pager)

### Graph
```mermaid
graph TD;
  harmonized-viewport --> harmonized-openseadragon
  harmonized-viewport --> harmonized-embed
  harmonized-viewport --> harmonized-audio
  harmonized-viewport --> harmonized-video
  harmonized-viewport --> harmonized-pager
  harmonized-openseadragon --> harmonized-button
  harmonized-openseadragon --> harmonized-overlay
  harmonized-viewer --> harmonized-viewport
  style harmonized-viewport fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
