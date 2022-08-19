import { LitElement, html, css } from 'lit';

export class AddUser extends LitElement {
    static styles = css`
        div {
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
    `;

    render() {
        return html`<div>
            <form @submit={}>
                <input type="text" />
                <button>Adicionar</button>
            </form>
        </div>`;
    }
}

customElements.define('add-user', AddUser);
