import { IsNotEmpty, IsPositive, IsNumber } from "class-validator";

export default class Product {
	@IsNotEmpty()
	name: string;
	@IsNumber()
	@IsPositive()
	price: number;

	constructor(n: string, p: number) {
		this.name = n;
		this.price = p;
	}

	getDetails() {
		return [`${this.name}`, `$${this.price}`];
	}
}
