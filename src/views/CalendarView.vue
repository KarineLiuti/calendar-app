<template>
  <div>
     <div id="container">
       <CalendarHeader />
      <div id="weekdays" >
        <div v-for="day in weekDays" :key="day">{{day}}</div>
      </div>

      <div id="calendar">
        <CalendarDay
          v-for="(day, index) in days"
          :key="index"
          :day="day"
          @click-day="setClickedDay(day)" />
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

     <div id="modalBackDrop"></div>
  </div>
</template>

<script>
import CalendarHeader from '@/components/CalendarHeader.vue';
import CalendarDay from '@/components/CalendarDay.vue';

export default {
  created() {
    this.events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];
  },
  mounted() {
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
          events: this.eventsForDate(dayString),
          isCurrentDay: i - paddingDays === day && this.nav === 0,
          date: dayString,
        });
      } else {
        daysArr.push({
          value: i - paddingDays,
          padding: true,
          events: null,
          isCurrentDay: false,
          date: dayString,
        });
      }
    }

    this.days = daysArr;
  },

  name: 'CalendarView',
  props: {
  },
  components: {
    CalendarHeader,
    CalendarDay,
  },
  data() {
    return {
      nav: 0,
      days: [],
      weekDays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      dateDisplay: undefined,
      clicked: undefined,
      events: [],
    };
  },
  methods: {
    eventsForDate() {
      return this.events.filter((a) => a.date === 'a');
    },
    setClickedDay(day) {
      if (!day.padding) {
        this.clicked = day.date;
      }
      console.log('[this.clicked]', day); // TODO: remove this
    },
  },
};
</script>
