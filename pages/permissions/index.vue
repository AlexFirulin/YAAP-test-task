<script setup>
import { usePermissionStore } from '~/stores/usePermissionsStore'
import { useUserInfo } from '~/stores/userInfoStore'
const permissionStore = usePermissionStore()
const permission = useUserInfo()
const token = useCookie('token')
const { error } = await useAsyncData('permission', () => permissionStore.fetchPermission(token.value))
const { permissons } = storeToRefs(permissionStore)
const { deletePermission } = permissionStore
const { assignPermission } = permission

</script>

<template>
  <v-container>
    <v-card
      class="my-6 items-start bg-purple-lighten-3 "
      title="Create permission"
    >
      <v-card-actions>
        <v-spacer />
        <the-permissions-modal />
      </v-card-actions>
    </v-card>
    <v-card
      v-for="permisson in permissons"
      :key="permisson.id"
      class="my-6 items-start"
      :title="permisson.display_name"
    >
      <v-card-actions>
        <v-card-actions>
          <v-btn
            text="Add permission"
            variant="plain"
            @click="assignPermission(token, permisson.id)"
          />
          <v-spacer />

          <v-btn
            text="Delete"
            variant="plain"
            @click="deletePermission(permisson.id , token)"
          />
        </v-card-actions>
        <updates-modals-the-edit-modal
          :team-id="permisson.id"
          mode="permission"
        />
      </v-card-actions>
    </v-card>
    <div
      v-if="error"
      class="text-danger"
    >
      Failed to load
    </div>
  </v-container>
</template>

