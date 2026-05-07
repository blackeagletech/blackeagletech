#<template>
  <!-- PARTICLES -->
  <canvas ref="particlesRef" class="hero-particles"></canvas>

  <section ref="heroRef" class="relative min-h-screen flex items-center px-6 md:px-16 overflow-hidden">

    <!-- BACKGROUNDS -->
    <div class="hero-bg"></div>
    <div class="hero-noise"></div>
    <div class="hero-glow"></div>

    <!-- CONTENT -->
    <div class="relative z-10 grid md:grid-cols-2 gap-12 items-center w-full hero-grid">

      <!-- LEFT -->
      <div class="space-y-6 max-w-xl hero-left">

        <div class="flex gap-4 reveal-item">
          <img src="/logo1.png" class="w-30" />
        </div>

        <h1 class="text-3xl md:text-4xl font-bold leading-tight reveal-item">
          {{ typedText }}
        </h1>

        <p class="hero-subtitle text-lg reveal-item">
          {{ t("hero.subtitle") }}
        </p>

        <div class="flex flex-wrap gap-4 reveal-item">
          <a href="#contact" class="btn">
            {{ t("hero.cta") }}
          </a>

          <a href="#demos" class="text-primary hover:underline flex items-center gap-2">
            {{ t("hero.cta2") }} →
          </a>
        </div>

      </div>

      <!-- RIGHT -->
      <div class="flex justify-center md:justify-end">

        <div class="relative group">

          <div class="absolute inset-0 bg-primary/20 blur-3xl opacity-30 group-hover:opacity-50 transition"></div>

          <div ref="mockupRef" class="hero-mockup w-[300px] md:w-[360px] h-[420px] rounded-2xl p-4">

            <div class="flex gap-2 mb-4">
              <span class="w-3 h-3 bg-red-500 rounded-full"></span>
              <span class="w-3 h-3 bg-yellow-500 rounded-full"></span>
              <span class="w-3 h-3 bg-green-500 rounded-full"></span>
            </div>

            <div class="space-y-4 animate-pulse">
              <div class="h-20 bg-gray-800 rounded"></div>
              <div class="h-12 bg-gray-800 rounded"></div>
              <div class="h-24 bg-gray-800 rounded"></div>
            </div>

          </div>

        </div>

      </div>

    </div>
  </section>
</template>

<script setup>
import { useI18n } from "vue-i18n"
import { onMounted, ref, watch } from "vue"

const { t, locale } = useI18n()

const heroRef = ref(null)
const mockupRef = ref(null)
const particlesRef = ref(null)

const fullText = ref("")
const typedText = ref("")

let typingIndex = 0

// THEME
let currentTheme = "dark"

const updateTheme = () => {
  currentTheme = document.documentElement.getAttribute("data-theme") || "dark"
}

const observerTheme = new MutationObserver(updateTheme)
observerTheme.observe(document.documentElement, { attributes: true })

updateTheme()

const typing = () => {
  if (typingIndex < fullText.value.length) {
    typedText.value += fullText.value.charAt(typingIndex)
    typingIndex++
    setTimeout(typing, 40)
  }
}

onMounted(() => {

  fullText.value = t("hero.title")
  typing()

  // REVEAL
  const items = heroRef.value.querySelectorAll(".reveal-item")

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active")
      }
    })
  }, { threshold: 0.2 })

  items.forEach(item => observer.observe(item))

  // PARALLAX
  heroRef.value.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20
    const y = (e.clientY / window.innerHeight - 0.5) * 20

    if (mockupRef.value) {
      mockupRef.value.style.transform = `
        rotateY(${x}deg)
        rotateX(${-y}deg)
        translateY(-10px)
      `
    }
  })

  heroRef.value.addEventListener("mouseleave", () => {
    if (mockupRef.value) {
      mockupRef.value.style.transform = `rotateY(0deg) rotateX(0deg)`
    }
  })

  // PARTICLES
  const canvas = particlesRef.value
  const ctx = canvas.getContext("2d")

  let particles = []

  const resize = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  window.addEventListener("resize", resize)
  resize()

  for (let i = 0; i < 60; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3,
      speedX: Math.random() * 0.5 - 0.25,
      speedY: Math.random() * 0.5 - 0.25
    })
  }

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    particles.forEach(p => {
      p.x += p.speedX
      p.y += p.speedY

      if (p.x < 0 || p.x > canvas.width) p.speedX *= -1
      if (p.y < 0 || p.y > canvas.height) p.speedY *= -1

      ctx.fillStyle =
        currentTheme === "light"
          ? "rgba(239,120,1,0.35)"
          : "rgba(0,255,224,0.6)"

      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fill()
    })

    requestAnimationFrame(animate)
  }

  animate()
})

watch(() => locale.value, () => {
  typedText.value = ""
  fullText.value = t("hero.title")
  typingIndex = 0
  typing()
})
</script>