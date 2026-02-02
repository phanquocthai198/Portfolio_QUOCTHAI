<template>
  <div class="min-h-screen flex items-center justify-center relative overflow-hidden">
    <!-- Background Elements -->
    <div class="absolute inset-0 -z-10">
      <!-- Floating shapes -->
      <div
        class="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-primary rounded-full opacity-10 blur-3xl animate-float">
      </div>
      <div
        class="absolute top-3/4 right-1/4 w-48 h-48 bg-gradient-accent rounded-full opacity-10 blur-3xl animate-float"
        style="animation-delay: 1s"></div>
      <div
        class="absolute bottom-1/4 left-1/3 w-32 h-32 bg-gradient-secondary rounded-full opacity-10 blur-3xl animate-float"
        style="animation-delay: 2s"></div>
    </div>

    <div class="container mx-auto px-4 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <!-- Content -->
        <div class="space-y-8 text-center lg:text-left">
          <!-- Greeting -->
          <div class="animate-fade-in">
            <span
              class="inline-block px-4 py-2 bg-gradient-primary/10 dark:bg-gradient-primary/20 text-gradient-purple dark:text-gradient-pink rounded-full text-sm font-medium">
              <!-- Xin chào, tôi là Phan Quốc Thái -->
            </span>
          </div>

          <!-- Main Heading -->
          <div class="space-y-4 animate-slide-up">
            <h1 class="text-5xl lg:text-7xl font-bold leading-tight">
              <span class="text-gray-900 dark:text-white">UX/UI Designer</span>
              <br />
              <span class="bg-gradient-primary bg-clip-text text-transparent">
                Developer
              </span>
            </h1>
            <p class="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 font-light">
              Chuyên về
              <span class="text-gradient-purple dark:text-gradient-pink font-medium">Vue.js</span>
              &
              <span class="text-gradient-orange dark:text-gradient-accent font-medium">TypeScript</span>
            </p>
          </div>

          <!-- Description -->
          <div class="animate-slide-up" style="animation-delay: 0.2s">
            <p class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Tôi tạo ra những ứng dụng web hiện đại, phản hồi nhanh với thiết
              kế đẹp mắt và trải nghiệm người dùng tuyệt vời. Từ ý tưởng đến
              triển khai, tôi biến tầm nhìn của bạn thành hiện thực.
            </p>
          </div>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slide-up"
            style="animation-delay: 0.4s">
            <button @click="scrollToContact"
              class="px-8 py-4 bg-gradient-primary text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-gradient-purple/25 transition-all duration-300 transform hover:-translate-y-1">
              Thuê Tôi Ngay
            </button>
            <button @click="scrollToProjects"
              class="px-8 py-4 border-2 border-gradient-purple text-gradient-purple dark:text-gradient-pink rounded-xl font-semibold hover:bg-gradient-primary hover:text-white hover:border-transparent transition-all duration-300">
              Xem Dự Án
            </button>
          </div>

          <!-- Stats -->
          <div class="grid grid-cols-3 gap-8 pt-8 animate-slide-up" style="animation-delay: 0.6s">
            <div class="text-center">
              <div class="text-2xl lg:text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                5+
              </div>
              <div class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Năm Kinh Nghiệm
              </div>
            </div>
            <div class="text-center">
              <div class="text-2xl lg:text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                50+
              </div>
              <div class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Dự Án Hoàn Thành
              </div>
            </div>
            <div class="text-center">
              <div class="text-2xl lg:text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                100%
              </div>
              <div class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Khách Hàng Hài Lòng
              </div>
            </div>
          </div>
        </div>

        <!-- Hero Image/Animation -->
        <div class="relative animate-scale-in" style="animation-delay: 0.8s">
          <div class="relative aspect-square max-w-lg mx-auto">
            <!-- Background Circle -->
            <div class="absolute inset-0 bg-gradient-primary rounded-full opacity-10 blur-3xl animate-float">
              <dotlottie-wc src="https://lottie.host/e4622baf-38ba-40b7-a9a2-bd0167a89ff4/4xiRVtP6Io.lottie"
                style="width: 456px; height: 456px" autoplay loop></dotlottie-wc>
            </div>
            <!-- Main Content Card -->
            <div
              class="relative bg-white/50 dark:bg-dark-card/50 backdrop-blur-lg rounded-3xl p-8 border border-white/20 dark:border-dark-border shadow-glass">
              <div class="text-center space-y-6">
                <!-- Icon -->
                <div
                  class="w-20 h-20 mx-auto bg-gradient-primary rounded-full flex items-center justify-center shadow-lg">
                  <i class="fas fa-code text-white text-3xl"></i>
                </div>

                <!-- Title -->
                <h3 class="text-2xl font-bold text-gray-900 dark:text-white">
                  Full Stack Development
                </h3>

                <!-- Tech Stack -->
                <div class="flex flex-wrap justify-center gap-2">
                  <span
                    class="px-3 py-1 bg-gradient-purple/10 text-gradient-purple dark:text-gradient-pink rounded-full text-sm font-medium">
                    Vue.js
                  </span>
                  <span class="px-3 py-1 bg-gradient-pink/10 text-gradient-pink rounded-full text-sm font-medium">
                    TypeScript
                  </span>
                  <span class="px-3 py-1 bg-gradient-orange/10 text-gradient-orange rounded-full text-sm font-medium">
                    Tailwind CSS
                  </span>
                  <span
                    class="px-3 py-1 bg-gradient-purple/10 text-gradient-purple dark:text-gradient-pink rounded-full text-sm font-medium">
                    Node.js
                  </span>
                </div>

                <!-- Progress Bars -->
                <div class="space-y-3">
                  <div class="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                    <span>Frontend</span>
                    <span>95%</span>
                  </div>
                  <div class="w-full bg-gray-200 dark:bg-dark-border rounded-full h-2">
                    <div class="bg-gradient-primary h-2 rounded-full" style="width: 95%"></div>
                  </div>

                  <div class="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                    <span>Backend</span>
                    <span>85%</span>
                  </div>
                  <div class="w-full bg-gray-200 dark:bg-dark-border rounded-full h-2">
                    <div class="bg-gradient-accent h-2 rounded-full" style="width: 85%"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Floating Elements -->
            <div class="absolute -top-4 -right-4 w-8 h-8 bg-gradient-accent rounded-full animate-float"
              style="animation-delay: 1s"></div>
            <div class="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-secondary rounded-full animate-float"
              style="animation-delay: 1.5s"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
      <div class="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center">
        <div class="w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full mt-2 animate-pulse"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Emits {
  (e: "scroll-to-contact"): void;
}

const emit = defineEmits<Emits>();

const scrollToContact = () => {
  emit("scroll-to-contact");
};

const scrollToProjects = () => {
  const projectsSection = document.getElementById("projects");
  if (projectsSection) {
    projectsSection.scrollIntoView({ behavior: "smooth" });
  }
};
</script>

<style scoped>
/* Gradient text utilities */
.text-gradient-purple {
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.text-gradient-pink {
  background: linear-gradient(135deg, #ec4899, #f97316);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.text-gradient-orange {
  background: linear-gradient(135deg, #f97316, #fbbf24);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Border gradient utilities */
.border-gradient-purple {
  border-image: linear-gradient(135deg, #8b5cf6, #ec4899) 1;
}

/* Shadow utilities */
.shadow-gradient-purple\/25 {
  box-shadow: 0 10px 25px -5px rgba(139, 92, 246, 0.25);
}

/* Animation delays */
.animate-slide-up {
  animation: slideUp 0.6s ease-out;
}

.animate-scale-in {
  animation: scaleIn 0.4s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
