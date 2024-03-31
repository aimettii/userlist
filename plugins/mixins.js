import userFormatters from "@/mixins/userFormatters.js";

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.mixin(userFormatters)
})