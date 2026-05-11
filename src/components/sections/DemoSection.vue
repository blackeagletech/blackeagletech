<template>
  <section id="demos" class="demos-section">

    <div class="demos-container">

      <!-- TITLE -->
      <h2 class="demos-title">
        {{ t("demos.title") }}
      </h2>

      <!-- GRID -->
      <div class="demos-grid">

        <div
          v-for="demo in demos"
          :key="demo.key"
          class="demo-card"
          @mousemove="handleMove($event)"
          @mouseleave="resetTilt($event)"
          @click="openModal(demo)"
        >

          <!-- IMAGE -->
          <img :src="demo.image" class="demo-img" />

          <!-- GLOW -->
          <div class="demo-video"></div>

          <!-- OVERLAY -->
          <div class="demo-overlay">

            <div>
              <h3 class="demo-title">
                {{ t(`demos.${demo.key}.title`) }}
              </h3>

              <p class="demo-desc">
                {{ t(`demos.${demo.key}.desc`) }}
              </p>
            </div>

            <button class="demo-btn">
              {{ t("demos.view") }}
            </button>

          </div>

        </div>

      </div>

    </div>

    <!-- MODAL -->

    <transition name="fade">

      <div
        v-if="activeDemo"
        class="demo-modal"
        @click.self="closeModal"
      >

        <div class="demo-modal-content">

          <!-- IMAGE -->
          <img
            :src="activeDemo.image"
            class="demo-modal-img"
          />

          <!-- INFO -->
          <div class="demo-modal-info">

            <div>

              <span class="demo-badge">
                LIVE DEMO
              </span>

              <h3>
                {{ t(`demos.${activeDemo.key}.title`) }}
              </h3>

              <p>
                {{ t(`demos.${activeDemo.key}.desc`) }}
              </p>

            </div>

            <!-- ACTIONS -->
            <div class="demo-modal-actions">

              <a
                :href="activeDemo.url"
                target="_blank"
                rel="noopener noreferrer"
                class="btn"
              >
                {{ t("demos.openDemo") }}
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

/* MODAL */

const activeDemo = ref(null)

const openModal = (demo) => {
  activeDemo.value = demo
  document.body.style.overflow = "hidden"
}

const closeModal = () => {
  activeDemo.value = null
  document.body.style.overflow = "auto"
}

/* PARALLAX */

const handleMove = (e) => {
  if (window.innerWidth < 768) return

  const card = e.currentTarget
  const rect = card.getBoundingClientRect()

  const x = e.clientX - rect.left
  const y = e.clientY - rect.top

  const rotateX = ((y / rect.height) - 0.5) * -8
  const rotateY = ((x / rect.width) - 0.5) * 8

  card.style.transform = `
    perspective(1000px)
    rotateX(${rotateX}deg)
    rotateY(${rotateY}deg)
    translateY(-6px)
  `
}

const resetTilt = (e) => {
  const card = e.currentTarget

  card.style.transform = `
    perspective(1000px)
    rotateX(0deg)
    rotateY(0deg)
    translateY(0px)
  `
}
</script>