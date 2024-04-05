<script setup>
import  { manageItems } from '~/constants/constants'
import { useAuthStore } from '~/stores/useAuthStore';
const userStore = useAuthStore()
const router = useRouter()
const token = useCookie('token')
const logout = async () => {
  userStore.logout(token)
  router.push('/')
}
</script>

<template>
  <v-app-bar
    class="px-3"
    density="compact"
    flat
  >
    <v-tabs
      color="grey-darken-2"
      centered
    >
      <v-tab
        v-for="link in manageItems"
        :key="link.name"
        :text="link.name"
        :to="link.link"
      />
    </v-tabs>
    <v-spacer />
    <v-btn
      v-if="token"
      text="Exit"
      @click="logout(token)"
    />
  </v-app-bar>
</template>

