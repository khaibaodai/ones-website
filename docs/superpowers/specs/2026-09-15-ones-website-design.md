# Thiết kế website OneS (clone từ PaceLand) — 15/09/2026

## Mục tiêu
- Website "đối phó" nhưng tử tế: cung cấp thông tin công ty, dự án/sản phẩm và chính sách hợp tác để **đối tác & cộng tác viên** lấy thông tin bán hàng.
- Định vị theo lời anh Khải: *OneS là công ty công nghệ, hỗ trợ đối tác nguồn sản phẩm để nhận phí dịch vụ.*
- Thiết kế đơn giản, corporate; đúng nhận diện OneS (Brand Guidelines 11/2024): Navy `#214E7F`, Grass Green `#00A04C`, trắng; font Albula Pro (Bold tiêu đề / Regular nội dung); logo tia mặt trời.

## Quyết định
1. **Kiến trúc:** giữ nguyên nền tĩnh của PaceLand (HTML + CSS + `data.js` + `components.js` + `main.js` + `admin.html` + `tools/prerender.mjs` + GitHub Action) để anh Khải vận hành quen tay. Bỏ blog, FAQ, công cụ, tuyển dụng, chứng nhận chuyên viên, chat bot, hero slider.
2. **Trang:** Trang chủ · Dự án (lọc) · Chi tiết dự án (prerender `/du-an/<id>.html`) · Giới thiệu · Đối tác & CTV · Liên hệ · Admin.
3. **Dữ liệu thật, không bịa:** thông tin công ty/lãnh đạo/chính sách lấy từ `OneS_Company_Profile.pdf` (07/2025) + tin nhắn anh Khải (địa chỉ P. Bình Trưng, email onescorporation.info@gmail.com, social). Giỏ hàng = 14 thẻ "Sản phẩm chiến lược kinh doanh 2025" của OneS (Drive/Video/Sản phẩm) — 5 dự án kế thừa dữ liệu chi tiết từ PaceLand (The Privé, The Global City, Eaton Park, Vinhomes Grand Park, Palm City), 9 dự án còn lại chỉ ghi số liệu cơ bản trên thẻ; giá để "Liên hệ".
4. **Theme:** đổi token CSS (giữ tên biến `--red`/`--gold` để không phải sửa hàng trăm chỗ: `--red` = navy, `--gold` = green), bỏ italic/serif, bỏ clip-path facet, thêm @font-face Albula Pro.
5. **Form:** chưa có Formspree cho OneS → fallback mở email soạn sẵn (mailto) để form vẫn dùng được ngay; dán endpoint Formspree sau qua Admin.
6. **Deploy:** chưa tạo repo/hosting (chờ anh Khải chốt: repo `khaibaodai/ones-website` + Tinh Gọn, trỏ `onescorp.vn`).

## Cấu trúc thư mục
Xem `README.md`.
