<template>
  <v-container fluid>
    <v-card
      class="mx-auto"
      max-width="500"
    >
      <v-container
        class="pa-10"
      >
        <v-row
          no-gutters
          class="mb-5"
        >
          <v-col md="11">
            <v-text-field
              v-model="newWorkout"
              label="Workout name"
              hide-details="auto"
            />
          </v-col>
          <v-col
            cols="1"
            align-self="end"
          >
            <v-btn
              icon
              color="pink"
              @click.stop="validateAddInput"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-row
          no-gutters
        >
          <v-col
            style="max-height: 500px"
            class="overflow-y-auto"
          >
            <v-list>
              <v-list-item
                v-for="element in workouts"
                :key="element.id"
                style="cursor: pointer; text-align: left"
                @click="goDetail(element.id)"
              >
                <v-list-item-title>{{ element.title }}</v-list-item-title>
                <v-list-item-avatar>
                  <v-icon
                    v-blur
                    @click.stop="openRemoveWorkoutModal(element.id)"
                    v-text="`mdi-minus-circle-outline`"
                  />
                </v-list-item-avatar>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <the-confirm-dialog
      v-if="currentDialog !== ''"
      v-model="dialog"
      :title="dialogs[currentDialog].title"
      :description="dialogs[currentDialog].description"
      @close="closeDialog"
    />
  </v-container>
</template>
<script>
import TheConfirmDialog from "@/components/dialogs/TheConfirmDialog";
import {find} from "lodash";

const DIALOGS = {
  DELETE: 'delete',
  ADD: 'add'
}
export default {
  components: {
    TheConfirmDialog,
  },
  data() {
    return {
      dialogs: {
        delete: {
          title: 'Delete workout',
          description: 'Are you sure you want to delete?'
        },
        add: {
          title: 'Add workout',
          description: 'Do you want to add this workout?'
        }
      },
      currentDialog: '',
      selectedWorkout: '',
      dialog: false,
      newWorkout: '',
      workouts: [],
    }
  },
  async mounted() {
    this.workouts = await this.getWorkouts()
  },
  methods: {
    goDetail(element) {
      this.$router.push({path: `/workouts/${element}`})
    },
    closeDialog(confirm) {
      this.dialog = false
      if (this.currentDialog === DIALOGS.ADD) {
          if (confirm) {
            this.addWorkout({title: this.newWorkout})
            this.newWorkout = ''
          }
      } else if (this.currentDialog === DIALOGS.DELETE) {
        if (confirm) {
          this.deleteWorkout()
        } else {
          this.selectedWorkout = ''
        }
      }
      this.currentDialog = ''
    },
    openRemoveWorkoutModal(id) {
      this.currentDialog = DIALOGS.DELETE
      this.selectedWorkout = id
      this.dialog = true
    },
    validateAddInput() {
      if (this.newWorkout === '') {
        return
      }
      if (find(this.workouts, {title: this.newWorkout})) {
        this.$toast.error('Workout already exists')
        return
      }
      this.openAddConfirmModal()
    },
    openAddConfirmModal() {
      this.currentDialog = DIALOGS.ADD
      this.dialog = true
    },
    async getWorkouts() {
      const {data} = await this.$api.workout.workouts()
      return data
    },
    async deleteWorkout() {
      const {data} = await this.$api.workout.deleteWorkout(this.selectedWorkout)
      if (data.show_yn === 'N') {
        this.$toast(`Workout removed`);
        this.workouts = await this.getWorkouts()
      } else {
        this.$toast.error(`Workout remove failed`);
      }

    },
    async addWorkout(params) {
      try {
        const {data} = await this.$api.workout.AddWorkout(params)
        if (data.title !== '') {
          this.workouts = await this.getWorkouts()
          this.$toast('Workout created')
        } else {
          this.$toast.error('failed to create workout')
        }
      } catch (e) {
        this.$toast.error('API ERROR')
        return e
      }
    }
  }
}
</script>
