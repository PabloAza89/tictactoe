export function setScoreShown(payload:boolean) {
  return {
    type: 'SET_SCORE_SHOWN',
    payload: payload
  }
};

export function setMute(payload:boolean) {
  return {
    type: 'SET_MUTE',
    payload: payload
  }
};