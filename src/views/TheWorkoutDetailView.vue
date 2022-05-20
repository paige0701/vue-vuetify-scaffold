<template>
  <v-container v-if="workout">
    <v-card>
      <v-toolbar>
        <v-spacer />
        <v-btn @click="refreshToDefaults"> Refresh </v-btn>
      </v-toolbar>
      <v-text-field
        v-model="workout.title"
        class="mt-5 ml-5"
        label="Workout Name" />
      <v-card-actions>
        <v-btn @click="openDialog(dialogKeys.EDIT)"> Edit </v-btn>
        <v-btn @click="openDialog(dialogKeys.CANCEL)"> Cancel </v-btn>
        <v-spacer></v-spacer>
        <v-btn @click="openDialog(dialogKeys.DELETE)"> Delete </v-btn>
      </v-card-actions>
    </v-card>
    <the-confirm-dialog
      v-if="currentDialog !== ''"
      v-model="dialog"
      :title="dialogs[currentDialog].title"
      :description="dialogs[currentDialog].description"
      @close="closeDialog" />
  </v-container>
</template>
<script>
import { cloneDeep } from 'lodash';
import TheConfirmDialog from '@/components/dialogs/TheConfirmDialog';

const DIALOGS = {
  DELETE: 'delete',
  EDIT: 'edit',
  CANCEL: 'cancel',
};
export default {
  components: {
    TheConfirmDialog,
  },
  data() {
    return {
      workoutId: '',
      workout: '',
      originalWorkout: '',
      currentDialog: '',
      dialog: false,
      dialogs: {
        edit: {
          title: 'Edit workout',
          description: 'Do you want to edit this workout?',
        },
        delete: {
          title: 'Delete workout',
          description: 'Do you want to delete this workout?',
        },
        cancel: {
          title: 'Cancel',
          description: 'Do you want to cancel editing?',
        },
      },
    };
  },
  computed: {
    dialogKeys() {
      return DIALOGS;
    },
  },
  watch: {
    async $route() {
      this.workoutId = this.$route.params.id;
      this.workout = await this.getWorkout();
    },
  },
  async mounted() {
    this.workoutId = this.$route.params.id;
    this.workout = await this.getWorkout();
  },
  methods: {
    refreshToDefaults() {
      this.workout.title = this.originalWorkout.title;
    },
    openDialog(dialogId) {
      this.dialog = true;
      this.currentDialog = dialogId;
    },
    closeDialog(confirm) {
      this.dialog = false;
      const currentDialog = this.currentDialog;
      this.currentDialog = '';

      if (confirm) {
        switch (currentDialog) {
          case DIALOGS.DELETE:
            this.deleteWorkout();
            return;
          case DIALOGS.EDIT:
            this.updateWorkout();
            return;
          case DIALOGS.CANCEL:
            this.$router.push({ name: 'WorkoutView' });
            return;
        }
      }
    },
    async updateWorkout() {
      try {
        const { data } = await this.$api.workout.updateWorkout(this.workoutId, {
          title: this.workout.title,
        });
        this.originalWorkout = cloneDeep(data);
        this.$toast(`Workout edit successful`);
      } catch (e) {
        console.info(e);
        this.$toast.error(`Workout edit failed`);
      }
    },
    async deleteWorkout() {
      const { data } = await this.$api.workout.deleteWorkout(this.workoutId);
      if (data.show_yn === 'N') {
        this.$toast(`Workout removed`);
        await this.$router.push({ name: 'WorkoutView' });
      } else {
        this.$toast.error(`Workout remove failed`);
      }
    },
    async getWorkout() {
      try {
        const { data } = await this.$api.workout.workout(this.workoutId);
        this.originalWorkout = cloneDeep(data);
        return data;
      } catch (e) {
        console.info(e);
        return '';
      }
    },
  },
  beforeRouteUpdate(to, from, next) {
    next();
  },
};
</script>
