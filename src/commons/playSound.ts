//export let context: any;
export let contextArray: any[] = [];
export let gain: any;
export let gainArray: any[] = [];
//let buffer: any;
let bufferArray: any[] = []
//export let source: any;
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

  //const playBuffer = async () => {

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

      //if (file.i === 17 && soundsArray[file.i].context.currentTime === 0) soundsArray[file.i].start()
      //else soundsArray[file.i].start()
      //soundsArray[file.i].start()
      soundsArray[file.i].start()

      return contextArray[file.i]

      //console.log("LLLLEGO ACA")
      //return "done"
    //}
  //}


    // console.log("333 SEGUNDO")
    // playBuffer()

  
    
}

interface loadAllSoundsI {
  file?: any
}

export const loadAllSounds = async ({ file }: loadAllSoundsI) => {
  contextArray[file.i] = new AudioContext();
  const response: any = await fetch(file.n)
  await contextArray[file.i].decodeAudioData(await response.arrayBuffer(),  (buff: any) => {
    bufferArray[file.i] = buff;
    soundsArray[file.i] = contextArray[file.i].createBufferSource();
    soundsArray[file.i].buffer = bufferArray[file.i]
    soundsArray[file.i].detune.value = 0;
    soundsArray[file.i].loop = false
    gain = contextArray[file.i].createGain();
    gain.gain.value = 1;
    gainArray[file.i] = gain
    soundsArray[file.i].connect(gain);
    gain.connect(contextArray[file.i].destination);
  })
  return file.i
}