import { ensureElement } from '../utils/utils';
import { Component } from './base/components';

export interface ICartButton {
	CartCounter: number;
}

export class CartButton
	extends Component<ICartButton>
	implements ICartButton
{
	protected elementCartCounter: HTMLElement;
	constructor(container: HTMLElement) {
		super(container);
		this.elementCartCounter = ensureElement(
			'.header__basket-counter',
			this.container
		);
	}
	set CartCounter(val: number) {
		this.elementCartCounter.textContent = String(val);
	}
}
