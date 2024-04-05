<script setup>
import { useTeamsStore } from '~/stores/useTeamsStore';
const teamStore = useTeamsStore()
const { createTeam } = teamStore

const token = useCookie('token')
const dialog = ref(false)
const trans_title = ref('')

const team = ref({
  name: "",
  display_name: "",
  description: "",
  trans_title: []
})

const prepareTransTitle = () => {
   team.value.trans_title.push(trans_title.value)
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
          text="Add Team"
          variant="tonal"
          v-bind="activatorProps"
        />
      </template>

      <v-card
        prepend-icon="mdi-account"
        title="Team Card"
      >
        <v-card-text>
          <v-row dense>
            <v-col
              cols="12"
              md="4"
              sm="6"
            >
              <v-text-field
                v-model="team.name"
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
                v-model="team.description"
                label="Description *"
              />
            </v-col>

            <v-col
              cols="12"
              md="4"
              sm="6"
            >
              <v-text-field
                v-model="team.display_name"
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
                @blur="prepareTransTitle"
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
            @click="createTeam(team, token)"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
