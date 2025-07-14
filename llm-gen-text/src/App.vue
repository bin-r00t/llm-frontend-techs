<script setup lang="ts">
import ProcessBar from "./components/ProcessBar.vue";
import Result from "./components/Result.vue";
import Loading from "./components/Loading.vue";
import { ClipboardDocumentIcon } from "@heroicons/vue/24/outline";
import FormItem from "./components/FormItem.vue";
import DebugWindow from "./components/DebugWindow.vue";

import { getRouteUrl } from './utils/url.ts'

import { ref } from "vue";

/** prompt and settings */
const prompt = ref("");
const steps = ref(42); // 1 <= x <= 50, defaults to 28
const guidance = ref(3); // 1.5 <= x <= 5, defaults to 3
const width = ref(1024);
const height = ref(768);
const safety_tolerance = ref(2); // 0 <= x <= 6, defaults to 2
const output_format = ref<'jpeg' | 'png'>('jpeg');
const webhook_url = ref<string | null>(null); // string lenght: 1 - 2083
const webhook_secret = ref<string | null>(null);
const seed = ref(Date.now())
const prompt_upsampling = ref(true);
const endpoint = ref("/bfl/v1/flux-dev");

/** process and result */
const thinking = ref(false);
const progress = ref("0%");
const imageUrl = ref("");
const messages = ref<string[]>([]);

function log(msg: string) {
  messages.value.push(msg);
}

async function generateImage() {
  thinking.value = true;
  const payload = {
    prompt: prompt.value,
    image_prompt: null, // todo
    steps: steps.value,
    width: width.value,
    height: height.value,
    prompt_upsampling: prompt_upsampling.value,
    seed: seed.value || Date.now(),
    guidance: guidance.value,
    safety_tolerance: safety_tolerance.value,
    // TODO:
    output_format: output_format.value,
    webhook_url: webhook_url.value,
    webhook_secret: webhook_secret.value,
  };
  const headers = {
    "Content-Type": "application/json",
    "x-key": import.meta.env.VITE_BFL_APIKEY,
  };
  const res = await fetch(endpoint.value, {
    headers,
    method: "POST",
    body: JSON.stringify(payload),
  });

  log("请求id:" + endpoint.value);

  // const id = (await res.json()).id;
  const pollingUrl = (await res.json()).polling_url;
  log("请求状态:" + pollingUrl);

  do {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const uri = getRouteUrl(pollingUrl)
    const result = await fetch(uri);
    log("jump:" + uri);
    //{
    //   "id": "4cc84fe4-42a5-4ad7-949f-082c3322768c",
    //   "status": "Ready",
    //   "result": {
    //     "sample": "https://delivery-eu1.bfl.ai/results/25/0029386a87db56/6a87db5603ef4e26aa5af1445d68e079/sample.jpeg?se=2025-07-14T07%3A36%3A43Z&sp=r&sv=2024-11-04&sr=b&rsct=image/jpeg&sig=U9dahoK3XJdS3S1saShPHZurAAJMpCloK3tKrveh41E%3D",
    //     "prompt": "a photograph of a teenage couple playing badminton on a court. The couple is mid-motion, with one player swinging a racket while the other prepares to return the shuttlecock. The sky is clear with soft clouds, and sunlight filters through, casting gentle shadows on the court. The realistic style captures the details of their clothing, the texture of the court, and the expressions of joy on their faces. The camera is positioned behind one of the players, capturing the action from a dynamic angle. The overall mood is lively and cheerful.",
    //     "seed": 42,
    //     "start_time": 1752477995.95983,
    //     "end_time": 1752478003.52603,
    //     "duration": 7.56620097160339
    //   },
    //   "progress": null,
    //   "details": null,
    //   "preview": null
    // }
    const resultJson = await result.json();
    if (resultJson.status === "Pending") {
      const progressValue = resultJson.progress;
      if (progressValue) {
        progress.value = `${Math.round(progressValue * 100)}%`;
        log("进度更新:" + progressValue);
      }
      continue;
    }
    const sample = resultJson.result?.sample;
    if (sample) {
      imageUrl.value = sample;
      log("图片更新:" + sample);
    } else {
      imageUrl.value =
        "https://res.bearbobo.com/resource/upload/vNg4ALJv/6659895-ox36cbkajrr.png";
      log("图片生成失败，错误原因:" + JSON.stringify(resultJson));
    }
    thinking.value = false;
    break;
  } while (1);
}

// async function downloadImage() {
//   if (!imageUrl.value) return;
//   try {
//     const res = await fetch(imageUrl.value); // cors error
//     const blob = await res.blob();
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.target = "_blank";
//     a.download = `generated-image-${Date.now()}.${output_format.value}`;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//   }
//   catch (e) {
//     log('下载失败: ' + e);
//   }
// }

function downloadImage() {
  if (!imageUrl.value) return;
  const a = document.createElement("a");
  a.href = imageUrl.value;
  a.target = "_blank";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
</script>

<template>
  <div class="h-screen flex w-full">
    <div
      class="left overflow-y-auto w-96 flex flex-col gap-2 bg-white border-r border-neutral-200 divide-y divide-neutral-200">
      <section class="input p-4 flex flex-col gap-4">
        <textarea v-model="prompt" placeholder="Enter your text to generate image" rows="4"
          class="p-4 rounded-md text-sm border-none outline outline-neutral-200 focus-within:outline-black" />
        <button @click="generateImage"
          class="bg-black text-white px-4 py-2 self-end rounded-md cursor-pointer hover:bg-neutral-800">
          Generate
        </button>
      </section>

      <!-- endpoint setting  -->
      <section class="part-2 p-4 flex flex-col gap-2">
        <FormItem input label="Endpoint" :icon="ClipboardDocumentIcon" html-for="endpoint" v-model="endpoint" />
        <FormItem input label="Width" html-for="width" v-model="width" />
        <FormItem input label="Height" html-for="height" v-model="height" />
        <FormItem input label="Steps" html-for="steps" v-model="steps" />
        <FormItem input label="Guidance" html-for="guidance" v-model="guidance" />
        <FormItem input label="Safety Tolerance" html-for="safety_tolerance" v-model="safety_tolerance" />
        <FormItem input label="Seed" html-for="seed" v-model="seed" />
        <FormItem label="Prompt Upsampling" html-for="prompt_upsampling" v-model="prompt_upsampling" checkbox />
        <FormItem label="Output Format" html-for="output_format" :simple-options="['jpeg', 'png']"
          v-model="output_format" />
      </section>

      <!-- TODO: other settings -->
      <!-- <section class="part-2 p-4">1</section>
      <section class="part-2 p-4">2</section> -->
      <section class="part-3 p-4">
        <label class="text-xs text-gray-400">Logs</label>
        <DebugWindow v-if="messages.length" :messages="messages" />
        <p class="my-4 text-xs text-neutral-400">There is no log yet!</p>
      </section>
    </div>
    <div class="right flex-1 flex bg-neutral-100">
      <div class="answer w-full bg-white rounded flex flex-col">
        <section class="head flex items-center justify-between border-b p-4 border-neutral-200">
          <h2 class="font-bold text-lg">
            <ProcessBar v-if="thinking" :progress="progress" />
            <p v-else-if="!imageUrl" class="font-light text-neutral-500">
              📷 📷 📷 准备好啦 👋
            </p>
            <Result v-if="imageUrl" type="done" text="Done!" />
          </h2>
          <button v-if="imageUrl" @click="downloadImage"
            class="bg-black text-white px-4 py-2 self-end rounded-md cursor-pointer hover:bg-neutral-800">
            Download
          </button>
        </section>
        <section
          class="images-container flex-1 overflow-y-auto text-sm bg-neutral-200 flex justify-center items-center">
          <Loading v-if="thinking" />
          <div v-else-if="!imageUrl">
            <p class="font-bold text-neutral-500 text-center w-96 leading-8">
              请输入 prompt 然后点击生成
            </p>
          </div>
          <img v-if="imageUrl" :src="imageUrl" alt="image" class="w-full h-full object-cover" />
        </section>
      </div>
    </div>
  </div>
</template>
