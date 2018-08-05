import FeedEntry from './feed-entry.js';
customElements.define('feed-entry', FeedEntry);
export default class FeedList extends HTMLElement {
	get list() {
		return [...this.querySelectorAll('feed-entry')];
	}

	async add(...feeds) {
		feeds.forEach(feed => {
			const entry = new FeedEntry();
			entry.url = feed;
			this.append(entry);
		});
	}

	remove(url) {
		this.querySelectorAll(`feed-entry[url="${url}"]`).forEach(entry => entry.remove());
	}
}
