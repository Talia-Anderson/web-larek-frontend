import { cloneTemplate, ensureElement } from '../utils/utils';
import { BasePopup } from './base/base-popup';
import { IEvents } from './base/events';

export interface ICart {
	cartItems: HTMLElement[];
	cartTotal: number;
	enableBtn: boolean;
}

export class Cart extends BasePopup<ICart> implements ICart {
	protected cartList: HTMLElement;
	protected cartButton: HTMLButtonElement;
	protected cartItemsNumberElement: HTMLElement;

	constructor(container: HTMLElement, content: HTMLElement, events: IEvents) {
		const body = cloneTemplate('#basket');

		super(container, content, events, body);

		this.cartList = ensureElement('.basket__list', this.body);
		this.cartButton = ensureElement<HTMLButtonElement>(
			'.basket__button',
			this.body
		);
		this.cartItemsNumberElement = ensureElement('.basket__price', this.body);

		this.cartButton.addEventListener('click', () =>
			events.emit('click: basket_button')
		);
		this.events = events;
	}

	set cartItems(items: HTMLElement[]) {
		this.cartList.replaceChildren(...items);
	}

	set cartTotal(val: number) {
		this.setText(this.cartItemsNumberElement, String(val) + ' синапсов')
		//this.cartItemsNumberElement.textContent = ;
	}

	set enableBtn(val:boolean) {
		this.setDisabled(this.cartButton, !val);
	}
}
