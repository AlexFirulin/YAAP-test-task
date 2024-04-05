<script setup>
import { useAuthStore } from "~/stores/useAuthStore"
const router = useRouter()
const authStore = useAuthStore()

// Use hardcode because we haven`t registraion options
  const authData = reactive({
          phone: '380666753282',
          password: 'Code@321'
  })

  const handleLogin = async () => {
       try {
       await authStore.login(authData)
       router.push('/users')
      } catch (error) {
        console.error(error)
      }
}
</script>

<template>
  <div
    class="d-flex align-center justify-center v-theme--dark"
    style="height: 100vh"
  >
    <v-sheet
      width="400"
      class="mx-auto rounded-lg px-4 py-3"
    >
      <v-form
        fast-fail
        @submit.prevent="handleLogin"
      >
        <v-text-field
          v-model="authData.phone"
          variant="underlined"
          label="Phone"
        />

        <v-text-field
          v-model="authData.password"
          variant="underlined"
          label="password"
        />
        <a
          href="#"
          class="text-body-2 font-weight-regular"
        >Forgot Password?</a>

        <v-btn
          type="submit"
          variant="outlined"
          color="primary"
          block
          class="mt-2"
        >
          Sign in
        </v-btn>
      </v-form>
      <div class="mt-2">
        <p class="text-body-2">
          Don't have an account? <a href="#">Sign Up</a>
        </p>
      </div>
    </v-sheet>
  </div>
</template>
