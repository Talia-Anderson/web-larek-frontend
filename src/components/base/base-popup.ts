import { ensureElement } from '../../utils/utils';
import { Component } from '../base/components';
import { IEvents } from '../base/events';

export class BasePopup<T> extends Component<T> {
	protected content: HTMLElement;
	protected events: IEvents;
	protected body: HTMLElement;

	constructor(
		container: HTMLElement,
		content: HTMLElement,
		events: IEvents,
		body: HTMLElement
	) {
		super(container);

		this.body = body;
		this.content = content;
		this.events = events;

		let closeButton = ensureElement('.modal__close', this.container);
		closeButton.addEventListener('click', () => {
			this.show(false);
		});

		container.addEventListener('click', (evt) => {
			if (evt.target === this.container) {
				this.show(false);
			}
		});
	}

	show(view: boolean) {
		if (view) {
			this.content.replaceChildren(this.body);
			this.events.emit('modal:open');
		} else {
			this.events.emit('modal:close');
		}
		this.toggleClass(this.container, 'modal_active', view);
	}
}
