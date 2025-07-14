<template>
    <div
        class="debug-window mt-2 border border-neutral-400 w-full bg-white flex flex-col overflow-y-auto divide-y divide-y-netural-200">
        <div v-for="msg in messages" :title="msg"
            class="w-full p-1 text-xs text-gray-400 text-ellipsis overflow-hidden" :key="msg">{{ msg }}</div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    messages: {
        type: Array,
        default: () => []
    }
});


</script>
