import { PaymentTypeEnum } from '../types';
import { cloneTemplate, ensureElement } from '../utils/utils';
import { BasePopup } from './base/base-popup';
import { IEvents } from './base/events';

export interface IPersonalInfoFirst {
	paymentType: PaymentTypeEnum;
	deliveryAddress: string;
	enableButton:boolean;
}

export class PersonalInfoFirst
	extends BasePopup<IPersonalInfoFirst>
	implements IPersonalInfoFirst
{
	protected cardButton: HTMLButtonElement;
	protected cashButton: HTMLButtonElement;
	protected addressElement: HTMLElement;
	protected orderButton: HTMLButtonElement;

	constructor(container: HTMLElement, content: HTMLElement, events: IEvents) {
		super(container, content, events, cloneTemplate('#order'));
		this.events = events;
		this.content = content;

		this.cardButton = ensureElement<HTMLButtonElement>(
			'.button[name="card"]',
			this.body
		);
		this.cashButton = ensureElement<HTMLButtonElement>(
			'.button[name="cash"]',
			this.body
		);
		this.orderButton = ensureElement<HTMLButtonElement>(
			'.order__button',
			this.body
		);
		this.addressElement = ensureElement(
			'.form__input[name="address"]',
			this.body
		);

		this.cardButton.addEventListener('click', () =>
			events.emit('click: card payment')
		);
		this.cashButton.addEventListener('click', () =>
			events.emit('click: cash payment')
		);
		this.addressElement.addEventListener('input', (evt) => {
			const target = evt.target as HTMLInputElement;
			events.emit('address_input:change', {
				text: target.value,
			});
		});
		this.orderButton.addEventListener("click",(evt)=>{
    events.emit('click: personal info first button');
		evt.preventDefault();
		}
		);
	}

	set paymentType(val: PaymentTypeEnum) {
		this.toggleClass(
			this.cardButton,
			'button_alt-active',
			val === PaymentTypeEnum.ONLINE
		);
		this.toggleClass(
			this.cashButton,
			'button_alt-active',
			val === PaymentTypeEnum.ON_PLACE
		);
	}

	set deliveryAddress(val: string) {}

	set enableButton(val:boolean) {
		this.setDisabled(this.orderButton, !val);
	}
}
