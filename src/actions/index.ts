import store from '../store/store'

export function getRecipesFromDB() {
  return async function(dispatch: any) {
    return (
      fetch(`${process.env.REACT_APP_SV}/recipes`, {
        method: 'POST', // POST AND NO "GET" BECAUSE NOT BODY ALLOWED ON GET..
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        body: JSON.stringify({
          amountOnline: store.getState().settingsFilters.quantityOnlineRecipes,
          amountOffline: store.getState().settingsFilters.quantityUserRecipes
        })
      })
      .then(resp => resp.json())
      .then(data => dispatch({type: 'FETCH_RECIPES', payload: data}))
      .catch(error => dispatch({type: 'FETCH_RECIPES', payload: error}))
    )
  }
};

export function getDietsFromDB() {
  return async function(dispatch: any) {
    return (
      fetch(`${process.env.REACT_APP_SV}/diets`)
      .then(resp => resp.json())
      .then(data => dispatch({type: 'GET_DIETS', payload: data}))
      .catch(error => dispatch({type: 'GET_DIETS', payload: "error"}))
    )
  }
};

export function getDishesFromDB() {
  return async function(dispatch: any) {
    return (
      fetch(`${process.env.REACT_APP_SV}/dishes`)
      .then(resp => resp.json())
      .then(data => dispatch({type: 'GET_DISHES', payload: data}))
      .catch(error => dispatch({type: 'GET_DISHES', payload: "error"}))
    )
  }
};

export function setIndexChoosen(payload: any) {
  return {
    type: 'SET_INDEX_CHOOSEN',
    payload: payload
  }
};

export function setTabChoosen(payload: any) {
  return {
    type: 'SET_TAB_CHOOSEN',
    payload: payload
  }
};

export function setWidth(setWidth:number) {
  return {
    type: 'SET_WIDTH',
    payload: setWidth
  }
};

export function setHeight(setHeight:number) {
  return {
    type: 'SET_HEIGHT',
    payload: setHeight
  }
};

export function setScrollPosition(setScrollPosition:number) {
  return {
    type: 'SET_SCROLL_POSITION',
    payload: setScrollPosition
  }
};

export function setMenuShown(setMenuShown:boolean) {
  return {
    type: 'SET_MENU_SHOWN',
    payload: setMenuShown
  }
};

export function landingHidden(landingHidden:boolean) {
  return {
    type: 'LANDING_HIDDEN',
    payload: landingHidden
  }
};

export function setServerStatusShown(payload:boolean) {
  return {
    type: 'SET_SERVER_STATUS_SHOWN',
    payload: payload
  }
};

export function setShowStatus(payload:boolean) {
  return {
    type: 'SET_SHOW_STATUS',
    payload: payload
  }
};

export function setShowUserRecipes(payload:boolean) {
  return {
    type: 'SET_SHOW_USER_RECIPES',
    payload: payload
  }
};

export function setShowOnlineRecipes(payload:boolean) {
  return {
    type: 'SET_SHOW_ONLINE_RECIPES',
    payload: payload
  }
};

export function setShowOfflineRecipes(payload:boolean) {
  return {
    type: 'SET_SHOW_OFFLINE_RECIPES',
    payload: payload
  }
};

export function setNavBarFilters(payload:any) {
  return {
    type: 'SET_NAVBAR_FILTERS',
    payload: payload
  }
};

export function setSettingsFilters(payload:any) {
  return {
    type: 'SET_SETTINGS_FILTERS',
    payload: payload
  }
};

export function applyFilters() {
  return {
    type: 'APPLY_FILTERS'
  }
};