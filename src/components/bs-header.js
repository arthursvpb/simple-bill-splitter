import { LitElement, html, css } from 'lit';

import { maskCurrency } from '../utils/currency';

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
        gap: 20px;
      }

      .total {
        color: var(--sl-color-green-700);
      }
    `;
  }

  render() {
    return html`<header>
      <sl-icon name="cash-coin"></sl-icon>
      <p>Total: <span class="total">$ ${maskCurrency('0')}</span></p>
    </header>`;
  }
}

customElements.define('bs-header', BSHeader);
