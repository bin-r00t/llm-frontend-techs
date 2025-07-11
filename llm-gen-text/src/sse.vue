<script setup lang="ts">
import { ref } from 'vue';
const endpoint = '/api/sse';
const userMessage = ref('');
const content = ref('');
const stream = ref(false)
const thinking = ref(false);

const sendMessage = async () => {
  thinking.value = true

  setTimeout(async () => {
    if (stream.value) {
      content.value = "";
      const evtSource = new EventSource(`${endpoint}?question=${userMessage.value}`);
      evtSource.addEventListener('message', function (e) {
        thinking.value = false
        content.value += e.data
      })
      evtSource.addEventListener('end', () => { evtSource.close(); });
    } else {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_MOONSHOT_API_KEY}`
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [{ role: 'user', content: userMessage.value }],
          stream: stream.value,
        })
      });
      const data = await response.json();
      content.value = data.choices[0].message.content;
    }
  }, 600)
}
</script>

<template>
  <div class="h-screen bg-neutral-100 flex flex-col gap-4 p-4">
    <div class="input bg-white rounded p-4 flex gap-4">
      <input type="text" v-model="userMessage" placeholder="Enter your text"
        class="w-96 px-4 rounded border-none focus-within:outline" />
      <button @click="sendMessage" class="bg-indigo-500 text-white px-4 py-2 rounded-lg">Ok</button>
      <label for="stream" class="flex items-center gap-2">
        <input type="checkbox" v-model="stream" id="stream" />
        sse
      </label>
    </div>

    <div class="answer bg-white rounded p-4">
      <h2 class="font-bold text-lg">Answer: </h2>
      <p v-if="thinking" class="text-sm">思考中...</p>
      <p class="text-sm">{{ content }}</p>
    </div>
  </div>
</template>