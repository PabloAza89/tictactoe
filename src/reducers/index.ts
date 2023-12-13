interface initialStateI {
  scoreShown: boolean,
  allowBgSound: boolean,
  allowFXSound: boolean
}

const initialState: initialStateI = {
  scoreShown: localStorage.getItem('scoreShown') !== null ? JSON.parse(localStorage.getItem('scoreShown')!) : false,
  allowBgSound: localStorage.getItem('allowBgSound') !== null ? JSON.parse(localStorage.getItem('allowBgSound')!) : true,
  allowFXSound: localStorage.getItem('allowFXSound') !== null ? JSON.parse(localStorage.getItem('allowFXSound')!) : true,
}

const reducer = (state = initialState, action: {type: string; payload: any}) => {
  switch (action.type) {
    case 'SET_SCORE_SHOWN':
      return {
        ...state,
        scoreShown: action.payload
      };
    case 'ALLOW_BG_SOUND':
      return {
        ...state,
        allowBgSound: action.payload
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

