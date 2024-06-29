export enum PaymentTypeEnum {
	ONLINE = 0,
	ON_PLACE = 1,
}

export interface IPersonalInfoModel {
  paymentType: PaymentTypeEnum;
	address: string;
	email: string;
	phone: string; 
}

export interface ICardID {
	card_id: string;
}

export interface IPutGetEvent {
	itemId: string;
}

export interface IEventText {
	text: string;
}

//for selling item 

export interface Sell {
  id: string;
  category: string;
  description: string;
  title: string;
  price: number;
  image: string;
}

export interface SellFromAPI {
  total: number;
  items: Sell[];
}

export interface SellList extends Sell {
  inCart: boolean
}

export interface IOrder {
  payment: string;
  address: string;
  email: string;
  phone: string;
  total: number;
  items: string[];
}