import { LitElement, html, css } from 'lit';

export class BSHeader extends LitElement {
  static get styles() {
    return css`
      header {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 2rem;
        font-weight: 700;
        max-width: 1440px;
        height: 120px;
        margin: auto;
      }
    `;
  }

  render() {
    return html`<header>💲 Bill Splitter</header>`;
  }
}

customElements.define('bs-header', BSHeader);
