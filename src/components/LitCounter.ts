import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

@customElement('lit-counter')
class LitCounter extends LitElement {
    @state() value = 1;

    handleClick() {
        this.value += 1;
    }

    render() {
        return html`
            ${this.value}
            <button @click="${this.handleClick}">Add</button>
        `;
    }
}
