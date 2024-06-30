import { cloneTemplate, ensureElement } from '../utils/utils';
import { BasePopup } from './base/base-popup';
import { IEvents } from './base/events';

export interface ISuccess {
	totalPrice: number;
}

export class Success extends BasePopup<ISuccess> implements ISuccess {
	protected orderSuccessClose: HTMLButtonElement;
	protected successDescription: HTMLElement;

	constructor(container: HTMLElement, content: HTMLElement, events: IEvents) {
		super(container, content, events, cloneTemplate('#success'));

		this.orderSuccessClose = ensureElement<HTMLButtonElement>(
			'.order-success__close',
			this.body
		);
		this.successDescription = ensureElement(
			'.order-success__description',
			this.body
		);

		this.orderSuccessClose.addEventListener('click', (evt) => {
			events.emit('click: order success');
			evt.preventDefault();
		});
	}

	set totalPrice(val: number) {
		this.successDescription.textContent = `Списано ${val} синапсов`;
	}
}
