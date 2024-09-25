namespace App {
	export function autobind(
		_: any,
		_2: string | symbol,
		descriptor: PropertyDescriptor
	) {
		const originalMethod = descriptor.value;

		const adjDescriptor: PropertyDescriptor = {
			configurable: true,
			get() {
				const boundFn = originalMethod.bind(this);
				return boundFn;
			},
		};

		return adjDescriptor;
	}
}
