export function setScoreShown(payload:boolean) {
  return {
    type: 'SET_SCORE_SHOWN',
    payload: payload
  }
};

export function setAllowBackgroundSound(payload:boolean) {
  return {
    type: 'ALLOW_BACKGROUND_SOUND',
    payload: payload
  }
};

export function setAllowFXSound(payload:boolean) {
  return {
    type: 'ALLOW_FX_SOUND',
    payload: payload
  }
};