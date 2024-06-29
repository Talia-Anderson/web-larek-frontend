import { Component } from "./base/components"


export interface ICatalogue {
  CatalogueItems: HTMLElement[];
} 

export class Catalogue extends Component<ICatalogue> implements ICatalogue {
  constructor(container: HTMLElement) {
    super(container)
  }

  set CatalogueItems(items: HTMLElement[]) {
    this.container.replaceChildren(... items);
  }
}