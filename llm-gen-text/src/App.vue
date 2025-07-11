<script setup lang="ts">
import { ref } from 'vue';
const prompt = ref('');
const thinking = ref(false);
const process = ref('0%')
const imageUrl = ref('');

async function generateImage() {
  const endpoint = '/api/sse';
  const modelName = 'flux-dev';
}
</script>

<template>
  <div class="h-screen container mx-auto flex flex-col gap-4 p-4">
    <div class="input bg-white rounded p-4 flex justify-center gap-4">
      <input type="text" v-model="prompt" placeholder="Enter your text to generate image"
        class="w-96 px-4 rounded-full border-none outline outline-neutral-200 focus-within:outline-black" />
      <button @click="generateImage"
        class="bg-black text-white px-4 py-2 rounded-3xl cursor-pointer hover:bg-neutral-800">Generate</button>
    </div>

    <div class="answer bg-white rounded p-4 flex flex-col gap-3">
      <h2 class="font-bold text-lg">Image: </h2>

      <div class="text-sm w-96 h-96 bg-neutral-200 flex justify-center items-center rounded-lg p-4">
        <div v-if="!thinking"
          class="text-sm w-6 h-6 border border-black rounded-full border-l-transparent border-b-transparent border-r-transparent border-t-neutral-600 animate-spin">
        </div>
        <img v-else src="#" alt="image" class="w-full h-full object-cover" />
      </div>
    </div>
  </div>
</template>