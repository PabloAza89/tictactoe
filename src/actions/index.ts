export function setScoreShown(payload:boolean) {
  return {
    type: 'SET_SCORE_SHOWN',
    payload: payload
  }
};

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