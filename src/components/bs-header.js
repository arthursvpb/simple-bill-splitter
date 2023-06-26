import { LitElement, html, css } from 'lit';

import { expenseStore } from '../store';
import { maskCurrency } from '../utils/currency';

export class BSHeader extends LitElement {
  static get properties() {
    return {
      expenses: Object,
    };
  }

  constructor() {
    super();

    this.__initState();
  }

  __initState() {
    this.expenses = [];
    this.total = 0;
  }

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

  updated(changedProps) {
    console.log('changedProps', changedProps);
    if (changedProps.has('expense') || changedProps.has('expenses'))
      this.__getTotal();

    super.updated(changedProps);
  }

  __handleStateChange(expenses) {
    this.expenses = [...expenses];
    this.requestUpdate();
  }

  connectedCallback() {
    super.connectedCallback();
    this.unsubscribe = expenseStore.subscribe(({ expenses }) =>
      this.__handleStateChange(expenses),
    );
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.unsubscribe();
  }

  __getTotal() {
    this.total = this.expenses.reduce((acc, expense) => acc + expense.price, 0);
  }

  render() {
    return html`<header>
      <sl-icon name="cash-coin"></sl-icon>
      <p>
        Total:
        <span class="total">$ ${maskCurrency(String(this.total))}</span>
      </p>
    </header>`;
  }
}

customElements.define('bs-header', BSHeader);
