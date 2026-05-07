<template>
  <section id="services" class="services-section">

    <h2 class="services-title">
      {{ t("services.title") }}
    </h2>

    <div class="services-grid">

      <div
        v-for="service in services"
        :key="service.key"
        class="service-card reveal-item"
      >

        <!-- BADGE -->
        <div v-if="service.popular" class="service-badge">
          {{ t("services.popular") }}
        </div>

        <!-- ICON -->
        <div class="service-icon">
          {{ service.icon }}
        </div>

        <!-- TITLE -->
        <h3>
          {{ t(`services.${service.key}.title`) }}
        </h3>

        <!-- DESC -->
        <p>
          {{ t(`services.${service.key}.desc`) }}
        </p>

        <!-- FEATURES -->
        <ul>
          <li
            v-for="(f, i) in tm(`services.${service.key}.features`) || []"
            :key="i"
          >
            ✔ {{ f }}
          </li>
        </ul>

        <!-- CTA -->
        <a
          :href="getWhatsappLink(service)"
          target="_blank"
          rel="noopener"
          class="btn service-btn"
          @click.stop
        >
          {{ t("services.cta") }}
        </a>

      </div>

    </div>

  </section>
</template>

<script setup>
import { onMounted } from "vue"
import { useI18n } from "vue-i18n"
import { services } from "@/data/services"

const { t, tm } = useI18n()

/* 🔥 WHATSAPP DINÁMICO */
const getWhatsappLink = (service) => {
  const title = t(`services.${service.key}.title`)

  const msg = `Hola! Estoy interesado en el servicio: ${title}.
¿Podemos hablar para más detalles?`

  return `https://wa.me/549630170?text=${encodeURIComponent(msg)}`
}

/* 🔥 ANIMACIÓN TIPO SAAS (SCROLL REVEAL) */
onMounted(() => {
  const items = document.querySelectorAll(".reveal-item")

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active")
      }
    })
  }, { threshold: 0.2 })

  items.forEach(item => observer.observe(item))
})
</script>