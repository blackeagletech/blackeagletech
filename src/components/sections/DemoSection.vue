<template>
  <section id="demos" class="demos-section">

    <h2 class="demos-title">
      {{ t("demos.title") }}
    </h2>

    <div class="demos-grid">

      <div
        v-for="demo in demos"
        :key="demo.key"
        class="demo-card"
        @mousemove="handleMove($event)"
        @mouseleave="resetTilt($event)"
        @click="openModal(demo)" 
      >

        <img :src="demo.image" class="demo-img" />

        <!-- fake video -->
        <div class="demo-video"></div>

        <div class="demo-overlay">
          <h3 class="demo-title">
            {{ t(`demos.${demo.key}.title`) }}
          </h3>

          <button class="demo-btn">
            {{ t("demos.view") }}
          </button>
        </div>

      </div>

    </div>

    <!-- ===== MODAL ===== -->

    <transition name="fade">
      <div v-if="activeDemo" class="demo-modal">

        <div class="demo-modal-content">

          <img
            :src="activeDemo.image"
            class="demo-modal-img"
          />

          <div class="demo-modal-info">

            <h3>
              {{ t(`demos.${activeDemo.key}.title`) }}
            </h3>

            <p>
              {{ t(`demos.${activeDemo.key}.desc`) || "Preview del proyecto" }}
            </p>

            <div class="demo-modal-actions">

              <a href="#contact" class="btn">
                {{ t("services.cta") }}
              </a>

              <button
                class="demo-close"
                @click="closeModal"
              >
                ✕
              </button>

            </div>

          </div>

        </div>

      </div>
    </transition>

  </section>
</template>

<script setup>
import { ref } from "vue"
import { useI18n } from "vue-i18n"
import { demos } from "@/data/demos"

const { t } = useI18n()

/* ===== MODAL ===== */

const activeDemo = ref(null)

const openModal = (demo) => {
  activeDemo.value = demo
}

const closeModal = () => {
  activeDemo.value = null
}

/* ===== PARALLAX ===== */

const handleMove = (e) => {
  const card = e.currentTarget
  const rect = card.getBoundingClientRect()

  const x = e.clientX - rect.left
  const y = e.clientY - rect.top

  const rotateX = ((y / rect.height) - 0.5) * -10
  const rotateY = ((x / rect.width) - 0.5) * 10

  card.style.transform = `
    perspective(1000px)
    rotateX(${rotateX}deg)
    rotateY(${rotateY}deg)
    scale(1.03)
  `
}

const resetTilt = (e) => {
  const card = e.currentTarget
  card.style.transform = `
    perspective(1000px)
    rotateX(0deg)
    rotateY(0deg)
    scale(1)
  `
}
</script>