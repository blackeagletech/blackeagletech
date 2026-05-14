<template>
  <section id="team" class="team-section">

    <div class="team-container">

      <!-- LEFT -->
      <div class="team-content">

        <span class="team-badge">
          {{ t("team.badge") }}
        </span>

        <h2 class="team-title">
          {{ t("team.title") }}
        </h2>

        <p class="team-subtitle">
          {{ t("team.subtitle") }}
        </p>
        <!-- EXTRA TEXT -->
        <p class="team-text">
          {{ t("team.text") }}
        </p>

        <!-- HIGHLIGHTS -->
        <div class="team-points">

          <div class="team-point">
            <span>✦</span>
            <p>{{ t("team.points.performance") }}</p>
          </div>

          <div class="team-point">
            <span>✦</span>
            <p>{{ t("team.points.design") }}</p>
          </div>

          <div class="team-point">
            <span>✦</span>
            <p>{{ t("team.points.optimization") }}</p>
          </div>

        </div>

      </div>

      <!-- RIGHT -->
      <div class="team-grid">

        <div
          v-for="member in members"
          :key="member.role"
          class="team-card reveal-item"
        >

          <!-- ICON -->
          <div class="team-icon-wrap">

            <!-- 👇 CAMBIAR NOMBRE DEL ICONO -->
            <img
              :src="getIcon(member.icon)"
              :alt="member.role"
              class="team-icon"
            />

          </div>

          <!-- ROLE -->
          <h3 class="team-role">
            {{ t(`team.members.${member.role}.role`) }}
          </h3>

          <!-- DESC -->
          <p class="team-desc">
            {{ t(`team.members.${member.role}.desc`) }}
          </p>

        </div>

      </div>

    </div>

  </section>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useI18n } from "vue-i18n"

const { t } = useI18n()

/* =========================================
   TEAM MEMBERS
========================================= */

const members = ref([
  {
    role: "developer",
    icon: "developer"
  },
  {
    role: "design",
    icon: "design"
  },
  {
    role: "support",
    icon: "support"
  },
  {
    role: "strategy",
    icon: "strategy"
  }
])

/* =========================================
   THEME ICONS
========================================= */

const currentTheme = ref(
  document.documentElement.getAttribute("data-theme") || "dark"
)

const getIcon = (icon) => {
  return `/icons/${currentTheme.value}/${icon}.webp`
}

/* =========================================
   OBSERVER THEME
========================================= */

onMounted(() => {

  const observerTheme = new MutationObserver(() => {
    currentTheme.value =
      document.documentElement.getAttribute("data-theme") || "dark"
  })

  observerTheme.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"]
  })

})

/* =========================================
   REVEAL
========================================= */

onMounted(() => {

  const items = document.querySelectorAll(".reveal-item")

  const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {
        entry.target.classList.add("active")
      }

    })

  }, {
    threshold: 0.15
  })

  items.forEach(item => observer.observe(item))

})
</script>