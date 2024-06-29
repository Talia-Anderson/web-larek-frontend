import { cloneTemplate, ensureElement } from '../utils/utils';
import { BasePopup } from './base/base-popup';
import { IEvents } from './base/events';


export interface ICart {
	CartItems: HTMLElement[];
	CartTotal: number;
}

export class Cart extends BasePopup<ICart> implements ICart {	
	protected CartList: HTMLElement;
	protected CartButton: HTMLButtonElement;
	protected cartItemsNumberElement: HTMLElement;	

	constructor(container: HTMLElement, content: HTMLElement, events: IEvents) {
		const body = cloneTemplate('#basket');

		super(container, content, events, body);


		this.CartList = ensureElement('.basket__list', this.body);
		this.CartButton = ensureElement<HTMLButtonElement>(
			'.basket__button',
			this.body
		);
		this.cartItemsNumberElement = ensureElement(
			'.basket__price',
			this.body
		);

		this.CartButton.addEventListener('click', () =>
			events.emit('click: basket_button')
		);
		this.events = events;
	}

	set CartItems(items: HTMLElement[]) {
		this.CartList.replaceChildren(...items);
	}

	set CartTotal(val: number) {
		this.cartItemsNumberElement.textContent = String(val) + " синапсов";
	}
}
