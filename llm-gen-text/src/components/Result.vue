<template>
    <div class="result flex justify-center items-center gap-2">
        <check-circle-icon v-if="type === 'done'" class="text-green-600 w-6 h-6" />
        <h1>{{ text }}</h1>
    </div>
</template>

<script setup lang="ts">
import { CheckCircleIcon } from '@heroicons/vue/16/solid';
import { ref } from 'vue';

const props = defineProps({
    type: {
        type: String,
    },
    text: {
        type: String,
        default: 'Default Text'
    }
});

</script>
