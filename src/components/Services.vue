<template>
  <section id="services" class="py-20 lg:py-32 bg-gray-50 dark:bg-[#0f1219]">
    <div class="container mx-auto px-4 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          {{ servicesLabels.title1 }} <span class="bg-gradient-primary bg-clip-text text-transparent">{{ servicesLabels.title2 }}</span>
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {{ servicesLabels.subtitle }}
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(service, index) in services"
          :key="service.id"
          class="group/service relative overflow-hidden bg-white dark:bg-[#1a1b21] rounded-2xl p-8 border border-transparent dark:border-transparent transition-all duration-300 motion-reduce:transition-none hover:-translate-y-1 hover:border-gray-200 dark:hover:border-fuchsia-500 hover:shadow-[0_16px_36px_rgba(0,0,0,0.22)] dark:hover:shadow-[0_16px_40px_rgba(236,72,153,0.12)] animate-fade-in"
          :style="{ animationDelay: (index as number) * 0.1 + 's' }"
        >
          <div class="absolute inset-0 bg-gradient-primary opacity-0 transition-opacity duration-300 group-hover/service:opacity-[0.06] pointer-events-none"></div>
          <div class="relative w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 motion-reduce:transition-none group-hover/service:scale-105">
            <i :class="service.icon" class="text-white text-2xl transition-transform duration-300 group-hover/service:scale-110"></i>
          </div>
          <h3 class="relative text-xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300 group-hover/service:text-fuchsia-600 dark:group-hover/service:text-fuchsia-300">{{ service.title }}</h3>
          <p class="relative text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{{ service.description }}</p>
          <ul class="relative space-y-3 mb-8">
            <li
              v-for="feature in service.features"
              :key="feature"
              class="flex items-center text-sm text-gray-600 dark:text-gray-300 transition-transform duration-300 group-hover/service:translate-x-0.5"
            >
              <i class="fas fa-check-circle text-gradient-purple dark:text-gradient-pink mr-3 transition-transform duration-300 group-hover/service:scale-105"></i>
              {{ feature }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface ServicesHeader {
  badge: string
  title1: string
  title2: string
  subtitle: string
}

interface ServiceItem {
  id: number
  title: string
  description: string
  icon: string
  features: string[]
}

defineProps<{
  servicesLabels: ServicesHeader
  services: ServiceItem[]
}>()
</script>
