export let context: any;
export let contextArray: any[] = [];
export let gain: any;
export let gainArray: any[] = [];
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
      soundsArray[file.i] = contextArray[file.i].createBufferSource();
      soundsArray[file.i].buffer = bufferArray[file.i]
      soundsArray[file.i].detune.value = pitch ? pitch : 0;
      soundsArray[file.i].loop = loop ? loop : false

      gain = contextArray[file.i].createGain();
      gain.gain.value = volume ? volume : 1;
      
      gainArray[file.i] = gain
      soundsArray[file.i].connect(gain);
      gain.connect(contextArray[file.i].destination);

      //soundsArray[file.i] = source

      // soundsArray[file.i].onended = (e:any) => {
      //   //console.log(`123 FINISH SOUND ${file.f}`)
      //   //soundsArray[file.i].close()
      //   //soundsArray[file.i].disconnect()
      //   //soundsArray[file.i].stop()
      //   source.disconnect(gain);

      //   gain.disconnect(context.destination);
      //   //soundsArray = []
      // }

      //soundsArray[file.i].start()

      //if (soundsArray[file.i].context.state !== 'running') soundsArray[file.i].start()
      soundsArray[file.i].start()

      //console.log("LLLLEGO ACA")
      //return "done"
    //}
  }

  if (!soundsArray[file.i]) {
    console.log("333 PRIMERO")
    //context = new AudioContext();

    //contextArray[file.i] = context
    contextArray[file.i] = new AudioContext();

    const response: any = await fetch(file.n)
    //console.log("test123", response)
    await contextArray[file.i].decodeAudioData(await response.arrayBuffer(),  (buff: any) => {
      //buffer = buff;
      bufferArray[file.i] = buff;
      playBuffer()
    })
    return contextArray[file.i]
  } else {
    console.log("333 SEGUNDO")
    playBuffer()
    //soundsArray[file.i].start()
    //soundsArray[file.i].start()
  }
    
}