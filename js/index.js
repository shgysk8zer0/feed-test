import './std-js/shims.js';
import './std-js/deprefixer.js';
import {$, ready, registerServiceWorker} from './std-js/functions.js';
import FeedList from './components/feed-list.js';
import FeedForm from './components/feed-form.js';
import CopyrightElement from './components/copyright-element.js';

customElements.define('feed-list', FeedList);
customElements.define('copyright-element', CopyrightElement);
customElements.define('feed-form', FeedForm, {extends: 'form'});

ready().then(async () => {
	document.documentElement.classList.replace('no-js', 'js');

	if (document.documentElement.dataset.hasOwnProperty('serviceWorker')) {
		registerServiceWorker(document.documentElement.dataset.serviceWorker);
	}

	$('[data-show-modal]').click(event => $(event.target.dataset.showModal).showModal());
	$('[data-close]').click(event => $(event.target.dataset.close).close());
	$('[data-remove]').click(event => $(event.target.dataset.remove).remove());
});
