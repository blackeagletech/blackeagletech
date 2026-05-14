<template>
    <section id="services" class="services-section">
        <div class="services-container">
            <!-- TOP CONTENT -->
            <div class="services-heading reveal-item">
                <span class="services-badge">
                    {{ t("services.badge") }}
                </span>

                <h2 class="services-title">
                    {{ t("services.title") }}
                </h2>

                <p class="services-subtitle">
                    {{ t("services.subtitle") }}
                </p>
            </div>

            <!-- SERVICES GRID -->
            <div class="services-grid">
                <div
                    v-for="service in services"
                    :key="service.key"
                    class="service-card reveal-item"
                >
                    <!-- POPULAR -->
                    <div v-if="service.popular" class="service-badge-card">
                        {{ t("services.popular") }}
                    </div>

                    <!-- ICON -->
                    <div class="service-icon-wrap">
                        <img
                            :src="getIcon(service.icon)"
                            :alt="service.key"
                            class="service-icon"
                        />
                    </div>

                    <!-- TITLE -->
                    <h3>
                        {{ t(`services.${service.key}.title`) }}
                    </h3>

                    <!-- DESC -->
                    <p>
                        {{ t(`services.${service.key}.desc`) }}
                    </p>

                    <!-- FEATURES -->
                    <ul>
                        <li
                            v-for="(f, i) in tm(
                                `services.${service.key}.features`,
                            ) || []"
                            :key="i"
                        >
                            ✔ {{ f }}
                        </li>
                    </ul>

                    <!-- BUTTON -->
                    <a
                        :href="getWhatsappLink(service)"
                        target="_blank"
                        rel="noopener"
                        class="btn service-btn"
                        @click.stop
                    >
                        {{ t("services.cta") }}
                    </a>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { services } from "@/data/services";

const { t, tm } = useI18n();

/* ================================================= */
/* THEME */
/* ================================================= */

const currentTheme = ref(
    document.documentElement.getAttribute("data-theme") || "dark",
);

const getIcon = (icon) => {
    return `/icons/${currentTheme.value}/${icon}.webp`;
};

/* ================================================= */
/* THEME OBSERVER */
/* ================================================= */

onMounted(() => {
    const observerTheme = new MutationObserver(() => {
        currentTheme.value =
            document.documentElement.getAttribute("data-theme") || "dark";
    });

    observerTheme.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-theme"],
    });
});

/* ================================================= */
/* WHATSAPP */
/* ================================================= */

const getWhatsappLink = (service) => {
    const title = t(`services.${service.key}.title`);

    const msg = `Hola! Estoy interesado en el servicio: ${title}.

¿Podemos hablar para más detalles?`;

    return `https://wa.me/5493471630170?text=${encodeURIComponent(msg)}`;
};

/* ================================================= */
/* REVEAL */
/* ================================================= */

onMounted(() => {
    const items = document.querySelectorAll(".reveal-item");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                }
            });
        },
        {
            threshold: 0.15,
        },
    );

    items.forEach((item) => observer.observe(item));
});
</script>
