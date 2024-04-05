<script setup>
import { useTeamsStore } from '~/stores/useTeamsStore'
const teamStore = useTeamsStore()
const token = useCookie('token')
await useAsyncData('teams', () => teamStore.fetchTeams(token.value))
const { teams } = storeToRefs(teamStore)
const { deleteTeam } = teamStore
const { selectTeam } = teamStore
</script>

<template>
  <v-container>
    <the-team-create-modal />
    <v-card
      v-for="team in teams"
      :key="team.id"
      class="my-4"
      :title="team.name"
      :subtitle="team.display_name"
      :text="team.description"
      variant="outlined"
    >
      <v-card-actions>
        <v-btn
          class="border"
          @click="selectTeam(token, team)"
        >
          Select comand
        </v-btn>
        <v-btn
          class="border mx-4"
          @click="deleteTeam(token, team.id)"
        >
          Delete comand
        </v-btn>
        <updates-modals-the-edit-modal
          :team-id="team.id"
          mode="team"
        />
      </v-card-actions>
    </v-card>
  </v-container>
</template>

