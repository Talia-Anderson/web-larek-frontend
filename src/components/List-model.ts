import { IList } from './List'
import { Sell, SellList } from '../types/index'
import { IEvents } from './base/events';


export class ListModel implements IList {
  protected ListContent: SellList[] = [];
  protected events;

  constructor(events:IEvents) {
    this.events = events;
  }

  getSell(id: string): Sell {
    return this.ListContent.find((item) => (item.id === id));
  }

  setItems(newContent: Sell[]): void {
    console.log("new content", newContent);
    this.ListContent = newContent.map(item => ({... item, inCart: false}));
    console.log("List content", this.ListContent);
    this.events.emit('items: changed');
  }

  delItem(id: string): void {
    this.ListContent = this.ListContent.filter((item) => item.id !== id);
    this.events.emit('items: changed');
  }

  getCatalogItems(): Sell[] {
    return this.ListContent;
  }

  getCartItems(): Sell[] {
    return this.ListContent.filter(item => item.inCart);
  }

  getTotalSum(): number {
    let s = 0;
    for (let item of this.ListContent) {
      if (item.inCart) {
        s += item.price;
      }
    }
    return s;
  }

  cartItemsNumber(): number {
    let inCart = 0;
    for (let item of this.ListContent) {
      if (item.inCart) {
        inCart ++;
      }
    }
    return inCart;
  }

  toggleCartState(id: string): void {
    let item = this.ListContent.filter(item => item.id === id)[0];
    item.inCart = !item.inCart;
    this.events.emit('items: changed');
  }

  inCart(id: string): boolean {
    if (!id) {
      return false;
    }
    return this.ListContent.filter(item => item.id === id)[0].inCart;
  }

  clearCart() {
    for(let ind = 0; ind<this.ListContent.length;ind++) {
      this.ListContent[ind].inCart = false;
    }
    this.events.emit('items: changed');
  }
}
