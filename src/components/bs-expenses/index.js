import { LitElement, html } from 'lit';

import { userStore, expenseStore } from '../../store';
import { maskCurrency, unmaskCurrency } from '../../utils/currency';

import { styles } from './styles';

const {
  state: { expenses },
} = JSON.parse(localStorage.getItem('@bs-expenses'));

export class BSExpenses extends LitElement {
  static get properties() {
    return {
      expense: Object,
      expenses: Array,
      users: Array,
    };
  }

  static get styles() {
    return styles;
  }

  constructor() {
    super();

    this.__initState();
    this.__initHandlers();
  }

  __initState() {
    this.expense = { name: '', price: 0, payers: [] };
    this.expenses = [];
    this.users = [];
  }

  __initHandlers() {
    this.handlers = {
      handleChange: event => {
        this.expense.name = event.target.value;
      },
      handleInput(event) {
        const {
          value,
          dataset: { index },
        } = event.target;

        const expense = this.expenses[index];
        expense.price = Number(unmaskCurrency(value));
        event.target.value = maskCurrency(value);

        this.__updateState();
      },
      removeExpense: index => {
        this.expenses.splice(index, 1);
        this.__updateState();
      },
      addExpense: event => {
        event.preventDefault();
        if (!this.expense.name) return;

        this.expense.payers = this.__getDefaultUsersSelected();
        this.expenses.push(this.expense);

        this.expense = { name: '', price: 0, payers: [] };

        event.target.reset();
      },
      handlePayerChange: (event, index) => {
        if (event.type === 'click' || event.key === 'Enter') {
          const user = event.target.value;
          const { payers } = this.expenses[index];

          const userIndex = payers.findIndex(payer => payer === user);
          const foundIndex = userIndex !== -1;

          foundIndex
            ? payers.splice(userIndex, 1)
            : payers.splice(userIndex, 0, user);

          this.__updateState();
        }
      },
    };
  }

  connectedCallback() {
    super.connectedCallback();

    this.unsubscribe = userStore.subscribe(({ users }) => {
      this.users = [...users];
      this.requestUpdate();
    });
  }

  firstUpdated() {
    super.firstUpdated();
    if (expenses.length) this.expenses = [...expenses];
  }

  updated(changedProps) {
    if (changedProps.has('expense') || changedProps.has('expenses'))
      this.__localStorageUpdate();

    super.updated(changedProps);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.unsubscribe();
  }

  __localStorageUpdate() {
    const { persistExpense } = expenseStore.getState();
    persistExpense(this.expenses);
  }

  __updateState() {
    const { calculateBills } = expenseStore.getState();
    calculateBills(this.users, this.expenses);
    this.expenses = [...this.expenses];
  }

  __getDefaultUsersSelected() {
    return this.users.map((_, index) => `user-${index}`);
  }

  __usersSelect(expenseIndex) {
    return html`<sl-select
      class="select-payers"
      placeholder="Payers"
      multiple
      filled
      max-options-visible="1"
      .value=${this.expenses[expenseIndex].payers}
    >
      ${this.__usersOptions(expenseIndex)}
    </sl-select>`;
  }

  __usersOptions(optionIndex) {
    return html`${this.users.map(
      (user, index) => html` <sl-option
        value="user-${index}"
        @click=${event => this.handlers.handlePayerChange(event, optionIndex)}
        @keydown=${event => this.handlers.handlePayerChange(event, optionIndex)}
        >${user.name}
      </sl-option>`,
    )}`;
  }

  __formAddExpense() {
    return html` <form @submit="${this.handlers.addExpense}">
      <sl-input
        required
        placeholder="Expense"
        .value=${this.expense.name}
        @input=${this.handlers.handleChange}
      ></sl-input>
      <sl-button type="submit" variant="success"
        ><sl-icon slot="suffix" name="plus-lg"></sl-icon
      ></sl-button>
    </form>`;
  }

  __expensesList() {
    return html`<div class="payers-container">
      ${this.expenses.map(
        (expense, index) => html` <sl-card class="card-basic">
          <div class="card-content">
            <div>
              <p>${expense.name}</p>
              <sl-input
                pill
                class="card-input"
                data-index=${index}
                @input="${this.handlers.handleInput}"
                value=${maskCurrency(String(expense.price))}
              >
                <sl-icon name="currency-dollar" slot="prefix"></sl-icon>
              </sl-input>
            </div>
          </div>
          <sl-icon-button
            class="trash-icon"
            name="trash"
            label="Trash"
            @click=${() => this.handlers.removeExpense(index)}
          ></sl-icon-button>

          ${this.__usersSelect(index)}
        </sl-card>`,
      )}
    </div>`;
  }

  render() {
    return html`${this.__formAddExpense()} ${this.__expensesList()}`;
  }
}

customElements.define('bs-expenses', BSExpenses);
