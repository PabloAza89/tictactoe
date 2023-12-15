import store from '../store/store'
//export let context: any;
export let contextArray: any[] = [];
//export let gain: any;
export let gainArray: any[] = [];

//let contextGain = new AudioContext();
//export let gainMain: any[] = [];
export let gainMain: any;
//let buffer: any;
let bufferArray: any[] = []
//export let source: any;
export let soundsArray: any[] = []

interface playSoundI {
  file?: any,
  pitch?: number,
  cV?: number,
  loop?: boolean,
}

export const arraySoundResetter = () => {
  soundsArray = []
}

export const playSound = async ({ file, pitch, cV, loop }: playSoundI) => { // cV = currentVolume

  soundsArray[file.i] = contextArray[file.i].createBufferSource();
  soundsArray[file.i].buffer = bufferArray[file.i]
  soundsArray[file.i].detune.value = pitch ? pitch : 0;
  soundsArray[file.i].loop = loop ? loop : false

  gainArray[file.i] = contextArray[file.i].createGain();

  if (typeof cV === 'number') gainArray[file.i].gain.value = cV

  if (file.i !== 18) gainArray[file.i].gain.value = file.mV * store.getState().FXSoundValue

  soundsArray[file.i].connect(gainArray[file.i]);


  gainArray[file.i].connect(contextArray[file.i].destination);
  gainArray[file.i]['maxVolume'] = file.mV

  soundsArray[file.i].start()
  return contextArray[file.i]
}

interface loadAllSoundsI {
  file?: any,
  mV?: any
}

export const loadAllSounds = async ({ file }: loadAllSoundsI) => {
  contextArray[file.i] = new AudioContext();
  const response: any = await fetch(file.n)
  await contextArray[file.i].decodeAudioData(await response.arrayBuffer(),  (buff: any) => {
    bufferArray[file.i] = buff;
    soundsArray[file.i] = contextArray[file.i].createBufferSource();
    soundsArray[file.i].buffer = bufferArray[file.i]
    //soundsArray[file.i].detune.value = 0;
    //soundsArray[file.i].loop = false

    //gain = contextArray[file.i].createGain();
    //gain.gain.value = 1;

    gainArray[file.i] = contextArray[file.i].createGain();

    // if (typeof volume === 'number') {
    //   gainArray[file.i]['maxVolume'] = volume
    // }
    gainArray[file.i]['maxVolume'] = file.mV
    //gainArray[file.i]['maxVolume'] = 1
    //gainMain[file.i] = contextArray[file.i].createGain();

    

    soundsArray[file.i].connect(gainArray[file.i]);

    

    //gainArray[file.i].connect(gainMain[file.i]);

    gainArray[file.i].connect(contextArray[file.i].destination);
    //gainMain[file.i].connect(contextArray[file.i].destination);
  })
  return file.i
}