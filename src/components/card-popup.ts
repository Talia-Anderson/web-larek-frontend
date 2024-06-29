import { cloneTemplate, convertSkill2Class, ensureElement } from '../utils/utils';
import { CDN_URL } from '../utils/constants';
import { IEvents } from './base/events';
import { BasePopup } from './base/base-popup';

export interface ICardPopup {
	category: string;
	title: string;
	description: string;
	price: number;
	image: string;
	id:string;
	inCart: boolean;
	CartButtonEnables: boolean;
}

export class CardPopup extends BasePopup<ICardPopup> implements ICardPopup {
	protected elementCategory: HTMLElement;
	protected elementTitle: HTMLElement;
	protected elementDescription: HTMLElement;
	protected elementPrice: HTMLElement;
	protected elementImage: HTMLImageElement;
	protected CartPutGetButton: HTMLButtonElement;
	protected itemId:string;

	protected currentClass: string;

	constructor(container: HTMLElement, content: HTMLElement, events: IEvents) {
		super(container, content, events, cloneTemplate('#card-preview'));
		

    this.elementCategory = ensureElement('.card__category', this.body);
		this.elementTitle = ensureElement('.card__title', this.body);
		this.elementDescription = ensureElement(
			'.card__text',
			this.body
		);
		this.elementPrice = ensureElement('.card__price', this.body);
		this.elementImage = ensureElement<HTMLImageElement>(
			'.card__image',
			this.body
		);
		this.CartPutGetButton = ensureElement<HTMLButtonElement>(
			'.card__button',
			this.body
		);
		this.CartPutGetButton.addEventListener('click',
		()=>events.emit('put-get-item',{itemId: this.itemId}));

		this.currentClass = 'card__category_other';
	}

	set category(val: string) {
		this.elementCategory.textContent = val;

		this.toggleClass(this.elementCategory, this.currentClass, false);

		this.currentClass = convertSkill2Class(val);			

		this.toggleClass(this.elementCategory, this.currentClass, true);
	}

	set title(val: string) {
		this.elementTitle.textContent = val;
	}

	set description(val: string) {
		this.elementDescription.textContent = val;
	}

	set price(val: number) {
		this.elementPrice.textContent = val === null ? "бесценно" : String(val) + ' синапсов';
	}

	set image(val: string) {
		this.elementImage.src = CDN_URL + val;
		this.elementImage.alt = 'картинка товара';
	}

	set id(val:string){
		this.itemId = val;
	}

	set CartButtonEnables(val: boolean) {
		this.setDisabled(this.CartPutGetButton, !val);
	}

	get id(){
		return this.itemId;
	}

	set inCart(val: boolean) {
		this.CartPutGetButton.textContent = val ? "Из корзины" : "В корзину";
	}
}
