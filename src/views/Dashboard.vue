<template>
  <div>
    <h1>Dashboard</h1>
    <template v-if="!isLoading">
      <app-event-card
        v-for="event in events"
        :key="event.id"
        :event="event"
      ></app-event-card>
    </template>
  </div>
</template>

<script>
import axios from "axios";
import EventCard from "@/components/EventCard";

export default {
  name: "Dashboard",
  components: {
    appEventCard: EventCard,
  },
  data() {
    return {
      isLoading: true,
      events: [],
    };
  },
  created() {
    axios.get("http://localhost:3000").then(({ data }) => {
      this.events = data.events.events;
      this.isLoading = false;
    });
  },
};
</script>

<style scoped>
</style>