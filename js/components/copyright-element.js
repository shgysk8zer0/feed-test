export default class CopyrightElement extends HTMLElement {
	constructor() {
		super();
		const date = new Date();
		const time = document.createElement('time');
		const template = document.getElementById('copyright-template').content.cloneNode(true);
		time.textContent = date.getFullYear();
		time.dateTime = date.toISOString();
		time.slot = 'year';
		this.append(time);
		this.attachShadow({mode: 'open'}).append(template);
	}
}
