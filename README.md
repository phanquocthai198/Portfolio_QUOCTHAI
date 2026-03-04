# Portfolio QUOC THAI

Portfolio cá nhân dạng single-page, có hỗ trợ:
- Dark mode
- Chuyển ngôn ngữ Việt/Anh
- Điều hướng theo section (active nav khi cuộn)
- Form liên hệ có validate và thông báo trạng thái
- Danh sách dự án responsive (desktop/tablet/mobile)

## 1. Công nghệ đang dùng
- Vue 3 (global CDN trong `index.html`)
- Tailwind CSS (CDN + config inline)
- Font Awesome (CDN)
- Lottie Player (CDN)

Lưu ý: Bản chạy chính hiện tại là `index.html` (không cần build).

## 2. Chạy dự án local
Không cần `npm install`.

### Cách 1: VS Code Live Server
1. Cài extension `Live Server`.
2. Chuột phải vào `index.html`.
3. Chọn `Open with Live Server`.

### Cách 2: Python HTTP server
```bash
python -m http.server 5500
```
Mở:
```text
http://localhost:5500/index.html
```

## 3. Cấu trúc thư mục
```text
Portfolio_QUOCTHAI/
├─ index.html                  # Bản app chạy thực tế
├─ tailwind.config.js          # Cấu hình tham chiếu (không bắt buộc khi chạy CDN)
├─ README.md
└─ src/
   ├─ App.vue                  # Bản SFC tham chiếu (modular)
   ├─ components/
   │  ├─ Navbar.vue
   │  ├─ HeroSection.vue
   │  ├─ About.vue
   │  ├─ Skills.vue
   │  ├─ Services.vue
   │  ├─ Projects.vue
   │  ├─ Contact.vue
   │  └─ FooterSection.vue
   ├─ icons/
   ├─ images/
   └─ types/
      └─ index.ts
```

## 4. Chỉnh nội dung ở đâu
Mọi phần nội dung chính đều nằm trong `index.html`:

1. Text đa ngôn ngữ:
- Tìm object `const translations = { vi: ..., en: ... }`.
- Chỉnh label menu, tiêu đề section, text form, thông báo alert.

2. Dịch vụ:
- Tìm `const servicesData = { vi: [...], en: [...] }`.

3. Dự án:
- Tìm `const projectsData = { vi: [...], en: [...] }`.
- Mỗi item gồm `title`, `description`, `image`, `tags`, `demoUrl`, `codeUrl`.

4. Thông tin liên hệ:
- Email/phone hiển thị đang nằm trong template Contact.
- Label location nằm trong `translations.contact.info`.

5. Meta SEO:
- Chỉnh trong thẻ `<head>`: `title`, `description`, `og:*`, `author`, `keywords`.

## 5. Logic quan trọng cần biết
1. Dark mode:
- State: `isDarkMode`
- Lưu vào `localStorage` key: `darkMode`

2. Language mode:
- State: `currentLanguage` (`vi` hoặc `en`)
- Lưu vào `localStorage` key: `language`

3. Active section trên navbar:
- Hàm `updateActiveSection()` cập nhật khi scroll.

4. Project toggle theo màn hình:
- Desktop: hiển thị 3 project đầu
- Tablet/mobile: hiển thị 2 project đầu
- Nút `View All/Show Less` tự hiện khi số lượng project vượt ngưỡng.

5. Placeholder project link:
- Nếu `demoUrl` hoặc `codeUrl` còn dạng ví dụ (`example...`, `your-repo`), app sẽ báo “project chưa hoàn thành”.

6. Form contact:
- Validate bắt buộc tất cả trường
- Validate định dạng email
- Có trạng thái loading và notification success/error