<template>
    <div
        class="process-bar-container w-96 h-2 rounded-lg bg-netural-200 border border-orange-200 overflow-hidden relative">
        <div class="inner progress bg-orange-300 h-full absolute left-0" :style="{ width: progress }"></div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    progress: {
        type: String,
        default: "0%",
    },
});
</script>
