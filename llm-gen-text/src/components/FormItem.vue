<template>
    <div class="form-item flex flex-col gap-2">
        <label :for="htmlFor" class="text-xs text-gray-400">{{ label }}</label>
        <div v-if="input" class="flex gap-4 items-center">
            <input type="text" :id="htmlFor" v-model="model"
                class="flex-1 p-1 rounded border-none outline outline-neutral-200 focus-within:outline-black text-sm text-gray-600">
            <button @click="handleSuffixBtnClicked" v-if="icon"
                class="p-2 bg-gray-200 rounded-md cursor-pointer hover:bg-gray-300 transition">
                <component :is="icon" class="w-4 h-4 text-gray-600" />
            </button>
        </div>
        <div v-else-if="checkbox" class="checkbox flex items-center gap-2">
            <input :id="htmlFor" type="checkbox" v-model="model">
            <span class="text-sm text-neutral-500">{{ model }}</span>
        </div>
        <div v-else-if="simpleOptions" class="flex flex-wrap gap-2">
            <div @click.prevent="emit('update:modelValue', so)"
                class="simple-option cursor-pointer p-1 px-2 rounded bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs" v-for="so in simpleOptions"
                :class="{ 'bg-gray-200': so === model }" :key="so">{{ so }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    icon: {
        type: Object,
        default: () => null
    },
    htmlFor: {
        type: String,
        default: crypto.randomUUID()
    },
    label: {
        type: String,
        default: 'Title'
    },
    checkbox: {
        type: Boolean,
        default: false
    },
    simpleOptions: {
        type: Array<string>,
        default: () => null
    },
    input: {
        type: Boolean,
        default: false
    }
});

const model = defineModel();
const emit = defineEmits(['click', 'update:modelValue']);

const handleSuffixBtnClicked = () => {
    console.log('model.value', model.value)
}

// watch(model, (v) => {
//     console.log('model change', v);
// })


</script>
