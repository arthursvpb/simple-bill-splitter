import { LitElement, html, css } from 'lit';

export class Header extends LitElement {
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
        background-color: var(--green-500);
      }
    `;
  }

  render() {
    return html`<header>Header</header>`;
  }
}

customElements.define('wc-header', Header);
