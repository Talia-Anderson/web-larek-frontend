import { Api } from "./base/api";
import { IOrder, Sell, SellFromAPI } from "../types/index"

export interface ISellAPI {
  getSell(): Promise<SellFromAPI>;
  getOneSell(SellID: string): Promise<Sell>;
  putOrder(order:IOrder):Promise<boolean>;
}

export class SellAPI extends Api implements ISellAPI {
  constructor(baseUrl: string, options?: RequestInit) {
    super(baseUrl, options);
  }

  getSell(): Promise<SellFromAPI> {
    return this.get<SellFromAPI>('/product');
  }

  getOneSell(SellID: string): Promise<Sell> {
    return this.get<Sell>(`/product/${SellID}`);
  }

  putOrder(order: IOrder): Promise<boolean> {
    return this.post<boolean>(`/order/`, order);
  }
}
