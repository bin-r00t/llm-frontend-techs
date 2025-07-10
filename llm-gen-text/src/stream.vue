<script setup lang="ts">
import { ref } from 'vue';
const endpoint = 'https://api.deepseek.com/chat/completions';
const stream = ref(false);
const userMessage = ref('');
const content = ref('');

const sendMessage = async () => {
  content.value = "思考中...";
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${import.meta.env.VITE_DEEPSEEK_APIKEY}`,
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [{ role: 'user', content: userMessage.value }],
      stream: stream.value,
    }),
  });

  if (stream.value) {
    content.value = '';

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    let done = false;
    let chunk = '';

    while (!done) {
      const { done: resDone, value } = await (reader?.read() as unknown as Promise<{ value: any; done: boolean }>);
      done = resDone;

      const chunkValue = chunk + decoder.decode(value);
      chunk = ''

      const lines = chunkValue.split('\n').filter(line => line.startsWith('data: '));

      for (const line of lines) {
        console.log('[Line===>]', line)
        const incoming = line.slice(6); // 'data: ' 的长度
        if (incoming === '[DONE]') {
          // 这个 [DONE] 也是 deepseek 返回的
          done = true;
          break;
        }
        try {
          const data = JSON.parse(incoming);
          const delta = data.choices[0].delta.content;
          if (delta) {
            content.value += delta;
          }
        } catch (err) {
          chunk += `data: ${incoming}`
        }
      }
      if (chunkValue.indexOf('[DONE]') != -1) {
        done = true;
      }
    }

  } else {
    const data = await response.json();
    console.log('[Server Response]', data);
    content.value = data.choices[0].message.content;
  }
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
        Stream
      </label>
    </div>

    <div class="answer bg-white rounded p-4">
      <h2 class="font-bold text-lg">Answer: </h2>
      <p class="text-sm">{{ content }}</p>
    </div>
  </div>
</template>