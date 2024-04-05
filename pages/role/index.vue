<script setup>
import { useUserRoles } from '~/stores/useRolesStore'
import { useUserInfo } from '~/stores/userInfoStore';
import { usePermissionStore } from '~/stores/usePermissionsStore'



const token = useCookie('token').value
const useRoles = useUserRoles()
const useUser = useUserInfo()
const permissions = usePermissionStore()

await useAsyncData('roles', () => useRoles.fetchRoles(token))
await useAsyncData('user', ()=> useUser.fetchUserInfo(token))
await useAsyncData('user', ()=> permissions.fetchPermission(token))

const { deleteRole } = useRoles
const { roles } = storeToRefs(useRoles)
const { user } = storeToRefs(useUser)
const { permissons } = storeToRefs(permissions)

const selectedRoles = (role) => {
return user.value.roles.some(r => r.name === role.name.toLowerCase())
}
const { assignRole } = useUser

</script>

<template>
  <v-container>
    <v-card
      class="bg-purple-lighten-3 "
      title="Create role"
    >
      <v-card-actions>
        <the-roles-modals />
      </v-card-actions>
    </v-card>
    <v-card
      v-for="role in roles"
      :key="role.id"
      class="my-2 d-flex"
      :class="{'border-lg bg-teal-lighten-2' :selectedRoles(role)}"
      :text="role.name"
    >
      <v-card-actions class="d-flex flex-column align-start ga-4 ">
        <v-btn
          v-if="!selectedRoles(role)"
          class="border-lg border-primary"
          @click="assignRole(token, role.id)"
        >
          Select role
        </v-btn>
        <v-btn
          class="border-lg border-danger mx-0"
          @click="deleteRole(token, role.id)"
        >
          Delete role
        </v-btn>
        <the-update-role-permission
          :updates="permissons"
          :role-id="role.id"
        />
        <updates-modals-the-edit-modal
          :team-id="role.id"
          mode="role"
        />
      </v-card-actions>
    </v-card>
  </v-container>
</template>
