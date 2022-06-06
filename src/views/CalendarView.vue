<template>
  <div>
     <div id="container">
       <CalendarHeader
        :dateDisplay="dateDisplay"
        @next-month="goToNextMonth"
        @previous-month="goToPreviousMonth" />

      <div id="weekdays" >
        <div v-for="day in weekDays" :key="day">{{day}}</div>
      </div>

      <div id="calendar">
        <CalendarDay
          v-for="(day, index) in days"
          :key="index"
          :day="day"
          @click-day="handleDay(day)" />
      </div>
    </div>

    <div id="newEventModal">
      <h2>New Event</h2>

      <input id="eventTitleInput" placeholder="Event Title" />

      <button id="saveButton">Save</button>
      <button id="cancelButton">Cancel</button>
    </div>

    <div id="deleteEventModal">
      <h2>Event</h2>

      <p id="eventText"></p>

      <button id="deleteButton">Delete</button>
      <button id="closeButton">Close</button>
    </div>
    <CalendarDialog
      v-if="isEventOpened"
      :dateDisplay="dateDisplay"
      :isOpen="isEventOpened"
      @close="closeEventsList()"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import CalendarHeader from '@/components/CalendarHeader.vue';
import CalendarDay from '@/components/CalendarDay.vue';
import CalendarDialog from '@/components/CalendarDialog.vue';

export default {
  mounted() {
    this.render();
  },
  name: 'CalendarView',
  props: {
  },
  components: {
    CalendarHeader,
    CalendarDay,
    CalendarDialog,
  },
  data() {
    return {
      nav: 0,
      days: [],
      weekDays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      dateDisplay: undefined,
      isEventOpened: false,
    };
  },
  computed: {
    dateDisplayComputed() {
      return this.dateDisplay;
    },
  },
  watch: {
    nav(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.render();
      }
    },
  },
  methods: {
    ...mapActions('calendar', [
      'addEvent',
      'setClicked',
    ]),
    handleDay(day) {
      this.setClicked(day);
      this.openEventsList();
    },
    goToNextMonth() {
      this.nav += 1;
    },
    goToPreviousMonth() {
      this.nav -= 1;
    },
    openEventsList() {
      this.isEventOpened = true;
    },
    closeEventsList() {
      this.isEventOpened = false;
    },
    render() {
      const dt = new Date();

      if (this.nav !== 0) {
        dt.setMonth(new Date().getMonth() + this.nav);
      }

      const day = dt.getDate();
      const month = dt.getMonth();
      const year = dt.getFullYear();

      const firstDayOfMonth = new Date(year, month, 1);
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      });

      this.dateDisplay = `${dt.toLocaleDateString('en-us', { month: 'long' })} ${year}`;

      const paddingDays = this.weekDays.indexOf(dateString.split(', ')[0]);

      const daysArr = [];

      for (let i = 1; i <= paddingDays + daysInMonth; i += 1) {
        const dayString = `${month + 1}/${i - paddingDays}/${year}`;

        if (i > paddingDays) {
          daysArr.push({
            value: i - paddingDays,
            padding: false,
            isCurrentDay: i - paddingDays === day && this.nav === 0,
            date: dayString,
          });
        } else {
          daysArr.push({
            value: i - paddingDays,
            padding: true,
            isCurrentDay: false,
            date: dayString,
          });
        }
      }

      this.days = daysArr;
    },
  },
};
</script>
