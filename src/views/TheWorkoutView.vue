<template>
  <v-container>
    <v-row
      no-gutters
      class="mb-5"
    >
      <v-col md="5">
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
          @click.stop="addItem"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row
      no-gutters
    >
      <v-col
        md="5"
        style="max-height: 500px"
        class="overflow-y-auto"
      >
        <v-list>
          <draggable
            v-model="workouts"
            group="people"
            @end="onDragEnd"
          >
            <v-list-item
              v-for="element in workouts"
              :key="element.id"
              style="cursor: pointer; text-align: left"
            >
              <v-list-item-title>{{ element.title }}</v-list-item-title>
              <v-list-item-avatar>
                <v-icon
                  v-blur
                  @click.stop="removeWorkout(element.id)"
                  v-text="`mdi-minus-circle-outline`"
                />
              </v-list-item-avatar>
            </v-list-item>
          </draggable>
        </v-list>
      </v-col>
    </v-row>
    <the-confirm-dialog
      v-model="dialog"
      :title="`Delete workout`"
      :description="`Are you sure you want to delete?`"
      @close="closeDialog"
    />
  </v-container>
</template>
<script>
import draggable from 'vuedraggable'
import remove from 'lodash/remove'
import TheConfirmDialog from "@/components/dialogs/TheConfirmDialog";

export default {
  components: {
    TheConfirmDialog,
    draggable
  },
  data() {
    return {
      selectedWorkout: '',
      dialog: false,
      newWorkout: '',
      workouts: []

    }
  },
  async mounted() {
    this.workouts = await this.getWorkouts()
  },
  methods: {
    async getWorkouts() {
      const {data} = await this.$api.workout.workouts()
      return data
    },
    closeDialog(confirm) {
      if (confirm) {
        this.dialog = false
        this.deleteWorkout()
      } else {
        this.selectedWorkout = ''
        this.dialog = false
      }
    },
    onDragEnd(v) {
      if (v.oldIndex !== v.newIndex) {
        console.info(`position moved from ${v.oldIndex} to ${v.newIndex}`)
        // todo: change order API
      }
    },
    removeWorkout(id) {
      // todo: remove item with id
      console.info('remove workout --', id)
      this.dialog = true
      this.selectedWorkout = id
    },
    async deleteWorkout() {
      const {data} = await this.$api.workout.deleteWorkout(this.selectedWorkout)
      if (data.showYn === 'N') {
        this.$toast(`Workout removed`);
        this.workouts = await this.getWorkouts()
      } else {
        this.$toast.error(`Workout remove failed`);
      }

    },
    async addItem() {
      if (this.newWorkout === '') {
        return
      }

      const r = await this.addWorkout({title: this.newWorkout})
      if (r.title !== '') {
        this.workouts = await this.getWorkouts()
        this.$toast('Workout created')
      } else {
        this.$toast.error('failed to create workout')
      }
      this.newWorkout = ''
    },
    async addWorkout(params) {
      try {
        const {data} = await this.$api.workout.AddWorkout(params)
        return data
      } catch (e) {
        return e
      }
    }
  }
}
</script>
