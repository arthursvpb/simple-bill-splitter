import { LitElement, html } from 'lit';

import { styles } from './styles';

export class BSPage extends LitElement {
  static get styles() {
    return styles;
  }

  render() {
    return html`<main>
      <slot name="content"></slot>
    </main>`;
  }
}

customElements.define('bs-page', BSPage);
