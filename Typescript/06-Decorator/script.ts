// function FirstParentDecorator(content: string, classFind: string) {
// 	return function <T extends { new (...args: any[]): { name: string } }>(
// 		originalConstructor: T
// 	) {
// 		return class extends originalConstructor {
// 			constructor(..._: any[]) {
// 				super();
// 				const target = document.querySelector(`.${classFind}`);
// 				if (target) {
// 					target!.innerHTML = content;
// 					target!.querySelector("h1")!.textContent = this.name;
// 				}
// 			}
// 		};
// 	};
// }

// @FirstParentDecorator("<h1>This is target</h1>", "target")
// class People {
// 	name: string = "Init";
// 	printName() {
// 		console.log(this.name);
// 	}
// }

// const peopleObject = new People();

// ===============================================================

// //Decorator
// function OnlyDecorator(constructor: any) {
//     console.log("It is OnlyDecorator");
// }

// // Decorator Logger
// function Logger(logMessage: string) {
//   console.log('Logger factory initialized');
//   return function (constructor: Function) {
//     console.log(logMessage);
//   };
// }

// // Decorator WithTemplate
// function WithTemplate(template: string) {
//   console.log('Template factory initialized');
//   return function (constructor: Function) {
//     console.log('Template applied: ' + template);
//   };
// }

// @OnlyDecorator
// @Logger('Executing Logger')
// @WithTemplate('<h1>Hello World</h1>')
// class MyComponent {
//   constructor() {
//     console.log('Creating component');
//   }
// }

// const component = new MyComponent();

// ===============================================================

// function PropertyDecorator(target: any, propertySymbol: string | Symbol) {
// 	console.log("Property Decorator running.....");
// 	console.log(target);
// 	console.log(propertySymbol);
// }

// function AccessorDecorator(
// 	target: any,
// 	name: string | Symbol,
// 	descriptor: PropertyDescriptor
// ) {
// 	console.log("Accessor Decorator running.....");
// 	console.log(target);
// 	console.log(name);
// 	console.log(descriptor);
// }

// function MethodDecorator(
// 	target: any,
// 	name: string | Symbol,
// 	descriptor: PropertyDescriptor
// ) {
// 	console.log("Method Decorator running......");
// 	console.log(target);
// 	console.log(name);
// 	console.log(descriptor);
// }

// function ParameterDecorator(
// 	target: any,
// 	name: string | Symbol,
// 	position: number
// ) {
// 	console.log("Parameter Decorator running.....");
// 	console.log(target);
// 	console.log(name);
// 	console.log(position);
// }

// class Person {
// 	@PropertyDecorator
// 	private _name: String = "";

// 	@AccessorDecorator
// 	set setName(@ParameterDecorator value: string) {
// 		this._name = value;
// 	}

// 	@MethodDecorator
// 	printName() {
// 		console.log(this._name);
// 	}
// }

// const a = new Person();
// a.setName = "Hello";
// const b = new Person();
// b.setName = "Hello";

// ===============================================================

// function autobind(
// 	_: any, // target: Không sử dụng trong trường hợp này
// 	_2: string | symbol, // propertyKey: Không sử dụng trong trường hợp này
// 	descriptor: PropertyDescriptor
// ) {
// 	const originalMethod = descriptor.value;

// 	const adjDescriptor: PropertyDescriptor = {
// 		configurable: true,
// 		get() {
// 			// Tự động bind phương thức vào đúng ngữ cảnh 'this'
// 			const boundFn = originalMethod.bind(this);
// 			return boundFn;
// 		},
// 	};

// 	return adjDescriptor;
// }

// class PrintTest {
// 	private name: string = "Binh";

// 	@autobind
// 	printName() {
// 		console.log(this.name);
// 	}
// }

// const p = new PrintTest();
// const target = document.querySelector(".btn-primary");
// target?.addEventListener("click", p.printName);

// ===============================================================

interface ValidatorConfig {
	[property: string]: {
		[validateProp: string]: string[]; // ['required', 'positive']
	};
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
	registeredValidators[target.constructor.name] = {
		...registeredValidators[target.constructor.name],
		[propName]: [
			...(registeredValidators[target.constructor.name]?.[propName] ?? []),
			"required",
		],
	};
}

function PositiveNumber(target: any, propName: string) {
	registeredValidators[target.constructor.name] = {
		...registeredValidators[target.constructor.name],
		[propName]: [
			...(registeredValidators[target.constructor.name]?.[propName] ?? []),
			"positive",
		],
	};
}

function validate(obj: any) {
	const objValidatorConfig = registeredValidators[obj.constructor.name];
	if (!objValidatorConfig) {
		return true;
	}
	let isValid = true;
	for (const prop in objValidatorConfig) {
		for (const validator of objValidatorConfig[prop]) {
			switch (validator) {
				case "required":
					isValid = isValid && !!obj[prop];
					break;
				case "positive":
					isValid = isValid && obj[prop] > 0;
					break;
			}
		}
	}
	return isValid;
}

class Course {
	@Required
	title: string;
	@PositiveNumber
	price: number;

	constructor(t: string, p: number) {
		this.title = t;
		this.price = p;
	}
}

const courseForm = document.querySelector("form")!;
courseForm.addEventListener("submit", (event) => {
	event.preventDefault();
	const courseName = (
		document.querySelector(".course_name")! as HTMLInputElement
	).value;
	const coursePrice = parseInt(
		(document.querySelector(".course_price")! as HTMLInputElement).value
	);

	const createdCourse = new Course(courseName, coursePrice);

	if (!validate(createdCourse)) {
		alert("Invalid input, please try again!");
		return;
	}
	console.log(createdCourse);
});

// Đoạn code này là nâng cao hơn ở trên. Lý do là lưu lại list khoá học chứ không phải là lưu mỗi 1 khoá học. Cơ mà nó lỗi sml.
// interface ValidatorConfig {
// 	[property: string]: {
// 		[validateProp: string]: string[];
// 	};
// }

// const registeredValidators: ValidatorConfig = {};

// function Required(target: any, propName: string, _: number) {
// 	const className = target.constructor.name;
// 	registeredValidators[className] = {
// 		...registeredValidators[className],
// 		[propName]: [
// 			...(registeredValidators[className]?.[propName] || []),
// 			"required",
// 		],
// 	};
// }

// function PositiveValue(target: any, propName: string, _: number) {
// 	const className = target.constructor.name;
// 	registeredValidators[className] = {
// 		...registeredValidators[className],
// 		[propName]: [
// 			...(registeredValidators[className]?.[propName] || []),
// 			"positive",
// 		],
// 	};
// }

// function NotNull(target: any, propName: string, _: number) {
// 	const className = target.constructor.name;
// 	registeredValidators[className] = {
// 		...registeredValidators[className],
// 		[propName]: [
// 			...(registeredValidators[className]?.[propName] || []),
// 			"notNull",
// 		],
// 	};
// }

// function validate(obj: any) {
// 	const objValidatorConfig = registeredValidators[obj.constructor.name];
// 	console.log("Object Validator Config:", objValidatorConfig); // kiểm tra config

// 	if (!objValidatorConfig) {
// 		return true;
// 	}
// 	let isValid = true;
// 	for (const prop in objValidatorConfig) {
// 		for (const validator of objValidatorConfig[prop]) {
// 			console.log(`Validating ${prop} with rule: ${validator}`); // kiểm tra quá trình
// 			switch (validator) {
// 				case "required":
// 					isValid = isValid && !!obj[prop];
// 					break;
// 				case "positive":
// 					isValid = isValid && obj[prop] > 0;
// 					break;
// 				case "notNull":
// 					isValid = isValid && obj[prop] !== "";
// 					break;
// 			}
// 		}
// 	}
// 	return isValid;
// }

// interface Course {
// 	name: string;
// 	price: number;
// }

// // class CourseClass {
// // 	private courseList: Course[] = [];

// // 	addCourse(
// // 		@Required @NotNull nameCourse: string,
// // 		@Required @PositiveValue priceCourse: number
// // 	) {
// // 		const tempCourse = {
// // 			name: nameCourse,
// // 			price: priceCourse,
// // 		};

// // 		if (!validate(tempCourse)) {
// // 			alert("Invalid input! Please ensure all fields are correctly filled.");
// // 			return;
// // 		}
// // 		this.courseList.push(tempCourse);
// // 	}

// // 	printCourse() {
// // 		for (const course of this.courseList) {
// // 			console.log(
// // 				`Name of course: ${course["name"]}; Price of course: ${course["price"]}`
// // 			);
// // 		}
// // 		console.log("==========================================");
// // 	}
// // }

// // // FOR TESTING:
// // // const courseListObject = new CourseClass();
// // // courseListObject.addCourse("Javascript Course", 200);
// // // courseListObject.addCourse("CSS Course", 500);
// // // courseListObject.printCourse();

// // const courseListObject = new CourseClass();
// // const btnAddCourse = document.querySelector(".btnAddCourse");
// // btnAddCourse?.addEventListener("click", () => {
// // 	const courseName = (
// // 		document.querySelector(".course_name")! as HTMLInputElement
// // 	).value;
// // 	const coursePrice = parseInt(
// // 		(document.querySelector(".course_price")! as HTMLInputElement).value
// // 	);
// // 	courseListObject.addCourse(courseName, coursePrice);
// // 	courseListObject.printCourse();
// // });

// class CourseClass {
// 	private courseList: Course[] = [];

// 	addCourse(
// 		@Required @NotNull nameCourse: string,
// 		@Required @PositiveValue priceCourse: number
// 	) {
// 		const tempCourse = {
// 			name: nameCourse,
// 			price: priceCourse,
// 		};

// 		// Kiểm tra validate dựa trên `CourseClass`
// 		if (!validate(tempCourse)) {
// 			alert("Invalid input! Please ensure all fields are correctly filled.");
// 			return;
// 		}

// 		this.courseList.push(tempCourse);
// 	}

// 	printCourse() {
// 		for (const course of this.courseList) {
// 			console.log(
// 				`Name of course: ${course["name"]}; Price of course: ${course["price"]}`
// 			);
// 		}
// 		console.log("==========================================");
// 	}
// }

// // FOR TESTING:
// const courseListObject = new CourseClass();
// const btnAddCourse = document.querySelector(".btnAddCourse");
// btnAddCourse?.addEventListener("click", () => {
// 	const courseName = (
// 		document.querySelector(".course_name")! as HTMLInputElement
// 	).value;
// 	const coursePrice = parseInt(
// 		(document.querySelector(".course_price")! as HTMLInputElement).value
// 	);

// 	courseListObject.addCourse(courseName, coursePrice);
// 	courseListObject.printCourse();
// });
