import {
	cloneTemplate,
	convertSkill2Class,
	ensureElement,
} from '../utils/utils';
import { CDN_URL } from '../utils/constants';
import { IEvents } from './base/events';
import { BasePopup } from './base/base-popup';

export interface ICardPopup {
	category: string;
	title: string;
	description: string;
	price: number;
	image: string;
	id: string;
	inCart: boolean;
	cartButtonEnables: boolean;
}

export class CardPopup extends BasePopup<ICardPopup> implements ICardPopup {
	protected elementCategory: HTMLElement;
	protected elementTitle: HTMLElement;
	protected elementDescription: HTMLElement;
	protected elementPrice: HTMLElement;
	protected elementImage: HTMLImageElement;
	protected cartPutGetButton: HTMLButtonElement;
	protected itemId: string;

	protected currentClass: string;

	constructor(container: HTMLElement, content: HTMLElement, events: IEvents) {
		super(container, content, events, cloneTemplate('#card-preview'));

		this.elementCategory = ensureElement('.card__category', this.body);
		this.elementTitle = ensureElement('.card__title', this.body);
		this.elementDescription = ensureElement('.card__text', this.body);
		this.elementPrice = ensureElement('.card__price', this.body);
		this.elementImage = ensureElement<HTMLImageElement>(
			'.card__image',
			this.body
		);
		this.cartPutGetButton = ensureElement<HTMLButtonElement>(
			'.card__button',
			this.body
		);
		this.cartPutGetButton.addEventListener('click', () =>
			events.emit('put-get-item', { itemId: this.itemId })
		);

		this.currentClass = 'card__category_other';
	}

	set category(val: string) {
		this.setText(this.elementCategory,val);
		//this.elementCategory.textContent = val;

		this.toggleClass(this.elementCategory, this.currentClass, false);

		this.currentClass = convertSkill2Class(val);

		this.toggleClass(this.elementCategory, this.currentClass, true);
	}

	set title(val: string) {
		this.setText(this.elementTitle,val)
		//this.elementTitle.textContent = val;
	}

	set description(val: string) {
		this.setText(this.elementDescription,val);
		//this.elementDescription.textContent = val;
	}

	set price(val: number) {
		this.setText(this.elementPrice, val === null ? 'бесценно' : String(val) + ' синапсов')
		//this.elementPrice.textContent =
	}

	set image(val: string) {
		this.elementImage.src = CDN_URL + val;
		this.elementImage.alt = 'картинка товара';
	}

	set id(val: string) {
		this.itemId = val;
	}

	set cartButtonEnables(val: boolean) {
		this.setDisabled(this.cartPutGetButton, !val);
	}

	get id() {
		return this.itemId;
	}

	set inCart(val: boolean) {
		this.setText(this.cartPutGetButton,val ? 'Из корзины' : 'В корзину')
		//this.cartPutGetButton.textContent = ;
	}
}
