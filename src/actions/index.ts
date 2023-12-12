export function setScoreShown(payload:boolean) {
  return {
    type: 'SET_SCORE_SHOWN',
    payload: payload
  }
};

export function setAllowSound(payload:boolean) {
  return {
    type: 'ALLOW_SOUND',
    payload: payload
  }
};