import { LitElement } from "lit";

class WordCount extends LitElement {
    constructor() {
        super(); // call for HTMLElement constructor
        const style = this.styles();

        this.build(style);
    }

    build(style) {
        // creates a specific, separated and encapsulated DOM to a component
        const shadow = this.attachShadow({ mode: 'open' }); // mode set to closed = u can't access .shadowRoot property

        const root = document.createElement('div'); // create root element for shadow dom

        const text = document.createElement('p'); // create a text element for using inside root
        const word = this.getAttribute('text'); // gets attribute declared as "text"

        text.textContent = `${word}: ${word.length} letters`;

        text.setAttribute('class', 'textClass');

        root.appendChild(text); // appends 'p' inside 'div'

        shadow.appendChild(root); // append root and all the elements inside root
        shadow.appendChild(style); // append styling inside shadow dom
    }

    styles() {
        // component-only style
        const style = document.createElement('style');
        style.textContent = `
            .textClass {
              color: ${this.getAttribute('color') || 'white'};
            }
          `;

        return style;
    }
}

// hiphen is required for component name
customElements.define('word-count', WordCount);
