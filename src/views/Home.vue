<template>
  <main>

    <HeroSection />
    <ServicesSection />
    <DemoSection />
    <ProcessSection />
    <BuilderSection />
    <ContactSection />

  </main>
</template>

<script setup>
import HeroSection from "../components/sections/HeroSection.vue"
import ServicesSection from "../components/sections/ServicesSection.vue"
import DemoSection from "../components/sections/DemoSection.vue"
import ProcessSection from "../components/sections/ProcessSection.vue"
import ContactSection from "../components/sections/ContactSection.vue"
import BuilderSection from "../components/sections/BuilderSection.vue"

import { useReveal } from "../composables/useReveal"

useReveal()

import { useSEO } from "../composables/useSEO"
import { siteConfig } from "../config/site"

useSEO({
  title: "Black Eagle Tech - Desarrollo Web",
  description: "Landing pages, ecommerce y soporte técnico remoto",
  url: siteConfig.url
})

</script>