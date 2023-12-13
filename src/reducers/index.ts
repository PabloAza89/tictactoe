interface initialStateI {
  scoreShown: boolean,
  allowBackgroundSound: boolean,
  allowFXSound: boolean
}

const initialState: initialStateI = {
  scoreShown: localStorage.getItem('scoreShown') !== null ? JSON.parse(localStorage.getItem('scoreShown')!) : false,
  allowBackgroundSound: localStorage.getItem('allowBackgroundSound') !== null ? JSON.parse(localStorage.getItem('allowBackgroundSound')!) : true,
  allowFXSound: localStorage.getItem('allowFXSound') !== null ? JSON.parse(localStorage.getItem('allowFXSound')!) : true,
}

const reducer = (state = initialState, action: {type: string; payload: any}) => {
  switch (action.type) {
    case 'SET_SCORE_SHOWN':
      return {
        ...state,
        scoreShown: action.payload
      };
    case 'ALLOW_BACKGROUND_SOUND':
      return {
        ...state,
        allowBackgroundSound: action.payload
      };
    case 'ALLOW_FX_SOUND':
      return {
        ...state,
        allowFXSound: action.payload
      };
    default:
      return state
  }
};

export default reducer;

