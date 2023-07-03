import { LitElement, html } from 'lit';

import { expenseStore, userStore } from '../../store';
import { maskCurrency } from '../../utils/currency';

import { styles } from './styles';

const {
  state: { users },
} = JSON.parse(localStorage.getItem('@bs-users'));

export class BSUsers extends LitElement {
  static get properties() {
    return {
      user: Object,
      users: Array,
      expenses: Object,
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
    this.user = { name: '', id: '', bill: 0 };
    this.users = [];
    this.expenses = [];
  }

  __initHandlers() {
    this.handlers = {
      handleChange: e => {
        this.user.name = e.target.value;
      },
      removeUser: (index, user) => {
        const { removeUserFromExpense } = expenseStore.getState();
        this.users.splice(index, 1);

        removeUserFromExpense(user, this.expenses);
        this.__updateState();
      },
      addUser: e => {
        e.preventDefault();
        if (!this.user.name) return;

        this.users.push(this.user);
        this.__updateState();

        this.user = { name: '', id: `user-${this.users.length}`, bill: 0 };
        e.target.reset();
      },
    };
  }

  connectedCallback() {
    super.connectedCallback();

    this.unsubscribe = expenseStore.subscribe(({ expenses }) => {
      this.expenses = [...expenses];
      this.requestUpdate();
    });
  }

  firstUpdated() {
    super.firstUpdated();
    if (users.length) this.users = [...users];
  }

  updated(changedProps) {
    if (changedProps.has('users') || changedProps.has('expenses'))
      this.__localStorageUpdate();

    super.updated(changedProps);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.unsubscribe();
  }

  __localStorageUpdate() {
    const { persistUser } = userStore.getState();
    persistUser(this.users);
  }

  __updateState() {
    this.__updateUserIndexes();
    const { calculateBills } = expenseStore.getState();
    calculateBills(this.users, this.expenses);
    this.expenses = [...this.expenses];
  }

  __updateUserIndexes() {
    this.users = this.users.map((user, index) => ({
      ...user,
      id: `user-${index}`,
    }));
  }

  __formAddUser() {
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
    `;
  }

  __payersList() {
    return html` <div class="payers-container">
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
              >$ ${maskCurrency(user.bill)}</span
            >
          </p>
          <sl-icon-button
            class="trash-icon"
            name="trash"
            label="Trash"
            @click=${() => this.handlers.removeUser(index, `user-${index}`)}
          ></sl-icon-button>
        </sl-card>`,
      )}
    </div>`;
  }

  render() {
    return html`${this.__formAddUser()} ${this.__payersList()}`;
  }
}

customElements.define('bs-users', BSUsers);
