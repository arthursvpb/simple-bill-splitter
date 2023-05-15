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

      ul {
        text-align: center;
      }
      li {
        list-style-type: none;
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
          placeholder="Name"
          .value=${this.user.name}
          @input=${this.handlers.handleChange}
        ></sl-input>
        <sl-button type="submit" variant="success"
          >Add <sl-icon slot="suffix" name="plus-lg"></sl-icon
        ></sl-button>
      </form>

      <ul>
        ${this.users.map(user => html`<li>${user.name}</li>`)}
      </ul>
    `;
  }
}

customElements.define('wc-add-user', AddUser);
