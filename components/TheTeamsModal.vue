
<script setup>

const dialog = ref(false)
const token = useCookie('token')
const role = ref({
  name: '',
  display_name: '',
  description: '',
  trans_title: ''
})

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
          text="Add role"
          variant="tonal"
          v-bind="activatorProps"
        />
      </template>

      <v-card
        prepend-icon="mdi-account"
        title="Role Card"
      >
        <v-card-text>
          <v-row dense>
            <v-col
              cols="12"
              md="4"
              sm="6"
            >
              <v-text-field
                v-model="role.name"
                label="Name *"
                required
              />
            </v-col>

            <v-col
              cols="12"
              md="4"
              sm="6"
            >
              <v-text-field
                v-model="role.description"
                label="Description *"
              />
            </v-col>

            <v-col
              cols="12"
              md="4"
              sm="6"
            >
              <v-text-field
                v-model="role.display_name"
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
                v-model="role.trans_title"
                label="Trans title*"
                required
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
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
