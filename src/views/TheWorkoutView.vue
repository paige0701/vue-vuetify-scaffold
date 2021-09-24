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
          @click="addItem"
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
              <v-list-item-title>{{ element.text }}</v-list-item-title>
              <v-list-item-avatar>
                <v-icon
                  @click="removeWorkout(element.id)"
                  v-text="`mdi-minus-circle-outline`"
                />
              </v-list-item-avatar>
            </v-list-item>
          </draggable>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import draggable from 'vuedraggable'
export default {
  components: {
    draggable
  },
  data() {
    return {
      newWorkout: '',
      workouts: [{
        id: '0',
        text: 'Ashtanga',
        icon: 'mdi-language',
      },
        {
          id: '1',
          text: 'Leg Day',
          icon: 'mdi-glass-wine',
        },
        {
          id: '2',
          text: 'Arm Day',
          icon: 'mdi-calendar-range',
        },
        {
          id: '3',
          text: 'Cardio',
          icon: 'mdi-map-marker',
        },
        {
          id: '4',
          text: 'Abs',
          icon: 'mdi-bike',
        },
        {
          id: '5',
          text: 'Stretching',
          icon: 'mdi-cup',
        },
        {
          id: '6',
          text: 'Form Roller',
          icon: 'mdi-pause',
        },
        {
          id: '7',
          text: 'Tabata',
          icon: 'mdi-walk',
        },]
    }
  },
  methods: {
    onDragEnd(v) {
      if (v.oldIndex !== v.newIndex) {
        console.info(`position moved from ${v.oldIndex} to ${v.newIndex}`)
        // todo: change order API
      }
    },
    removeWorkout(id) {
      // todo: remove item with id
      console.info('remove workout --', id)
    },
    addItem() {
      if (this.newWorkout === '') {
        return
      }
      this.workouts.unshift({id: this.newWorkout, text: this.newWorkout, icon: ''})
      this.newWorkout = ''
    }
  }
}
</script>
