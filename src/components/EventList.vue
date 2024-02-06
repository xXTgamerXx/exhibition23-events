<script setup lang="ts">
const props = defineProps(["name", "list", "noEventText", "statusNumber"]);
import EventCard from "./EventCard.vue";
</script>

<template>
  <div>
    <h1 class="text-xl mb-2">{{ props.name }}</h1>
    <div class="text-center text-zinc-200 text-sm" v-if="list.length == 0">
      {{ props.noEventText }}
    </div>
    <div class="eventList flex flex-col md:flex-row md:flex-wrap gap-2">
      <EventCard
        v-for="el in list"
        :name="el.name"
        :venue="el.venue"
        :start-time="el.startTime"
        :end-time="el.endTime"
        :status="props.statusNumber"
      />
    </div>
  </div>
</template>
