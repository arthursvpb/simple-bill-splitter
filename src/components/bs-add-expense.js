import { LitElement, html, css } from 'lit';

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
        margin-top: 20px;
        width: 320px;
      }

      .card-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .card-input {
        margin: 0;
        max-width: 200px;
        cursor: text;
      }

      .hide {
        display: none;
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
        const { value } = e.target;
        const expense = this.expenses[e.target.dataset.index];
        expense.price = Number(value);

        this.expenses = [...this.expenses];
      },
      removeExpense: e => {
        this.expenses.splice(e.currentTarget.dataset.index, 1);
        this.expenses = [...this.expenses];
      },
      addExpense: e => {
        e.preventDefault();
        this.expenses.push(this.expense);
        this.expense = { name: '', price: 0 };
        e.target.reset();
      },
    };
  }

  render() {
    console.log('this.expenses', this.expenses);

    return html`
      <form @submit="${this.handlers.addExpense}">
        <sl-input
          required
          placeholder="Expense"
          .value=${this.expense.name}
          @input=${this.handlers.handleChange}
        ></sl-input>
        <sl-button type="submit" variant="success"
          >Add <sl-icon slot="suffix" name="plus-lg"></sl-icon
        ></sl-button>
      </form>

      <div class="payers-container">
        ${this.expenses.map(
          (expense, index) => html` <sl-card class="card-basic" key=${index}>
            <div class="card-content">
              <div>
                <p>${expense.name}</p>
                <sl-input
                  class="card-input"
                  type="number"
                  data-index=${index}
                  @input="${this.handlers.handleInput}"
                >
                  <sl-icon name="currency-dollar" slot="prefix"></sl-icon>
                  <sl-format-number
                    slot="prefix"
                    class="${!expense.price && 'hide'}"
                    value="${expense.price}"
                  ></sl-format-number>
                </sl-input>
              </div>
              <sl-icon-button
                name="trash"
                label="Trash"
                data-index=${index}
                @click=${this.handlers.removeExpense}
              ></sl-icon-button>
            </div>
          </sl-card>`,
        )}
      </div>
    `;
  }
}

customElements.define('bs-add-expense', BSAddExpense);
