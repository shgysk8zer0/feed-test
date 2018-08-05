export default class FeedForm extends HTMLFormElement {
	constructor() {
		super();
		this.addEventListener('submit', async event => {
			event.preventDefault();
			const body = new FormData(event.target);

			try {
				await document.querySelector('feed-list').add(body.get('url'));
				event.target.reset();
				event.target.closest('dialog[open]').close();
			} catch (error) {
				/* eslint no-console: 0 */
				console.error(error);
			}
		});
	}
}
