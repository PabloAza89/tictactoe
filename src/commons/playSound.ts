let audioCtx: any = new AudioContext();

export async function playSound (data: any, pitch?: number) {
  try {
    const playBuffer = (buffer: any) => {
      let source = audioCtx.createBufferSource();
      source.buffer = buffer;
      source.connect(audioCtx.destination);
      source.detune.value = pitch ? pitch : 0;
      source.loop = false;
      source.start();
    }
    const response = await fetch(data);
    audioCtx.decodeAudioData(await response.arrayBuffer(), playBuffer);
  } catch (err: any) { console.log(err) }
}