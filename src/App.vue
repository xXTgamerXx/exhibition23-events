<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";
import EventList from "./components/EventList.vue";
import InfoWidget from "./components/InfoWidget.vue";

import { events, eventDate } from "./events";
import { getStatus } from "./status";
const infoOpen = ref(false);

type eventList =
  | [{ name: string; venue: string; startTime: string; endTime: string }]
  | [];
const notStarted: Ref<eventList> = ref([]);
const inProgress: Ref<eventList> = ref([]);
const ended: Ref<eventList> = ref([]);

const updateStatus = () => {
  notStarted.value = [];
  inProgress.value = [];
  ended.value = [];
  events.forEach(async (el) => {
    let status = await getStatus(
      new Date(`${eventDate}T${el.startTime}:00`),
      new Date(`${eventDate}T${el.endTime}:00`),
    );
    if (status == 1) notStarted.value.push(el as never);
    else if (status == 2) inProgress.value.push(el as never);
    else if (status == 3) ended.value.push(el as never);
  });
};

setInterval(updateStatus, 15000);

updateStatus();
</script>

<template>
  <div class="flex flex-col p-4 gap-4 h-full w-full">
    <div
      class="header flex flex-col gap-2 items-center text-center mt-4 relative"
    >
      <img
        src="/logo-red.png"
        alt=""
        class="h-24 md:absolute md:h-full md:left-2"
      />
      <h1 class="text-4xl font-bold">Exhibition 2023</h1>
      <h2 class="text-3xl font-medium">Events</h2>
    </div>
    <EventList
      name="In progress"
      :list="inProgress"
      :status-number="2"
      no-event-text="No events are in progress."
    />
    <EventList
      name="Not started"
      :list="notStarted"
      :status-number="1"
      no-event-text="No events are yet to start."
    />
    <EventList
      name="Ended"
      :list="ended"
      :status-number="3"
      no-event-text="No events have ended."
    />

    <InfoWidget :open="infoOpen" @close="infoOpen = false" />
    <Transition name="fade">
      <div class="infoButton" v-if="!infoOpen" @click="infoOpen = true">
        <span class="material-symbols-outlined"> info </span>
        info
      </div>
    </Transition>
  </div>
</template>

<style>
body {
  @apply bg-zinc-900 text-white;
}
.infoButton {
  @apply flex items-center gap-2 justify-between p-3 pr-4 fixed bottom-4 right-4 bg-[#a60f38] leading-none rounded-[3rem] active:scale-95 text-lg select-none cursor-pointer transition-all;
}
</style>
