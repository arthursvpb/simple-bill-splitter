import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';

@customElement('lit-counter')
export class LitCounter extends LitElement {
    static styles = css`
        p {
            color: blue;
        }
    `;

    @state() value = 1;

    handleClick() {
        this.value += 1;
    }

    render() {
        return html`
            <p>${this.value}</p>
            <button @click="${this.handleClick}">Add</button>
        `;
    }
}
