import { LitElement, html, css } from 'lit';

export class BSPage extends LitElement {
  static get styles() {
    return css`
      main {
        max-width: 1440px;
        margin: auto;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        flex-direction: row;
        margin: auto;
        gap: 2.5rem;
      }
    `;
  }

  render() {
    return html`<main>
      <slot name="content"></slot>
    </main>`;
  }
}

customElements.define('bs-page', BSPage);
