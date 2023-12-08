let context: any = new AudioContext();
let gain1: any = context.createGain();
gain1.gain.value = 1;


export async function playSound (data: any, pitch?: number) {
  try {
    const playBuffer = (buffer: any) => {
      let source = context.createBufferSource();
      source.buffer = buffer;
      
      const filter = context.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = 4;
    
       //const convolver = context.createConvolver();
       //convolver.buffer = reverbBuffer;
    
      
      //source.connect(gain1);
      
      source.connect(filter);
      //gain1.connect(filter);
      //state.gain2.connect(filter);
    
      filter.connect(context.destination);


      source.start();
    }


    const response = await fetch(data)
    //console.log("123 response.arrayBuffer()", await response.arrayBuffer())
    context.decodeAudioData(await response.arrayBuffer(), playBuffer);

    //audioCtx.decodeAudioData(await response.arrayBuffer(), createReverb);

    
  } catch (err: any) { console.log(err) }
}