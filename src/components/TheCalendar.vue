<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar
          flat
          dense>
          <v-spacer />
          <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="prev">
            <v-icon small> mdi-chevron-left </v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="next">
            <v-icon small> mdi-chevron-right </v-icon>
          </v-btn>
          <v-spacer />
          <v-btn
            :x-small="isMobile"
            outlined
            color="grey darken-2"
            @click="setToday">
            Today
          </v-btn>
        </v-toolbar>
      </v-sheet>
      <v-sheet :height="height">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="eventsByBreakpoint"
          :event-color="getEventColor"
          :event-text-color="isMobile ? 'black' : 'white'"
          :type="type"
          :event-more="false"
          @click:event="onEventClicked"
          @click:date="onEventClicked"
          @change="updateRange" />
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x>
          <v-card
            color="grey lighten-4"
            min-width="350px"
            flat>
            <v-toolbar
              :color="selectedEvent.color"
              dark>
              <v-toolbar-title v-html="selectedEvent.name" />
              <v-spacer />
              <v-spacer />
              <v-btn
                icon
                @click="goToEdit">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text>
              <v-list
                v-for="item in selectedEvent.details"
                :key="item.id">
                <v-list-item>{{ item.title }}</v-list-item>
              </v-list>
            </v-card-text>
            <v-card-actions>
              <v-btn
                text
                color="secondary"
                @click="selectedOpen = false">
                Cancel
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
      <v-sheet
        v-if="isMobile"
        height="20vh"
        class="mt-3">
        <v-card>
          <v-row no-gutters>
            <v-toolbar
              height="30px"
              flat>
              <v-spacer />
              <v-btn
                v-if="isLaterThanToday(focus)"
                icon
                @click="goToEdit">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </v-toolbar>
          </v-row>
          <v-col
            class="overflow-y-auto"
            :style="{ maxHeight: '18vh' }">
            <v-subheader> workouts</v-subheader>
            <v-card-text>
              <template v-if="todayDetail.length">
                <ul
                  v-for="item in todayDetail"
                  :key="item.id">
                  <li>{{ item.title }}</li>
                </ul>
              </template>
              <span v-else>No workout please add</span>
            </v-card-text>
          </v-col>
        </v-card>
      </v-sheet>
    </v-col>
    <the-confirm-dialog
      v-model="confirmDialog"
      :title="'Move'"
      :description="`DO you want to add new workout to ${focus}`"
      @close="dialogAction($event)" />
  </v-row>
</template>
<script>
import dayjs from 'dayjs';
import { range, reduce } from 'lodash';
import TheConfirmDialog from '@/components/dialogs/TheConfirmDialog';
export default {
  components: { TheConfirmDialog },
  data: () => ({
    focus: dayjs().format('YYYY-MM-DD'),
    type: 'month',
    dialog: false,
    confirmDialog: false,
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    todayDetails: '',
    recordsByDate: '',
  }),
  computed: {
    todayDetail() {
      if (this.recordsByDate !== '' || this.recordsByDate.length > 0) {
        if (this.recordsByDate[this.focus]) {
          return this.recordsByDate[this.focus].workouts;
        }
        return [];
      }
      return [];
    },
    eventsByBreakpoint() {
      if (this.isMobile) {
        return this.events.map((item) => {
          return {
            ...item,
            mobileName: item.name,
            name: item.name === 'O' ? '●' : '',
          };
        });
      }
      return this.events;
    },
    isMobile() {
      return this.$vuetify.breakpoint.mobile;
    },
    height() {
      const values = {
        xs: `50vh`,
        sm: 500,
        md: 500,
        lg: `80vh`,
      };
      const name = this.$vuetify.breakpoint.name;
      return values[name] || 550;
    },
  },
  async mounted() {
    this.$refs.calendar.checkChange();
    console.info('selected date', this.focus);
  },
  methods: {
    isLaterThanToday(date) {
      return dayjs(date) < dayjs();
    },
    goToEdit() {
      this.$router.push({ name: 'Home', params: { id: this.focus } });
    },
    getEventColor(event) {
      if (this.isMobile) {
        return '';
      }
      return event.color;
    },
    setToday() {
      this.focus = dayjs().format('YYYY-MM-DD');

      if (this.recordsByDate[this.focus]) {
        this.todayDetails = this.recordsByDate[this.focus].workouts;
      }
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    onEventClicked({ nativeEvent, event, date }) {
      // 오늘보다 미래는 등록안됨
      if (this.isLaterThanToday(date)) {
        return;
      }

      if (this.isMobile) {
        if (event) {
          this.focus = event.start;
          if (this.recordsByDate[this.focus]) {
            this.todayDetails = this.recordsByDate[this.focus].workouts;
          }
          return;
        }
        this.todayDetails = [];
        return;
      }

      if (!event) {
        this.confirmDialog = true;
        // dialog 띄우고 새로운 event 등록할거냐고 묻고 이동한다.
        return;
      }

      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        requestAnimationFrame(() =>
          requestAnimationFrame(() => (this.selectedOpen = true)),
        );
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        requestAnimationFrame(() => requestAnimationFrame(() => open()));
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
    async updateRange({ start }) {
      let today = start.date.split('-');
      this.events = await this.getMonthlyRecord(`${today[0]}-${today[1]}`);
      console.info('focus -- ', this.focus);
      if (this.recordsByDate[this.focus]) {
        this.todayDetails = this.recordsByDate[this.focus].workouts;
      }
    },
    async getMonthlyRecord(yearMonth) {
      const { data: records } = await this.$api.workout.getMonthlyRecord(
        yearMonth,
      );
      const daysInMonth = dayjs().daysInMonth();
      this.recordsByDate = reduce(
        range(1, daysInMonth + 1),
        (result, key) => {
          if (key < 10) {
            key = `0${key}`;
          }
          result[`${yearMonth}-${key}`] ||
            (result[`${yearMonth}-${key}`] = { workouts: [] });
          return result;
        },
        {},
      );

      records.forEach((item) => {
        this.recordsByDate[item.record_date].workouts.push(item.workout);
      });
      const dates = range(1, daysInMonth + 1);
      const results = [];
      dates.forEach((v) => {
        if (v < 10) {
          v = `0${v}`;
        }
        if (dayjs(`${yearMonth}-${v}`) < dayjs()) {
          results.push({
            name: this.recordsByDate[`${yearMonth}-${v}`].workouts.length
              ? 'O'
              : 'X',
            start: `${yearMonth}-${v}`,
            color: this.recordsByDate[`${yearMonth}-${v}`].workouts.length
              ? 'green'
              : 'red',
            details: this.recordsByDate[`${yearMonth}-${v}`].workouts,
          });
        }
      });
      return results;
    },
    async dialogAction(data) {
      this.confirmDialog = false;
      if (data) {
        this.goToEdit();
      }
    },
  },
};
</script>
