interface initialStateI {
  scoreShown: boolean,
  allowSound: boolean
}

const initialState: initialStateI = {
  scoreShown: localStorage.getItem('scoreShown') !== null ? JSON.parse(localStorage.getItem('scoreShown')!) : false,
  allowSound: localStorage.getItem('allowSound') !== null ? JSON.parse(localStorage.getItem('allowSound')!) : true,
}

const reducer = (state = initialState, action: {type: string; payload: any}) => {
  switch (action.type) {
    case 'SET_SCORE_SHOWN':
      return {
        ...state,
        scoreShown: action.payload
      };
    case 'ALLOW_SOUND':
      return {
        ...state,
        allowSound: action.payload
      };
    default:
      return state
  }
};

export default reducer;

