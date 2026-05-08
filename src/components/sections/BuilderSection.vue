<template>
  <section id="simulator" class="simulator-section">

    <div class="simulator-container">

      <h2 class="simulator-title">
        {{ t("simulator.title") }}
      </h2>

      <div class="sim-steps">
        <div 
          v-for="(step, index) in steps"
          :key="step.key"
          :class="['sim-step-dot', index === currentStep && 'active']"
        >
          {{ index + 1 }}
        </div>
      </div>

      <div class="sim-progress">
        <div class="sim-progress-bar" :style="{ width: progress + '%' }"></div>
      </div>

      <div class="simulator-box">

        <!-- LEFT -->
        <div class="simulator-left">

          <transition name="fade-slide" mode="out-in">
            <div :key="currentStep">

              <h3 class="sim-step-title">
                {{ t(`simulator.steps.${steps[currentStep].key}`) }}
              </h3>

              <p class="sim-step-hint">
                Elegí una opción para continuar →
              </p>

              <div class="simulator-grid">
                <div
                  v-for="option in steps[currentStep].options"
                  :key="option.value"
                  :class="[
                    'sim-card',
                    isActive(option) && 'active',
                    option.recommended && 'recommended'
                  ]"
                  @click="handleSelect(option)"
                >
                  <div class="sim-card-left">
                    <div class="sim-card-title">
                      {{ t(`simulator.options.${option.value}`) }}
                    </div>

                    <div class="sim-card-price">
                      +{{ currencySymbol }}{{ getPrice(option.price) }}
                    </div>
                  </div>

                  <div class="sim-check" v-if="isActive(option)">
                    ✔
                  </div>

                  <div v-if="option.recommended" class="sim-badge">
                    Popular
                  </div>
                </div>
              </div>

            </div>
          </transition>

          <div class="simulator-nav">
            <button v-if="currentStep > 0" @click="prevStep" class="btn-secondary">
              ←
            </button>

            <button 
              @click="nextStep" 
              class="btn"
              :disabled="!isStepValid"
            >
              {{ currentStep === steps.length - 1 ? "Finalizar" : "Siguiente" }}
            </button>
          </div>

        </div>

        <!-- SIDEBAR -->
        <div class="simulator-sidebar">

          <div class="currency-switch">
            <button :class="{ active: currency === 'USD' }" @click="currency = 'USD'">USD</button>
            <button :class="{ active: currency === 'ARS' }" @click="currency = 'ARS'">ARS</button>
          </div>

          <h4 class="sim-summary-title">
            {{ t("simulator.summary") }}
          </h4>

          <div class="sim-summary-list">
            <div 
              v-for="step in steps" 
              :key="step.key"
              class="sim-summary-row"
            >
              <span class="label">
                {{ t(`simulator.steps.${step.key}`) }}
              </span>

              <span class="value">
                {{
                  Array.isArray(form[step.key])
                    ? form[step.key].map(v => t(`simulator.options.${v}`)).join(", ")
                    : (form[step.key] ? t(`simulator.options.${form[step.key]}`) : "-")
                }}
              </span>
            </div>
          </div>

          <div class="sim-total-box">
            <span>Total</span>
            <strong>{{ currencySymbol }}{{ animatedTotal }}</strong>
          </div>

          <a :href="whatsappLink" target="_blank" class="btn w-full mt-4">
            💬 Solicitar presupuesto
          </a>

        </div>

      </div>

    </div>

  </section>
</template>

<script setup>
import { ref, computed, watch, onMounted, nextTick } from "vue"
import { useI18n } from "vue-i18n"

const { t } = useI18n()

const currentStep = ref(0)
const currency = ref("USD")

/* 🔥 CAMBIO CLAVE */
const rate = 1400

const form = ref({
  type: "",
  goal: "",
  pages: "",
  design: "",
  features: []
})

/* 💰 PRECIOS ACTUALIZADOS */
const steps = [
  { key: "type", options: [
    { value: "landing", price: 300 },
    { value: "web", price: 700, recommended: true },
    { value: "ecommerce", price: 1400 }
  ]},
  { key: "goal", options: [
    { value: "leads", price: 120, recommended: true },
    { value: "portfolio", price: 80 },
    { value: "sales", price: 180 }
  ]},
  { key: "pages", options: [
    { value: "small", price: 0 },
    { value: "medium", price: 250, recommended: true },
    { value: "large", price: 500 }
  ]},
  { key: "design", options: [
    { value: "template", price: 0 },
    { value: "custom", price: 400, recommended: true }
  ]},
  { key: "features", multiple: true, options: [
    { value: "auth", price: 250 },
    { value: "payments", price: 350, recommended: true }
  ]}
]

/* RESTO SIN CAMBIOS */
onMounted(() => {
  const saved = localStorage.getItem("simulator")
  if (saved) {
    const data = JSON.parse(saved)
    form.value = data.form
    currentStep.value = data.step
    currency.value = data.currency
  }
})

watch([form, currentStep, currency], () => {
  localStorage.setItem("simulator", JSON.stringify({
    form: form.value,
    step: currentStep.value,
    currency: currency.value
  }))
}, { deep: true })

const handleSelect = (option) => {
  const step = steps[currentStep.value]
  const key = step.key

  if (step.multiple) {
    const i = form.value[key].indexOf(option.value)
    i > -1 ? form.value[key].splice(i, 1) : form.value[key].push(option.value)
  } else {
    form.value[key] = option.value
    setTimeout(() => nextStep(), 250)
  }
}

const isStepValid = computed(() => {
  const step = steps[currentStep.value]
  const val = form.value[step.key]
  return step.multiple ? val.length > 0 : !!val
})

const nextStep = async () => {
  if (!isStepValid.value) return
  if (currentStep.value < steps.length - 1) {
    currentStep.value++
    await nextTick()
    document.getElementById("simulator").scrollIntoView({ behavior: "smooth" })
  }
}

const prevStep = () => currentStep.value--

const isActive = (option) => {
  const step = steps[currentStep.value]
  const val = form.value[step.key]
  return step.multiple ? val.includes(option.value) : val === option.value
}

const totalUSD = computed(() => {
  let sum = 0
  steps.forEach(step => {
    const val = form.value[step.key]
    if (step.multiple) {
      val.forEach(v => {
        const opt = step.options.find(o => o.value === v)
        if (opt) sum += opt.price
      })
    } else {
      const opt = step.options.find(o => o.value === val)
      if (opt) sum += opt.price
    }
  })
  return sum
})

const total = computed(() => currency.value === "ARS"
  ? Math.round(totalUSD.value * rate)
  : totalUSD.value
)

const getPrice = (price) => currency.value === "ARS"
  ? Math.round(price * rate)
  : price

const currencySymbol = computed(() => "$")

const animatedTotal = ref(0)

watch(total, (newVal) => {
  const start = animatedTotal.value
  const duration = 400
  const startTime = performance.now()

  const animate = (time) => {
    const progress = Math.min((time - startTime) / duration, 1)
    animatedTotal.value = Math.floor(start + (newVal - start) * progress)
    if (progress < 1) requestAnimationFrame(animate)
  }

  requestAnimationFrame(animate)
})

const whatsappLink = computed(() => {
  const msg = `
Hola! Quiero un presupuesto:

Tipo: ${form.value.type}
Objetivo: ${form.value.goal}
Páginas: ${form.value.pages}
Diseño: ${form.value.design}
Extras: ${(form.value.features || []).join(", ")}

Total: ${currencySymbol.value}${total.value}
`
  return `https://wa.me/5493471630170?text=${encodeURIComponent(msg)}`
})

const progress = computed(() => ((currentStep.value + 1) / steps.length) * 100)
</script>