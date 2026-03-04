<template>
  <section id="projects" class="py-20 lg:py-32 bg-white dark:bg-[#080a0f]">
    <div class="container mx-auto px-4 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          {{ projectsLabels.title1 }} <span class="bg-gradient-primary bg-clip-text text-transparent">{{ projectsLabels.title2 }}</span>
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {{ projectsLabels.subtitle }}
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(project, index) in projects"
          :key="project.id"
          class="group/project relative overflow-hidden bg-gray-50 hover:bg-white dark:bg-[#1a1b21] rounded-2xl border border-gray-200 dark:border-transparent transition-all duration-300 motion-reduce:transition-none hover:-translate-y-1 hover:border-fuchsia-300 dark:hover:border-fuchsia-500 hover:shadow-[0_16px_36px_rgba(0,0,0,0.22)] dark:hover:shadow-[0_16px_40px_rgba(236,72,153,0.12)] animate-fade-in"
          :style="{ animationDelay: (index as number) * 0.1 + 's' }"
        >
          <div class="absolute inset-0 bg-gradient-primary opacity-0 transition-opacity duration-300 group-hover/project:opacity-[0.05] pointer-events-none"></div>
          <div class="relative aspect-video overflow-hidden">
            <img
              :src="project.image"
              :alt="project.title"
              class="w-full h-full object-cover transition-transform duration-500 group-hover/project:scale-110"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-black/45 to-black/20 opacity-0 group-hover/project:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div class="flex gap-4">
                <a
                  v-if="project.demoUrl"
                  :href="project.demoUrl"
                  @click.prevent="emit('open-link', project, 'demo')"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold bg-white/95 text-gray-900 border border-white/70 shadow-lg shadow-black/30 backdrop-blur-sm transition-all duration-300 hover:bg-white hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500"
                >
                  <i class="fas fa-external-link-alt text-sm"></i>
                  {{ projectsLabels.viewDemo }}
                </a>
              </div>
            </div>
          </div>
          <div class="relative p-6">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-300 group-hover/project:text-fuchsia-600 dark:group-hover/project:text-fuchsia-300">
              {{ project.title }}
            </h3>

            <p class="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
              {{ project.description }}
            </p>

            <div class="flex flex-wrap gap-2 mb-5">
              <span
                v-for="tag in project.tags.slice(0, 3)"
                :key="tag"
                class="px-3 py-1 bg-gradient-primary/10 text-gradient-purple dark:text-gradient-pink rounded-full text-xs font-medium"
              >
                {{ tag }}
              </span>
            </div>

            <div class="flex items-center gap-4 mt-4">
              <a
                v-if="project.demoUrl"
                :href="project.demoUrl"
                @click.prevent="emit('open-link', project, 'demo')"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-2 text-sm font-semibold text-teal-500 border border-teal-500 rounded-lg px-4 py-2 transition-all duration-300 hover:bg-teal-500 hover:text-white hover:shadow-lg hover:shadow-teal-500/25 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/60"
              >
                <i class="fas fa-external-link-alt"></i>
                {{ projectsLabels.viewDemo }}
              </a>

              <a
                v-if="project.codeUrl"
                :href="project.codeUrl"
                @click.prevent="emit('open-link', project, 'code')"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-2 text-sm font-semibold text-purple-500 border border-purple-500 rounded-lg px-4 py-2 transition-all duration-300 hover:bg-purple-500 hover:text-white hover:shadow-lg hover:shadow-purple-500/25 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/60"
              >
                <i class="fas fa-code"></i>
                {{ projectsLabels.viewCode }}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div v-if="showToggle" class="text-center mt-12">
        <button
          @click="emit('toggle-projects')"
          class="px-8 py-4 bg-gradient-primary text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-gradient-purple/25 transition-all duration-300 transform hover:-translate-y-1"
        >
          {{ toggleText }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface ProjectsHeader {
  badge: string
  title1: string
  title2: string
  subtitle: string
  viewDemo: string
  viewCode: string
}

interface ProjectItem {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  demoUrl?: string
  codeUrl?: string
}

defineProps<{
  projectsLabels: ProjectsHeader
  projects: ProjectItem[]
  showToggle: boolean
  toggleText: string
}>()

const emit = defineEmits<{
  (e: 'toggle-projects'): void
  (e: 'open-link', project: ProjectItem, linkType: 'demo' | 'code'): void
}>()
</script>
