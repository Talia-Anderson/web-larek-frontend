import { cloneTemplate, ensureElement } from '../utils/utils';
import { BasePopup } from './base/base-popup';
import { Component } from './base/components';
import { IEvents } from './base/events';

export interface IPersonalInfoSecond {
	email: string;
	phone: string;
	enableButton: boolean;
}

export class PersonalInfoSecond
	extends BasePopup<IPersonalInfoSecond>
	implements IPersonalInfoSecond
{
	protected emailElement: HTMLInputElement;
	protected phoneElement: HTMLInputElement;
	protected orderButton: HTMLButtonElement;

	constructor(container: HTMLElement, content: HTMLElement, events: IEvents) {
		super(container, content, events, cloneTemplate('#contacts'));

		this.emailElement = ensureElement<HTMLInputElement>(
			'.form__input[name="email"]',
			this.body
		);
		this.phoneElement = ensureElement<HTMLInputElement>(
			'.form__input[name="phone"]',
			this.body
		);
		this.orderButton = ensureElement<HTMLButtonElement>('.button', this.body);
		this.emailElement.addEventListener('input', (evt) => {
			const target = evt.target as HTMLInputElement;
			events.emit('email_input:change', {
				text: target.value,
			});
		});
		this.phoneElement.addEventListener('input', (evt) => {
			const target = evt.target as HTMLInputElement;
			events.emit('phone_input:change', {
				text: target.value,
			});
		});
		this.orderButton.addEventListener('click', (evt) => {
			evt.preventDefault();
			this.events.emit('click: personalInfoSecondNext');
		});
	}

	set email(val: string) {
		this.emailElement.value = val;
	}

	set phone(val: string) {
		this.phoneElement.value = val;
	}

	set enableButton(val: boolean) {
		this.setDisabled(this.orderButton, !val);
	}
}
