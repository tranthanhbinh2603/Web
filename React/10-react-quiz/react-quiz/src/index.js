// 5 ý tưởng nâng cấp app:
// 1. Cho phép user chọn câu hỏi nhất định trong bộ câu hỏi, chọn chủ đề hoặc chọn độ khó trên màn hình chính
// 2. Random ra 1 lượng câu hỏi chứ không phải tất cả
// 3. Upload điểm cao lên trên API giả mạo
// 4. Lưu trữ tất cả đáp án thành 1 mảng để dễ dàng di chuyển qua lại giữa các câu hỏi
// 5. Chổ timer, mỗi giây chạy sẽ reload toàn bộ cây state trong react. Cần fix cái này
// 6. Hỗ trợ nhấn nút từ bàn phím

// Sau này làm khoá học sẽ làm cả 4 ý tưởng nâng cấp này

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import { QuizProvider } from "./contexts/QuizContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<QuizProvider>
			<App />
		</QuizProvider>
	</React.StrictMode>
);
