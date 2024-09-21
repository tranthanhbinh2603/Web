// ===========================================
// const arr: number[] | string[] = [1, 2, 3, 4];

// arr.push("Hello");

// ===========================================

// const promise = new Promise((resolve, reject) => {
// 	setTimeout(() => {
// 		resolve(10); // Trả về chuỗi thay vì số
// 	}, 2000);
// });

// promise.then(() => {
// 	console.log(); // Hợp lệ vì `data` là chuỗi
// });

// ===========================================

// function merge<T extends object, U extends object>(a: T, b: U) {
// 	return Object.assign(a, b);
// }

// const dataAfterMerge = merge({ name: "Binh" }, { age: 90 });

// console.log(dataAfterMerge);

// console.log(dataAfterMerge.age);

// ===========================================

// interface VD1 {
// 	length: number;
// }

// function countAndPrint<T extends VD1>(list: T) {
// 	if (list.length === 0) {
// 		console.log("List have 0 items");
// 	} else {
// 		console.log(`List have ${list.length} items`);
// 	}
// }

// //Test data:
// countAndPrint("Hello World");
// countAndPrint([]);
// countAndPrint(["a", "b", "binh"]);

// ===========================================

// function getKeyInDict<T extends object, U extends string>(
// 	dict: object,
// 	key: string
// ) {
// 	return dict[key];
// }

// console.log(getKeyInDict({ name: "Binh", age: 20 }, "name"));
// console.log(getKeyInDict({ name: "Binh", age: 20 }, "age"));

// ===========================================

// class Employees<T extends string | number> {
// 	private listEmployee: T[] = [];

// 	constructor(...listEmployeeConstructor: T[]) {
// 		for (const employee of listEmployeeConstructor)
// 			this.listEmployee.push(employee);
// 	}

// 	addEmployees(...listEmployeeAdd: T[]) {
// 		for (const employee of listEmployeeAdd) this.listEmployee.push(employee);
// 	}

// 	deleteEmployees(...listEmployeeDelete: T[]) {
// 		for (const employee of listEmployeeDelete)
// 			this.listEmployee = this.listEmployee.filter((item) => item != employee);
// 	}

// 	printEmployees() {
// 		console.log("List employees: ");
// 		for (const employee of this.listEmployee) console.log(employee);
// 		console.log("=======================");
// 	}
// }

// const newEmployeeObject = new Employees<string>("Binh", "Phuc", "Nhan");
// newEmployeeObject.printEmployees();
// newEmployeeObject.addEmployees("Le", "Nam");
// newEmployeeObject.addEmployees("Thanh");
// newEmployeeObject.printEmployees();
// newEmployeeObject.deleteEmployees("Binh", "Thanh", "Nam");
// newEmployeeObject.printEmployees();

// const newEmployeeNumberObject = new Employees<number>(1, 2, 3);
// newEmployeeNumberObject.printEmployees();
// newEmployeeNumberObject.addEmployees(4, 5, 6, 1);
// newEmployeeNumberObject.printEmployees();
// newEmployeeNumberObject.deleteEmployees(1, 2, 5);
// newEmployeeNumberObject.printEmployees();

// ===========================================

interface People {
	name: string;
	age: number;
	salary: number;
}

function createPeople(name: string, age: number, salary: number): People {
	let peopleResult: Partial<People> = {};
	peopleResult.name = name;
	peopleResult.age = age;
	peopleResult.salary = salary;
	return peopleResult as People;
}
