<template>
  <div id="header">
    <div id="monthDisplay">{{dateDisplay}}</div>
    <div>
      <v-btn class="mr-4" id="backButton" @click="goToPreviousMonth" text>
        Previous
      </v-btn>
      <v-btn id="nextButton"  @click="goToNextMonth" color="primary">
        Next
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
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
