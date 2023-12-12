//import { useRef } from 'react';

export let context: any; // = new AudioContext();
let buffer: any;
export let source: any; // = context.createBufferSource();
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
      //context = new AudioContext();
      
      source = context.createBufferSource();
      source.buffer = buffer
      source.detune.value = pitch ? pitch : 0;
      source.connect(context.destination);
      //arr[0] = source.current
      //soundsArray.push(source)
      //soundsArray[0] = source
      //if (index !== undefined) soundsArray[index] = source
      soundsArray[file.i] = source
      // soundsArray[file.i].onended = (e:any) => {
      //   //console.log(`123 FINISH SOUND ${file.f}`)
      //   //soundsArray[file.i].close()
      //   //soundsArray[file.i].disconnect()
      //   //soundsArray[file.i].stop()
      //   //soundsArray = []
      // }
      
      soundsArray[file.i].start()
      console.log("LLLLEGO ACA")
      return "done"
      //console.log("123 EJECUTADO START")
      //source.start()
         
    }

    //try {
      console.log("123 EJECUTADO ELSE")
      context = new AudioContext();
      const response: any = await fetch(file.n)
      //console.log("test123", response)
      await context.decodeAudioData(await response.arrayBuffer(),  (buff: any) => {
        buffer = buff;
   
          //console.log("123 EJECUTADO START")
          //source.start()
        
        playBuffer()
        
        //.catch((e) => {console.log("THIS ERROR", e)})
      })
      //return context
      return context
      // .then(async function () { 
      //   await playBuffer();
      //   //return "done"
      //  })
      //  .then(() => { return "done" })
      

      
      //return
    // }
    // catch(e) {console.log("THIS ERROR", e)}
}