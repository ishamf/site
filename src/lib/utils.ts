import appCssLink from '../app.css?url';

/**
 *  Add app styles to the custom element, to be used in svelte's customElement.extend config.
 */
export function addAppStyles(customElementComponent: typeof HTMLElement) {
  return class extends customElementComponent {
    constructor() {
      super();

      const style = document.createElement('link');
      style.href = appCssLink;
      style.rel = 'stylesheet';
      this.shadowRoot?.appendChild(style);
    }
  };
}
