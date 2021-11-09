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
      <v-sheet :height="height">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="events"
          :event-color="getEventColor"
          :type="type"
          :event-height="eventHeight"
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
              <v-toolbar-title v-html="selectedEvent.name" />
              <v-spacer />
              <v-spacer />
              <v-btn
                icon
                @click="goToEdit"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
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
      <v-sheet
        v-if="isMobile"
        height="20vh"
        class="mt-3"
        style="border: 1px solid red"
      >
        <v-card-text>
          <span
            v-if="todayDetails"
            v-html="todayDetails"
          />
          <span v-else>No workout please add</span>
        </v-card-text>
      </v-sheet>
    </v-col>
    <the-confirm-dialog
      v-model="confirmDialog"
      :title="'Move'"
      :description="`DO you want to add new workout to ${selectedEventDate}`"
      @close="dialogAction($event)"
    />
  </v-row>
</template>
<script>
import dayjs from "dayjs";
import {range, reduce} from "lodash";
import TheConfirmDialog from "@/components/dialogs/TheConfirmDialog";
export default {
  components: {TheConfirmDialog},
  data: () => ({
    selectedEventDate: '',
    focus: '',
    type: 'month',
    dialog: false,
    confirmDialog: false,
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    todayDetails: '',
  }),
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.mobile
    },
    height() {
      const values = {
        xs: `60vh`,
        sm: 500,
        md: 500,
        lg: `80vh`
      }
      const name = this.$vuetify.breakpoint.name
      return values[name] || 550
    },
    eventHeight() {
      const values = {
        xs: 10,
        sm: 20,
        md: 20,
        lg: 20
      }
      const name = this.$vuetify.breakpoint.name
      return values[name] || 20
    }
  },
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

      if (this.isMobile) {
        console.info(event)
        this.todayDetails = event.details
        return
      }

      // 오늘보다 미래는 등록안됨
      if (dayjs(date) > dayjs() ) {
        return
      }
      if (!event) {
        this.selectedEventDate = date
        this.confirmDialog = true
        // dialog 띄우고 새로운 event 등록할거냐고 묻고 이동한다.
        return
      }
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
    async dialogAction(data) {
      this.confirmDialog = false
      if (data) {
        this.goToEdit()
      }
    },
  },
}
</script>
