let context: any = new AudioContext();

let gain: any = context.createGain();
// gain.gain.value = 1;

// let delay = context.createDelay(1.0);
// delay.delayTime.setValueAtTime(1, context.currentTime)
// //source.loop = true;

// let filter = context.createBiquadFilter();
// filter.type = "allpass";
// filter.frequency.value = 8;

// let convolver = context.createConvolver();
// /// convolver.buffer = buffer; // CONVOLVER NEEDS BUFFER..
    
// const panner = context.createPanner();
// panner.panningModel = "HRTF";
// panner.distanceModel = "inverse";
// panner.refDistance = 1;
// panner.maxDistance = 10000;
// panner.rolloffFactor = 1;
// panner.coneInnerAngle = 360;
// panner.coneOuterAngle = 0;
// panner.coneOuterGain = 0;

// let oscillator = context.createOscillator();
// oscillator.type = "square";
// oscillator.frequency.setValueAtTime(3000, context.currentTime); // value in hertz

// const panNode = context.createStereoPanner();
// panNode.pan.setValueAtTime(-1, context.currentTime);

// const compressor = context.createDynamicsCompressor();
// compressor.threshold.setValueAtTime(-50, context.currentTime);
// compressor.knee.setValueAtTime(40, context.currentTime);
// compressor.ratio.setValueAtTime(12, context.currentTime);
// compressor.attack.setValueAtTime(0, context.currentTime);
// compressor.release.setValueAtTime(0.25, context.currentTime);

// const distortion = context.createWaveShaper();

// function makeDistortionCurve(amount: any) {
//   const k = typeof amount === "number" ? amount : 50;
//   const n_samples = 44100;
//   const curve = new Float32Array(n_samples);
//   const deg = Math.PI / 180;

//   for (let i = 0; i < n_samples; i++) {
//     const x = (i * 2) / n_samples - 1;
//     curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
//   }
//   return curve;
// }

// // …

// //distortion.curve = makeDistortionCurve(400);
// distortion.curve = new Float32Array(44100)
// distortion.oversample = "4x";

// source --> gain1 --> gain1 --> filter --> filter --> context.destination
// source --> filter --> filter --> context.destination

export const playSound = async (data: any, pitch?: number, volume?: number, mute?: boolean) => {
  //if (mute) return
  try {
    const playBuffer = (buffer: any) => {
      let source = context.createBufferSource();
      source.buffer = buffer;
      
      //delay.buffer = buffer
      //convolver.buffer = buffer;
    
       //const convolver = context.createConvolver();
       //convolver.buffer = reverbBuffer;
    
      
      //convolver.connect(source);
      //source.connect(convolver);
      //source.connect(delay);
      
      //convolver.connect(filter);
      //source.connect(filter);
      //oscillator.connect(filter);
      //gain1.connect(filter);
      //state.gain2.connect(filter);
      source.detune.value = pitch ? pitch : 0;

      source.connect(gain);

      gain.gain.value = volume ? volume : 1;
      //source.loop = true;
      gain.connect(context.destination);


      source.start();
    }


    const response = await fetch(data)
    //console.log("123 response.arrayBuffer()", await response.arrayBuffer())
    context.decodeAudioData(await response.arrayBuffer(), playBuffer);

    //audioCtx.decodeAudioData(await response.arrayBuffer(), createReverb);

    
  } catch (err: any) { console.log(err) }
}