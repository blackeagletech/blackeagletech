<template>
  <section id="process" class="process-section">

    <!-- TITLE -->
    <h2 class="process-title">
      {{ t("process.title") }}
    </h2>

    <!-- TIMELINE -->
    <div class="process-timeline">

      <div
        v-for="(step, index) in steps"
        :key="step.key"
        class="process-step reveal"
        :style="{ transitionDelay: `${index * 150}ms` }"
      >

        <!-- DOT -->
        <div class="process-dot">
          {{ index + 1 }}
        </div>

        <!-- CONTENT -->
        <div class="process-content">

          <h3>
            {{ t(`process.${step.key}.title`) }}
          </h3>

          <p>
            {{ t(`process.${step.key}.desc`) }}
          </p>

        </div>

      </div>

    </div>

  </section>
</template>

<script setup>
import { onMounted } from "vue"
import { useI18n } from "vue-i18n"

const { t } = useI18n()

const steps = [
  { key: "step1" },
  { key: "step2" },
  { key: "step3" },
  { key: "step4" }
]

// SCROLL REVEAL
onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active")
        }
      })
    },
    { threshold: 0.2 }
  )

  document.querySelectorAll(".reveal").forEach((el) => {
    observer.observe(el)
  })
})
</script>