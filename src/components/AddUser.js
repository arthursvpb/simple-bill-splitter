import { LitElement, html, css } from 'lit';

export class AddUser extends LitElement {
  static get styles() {
    return css`
      form {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1rem;
        font-weight: 700;
        max-width: 1440px;
        height: 120px;
        margin: auto;
        background-color: var(--orange-500);
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
        <input type="text" @input=${() => {}} />
        <button>Adicionar</button>
      </form>
      <ul>
        ${this.users.map(user => html`<li>${user.name}</li>`)}
      </ul>
    `;
  }
}

customElements.define('wc-add-user', AddUser);
