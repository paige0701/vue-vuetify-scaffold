<template>
  <v-container fluid>
    <v-card>
      <v-toolbar>
        <v-spacer />
        <v-toolbar-title>
          {{ formattedTodayDate }}
        </v-toolbar-title>
        <v-spacer />
      </v-toolbar>
      <v-container fluid>
        <v-subheader>Selected Workouts</v-subheader>
        <v-row
          style="max-height: 150px"
          class="overflow-y-auto"
          align="center"
          justify="start"
        >
          <v-col
            v-for="(selection, i) in selected"
            :key="i"
            class="shrink"
          >
            <v-chip
              close
              @click:close="openDeleteConfirmPopup(selection)"
            >
              {{ selection.title }}
            </v-chip>
          </v-col>
        </v-row>

        <v-row>
          <v-col
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
        <v-row
          :style="{height: workoutListHeight}"
          class="overflow-y-auto"
        >
          <v-col>
            <v-list>
              <template v-for="(item, index) in categories">
                <v-list-item
                  v-if="isAlreadyAdded(item)"
                  :key="index"
                  @click="addToSelected(item)"
                >
                  <v-list-item-title v-text="item.title" />
                </v-list-item>
              </template>
            </v-list>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <the-confirm-dialog
      v-model="dialog"
      :title="'삭제'"
      :description="'삭제하시겠습니다? This process cannot be undone'"
      @close="dialogAction($event)"
    />
  </v-container>
</template>
<script>
import dayjs from "dayjs";
import TheConfirmDialog from "@/components/dialogs/TheConfirmDialog";
export default {
  name: 'TheHome',
  components: {
    TheConfirmDialog
  },
  data() {
    return {
      today: dayjs(),
      search: '',
      items: [],
      selected:[],
      dialog: false,
      selectedDeleteItem: '',
    }
  },
  computed: {
    workoutListHeight() {
      const values = {
        xs: `300px`,
        sm: `300px`,
        md: `40vh`,
        lg: `60vh`
      }
      const name = this.$vuetify.breakpoint.name
      return values[name] || `40vh`
    },
    formattedTodayDate() {
      return this.today.format('YYYY-MM-DD ddd')
    },
    categories () {
      if (this.items.length) {
        const search = this.search.toLowerCase()

        if (!search) return this.items

        return this.items.filter(item => {
          const text = item.title.toLowerCase()

          return text.indexOf(search) > -1
        })
      }
      return []
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
      this.today = dayjs(this.$route.params.id)
    }

    this.selected = await this.getRecords()
    this.items = await this.getWorkouts()

  },
  methods: {
    isAlreadyAdded( {id} ) {
      const index = this.selected.findIndex(item => item.workoutId === id)
      return index === -1
    },
    async dialogAction(data) {
      const deleteItem = this.selectedDeleteItem
      this.selectedDeleteItem = ''
      this.dialog = false
      if (data) {
        const { data : {msg} } = await this.$api.workout.deleteRecord(deleteItem.id)
        if (msg === 'success') {
          this.$toast('Deleted')
          this.selected = await this.getRecords()
        } else {
          this.$toast.error('Delete failed')
        }
      }
    },
    async getRecords() {
      const {data} = await this.$api.workout.getRecords(this.today.format('YYYY-MM-DD'))
      if (data.length) {
        return data.map((item) => {
          return {
            id: item.id,
            title: item.workout.title,
            workoutId: item.workout.id
          }
        })
      }
      return []
    },
    openDeleteConfirmPopup(selection) {
      this.selectedDeleteItem = selection
      this.dialog = true
    },
    async addToSelected(item) {
      const params = {
        record_date: this.today.format('YYYY-MM-DD'),
        workout: item.id,
      }
      try {
        const { data } = await this.$api.workout.addRecord(params)
        this.selected.push(item)
        this.$toast('Workout added')
      } catch (e) {
        this.$toast('Failed')
      }

    },
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
      ]
    },
    async getWorkouts() {

      const {data} = await this.$api.workout.workouts()
      return data
    },
  }

}
</script>
