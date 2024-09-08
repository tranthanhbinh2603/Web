const parents = document.querySelector(".parents");

//Cách 1: Tạo thẻ, gán class, gán nội dung
const newElement = document.createElement("p");
newElement.className = "my-new-div";
newElement.innerHTML = "<p>Đây là nội dung của thẻ mới được tạo</p>";
parents.appendChild(newElement);

//Cách 2: Sửa thẻ bằng innerHTML
var contentToAdd = "<p>Haha</p>";
parents.innerHTML += contentToAdd;

// Cách 3: Sử dụng insertBefore đúng cách
var contentToInsert = document.createElement("p");
contentToInsert.innerHTML = "Hihi đây là thẻ dùng cách insertBefore";
parents.parentNode.insertBefore(contentToInsert, parents); // Chèn trước phần tử parents

//Cách 4: Sử dụng insertAdjacentHTML (https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML)
var contentToAdd = "<p>Haha</p>";
parents.insertAdjacentHTML("beforeend", contentToAdd);
