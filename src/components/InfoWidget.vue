<script setup lang="ts">
const props = defineProps({
  open: Boolean,
});
</script>

<template>
  <Transition name="fade">
    <div v-if="props.open" class="modal-backdrop z-50">
      <div class="content">
        <div class="header flex justify-between items-start">
          <h1 class="text-3xl font-bold my-1">Information</h1>
          <button
            class="p-2 hover:text-red-400 hover:bg-red-400 hover:bg-opacity-20 rounded-full leading-none h-10 transition-colors"
            @click="$emit('close')"
          >
            <span class="material-symbols-outlined"> close </span>
          </button>
        </div>
        <ul class="list-disc ml-6">
          <li>
            This website shows the list of events during the School Exhibition
            event of 2023, along with their live status.
          </li>
          <li>
            QR codes have been put up throughout the campus, which can be
            scanned to access this website.
          </li>
          <li>
            Please note that the live status is based on the scheduled time of
            the event and does not account for any delays.
          </li>
        </ul>
        <div class="text-sm">
          Credits:
          <p>
            <a class="text-blue-400 underline" href="https://brin.is-a.dev"
              >Trinethr</a
            >
            (10 C), Rohan Rao (10 A), Neel Theganahally (10 C)
          </p>
          <p>This website was created by students of SKPS ICSE</p>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style>
.modal-backdrop {
  @apply fixed top-0 left-0 right-0 bottom-0 flex p-4 justify-center items-center bg-black bg-opacity-20 backdrop-blur-sm;
}
.content {
  @apply flex flex-col gap-6 w-96 bg-zinc-800 p-6 rounded-2xl;
  transition: transform 0.25s ease;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-from .content,
.fade-leave-to .content {
  transform: scale(80%);
}
</style>
