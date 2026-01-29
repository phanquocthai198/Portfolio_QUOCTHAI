<template>
  <div class="container mx-auto px-4 lg:px-8">
    <!-- Section Header -->
    <div class="text-center mb-16">
      <div class="inline-block px-4 py-2 bg-gradient-primary/10 dark:bg-gradient-primary/20 text-gradient-purple dark:text-gradient-pink rounded-full text-sm font-medium mb-4">
        Liên Hệ Với Tôi
      </div>
      <h2 class="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
        Hãy <span class="bg-gradient-primary bg-clip-text text-transparent">Bắt Đầu</span> Dự Án Của Bạn
      </h2>
      <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        Có một ý tưởng tuyệt vời? Hãy liên hệ với tôi để thảo luận về dự án của bạn và nhận báo giá miễn phí.
      </p>
    </div>

    <div class="grid lg:grid-cols-2 gap-16">
      <!-- Contact Form -->
      <div class="bg-white dark:bg-dark-card rounded-3xl p-8 border border-gray-200 dark:border-dark-border shadow-card">
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Gửi Tin Nhắn
        </h3>
        
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Name Field -->
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Họ và Tên <span class="text-red-500">*</span>
            </label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              required
              class="w-full px-4 py-3 bg-gray-50 dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-gradient-purple focus:border-transparent transition-all duration-200"
              :class="{ 'border-red-500': errors.name }"
              placeholder="Nhập họ và tên của bạn"
            />
            <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
          </div>

          <!-- Email Field -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email <span class="text-red-500">*</span>
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="w-full px-4 py-3 bg-gray-50 dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-gradient-purple focus:border-transparent transition-all duration-200"
              :class="{ 'border-red-500': errors.email }"
              placeholder="email@example.com"
            />
            <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
          </div>

          <!-- Subject Field -->
          <div>
            <label for="subject" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Chủ Đề <span class="text-red-500">*</span>
            </label>
            <select
              id="subject"
              v-model="form.subject"
              required
              class="w-full px-4 py-3 bg-gray-50 dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-gradient-purple focus:border-transparent transition-all duration-200"
              :class="{ 'border-red-500': errors.subject }"
            >
              <option value="">Chọn chủ đề...</option>
              <option value="project">Dự án mới</option>
              <option value="collaboration">Hợp tác</option>
              <option value="consultation">Tư vấn</option>
              <option value="other">Khác</option>
            </select>
            <p v-if="errors.subject" class="mt-1 text-sm text-red-600">{{ errors.subject }}</p>
          </div>

          <!-- Message Field -->
          <div>
            <label for="message" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tin Nhắn <span class="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              v-model="form.message"
              required
              rows="5"
              class="w-full px-4 py-3 bg-gray-50 dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-gradient-purple focus:border-transparent transition-all duration-200 resize-none"
              :class="{ 'border-red-500': errors.message }"
              placeholder="Hãy mô tả chi tiết về dự án hoặc yêu cầu của bạn..."
            ></textarea>
            <p v-if="errors.message" class="mt-1 text-sm text-red-600">{{ errors.message }}</p>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full py-4 bg-gradient-primary text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-gradient-purple/25 transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <span v-if="!isSubmitting">
              Gửi Tin Nhắn
            </span>
            <span v-else class="flex items-center justify-center">
              <i class="fas fa-spinner fa-spin mr-2"></i>
              Đang gửi...
            </span>
          </button>

          <!-- Success Message -->
          <div v-if="submitStatus === 'success'" class="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
            <div class="flex items-center">
              <i class="fas fa-check-circle text-green-600 dark:text-green-400 mr-3"></i>
              <p class="text-green-800 dark:text-green-200">
                Tin nhắn của bạn đã được gửi thành công! Tôi sẽ phản hồi trong vòng 24 giờ.
              </p>
            </div>
          </div>

          <!-- Error Message -->
          <div v-if="submitStatus === 'error'" class="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
            <div class="flex items-center">
              <i class="fas fa-exclamation-circle text-red-600 dark:text-red-400 mr-3"></i>
              <p class="text-red-800 dark:text-red-200">
                Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại sau.
              </p>
            </div>
          </div>
        </form>
      </div>

      <!-- Contact Information -->
      <div class="space-y-8">
        <!-- Contact Info Cards -->
        <div class="grid gap-6">
          <!-- Email Card -->
          <div class="bg-white dark:bg-dark-card rounded-2xl p-6 border border-gray-200 dark:border-dark-border hover:border-gradient-purple dark:hover:border-gradient-pink transition-colors">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mr-4">
                <i class="fas fa-envelope text-white"></i>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 dark:text-white">Email</h4>
                <p class="text-gray-600 dark:text-gray-300">hello@example.com</p>
              </div>
            </div>
          </div>

          <!-- Phone Card -->
          <div class="bg-white dark:bg-dark-card rounded-2xl p-6 border border-gray-200 dark:border-dark-border hover:border-gradient-purple dark:hover:border-gradient-pink transition-colors">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center mr-4">
                <i class="fas fa-phone text-white"></i>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 dark:text-white">Điện Thoại</h4>
                <p class="text-gray-600 dark:text-gray-300">+84 123 456 789</p>
              </div>
            </div>
          </div>

          <!-- Location Card -->
          <div class="bg-white dark:bg-dark-card rounded-2xl p-6 border border-gray-200 dark:border-dark-border hover:border-gradient-purple dark:hover:border-gradient-pink transition-colors">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-gradient-secondary rounded-xl flex items-center justify-center mr-4">
                <i class="fas fa-map-marker-alt text-white"></i>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 dark:text-white">Vị Trí</h4>
                <p class="text-gray-600 dark:text-gray-300">Hồ Chí Minh, Việt Nam</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Social Links -->
        <div class="bg-white dark:bg-dark-card rounded-2xl p-6 border border-gray-200 dark:border-dark-border">
          <h4 class="font-semibold text-gray-900 dark:text-white mb-4">Kết Nối Với Tôi</h4>
          <div class="flex gap-4">
            <a
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center text-white hover:scale-110 transition-transform duration-200"
              :aria-label="`Kết nối với tôi trên ${social.name}`"
            >
              <i :class="social.icon"></i>
            </a>
          </div>
        </div>

        <!-- Response Time Info -->
        <div class="bg-gradient-primary rounded-2xl p-6 text-white">
          <h4 class="font-semibold mb-2">Thời Gian Phản Hồi</h4>
          <p class="text-sm opacity-90 mb-4">
            Tôi cố gắng phản hồi tất cả các tin nhắn trong vòng 24 giờ làm việc.
          </p>
          <div class="text-xs opacity-75">
            Thứ 2 - Thứ 6: 9:00 - 18:00<br>
            Thứ 7: 9:00 - 12:00
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { ContactForm } from '../types'

// Form state
const form = reactive<ContactForm>({
  name: '',
  email: '',
  subject: '',
  message: ''
})

// Form errors
const errors = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

// Submit state
const isSubmitting = ref(false)
const submitStatus = ref<'idle' | 'success' | 'error'>('idle')

// Social links
const socialLinks = [
  { name: 'GitHub', url: 'https://github.com', icon: 'fab fa-github' },
  { name: 'LinkedIn', url: 'https://linkedin.com', icon: 'fab fa-linkedin' },
  { name: 'Twitter', url: 'https://twitter.com', icon: 'fab fa-twitter' },
  { name: 'Email', url: 'mailto:hello@example.com', icon: 'fas fa-envelope' }
]

// Form validation
const validateForm = (): boolean => {
  let isValid = true
  
  // Reset errors
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = ''
  })

  // Validate name
  if (!form.name.trim()) {
    errors.name = 'Vui lòng nhập họ và tên'
    isValid = false
  } else if (form.name.trim().length < 2) {
    errors.name = 'Họ và tên phải có ít nhất 2 ký tự'
    isValid = false
  }

  // Validate email
  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/
  if (!form.email.trim()) {
    errors.email = 'Vui lòng nhập email'
    isValid = false
  } else if (!emailRegex.test(form.email)) {
    errors.email = 'Email không hợp lệ'
    isValid = false
  }

  // Validate subject
  if (!form.subject) {
    errors.subject = 'Vui lòng chọn chủ đề'
    isValid = false
  }

  // Validate message
  if (!form.message.trim()) {
    errors.message = 'Vui lòng nhập tin nhắn'
    isValid = false
  } else if (form.message.trim().length < 10) {
    errors.message = 'Tin nhắn phải có ít nhất 10 ký tự'
    isValid = false
  }

  return isValid
}

// Handle form submission
const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }

  isSubmitting.value = true
  submitStatus.value = 'idle'

  try {
    // Simulate API call - replace with actual API endpoint
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Here you would typically make an API call like:
    // const response = await fetch('/api/contact', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(form)
    // })
    
    // For demo purposes, we'll simulate success
    submitStatus.value = 'success'
    
    // Reset form
    Object.keys(form).forEach(key => {
      form[key as keyof ContactForm] = ''
    })
    
    // Clear success message after 5 seconds
    setTimeout(() => {
      submitStatus.value = 'idle'
    }, 5000)
    
  } catch (error) {
    console.error('Error submitting form:', error)
    submitStatus.value = 'error'
    
    // Clear error message after 5 seconds
    setTimeout(() => {
      submitStatus.value = 'idle'
    }, 5000)
  } finally {
    isSubmitting.value = false
  }
}

const scrollToContact = () => {
  const contactSection = document.getElementById('contact')
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped>
/* Form input focus states */
input:focus, select:focus, textarea:focus {
  outline: none;
}

/* Custom select styling */
select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
}

.dark select {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23d1d5db' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
}

/* Animation for status messages */
.animate-fade-in {
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>