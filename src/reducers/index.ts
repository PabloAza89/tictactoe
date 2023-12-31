import { initialStateI } from '../interfaces/interfaces';

const initialState: initialStateI = {
  allowBgSound: localStorage.getItem('allowBgSound') !== null ? JSON.parse(localStorage.getItem('allowBgSound')!) : true,
  BgSoundValue: localStorage.getItem('BgSoundValue') !== null ? parseFloat(localStorage.getItem('BgSoundValue')!) : 0.4,
  allowFXSound: localStorage.getItem('allowFXSound') !== null ? JSON.parse(localStorage.getItem('allowFXSound')!) : true,
  FXSoundValue: localStorage.getItem('FXSoundValue') !== null ? parseFloat(localStorage.getItem('FXSoundValue')!) : 0.4
}

const reducer = (state = initialState, action: {type: string; payload: any}) => {
  switch (action.type) {
    case 'ALLOW_BG_SOUND':
      return {
        ...state,
        allowBgSound: action.payload
      };
    case 'BG_SOUND_VALUE':
      return {
        ...state,
        BgSoundValue: action.payload
      };
    case 'ALLOW_FX_SOUND':
      return {
        ...state,
        allowFXSound: action.payload
      };
    case 'FX_SOUND_VALUE':
      return {
        ...state,
        FXSoundValue: action.payload
      };
    default:
      return state
  }
};

export default reducer;

