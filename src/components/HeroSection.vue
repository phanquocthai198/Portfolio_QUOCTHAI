<template>
  <section id="hero" class="min-h-screen flex items-center justify-center relative overflow-hidden bg-white dark:bg-[#080a0f]">
    <div class="container mx-auto px-4 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <div class="space-y-8 text-center lg:text-left">
          <div class="animate-fade-in">
            <span class="inline-block px-4 py-2 bg-gradient-primary/10 dark:bg-gradient-primary/20 text-gradient-purple dark:text-gradient-pink rounded-full text-sm font-medium">
              {{ hero.greeting }}
            </span>
          </div>

          <div class="space-y-4 animate-slide-up">
            <h1 class="text-5xl lg:text-7xl font-bold leading-tight">
              <span class="text-gray-900 dark:text-white">{{ hero.title1 }}</span>
              <br />
              <span class="bg-gradient-primary bg-clip-text text-transparent">{{ hero.title2 }}</span>
            </h1>
            <p class="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 font-light">
              {{ hero.subtitle1 }}
              <span class="text-gradient-purple dark:text-gradient-pink font-medium">Figma</span>
              &
              <span class="text-gradient-orange dark:text-gradient-accent font-medium">VueJS</span>
            </p>
          </div>

          <div class="animate-slide-up" style="animation-delay: 0.2s;">
            <p class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {{ hero.description }}
            </p>
          </div>

          <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slide-up" style="animation-delay: 0.4s;">
            <a
              href="/cv/Phan-Quoc-Thai-CV.pdf"
              download
              class="flex items-center justify-center gap-2 px-8 py-4 border-2 border-teal-500 text-teal-500 rounded-xl font-semibold hover:bg-teal-500 hover:text-white transition-all duration-300"
            >
              <i class="fas fa-download"></i>
              Download CV
            </a>
            <button
              @click="emit('scroll-to-section', 'contact')"
              class="px-8 py-4 bg-gradient-primary text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-gradient-purple/25 transition-all duration-300 transform hover:-translate-y-1"
            >
              {{ hero.cta1 }}
            </button>
          </div>
        </div>

        <div class="relative animate-scale-in" style="animation-delay: 0.8s;">
          <div class="relative aspect-square max-w-lg mx-auto">
            <div class="absolute inset-0 bg-gradient-primary rounded-full opacity-10 blur-3xl animate-float"></div>
            <lottie-player
              src="https://assets.lottiefiles.com/packages/lf20_tno6cg2w.json"
              background="transparent"
              speed="1"
              loop
              autoplay
              style="width:100%;height:100%;position:relative;z-index:10;"
            ></lottie-player>
          </div>
        </div>
      </div>
    </div>

    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
      <div class="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center">
        <div class="w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full mt-2 animate-pulse"></div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface HeroContent {
  greeting: string
  title1: string
  title2: string
  subtitle1: string
  description: string
  cta1: string
}

defineProps<{
  hero: HeroContent
}>()

const emit = defineEmits<{
  (e: 'scroll-to-section', sectionId: string): void
}>()
</script>
