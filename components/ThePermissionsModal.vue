<script setup>
import { usePermissionStore } from '~/stores/usePermissionsStore'
const permissionStore = usePermissionStore()
const token = useCookie('token')
const { postPermissiom } = permissionStore
const dialog = ref(false)
const trans_title = ref('')
const sendRequest = async (permission, token) => {
  postPermissiom(permission, token)
  dialog.value = false
}
const permission = ref({
  name:'',
  trans_title:[],
  display_name: '',
  description: ''
})
const prepareRequest = () => {
  permission.value.trans_title.push(trans_title.value)
}
</script>

<template>
  <div class="pa-4 text-center">
    <v-dialog
      v-model="dialog"
      max-width="600"
    >
      <template #activator="{ props: activatorProps }">
        <v-btn
          class="text-none font-weight-regular"
          prepend-icon="mdi-account"
          text="Create permission"
          variant="tonal"
          v-bind="activatorProps"
        />
      </template>

      <v-card
        prepend-icon="mdi-account"
        title="Permission Card"
      >
        <v-card-text>
          <v-row dense>
            <v-col
              cols="12"
              md="4"
              sm="6"
            >
              <v-text-field
                v-model="permission.name"
                label="Permission Name *"
                required
              />
            </v-col>

            <v-col
              cols="12"
              md="4"
              sm="6"
            >
              <v-text-field
                v-model="permission.description"
                label="Description *"
              />
            </v-col>

            <v-col
              cols="12"
              md="4"
              sm="6"
            >
              <v-text-field
                v-model="permission.display_name"
                label="Display name*"
                persistent-hint
                required
              />
            </v-col>

            <v-col
              cols="12"
              md="4"
              sm="6"
            >
              <v-text-field
                v-model="trans_title"
                label="Trans title*"
                required
                @blur="prepareRequest"
              />
            </v-col>
          </v-row>
          <small class="text-caption text-medium-emphasis">*indicates required field</small>
        </v-card-text>

        <v-divider />

        <v-card-actions>
          <v-spacer />

          <v-btn
            text="Close"
            variant="plain"
            @click="dialog = false"
          />

          <v-btn
            color="primary"
            text="Save"
            variant="tonal"
            @click="sendRequest(permission, token)"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
