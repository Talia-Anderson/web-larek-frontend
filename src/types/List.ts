import { Sell } from './index';

export interface IList {
	getSell(id: string): Sell;
	setItems(newItems: Sell[]): void;
	delItem(id: string): void;
	getCatalogItems(): Sell[];
	getCartItems(): Sell[];
	getTotalSum(): number;
	cartItemsNumber(): number;
	toggleCartState(id: string): void;
	inCart(id: string): boolean;
}
