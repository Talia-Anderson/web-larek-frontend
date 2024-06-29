//простите, что так долго и поздно, у меня сессия была(
// использую для обозначения корзины слово Cart, 
// которое отличается от разметки т.к слово Basket
// имеет немного другой смысл, извините

import './scss/styles.scss';

import { SellAPI } from './components/sell-item-api';
import { ListModel } from './components/List-model';
import { IOrder, PaymentTypeEnum, ICardID, IPutGetEvent, IEventText } from './types/index';
import { API_URL } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Catalogue } from './components/Catalogue';
import { CatalogueCard } from './components/Catalogue-card';
import { EventEmitter } from './components/base/events';
import { Cart } from './components/Cart-popup';
import { CardPopup } from './components/card-popup';
import { CartButton } from './components/Cart-button';
import { CartCard } from './components/Cart-card';
import { PersonalInfoFirst } from './components/personal-info-first';
import { PersonalInfoSecond } from './components/personal-info-second';
import { PersonalInfoModel } from './components/personal-info-model';
import { Success } from './components/success';

//переменные

const events = new EventEmitter();
const personalInfoModel = new PersonalInfoModel(events);

const apiFetch = new SellAPI(API_URL);
const bm = new ListModel(events);
const catalogue = new Catalogue(ensureElement('.gallery'));

apiFetch.getSell().then((response) => {
	bm.setItems(response.items);
});

//ивенты и все от них зависящее

events.on('items: changed', () => {
	catalogue.CatalogueItems = bm.getCatalogItems().map((item) => {
		const card = new CatalogueCard(
			cloneTemplate('#card-catalog'),
			events,
			item.id
		);
		return card.render(item);
	});
});

const modalContainerElement = ensureElement('#modal-container');
const modalContentElement = ensureElement(
	'.modal__content',
	modalContainerElement
);

const cart = new Cart(modalContainerElement, modalContentElement, events);

const CartElement = ensureElement('.header__basket');
CartElement.addEventListener('click', () => {
	cart.show(true);
});

events.on('items: changed', () => {
	let position = 1;
	cart.CartItems = bm.getCartItems().map((element) => {
		const htmlElement = new CartCard(
			cloneTemplate('#card-basket'),
			events,
			element.id
		);
		htmlElement.listPosition = position;
		position = position + 1;
		return htmlElement.render(element);
	});
});

events.on('items: changed', () => {
	cart.CartTotal = bm.getTotalSum();
});
const cardPopup = new CardPopup(
	modalContainerElement,
	modalContentElement,
	events
);

events.on('click: on_Catalogue_card', (id: ICardID) => {
	cardPopup.id = id.card_id;
	const itemToSell = bm.getSell(id.card_id);
	cardPopup.CartButtonEnables = itemToSell.price !== null;
	cardPopup.render(itemToSell);
	cardPopup.inCart = bm.inCart(cardPopup.id);
	cardPopup.show(true);
});


events.on('put-get-item', (evt: IPutGetEvent) =>
	bm.toggleCartState(evt.itemId)
);

events.on('items: changed', () => {
	if (cardPopup.id) {
		cardPopup.inCart = bm.inCart(cardPopup.id);
	}
});

const cartButton = new CartButton(CartElement);
events.on('items: changed', () => {
	cartButton.CartCounter = bm.cartItemsNumber();
});

events.on('click: delete__card', (item: ICardID) => {
	bm.toggleCartState(item.card_id);
});

const paymentType = new PersonalInfoFirst(
	modalContainerElement,
	modalContentElement,
	events
);
events.on('click: basket_button', () => {
	paymentType.show(true);
});

const personalInfo = new PersonalInfoSecond(
	modalContainerElement,
	modalContentElement,
	events
);
events.on('click: personal_info_first_next', () => {
	paymentType.show(true);
});
console.log('personalInfo', personalInfo);

events.on('click: card payment', () => {
	Object.assign(personalInfoModel, { paymentType: PaymentTypeEnum.ONLINE });
});

events.on('click: cash payment', () => {
	Object.assign(personalInfoModel, {
		paymentType: PaymentTypeEnum.ON_PLACE,
	});
});

events.on('items: changed', () => {
	paymentType.render({ paymentType: personalInfoModel.paymentType });
});

const windowWrapper = ensureElement('.page__wrapper');

events.on('modal:open', () => {
	windowWrapper.classList.add('page__wrapper_locked');
});

events.on('modal:close', () => {
	windowWrapper.classList.remove('page__wrapper_locked');
});


events.on('address_input:change', (data: IEventText) => {
	personalInfoModel.address = data.text;
});

function validatePersonalInfoFirstButtonNext() {
	paymentType.enableButton =
		personalInfoModel.paymentType!== undefined  &&
		Boolean(personalInfoModel.address);
}

events.on('items: changed', validatePersonalInfoFirstButtonNext);
events.on('click: personal info first button', () => {
	paymentType.show(false);
	personalInfo.show(true);
});

events.on('email_input:change', (data: IEventText) => {
	personalInfoModel.email = data.text;
});

events.on('phone_input:change', (data: IEventText) => {
	personalInfoModel.phone = data.text;
});

function validatePersonalInfoSecondButtonNext() {
	personalInfo.enableButton =
		Boolean(personalInfoModel.email) &&
		Boolean(personalInfoModel.phone);
}

events.on('items: changed', validatePersonalInfoSecondButtonNext);

const success = new Success(
	modalContainerElement,
	modalContentElement,
	events
);

events.on('click: personalInfoSecondNext', ()=>{
	personalInfo.show(false);

	const orderToSend = {
		phone: personalInfoModel.phone,
		email: personalInfoModel.email,
		payment: personalInfoModel.paymentType == PaymentTypeEnum.ONLINE ? "online": "on_PLACE",
		address: personalInfoModel.address,
		total: bm.getTotalSum(),
		items: bm.getCartItems().map((item)=>item.id)
	}

	apiFetch.putOrder(orderToSend as IOrder)
	  .then(()=>{
			success.show(true);
			success.totalPrice = bm.getTotalSum();
			bm.clearCart();
		})
		.catch((data)=>console.log("payment problems: ", data));
});

events.on('click: order success',()=>{
	success.show(false);
});

