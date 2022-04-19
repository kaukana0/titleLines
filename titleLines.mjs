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

	#_shadow

	#$(elementId) {
		return this.#_shadow.getElementById(elementId)
	}

	constructor() {
		super()
		this.#_shadow = this.attachShadow({ mode: 'open' })
		this.#_shadow.appendChild(template.content.cloneNode(true))
	}

	connectedCallback() {
        this.#$("main").innerText = this.getAttribute('mainText');
        this.#$("sub").innerText = this.getAttribute('subText');
	}

	static get observedAttributes() {
		return ['mainText', 'subText'];
	}
}

window.customElements.define('title-lines', MyElement)
