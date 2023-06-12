import { LitElement, html, css } from 'lit';

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

      .currency-dolar {
        color: var(--sl-color-success-950);
      }

      .save-expense {
        transition: 0.1s;
        cursor: pointer;
      }

      .save-expense:hover {
        color: var(--sl-color-success-700);
      }

      .hide {
        visibility: hidden;
      }
    `;
  }

  static get properties() {
    return {
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
    };
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
                >
                  <sl-icon
                    class="currency-dolar"
                    name="currency-dollar"
                    slot="prefix"
                  ></sl-icon>
                  <sl-icon
                    class="save-expense ${!expense.price && 'hide'}"
                    name="check-circle"
                    slot="suffix"
                  ></sl-icon>
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
          </sl-card>`,
        )}
      </div>
    `;
  }
}

customElements.define('bs-add-expense', BSAddExpense);
