import { useState, useEffect, useRef } from "react";
import css from './App.module.css';
import './commons/globalSweetAlert2.css';
import { checkPrevLogin } from './commons/commonsFunc';
import { useSelector } from 'react-redux';
import { Route, Routes, useMatch, useLocation } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import CardsMapper from "./components/CardsMapper/CardsMapper";
import GoogleAuth from './components/GoogleAuth/GoogleAuth';
import Detail from "./components/Detail/Detail";
import GoBack from "./components/GoBack/GoBack";
import Paginate from "./components/Paginate/Paginate";
import NavBar from "./components/NavBar/NavBar";
import GoUp from "./components/GoUp/GoUp";
import ServerStatus from "./components/ServerStatus/ServerStatus";
import Error from './components/Error/Error';
import Settings from './components/Settings/Settings';
import SettingsButton from './components/SettingsButton/SettingsButton';
import MyRecipe from "./components/MyRecipe/MyRecipe";
import About from "./components/About/About";
import { userDataI } from './interfaces/interfaces';
import { useDispatch } from 'react-redux';
import {
  setScrollPosition, getRecipesFromDB, getDietsFromDB,
  getDishesFromDB, applyFilters, setSettingsFilters,
  setIndexChoosen, setTabChoosen
} from './actions';
import { settingsFiltersI, SFTypeNumberI, SFTypeBooleanI } from './interfaces/interfaces';
import $ from 'jquery';
import bgImage from './images/bgImage.webp';

function App() {

  const location = useLocation()
  const dispatch = useDispatch()
  const showHelpBG = [useMatch("/:route")?.params.route?.toLowerCase()].filter(e => e !== "about")[0]
  const landingHiddenState = useSelector((state: { landingHidden: boolean }) => state.landingHidden)
  const settingsFilters = useSelector((state: { settingsFilters:settingsFiltersI }) => state.settingsFilters)
  const menuShown = useSelector((state: {menuShown:boolean}) => state.menuShown)

  const [ userData, setUserData ] = useState<userDataI>({
    email: '',
    fd_tkn: ''
  })

  const [ recipeCreatedOrEdited, setRecipeCreatedOrEdited ] = useState<boolean>(false)

  const retrieveRecipeCreatedOrEdited = (response: boolean) => setRecipeCreatedOrEdited(response)

  const tabsArrREF: any = useRef()
  const tabIDREF = useRef(0)
  const castBC = new BroadcastChannel("cast_BC");
  const feedbackBC = new BroadcastChannel("feedback_BC");

  useEffect(() => {
    let wallpaperBody = document.getElementById('wallpaperBody')
    let wallpaperNav = document.getElementById('wallpaperNav')
    let meta = document.querySelector("meta[name='theme-color']")
    if (settingsFilters.showColor) {
      if (wallpaperBody !== null && wallpaperNav !== null && meta !== null) {
        wallpaperBody.style.background = settingsFilters.backgroundColor
        wallpaperBody.style.backgroundImage = 'unset'
        wallpaperNav.style.background = settingsFilters.backgroundColor
        wallpaperNav.style.backgroundImage = 'unset'
        meta.setAttribute("content", settingsFilters.backgroundColor)
      }
    } else {
      if (wallpaperBody !== null && wallpaperNav !== null && meta !== null) {
        wallpaperBody.style.backgroundImage = `url(${bgImage})`
        wallpaperBody.style.backgroundSize = `cover`
        wallpaperBody.style.backgroundRepeat = `no-repeat`
        wallpaperNav.style.background = `url(${bgImage})`
        wallpaperNav.style.backgroundSize = `cover`
        wallpaperNav.style.backgroundRepeat = `no-repeat`
        meta.setAttribute("content", "#10b58c")
      }
    }
  },[settingsFilters.showColor, settingsFilters.backgroundColor])

  useEffect(() => { // FIRST ONLY-ONE-TIME AUTO-CHECK USER (CHECK USER TOKEN)

    checkPrevLogin({ setUserData, userData })

    feedbackBC.onmessage = (e) => {
      if (e.data.subscribe.length > tabsArrREF.current.subscribe.length) {
        tabsArrREF.current.subscribe = e.data.subscribe
      }
    }

    const tabID = Math.floor(100000 + Math.random() * 900000)
    tabIDREF.current = tabID
    castBC.postMessage({ subscribe: [tabID] });
    tabsArrREF.current = { subscribe: [tabID] }

    castBC.onmessage = (e) => {
      if (e.data.unsubscribe && e.data.unsubscribe.length !== 0) {
        let current = tabsArrREF.current.subscribe
        let incomming = e.data.unsubscribe[0]
        let result = current.filter((e:any) => e !== incomming)
        tabsArrREF.current.subscribe = result
        return
      }
      if (e.data.subscribe && e.data.subscribe.length !== 0 && !e.data.subscribe.includes(tabIDREF.current)) {
        tabsArrREF.current.subscribe.push(e.data.subscribe[0])
        feedbackBC.postMessage({ subscribe: tabsArrREF.current.subscribe})
      }
    };

    sessionStorage.setItem('tabID', JSON.stringify(tabID))

    fetch(`${process.env.REACT_APP_SV}/user`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-type': 'application/json; charset=UTF-8' }
    })
    .then((res) => res.json())
    .then((res) => setUserData({ email: res.email, fd_tkn: res.fd_tkn }))
    .catch(rej => console.log(rej))
    // eslint-disable-next-line
  },[])

  useEffect(() => { // FIRED WHEN WINDOW IS CLOSED OR REFRESH
    const onBeforeUnload = () => {
      castBC.postMessage({ unsubscribe: [tabIDREF.current] })
      if (tabsArrREF.current.subscribe.length === 1) localStorage.removeItem('landingHidden')
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
    // eslint-disable-next-line
  },[])

  const hasChanged = useRef<boolean>(false)

  useEffect(() => { // FIRED ONLY WHEN TAB IS FOCUSED, CHECK VALID USER
    const onFocusFunc = () => {
      checkPrevLogin({ setUserData, userData })

      let showStatus: SFTypeBooleanI = {
        name: `showStatus`,
        value: localStorage.getItem('showStatus') !== null ? JSON.parse(localStorage.getItem('showStatus')!) : true
      }
      let showUserRecipes: SFTypeBooleanI = {
        name: `showUserRecipes`,
        value: localStorage.getItem('showUserRecipes') !== null ? JSON.parse(localStorage.getItem('showUserRecipes')!) : true
      }
      let quantityUserRecipes: SFTypeNumberI = {
        name: `quantityUserRecipes`,
        value: localStorage.getItem('quantityUserRecipes') !== null ? JSON.parse(localStorage.getItem('quantityUserRecipes')!) : 30
      }
      let showOnlineRecipes: SFTypeBooleanI = {
        name: `showOnlineRecipes`,
        value: localStorage.getItem('showOnlineRecipes') !== null ? JSON.parse(localStorage.getItem('showOnlineRecipes')!) : true
      }
      let quantityOnlineRecipes: SFTypeNumberI = {
        name: `quantityOnlineRecipes`,
        value: localStorage.getItem('quantityOnlineRecipes') !== null ? JSON.parse(localStorage.getItem('quantityOnlineRecipes')!) : 15
      }
      let showOfflineRecipes: SFTypeBooleanI = {
        name: `showOfflineRecipes`,
        value:localStorage.getItem('showOfflineRecipes') !== null ? JSON.parse(localStorage.getItem('showOfflineRecipes')!) : true
      }
      let quantityOfflineRecipes: SFTypeNumberI = {
        name: `quantityOfflineRecipes`,
        value: localStorage.getItem('quantityOfflineRecipes') !== null ? JSON.parse(localStorage.getItem('quantityOfflineRecipes')!) : 30
      }

      let allFromLS = [
        showStatus, showUserRecipes, quantityUserRecipes, showOnlineRecipes,
        quantityOnlineRecipes, showOfflineRecipes, quantityOfflineRecipes
      ]

      let allFromRedux = [
        settingsFilters.showStatus, settingsFilters.showUserRecipes, settingsFilters.quantityUserRecipes,
        settingsFilters.showOnlineRecipes, settingsFilters.quantityOnlineRecipes,
        settingsFilters.showOfflineRecipes, settingsFilters.quantityOfflineRecipes
      ]

      Promise.all([
        allFromLS.forEach((e, index) => {
          if (e.value !== allFromRedux[index]) {
            dispatch(setSettingsFilters({ type: e.name, value: e.value }))
            hasChanged.current = true
          }
        })
      ])
      .then(() => {
        if (hasChanged.current) {
          Promise.all([
            dispatch(setIndexChoosen(0)),
            dispatch(setTabChoosen(0)),
            dispatch(getDietsFromDB()),
            dispatch(getDishesFromDB()),
            dispatch(getRecipesFromDB())
          ])
          .then(() => dispatch(applyFilters()))
          .then(() => hasChanged.current = false)
        }
      })
    };
    window.addEventListener("focus", onFocusFunc);
    return () => window.removeEventListener("focus", onFocusFunc);
  })

  let { width, height } = window.screen
  let orientation = window.matchMedia("(orientation: portrait)").matches
  const [ paginateAmount, setPaginateAmount ] = useState<number>(((width < 425 && orientation) || (height < 425 && !orientation)) ? 45 : 90)

  useEffect(() => {
    function handleResize() {
      let { width, height } = window.screen
      let orientation = window.matchMedia("(orientation: portrait)").matches
      if ((width < 425 && orientation) || (height < 425 && !orientation)) setPaginateAmount(45)
      else setPaginateAmount(90)
    }
    function scrollHandler() { dispatch(setScrollPosition($(window).scrollTop() as number)) }
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", scrollHandler);
    }
  })

  let root = document.getElementById('root')
  root && (
  landingHiddenState ? // HIDES LANDING OVERFLOW
  root.style.overflowY = "unset" :
  root.style.overflowY = "hidden" )

  useEffect(() => { // fetch all recipes
    Promise.all([
      dispatch(getDietsFromDB()),
      dispatch(getDishesFromDB()),
      dispatch(getRecipesFromDB())
    ]).then(() => dispatch(applyFilters()))

  },[dispatch])

  return (
    <div className={css.background}>
      <div
        id={`wallpaperNav`}
        className={css.wallpaperNav}
        style={{
          display: showHelpBG ? 'flex' : 'none',
          clipPath:
            location.pathname.toLowerCase() === `/settings` ?
            'polygon(0% 0, 100% 0%, 100% 100px, 0 100px)' :
            menuShown ?
            'polygon(0% 0, 100% 0%, 100% 150px, 0 150px)' :
            'polygon(0% 0, 100% 0%, 100% 100px, 0 100px)'
        }}
      />
      <div
        className={css.wallpaperBody}
        id={`wallpaperBody`}
      />
      <Routes>
        <Route
          path="/"
          element={
            landingHiddenState ?
            <>
              <GoogleAuth
                paginateAmount={paginateAmount}
                setUserData={setUserData}
                userData={userData}
              />
              <ServerStatus />
              <NavBar />
              <SettingsButton />
              <Paginate paginateAmount={paginateAmount} />
              <CardsMapper
                paginateAmount={paginateAmount}
                setUserData={setUserData}
                userData={userData}
              />
              <GoUp />
            </> :
            <Landing
              paginateAmount={paginateAmount}
              setUserData={setUserData}
              userData={userData}
            />
          }
        />
        <Route
          path="/:recipeId"
          element={
            landingHiddenState ?
            <>
              <NavBar />
              <SettingsButton />
              <GoogleAuth
                paginateAmount={paginateAmount}
                setUserData={setUserData}
                userData={userData}
              />
              <ServerStatus />
              <Detail
                paginateAmount={paginateAmount}
                setUserData={setUserData}
                userData={userData}
              />
            </> :
            <Landing setUserData={setUserData} userData={userData} />
          }
        />
        <Route
          path="/MyRecipe"
          element={
            landingHiddenState ?
            <>
              <NavBar
                paginateAmount={paginateAmount}
                recipeCreatedOrEdited={recipeCreatedOrEdited}
              />
              <SettingsButton
                recipeCreatedOrEdited={recipeCreatedOrEdited}
              />
              <GoogleAuth
                paginateAmount={paginateAmount}
                setUserData={setUserData}
                userData={userData}
              />
              <ServerStatus />
              <MyRecipe
                paginateAmount={paginateAmount}
                setUserData={setUserData}
                userData={userData}
                retrieveRecipeCreatedOrEdited={retrieveRecipeCreatedOrEdited}
                recipeCreatedOrEdited={recipeCreatedOrEdited}
              />
            </> :
            <Landing setUserData={setUserData} userData={userData} />
          }
        />
        <Route
          path="/Settings"
          element={
            landingHiddenState ?
            <>
              <NavBar />
              <Settings />
            </> :
            <Landing setUserData={setUserData} userData={userData} />
          }
        />
        <Route
          path="/About"
          element={
            landingHiddenState ?
            <About /> :
            <Landing setUserData={setUserData} userData={userData} />
          }
        />
        <Route
          path="/*"
          element={
            landingHiddenState ?
            <>
              <GoBack />
              <Error />
            </> :
            <Landing setUserData={setUserData} userData={userData} />
          }
        />
      </Routes>
    </div>
  )
}

export default App;