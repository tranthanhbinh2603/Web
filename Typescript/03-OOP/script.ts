// class Student {
// 	// private name: string;
// 	// private age: number;
// 	// constructor(name: string, age: number) {
// 	// 	this.name = name;
// 	// 	this.age = age;
// 	// }
// 	//Đoạn trên được viết ngắn gọn thành:
// 	constructor(private readonly name: string, protected age: number) {}
// 	addAge(this: Student, value: number) {
// 		this.age += value;
// 	}
// 	get getName() {
// 		return this.name;
// 	}
// 	set setAgeRoot(value: number) {
// 		this.age = value;
// 	}
// 	// Hàm này sẽ có lỗi
// 	// changeName(this: Student, value: string) {
// 	// 	this.name = value;
// 	// }
// 	print(this: Student) {
// 		console.log("Name: " + this.name);
// 	}
// }

// class StudentInOneClass extends Student {
// 	constructor(name: string, private grade: number) {
// 		super(name, 20);
// 	}

// 	setGrade(value: number) {
// 		this.grade = value;
// 	}

// 	setAge(value: number) {
// 		this.age = value;
// 	}

// 	print(this: StudentInOneClass) {
// 		super.print();
// 		console.log("Grade: " + this.grade);
// 	}
// }

// class Tools {
// 	public static PI: number = 3.14;
// 	static area(radius: number) {
// 		console.log(radius * radius * this.PI);
// 	}
// }

// console.log(Tools.PI);
// Tools.area(200);

// const student = new Student("Binh", 23);
// console.log(student.getName);
// student.setAgeRoot = 10;
// console.log(student);
// student.addAge(20);
// console.log(student);
// student.addAge(20);
// console.log(student);
// student.print();

// const studentInOneClass = new StudentInOneClass("Hacker", 12);
// console.log(studentInOneClass);

// abstract class abstractClass {
// 	protected PI = 1.24;
// 	abstract area(radius: number): number;
// }

// class Tool extends abstractClass {
// 	area(radius: number): number {
// 		return radius * radius * this.PI;
// 	}
// }

// class Apartment {
// 	//Tạo ra instance
// 	public static instance: Apartment;

// 	//Check xem coi có xuất hiện ra 1 instance khác chưa, nếu đã từng xuất hiện 1 instance thì thực hiện trả về instance đó. Ngược lại, tạo 1 instance mới
// 	static getInstance() {
// 		if (!Apartment.instance) {
// 			this.instance = new Apartment();
// 		}
// 		return this.instance;
// 	}

// 	private staffs: string[] = [];
// 	//Cuối cùng, hàm khởi tạo bắt buộc phải là private
// 	private constructor(...staff: string[]) {
// 		for (const eachStaff of staff) {
// 			this.staffs.push(eachStaff);
// 		}
// 	}
// 	addStaffs(...staff: string[]) {
// 		for (const eachStaff of staff) {
// 			this.staffs.push(eachStaff);
// 		}
// 	}
// 	printStaffs() {
// 		console.log("List staff: ");
// 		for (const staff of this.staffs) {
// 			console.log(staff);
// 		}
// 	}
// }

// const apartmentObject = Apartment.getInstance();
// apartmentObject.printStaffs();
// apartmentObject.addStaffs("An");
// apartmentObject.addStaffs("Phuc");
// apartmentObject.printStaffs();

interface People {
	readonly name: string;
	age: string;
	talk(content: string): void;
}

let onePeople: People;

onePeople = {
	name: "Binh",
	age: "20",
	talk(content: string) {
		console.log(`${content} ${this.name}`);
	},
};

onePeople.talk("Hi, my name is");
