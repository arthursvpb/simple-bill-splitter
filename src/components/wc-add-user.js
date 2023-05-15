import { LitElement, html, css } from 'lit';

export class AddUser extends LitElement {
  static get styles() {
    return css`
      form {
        max-width: 1440px;
        margin: auto;
      }

      bx-form-item {
        display: flex;
        align-items: center;
        flex-direction: row;
        max-width: 720px;
        gap: 1rem;
        margin: auto;
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
      user: String,
      users: Array,
    };
  }

  constructor() {
    super();

    this.user = '';
    this.users = [];
  }

  __handleAddUser(event) {
    event.preventDefault();

    this.users.push({ name: this.user });

    this.user = '';
    event.target.reset();
  }

  render() {
    return html`
      <form @submit="${this.__handleAddUser}">
        <bx-form-item>
          <bx-input size="sm">
            <span slot="label-text">New user</span>
          </bx-input>
          <bx-btn> Add </bx-btn>
        </bx-form-item>
      </form>

      <ul>
        ${this.users.map(user => html`<li>${user.name}</li>`)}
      </ul>
    `;
  }
}

customElements.define('wc-add-user', AddUser);
