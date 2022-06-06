<template>
  <div class="day" :class="{'padding': day.padding, 'currentDay': day.isCurrentDay}">
    {{getValue(day)}}
    <div  class="event" v-if="day.events && day.events.length">
      {{day.events}}
      {{day.events.title}}
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
  },
  props: {
    day: {},
    onclick: () => {},
  },
  methods: {
    getValue(day) {
      return day.padding ? '' : day.value;
    },
  },
};
</script>
