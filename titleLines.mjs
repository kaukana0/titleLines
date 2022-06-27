/*
*/

const template = document.createElement('template');

template.innerHTML = `
<h1 id="main" translate="title"></h1>
<h2 id="sub" translate="subtitle"></h2>
`

template.innerHTML += `<style>
#main {
	color: #044AA3;
	font-weight: bold;
	font-size: 2rem;
    text-align:center;
	margin: 0px;
	margin-bottom: 0.3rem;
}

#sub {
	color: #044AA3;
	font-weight: normal;
	font-size: 1.4rem;
    text-align:center;
	margin: 0px;
}

</style>`


class Element extends HTMLElement {

	#$(elementId) {
		return this.shadowRoot.getElementById(elementId)
	}

	constructor() {
		super()
		this.attachShadow({ mode: 'open' })
		this.shadowRoot.appendChild(template.content.cloneNode(true))
	}

	static get observedAttributes() {
		return ['maintext', 'subtext'];
	}

	attributeChangedCallback(name, oldVal, newVal) {
		if (oldVal === newVal) { return }
		if (name === 'maintext') { this.mainText = newVal }
		if (name === 'subtext') { this.subText = newVal }
	  }
	  
	connectedCallback() {
		this.mainText = this.getAttribute('mainText');
		this.subText = this.getAttribute('subText');
	}
		
	set mainText(v) { this.#$("main").innerText = v; }
	set subText(v) { this.#$("sub").innerText = v; }

}

window.customElements.define('title-lines', Element)
