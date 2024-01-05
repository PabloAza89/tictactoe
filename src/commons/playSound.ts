import { playSoundI, loadAllSoundsI } from '../interfaces/interfaces';
import store from '../store/store'
export let contextArray: any[] = [];
export let gainArray: any[] = [];
export let gainMain: any;
let bufferArray: any[] = []
export let soundsArray: any[] = []

export const arraySoundResetter = () => { soundsArray = [] }

export const playSound = async ({ file, pitch, cV, loop }: playSoundI) => { // cV = currentVolume
  soundsArray[file.i] = contextArray[file.i].createBufferSource();
  soundsArray[file.i].buffer = bufferArray[file.i]
  soundsArray[file.i].detune.value = pitch ? pitch : 0;
  soundsArray[file.i].loop = loop ? loop : false
  gainArray[file.i] = contextArray[file.i].createGain();
  if (typeof cV === 'number') gainArray[file.i].gain.value = cV
  if (file.i !== 18) gainArray[file.i].gain.value = file.mV * store.getState().FXSoundValue
  soundsArray[file.i]
    .connect(gainArray[file.i])
    .connect(contextArray[file.i].destination);
  gainArray[file.i]['maxVolume'] = file.mV
  soundsArray[file.i].start()
  return contextArray[file.i]
}

export const loadAllSounds = async ({ file }: loadAllSoundsI) => {
  contextArray[file.i] = new AudioContext();
  const response: any = await fetch(file.n)
  await contextArray[file.i].decodeAudioData(await response.arrayBuffer(),  (buff: any) => {
    bufferArray[file.i] = buff;
    soundsArray[file.i] = contextArray[file.i].createBufferSource();
    soundsArray[file.i].buffer = bufferArray[file.i]
    gainArray[file.i] = contextArray[file.i].createGain();
    gainArray[file.i]['maxVolume'] = file.mV
    soundsArray[file.i]
      .connect(gainArray[file.i])
      .connect(contextArray[file.i].destination);
  })
  console.log("aF state", soundsArray[18] && soundsArray[18].context.state)
  return file.i
}