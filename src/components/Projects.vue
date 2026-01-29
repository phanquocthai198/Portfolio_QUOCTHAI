<template>
  <div class="container mx-auto px-4 lg:px-8">
    <!-- Section Header -->
    <div class="text-center mb-16">
      <div class="inline-block px-4 py-2 bg-gradient-primary/10 dark:bg-gradient-primary/20 text-gradient-purple dark:text-gradient-pink rounded-full text-sm font-medium mb-4">
        Dự Án Của Tôi
      </div>
      <h2 class="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
        Các <span class="bg-gradient-primary bg-clip-text text-transparent">Dự Án</span> Gần Đây
      </h2>
      <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        Khám phá các dự án mà tôi đã hoàn thành, từ ý tưởng ban đầu đến sản phẩm hoàn chỉnh.
      </p>
    </div>

    <!-- Filter Buttons -->
    <div class="flex flex-wrap justify-center gap-4 mb-12">
      <button
        v-for="category in categories"
        :key="category.id"
        @click="activeCategory = category.id"
        class="px-6 py-2 rounded-full font-medium transition-all duration-300"
        :class="activeCategory === category.id 
          ? 'bg-gradient-primary text-white shadow-lg shadow-gradient-purple/25' 
          : 'bg-white dark:bg-dark-card text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-border border border-gray-200 dark:border-dark-border'"
      >
        {{ category.label }}
      </button>
    </div>

    <!-- Projects Grid -->
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div
        v-for="(project, index) in filteredProjects"
        :key="project.id"
        class="group bg-white dark:bg-dark-card rounded-2xl overflow-hidden border border-gray-200 dark:border-dark-border hover:border-gradient-purple dark:hover:border-gradient-pink transition-all duration-300 hover:shadow-card hover:-translate-y-2 animate-fade-in"
        :style="{ animationDelay: `${index * 0.1}s` }"
      >
        <!-- Project Image -->
        <div class="relative aspect-video overflow-hidden">
          <img
            :src="project.image"
            :alt="project.title"
            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div class="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-center justify-center">
            <div class="flex gap-4">
              <a
                v-if="project.demoUrl"
                :href="project.demoUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="px-4 py-2 bg-white text-gradient-purple dark:text-gradient-pink rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Xem Demo
              </a>
              <a
                v-if="project.githubUrl"
                :href="project.githubUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="px-4 py-2 bg-white/20 text-white rounded-lg font-medium hover:bg-white/30 transition-colors border border-white/30"
              >
                <i class="fab fa-github mr-2"></i> Code
              </a>
            </div>
          </div>
          <div v-if="project.featured" class="absolute top-4 right-4 px-3 py-1 bg-gradient-primary text-white rounded-full text-xs font-medium">
            Nổi Bật
          </div>
        </div>

        <!-- Project Content -->
        <div class="p-6">
          <!-- Project Title -->
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-gradient-purple dark:group-hover:text-gradient-pink transition-colors">
            {{ project.title }}
          </h3>

          <!-- Project Description -->
          <p class="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
            {{ project.description }}
          </p>

          <!-- Tech Tags -->
          <div class="flex flex-wrap gap-2 mb-4">
            <span
              v-for="tag in project.tags.slice(0, 3)"
              :key="tag"
              class="px-3 py-1 bg-gradient-primary/10 text-gradient-purple dark:text-gradient-pink rounded-full text-xs font-medium"
            >
              {{ tag }}
            </span>
            <span
              v-if="project.tags.length > 3"
              class="px-3 py-1 bg-gray-100 dark:bg-dark-border text-gray-600 dark:text-gray-300 rounded-full text-xs font-medium"
            >
              +{{ project.tags.length - 3 }}
            </span>
          </div>

          <!-- Project Footer -->
          <div class="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-dark-border">
            <span class="text-sm text-gray-500 dark:text-gray-400">
              {{ project.category }}
            </span>
            <span v-if="project.completedAt" class="text-sm text-gray-500 dark:text-gray-400">
              {{ formatDate(project.completedAt) }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Load More Button -->
    <div v-if="hasMoreProjects" class="text-center mt-12">
      <button
        @click="loadMoreProjects"
        class="px-8 py-4 bg-gradient-primary text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-gradient-purple/25 transition-all duration-300 transform hover:-translate-y-1"
      >
        Xem Thêm Dự Án
      </button>
    </div>

    <!-- Empty State -->
    <div v-if="filteredProjects.length === 0" class="text-center py-16">
      <div class="w-24 h-24 mx-auto mb-6 bg-gradient-primary/10 rounded-full flex items-center justify-center">
        <i class="fas fa-folder-open text-3xl text-gradient-purple dark:text-gradient-pink"></i>
      </div>
      <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        Không tìm thấy dự án
      </h3>
      <p class="text-gray-600 dark:text-gray-300">
        Không có dự án nào trong danh mục này.
      </p>
    </div>

    <!-- CTA Section -->
    <div class="text-center mt-20">
      <div class="bg-gradient-primary rounded-3xl p-8 lg:p-12 text-white">
        <h3 class="text-2xl lg:text-3xl font-bold mb-4">
          Có Ý Tưởng Cho Dự Án Mới?
        </h3>
        <p class="text-lg mb-8 opacity-90">
          Hãy liên hệ với tôi để thảo luận về dự án của bạn và biến ý tưởng thành hiện thực.
        </p>
        <button
          @click="scrollToContact"
          class="px-8 py-4 bg-white text-gradient-purple dark:text-gradient-pink rounded-xl font-bold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
        >
          Bắt Đầu Dự Án
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Project } from '../types'

// Active category filter
const activeCategory = ref('all')

// Categories (Vietnamese)
const categories = [
  { id: 'all', label: 'Tất Cả' },
  { id: 'web', label: 'Web App' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'ecommerce', label: 'Thương Mại Điện Tử' },
  { id: 'dashboard', label: 'Dashboard' }
]

// Projects data (Vietnamese)
const projects = ref<Project[]>([
  {
    id: 1,
    title: 'Hệ Thống Quản Lý Cửa Hàng Trực Tuyến',
    description: 'Ứng dụng thương mại điện tử với Vue.js và Node.js, hỗ trợ quản lý sản phẩm, đơn hàng và thanh toán trực tuyến.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
    tags: ['Vue.js', 'Node.js', 'MongoDB', 'Stripe'],
    demoUrl: 'https://example-ecommerce.com',
    githubUrl: 'https://github.com/example/ecommerce',
    category: 'ecommerce',
    featured: true,
    completedAt: new Date('2024-01-15')
  },
  {
    id: 2,
    title: 'Dashboard Quản Lý Dự Án',
    description: 'Dashboard quản lý dự án với biểu đồ tương tác, quản lý nhiệm vụ và thống kê hiệu suất theo thời gian thực.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    tags: ['React', 'TypeScript', 'D3.js', 'PostgreSQL'],
    demoUrl: 'https://example-dashboard.com',
    githubUrl: 'https://github.com/example/dashboard',
    category: 'dashboard',
    featured: true,
    completedAt: new Date('2024-02-20')
  },
  {
    id: 3,
    title: 'Ứng Dụng Ghi Chú Thông Minh',
    description: 'Ứng dụng ghi chú với AI tích hợp, hỗ trợ tóm tắt nội dung, tìm kiếm thông minh và đồng bộ đa nền tảng.',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop',
    tags: ['Vue.js', 'Python', 'FastAPI', 'OpenAI'],
    demoUrl: 'https://example-notes.com',
    category: 'web',
    completedAt: new Date('2024-01-10')
  },
  {
    id: 4,
    title: 'Nền Tảng Học Trực Tuyến',
    description: 'Nền tảng học trực tuyến với video streaming, bài tập tương tác và hệ thống theo dõi tiến độ học tập.',
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=600&fit=crop',
    tags: ['Next.js', 'Prisma', 'AWS', 'Video.js'],
    demoUrl: 'https://example-education.com',
    githubUrl: 'https://github.com/example/education',
    category: 'web',
    featured: true,
    completedAt: new Date('2023-12-05')
  },
  {
    id: 5,
    title: 'Ứng Dụng Quản Lý Tài Chính Cá Nhân',
    description: 'App quản lý tài chính cá nhân với biểu đồ chi tiêu, ngân sách thông minh và nhắc nhở thanh toán.',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop',
    tags: ['React Native', 'Firebase', 'Chart.js', 'Node.js'],
    demoUrl: 'https://example-finance.com',
    category: 'mobile',
    completedAt: new Date('2024-02-10')
  },
  {
    id: 6,
    title: 'Hệ Thống Đặt Chỗ Nhà Hàng',
    description: 'Hệ thống đặt chỗ nhà hàng với lịch trình thời gian thực, quản lý bàn và hệ thống thông báo tự động.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop',
    tags: ['Vue.js', 'Laravel', 'MySQL', 'Pusher'],
    demoUrl: 'https://example-restaurant.com',
    category: 'web',
    completedAt: new Date('2023-11-20')
  }
])

// Computed properties
const filteredProjects = computed(() => {
  if (activeCategory.value === 'all') {
    return projects.value
  }
  return projects.value.filter(project => project.category === activeCategory.value)
})

const hasMoreProjects = computed(() => {
  // Logic to determine if there are more projects to load
  return false // For now, we show all projects
})

// Methods
const formatDate = (date: Date) => {
  return date.toLocaleDateString('vi-VN', { 
    month: 'short', 
    year: 'numeric' 
  })
}

const loadMoreProjects = () => {
  // Logic to load more projects (pagination)
  console.log('Loading more projects...')
}

const scrollToContact = () => {
  const contactSection = document.getElementById('contact')
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>