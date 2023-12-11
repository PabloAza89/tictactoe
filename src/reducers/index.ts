interface initialStateI {
  scoreShown: boolean,
  mute: boolean
}

const initialState: initialStateI = {
  scoreShown: localStorage.getItem('scoreShown') !== null ? JSON.parse(localStorage.getItem('scoreShown')!) : false,
  mute: localStorage.getItem('mute') !== null ? JSON.parse(localStorage.getItem('mute')!) : false,
}

const reducer = (state = initialState, action: {type: string; payload: any}) => {
  switch (action.type) {
    case 'SET_SCORE_SHOWN':
      return {
        ...state,
        scoreShown: action.payload
      };
    case 'SET_MUTE':
      return {
        ...state,
        mute: action.payload
      };
    default:
      return state
  }
};

export default reducer;

