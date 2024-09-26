export default class Product {
	name: string;
	price: number;

	constructor(n: string, p: number) {
		this.name = n;
		this.price = p;
	}

	getDetails() {
		return [`${this.name}`, `$${this.price}`];
	}
}
