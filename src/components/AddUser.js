import { LitElement, html, css } from 'lit';

export class AddUser extends LitElement {
  static properties = {
    user: { state: true, type: String },
    users: { state: true, type: Array },
  };

  constructor() {
    super();
    this.user = '';
    this.users = [];
  }

  _handleAddUser(event) {
    event.preventDefault();

    this.users.push({
      name: this.user,
    });

    this.user = '';
    event.target.reset();
  }

  render() {
    return html`
      <form @submit="${this._handleAddUser}">
        <input type="text" @input=${event => (this.user = event.target.value)} />
        <button>Adicionar</button>
      </form>
      <ul>
        ${this.users.map(user => html`<li>${user.name}</li>`)}
      </ul>
    `;
  }

  static styles = css`
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

customElements.define('add-user', AddUser);
