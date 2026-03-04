<template>
  <section id="about" class="py-24 lg:py-32 bg-gray-50 dark:bg-[#0f1219]">
    <div class="container mx-auto px-4 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
        <div class="space-y-8">
          <h2 class="text-4xl lg:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            {{ about.title }}
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
            {{ about.description }}
          </p>
          <div class="flex flex-wrap gap-3 pt-1">
            <span
              v-for="highlight in highlights"
              :key="highlight"
              class="inline-flex items-center px-5 py-2.5 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm lg:text-base font-semibold text-gray-700 dark:text-gray-200"
            >
              {{ highlight }}
            </span>
          </div>
          <div class="grid grid-cols-2 gap-8 pt-4 max-w-xl">
            <div class="text-center">
              <div class="text-4xl lg:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                1+
              </div>
              <div class="text-sm lg:text-base text-gray-500 dark:text-gray-400 mt-2">{{ about.years }}</div>
            </div>
            <div class="text-center">
              <div class="text-4xl lg:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                5+
              </div>
              <div class="text-sm lg:text-base text-gray-500 dark:text-gray-400 mt-2">{{ about.projects }}</div>
            </div>
          </div>
        </div>
        <div class="relative">
          <div class="mx-auto w-full max-w-[440px] h-[380px] sm:h-[430px] lg:h-[480px] rounded-[2rem] bg-gradient-primary p-[4px] shadow-[0_0_40px_rgba(236,72,153,0.12)]">
            <div class="bg-white dark:bg-[#1f2025] rounded-[1.85rem] h-full flex items-center justify-center">
              <div class="w-[64%] max-w-[280px] aspect-square rounded-full bg-[#34343a] flex items-center justify-center p-5">
                <img
                  src="https://api.dicebear.com/9.x/adventurer/svg?seed=QuocThai&backgroundColor=transparent"
                  alt="Profile avatar"
                  class="w-full h-full object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.35)]"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface AboutContent {
  title: string
  description: string
  years: string
  projects: string
}

defineProps<{
  about: AboutContent
  highlights: string[]
}>()
</script>
