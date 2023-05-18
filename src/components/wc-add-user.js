import { LitElement, html, css } from 'lit';

export class AddUser extends LitElement {
  static get styles() {
    return css`
      form {
        max-width: 1440px;
        margin: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: row;
        margin: auto;
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
    `;
  }

  static get properties() {
    return {
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
        this.users.push(this.user);
        this.user = { name: '' };
        e.target.reset();
      },
    };
  }

  render() {
    return html`
      <form @submit="${this.handlers.addUser}">
        <sl-input
          placeholder="Payer Name"
          .value=${this.user.name}
          @input=${this.handlers.handleChange}
        ></sl-input>
        <sl-button type="submit" variant="success"
          >Add <sl-icon slot="suffix" name="plus-lg"></sl-icon
        ></sl-button>
      </form>

      <div class="payers-container">
        ${this.users.map(
          (user, index) => html` <sl-card class="card-basic" key=${index}>
            <div class="card-content">
              <p>${user.name}</p>
              <sl-icon-button
                name="trash"
                label="Trash"
                data-index=${index}
                @click=${this.handlers.removeUser}
              ></sl-icon-button>
            </div>
          </sl-card>`,
        )}
      </div>
    `;
  }
}

customElements.define('wc-add-user', AddUser);
