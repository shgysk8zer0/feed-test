export default class FeedItem extends HTMLElement {
	constructor({title, url, published} = {}) {
		super();
		const template = document.getElementById('feed-item-template').content.cloneNode(true);
		const link = document.createElement('a');
		const time = document.createElement('time');
		link.href = url;
		link.textContent = title;
		link.slot = 'title';
		time.textContent = published.toLocaleString();
		time.dateTime = published.toISOString();
		time.slot = 'published';
		this.append(link, time);
		this.attachShadow({mode: 'open'}).append(template);
	}
}
