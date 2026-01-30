<template>
  <div class="container mx-auto px-4 lg:px-8">
    <!-- Section Header -->
    <div class="text-center mb-16">
      <div class="inline-block px-4 py-2 bg-gradient-primary/10 dark:bg-gradient-primary/20 text-gradient-purple dark:text-gradient-pink rounded-full text-sm font-medium mb-4">
        Dịch Vụ Của Tôi
      </div>
      <h2 class="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
        Giải Pháp <span class="bg-gradient-primary bg-clip-text text-transparent">Chuyên Nghiệp</span>
      </h2>
      <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        Tôi cung cấp các dịch vụ phát triển web toàn diện, từ thiết kế giao diện đến triển khai backend, đảm bảo sản phẩm của bạn hoàn hảo từ A đến Z.
      </p>
    </div>

    <!-- Services Grid -->
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div
        v-for="(service, index) in services"
        :key="service.id"
        class="group bg-white dark:bg-dark-card rounded-2xl p-8 border border-gray-200 dark:border-dark-border hover:border-gradient-purple dark:hover:border-gradient-pink transition-all duration-300 hover:shadow-card hover:-translate-y-2 animate-fade-in"
        :style="{ animationDelay: `${(index as number) * 0.1}s` }"
      >
        <!-- Service Icon -->
        <div class="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          <i :class="service.icon" class="text-white text-2xl"></i>
        </div>

        <!-- Service Title -->
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">
          {{ service.title }}
        </h3>

        <!-- Service Description -->
        <p class="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
          {{ service.description }}
        </p>

        <!-- Service Features -->
        <ul class="space-y-3 mb-8">
          <li
            v-for="feature in service.features"
            :key="feature"
            class="flex items-center text-sm text-gray-600 dark:text-gray-300"
          >
            <i class="fas fa-check-circle text-gradient-purple dark:text-gradient-pink mr-3"></i>
            {{ feature }}
          </li>
        </ul>

        <!-- Service Footer -->
        <div class="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-dark-border">
          <div class="text-sm text-gray-500 dark:text-gray-400">
            <span v-if="service.duration" class="font-medium">{{ service.duration }}</span>
          </div>
          <button
            @click="selectService(service)"
            class="px-6 py-2 bg-gradient-primary text-white rounded-lg font-medium hover:shadow-lg hover:shadow-gradient-purple/25 transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Tìm Hiểu Thêm
          </button>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="text-center mt-16">
      <div class="bg-gradient-primary rounded-3xl p-8 lg:p-12 text-white">
        <h3 class="text-2xl lg:text-3xl font-bold mb-4">
          Có Dự Án Trong Tâm Trí?
        </h3>
        <p class="text-lg mb-8 opacity-90">
          Hãy liên hệ với tôi để thảo luận về dự án của bạn và nhận báo giá miễn phí.
        </p>
        <button
          @click="scrollToContact"
          class="px-8 py-4 bg-white text-gradient-purple dark:text-gradient-pink rounded-xl font-bold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
        >
          Bắt Đầu Ngay
        </button>
      </div>
    </div>

    <!-- Service Detail Modal -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div v-if="selectedService" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" @click.self="closeModal">
        <div class="bg-white dark:bg-dark-card rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white">
              {{ selectedService.title }}
            </h3>
            <button
              @click="closeModal"
              class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-border transition-colors"
            >
              <i class="fas fa-times text-gray-500 dark:text-gray-400"></i>
            </button>
          </div>
          
          <p class="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            {{ selectedService.description }}
          </p>
          
          <div class="space-y-4 mb-8">
            <h4 class="font-semibold text-gray-900 dark:text-white">Tính năng chính:</h4>
            <ul class="space-y-2">
              <li
                v-for="feature in selectedService.features"
                :key="feature"
                class="flex items-start text-gray-600 dark:text-gray-300"
              >
                <i class="fas fa-check-circle text-gradient-purple dark:text-gradient-pink mr-3 mt-0.5"></i>
                {{ feature }}
              </li>
            </ul>
          </div>
          
          <div class="flex gap-4">
            <button
              @click="scrollToContact"
              class="flex-1 px-6 py-3 bg-gradient-primary text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300"
            >
              Liên Hệ Ngay
            </button>
            <button
              @click="closeModal"
              class="px-6 py-3 border border-gray-300 dark:border-dark-border text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-dark-border transition-colors"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Service } from '../types'

// Selected service for modal
const selectedService = ref<Service | null>(null)

// Services data (Vietnamese)
const services: Service[] = [
  {
    id: 1,
    title: 'Phát Triển Frontend',
    description: 'Xây dựng giao diện người dùng hiện đại, phản hồi nhanh với Vue.js, React và các công nghệ web mới nhất.',
    icon: 'fas fa-laptop-code',
    features: [
      'Thiết kế giao diện responsive hoàn hảo',
      'Tối ưu hiệu suất và tốc độ tải trang',
      'Hỗ trợ trình duyệt chéo',
      'Code có cấu trúc và dễ bảo trì'
    ],
    duration: '2-4 tuần',
    category: 'frontend'
  },
  {
    id: 2,
    title: 'Phát Triển Backend',
    description: 'Xây dựng API mạnh mẽ và có khả năng mở rộng với Node.js, Express và cơ sở dữ liệu hiện đại.',
    icon: 'fas fa-server',
    features: [
      'API RESTful với tài liệu đầy đủ',
      'Xác thực và phân quyền bảo mật',
      'Tối ưu hiệu suất với caching',
      'Tích hợp cơ sở dữ liệu và cloud services'
    ],
    duration: '3-6 tuần',
    category: 'backend'
  },
  {
    id: 3,
    title: 'Ứng Dụng Web Toàn Diện',
    description: 'Phát triển ứng dụng web hoàn chỉnh từ frontend đến backend với kiến trúc hiện đại và bảo mật cao.',
    icon: 'fas fa-globe',
    features: [
      'Phát triển full stack hoàn chỉnh',
      'Thiết kế database và API',
      'Tích hợp thanh toán và third-party services',
      'Triển khai và bảo trì ứng dụng'
    ],
    duration: '6-12 tuần',
    category: 'fullstack'
  },
  {
    id: 4,
    title: 'Thiết Kế UI/UX',
    description: 'Tạo thiết kế giao diện đẹp mắt và trải nghiệm người dùng tuyệt vời với Figma và các công cụ thiết kế hiện đại.',
    icon: 'fas fa-paint-brush',
    features: [
      'Thiết kế wireframes và prototypes',
      'Tạo design system nhất quán',
      'Tối ưu trải nghiệm người dùng',
      'Thiết kế responsive cho mọi thiết bị'
    ],
    duration: '1-2 tuần',
    category: 'design'
  },
  {
    id: 5,
    title: 'Tối Ưu Hiệu Suất',
    description: 'Tối ưu hóa hiệu suất ứng dụng web của bạn để tải nhanh hơn, xử lý mượt mà và cải thiện SEO.',
    icon: 'fas fa-rocket',
    features: [
      'Tối ưu tốc độ tải trang và Core Web Vitals',
      'Nén và lazy loading assets',
      'Caching và CDN configuration',
      'Phân tích và báo cáo hiệu suất'
    ],
    duration: '1-2 tuần',
    category: 'optimization'
  },
  {
    id: 6,
    title: 'Bảo Trì & Hỗ Trợ',
    description: 'Cung cấp dịch vụ bảo trì và hỗ trợ kỹ thuật liên tục để đảm bảo ứng dụng luôn hoạt động ổn định.',
    icon: 'fas fa-tools',
    features: [
      'Cập nhật bảo mật định kỳ',
      'Giám sát và khắc phục lỗi',
      'Backup và recovery dữ liệu',
      'Hỗ trợ kỹ thuật 24/7'
    ],
    category: 'maintenance'
  }
]

// Methods
const selectService = (service: Service) => {
  selectedService.value = service
}

const closeModal = () => {
  selectedService.value = null
}

const scrollToContact = () => {
  const contactSection = document.getElementById('contact')
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' })
  }
  closeModal()
}
</script>

<style scoped>
/* Glass morphism effect */
.shadow-glass {
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

/* Card hover effects */
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

.group:hover .group-hover\:-translate-y-2 {
  transform: translateY(-0.5rem);
}

/* Modal backdrop */
.bg-black\/50 {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>