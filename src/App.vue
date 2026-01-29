<template>
  <div id="app" :class="{ 'dark': isDarkMode }" class="min-h-screen transition-colors duration-300">
    <!-- Background Pattern -->
    <div class="fixed inset-0 -z-10">
      <div class="absolute inset-0 bg-white dark:bg-dark-bg"></div>
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgb(0,0,0,0.05)_1px,transparent_0)] dark:bg-[radial-gradient(circle_at_1px_1px,rgb(255,255,255,0.05)_1px,transparent_0)] [background-size:2rem_2rem]"></div>
    </div>

    <!-- Navigation -->
    <Navbar 
      :is-dark-mode="isDarkMode" 
      @toggle-dark-mode="toggleDarkMode"
      @scroll-to-section="scrollToSection"
    />

    <!-- Hero Section -->
    <section id="hero" class="min-h-screen flex items-center">
      <HeroSection @scroll-to-contact="scrollToContact" />
    </section>

    <!-- About Section -->
    <section id="about" class="py-20 lg:py-32">
      <div class="container mx-auto px-4 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-16 items-center">
          <div class="space-y-6">
            <h2 class="text-4xl lg:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Về Tôi
            </h2>
            <p class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Xin chào! Tôi là một nhà phát triển web với niềm đam mê tạo ra những trải nghiệm kỹ thuật số đẹp mắt và chức năng. Với nhiều năm kinh nghiệm trong lĩnh vực này, tôi chuyên về phát triển frontend với Vue.js, TypeScript và Tailwind CSS.
            </p>
            <p class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Tôi tin vào việc viết code sạch, có thể bảo trì và tạo ra giao diện người dùng phản hồi nhanh mang lại giá trị thực sự cho người dùng.
            </p>
            <div class="grid grid-cols-2 gap-8 pt-4">
              <div class="text-center">
                <div class="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  {{ experienceYears }}+
                </div>
                <div class="text-sm text-gray-500 dark:text-gray-400 mt-1">Năm Kinh Nghiệm</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  {{ completedProjects }}+
                </div>
                <div class="text-sm text-gray-500 dark:text-gray-400 mt-1">Dự Án Hoàn Thành</div>
              </div>
            </div>
          </div>
          <div class="relative">
            <div class="aspect-square rounded-3xl bg-gradient-primary p-1">
              <div class="bg-white dark:bg-dark-card rounded-3xl p-8 h-full flex items-center justify-center">
                <div class="text-center space-y-4">
                  <div class="w-24 h-24 mx-auto bg-gradient-primary rounded-full flex items-center justify-center">
                    <i class="fas fa-code text-white text-3xl"></i>
                  </div>
                  <h3 class="text-xl font-semibold text-gray-800 dark:text-white">Full Stack Developer</h3>
                  <p class="text-gray-600 dark:text-gray-300">Chuyên về Vue.js & TypeScript</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section id="services" class="py-20 lg:py-32 bg-gray-50 dark:bg-dark-bg-secondary">
      <Services />
    </section>

    <!-- Projects Section -->
    <section id="projects" class="py-20 lg:py-32">
      <Projects />
    </section>

    <!-- Contact Section -->
    <section id="contact" class="py-20 lg:py-32 bg-gray-50 dark:bg-dark-bg-secondary">
      <Contact />
    </section>

    <!-- Footer -->
    <footer class="py-8 border-t border-gray-200 dark:border-dark-border">
      <div class="container mx-auto px-4 lg:px-8 text-center">
        <p class="text-gray-600 dark:text-gray-400">
          © 2024 Portfolio. Thiết kế và phát triển bởi 
          <span class="bg-gradient-primary bg-clip-text text-transparent font-semibold">Bạn</span>
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import Navbar from './components/Navbar.vue'
import HeroSection from './components/HeroSection.vue'
import Services from './components/Services.vue'
import Projects from './components/Projects.vue'
import Contact from './components/Contact.vue'

// Dark mode state
const isDarkMode = ref(false)

// Counter states
const experienceYears = ref(0)
const completedProjects = ref(0)

// Counter animation
let counterInterval: number | null = null

// Dark mode toggle
const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  localStorage.setItem('darkMode', isDarkMode.value.toString())
  updateHtmlClass()
}

// Update HTML class for dark mode
const updateHtmlClass = () => {
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

// Scroll to section
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

// Scroll to contact
const scrollToContact = () => {
  scrollToSection('contact')
}

// Counter animation
const animateCounters = () => {
  const targetExperience = 5
  const targetProjects = 50
  
  let expCount = 0
  let projCount = 0
  
  counterInterval = setInterval(() => {
    if (expCount < targetExperience) {
      expCount++
      experienceYears.value = expCount
    }
    if (projCount < targetProjects) {
      projCount += 2
      completedProjects.value = Math.min(projCount, targetProjects)
    }
    
    if (expCount >= targetExperience && projCount >= targetProjects) {
      if (counterInterval) clearInterval(counterInterval)
    }
  }, 100)
}

// Initialize dark mode from localStorage
onMounted(() => {
  const savedDarkMode = localStorage.getItem('darkMode')
  isDarkMode.value = savedDarkMode === 'true'
  updateHtmlClass()
  
  // Start counter animation after a short delay
  setTimeout(animateCounters, 1000)
})

onUnmounted(() => {
  if (counterInterval) clearInterval(counterInterval)
})
</script>

<style scoped>
/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #8B5CF6, #EC4899);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #7C3AED, #DB2777);
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Selection color */
::selection {
  background: rgba(139, 92, 246, 0.3);
}

.dark ::selection {
  background: rgba(139, 92, 246, 0.5);
}
</style>