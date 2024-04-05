<script setup>
import { useUserRoles } from '~/stores/useRolesStore';
const updateRoles = useUserRoles()
const { updateRolePermissions } = updateRoles

const token = useCookie('token')
const dialog = ref(false)
const permissions = ref([])
const props = defineProps({
    updates: {
      type: Object,
      required: true
    },
    roleId: {
      type: Number,
      required: true
    }
  })
  const sendUpdate = (token, permissions, roleId) => {
    updateRolePermissions(token, permissions, roleId)
    dialog.value = false
  }
</script>

<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      max-width="600"
    >
      <template #activator="{ props: activatorProps }">
        <v-btn
          class="text-none font-weight-regular"
          prepend-icon="mdi-account"
          text="Permissions"
          variant="tonal"
          v-bind="activatorProps"
        />
      </template>

      <v-card
        prepend-icon="mdi-account"
        title="Add permission"
      >
        <div
          v-for="items in props.updates"
          :key="items.id"
        >
          <v-checkbox
            v-model="permissions"
            class="pl-6"
            :label="items.name"
            :value="items.id"
          />
        </div>
        <v-btn
          text="update"
          @click="sendUpdate(token, permissions, props.roleId)"
        />
      </v-card>
    </v-dialog>
  </div>
</template>
