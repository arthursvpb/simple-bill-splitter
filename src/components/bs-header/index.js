import { LitElement, html, css } from 'lit';

import { expenseStore } from '../../store';
import { maskCurrency } from '../../utils/currency';

import { styles } from './styles';

export class BSHeader extends LitElement {
  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      store: Object,
      expenses: Object,
    };
  }

  constructor() {
    super();

    this.__initState();
  }

  __initState() {
    this.store = expenseStore;

    this.expenses = [];
    this.total = 0;
  }

  update(changedProps) {
    if (changedProps.has('expenses'))
      this.total = this.store.getState().getTotal(this.expenses);

    super.update(changedProps);
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
