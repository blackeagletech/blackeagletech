import { createApp, watch } from "vue"
import App from "./App.vue"
import router from "./router"
import i18n from "./i18n"

import "./assets/styles/main.css"

const app = createApp(App)

app.use(router)
app.use(i18n)

const { locale } = i18n.global

// cargar idioma guardado
const saved = localStorage.getItem("lang")
if (saved) {
  locale.value = saved
}

// guardar cambios
watch(locale, (val) => {
  localStorage.setItem("lang", val)
})

app.mount("#app")
