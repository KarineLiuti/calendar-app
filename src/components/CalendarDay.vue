<template>
  <div @click="selectDay(day)" @keypress="() => {}"
    class="day"
    :class="{'padding': day.padding, 'currentDay': day.isCurrentDay}">
    {{getValue(day)}}
    <div v-if="events.length">
      <div class="event" v-for="event in events" :key="event.id">
        {{event.title}}
      </div>
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
