export let context: any;
let gain: any;
let buffer: any;
let bufferArray: any[] = []
export let source: any;
export let soundsArray: any[] = []

interface playSoundI {
  file?: any,
  pitch?: number,
  volume?: number,
  loop?: boolean,
}

export const arraySoundResetter = () => {
  soundsArray = []
}

export const playSound = async ({ file, pitch, volume, loop }: playSoundI) => {

  const playBuffer = async () => {

    //if (asd) {soundsArray[file.i].start()}
    //else {
      source = context.createBufferSource();
      source.buffer = bufferArray[file.i]
      source.detune.value = pitch ? pitch : 0;
      source.loop = loop ? loop : false

      gain = context.createGain();
      gain.gain.value = volume ? volume : 1;
      source.connect(gain);
      gain.connect(context.destination);

      soundsArray[file.i] = source

      // soundsArray[file.i].onended = (e:any) => {
      //   //console.log(`123 FINISH SOUND ${file.f}`)
      //   //soundsArray[file.i].close()
      //   //soundsArray[file.i].disconnect()
      //   //soundsArray[file.i].stop()
      //   source.disconnect(gain);

      //   gain.disconnect(context.destination);
      //   //soundsArray = []
      // }

      soundsArray[file.i].start()
      //console.log("LLLLEGO ACA")
      return "done"
    //}
  }

  if (!soundsArray[file.i]) {
    console.log("333 PRIMERO")
    context = new AudioContext();
    
    const response: any = await fetch(file.n)
    //console.log("test123", response)
    await context.decodeAudioData(await response.arrayBuffer(),  (buff: any) => {
      //buffer = buff;
      bufferArray[file.i] = buff;
      playBuffer()
    })
    return context
  } else {
    console.log("333 SEGUNDO")
    playBuffer()
    //soundsArray[file.i].start()
    //soundsArray[file.i].start()
  }
    
}