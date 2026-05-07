<template>
  <component
    :is="tag"
    :href="href"
    class="px-6 py-3 rounded-xl transition-all text-center"
    :class="variantClass"
  >
    <slot />
  </component>
</template>

<script setup>
const props = defineProps({
  tag: { default: "a" },
  href: String,
  variant: { default: "primary" }
})

const variantClass = {
  primary: "bg-primary text-black shadow-glow",
  outline: "border border-primary text-primary"
}[props.variant]
</script>