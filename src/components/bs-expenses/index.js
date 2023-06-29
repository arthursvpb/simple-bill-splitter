import { LitElement, html } from 'lit';

import { userStore, expenseStore } from '../../store';
import { maskCurrency, unmaskCurrency } from '../../utils/currency';

import { styles } from './styles';

export class BSExpenses extends LitElement {
  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      store: Object,
      expense: Object,
      expenses: Array,
    };
  }

  constructor() {
    super();

    this.__initState();
    this.__initHandlers();
  }

  __initState() {
    this.store = expenseStore;

    this.users = [];
    this.selectedUsers = [];

    this.expense = {
      name: '',
      price: 0,
      payers: [],
    };

    this.expenses = [];
  }

  __initHandlers() {
    this.handlers = {
      handleChange: e => {
        this.expense.name = e.target.value;
      },
      handleInput(e) {
        const value = unmaskCurrency(e.target.value);
        const expense = this.expenses[e.target.dataset.index];
        expense.price = Number(value);
        e.target.value = maskCurrency(value);

        this.store.getState().calculateBills(this.users, this.expenses);
        this.expenses = [...this.expenses];
      },
      removeExpense: e => {
        this.expenses.splice(e.currentTarget.dataset.index, 1);

        this.store.getState().calculateBills(this.users, this.expenses);
        this.expenses = [...this.expenses];
      },
      addExpense: e => {
        e.preventDefault();
        if (!this.expense.name) return;

        this.expense.payers = this.__getDefaultUsersSelected();
        this.expenses.push(this.expense);

        this.expense = {
          name: '',
          price: 0,
          payers: [],
        };

        e.target.reset();
      },
      handlePayerChange: (e, index) => {
        if (e.type === 'click' || e.key === 'Enter') {
          const user = e.target.value;
          const { payers } = this.expenses[index];

          const userIndex = payers.findIndex(payer => payer === user);
          const foundIndex = userIndex !== -1;

          foundIndex
            ? payers.splice(userIndex, 1)
            : payers.splice(userIndex, 0, user);

          this.store.getState().calculateBills(this.users, this.expenses);
          this.expenses = [...this.expenses];
        }
      },
    };
  }

  __localStorageUpdate() {
    this.store.getState().persistExpense(this.expenses);
  }

  firstUpdated() {
    super.firstUpdated();

    const {
      state: { expenses },
    } = JSON.parse(localStorage.getItem('@bs-expenses'));

    if (expenses.length) this.expenses = [...expenses];
  }

  updated(changedProps) {
    if (changedProps.has('expense') || changedProps.has('expenses'))
      this.__localStorageUpdate();

    super.updated(changedProps);
  }

  __handleStateChange(users) {
    this.users = [...users];
    this.requestUpdate();
  }

  connectedCallback() {
    super.connectedCallback();
    this.unsubscribe = userStore.subscribe(({ users }) =>
      this.__handleStateChange(users),
    );
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.unsubscribe();
  }

  __getDefaultUsersSelected() {
    return this.users.map((_, index) => `user-${index}`);
  }

  __renderUsersOptions(optionIndex) {
    return html`${this.users.map(
      (user, index) => html` <sl-option
        value="user-${index}"
        @click=${e => this.handlers.handlePayerChange(e, optionIndex)}
        @keydown=${e => this.handlers.handlePayerChange(e, optionIndex)}
        >${user.name}
      </sl-option>`,
    )}`;
  }

  render() {
    return html`
      <form @submit="${this.handlers.addExpense}">
        <sl-input
          required
          placeholder="Expense"
          .value=${this.expense.name}
          @input=${this.handlers.handleChange}
        ></sl-input>
        <sl-button type="submit" variant="success"
          ><sl-icon slot="suffix" name="plus-lg"></sl-icon
        ></sl-button>
      </form>

      <div class="payers-container">
        ${this.expenses.map(
          (expense, index) => html` <sl-card class="card-basic" key=${index}>
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
              data-index=${index}
              @click=${this.handlers.removeExpense}
            ></sl-icon-button>

            <sl-select
              class="select-payers"
              placeholder="Payers"
              multiple
              filled
              max-options-visible="1"
              .value=${this.expenses[index].payers}
            >
              ${this.__renderUsersOptions(index)}
            </sl-select>
          </sl-card>`,
        )}
      </div>
    `;
  }
}

customElements.define('bs-expenses', BSExpenses);
