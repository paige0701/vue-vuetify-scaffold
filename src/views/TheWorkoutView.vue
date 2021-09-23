<template>
  <v-container fluid>
    <v-row align="center">
      <v-col cols="10">
        <v-text-field
          v-model="newWorkout"
          label="Workout name"
          hide-details="auto"
        />
      </v-col>
      <v-col cols="2">
        <v-btn
          icon
          color="pink"
          @click="addItem"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-list>
      <draggable
        v-model="workouts"
        group="people"
        @start="drag=true"
        @end="drag=false"
      >
        <v-list-item
          v-for="element in workouts"
          :key="element.id"
        >
          <v-list-item-avatar>
            <v-icon v-text="element.icon" />
          </v-list-item-avatar>
          <v-list-item-title>{{ element.text }}</v-list-item-title>
        </v-list-item>
      </draggable>
    </v-list>
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
        icon: 'mdi-nature',
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
    addItem() {
      if (this.newWorkout === '') {
        return
      }
      this.workouts.unshift({id: this.newWorkout, text: this.newWorkout, icon: ''})
      // todo: icon
      this.newWorkout = ''
    }
  }
}
</script>
