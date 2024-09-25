namespace App {
	export interface Draggable {
		dragStartHandler(event: DragEvent): void; // Được gọi khi bắt đầu kéo một đối tượng (khi người dùng bắt đầu kéo).
		dragEndHandler(event: DragEvent): void; // Được gọi khi kết thúc việc kéo (khi người dùng thả chuột và ngừng kéo đối tượng).
	}

	export interface DragTarget {
		dragOverHandler(event: DragEvent): void; // Được gọi khi một đối tượng đang được kéo qua vùng thả (drop target) để xác định đây là vùng hợp lệ cho phép thả.
		dropHandler(event: DragEvent): void; // Được gọi khi đối tượng được thả vào vùng thả (drop target), dùng để xử lý việc thả và cập nhật dữ liệu/giao diện.
		dragLeaveHandler(event: DragEvent): void; // Được gọi khi một đối tượng kéo ra khỏi vùng thả mà không thả vào (khi rời khỏi vùng thả), thường để hủy bỏ các thay đổi giao diện.
	}
}
