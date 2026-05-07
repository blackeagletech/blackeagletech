<script setup>
import { useI18n } from "vue-i18n"
import { socials } from "@/data/socials"

const { t } = useI18n()

const whatsappLink = `https://wa.me/549630170?text=${encodeURIComponent(
  t("contact.whatsappMessage")
)}`
</script>

<template>
  <section id="contact" class="section text-center">

    <!-- TITULO -->
    <h2 class="title">
      {{ t("contact.title") }}
    </h2>

    <p class="text-gray-400 mb-6">
      {{ t("contact.subtitle") }}
    </p>

    <!-- CTA PRINCIPAL -->
    <a :href="whatsappLink" target="_blank" class="btn mb-10 inline-block">
      {{ t("contact.btn") }}
    </a>

    <!-- REDES -->
<p class="text-gray-500 mb-6">
  {{ t("contact.socialTitle") }}
</p>

<div class="social-wrapper">

  <a
    v-for="s in socials"
    :key="s.id"
    :href="s.url"
    target="_blank"
    class="social-item"
  >
    <component :is="s.icon" class="social-icon" />
    <span>{{ t(`contact.social.${s.id}`) }}</span>
  </a>

</div>

  </section>
</template>