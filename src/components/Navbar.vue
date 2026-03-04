<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-white/85 dark:bg-[#08090d]/95 backdrop-blur-md border-b border-gray-200 dark:border-white/10 transition-all duration-300">
    <div class="container mx-auto px-4 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex-shrink-0">
          <a href="#hero" @click.prevent="emit('navigate', 'hero')" class="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent hover:opacity-80 transition-opacity">
            QUOC THAI
          </a>
        </div>

        <div class="hidden md:flex items-center space-x-8">
          <a
            v-for="item in navigationItems"
            :key="item.id"
            :href="'#' + item.id"
            @click.prevent="emit('navigate', item.id)"
            class="transition-colors duration-200 font-semibold"
            :class="activeSection === item.id
              ? 'bg-gradient-primary bg-clip-text text-transparent dark:text-transparent'
              : 'text-gray-700 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400'"
          >
            {{ item.label }}
          </a>

          <button
            @click="emit('toggle-language')"
            class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/10 text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors duration-200 font-semibold text-sm"
            :aria-label="currentLanguage === 'vi' ? 'Switch to English' : 'Chuyển sang Tiếng Việt'"
          >
            <img
              :src="currentLanguage === 'vi' ? 'https://flagcdn.com/w20/us.png' : 'https://flagcdn.com/w20/vn.png'"
              alt=""
              aria-hidden="true"
              class="w-4 h-3 object-cover rounded-[2px]"
            />
            <span>{{ currentLanguage === 'vi' ? 'ENG' : 'VIE' }}</span>
          </button>

          <button
            @click="emit('toggle-dark-mode')"
            class="p-2.5 rounded-xl bg-gray-100 dark:bg-white/5 border border-transparent dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors duration-200"
            :aria-label="isDarkMode ? 'Tắt chế độ tối' : 'Bật chế độ tối'"
          >
            <i
              :class="isDarkMode ? 'fas fa-sun text-yellow-500' : 'fas fa-moon text-gray-600'"
              class="w-5 h-5"
            ></i>
          </button>
        </div>

        <div class="flex md:hidden items-center space-x-2">
          <button
            @click="emit('toggle-language')"
            class="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/10 text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors duration-200 font-semibold text-xs"
          >
            <img
              :src="currentLanguage === 'vi' ? 'https://flagcdn.com/w20/us.png' : 'https://flagcdn.com/w20/vn.png'"
              alt=""
              aria-hidden="true"
              class="w-3.5 h-2.5 object-cover rounded-[2px]"
            />
            <span>{{ currentLanguage === 'vi' ? 'ENG' : 'VIE' }}</span>
          </button>

          <button
            @click="emit('toggle-dark-mode')"
            class="p-2 rounded-lg bg-gray-100 dark:bg-white/5 border border-transparent dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors duration-200"
          >
            <i
              :class="isDarkMode ? 'fas fa-sun text-yellow-500' : 'fas fa-moon text-gray-600'"
              class="w-4 h-4"
            ></i>
          </button>

          <button
            @click="emit('toggle-mobile-menu')"
            class="p-2 rounded-lg bg-gray-100 dark:bg-white/5 border border-transparent dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors duration-200"
            :aria-label="isMobileMenuOpen ? 'Close menu' : 'Open menu'"
          >
            <i
              :class="isMobileMenuOpen ? 'fas fa-times' : 'fas fa-bars'"
              class="w-5 h-5 text-gray-700 dark:text-gray-300"
            ></i>
          </button>
        </div>
      </div>

      <div
        v-show="isMobileMenuOpen"
        class="md:hidden py-4 border-t border-gray-200 dark:border-dark-border animate-fade-in"
      >
        <div class="flex flex-col space-y-3">
          <a
            v-for="item in navigationItems"
            :key="item.id"
            :href="'#' + item.id"
            @click.prevent="emit('navigate', item.id)"
            class="hover:bg-gray-100 dark:hover:bg-dark-card px-4 py-2 rounded-lg transition-colors duration-200 font-medium"
            :class="activeSection === item.id
              ? 'bg-gradient-primary bg-clip-text text-transparent dark:text-transparent'
              : 'text-gray-700 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400'"
          >
            {{ item.label }}
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
interface NavigationItem {
  id: string
  label: string
}

defineProps<{
  isDarkMode: boolean
  isMobileMenuOpen: boolean
  currentLanguage: 'vi' | 'en'
  activeSection: string
  navigationItems: NavigationItem[]
}>()

const emit = defineEmits<{
  (e: 'toggle-dark-mode'): void
  (e: 'toggle-language'): void
  (e: 'toggle-mobile-menu'): void
  (e: 'navigate', sectionId: string): void
}>()
</script>
