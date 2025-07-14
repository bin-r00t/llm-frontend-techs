## 1  

```
a teenager couple are playing badminton on court, with beautiful sky and sunshine, relalistic style, photograph, happy, camera is on ones' back
```

result:
```
{
  "id": "4cc84fe4-42a5-4ad7-949f-082c3322768c",
  "status": "Ready",
  "result": {
    "sample": "https://delivery-eu1.bfl.ai/results/25/0029386a87db56/6a87db5603ef4e26aa5af1445d68e079/sample.jpeg?se=2025-07-14T07%3A36%3A43Z&sp=r&sv=2024-11-04&sr=b&rsct=image/jpeg&sig=U9dahoK3XJdS3S1saShPHZurAAJMpCloK3tKrveh41E%3D",
    "prompt": "a photograph of a teenage couple playing badminton on a court. The couple is mid-motion, with one player swinging a racket while the other prepares to return the shuttlecock. The sky is clear with soft clouds, and sunlight filters through, casting gentle shadows on the court. The realistic style captures the details of their clothing, the texture of the court, and the expressions of joy on their faces. The camera is positioned behind one of the players, capturing the action from a dynamic angle. The overall mood is lively and cheerful.",
    "seed": 42,
    "start_time": 1752477995.95983,
    "end_time": 1752478003.52603,
    "duration": 7.56620097160339
  },
  "progress": null,
  "details": null,
  "preview": null
}
```



## 2  
```
Capture a street food vendor in Tokyo at night, shot with a wide-angle lens (24mm) at f/1.8. Use a shallow depth of field to focus on the vendor’s hands preparing takoyaki, with the glowing street signs and bustling crowd blurred in the background. High ISO setting to capture the ambient light, giving the image a slight grain for a cinematic feel
```

result:  
```
{
  "id": "d83b2712-bc58-472a-8ee0-9b890010aca8",
  "status": "Ready",
  "result": {
    "sample": "https://delivery-eu1.bfl.ai/results/12/619757d8123047/d812304730ac4e16a4000da342132f9e/sample.jpeg?se=2025-07-14T07%3A47%3A00Z&sp=r&sv=2024-11-04&sr=b&rsct=image/jpeg&sig=eFo/YlRU393XyxwazldXgprIzUYm9h%2BgHw0hiiPSMzU%3D",
    "prompt": "a photograph of a street food vendor in Tokyo at night, shot with a 24mm wide-angle lens at f/1.8. The focus is on the vendor’s hands preparing takoyaki, with the glowing street signs and bustling crowd blurred in the background. The high ISO setting captures the ambient light, adding a slight grain for a cinematic feel. The vendor wears a white apron and a black hat, with a metal grill and cooking tools visible. The scene is set on a narrow alleyway with neon signs reflecting on wet pavement. The lighting is warm and dim, creating a moody, atmospheric mood.",
    "seed": 1752478609715,
    "start_time": 1752478611.79891,
    "end_time": 1752478620.36032,
    "duration": 8.56141066551209
  },
  "progress": null,
  "details": null,
  "preview": null
}
```


## 3

prompt:  

```
Create an image that juxtaposes the delicate beauty of nature with the harsh reality of urban decay. Show a vibrant cherry blossom tree in full bloom growing out of a cracked concrete sidewalk in a dilapidated city alley. The tree should be the focal point, with its pink petals contrasting against the gray, graffiti-covered walls of surrounding buildings. Include a small bird perched on one of the branches to emphasize the theme of resilience.
```

result:  

```
{
    "id": "d42af31c-40e7-42c3-8691-1a6bd86097f4",
    "status": "Pending",
    "result": null,
    "progress": 0.5,
    "details": null,
    "preview": null
}
```


## 4

prompt:

```
badminton, court, indoor, relalistic style, cannon d7 shooting, big aperture
```


result:  

> http://localhost:5173/bfl/v1/flux-dev  

```
{
    "id": "b5b6d620-798f-4eee-b782-c7be269692f1",
    "polling_url": "https://api.eu1.bfl.ai/v1/get_result?id=b5b6d620-798f-4eee-b782-c7be269692f1"
}
```

> http://localhost:5173/jump?url=https://api.eu1.bfl.ai/v1/get_result?id=b5b6d620-798f-4eee-b782-c7be269692f1  

```
{
    "id": "b5b6d620-798f-4eee-b782-c7be269692f1",
    "status": "Pending",
    "result": null,
    "progress": 0.1,
    "details": null,
    "preview": null
}
```

> http://localhost:5173/jump?url=https://api.eu1.bfl.ai/v1/get_result?id=b5b6d620-798f-4eee-b782-c7be269692f1  

```
{
    "id": "b5b6d620-798f-4eee-b782-c7be269692f1",
    "status": "Ready",
    "result": {
        "sample": "https://delivery-eu1.bfl.ai/results/0d/76146573b7a119/73b7a11960be40fe88c5aa04b22e14fe/sample.jpeg?se=2025-07-14T08%3A06%3A01Z&sp=r&sv=2024-11-04&sr=b&rsct=image/jpeg&sig=PSv%2BxiNmKn5bt8MmqEN3DFBO4%2BaGZokVLPBTdO/7zog%3D",
        "prompt": "a photo-realistic depiction of an indoor badminton court captured with a Canon EOS R7 camera using a large aperture (f/1.8). The court is well-maintained with a dark blue surface and white boundary lines. A player in mid-motion is seen swinging a racket, their body slightly bent with one foot forward, emphasizing the dynamic action. The background shows the gymnasium walls with a few spectators in the distance. The lighting is bright and even, highlighting the player's focused expression and the detailed texture of the racket and shuttlecock. The overall composition is sharp and immersive, capturing the intensity of the game.",
        "seed": 1752479754028,
        "start_time": 1752479755.5179908,
        "end_time": 1752479762.0469856,
        "duration": 6.528994798660278
    },
    "progress": null,
    "details": null,
    "preview": null
}
```

> https://delivery-eu1.bfl.ai/results/0d/76146573b7a119/73b7a11960be40fe88c5aa04b22e14fe/sample.jpeg?se=2025-07-14T08%3A06%3A01Z&sp=r&sv=2024-11-04&sr=b&rsct=image/jpeg&sig=PSv%2BxiNmKn5bt8MmqEN3DFBO4%2BaGZokVLPBTdO/7zog%3D  

[image data (binary data)]





