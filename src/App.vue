<template>
  <div id="app" :class="{ dark: isDarkMode }" class="min-h-screen transition-colors duration-300">
    <div class="fixed inset-0 -z-10">
      <div class="absolute inset-0 bg-white dark:bg-dark-bg"></div>
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgb(0,0,0,0.05)_1px,transparent_0)] dark:bg-[radial-gradient(circle_at_1px_1px,rgb(255,255,255,0.03)_1px,transparent_0)] [background-size:2rem_2rem]"></div>
    </div>

    <Navbar
      :is-dark-mode="isDarkMode"
      :is-mobile-menu-open="isMobileMenuOpen"
      :current-language="currentLanguage"
      :active-section="activeSection"
      :navigation-items="currentNavigationItems"
      @toggle-dark-mode="toggleDarkMode"
      @toggle-language="toggleLanguage"
      @toggle-mobile-menu="toggleMobileMenu"
      @navigate="handleNavigate"
    />

    <div v-if="notification.show" class="fixed top-20 right-4 z-[70] w-[calc(100%-2rem)] sm:w-[440px]">
      <div
        class="relative rounded-2xl p-4 border shadow-2xl backdrop-blur-md animate-fade-in"
        :class="isDarkMode
          ? (notification.type === 'error'
            ? 'bg-[#1f1b10]/95 border-yellow-400/40'
            : 'bg-[#102019]/95 border-emerald-400/40')
          : (notification.type === 'error'
            ? 'bg-yellow-50 border-yellow-300'
            : 'bg-emerald-50 border-emerald-300')"
      >
        <div class="flex items-start gap-3">
          <div
            class="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg flex-shrink-0"
            :class="notification.type === 'error' ? 'bg-yellow-500' : 'bg-emerald-500'"
          >
            <i :class="notification.type === 'error' ? 'fas fa-exclamation' : 'fas fa-check'"></i>
          </div>
          <div class="pr-8">
            <h4 class="text-xl font-semibold" :class="isDarkMode ? 'text-white' : 'text-gray-900'">{{ notification.title }}</h4>
            <p class="mt-1 text-sm sm:text-base leading-relaxed" :class="isDarkMode ? 'text-gray-200' : 'text-gray-700'">{{ notification.message }}</p>
          </div>
          <button
            @click="closeNotification"
            class="absolute top-3 right-3 transition-colors"
            :class="isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-gray-700'"
            aria-label="Close notification"
          >
            <i class="fas fa-times text-lg"></i>
          </button>
        </div>
      </div>
    </div>

    <HeroSection :hero="t.hero" @scroll-to-section="scrollToSection" />
    <AboutSection :about="t.about" :highlights="aboutHighlights" />
    <SkillsSection
      :skills="t.skills"
      :skills-panel-text="skillsPanelText"
      :technical-skill-cards="technicalSkillCards"
      :soft-skills="softSkills"
    />
    <ServicesSection :services-labels="t.services" :services="currentServices" />
    <ProjectsSection
      :projects-labels="t.projects"
      :projects="displayedProjects"
      :show-toggle="shouldShowProjectToggle"
      :toggle-text="projectToggleText"
      @toggle-projects="toggleProjectsView"
      @open-link="openProjectLink"
    />
    <ContactSection
      :contact="t.contact"
      :contact-form="contactForm"
      :is-submitting="isSubmitting"
      @submit="handleSubmit"
    />
    <FooterSection :footer="t.footer" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref, watch } from 'vue'
import AboutSection from './components/About.vue'
import ContactSection from './components/Contact.vue'
import FooterSection from './components/FooterSection.vue'
import HeroSection from './components/HeroSection.vue'
import Navbar from './components/Navbar.vue'
import ProjectsSection from './components/Projects.vue'
import ServicesSection from './components/Services.vue'
import SkillsSection from './components/Skills.vue'

type LanguageCode = 'vi' | 'en'

interface NavigationItem {
  id: string
  label: string
}

interface HeroTranslations {
  greeting: string
  title1: string
  title2: string
  subtitle1: string
  description: string
  cta1: string
}

interface AboutTranslations {
  title: string
  description: string
  years: string
  projects: string
}

interface SkillsTranslations {
  badge: string
  title1: string
  title2: string
  subtitle: string
}

interface ServicesTranslations {
  badge: string
  title1: string
  title2: string
  subtitle: string
}

interface ProjectsTranslations {
  badge: string
  title1: string
  title2: string
  subtitle: string
  viewDemo: string
  viewCode: string
  viewAll: string
  inProgressTitle: string
  inProgressMessage: string
}

interface ContactTranslations {
  badge: string
  title1: string
  title2: string
  subtitle: string
  formTitle: string
  nameLabel: string
  namePlaceholder: string
  emailLabel: string
  subjectLabel: string
  subjectPlaceholder: string
  subjectOptions: {
    project: string
    collaboration: string
    consultation: string
    other: string
  }
  messageLabel: string
  messagePlaceholder: string
  submitButton: string
  submitting: string
  alerts: {
    missingTitle: string
    missingMessage: string
    invalidEmailTitle: string
    invalidEmailMessage: string
    successTitle: string
    successMessage: string
    failedTitle: string
    failedMessage: string
  }
  info: {
    email: string
    phone: string
    location: string
    locationValue: string
  }
}

interface FooterTranslations {
  title: string
  subtitle: string
  copyright: string
}

interface AppTranslations {
  nav: {
    home: string
    about: string
    skills: string
    services: string
    projects: string
    contact: string
  }
  hero: HeroTranslations
  about: AboutTranslations
  skills: SkillsTranslations
  services: ServicesTranslations
  projects: ProjectsTranslations
  contact: ContactTranslations
  footer: FooterTranslations
}

interface TechnicalSkillCard {
  name: string
  subtitle: string
  icon: string
  progress: number
}

interface SoftSkill {
  name: string
  subtitle: string
  level: string
  progress: number
  icon: string
}

interface ServiceItem {
  id: number
  title: string
  description: string
  icon: string
  features: string[]
}

interface ProjectItem {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  demoUrl?: string
  codeUrl?: string
  category: string
  featured?: boolean
}

interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}

const isDarkMode = ref(true)
const isMobileMenuOpen = ref(false)
const currentLanguage = ref<LanguageCode>('en')
const activeSection = ref('hero')
const viewportWidth = ref(window.innerWidth)
const isAllProjectsVisible = ref(false)
const isSubmitting = ref(false)

const contactForm = reactive<ContactForm>({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const notification = reactive({
  show: false,
  type: 'error',
  title: '',
  message: ''
})

let notificationTimer: number | null = null

const translations: Record<LanguageCode, AppTranslations> = {
  vi: {
    nav: {
      home: 'Trang Chủ',
      about: 'Về Tôi',
      skills: 'Kỹ Năng',
      services: 'Dịch Vụ',
      projects: 'Dự Án',
      contact: 'Liên Hệ'
    },
    hero: {
      greeting: '👋 Xin chào, tôi là Phan Quốc Thái',
      title1: 'UI/UX Designer',
      title2: '& Developer',
      subtitle1: 'Chuyên về',
      description: 'Tôi tạo ra những ứng dụng web hiện đại, phản hồi nhanh với thiết kế đẹp mắt và trải nghiệm người dùng tuyệt vời.',
      cta1: 'Thuê Tôi Ngay'
    },
    about: {
      title: 'Về Tôi',
      description: 'Xin chào! Tôi là một UI/UX Designer tập trung vào việc tạo ra những trải nghiệm người dùng trực quan, hiện đại và dễ sử dụng. Tôi làm việc chủ yếu với Figma để nghiên cứu người dùng, xây dựng wireframe, prototype và thiết kế giao diện hoàn chỉnh. Bên cạnh đó, tôi phát triển frontend với Vue.js, TypeScript và Tailwind CSS nhằm hiện thực hóa các thiết kế thành sản phẩm web mượt mà, nhất quán và tối ưu trải nghiệm người dùng. Tôi luôn chú trọng vào tính logic trong thiết kế, khả năng sử dụng thực tế và không ngừng học hỏi để nâng cao kỹ năng của mình qua từng dự án.',
      years: 'Năm Kinh Nghiệm',
      projects: 'Dự Án Hoàn Thành'
    },
    skills: {
      badge: 'Kỹ Năng Của Tôi',
      title1: 'Kỹ Năng',
      title2: 'Chuyên Môn',
      subtitle: 'Tập hợp các kỹ năng kỹ thuật và chuyên môn giúp tôi tạo ra những sản phẩm chất lượng cao.'
    },
    services: {
      badge: 'Dịch Vụ Của Tôi',
      title1: 'Giải Pháp',
      title2: 'Chuyên Nghiệp',
      subtitle: 'Tôi cung cấp các dịch vụ phát triển web toàn diện, từ thiết kế giao diện đến triển khai backend.'
    },
    projects: {
      badge: 'Dự Án Của Tôi',
      title1: 'Các',
      title2: 'Dự Án',
      subtitle: 'Khám phá các dự án mà tôi đã hoàn thành, từ ý tưởng ban đầu đến sản phẩm hoàn chỉnh.',
      viewDemo: 'Xem Demo',
      viewCode: 'Xem Code',
      viewAll: 'Xem Tất Cả Dự Án',
      inProgressTitle: 'Dự án chưa hoàn thành',
      inProgressMessage: 'Dự án này vẫn đang được hoàn thiện.'
    },
    contact: {
      badge: 'Liên Hệ Với Tôi',
      title1: 'Hãy',
      title2: 'Bắt Đầu',
      subtitle: 'Có một ý tưởng tuyệt vời? Hãy liên hệ với tôi để thảo luận về dự án của bạn và nhận báo giá miễn phí.',
      formTitle: 'Gửi Tin Nhắn',
      nameLabel: 'Họ và Tên',
      namePlaceholder: 'Nhập họ và tên của bạn',
      emailLabel: 'Email',
      subjectLabel: 'Chủ Đề',
      subjectPlaceholder: 'Chọn chủ đề...',
      subjectOptions: {
        project: 'Dự án mới',
        collaboration: 'Hợp tác',
        consultation: 'Tư vấn',
        other: 'Khác'
      },
      messageLabel: 'Tin Nhắn',
      messagePlaceholder: 'Hãy mô tả chi tiết về dự án hoặc yêu cầu của bạn...',
      submitButton: 'Gửi Tin Nhắn',
      submitting: 'Đang gửi...',
      alerts: {
        missingTitle: 'Thiếu thông tin',
        missingMessage: 'Vui lòng điền đầy đủ các trường bắt buộc.',
        invalidEmailTitle: 'Email không hợp lệ',
        invalidEmailMessage: 'Vui lòng nhập đúng định dạng email.',
        successTitle: 'Gửi thành công',
        successMessage: 'Tin nhắn của bạn đã được gửi thành công!',
        failedTitle: 'Gửi thất bại',
        failedMessage: 'Có lỗi xảy ra. Vui lòng thử lại sau.'
      },
      info: {
        email: 'Email',
        phone: 'Điện Thoại',
        location: 'Vị Trí',
        locationValue: 'Cần Thơ, Việt Nam'
      }
    },
    footer: {
      title: 'Kết nối với tôi',
      subtitle: 'Theo dõi tôi trên mạng xã hội',
      copyright: '© 2026 Phan Quốc Thái. Mọi quyền được bảo lưu.'
    }
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      skills: 'Skills',
      services: 'Services',
      projects: 'Projects',
      contact: 'Contact'
    },
    hero: {
      greeting: '👋 Hello, I am Phan Quoc Thai',
      title1: 'UI/UX Designer',
      title2: '& Developer',
      subtitle1: 'Specialized in',
      description: 'I create modern, responsive web applications with beautiful designs and excellent user experiences.',
      cta1: 'Hire Me Now'
    },
    about: {
      title: 'About Me',
      description: 'Hello! I am a UI/UX Designer who focuses on creating intuitive, modern, and user-friendly digital experiences. I primarily work with Figma to conduct user research, build wireframes, prototypes, and complete interface designs. Alongside design, I develop frontend applications using Vue.js, TypeScript and Tailwind CSS to bring designs to life with smooth interactions and consistent user experiences.',
      years: 'Years of Experience',
      projects: 'Completed Projects'
    },
    skills: {
      badge: 'My Skills',
      title1: 'Professional',
      title2: 'Skills',
      subtitle: 'A refined mix of design and development skills focused on polished, high-performing experiences.'
    },
    services: {
      badge: 'My Services',
      title1: 'Professional',
      title2: 'Solutions',
      subtitle: 'I provide comprehensive web development services, from interface design to backend deployment.'
    },
    projects: {
      badge: 'My Projects',
      title1: 'Recent',
      title2: 'Projects',
      subtitle: 'Explore the projects I have completed, from initial concept to final product.',
      viewDemo: 'View Demo',
      viewCode: 'View Code',
      viewAll: 'View All Projects',
      inProgressTitle: 'Project not completed',
      inProgressMessage: 'This project is still in progress.'
    },
    contact: {
      badge: 'Contact Me',
      title1: "Let's",
      title2: 'Get Started',
      subtitle: 'Have a great idea? Contact me to discuss your project and get a free quote.',
      formTitle: 'Send Message',
      nameLabel: 'Full Name',
      namePlaceholder: 'Enter your full name',
      emailLabel: 'Email',
      subjectLabel: 'Subject',
      subjectPlaceholder: 'Choose a subject...',
      subjectOptions: {
        project: 'New project',
        collaboration: 'Collaboration',
        consultation: 'Consultation',
        other: 'Other'
      },
      messageLabel: 'Message',
      messagePlaceholder: 'Please describe your project or request in detail...',
      submitButton: 'Send Message',
      submitting: 'Sending...',
      alerts: {
        missingTitle: 'Missing information',
        missingMessage: 'Please fill in all required fields.',
        invalidEmailTitle: 'Invalid email',
        invalidEmailMessage: 'Please enter a valid email address.',
        successTitle: 'Sent successfully',
        successMessage: 'Your message has been sent successfully!',
        failedTitle: 'Send failed',
        failedMessage: 'Something went wrong. Please try again later.'
      },
      info: {
        email: 'Email',
        phone: 'Phone',
        location: 'Location',
        locationValue: 'Can Tho, Vietnam'
      }
    },
    footer: {
      title: "Let's Connect",
      subtitle: 'Follow me on social media',
      copyright: '© 2026 Phan Quoc Thai. All rights reserved.'
    }
  }
}

const servicesData: Record<LanguageCode, ServiceItem[]> = {
  vi: [
    {
      id: 1,
      title: 'UX UI Designer',
      description: 'Thiết kế giao diện người dùng đẹp mắt và trải nghiệm người dùng tối ưu với các công cụ như Figma, Framer và Adobe XD.',
      icon: 'fas fa-paint-brush',
      features: [
        'Thiết kế giao diện người dùng hiện đại',
        'Tối ưu hóa trải nghiệm người dùng',
        'Sử dụng các công cụ thiết kế hàng đầu',
        'Tạo mẫu tương tác và nguyên mẫu'
      ]
    },
    {
      id: 2,
      title: 'Phát Triển Frontend',
      description: 'Xây dựng giao diện người dùng hiện đại, phản hồi nhanh với Vue.js, React và các công nghệ web mới nhất.',
      icon: 'fas fa-laptop-code',
      features: [
        'Thiết kế giao diện responsive hoàn hảo',
        'Tối ưu hiệu suất và tốc độ tải trang',
        'Hỗ trợ trình duyệt chéo',
        'Code có cấu trúc và dễ bảo trì'
      ]
    },
    {
      id: 3,
      title: 'Phát Triển Web',
      description: 'Xây dựng ứng dụng web mạnh mẽ và có khả năng mở rộng với Node.js, Express và các công nghệ hiện đại.',
      icon: 'fas fa-server',
      features: [
        'Phát triển ứng dụng web hiệu quả',
        'Tối ưu hóa hiệu suất và tốc độ tải trang',
        'Tích hợp API và dịch vụ bên thứ ba',
        'Bảo mật và bảo trì ứng dụng'
      ]
    }
  ],
  en: [
    {
      id: 1,
      title: 'UX UI Design',
      description: 'Design beautiful user interfaces and optimize user experience with tools like Figma, Framer and Adobe XD.',
      icon: 'fas fa-paint-brush',
      features: [
        'Modern user interface design',
        'User experience optimization',
        'Use leading design tools',
        'Create interactive mockups and prototypes'
      ]
    },
    {
      id: 2,
      title: 'Frontend Development',
      description: 'Build modern, responsive user interfaces with Vue.js, React and the latest web technologies.',
      icon: 'fas fa-laptop-code',
      features: [
        'Perfect responsive interface design',
        'Performance and loading speed optimization',
        'Cross-browser support',
        'Structured and maintainable code'
      ]
    },
    {
      id: 3,
      title: 'Web Development',
      description: 'Build powerful and scalable web applications with Node.js, Express and modern technologies.',
      icon: 'fas fa-server',
      features: [
        'Efficient web application development',
        'Performance and loading speed optimization',
        'Third-party API and service integration',
        'Application security and maintenance'
      ]
    }
  ]
}

const projectsData: Record<LanguageCode, ProjectItem[]> = {
  vi: [
    {
      id: 1,
      title: 'Hệ Thống Quản Lý Cửa Hàng Trực Tuyến',
      description: 'Ứng dụng thương mại điện tử với Vue.js và Node.js, hỗ trợ quản lý sản phẩm, đơn hàng và thanh toán trực tuyến.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
      tags: ['Vue.js', 'Node.js', 'MongoDB', 'Stripe'],
      demoUrl: 'https://example-ecommerce.com',
      codeUrl: 'https://github.com/your-repo',
      category: 'ecommerce',
      featured: true
    },
    {
      id: 2,
      title: 'Dashboard Quản Lý Dự Án',
      description: 'Dashboard quản lý dự án với biểu đồ tương tác, quản lý nhiệm vụ và thống kê hiệu suất theo thời gian thực.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      tags: ['React', 'TypeScript', 'D3.js', 'PostgreSQL'],
      demoUrl: 'https://example-dashboard.com',
      codeUrl: 'https://github.com/your-repo',
      category: 'dashboard',
      featured: true
    },
    {
      id: 3,
      title: 'Ứng Dụng Ghi Chú Thông Minh',
      description: 'Ứng dụng ghi chú với AI tích hợp, hỗ trợ tóm tắt nội dung, tìm kiếm thông minh và đồng bộ đa nền tảng.',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop',
      tags: ['Vue.js', 'Python', 'FastAPI', 'OpenAI'],
      demoUrl: 'https://example-notes.com',
      codeUrl: 'https://github.com/your-repo',
      category: 'web'
    }
  ],
  en: [
    {
      id: 1,
      title: 'Online Store Management System',
      description: 'E-commerce application with Vue.js and Node.js, supporting product management, orders and online payments.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
      tags: ['Vue.js', 'Node.js', 'MongoDB', 'Stripe'],
      demoUrl: 'https://example-ecommerce.com',
      codeUrl: 'https://github.com/your-repo',
      category: 'ecommerce',
      featured: true
    },
    {
      id: 2,
      title: 'Project Management Dashboard',
      description: 'Project management dashboard with interactive charts, task management and real-time performance statistics.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      tags: ['React', 'TypeScript', 'D3.js', 'PostgreSQL'],
      demoUrl: 'https://example-dashboard.com',
      codeUrl: 'https://github.com/your-repo',
      category: 'dashboard',
      featured: true
    },
    {
      id: 3,
      title: 'Smart Note Taking App',
      description: 'Note-taking app with integrated AI, supporting content summarization, smart search and cross-platform sync.',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop',
      tags: ['Vue.js', 'Python', 'FastAPI', 'OpenAI'],
      demoUrl: 'https://example-notes.com',
      codeUrl: 'https://github.com/your-repo',
      category: 'web'
    }
  ]
}

const t = computed(() => translations[currentLanguage.value])

const currentNavigationItems = computed<NavigationItem[]>(() => [
  { id: 'hero', label: t.value.nav.home },
  { id: 'about', label: t.value.nav.about },
  { id: 'skills', label: t.value.nav.skills },
  { id: 'services', label: t.value.nav.services },
  { id: 'projects', label: t.value.nav.projects },
  { id: 'contact', label: t.value.nav.contact }
])

const aboutHighlights = computed(() => ['User Research', 'UI Design', 'Frontend Dev'])

const skillsPanelText = computed(() => (
  currentLanguage.value === 'vi'
    ? {
        technicalTitle: 'Kỹ năng kỹ thuật',
        professionalTitle: 'Kỹ năng mềm',
        technicalSubtitle: 'Thiết kế + phát triển UI hiện đại',
        professionalSubtitle: 'Tư duy và khả năng phối hợp'
      }
    : {
        technicalTitle: 'Technical Skills',
        professionalTitle: 'Soft Skills',
        technicalSubtitle: 'Design + modern UI development',
        professionalSubtitle: 'Mindset & collaborative execution'
      }
))

const technicalSkillCards = computed<TechnicalSkillCard[]>(() => (
  currentLanguage.value === 'vi'
    ? [
        { name: 'Figma', subtitle: 'Thiết kế UI/UX', icon: 'fab fa-figma', progress: 94 },
        { name: 'Design System', subtitle: 'Hệ thống thiết kế', icon: 'fas fa-palette', progress: 90 },
        { name: 'HTML/CSS', subtitle: 'Frontend', icon: 'fab fa-html5', progress: 95 },
        { name: 'JavaScript', subtitle: 'Logic tương tác', icon: 'fab fa-js', progress: 91 },
        { name: 'Tailwind CSS', subtitle: 'Tạo kiểu UI', icon: 'fas fa-wind', progress: 93 },
        { name: 'Vue.js', subtitle: 'Framework', icon: 'fab fa-vuejs', progress: 92 },
        { name: 'TypeScript', subtitle: 'JavaScript có kiểu', icon: 'fas fa-code', progress: 88 },
        { name: 'MongoDB', subtitle: 'Cơ sở dữ liệu', icon: 'fas fa-database', progress: 84 },
        { name: 'Git', subtitle: 'Quản lý phiên bản', icon: 'fab fa-git-alt', progress: 89 },
        { name: 'Microsoft Office', subtitle: 'Tài liệu & báo cáo', icon: 'fas fa-file-lines', progress: 86 }
      ]
    : [
        { name: 'Figma', subtitle: 'UI/UX Design', icon: 'fab fa-figma', progress: 94 },
        { name: 'Design System', subtitle: 'Visual System', icon: 'fas fa-palette', progress: 90 },
        { name: 'HTML/CSS', subtitle: 'Frontend', icon: 'fab fa-html5', progress: 95 },
        { name: 'JavaScript', subtitle: 'Interaction Logic', icon: 'fab fa-js', progress: 91 },
        { name: 'Tailwind CSS', subtitle: 'UI Styling', icon: 'fas fa-wind', progress: 93 },
        { name: 'Vue.js', subtitle: 'Framework', icon: 'fab fa-vuejs', progress: 92 },
        { name: 'TypeScript', subtitle: 'Typed JS', icon: 'fas fa-code', progress: 88 },
        { name: 'MongoDB', subtitle: 'Database', icon: 'fas fa-database', progress: 84 },
        { name: 'Git', subtitle: 'Version Control', icon: 'fab fa-git-alt', progress: 89 },
        { name: 'Microsoft Office', subtitle: 'Docs & Reporting', icon: 'fas fa-file-lines', progress: 86 }
      ]
))

const softSkills = computed<SoftSkill[]>(() => (
  currentLanguage.value === 'vi'
    ? [
        { name: 'Giao tiếp', subtitle: 'Diễn đạt rõ ràng', level: 'Tốt', progress: 90, icon: 'fas fa-comments' },
        { name: 'Làm việc nhóm', subtitle: 'Phối hợp đa vai trò', level: 'Nâng cao', progress: 94, icon: 'fas fa-users' },
        { name: 'Sáng tạo', subtitle: 'Tư duy mới mẻ', level: 'Chuyên gia', progress: 96, icon: 'fas fa-lightbulb' },
        { name: 'Giải quyết vấn đề', subtitle: 'Đưa ra quyết định logic', level: 'Nâng cao', progress: 92, icon: 'fas fa-puzzle-piece' },
        { name: 'Ứng dụng AI hiệu quả', subtitle: 'Tăng năng suất', level: 'Tốt', progress: 90, icon: 'fas fa-robot' }
      ]
    : [
        { name: 'Communication', subtitle: 'Clear articulation', level: 'Strong', progress: 90, icon: 'fas fa-comments' },
        { name: 'Team Work', subtitle: 'Cross-team synergy', level: 'Advanced', progress: 94, icon: 'fas fa-users' },
        { name: 'Creativity', subtitle: 'Fresh ideas', level: 'Expert', progress: 96, icon: 'fas fa-lightbulb' },
        { name: 'Problem Solving', subtitle: 'Logical decisions', level: 'Advanced', progress: 92, icon: 'fas fa-puzzle-piece' },
        { name: 'Using AI Effectively', subtitle: 'Boost productivity', level: 'Strong', progress: 90, icon: 'fas fa-robot' }
      ]
))

const currentServices = computed(() => servicesData[currentLanguage.value])
const currentProjects = computed(() => projectsData[currentLanguage.value])

const projectLimit = computed(() => (viewportWidth.value >= 1024 ? 3 : 2))
const shouldShowProjectToggle = computed(() => currentProjects.value.length > projectLimit.value)
const displayedProjects = computed(() => (
  isAllProjectsVisible.value
    ? currentProjects.value
    : currentProjects.value.slice(0, projectLimit.value)
))

const projectToggleText = computed(() => (
  isAllProjectsVisible.value
    ? (currentLanguage.value === 'vi' ? 'Thu gọn dự án' : 'Show Less Projects')
    : t.value.projects.viewAll
))

watch(shouldShowProjectToggle, (canToggle) => {
  if (!canToggle) {
    isAllProjectsVisible.value = false
  }
})

const updateHtmlClass = () => {
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  localStorage.setItem('darkMode', isDarkMode.value.toString())
  updateHtmlClass()
}

const toggleLanguage = () => {
  currentLanguage.value = currentLanguage.value === 'vi' ? 'en' : 'vi'
  localStorage.setItem('language', currentLanguage.value)
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const handleNavigate = (sectionId: string) => {
  activeSection.value = sectionId
  scrollToSection(sectionId)
  isMobileMenuOpen.value = false
}

const updateActiveSection = () => {
  const sections = ['hero', 'about', 'skills', 'services', 'projects', 'contact']
  const scrollPosition = window.scrollY + 100

  for (const sectionId of sections) {
    const element = document.getElementById(sectionId)
    if (!element) {
      continue
    }

    const { offsetTop, offsetHeight } = element
    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
      activeSection.value = sectionId
      break
    }
  }
}

const updateViewportWidth = () => {
  viewportWidth.value = window.innerWidth
}

const clearNotificationTimer = () => {
  if (notificationTimer) {
    window.clearTimeout(notificationTimer)
    notificationTimer = null
  }
}

const closeNotification = () => {
  notification.show = false
  clearNotificationTimer()
}

const showNotification = (type: 'error' | 'success', title: string, message: string, duration = 4200) => {
  notification.type = type
  notification.title = title
  notification.message = message
  notification.show = true
  clearNotificationTimer()

  notificationTimer = window.setTimeout(() => {
    notification.show = false
    notificationTimer = null
  }, duration)
}

const isPlaceholderProjectUrl = (url = '') => {
  const normalizedUrl = url.trim().toLowerCase()
  return normalizedUrl === 'https://github.com/your-repo' ||
    normalizedUrl.startsWith('https://example-') ||
    normalizedUrl === 'https://example.com'
}

const isProjectIncomplete = (project: ProjectItem) => (
  isPlaceholderProjectUrl(project.demoUrl || '') ||
  isPlaceholderProjectUrl(project.codeUrl || '')
)

const openProjectLink = (project: ProjectItem, linkType: 'demo' | 'code') => {
  const url = linkType === 'code' ? project.codeUrl : project.demoUrl
  if (!url) {
    return
  }

  if (isProjectIncomplete(project)) {
    showNotification(
      'error',
      t.value.projects.inProgressTitle,
      t.value.projects.inProgressMessage
    )
    return
  }

  window.open(url, '_blank', 'noopener,noreferrer')
}

const toggleProjectsView = () => {
  isAllProjectsVisible.value = !isAllProjectsVisible.value
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const handleSubmit = async () => {
  const formData = {
    name: contactForm.name.trim(),
    email: contactForm.email.trim(),
    subject: contactForm.subject.trim(),
    message: contactForm.message.trim()
  }

  if (!formData.name || !formData.email || !formData.subject || !formData.message) {
    showNotification(
      'error',
      t.value.contact.alerts.missingTitle,
      t.value.contact.alerts.missingMessage
    )
    return
  }

  if (!emailPattern.test(formData.email)) {
    showNotification(
      'error',
      t.value.contact.alerts.invalidEmailTitle,
      t.value.contact.alerts.invalidEmailMessage
    )
    return
  }

  Object.assign(contactForm, formData)
  isSubmitting.value = true

  try {
    await new Promise((resolve) => setTimeout(resolve, 1400))

    Object.keys(contactForm).forEach((key) => {
      contactForm[key as keyof ContactForm] = ''
    })

    showNotification(
      'success',
      t.value.contact.alerts.successTitle,
      t.value.contact.alerts.successMessage
    )
  } catch (_error) {
    showNotification(
      'error',
      t.value.contact.alerts.failedTitle,
      t.value.contact.alerts.failedMessage
    )
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  const savedDarkMode = localStorage.getItem('darkMode')
  isDarkMode.value = savedDarkMode === null ? true : savedDarkMode === 'true'
  updateHtmlClass()

  const savedLanguage = localStorage.getItem('language')
  if (savedLanguage === 'vi' || savedLanguage === 'en') {
    currentLanguage.value = savedLanguage
  }

  window.addEventListener('scroll', updateActiveSection)
  window.addEventListener('resize', updateViewportWidth)
  updateActiveSection()
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateActiveSection)
  window.removeEventListener('resize', updateViewportWidth)
  clearNotificationTimer()
})
</script>
