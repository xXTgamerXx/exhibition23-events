<script setup lang="ts">
import { ref, computed } from "vue";
import { eventDate } from "../events";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const props = defineProps({
  name: String,
  venue: String,
  startTime: String,
  endTime: String,
  status: Number,
});

const emit = defineEmits(["update"]);

const status = computed(() => {
  if (props.status == 1) return `Starting ${dayjs(startTime).fromNow()}`;
  else if (props.status == 2) return "In progress";
  else if (props.status == 3) return "Ended";
  else return "Loading";
});

const startTime = new Date(`${eventDate}T${props.startTime}:00`);
const endTime = new Date(`${eventDate}T${props.endTime}:00`);

const dtf = new Intl.DateTimeFormat("en", {
  hour: "numeric",
  minute: "numeric",
});

const blinker = ref("bg-green-800");

setInterval(() => {
  if (blinker.value == "bg-green-800") blinker.value = "bg-green-500";
  else blinker.value = "bg-green-800";
}, 750);

/*const updateStatus = () => {
  statusNum.value = getStatus(startTime, endTime);
  if (statusNum.value == 1) {
    status.value = `Starting ${dayjs(startTime).fromNow()}`;
  } else if (statusNum.value == 2) {
    status.value = "In progress";
  } else if (statusNum.value == 3) {
    status.value = "Ended";
  } else {
  }
};

setInterval(updateStatus, 30000);

updateStatus();*/
</script>

<template>
  <div class="card">
    <div class="statusArea flex items-center gap-2">
      <div
        :class="`statusLight w-4 h-4 rounded-lg border border-zinc-200 border-opacity-30 ${
          props.status == 1
            ? 'bg-blue-500'
            : props.status == 2
            ? blinker
            : props.status == 3
            ? 'bg-red-500'
            : 'bg-zinc-500'
        }`"
      ></div>
      <div class="status text-zinc-300 text-sm">{{ status }}</div>
    </div>
    <div class="text-2xl font-medium">{{ name }}</div>
    <div class="details flex flex-col">
      <div class="flex gap-1 items-center">
        <span class="material-symbols-outlined text-lg text-zinc-400">
          location_on
        </span>
        Venue: {{ venue }}
      </div>
      <div class="flex gap-1 items-center">
        <span class="material-symbols-outlined text-lg text-zinc-400">
          schedule
        </span>
        {{ dtf.format(startTime) }} to {{ dtf.format(endTime) }}
      </div>
    </div>
  </div>
</template>

<style>
.card {
  @apply rounded-md md:rounded-2xl flex flex-col gap-2 w-full md:w-80 bg-zinc-800 p-4 min-w-full grow;
}
.card:first-child {
  @apply rounded-t-2xl;
}
.card:only-child {
  @apply rounded-2xl;
}
.card:last-child {
  @apply rounded-b-2xl;
}
</style>
