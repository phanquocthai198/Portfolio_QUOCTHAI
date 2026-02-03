# Portfolio Website - Vue 3 + TypeScript + Tailwind CSS

## 🎨 Mô Tả Dự Án

Portfolio chuyên nghiệp được xây dựng với Vue 3 (Composition API), TypeScript và Tailwind CSS, được thiết kế theo phong cách Gerold Theme với hỗ trợ Dark Mode. Toàn bộ nội dung được Việt hóa 100%.

## 🚀 Tính Năng Chính

1. **Cấu Hình & Giao Diện**
   - [x] Tailwind config với màu sắc Gerold theme (gradient purple/orange/pink)
   - [x] Dark mode với màu nền #101010 và #202020
   - [x] Responsive hoàn toàn (mobile-first)
   - [x] Typography với font Inter
   - [x] Custom animations và transitions

2. **Components Vue 3 + TypeScript**
   - [x] `App.vue` - Layout chính với dark mode state management
   - [x] `Navbar.vue` - Navigation responsive với auto-scroll
   - [x] `HeroSection.vue` - Hero với gradient text và CTA buttons
   - [x] `Services.vue` - Services grid với Vietnamese content
   - [x] `Projects.vue` - Projects gallery với filter và Vietnamese content
   - [x] `Contact.vue` - Contact form với validation, ready cho API integration

3. **TypeScript Interfaces**
   - [x] `Project` - Interface cho dự án
   - [x] `Service` - Interface cho dịch vụ
   - [x] `ContactForm` - Interface cho form liên hệ
   - [x] `Skill`, `Experience`, `SocialLink` - Additional interfaces

4. **Tính Năng Tương Tác**
   - [x] Dark mode toggle với localStorage persistence
   - [x] Smooth scroll navigation
   - [x] Active section highlighting
   - [x] Form validation client-side
   - [x] Counter animations (Years of Experience, Projects)
   - [x] Hover effects và micro-interactions

## 🎨 Thiết Kế

### Color Palette
- **Primary Gradient**: Purple (#8B5CF6) → Pink (#EC4899) → Orange (#F97316)
- **Dark Mode Background**: #101010 (primary), #202020 (cards)
- **Light Mode**: White background với gray accents

### Typography
- Font chính: Inter (Google Fonts)
- Headings: Bold (700-800)
- Body: Regular (400-500)

### Layout
- Container max-width: responsive
- Grid systems: Tailwind CSS
- Spacing: Consistent 8px scale

## 📁 Cấu Trúc File

```
├── tailwind.config.js          # Tailwind configuration
├── index.html                  # Main entry point
├── src/
│   ├── types/
│   │   └── index.ts           # TypeScript interfaces
│   ├── components/
│   │   ├── Navbar.vue         # Navigation component
│   │   ├── HeroSection.vue    # Hero section
│   │   ├── Services.vue       # Services section
│   │   ├── Projects.vue       # Projects section
│   │   └── Contact.vue        # Contact section
│   └── App.vue                # Main app component
```

## 🌟 Điểm Nổi Bật

1. **Performance**: Single HTML file với optimized assets
2. **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation
3. **SEO**: Meta tags, semantic structure, Vietnamese content
4. **Scalability**: Modular components, TypeScript interfaces
5. **Modern**: Vue 3 Composition API, latest Tailwind features


## 📱 Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px
- Large Desktop: > 1280px

## 🎯 SEO Optimization

- Meta tags đầy đủ (title, description, keywords, author)
- Open Graph tags cho social media
- Semantic HTML structure
- Vietnamese content optimized cho local SEO
- Alt text cho images

## 🚀 Performance Features

- Lazy loading cho images
- Optimized animations với CSS transforms
- Minimal JavaScript bundle
- CDN delivery cho fonts và icons
- Efficient CSS với Tailwind JIT

## 🔮 Tính Năng Có Thể Mở Rộng

### Backend Integration (Chưa Implement)
- [ ] RESTful API endpoints cho contact form
- [ ] Database integration cho projects/services
- [ ] Authentication system
- [ ] Admin dashboard cho content management
- [ ] File upload functionality
- [ ] Email notification system

### Advanced Features
- [ ] Multi-language support (i18n)
- [ ] Blog/CMS integration
- [ ] E-commerce functionality
- [ ] Real-time chat
- [ ] Analytics integration
- [ ] Performance monitoring

### Design Enhancements
- [ ] Advanced animations (GSAP, Framer Motion)
- [ ] 3D elements (Three.js)
- [ ] Advanced glassmorphism effects
- [ ] Custom cursor designs
- [ ] Particle effects
- [ ] Advanced scroll-triggered animations

## 🎨 Design Inspiration

- **Gerold Theme**: https://gerold.themejunction.net/
- **Modern Portfolio Trends**: Clean, gradient-focused, glassmorphism

## 📞 Contact Integration

Form liên hệ đã được setup với:
- Client-side validation
- Error handling
- Success/error states
- Loading states
- Ready cho API integration

Example API integration:
```javascript
const handleSubmit = async () => {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contactForm)
  });
  // Handle response...
}
```

## 📄 License

MIT License - Feel free to use for personal and commercial projects.

---

**Lưu ý**: Đây là portfolio static website.