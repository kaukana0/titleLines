/*
*/

const template = document.createElement('template');

template.innerHTML = `
<div id="main" translate="title"></div>
<div id="sub" translate="subtitle"></div>
`

template.innerHTML += `<style>
#main {
	margin-top: 10px;
	color: #044AA3;
	font-weight: bold;
	font-size: 1.2rem;
}

#sub {
	color: #044AA3;
	font-weight: normal;
	font-size: 1rem;
}
</style>`


class MyElement extends HTMLElement {

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

window.customElements.define('title-lines', MyElement)
