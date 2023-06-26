import { LitElement, html, css } from 'lit';

import { userStore, expenseStore } from '../store';
import { maskCurrency, unmaskCurrency } from '../utils/currency';

export class BSAddExpense extends LitElement {
  static get styles() {
    return css`
      form {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
      }

      .payers-container {
        margin-top: 20px;
        display: flex;
        align-items: center;
        flex-direction: column;
      }

      .card-basic {
        position: relative;
        margin-top: 20px;
        width: 250px;
      }

      .card-content {
        display: flex;
        text-align: center;
        justify-content: center;
        align-items: center;
      }

      .card-input {
        width: 180px;
      }

      .trash-icon {
        margin: 10px;
        position: absolute;
        top: 0;
        right: 0;
      }

      .hide {
        visibility: hidden;
      }

      .display-none {
        display: none;
      }

      .select-payers {
        margin-top: 20px;
      }

      .checkbox-everyone {
        margin-top: 16px;
        margin-left: 22px;
        display: flex;
        align-items: center;
      }
    `;
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

    this.expense = { name: '', price: 0 };
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
        this.expenses = [...this.expenses];
      },
      removeExpense: e => {
        this.expenses.splice(e.currentTarget.dataset.index, 1);
        this.expenses = [...this.expenses];
      },
      addExpense: e => {
        e.preventDefault();
        if (!this.expense.name) return;

        this.expenses.push(this.expense);
        this.expense = { name: '', price: 0 };
        e.target.reset();
      },
      changeChecked: e => {
        console.log('e', e);
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

  __renderUsersOptions() {
    return html`${this.users.map(
      (user, index) => html` <sl-option value="user-${index}"
        >${user.name}</sl-option
      >`,
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
              clearable
              filled
              size="small"
              max-options-visible="1"
              .value=${this.__getDefaultUsersSelected()}
            >
              ${this.__renderUsersOptions()}
            </sl-select>
          </sl-card>`,
        )}
      </div>
    `;
  }
}

customElements.define('bs-add-expense', BSAddExpense);
