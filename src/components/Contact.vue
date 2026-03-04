<template>
  <section id="contact" class="py-16 lg:py-24 bg-gray-50 dark:bg-[#0f1219]">
    <div class="container mx-auto px-4 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        <div class="lg:order-2 bg-white dark:bg-dark-card rounded-3xl p-6 lg:p-7 border border-gray-200 dark:border-dark-border shadow-card">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-5">{{ contact.formTitle }}</h3>
          <form @submit.prevent="emit('submit')" class="space-y-5">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{{ contact.nameLabel }} <span class="text-red-500">*</span></label>
              <input
                id="name"
                v-model="contactForm.name"
                type="text"
                class="w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-gradient-purple focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-500"
                :placeholder="contact.namePlaceholder"
              />
            </div>
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{{ contact.emailLabel }} <span class="text-red-500">*</span></label>
              <input
                id="email"
                v-model="contactForm.email"
                type="email"
                class="w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-gradient-purple focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-500"
                placeholder="email@example.com"
              />
            </div>
            <div>
              <label for="subject" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{{ contact.subjectLabel }} <span class="text-red-500">*</span></label>
              <select
                id="subject"
                v-model="contactForm.subject"
                class="w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-gradient-purple focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white"
              >
                <option value="">{{ contact.subjectPlaceholder }}</option>
                <option value="project">{{ contact.subjectOptions.project }}</option>
                <option value="collaboration">{{ contact.subjectOptions.collaboration }}</option>
                <option value="consultation">{{ contact.subjectOptions.consultation }}</option>
                <option value="other">{{ contact.subjectOptions.other }}</option>
              </select>
            </div>
            <div>
              <label for="message" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{{ contact.messageLabel }} <span class="text-red-500">*</span></label>
              <textarea
                id="message"
                v-model="contactForm.message"
                rows="4"
                class="w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-gradient-purple focus:border-transparent transition-all duration-200 resize-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-500"
                :placeholder="contact.messagePlaceholder"
              ></textarea>
            </div>
            <button
              type="submit"
              :disabled="isSubmitting"
              class="w-full py-3.5 bg-gradient-primary text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-gradient-purple/25 transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <span v-if="!isSubmitting">{{ contact.submitButton }}</span>
              <span v-else class="flex items-center justify-center">
                <i class="fas fa-spinner fa-spin mr-2"></i>
                {{ contact.submitting }}
              </span>
            </button>
          </form>
        </div>

        <div class="lg:order-1 space-y-8">
          <div class="max-w-xl">
            <h2 class="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {{ contact.title1 }} <span class="bg-gradient-primary bg-clip-text text-transparent">{{ contact.title2 }}</span>
            </h2>
            <p class="text-lg text-gray-600 dark:text-gray-300">
              {{ contact.subtitle }}
            </p>
          </div>
          <div class="bg-white dark:bg-dark-card rounded-2xl p-6 border border-gray-200 dark:border-dark-border">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mr-4">
                <i class="fas fa-envelope text-white"></i>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 dark:text-white">{{ contact.info.email }}</h4>
                <p class="text-gray-600 dark:text-gray-300">vaydeghost@gmail.com</p>
              </div>
            </div>
          </div>
          <div class="bg-white dark:bg-dark-card rounded-2xl p-6 border border-gray-200 dark:border-dark-border">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center mr-4">
                <i class="fas fa-phone text-white"></i>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 dark:text-white">{{ contact.info.phone }}</h4>
                <p class="text-gray-600 dark:text-gray-300">+84 0397157546</p>
              </div>
            </div>
          </div>
          <div class="bg-white dark:bg-dark-card rounded-2xl p-6 border border-gray-200 dark:border-dark-border">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-gradient-secondary rounded-xl flex items-center justify-center mr-4">
                <i class="fas fa-map-marker-alt text-white"></i>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 dark:text-white">{{ contact.info.location }}</h4>
                <p class="text-gray-600 dark:text-gray-300">{{ contact.info.locationValue }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface ContactContent {
  badge: string
  title1: string
  title2: string
  subtitle: string
  formTitle: string
  nameLabel: string
  namePlaceholder: string
  emailLabel: string
  subjectLabel: string
  subjectPlaceholder: string
  subjectOptions: {
    project: string
    collaboration: string
    consultation: string
    other: string
  }
  messageLabel: string
  messagePlaceholder: string
  submitButton: string
  submitting: string
  info: {
    email: string
    phone: string
    location: string
    locationValue: string
  }
}

interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}

defineProps<{
  contact: ContactContent
  contactForm: ContactForm
  isSubmitting: boolean
}>()

const emit = defineEmits<{
  (e: 'submit'): void
}>()
</script>
