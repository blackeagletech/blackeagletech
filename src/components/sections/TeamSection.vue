<template>
  <section id="team" class="team-section">

    <div class="team-container">

      <!-- HEADER -->
      <div class="team-header">

        <span class="team-badge">
          {{ t("team.badge") }}
        </span>

        <h2 class="team-title">
          {{ t("team.title") }}
        </h2>

        <p class="team-subtitle">
          {{ t("team.subtitle") }}
        </p>

      </div>

      <!-- GRID -->
      <div class="team-grid">

        <div
          v-for="member in members"
          :key="member.role"
          class="team-card"
        >

          <!-- AVATAR -->
          <div class="team-avatar">
            {{ member.icon }}
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
import { ref } from "vue"
import { useI18n } from "vue-i18n"

const { t } = useI18n()

const members = ref([
  {
    role: "developer",
    icon: "💻"
  },
  {
    role: "design",
    icon: "🎨"
  },
  {
    role: "support",
    icon: "⚡"
  }
])
</script>