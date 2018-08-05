import FeedItem from './feed-item.js';
customElements.define('feed-item', FeedItem);

async function parseFeed(feedEl) {
	[...feedEl.children].forEach(child => child.remove());
	const resp = await fetch(feedEl.url, {
		mode: 'cors',
	});
	const xml = await resp.text();
	const parser = new DOMParser();
	const template = document.getElementById('feed-entry-template').content.cloneNode(true);
	const doc = parser.parseFromString(xml, 'application/xml');
	const title = doc.querySelector('channel > title').textContent;
	const link = doc.querySelector('channel > link').textContent;
	template.querySelector('[href]').href = link;
	template.querySelector('[data-field="title"]').textContent = title;
	template.querySelector('[data-action="unsubscribe"]').addEventListener('click', () => feedEl.list.remove(feedEl.url));
	const items = [...doc.querySelectorAll('item')].map(item => {
		const title = item.querySelector('title').textContent;
		const url = item.querySelector('link').textContent;
		const published = new Date(item.querySelector('pubDate').textContent);
		return new FeedItem({title, url, published});
	});

	template.querySelector('.feed-items').append(...items);

	feedEl.append(template);
}

export default class FeedEntry extends HTMLElement {
	constructor() {
		super();
		if (this.hasAttribute('url')) {
			parseFeed(this);
		}
	}

	get list() {
		return this.closest('feed-list');
	}

	set url(url) {
		this.setAttribute('url', url);
		parseFeed(this);
	}

	get url() {
		return new URL(this.getAttribute('url'));
	}
}
