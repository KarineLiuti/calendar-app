<template>
  <div id="header">
    <div id="monthDisplay">{{dateDisplay}}</div>
    <div>
      <button id="backButton" @click="goToPreviousMonth">Back</button>
      <button id="nextButton"  @click="goToNextMonth">Next</button>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
  },
  props: {
    dateDisplay: String,
  },
  methods: {
    goToNextMonth() {
      this.$emit('next-month');
    },
    goToPreviousMonth() {
      this.$emit('previous-month');
    },
  },
};
</script>
