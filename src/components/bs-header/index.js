import { LitElement, html } from 'lit';

import { expenseStore } from '../../store';
import { maskCurrency } from '../../utils/currency';

import { styles } from './styles';

export class BSHeader extends LitElement {
  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      expenses: Object,
      total: Number,
    };
  }

  constructor() {
    super();

    this.expenses = [];
    this.total = 0;
  }

  update(changedProps) {
    if (changedProps.has('expenses')) {
      const { getTotal } = expenseStore.getState();
      this.total = getTotal(this.expenses);
    }

    super.update(changedProps);
  }

  connectedCallback() {
    super.connectedCallback();
    this.unsubscribe = expenseStore.subscribe(({ expenses }) => {
      this.expenses = [...expenses];
      this.requestUpdate();
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.unsubscribe();
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
