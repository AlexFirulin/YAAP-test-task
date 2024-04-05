<script setup>
import { updateValues } from '~/composables/UseEditFunctionToFields';

const props = defineProps({
  teamId: {
    type: Number,
    required: true,
  },
  mode: {
    type: String,
    required: true,
  },
});

const token = useCookie('token');
const dialog = ref(false);
const trans_title = ref('');

const team = ref({
  name: '',
  display_name: '',
  description: '',
  trans_title: [],
});

const prepareTransTitle = () => {
  team.value.trans_title.push(trans_title.value);
};
const { updateCard } = updateValues(props.mode, token.value, team.value, props.teamId);
const sendRequest = async () => {
  updateCard();
  dialog.value = false;
};
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
          text="Edit"
          variant="tonal"
          v-bind="activatorProps"
        />
      </template>

      <v-card
        prepend-icon="mdi-account"
        title="Edit team"
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
            @click="sendRequest(token ,team , props.teamId)"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
