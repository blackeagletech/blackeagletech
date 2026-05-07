<template>
  <header class="fixed top-0 left-0 w-full z-50 backdrop-blur border-b border-gray-800">

    <nav class="flex items-center justify-between px-6 py-4">

      <!-- LOGO -->
      <div class="flex items-center gap-2">
        <img src="/logo2.png" class="w-10" />
        <span class="text-primary font-bold tracking-wide">
          BLACK EAGLE TECH
        </span>
      </div>

      <!-- DESKTOP MENU -->
      <div class="hidden md:flex gap-8 items-center">
        <a href="#services" class="nav-link">{{ t("nav.services") }}</a>
        <a href="#demos" class="nav-link">{{ t("nav.demos") }}</a>
        <a href="#contact" class="nav-link">{{ t("nav.contact") }}</a>

        <button @click="toggleLang" class="text-primary border border-primary px-2 py-1 rounded">
          {{ locale.toUpperCase() }}
        </button>
        <button @click="toggleTheme" class="text-primary border border-primary px-2 py-1 rounded"> Theme</button>
        <a
          :href="`https://wa.me/549630170?text=${encodeURIComponent(t('contact.whatsappMessage'))}`"
          target="_blank"
          class="btn"
        >
          WhatsApp
        </a>
        
      </div>

      <!-- MOBILE BUTTON -->
      <button @click="toggle" class="md:hidden text-primary">
        ☰
      </button>

    </nav>

    <!-- MOBILE MENU -->
    <transition name="fade">
      <div
        v-if="open"
        class="md:hidden bg-dark px-6 py-6 flex flex-col gap-6"
      >
        <a @click="close" href="#services">{{ t("nav.services") }}</a>
        <a @click="close" href="#demos">{{ t("nav.demos") }}</a>
        <a @click="close" href="#contact">{{ t("nav.contact") }}</a>

        <button @click="toggleLang" class="text-primary">
          {{ locale.toUpperCase() }}
        </button>
        <button @click="toggleTheme" class="text-primary border border-primary px-2 py-1 rounded"> Theme</button>
        <a
          :href="`https://wa.me/549630170?text=${encodeURIComponent(t('contact.whatsappMessage'))}`"
          target="_blank"
          class="btn"
        >
          WhatsApp
        </a>
      </div>
    </transition>

  </header>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useI18n } from "vue-i18n"

const open = ref(false)
const { t, locale } = useI18n()

const toggleLang = () => {
  locale.value = locale.value === "es" ? "en" : "es"
}

const toggle = () => (open.value = !open.value)
const close = () => (open.value = false)

const toggleTheme = () => {
  const current = document.documentElement.getAttribute("data-theme")

  if (current === "light") {
    document.documentElement.removeAttribute("data-theme")
    localStorage.setItem("theme", "dark")
  } else {
    document.documentElement.setAttribute("data-theme", "light")
    localStorage.setItem("theme", "light")
  }
}

onMounted(() => {
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme === "light") {
    document.documentElement.setAttribute("data-theme", "light")
  }
})
</script>