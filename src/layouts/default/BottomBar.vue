<template>
  <v-bottom-navigation
    :value="value"
    color="teal"
    grow>
    <v-btn :to="`/calendar-view`">
      <span>Calendar</span>
      <v-icon>mdi-calendar</v-icon>
    </v-btn>
    <v-btn :to="`/`">
      <span>Today</span>
      <v-icon>mdi-heart</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>
<script>
export default {
  name: 'DefaultBottomBar',
  data: () => ({ value: 1 }),
};
</script>
