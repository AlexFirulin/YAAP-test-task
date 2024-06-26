// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },

  modules: [
  '@pinia/nuxt',
  'vuetify-nuxt-module',
  '@nuxtjs/eslint-module',
  
  ],
})
