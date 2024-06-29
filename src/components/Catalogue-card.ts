import { CDN_URL } from '../utils/constants';
import { convertSkill2Class, ensureElement } from '../utils/utils';
import { Component } from './base/components';
import { IEvents } from './base/events';

export interface ICatalogueCard {
	category: string;
	title: string;
	price: number;
	image: string;
}

export class CatalogueCard
	extends Component<ICatalogueCard>
	implements ICatalogueCard
{
	protected elementCategory: HTMLElement;
	protected elementTitle: HTMLElement;
	protected elementPrice: HTMLElement;
	protected elementImage: HTMLImageElement;

	protected currentClass: string;

	constructor(container: HTMLElement, events: IEvents, id: string) {
		super(container);
		this.elementCategory = ensureElement('.card__category', this.container);
		this.elementTitle = ensureElement('.card__title', this.container);
		this.elementPrice = ensureElement('.card__price', this.container);
		this.elementImage = ensureElement<HTMLImageElement>(
			'.card__image',
			this.container
		);

		this.container.addEventListener('click', () => {
			events.emit('click: on_Catalogue_card', {card_id: id});
		});

		this.currentClass = 'card__category_soft';
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
	set price(val: number) {
		this.elementPrice.textContent = val === null ? "бесценно" : String(val) + ' синапсов';
	}
	set image(val: string) {
		this.elementImage.src = CDN_URL + val;
		this.elementImage.alt = 'картинка товара';
	}
}
