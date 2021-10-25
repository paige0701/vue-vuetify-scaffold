<template>
  <v-container fluid>
    <v-card
      class="mx-auto"
      max-width="500"
    >
      <v-container
        class="pa-10"
      >
        <p class="text-sm-h4 text-md-h2">
          {{ today }}
        </p>
      </v-container>
      <v-divider />
      <v-container class="pa-10" v-if="items.length">
        <v-row
          align="center"
          justify="start"
        >
          <v-col
            v-for="(selection, i) in selected"
            :key="selection.title"
            class="shrink"
          >
            <v-chip
              close
              @click:close="selected.splice(i, 1)"
            >
              {{ selection.title }}
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
            :key="item.title"
            @click="selected.push(item)"
          >
            <v-list-item-title v-text="item.title" />
          </v-list-item>
        </template>
      </v-list>

      <v-divider />
      <v-container class="pa-10">
        <v-btn @click="goExercise">
          저장
        </v-btn>
      </v-container>
    </v-card>
  </v-container>
</template>
<script>
import dayjs from "dayjs";
import find from 'lodash/find'
export default {
  name: 'TheHome',
  data() {
    return {
      today: dayjs().format('YYYY-MM-DD ddd'),
      search: '',
      items: [],
      selected:[],
    }
  },
  computed: {
    categories () {
      const search = this.search.toLowerCase()

      if (!search) return this.items

      return this.items.filter(item => {
        const text = item.title.toLowerCase()

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
  async mounted() {

    if (this.$route.params && this.$route.params.id) {
      console.info(this.$route.params.id)
      this.today = dayjs(this.$route.params.id).format('YYYY-MM-DD ddd')
      // fetch exisiting ones
    }
    // get workout list
    this.items = await this.getWorkouts()

    // get existing workout for today.
    const existingWorkouts = await this.getExistingWorkouts()
    if (existingWorkouts.length) {
      existingWorkouts.forEach((item) => {
        const result = find(this.categories, {id: item.id})
        this.selected.push(result)
      })
    }

  },
  methods: {
    timeout(ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    },
    goExercise() {
      if (!this.selected.length) {
        this.$toast.error(`There's nothing to add`);
        return
      }
      this.$toast(`Add exercise`);
    },
    async getExistingWorkouts() {
      await this.timeout(500)
      return  [
        {
          id: 1,
          title: 'Ashtanga',
        },
      ]
    },
    async getWorkouts() {

      const {data} = await this.$api.workout.workouts()
      return data
    },
  }

}
</script>
