<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar
          flat
        >
          <v-btn
            outlined
            class="mr-4"
            color="grey darken-2"
            @click="setToday"
          >
            Today
          </v-btn>
          <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="prev"
          >
            <v-icon small>
              mdi-chevron-left
            </v-icon>
          </v-btn>
          <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="next"
          >
            <v-icon small>
              mdi-chevron-right
            </v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="events"
          :event-color="getEventColor"
          :type="type"
          @click:event="showEvent"
          @click:more="showEvent"
          @click:date="showEvent"
          @change="updateRange"
        />
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card
            color="grey lighten-4"
            min-width="350px"
            flat
          >
            <v-toolbar
              :color="selectedEvent.color"
              dark
            >
              <v-btn
                icon
                @click="goToEdit"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-toolbar-title v-html="selectedEvent.name" />
              <v-spacer />
              <v-spacer />
              <the-dialog :date="selectedEventDate" />
            </v-toolbar>
            <v-card-text>
              <span v-html="selectedEvent.details" />
            </v-card-text>
            <v-card-actions>
              <v-btn
                text
                color="secondary"
                @click="selectedOpen = false"
              >
                Cancel
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-col>
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar
          dark
          color="primary"
        >
          <v-btn
            icon
            dark
            @click="dialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Move</v-toolbar-title>
          <v-spacer />
        </v-toolbar>
        <v-list
          three-line
          subheader
        >
          <v-subheader justify="center">
            DO you want to add new workout to {{ selectedEventDate }}?
          </v-subheader>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="green darken-1"
              text
              @click="dialog = false"
            >
              No
            </v-btn>
            <v-btn
              color="red darken-1"
              text
              @click="goToEdit"
            >
              Yes
            </v-btn>
          </v-card-actions>
        </v-list>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import TheDialog from "@/components/TheDialog";
import dayjs from "dayjs";
import {map, range, reduce} from "lodash";
export default {
  components: {TheDialog},
  data: () => ({
    selectedEventDate: '',
    focus: '',
    type: 'month',
    typeToLabel: {
      month: 'Month',
      week: 'Week',
      day: 'Day',
    },
    dialog: false,
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
    names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
  }),
  async mounted() {
    this.$refs.calendar.checkChange()
  },
  methods: {
    getFormattedWorkoutList(workouts) {
      if (workouts.length) {
        const items = workouts.map((item) =>{
          return `<li>${item.title}</li>`
        }).join()
        return `<ul>${items}</ul>`
      }
      return ''
    },
    async getMonthlyRecord(yearMonth) {
      const { data: records } = await this.$api.workout.getMonthlyRecord(yearMonth)
      const daysInMonth = dayjs().daysInMonth()
      const vv = reduce(range(1, daysInMonth+1), (result, key) => {
        if (key < 10) {
          key = `0${key}`
        }
        (result[`${yearMonth}-${key}`] || (result[`${yearMonth}-${key}`] = {workouts: []}));
        return result;
      }, {})

      records.forEach((item) => {
        vv[item.record_date].workouts.push(item.workout)
      })
      const dates = range(1, daysInMonth+1)
      const results = []
      dates.forEach((v) => {
        if (v < 10) {
          v = `0${v}`
        }
        if (dayjs(`${yearMonth}-${v}`) < dayjs()) {
          results.push({
            name: vv[`${yearMonth}-${v}`].workouts.length? 'O' : 'X',
            start: `${yearMonth}-${v}`,
            color: vv[`${yearMonth}-${v}`].workouts.length? 'green' : 'red',
            details: this.getFormattedWorkoutList(vv[`${yearMonth}-${v}`].workouts)
          })
        }
      })
      return results
    },
    goToEdit() {
      this.$router.push({name: 'Home', params: {id: this.selectedEventDate}})
    },
    getEventColor(event) {
      return event.color
    },
    setToday() {
      this.focus = ''
    },
    prev() {
      this.$refs.calendar.prev()
    },
    next() {
      this.$refs.calendar.next()
    },
    showEvent({nativeEvent, event, date}) {
      if (!event) {
        this.selectedEventDate = date
        this.dialog = true
        // dialog 띄우고 새로운 event 등록할거냐고 묻고 이동한다.
        return
      }
      console.info(event)
      this.selectedEventDate = event.start
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        requestAnimationFrame(() => requestAnimationFrame(() => this.selectedOpen = true))
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        requestAnimationFrame(() => requestAnimationFrame(() => open()))
      } else {
        open()
      }

      nativeEvent.stopPropagation()
    },
    async updateRange({start}) {
      let today = start.date.split('-')
      this.events = await this.getMonthlyRecord(`${today[0]}-${today[1]}`)
    },
  },
}
</script>
