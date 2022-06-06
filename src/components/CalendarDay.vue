<template>
  <div @click="selectDay(day)" @keypress="() => {}"
    class="day"
    :class="{'padding': day.padding, 'currentDay': day.isCurrentDay}">
    {{getValue(day)}}
    <div v-if="events.length">
      <div class="event mt-1"
      v-for="(event, index) in eventsToShow" :key="event.id" :class="`color--${event.color}`">
        <span v-if="index < 2">
          {{event.title}}
        </span>
      </div>
      <h6 v-if="events.length > 2">view more</h6>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  mounted() {},
  props: {
    day: {},
  },
  computed: {
    ...mapGetters(
      'calendar',
      ['getEvents'],
    ),
    events() {
      return this.getEvents.filter((event) => event.date === this.day.date);
    },
    eventsToShow() {
      let events = this.getEvents.filter((event) => event.date === this.day.date);
      if (events.length > 2) {
        events = events.slice(0, 2);
      }
      return events;
    },
  },
  methods: {
    getValue(day) {
      return day.padding ? '' : day.value;
    },
    selectDay(day) {
      this.$emit('click-day', day);
    },
  },
};
</script>

<style scoped>
.color--blue {
  background-color: rgb(0, 94, 148);
}
.color--orange {
  background-color: rgb(255, 186, 59);
}
.color--red {
  background-color: rgb(240, 150, 150);
}
</style>
