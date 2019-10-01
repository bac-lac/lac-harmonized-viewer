/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';


export namespace Components {
  interface HarmonizedViewer {
    'navigation': HTMLHvNavigationElement;
    'topbar': HTMLHvTopbarElement;
  }
  interface HvContent {
    'navigation': HTMLHvNavigationElement;
  }
  interface HvNavigation {
    'current': number;
    'manifest': Manifesto.IManifest;
    'open': boolean;
  }
  interface HvSettings {}
  interface HvStatusbar {}
  interface HvToolbar {}
  interface HvTopbar {
    'publisher': string;
    'thumbnail': string;
    'title': string;
  }
  interface HvViewport {
    'manifest': string;
    'openseadragon': any;
  }
}

declare global {


  interface HTMLHarmonizedViewerElement extends Components.HarmonizedViewer, HTMLStencilElement {}
  var HTMLHarmonizedViewerElement: {
    prototype: HTMLHarmonizedViewerElement;
    new (): HTMLHarmonizedViewerElement;
  };

  interface HTMLHvContentElement extends Components.HvContent, HTMLStencilElement {}
  var HTMLHvContentElement: {
    prototype: HTMLHvContentElement;
    new (): HTMLHvContentElement;
  };

  interface HTMLHvNavigationElement extends Components.HvNavigation, HTMLStencilElement {}
  var HTMLHvNavigationElement: {
    prototype: HTMLHvNavigationElement;
    new (): HTMLHvNavigationElement;
  };

  interface HTMLHvSettingsElement extends Components.HvSettings, HTMLStencilElement {}
  var HTMLHvSettingsElement: {
    prototype: HTMLHvSettingsElement;
    new (): HTMLHvSettingsElement;
  };

  interface HTMLHvStatusbarElement extends Components.HvStatusbar, HTMLStencilElement {}
  var HTMLHvStatusbarElement: {
    prototype: HTMLHvStatusbarElement;
    new (): HTMLHvStatusbarElement;
  };

  interface HTMLHvToolbarElement extends Components.HvToolbar, HTMLStencilElement {}
  var HTMLHvToolbarElement: {
    prototype: HTMLHvToolbarElement;
    new (): HTMLHvToolbarElement;
  };

  interface HTMLHvTopbarElement extends Components.HvTopbar, HTMLStencilElement {}
  var HTMLHvTopbarElement: {
    prototype: HTMLHvTopbarElement;
    new (): HTMLHvTopbarElement;
  };

  interface HTMLHvViewportElement extends Components.HvViewport, HTMLStencilElement {}
  var HTMLHvViewportElement: {
    prototype: HTMLHvViewportElement;
    new (): HTMLHvViewportElement;
  };
  interface HTMLElementTagNameMap {
    'harmonized-viewer': HTMLHarmonizedViewerElement;
    'hv-content': HTMLHvContentElement;
    'hv-navigation': HTMLHvNavigationElement;
    'hv-settings': HTMLHvSettingsElement;
    'hv-statusbar': HTMLHvStatusbarElement;
    'hv-toolbar': HTMLHvToolbarElement;
    'hv-topbar': HTMLHvTopbarElement;
    'hv-viewport': HTMLHvViewportElement;
  }
}

declare namespace LocalJSX {
  interface HarmonizedViewer {
    'navigation'?: HTMLHvNavigationElement;
    'topbar'?: HTMLHvTopbarElement;
  }
  interface HvContent {
    'navigation'?: HTMLHvNavigationElement;
  }
  interface HvNavigation {
    'current'?: number;
    'manifest'?: Manifesto.IManifest;
    'onGoTo'?: (event: CustomEvent<any>) => void;
    'open'?: boolean;
  }
  interface HvSettings {}
  interface HvStatusbar {}
  interface HvToolbar {}
  interface HvTopbar {
    'onNavigationToggled'?: (event: CustomEvent<any>) => void;
    'publisher'?: string;
    'thumbnail'?: string;
    'title'?: string;
  }
  interface HvViewport {
    'manifest'?: string;
    'onCanvasLoaded'?: (event: CustomEvent<any>) => void;
    'onManifestLoaded'?: (event: CustomEvent<any>) => void;
    'openseadragon'?: any;
  }

  interface IntrinsicElements {
    'harmonized-viewer': HarmonizedViewer;
    'hv-content': HvContent;
    'hv-navigation': HvNavigation;
    'hv-settings': HvSettings;
    'hv-statusbar': HvStatusbar;
    'hv-toolbar': HvToolbar;
    'hv-topbar': HvTopbar;
    'hv-viewport': HvViewport;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements {
      'harmonized-viewer': LocalJSX.HarmonizedViewer & JSXBase.HTMLAttributes<HTMLHarmonizedViewerElement>;
      'hv-content': LocalJSX.HvContent & JSXBase.HTMLAttributes<HTMLHvContentElement>;
      'hv-navigation': LocalJSX.HvNavigation & JSXBase.HTMLAttributes<HTMLHvNavigationElement>;
      'hv-settings': LocalJSX.HvSettings & JSXBase.HTMLAttributes<HTMLHvSettingsElement>;
      'hv-statusbar': LocalJSX.HvStatusbar & JSXBase.HTMLAttributes<HTMLHvStatusbarElement>;
      'hv-toolbar': LocalJSX.HvToolbar & JSXBase.HTMLAttributes<HTMLHvToolbarElement>;
      'hv-topbar': LocalJSX.HvTopbar & JSXBase.HTMLAttributes<HTMLHvTopbarElement>;
      'hv-viewport': LocalJSX.HvViewport & JSXBase.HTMLAttributes<HTMLHvViewportElement>;
    }
  }
}

