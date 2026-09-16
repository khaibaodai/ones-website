# Website OneS — onescorp.vn

Website giới thiệu & giỏ hàng dự án cho **Công ty Cổ phần Đầu tư và Dịch vụ OneS** (OneS Corporation) — *Kiến tạo giá trị thịnh vượng*.
Mục đích: cung cấp thông tin công ty, dự án/sản phẩm và chính sách hợp tác cho **đối tác, cộng tác viên** lấy thông tin bán hàng.

Đây là website **tĩnh** (HTML + CSS + JavaScript thuần), clone từ khung code PaceLand-Website, đổi sang nhận diện OneS (Navy `#214E7F` · Green `#00A04C` · font Albula Pro theo Brand Guidelines 11/2024).

---

## 1. Xem thử

```bash
python -m http.server 8789
```
Rồi mở `http://localhost:8789`. (Hoặc trong Claude Code: preview `ones-static` đã cấu hình ở `.claude/launch.json`.)

## 2. Các trang

| File | Trang |
|------|-------|
| `index.html` | Trang chủ — mô hình OneS, 6 dự án nổi bật, cách hợp tác |
| `du-an.html` | Giỏ hàng dự án (bộ lọc khu vực / phân khúc / loại hình / giá) |
| `du-an/<id>.html` | Trang tĩnh từng dự án (sinh bởi `tools/prerender.mjs`) |
| `du-an-chi-tiet.html` | Trang chi tiết động (dự phòng, `?id=...`, noindex) |
| `gioi-thieu.html` | Thông tin pháp nhân, tầm nhìn/sứ mệnh, 10 dịch vụ, giá trị cốt lõi, lãnh đạo, đối tác |
| `doi-tac.html` | Chính sách doanh thu chia sẻ (70/73/75/86%), OneS Elite, form đăng ký |
| `lien-he.html` | Liên hệ + bản đồ + form |
| `admin.html` | 🔐 Quản trị nội dung (mật khẩu mặc định `ones2026`) |

Bố cục dùng chung (menu, chân trang, nút Zalo/gọi) nằm trong `assets/js/components.js`. Nội dung (thông tin công ty, 14 dự án, chữ hero từng trang) nằm trong `assets/js/data.js`.

## 3. Cập nhật nội dung

**Cách 1 — Admin CMS (không cần code):** mở `/admin.html` → tab **Dự án** (thêm/sửa/xoá, đánh dấu "Nổi bật trang chủ", tải ảnh) · **Trang (Nội dung)** (chữ hero/CTA) · **Cài đặt** (hotline, email, Formspree, GitHub để bấm "Đăng lên web").

**Cách 2 — sửa trực tiếp `assets/js/data.js`** rồi chạy prerender:

```bash
node tools/prerender.mjs
```

> Quy tắc: đổi nội dung → `node tools/prerender.mjs` → mới deploy (sinh lại `/du-an/*.html`, danh sách tĩnh trên trang chủ/du-an, schema JSON-LD, `sitemap.xml`). Khi push lên GitHub, workflow `.github/workflows/prerender.yml` tự chạy bước này.

## 4. Nhận lead từ form

`SITE.formEndpoint` trong `data.js` đang **trống** → form sẽ mở email soạn sẵn gửi về `onescorporation.info@gmail.com` (mailto). Để nhận lead tự động: tạo form tại https://formspree.io → dán endpoint vào **Admin → Cài đặt → Form endpoint** (hoặc `formEndpoint` trong `data.js`).

## 5. Ảnh & tài liệu

- Logo/icon: `assets/img/logo.png`, `logo-white.png`, `icon.png`, `og-image.jpg` (1200×630)
- Ảnh dự án: `assets/img/media/<id>-cover.jpg` (ảnh bìa) và `<id>-card.jpg` (thẻ "Sản phẩm chiến lược 2025" của OneS — nút "Tải thẻ sản phẩm" trên trang dự án)
- Ảnh lãnh đạo: `assets/img/media/lanh-dao-*.jpg` · Lễ ký kết The Privé: `ky-ket-the-prive-*.jpg` · Poster chính sách: `chinh-sach-*.jpg`
- Font: `assets/fonts/AlbulaPro-*.otf`

## 6. Deploy

Repo GitHub + hosting auto-deploy từ Git (Tinh Gọn/Mắt Bão hoặc Netlify/Vercel). `.dockerignore` đã loại `docs/`, `tools/`, `.git` để build nhẹ. Trỏ tên miền `onescorp.vn` về hosting sau khi site chạy.
