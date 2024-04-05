<script setup>
import { useUserInfo } from '~/stores/userInfoStore';
const userStore = useUserInfo()
const token = useCookie('token')
const router = useRouter()



await useAsyncData('user', () => userStore.fetchUserInfo(token.value))
const { user } = storeToRefs(userStore)
const checkRoles = () => router.push('/role')
const checkPermissions = () => router.push('/permissions')
</script>

<template>
  <v-container
    class="p-2 my-9"
  >
    <v-card class="px-6">
      <div class="d-flex flex-column flex-start justify-center h-100 ga-2 pt-6">
        <div class="d-flex flex-column flex-start w-50">
          <p
            class="border text-indigo px-2 font-weight-bold"
          >
            User name
          </p>
          <p
            class="text-black px-2 my-2
"
          >
            {{ user.name }} {{ user.surname }}
          </p>
        </div>
        <div class="d-flex flex-column flex-start w-50">
          <p
            class="border text-indigo px-2 font-weight-bold
"
          >
            Phone number
          </p>
          <p
            class="text-black px-2 my-2
"
          >
            {{ user.phone }}
          </p>
        </div>
        <div class="d-flex flex-column flex-start w-50">
          <p
            class="border text-indigo px-2 font-weight-bold
"
          >
            Email
          </p>
          <p
            class="text-black px-2 my-2
"
          >
            {{ user.email }}
          </p>
        </div>
      </div>
    </v-card>
    <v-card class="px-6 py-6 my-8">
      <div class="d-flex flex-column flex-wrap align-start">
        <p
          class="text-grey px-2 font-weight-bold w-50 mt-5"
        >
          User Roles
        </p>
        <div class="d-flex flex-wrap w-50 align-start">
          <v-card
            v-for="role in user.roles"
            :key="role.id"
            class="mx-3 my-3 flex-wrap hidden-md-and-up"
            :title="role.display_name"
          />
        </div>
        <v-btn
          class="w-50 text-xs-caption"
          @click="checkRoles"
        >
          Update roles...
        </v-btn>
      </div>
      <div class="d-flex flex-column flex-wrap align-start mt-5">
        <p
          class="text-grey px-2 font-weight-bold w-50
"
        >
          User Repmissions
        </p>
        <v-card
          v-for="item in user.permissions"
          :key="item.id"
          class="mx-3 my-3 flex-wrap hidden-md-and-up"
          :title="item.display_name"
        />
        <v-btn
          class="w-50 text-truncate"
          @click="checkPermissions"
        >
          Update permission...
        </v-btn>
      </div>
    </v-card>
  </v-container>
</template>


