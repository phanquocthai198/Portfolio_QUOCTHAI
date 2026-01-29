<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-dark-bg/80 backdrop-blur-lg border-b border-gray-200 dark:border-dark-border transition-all duration-300">
    <div class="container mx-auto px-4 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <a href="#hero" @click.prevent="$emit('scroll-to-section', 'hero')" class="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent hover:opacity-80 transition-opacity">
            Portfolio
          </a>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:block">
          <div class="flex items-center space-x-8">
            <a 
              v-for="item in navigationItems" 
              :key="item.id"
              :href="`#${item.id}`"
              @click.prevent="$emit('scroll-to-section', item.id)"
              class="text-gray-700 dark:text-gray-300 hover:text-gradient-purple dark:hover:text-gradient-pink transition-colors duration-200 font-medium"
              :class="{ 'bg-gradient-primary bg-clip-text text-transparent': activeSection === item.id }"
            >
              {{ item.label }}
            </a>
          </div>
        </div>

        <!-- Dark Mode Toggle & Mobile Menu Button -->
        <div class="flex items-center space-x-4">
          <!-- Dark Mode Toggle -->
          <button
            @click="$emit('toggle-dark-mode')"
            class="p-2 rounded-lg bg-gray-100 dark:bg-dark-card hover:bg-gray-200 dark:hover:bg-dark-border transition-colors duration-200"
            :aria-label="isDarkMode ? 'Tắt chế độ tối' : 'Bật chế độ tối'"
          >
            <i 
              :class="isDarkMode ? 'fas fa-sun text-yellow-500' : 'fas fa-moon text-gray-600'"
              class="w-5 h-5"
            ></i>
          </button>

          <!-- Mobile Menu Button -->
          <button
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-dark-card hover:bg-gray-200 dark:hover:bg-dark-border transition-colors duration-200"
            aria-label="Chuyển đổi menu di động"
          >
            <i 
              :class="isMobileMenuOpen ? 'fas fa-times' : 'fas fa-bars'"
              class="w-5 h-5 text-gray-700 dark:text-gray-300"
            ></i>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-4"
      >
        <div v-if="isMobileMenuOpen" class="md:hidden border-t border-gray-200 dark:border-dark-border">
          <div class="py-4 space-y-2">
            <a
              v-for="item in navigationItems"
              :key="item.id"
              :href="`#${item.id}`"
              @click.prevent="handleMobileNavigation(item.id)"
              class="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gradient-purple dark:hover:text-gradient-pink hover:bg-gray-100 dark:hover:bg-dark-card rounded-lg transition-all duration-200 font-medium"
              :class="{ 'bg-gradient-primary bg-clip-text text-transparent': activeSection === item.id }"
            >
              {{ item.label }}
            </a>
          </div>
        </div>
      </Transition>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Props {
  isDarkMode: boolean
}

interface Emits {
  (e: 'toggle-dark-mode'): void
  (e: 'scroll-to-section', sectionId: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Mobile menu state
const isMobileMenuOpen = ref(false)

// Active section state
const activeSection = ref('hero')

// Navigation items (Vietnamese)
const navigationItems = [
  { id: 'hero', label: 'Trang Chủ' },
  { id: 'about', label: 'Về Tôi' },
  { id: 'services', label: 'Dịch Vụ' },
  { id: 'projects', label: 'Dự Án' },
  { id: 'contact', label: 'Liên Hệ' }
]

// Handle mobile navigation
const handleMobileNavigation = (sectionId: string) => {
  isMobileMenuOpen.value = false
  emit('scroll-to-section', sectionId)
}

// Update active section based on scroll position
const updateActiveSection = () => {
  const sections = navigationItems.map(item => item.id)
  const scrollPosition = window.scrollY + 100

  for (const sectionId of sections) {
    const element = document.getElementById(sectionId)
    if (element) {
      const { offsetTop, offsetHeight } = element
      if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
        activeSection.value = sectionId
        break
      }
    }
  }
}

// Throttle function for better performance
const throttle = (func: Function, delay: number) => {
  let timeoutId: number | null = null
  let lastExecTime = 0
  
  return (...args: any[]) => {
    const currentTime = Date.now()
    
    if (currentTime - lastExecTime > delay) {
      func(...args)
      lastExecTime = currentTime
    } else {
      if (timeoutId) clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        func(...args)
        lastExecTime = Date.now()
      }, delay - (currentTime - lastExecTime))
    }
  }
}

// Throttled scroll handler
const throttledScrollHandler = throttle(updateActiveSection, 100)

// Lifecycle hooks
onMounted(() => {
  window.addEventListener('scroll', throttledScrollHandler)
  updateActiveSection()
})

onUnmounted(() => {
  window.removeEventListener('scroll', throttledScrollHandler)
})
</script>

<style scoped>
/* Mobile menu overlay effect */
@media (max-width: 767px) {
  nav {
    backdrop-filter: blur(16px);
  }
}

/* Smooth transitions for dark mode */
.dark nav {
  transition: background-color 0.3s ease, border-color 0.3s ease;
}
</style>