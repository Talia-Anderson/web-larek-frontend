import { IEvents } from './base/events';
import { IPersonalInfoModel, PaymentTypeEnum } from '../types';

export class PersonalInfoModel implements IPersonalInfoModel {
	protected _paymentType: PaymentTypeEnum;
	protected _address: string;
	protected _email: string;
	protected _phone: string;
	protected events: IEvents;

	constructor(events: IEvents) {
		this.events = events;
	}

	set paymentType(val: PaymentTypeEnum) {
		this._paymentType = val;
		this.events.emit('items: changed');
	}
	set address(val: string) {
		this._address = val;
		this.events.emit('items: changed');
	}
	set email(val: string) {
		this._email = val;
		this.events.emit('items: changed');
	}
	set phone(val: string) {
		this._phone = val;
		this.events.emit('items: changed');
	}
	get paymentType() {
		return this._paymentType;
	}

	get address() {
		return this._address;
	}

	get email() {
		return this._email;
	}
	get phone() {
		return this._phone;
	}
}
