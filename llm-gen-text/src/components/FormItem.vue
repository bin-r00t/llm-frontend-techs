<template>
    <div class="form-item flex flex-col gap-2">
        <label :for="htmlFor" class="text-xs text-gray-400">{{ label }}</label>
        <div class="flex gap-4 items-center">
            <input type="text" :id="htmlFor" v-model="model"
                class="flex-1 p-1 rounded border-none outline outline-neutral-200 focus-within:outline-black text-sm text-gray-600">
            <button @click="handleSuffixBtnClicked" v-if="icon"
                class="p-2 bg-gray-200 rounded-md cursor-pointer hover:bg-gray-300 transition">
                <component :is="icon" class="w-4 h-4 text-gray-600" />
            </button>
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
    }
});

const model = defineModel();
const emit = defineEmits(['click']);

const handleSuffixBtnClicked = () => {
    console.log('model.value', model.value)
}

// watch(model, (v) => {
//     console.log('model change', v);
// })


</script>
