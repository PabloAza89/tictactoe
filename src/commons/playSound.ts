let context: any;
let buffer: any;
let source: any;
export let soundsArray: any[] = []

interface playSoundI {
  file?: any,
  buffered?: boolean,
  pitch?: number,
  volume?: number,
  index?: number
}

export const arraySoundResetter = () => {
  soundsArray = []
}

export const playSound = async ({ file, buffered, pitch, volume, index }: playSoundI) => {
  const playBuffer = async () => {
      context = new AudioContext();
      source = context.createBufferSource();
      source.buffer = buffer
      source.detune.value = pitch ? pitch : 0;
      source.connect(context.destination);
      //arr[0] = source.current
      //soundsArray.push(source)
      //soundsArray[0] = source
      //if (index !== undefined) soundsArray[index] = source
      soundsArray[file.i] = source
      source.start()
    }

  if (buffered) playBuffer()
  else {
    context = new AudioContext();
    const response: any = await fetch(file.f)
    console.log("test123", response)
    context.decodeAudioData(await response.arrayBuffer(),  (buff: any) => {
      buffer = buff
      playBuffer()
    })
  }
  
}