import Product from "./product.model";
import "reflect-metadata";
import { plainToClass } from "class-transformer";

//Yêu cầu: Tạo ra n đổi tượng product được nhập từ API (chẳng hạn). Ở đây chỉ làm ví dụ đơn giản với n = 2 và các giá trị cố định.

//Cách 1: Ngây thơ
// const product1 = new Product("Apple", 50);
// const product2 = new Product("Milk", 200);

// console.log(product1.getDetails());
// console.log(product2.getDetails());

//Cách 2: Có vẻ tốt hơn, chạy với n cao hơn
// const products = [
// 	{ name: "Apple", price: 50 },
// 	{ name: "Milk", price: 200 },
// ];

// const productObjects = products.map((product) => {
// 	return new Product(product.name, product.price);
// });

// for (const productObject of productObjects) {
// 	console.log(productObject.getDetails());
// }

//Cách 3: Sử dụng thư viện:
const products = [
	{ name: "Apple", price: 50 },
	{ name: "Milk", price: 200 },
];

const productObjects = plainToClass(Product, products);

for (const productObject of productObjects) {
	console.log(productObject.getDetails()); // Thêm dấu ngoặc () để gọi phương thức
}
