import { LitElement, html, css } from 'lit';

import { userStore } from '../store';

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
    `;
  }

  static get properties() {
    return {
      store: Object,
      user: Object,
      users: Array,
    };
  }

  constructor() {
    super();

    this.__initState();
    this.__initHandlers();
  }

  __initState() {
    this.store = userStore;

    this.user = { name: '' };
    this.users = [];
  }

  __initHandlers() {
    this.handlers = {
      handleChange: e => {
        this.user.name = e.target.value;
      },
      removeUser: e => {
        this.users.splice(e.currentTarget.dataset.index, 1);
        this.users = [...this.users];
      },
      addUser: e => {
        e.preventDefault();
        if (!this.user.name) return;

        this.users.push(this.user);
        this.user = { name: '' };
        e.target.reset();
      },
    };
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
    if (changedProps.has('users') || changedProps.has('user'))
      this.__localStorageUpdate();

    super.updated(changedProps);
  }

  render() {
    return html`
      <form @submit="${this.handlers.addUser}">
        <sl-input
          required
          maxlength="15"
          placeholder="Name"
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
