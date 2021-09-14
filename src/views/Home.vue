<template>
  <v-container fluid>
    <v-card
      class="mx-auto"
      max-width="500"
    >
      <v-container class="pa-10 text-h2">
        {{ today }}
      </v-container>
      <v-divider />
      <v-container class="pa-10">
        <v-row
          align="center"
          justify="start"
        >
          <v-col
            v-for="(selection, i) in selections"
            :key="selection.text"
            class="shrink"
          >
            <v-chip
              close
              @click:close="selected.splice(i, 1)"
            >
              <v-icon
                left
                v-text="selection.icon"
              />
              {{ selection.text }}
            </v-chip>
          </v-col>

          <v-col
            v-if="!allSelected"
            cols="12"
          >
            <v-text-field
              ref="search"
              v-model="search"
              full-width
              hide-details
              label="Search"
              single-line
            />
          </v-col>
        </v-row>
      </v-container>

      <v-divider v-if="!allSelected" />

      <v-list>
        <template v-for="item in categories">
          <v-list-item
            v-if="!selected.includes(item)"
            :key="item.text"
            @click="selected.push(item)"
          >
            <v-list-item-avatar>
              <v-icon
                v-text="item.icon"
              />
            </v-list-item-avatar>
            <v-list-item-title v-text="item.text" />
          </v-list-item>
        </template>
      </v-list>

      <v-divider />
      <v-container class="pa-10">
        <v-btn @click="goExercise">운동 시작</v-btn>
      </v-container>
    </v-card>
  </v-container>
</template>
<script>
import dayjs from "dayjs";

export default {
  name: 'TheHome',
  data() {
    return {
      today: dayjs().format('YYYY-MM-DD ddd'),
      selectedWorkouts: ['ashtanga', 'leg', 'arm'],
      search: '',
      items: [
        {
          text: 'Ashtanga',
          icon: 'mdi-nature',
        },
        {
          text: 'Leg Day',
          icon: 'mdi-glass-wine',
        },
        {
          text: 'Arm Day',
          icon: 'mdi-calendar-range',
        },
        {
          text: 'Cardio',
          icon: 'mdi-map-marker',
        },
        {
          text: 'Abs',
          icon: 'mdi-bike',
        },
        {
          text: 'Stretching',
          icon: 'mdi-cup',
        },
        {
          text: 'Form Roller',
          icon: 'mdi-pause',
        },
        {
          text: 'Tabata',
          icon: 'mdi-walk',
        },
      ],
      selected:[],
    }
  },
  computed: {
    categories () {
      const search = this.search.toLowerCase()

      if (!search) return this.items

      return this.items.filter(item => {
        const text = item.text.toLowerCase()

        return text.indexOf(search) > -1
      })
    },
    allSelected () {
      return this.selected.length === this.items.length
    },
    selections () {
      const selections = []

      for (const selection of this.selected) {
        selections.push(selection)
      }

      return selections
    },
  },
  methods: {
    goExercise() {
      console.info('goExercise')
    }
  }

}
</script>
