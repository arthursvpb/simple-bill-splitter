import { LitElement, html, css } from 'lit';

import { expenseStore, userStore } from '../store';
import { maskCurrency } from '../utils/currency';

export class BSAddUser extends LitElement {
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
        width: 265px;
      }

      .card-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .avatar-group {
        display: flex;
        gap: 20px;
      }

      .trash-icon {
        margin: 10px;
        position: absolute;
        top: 0;
        right: 0;
      }

      .needs-to-pay {
        color: var(--sl-color-green-700);
        font-weight: bold;
      }
    `;
  }

  static get properties() {
    return {
      store: Object,
      user: Object,
      users: Array,
      expenses: Object,
    };
  }

  constructor() {
    super();

    this.__initState();
    this.__initHandlers();
  }

  __initState() {
    this.store = userStore;

    this.expenses = [];
    this.users = [];

    this.user = { name: '', id: '', bill: 0 };
  }

  __initHandlers() {
    this.handlers = {
      handleChange: e => {
        this.user.name = e.target.value;
      },
      removeUser: e => {
        this.users.splice(e.currentTarget.dataset.index, 1);
        this.__updateUserIndexes();
        expenseStore.getState().calculateBills(this.users, this.expenses);
      },
      addUser: e => {
        e.preventDefault();
        if (!this.user.name) return;

        this.users.push(this.user);
        this.__updateUserIndexes();
        expenseStore.getState().calculateBills(this.users, this.expenses);

        this.user = { name: '', id: `user-${this.users.length}`, bill: 0 };
        e.target.reset();
      },
    };
  }

  __updateUserIndexes() {
    this.users = this.users.map((user, index) => ({
      ...user,
      id: `user-${index}`,
    }));
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

  __localStorageUpdate() {
    this.store.getState().persistUser(this.users);
  }

  firstUpdated() {
    super.firstUpdated();

    const {
      state: { users },
    } = JSON.parse(localStorage.getItem('@bs-users'));

    if (users.length) this.users = [...users];
  }

  updated(changedProps) {
    if (changedProps.has('users') || changedProps.has('expenses')) {
      this.__localStorageUpdate();
    }

    super.updated(changedProps);
  }

  render() {
    return html`
      <form @submit="${this.handlers.addUser}">
        <sl-input
          required
          maxlength="15"
          placeholder="Payer"
          .value=${this.user.name}
          @input=${this.handlers.handleChange}
        ></sl-input>
        <sl-button type="submit" variant="primary"
          ><sl-icon slot="suffix" name="plus-lg"></sl-icon
        ></sl-button>
      </form>

      <div class="payers-container">
        ${this.users.map(
          (user, index) => html` <sl-card class="card-basic" key=${index}>
            <div class="card-content">
              <div class="avatar-group">
                <sl-avatar
                  initials=${user.name.substring(0, 2).toUpperCase()}
                ></sl-avatar>
                <p>${user.name}</p>
              </div>
            </div>
            <p>
              Needs to pay:
              <span class=${user.bill && 'needs-to-pay'}
                >$ ${Number(user.bill).toFixed(2)}</span
              >
            </p>
            <sl-icon-button
              class="trash-icon"
              name="trash"
              label="Trash"
              data-index=${index}
              @click=${this.handlers.removeUser}
            ></sl-icon-button>
          </sl-card>`,
        )}
      </div>
    `;
  }
}

customElements.define('bs-add-user', BSAddUser);
