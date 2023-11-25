// import {
//   recipesI, serverStatusI, navBarFiltersI, settingsFiltersI
// } from '../interfaces/interfaces';

interface initialStateI {
  serverStatus?: string,
}

const initialState: initialStateI = {
  serverStatus: 'asd',
}

const reducer = (state = initialState, action: {type: string; payload: any}) => {
  switch (action.type) {
    case 'SET_INDEX_CHOOSEN':
      return {
        ...state,
        indexChoosen: action.payload
      };    
    default:
      return state
  }
};

export default reducer;

