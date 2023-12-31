export function setAllowBgSound(payload:boolean) {
  return {
    type: 'ALLOW_BG_SOUND',
    payload: payload
  }
};

export function setBgSoundValue(payload:number) {
  return {
    type: 'BG_SOUND_VALUE',
    payload: payload
  }
};

export function setAllowFXSound(payload:boolean) {
  return {
    type: 'ALLOW_FX_SOUND',
    payload: payload
  }
};

export function setFXSoundValue(payload:number) {
  return {
    type: 'FX_SOUND_VALUE',
    payload: payload
  }
};