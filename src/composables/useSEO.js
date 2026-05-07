import { useHead } from "@vueuse/head"

export function useSEO({ title, description, url }) {
  useHead({
    title,
    meta: [
      { name: "description", content: description },

      // Open Graph
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url }
    ]
  })
}