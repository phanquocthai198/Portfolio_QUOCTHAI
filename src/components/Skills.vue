<template>
  <section id="skills" class="py-20 lg:py-32 bg-white dark:bg-[#080a0f]">
    <div class="container mx-auto px-4 lg:px-8">
      <div class="text-center mb-14">
        <h2 class="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          {{ skills.title1 }} <span class="bg-gradient-primary bg-clip-text text-transparent">{{ skills.title2 }}</span>
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          {{ skills.subtitle }}
        </p>
      </div>

      <div class="grid lg:grid-cols-2 gap-6 lg:gap-8">
        <div class="group rounded-2xl bg-gray-50 hover:bg-white dark:bg-[#1a1b21] p-5 lg:p-6 border border-transparent dark:border-transparent transition-all duration-300 motion-reduce:transition-none hover:-translate-y-1 hover:border-fuchsia-300 dark:hover:border-fuchsia-500">
          <div class="flex items-center gap-3 mb-5">
            <div class="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center transition-transform duration-300 motion-reduce:transition-none group-hover:scale-105">
              <i class="fas fa-code text-white text-base"></i>
            </div>
            <div>
              <h3 class="text-2xl font-bold text-gray-900 dark:text-gray-100">{{ skillsPanelText.technicalTitle }}</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ skillsPanelText.technicalSubtitle }}</p>
            </div>
          </div>
          <div class="grid sm:grid-cols-2 gap-3">
            <div
              v-for="skill in technicalSkillCards"
              :key="skill.name"
              class="group/tech relative overflow-hidden rounded-2xl border border-transparent dark:border-transparent bg-gray-100 dark:bg-[#14161b] p-4 flex items-start gap-3 transition-all duration-300 motion-reduce:transition-none hover:border-fuchsia-500/60 hover:-translate-y-0.5"
            >
              <div class="absolute inset-0 bg-gradient-primary opacity-0 transition-opacity duration-300 group-hover/tech:opacity-[0.08] pointer-events-none"></div>
              <i :class="skill.icon" class="relative w-7 text-center text-xl text-fuchsia-500 flex-shrink-0 transition-transform duration-300 motion-reduce:transition-none group-hover/tech:scale-110 group-hover/tech:-rotate-6"></i>
              <div class="relative w-full">
                <div class="flex items-start justify-between gap-2">
                  <div class="leading-tight">
                    <p class="text-base font-bold text-gray-900 dark:text-gray-100 transition-colors duration-300 group-hover/tech:text-fuchsia-600 dark:group-hover/tech:text-fuchsia-300">{{ skill.name }}</p>
                    <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">{{ skill.subtitle }}</p>
                  </div>
                  <span class="text-xs sm:text-sm font-semibold text-fuchsia-500 leading-none mt-1">{{ skill.progress }}%</span>
                </div>
                <div class="mt-3 h-1.5 rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden">
                  <div
                    class="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full opacity-90 transition-all duration-500 motion-reduce:transition-none group-hover/tech:opacity-100"
                    :style="{ width: skill.progress + '%' }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="group rounded-2xl bg-gray-50 hover:bg-white dark:bg-[#1a1b21] p-5 lg:p-6 border border-transparent dark:border-transparent transition-all duration-300 motion-reduce:transition-none hover:-translate-y-1 hover:border-fuchsia-300 dark:hover:border-fuchsia-500">
          <div class="flex items-center gap-3 mb-5">
            <div class="w-10 h-10 rounded-xl bg-gradient-accent flex items-center justify-center transition-transform duration-300 motion-reduce:transition-none group-hover:scale-105">
              <i class="fas fa-lightbulb text-white text-base"></i>
            </div>
            <div>
              <h3 class="text-2xl font-bold text-gray-900 dark:text-gray-100">{{ skillsPanelText.professionalTitle }}</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ skillsPanelText.professionalSubtitle }}</p>
            </div>
          </div>
          <div class="space-y-3">
            <div
              v-for="skill in softSkills"
              :key="skill.name"
              class="group/soft relative overflow-hidden rounded-2xl border border-transparent dark:border-transparent bg-gray-100 dark:bg-[#14161b] p-4 transition-all duration-300 motion-reduce:transition-none hover:border-fuchsia-500/60 hover:-translate-y-0.5"
            >
              <div class="absolute inset-0 bg-gradient-accent opacity-0 transition-opacity duration-300 group-hover/soft:opacity-[0.07] pointer-events-none"></div>
              <div class="flex items-start justify-between gap-3">
                <div class="flex items-start gap-3">
                  <i :class="skill.icon" class="relative text-xl text-fuchsia-500 mt-1 transition-transform duration-300 motion-reduce:transition-none group-hover/soft:scale-110"></i>
                  <div class="relative">
                    <p class="text-base font-bold text-gray-900 dark:text-gray-100 leading-tight transition-colors duration-300 group-hover/soft:text-fuchsia-600 dark:group-hover/soft:text-fuchsia-300">{{ skill.name }}</p>
                    <p class="text-sm text-gray-500 dark:text-gray-400 mt-1 leading-tight">{{ skill.subtitle }}</p>
                  </div>
                </div>
                <span class="relative text-fuchsia-500 text-xs sm:text-sm font-semibold leading-none mt-1 transition-transform duration-300 group-hover/soft:scale-105">{{ skill.level }}</span>
              </div>
              <div class="relative mt-3 h-1.5 rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden transition-colors duration-300 group-hover/soft:bg-gray-300 dark:group-hover/soft:bg-white/20">
                <div
                  class="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full opacity-90 transition-all duration-500 motion-reduce:transition-none group-hover/soft:opacity-100"
                  :style="{ width: skill.progress + '%' }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface SkillsHeader {
  badge: string
  title1: string
  title2: string
  subtitle: string
}

interface SkillsPanelText {
  technicalTitle: string
  professionalTitle: string
  technicalSubtitle: string
  professionalSubtitle: string
}

interface TechnicalSkillCard {
  name: string
  subtitle: string
  icon: string
  progress: number
}

interface SoftSkill {
  name: string
  subtitle: string
  level: string
  progress: number
  icon: string
}

defineProps<{
  skills: SkillsHeader
  skillsPanelText: SkillsPanelText
  technicalSkillCards: TechnicalSkillCard[]
  softSkills: SoftSkill[]
}>()
</script>
