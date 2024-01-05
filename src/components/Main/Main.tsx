
import css from './MainCSS.module.css';
import com from '../../commons/commonsCSS.module.css';
import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Checkbox } from '@mui/material/';
import { easings } from '../../commons/easingsCSS';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CelebrationIcon from '@mui/icons-material/Celebration';
import { ReactComponent as FXSvg } from '../../images/fxIcon.svg';
import { ReactComponent as LinkedInSvg } from '../../images/linkedIn.svg';
import Slider from '@mui/material/Slider';
import Swal from 'sweetalert2';
import $ from 'jquery';
import check from '../../images/check.png';
import cross from '../../images/cross.png';
import dash from '../../images/dash.png';
import aF from '../../commons/aF';
import { pointsI, highlighterI, handleSequenceI, eachBoxI } from '../../interfaces/interfaces';
import { playSound, soundsArray, loadAllSounds, gainArray, contextArray } from '../../commons/playSound';
import { setAllowBgSound, setBgSoundValue, setAllowFXSound, setFXSoundValue } from '../../actions';
import confetti from 'canvas-confetti';
import silence from '../../audio/silence.mp3';

const Main = () => {

  const welcomeTicTacToe = () => {
    return Swal.fire({
      title: `WELCOME TO TIC&#8209;TAC&#8209;TOE !`,
      text: 'Please, select who start first..',
      heightAuto: false, // PREVENTS SWAL CHANGE BACKGROUND POSITION
      showDenyButton: true,
      confirmButtonText: `<div style="width:125px">LET ME START !</div>`,
      denyButtonText: `<div style="width:125px">AI STARTS !</div>`,
      confirmButtonColor: '#800080', // LEFT OPTION
      denyButtonColor: '#008000', // RIGHT OPTION
    })
  }

  const selectDifficulty = () => {
    return Swal.fire({
      title: "Select difficulty:",
      heightAuto: false, // PREVENTS SWAL CHANGE BACKGROUND POSITION
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: `<div style="width:97px">EASY</div>`,
      denyButtonText: `<div style="width:97px">HARD</div>`,
      cancelButtonText: `<div style="width:97px">NIGHTMARE</div>`,
      confirmButtonColor: '#6060e0', // LEFT OPTION
      denyButtonColor: '#ff4500', // CENTER OPTION
      cancelButtonColor: '#808000', // RIGHT OPTION
      customClass: {
        actions: 'columnPopUp'
      }
    })
  }

  const selectNumberOfRounds = () => {
    if (allowFXSound.current) playSound({ file: aF.menu })
    return Swal.fire({
      title: "Select number of rounds:",
      input: "select",
      heightAuto: false, // PREVENTS SWAL CHANGE BACKGROUND POSITION
      inputValue: roundsValueLS !== null ? parseInt(roundsValueLS, 10) + 1 : "3", // DEFAULT VALUE
      inputOptions: {
        1: " 1",
        2: " 2",
        3: " 3",
        4: " 4",
        5: " 5",
        10: "10",
        15: "15",
        20: "20"
      },
      confirmButtonText: 'GO !',
      confirmButtonColor: '#2e8b57',
      showCancelButton: false,
      inputValidator: (value) => {
        gameEndRoundsNumber.current = parseInt(value, 10) - 1 // ONLY SEND WHEN result.isConfirmed
        localStorage.setItem('roundsValue', JSON.stringify(parseInt(value, 10) - 1))
      }
    })
  }

  const selectNumberOfRoundsUser = () => {
    selectNumberOfRounds()
    .then((result) => {
      if (result.isConfirmed) {
        if (allowFXSound.current) playSound({ file: aF.menu })
        basicOptions()
        userHasStartedThisRound.current = true
        setShouldAIstartState(false)
        setTimeout(() => {
          startTimer()
          clickBlocked.current = false
          showCountdownRound.current = true // ENABLES COUNTDOWN VISUALIZATION
        }, 4300) // SYNC WITH POP-UP CLOSES
      }
      else { // ESCAPE KEY OR CLICK OUTSIDE POPUP
        setTimeout(function() {
          addButtonAnimation()
        },300);
      }
    })
  }

  const selectNumberOfRoundsAI = () => {
    selectNumberOfRounds()
    .then((result) => {
      if (result.isConfirmed) {
        if (allowFXSound.current) playSound({ file: aF.menu })
        basicOptions()
        userHasStartedThisRound.current = false
        clickBlocked.current = true
        setShouldAIstartState(true)
        setTimeout(() => {
          startTimer()
          AIAction()
          showCountdownRound.current = true // ENABLES COUNTDOWN VISUALIZATION
        }, 4300) // SYNC WITH POP-UP CLOSES
      }
      else { // ESCAPE KEY OR CLICK OUTSIDE POPUP
        setTimeout(function() {
          addButtonAnimation()
        },300);
      }
    })
  }

  easings() // JQuery easings..
  const dispatch = useDispatch()

  let rC = useRef<eachBoxI[]>(Array.from({length: 9}, (e,i) => ({ id: i, value: '' }))) // rowsAndColumns

  let allSoundsLoaded = useRef<boolean>(false)
  let score = useRef<any[]>([])
  const gameMode = useRef("easy")
  const allowBgSoundState = useSelector((state: { allowBgSound: boolean }) => state.allowBgSound)
  let allowBgSound = useRef(allowBgSoundState)
  const BgSoundValueState = useSelector((state: { BgSoundValue: number }) => state.BgSoundValue)

  const allowFXSoundState = useSelector((state: { allowFXSound: boolean }) => state.allowFXSound)
  let allowFXSound = useRef(allowFXSoundState)
  const FXSoundValueState = useSelector((state: { FXSoundValue: number }) => state.FXSoundValue)

  const [ confettiAllowed, setConfettiAllowed ] = useState<boolean>(true)
  useEffect(() => {
    let confettiAllowedLS: string | null = localStorage.getItem('confettiAllowed');
    if (confettiAllowedLS !== null) setConfettiAllowed(JSON.parse(confettiAllowedLS))
  },[])

  const [ scoreShown, setScoreShown ] = useState<boolean>(false)
  const [ aboutShown, setAboutShown ] = useState<boolean>(false)
  const [ firstMenuConfettiAutoShown, setFirstMenuConfettiAutoShown ] = useState<boolean>(true)
  const [ menuConfettiShown, setMenuConfettiShown ] = useState<boolean>(false)
  const [ BGMusicShown, setBGMusicShown ] = useState<boolean>(false)
  const [ FXMusicShown, setFXMusicShown ] = useState<boolean>(false)
  let clickBlocked = useRef(true)
  let validClick = useRef(false)
  let continueFlowPopUp = useRef(true)
  const [ points, setPoints ] = useState<pointsI>({ "X": 0, "O": 0 })
  let roundEnd = useRef(false)
  let gameEndRoundsNumber = useRef(0) // 1 ROUNDS
  //let gameEndRoundsNumber = useRef(2) // 3 ROUNDS // DEV
  //let gameEndRoundsNumber = useRef(1) // 2 ROUNDS // DEV
  let gameEndRoundsBoolean = useRef(false)
  let winnerRound = useRef("")
  const [ winnerRoundState, setWinnerRoundState ] = useState("") // ONLY FOR GAME UI DISPLAY REASONS..
  const [ winnerGameState, setWinnerGameState ] = useState("") // ONLY FOR GAME UI DISPLAY REASONS..
  const [ userPlaying, setUserPlaying ] = useState(true)
  let userHasStartedThisRound = useRef(true)
  const [ countdownRound, setCountdownRound ] = useState<number>(3)
  let showCountdownRound = useRef<boolean>(false)
  const [ showCountdownRoundState, setShowCountdownRoundState ] = useState<boolean>(false)
  const [ shouldAIstartState, setShouldAIstartState ] = useState(false) // ONLY FOR GAME UI DISPLAY REASONS..
  const [ newGameStarted, setNewGameStarted ] = useState(false)
  let AIRandomGridIndex = useRef(Math.floor(Math.random() * 9)) // BETWEEN 0 & 8

  let sI = useRef<any>() // strategy Index
  let s2I = useRef<any>() // strategy 2 Index
  let targetIndexes = useRef<any[]>()
  let setO = useRef(new Set())
  let set2O = useRef(new Set())

  const AIAction = async () => {
    let randomTimes = [ 700, 900, 1100, 1300, 1500 ]
    setTimeout(() => {
      if (rC.current.filter((e: any) => e.value === '').length >= 1) {
        let success = false

        const selectRandomPlace = (array: any) => {
          do {
            AIRandomGridIndex.current = Math.floor(Math.random() * array.length)
            if (rC.current[array[AIRandomGridIndex.current]].value === "") {
              rC.current[array[AIRandomGridIndex.current]].value = "O"
              success = true
            }
          } while (success === false)
        }

        const checkIfStrategyWouldWork = (array: any) => {
          let primaryTarget: any[] = []
          let secondaryTarget: any[] = []
          if (array.length === 2) {
            array[0].forEach((e: any) => {
              primaryTarget.push(rC.current[e].value)
            })
            array[1].forEach((e: any) => {
              secondaryTarget.push(rC.current[e].value)
            })
            if (
              rC.current.filter(e => e.value === "O").length === 2 &&
              primaryTarget.filter(e => e === "O").length === 2 &&
              !primaryTarget.some(e => e === "X") &&
              secondaryTarget.some(e => e === "")
            ) {
              targetIndexes.current = array[0]
              return true
            }
            else if (
              rC.current.filter(e => e.value === "O").length === 1 &&
              primaryTarget.filter(e => e === "O").length === 1 &&
              !primaryTarget.some(e => e === "X") &&
              secondaryTarget.some(e => e === "")
            ) {
              targetIndexes.current = array[0]
              return true
            }
            else {
              targetIndexes.current = []
              return false
            }
          } else {
            array.forEach((e: any) => {
              primaryTarget.push(rC.current[e].value)
            })
            if (
              primaryTarget.some((e: any) => e === "") &&
              primaryTarget.some((e: any) => e === "O") &&
              !primaryTarget.some(e => e === "X")
            ) {
              targetIndexes.current = array
              return true
            } else {
              targetIndexes.current = []
              return false
            }
          }
        }

        const executeRandomStrategy = (array: any[]) => {
          if (checkIfStrategyWouldWork(array)) {
            selectRandomPlace(targetIndexes.current)
            return true
          } else return false
        }

        let targetPlaces = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]

        const completeThreeO = () => {
          for (let i = 0; i < targetPlaces.length; i++) {
            if (targetPlaces[i].filter((i:any) => rC.current[i].value === "O").length === 2 && targetPlaces[i].filter((idx: any) => rC.current[idx].value === "").length === 1) {
              rC.current[targetPlaces[i].filter((idx: any) => rC.current[idx].value === "")[0]].value = "O"
              success = true
              break;
            }
          }
        }

        const blockThreeX = () => {
          for (let i = 0; i < targetPlaces.length; i++) {
            if (targetPlaces[i].filter((i:any) => rC.current[i].value === "X").length === 2 && targetPlaces[i].filter((idx: any) => rC.current[idx].value === "").length === 1) {
              rC.current[targetPlaces[i].filter((idx: any) => rC.current[idx].value === "")[0]].value = "O"
              success = true
              break;
            }
          }
        }

        if (gameMode.current === 'easy') {
          let targetIndexes = [0,1,2,3,4,5,6,7,8]
          selectRandomPlace(targetIndexes)
          if (allowFXSound.current) playSound({ file: aF.Omove })
          setShouldAIstartState(false)
          setUserPlaying(true)
        }
        else if (gameMode.current === 'hard') {

          if (!success) completeThreeO() // TRY TO MATCH ALL 3 "O" POSSIBLE //
          if (!success) blockThreeX() // TRY TO BLOCK 3 "X" FROM HUMAN ENEMY //
          if (!success) { // EXECUTE PRIMARY STRATEGIES
            //                              0                 1                 2                 3
            let s =                [[[0,2,4],[1,6,8]],[[2,4,8],[0,5,6]],[[4,6,8],[0,2,7]],[[0,4,6],[2,3,8]], // s === strategy
            //                              4                 5                 6                 7
                                    [[0,1,4],[2,7,8]],[[1,2,4],[0,6,7]],[[2,4,5],[3,6,8]],[[4,5,8],[0,2,3]],
            //                              8                 9                 10                11
                                    [[4,7,8],[0,1,6]],[[4,6,7],[1,2,8]],[[3,4,6],[0,2,5]],[[0,3,4],[5,6,8]],
            //                              12                13                14                15
                                    [[0,2,8],[1,4,5]],[[2,6,8],[4,5,7]],[[0,6,8],[3,4,7]],[[0,2,6],[1,3,4]]]

            setO.current.clear()
            do {
              sI.current = Math.floor(Math.random() * s.length)
              if (!setO.current.has(sI.current)) {
                setO.current.add(sI.current)
                if (executeRandomStrategy(s[sI.current])) {
                  success = true
                }
              }
            } while (success === false && setO.current.size < s.length)
          }

          if (!success) { // EXECUTE SECONDARY STRATEGIES
            //          0       1       2       3       4       5       6       7
            let s = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
            setO.current.clear()

            do {
              sI.current = Math.floor(Math.random() * s.length)
              if (!setO.current.has(sI.current)) {
                setO.current.add(sI.current)
                if (executeRandomStrategy(s[sI.current])) success = true
              }
            } while (success === false && setO.current.size < s.length)

          }

          if (!success) { // RANDOM MOVEMENT
            while (success === false) {
              AIRandomGridIndex.current = Math.floor(Math.random() * 9)
              if (rC.current[AIRandomGridIndex.current].value === "") {
                rC.current[AIRandomGridIndex.current].value = "O"
                success = true
              }
            }
          }

          if (allowFXSound.current) playSound({ file: aF.Omove })
          success = true
          setShouldAIstartState(false)
          setUserPlaying(true)
        } else { // BEGINS EVIL STRATEGY >-)

          if (!success) completeThreeO() // TRY TO MATCH ALL 3 "O" POSSIBLE //

          if (!success) blockThreeX() // THEN TRY TO BLOCK 3 "X" FROM HUMAN ENEMY //

          // if (!success && !rC.current.some(e => e.value === "O")) { // PROGRAMATED FIRST MOVEMENT // ONLY FOR DEVELOP
          //   rC.current[4].value = "O"
          // }

          if ( // O 1st MOVEMENT
            !success &&
            !rC.current.some(e => e.value === "O") &&
            (!rC.current.some(e => e.value === "X") || (rC.current.filter(e => e.value === "X").length === 1 && rC.current[4].value === "X"))
          ) {
            // • - • // •: TARGET PLACE
            // - • - // -: UNUSED
            // • - • //
            let s = [0,2,4,6,8] // s === strategy
            setO.current.clear()
            do {
              sI.current = Math.floor(Math.random() * s.length)
              if (!setO.current.has(sI.current)) {
                setO.current.add(sI.current)
                if (rC.current[s[sI.current]].value === "") {
                  rC.current[s[sI.current]].value = "O"
                  success = true
                }
              }
            } while (success === false && setO.current.size < s.length)
          }

          // START IF O BEGINS //

          if ( // O BEGINS // 2nd MOVEMENT
            !success &&
            rC.current.filter(e => e.value === "O").length === 1 &&
            rC.current[4].value !== "" &&
            rC.current.filter(e => e.value === "X").length === 1
          ) {
            // O X - /or/ O • • // •: TARGET PLACE
            // • • - /or/ X • - // -: UNUSED
            // • - - /or/ - - - //
            //            O   X X
            let s  = [  [[0],[1,3]],      [[2],[5,1]],      [[8],[7,5]],      [[6],[3,7]] ] // s === strategy
            //               ↙  ↘              ↙  ↘              ↙  ↘             ↙  ↘
            let s2 = [ [[3,4,6],[1,2,4]],[[0,1,4],[4,5,8]],[[2,4,5],[4,6,7]],[[4,7,8],[0,3,4]] ] // s2 === strategy 2 based on upper array
            //           • • •   • • •
            setO.current.clear()
            do {
              sI.current = Math.floor(Math.random() * s.length)
              if (!setO.current.has(sI.current)) {
                setO.current.add(sI.current)
                let success2 = false
                if (rC.current[s[sI.current][0][0]].value === "O" && rC.current[s[sI.current][1][0]].value === "X") {
                  set2O.current.clear()
                  do {
                    s2I.current = Math.floor(Math.random() * 3)
                    if (!set2O.current.has(s2I.current)) {
                      set2O.current.add(s2I.current)
                      if (rC.current[s2[sI.current][0][s2I.current]].value === "") {
                        rC.current[s2[sI.current][0][s2I.current]].value = "O"
                        success = true
                        success2 = true
                      }
                    }
                  } while (success2 === false && set2O.current.size < 3)
                }
                else if (rC.current[s[sI.current][0][0]].value === "O" && rC.current[s[sI.current][1][1]].value === "X") {
                  set2O.current.clear()
                  do {
                    s2I.current = Math.floor(Math.random() * 3)
                    if (!set2O.current.has(s2I.current)) {
                      set2O.current.add(s2I.current)
                      if (rC.current[s2[sI.current][1][s2I.current]].value === "") {
                        rC.current[s2[sI.current][1][s2I.current]].value = "O"
                        success = true
                        success2 = true
                      }
                    }
                  } while (success2 === false && set2O.current.size < 3)
                }
              }
            } while (success === false && setO.current.size < s.length)
          }

          if ( // O BEGINS // 2nd MOVEMENT
            !success &&
            rC.current.filter(e => e.value === "O").length === 1 &&
            rC.current[4].value !== "O" &&
            rC.current.filter(e => e.value === "X").length === 1
          ) {
            // O - • /or/ O - • // •: TARGET PLACE
            // - • X /or/ - • - // -: UNUSED
            // • - - /or/ • X - //
            //           O   X X
            let s  = [ [[0],[5,7]], [[2],[7,3]], [[8],[3,1]], [[6],[1,5]] ] // s === strategy
            //                ↓         ↓            ↓            ↓
            let s2 =    [  [2,4,6],  [0,4,8],     [2,4,6],     [0,4,8] ] // s2 === strategy 2 based on upper array
            //              • • •
            setO.current.clear()
            do {
              sI.current = Math.floor(Math.random() * s.length)
              if (!setO.current.has(sI.current)) {
                setO.current.add(sI.current)
                let success2 = false
                if (
                  rC.current[s[sI.current][0][0]].value === "O" &&
                  (rC.current[s[sI.current][1][0]].value === "X" || rC.current[s[sI.current][1][1]].value === "X")
                ) {
                  set2O.current.clear()
                  do {
                    s2I.current = Math.floor(Math.random() * 3)
                    if (!set2O.current.has(s2I.current)) {
                      set2O.current.add(s2I.current)
                      if (rC.current[s2[sI.current][s2I.current]].value === "") {
                        rC.current[s2[sI.current][s2I.current]].value = "O"
                        success = true
                        success2 = true
                      }
                    }
                  } while (success2 === false && set2O.current.size < 3)
                }
              }
            } while (success === false && setO.current.size < s.length)
          }

          if ( // O BEGINS // 2nd MOVEMENT
            !success &&
            rC.current.filter(e => e.value === "O").length === 1 &&
            rC.current.filter(e => e.value === "X").length === 1
          ) {
            // O - X /or/ O • - // •: TARGET PLACE
            // • - - /or/ - - - // -: UNUSED
            // - - - /or/ X - - //
            //          O   X X
            let s  = [[[0],[2,6]],      [[2],[8,0]],      [[8],[6,2]],      [[6],[0,8]]] // s === strategy
            //             ↙  ↘              ↙  ↘              ↙  ↘             ↙  ↘
            let s2 =    [[[3],[1]],        [[1],[5]],        [[5],[7]],        [[7],[3]]] // s2 === strategy 2 based on upper array
            //             •   •
            setO.current.clear()
            do {
              sI.current = Math.floor(Math.random() * s.length)
              if (!setO.current.has(sI.current)) {
                setO.current.add(sI.current)
                if (
                  rC.current[s[sI.current][0][0]].value === "O" &&
                  (rC.current[s[sI.current][1][0]].value === "X" || rC.current[s[sI.current][1][1]].value === "X")
                ) {
                  if (rC.current[s[sI.current][1][0]].value === "X") {
                    rC.current[s2[sI.current][0][0]].value = "O"
                    success = true
                  }
                  else if (rC.current[s[sI.current][1][1]].value === "X") {
                    rC.current[s2[sI.current][1][0]].value = "O"
                    success = true
                  }
                }
              }
            } while (success === false && setO.current.size < s.length)
          }

          if ( // O BEGINS // 2nd MOVEMENT
            !success &&
            rC.current.filter(e => e.value === "O").length === 1 &&
            rC.current.filter(e => e.value === "X").length === 1
          ) {
            // O - - /or/ O - - // •: TARGET PLACE
            // - X - /or/ - • - // -: UNUSED
            // - - • /or/ - - X // (IN 4 POSITIONS)
            //           O   X X
            let s  = [ [[0],[4,8]],      [[2],[4,6]],      [[8],[4,0]],      [[6],[4,2]] ] // s === strategy
            //              ↙  ↘              ↙  ↘              ↙  ↘             ↙  ↘
            let s2 =    [ [[8],[4]],        [[6],[4]],        [[0],[4]],        [[2],[4]] ] // s2 === strategy 2 based on upper array
            //              •   •
            setO.current.clear()
            do {
              sI.current = Math.floor(Math.random() * s.length)
              if (!setO.current.has(sI.current)) {
                setO.current.add(sI.current)
                if (
                  rC.current[s[sI.current][0][0]].value === "O" &&
                  (rC.current[s[sI.current][1][0]].value === "X" || rC.current[s[sI.current][1][1]].value === "X")
                ) {
                  if (rC.current[s[sI.current][1][0]].value === "X") {
                    rC.current[s2[sI.current][0][0]].value = "O"
                    success = true
                  }
                  else if (rC.current[s[sI.current][1][1]].value === "X") {
                    rC.current[s2[sI.current][1][0]].value = "O"
                    success = true
                  }
                }
              }
            } while (success === false && setO.current.size < s.length)
          }

          if ( // O BEGINS // 2nd MOVEMENT
            !success &&
            rC.current.filter(e => e.value === "O").length === 1 &&
            rC.current[4].value === "O" &&
            rC.current.filter(e => e.value === "X").length === 1
          ) {
            // X - - // •: TARGET PLACE
            // - O - // -: UNUSED
            // - - • // (IN 4 POSITIONS)
            //           X   •
            let s  = [ [[0],[8]],      [[2],[6]],      [[8],[0]],      [[6],[2]] ] // s === strategy
            setO.current.clear()
            do {
              sI.current = Math.floor(Math.random() * s.length)
              if (!setO.current.has(sI.current)) {
                setO.current.add(sI.current)
                if (
                  rC.current[s[sI.current][0][0]].value === "X" &&
                  rC.current[s[sI.current][1][0]].value === ""
                ) {
                  rC.current[s[sI.current][1][0]].value = "O"
                  success = true
                }
              }
            } while (success === false && setO.current.size < s.length)
          }

          if ( // O BEGINS // 2nd MOVEMENT
            !success &&
            rC.current.filter(e => e.value === "O").length === 1 &&
            rC.current[4].value === "O" &&
            rC.current.filter(e => e.value === "X").length === 1
          ) {
            // • X • /or/ • - • // •: TARGET PLACE
            // • O • /or/ • O • // -: UNUSED
            // • - • /or/ • X • // (IN 2 POSITIONS)
            //          X "   • • • • • •
            let s  = [[[1,7],[2,5,8,6,3,0]], [[5,3],[0,1,2,8,7,6]]] // s === strategy
            setO.current.clear()
            do {
              sI.current = Math.floor(Math.random() * s.length)
              if (!setO.current.has(sI.current)) {
                setO.current.add(sI.current)
                let success2 = false
                if (
                  rC.current[s[sI.current][0][0]].value === "X" ||
                  rC.current[s[sI.current][0][1]].value === "X"
                ) {
                  set2O.current.clear()
                  do {
                    s2I.current = Math.floor(Math.random() * 6)
                    if (!set2O.current.has(s2I.current)) {
                      set2O.current.add(s2I.current)
                      if (rC.current[s[sI.current][1][s2I.current]].value === "") {
                        rC.current[s[sI.current][1][s2I.current]].value = "O"
                        success = true
                        success2 = true
                      }
                    }
                  } while (success2 === false && set2O.current.size < 6)
                }
              }
            } while (success === false && setO.current.size < s.length)
          }

          if ( // O BEGINS // 3rd MOVEMENT
            !success &&
            rC.current.filter(e => e.value === "O").length === 2 &&
            rC.current.filter(e => e.value === "X").length === 2
          ) {
            // O X - /or/ O • • // •: TARGET PLACE
            // • • - /or/ X • - // -: UNUSED
            // • - - /or/ - - - // (IN 4 POSITIONS)
            //             O   X X
            let s  = [   [[0],[1,3]],      [[2],[5,1]],        [[8],[7,5]],      [[6],[3,7]] ] // s === strategy
            //                ↙  ↘              ↙  ↘               ↙  ↘              ↙  ↘
            let s2 = [ [[3,4,6],[1,2,4]], [[0,1,4],[4,5,8]], [[2,4,5],[4,6,7]], [[4,7,8],[0,3,4]] ] // s2 === strategy 2 based on upper array
            //           • • •   • • • (← SOME IS O, THEN CONTINUE "L" OR "TRIANGLE" RANDOMLY)
            setO.current.clear()
            do {
              sI.current = Math.floor(Math.random() * s.length)
              if (!setO.current.has(sI.current)) {
                setO.current.add(sI.current)
                let success2 = false
                if (
                  rC.current[s[sI.current][0][0]].value === "O" &&
                  rC.current[s[sI.current][1][0]].value === "X" &&
                  (rC.current[s2[sI.current][0][0]].value === "O" || rC.current[s2[sI.current][0][1]].value === "O" || rC.current[s2[sI.current][0][2]].value === "O")
                ) {
                  set2O.current.clear()
                  do {
                    s2I.current = Math.floor(Math.random() * 3)
                    if (!set2O.current.has(s2I.current)) {
                      set2O.current.add(s2I.current)
                      if (rC.current[s2[sI.current][0][s2I.current]].value === "") {
                        rC.current[s2[sI.current][0][s2I.current]].value = "O"
                        success = true
                        success2 = true
                      }
                    }
                  } while (success2 === false && set2O.current.size < 3)
                }
                else if (
                  rC.current[s[sI.current][0][0]].value === "O" &&
                  rC.current[s[sI.current][1][1]].value === "X" &&
                  (rC.current[s2[sI.current][1][0]].value === "O" || rC.current[s2[sI.current][1][1]].value === "O" || rC.current[s2[sI.current][1][2]].value === "O")
                ) {
                  set2O.current.clear()
                  do {
                    s2I.current = Math.floor(Math.random() * 3)
                    if (!set2O.current.has(s2I.current)) {
                      set2O.current.add(s2I.current)
                      if (rC.current[s2[sI.current][1][s2I.current]].value === "") {
                        rC.current[s2[sI.current][1][s2I.current]].value = "O"
                        success = true
                        success2 = true
                      }
                    }
                  } while (success2 === false && set2O.current.size < 3)
                }
              }
            } while (success === false && setO.current.size < s.length)
          }

          if ( // O BEGINS // 3rd MOVEMENT
            !success &&
            rC.current.filter(e => e.value === "O").length === 2 &&
            rC.current.filter(e => e.value === "X").length === 2
          ) {
            // O - • /or/ O - • // •: TARGET PLACE
            // - • X /or/ - • - // -: UNUSED
            // • - - /or/ • X - //
            //          0   X X
            let s  = [[[0],[5,7]],      [[2],[7,3]],      [[8],[3,1]],      [[6],[1,5]]] // s === strategy
            //              ↓ ↓               ↓ ↓               ↓ ↓               ↓ ↓
            let s2 =     [[2,4,6],          [0,4,8],          [2,4,6],          [0,4,8]] // s2 === strategy 2 based on upper array
            //             • • • (← SOME IS O, THEN CONTINUE RECT RANDOMLY)
            setO.current.clear()
            do {
              sI.current = Math.floor(Math.random() * s.length)
              if (!setO.current.has(sI.current)) {
                setO.current.add(sI.current)
                let success2 = false
                if (
                  rC.current[s[sI.current][0][0]].value === "O" &&
                  (rC.current[s[sI.current][1][0]].value === "X" || rC.current[s[sI.current][1][1]].value === "X") &&
                  (rC.current[s2[sI.current][0]].value === "O" || rC.current[s2[sI.current][1]].value === "O" || rC.current[s2[sI.current][2]].value === "O")
                ) {
                  set2O.current.clear()
                  do {
                    s2I.current = Math.floor(Math.random() * 3)
                    if (!set2O.current.has(s2I.current)) {
                      set2O.current.add(s2I.current)
                      if (rC.current[s2[sI.current][s2I.current]].value === "") {
                        rC.current[s2[sI.current][s2I.current]].value = "O"
                        success = true
                        success2 = true
                      }
                    }
                  } while (success2 === false && set2O.current.size < 3)
                }
              }
            } while (success === false && setO.current.size < s.length)
          }

          if ( // O BEGINS // 3rd MOVEMENT
            !success &&
            rC.current.filter(e => e.value === "O").length === 2 &&
            rC.current[4].value === "O" &&
            rC.current.filter(e => e.value === "X").length === 2
          ) {
            // O X - /or/ O • • // •: TARGET PLACE
            // • O - /or/ X O - // -: UNUSED
            // • - X /or/ - - X // (IN 4 POSITIONS) // REVIEW HERE
            //           O X   X X
            let  s = [ [[0,8],[1,3]], [[2,6],[5,1]], [[8,0],[7,5]], [[6,2],[3,7]] ] // s === strategy
            //                ↙  ↘           ↙  ↘           ↙  ↘          ↙  ↘
            let s2 =    [ [[3,6],[1,2]], [[0,1],[5,8]], [[2,5],[6,7]], [[7,8],[0,3]] ] // s2 === strategy 2 based on upper array
            //              • •   • •
            setO.current.clear()
            do {
              sI.current = Math.floor(Math.random() * s.length)
              if (!setO.current.has(sI.current)) {
                setO.current.add(sI.current)
                let success2 = false
                if (
                  rC.current[s[sI.current][0][0]].value === "O" &&
                  rC.current[s[sI.current][0][1]].value === "X" &&
                  rC.current[s[sI.current][1][0]].value === "X"
                ) {
                  set2O.current.clear()
                  do {
                    s2I.current = Math.floor(Math.random() * 2)
                    if (!set2O.current.has(s2I.current)) {
                      set2O.current.add(s2I.current)
                      if (rC.current[s2[sI.current][0][s2I.current]].value === "") {
                        rC.current[s2[sI.current][0][s2I.current]].value = "O"
                        success = true
                        success2 = true
                      }
                    }
                  } while (success2 === false && set2O.current.size < 2)
                }
                else if (
                  rC.current[s[sI.current][0][0]].value === "O" &&
                  rC.current[s[sI.current][0][1]].value === "X" &&
                  rC.current[s[sI.current][1][1]].value === "X"
                ) {
                  set2O.current.clear()
                  do {
                    s2I.current = Math.floor(Math.random() * 2)
                    if (!set2O.current.has(s2I.current)) {
                      set2O.current.add(s2I.current)
                      if (rC.current[s2[sI.current][1][s2I.current]].value === "") {
                        rC.current[s2[sI.current][1][s2I.current]].value = "O"
                        success = true
                        success2 = true
                      }
                    }
                  } while (success2 === false && set2O.current.size < 2)
                }
              }
            } while (success === false && setO.current.size < s.length)
          }

          if ( // O BEGINS // 3rd MOVEMENT
            !success &&
            rC.current.filter(e => e.value === "O").length === 2 &&
            rC.current[4].value === "O" &&
            rC.current.filter(e => e.value === "X").length === 2
          ) {
            // • X - /or/ - X • // •: TARGET PLACE
            // O O X /or/ X O O // -: UNUSED
            // • - - /or/ - - • // (IN 4 POSITIONS)
            //          X   X O   X O
            let s = [ [[1],[5,3],[3,5]],      [[5],[7,1],[1,7]],      [[7],[3,5],[5,3]],      [[3],[1,7],[7,1]] ] // s === strategy
            //               ↓     ↓                 ↓     ↓                 ↓     ↓                 ↓     ↓
            let s2 =    [ [[0,6],[2,8]],          [[0,2],[6,8]],          [[2,8],[0,6]],          [[6,8],[0,2]] ] // s2 === strategy 2 based on upper array
            //              • •   • •
            setO.current.clear()
            do {
              sI.current = Math.floor(Math.random() * s.length)
              if (!setO.current.has(sI.current)) {
                setO.current.add(sI.current)
                let success2 = false
                if (
                  rC.current[s[sI.current][0][0]].value === "X" &&
                  rC.current[s[sI.current][1][0]].value === "X" &&
                  rC.current[s[sI.current][1][1]].value === "O"
                ) {
                  set2O.current.clear()
                  do {
                    s2I.current = Math.floor(Math.random() * 2)
                    if (!set2O.current.has(s2I.current)) {
                      set2O.current.add(s2I.current)
                      if (rC.current[s2[sI.current][0][s2I.current]].value === "") {
                        rC.current[s2[sI.current][0][s2I.current]].value = "O"
                        success = true
                        success2 = true
                      }
                    }
                  } while (success2 === false && set2O.current.size < 2)
                } else if (
                  rC.current[s[sI.current][0][0]].value === "X" &&
                  rC.current[s[sI.current][2][0]].value === "X" &&
                  rC.current[s[sI.current][2][1]].value === "O"
                ) {
                  set2O.current.clear()
                  do {
                    s2I.current = Math.floor(Math.random() * 2)
                    if (!set2O.current.has(s2I.current)) {
                      set2O.current.add(s2I.current)
                      if (rC.current[s2[sI.current][1][s2I.current]].value === "") {
                        rC.current[s2[sI.current][1][s2I.current]].value = "O"
                        success = true
                        success2 = true
                      }
                    }
                  } while (success2 === false && set2O.current.size < 2)
                }
              }
            } while (success === false && setO.current.size < s.length)
          }

          // END IF O BEGINS //

          // START IF X BEGINS //

          if ( // X BEGINS // 1st MOVEMENT
            !success &&
            rC.current.filter(e => e.value === "X").length === 1 &&
            rC.current[4].value === "" &&
            !rC.current.some(e => e.value === "O")
          ) {
            // X - - // •: TARGET PLACE
            // - • - // -: UNUSED
            // - - • // (IN 4 POSITIONS)
            //          X   • •
            let s  = [[[0],[4,8]],      [[2],[4,6]],      [[8],[4,0]],      [[6],[4,2]]] // s === strategy
            setO.current.clear()
            do {
              sI.current = Math.floor(Math.random() * s.length)
              if (!setO.current.has(sI.current)) {
                setO.current.add(sI.current)
                let success2 = false
                if (rC.current[s[sI.current][0][0]].value === "X") {
                  set2O.current.clear()
                  do {
                    s2I.current = Math.floor(Math.random() * 2)
                    if (!set2O.current.has(s2I.current)) {
                      set2O.current.add(s2I.current)
                      if (rC.current[s[sI.current][1][s2I.current]].value === "") {
                        rC.current[s[sI.current][1][s2I.current]].value = "O"
                        success = true
                        success2 = true
                      }
                    }
                  } while (success2 === false && set2O.current.size < 2)
                }
              }
            } while (success === false && setO.current.size < s.length)
          }

          if ( // X BEGINS // 1st MOVEMENT
            !success &&
            rC.current.filter(e => e.value === "X").length === 1 &&
            rC.current[4].value === "" &&
            !rC.current.some(e => e.value === "O")
          ) {
            // • X • // •: TARGET PLACE
            // - • - // -: UNUSED
            // - - - // (IN 4 POSITIONS)
            //          X   • • •
            let s  = [[[1],[0,4,2]],      [[5],[2,4,8]],      [[7],[8,4,6]],      [[3],[6,4,0]]] // s === strategy
            setO.current.clear()
            do {
              sI.current = Math.floor(Math.random() * s.length)
              if (!setO.current.has(sI.current)) {
                setO.current.add(sI.current)
                let success2 = false
                if (rC.current[s[sI.current][0][0]].value === "X") {
                  set2O.current.clear()
                  do {
                    s2I.current = Math.floor(Math.random() * 3)
                    if (!set2O.current.has(s2I.current)) {
                      set2O.current.add(s2I.current)
                      if (rC.current[s[sI.current][1][s2I.current]].value === "") {
                        rC.current[s[sI.current][1][s2I.current]].value = "O"
                        success = true
                        success2 = true
                      }
                    }
                  } while (success2 === false && set2O.current.size < 3)
                }
              }
            } while (success === false && setO.current.size < s.length)
          }

          if ( // X BEGINS // 2nd MOVEMENT
            !success &&
            rC.current.filter(e => e.value === "X").length === 2 &&
            rC.current[4].value === "O" &&
            rC.current.filter(e => e.value === "O").length === 1
          ) {
            // X - - /or/ X - - // •: TARGET PLACE
            // - O X /or/ - O • // -: UNUSED
            // - • - /or/ - X - // (IN 4 POSITIONS)
            //          X   X •   X •
            let s  = [[[0],[5,7],[7,5]],      [[2],[7,3],[3,7]],      [[8],[3,1],[1,3]],      [[6],[1,5],[5,1]]] // s === strategy
            setO.current.clear()
            do {
              sI.current = Math.floor(Math.random() * s.length)
              if (!setO.current.has(sI.current)) {
                setO.current.add(sI.current)
                if (
                  rC.current[s[sI.current][0][0]].value === "X" &&
                  rC.current[s[sI.current][1][0]].value === "X" &&
                  rC.current[s[sI.current][1][1]].value === ""
                ) {
                  rC.current[s[sI.current][1][1]].value = "O"
                  success = true
                }
                else if (
                  rC.current[s[sI.current][0][0]].value === "X" &&
                  rC.current[s[sI.current][2][0]].value === "X" &&
                  rC.current[s[sI.current][2][1]].value === ""
                ) {
                  rC.current[s[sI.current][2][1]].value = "O"
                  success = true
                }
              }
            } while (success === false && setO.current.size < s.length)
          }

          if ( // X BEGINS // 2nd MOVEMENT
            !success &&
            rC.current.filter(e => e.value === "X").length === 2 &&
            rC.current[4].value === "O" &&
            rC.current.filter(e => e.value === "O").length === 1
          ) {
            // X • - // •: TARGET PLACE
            // • O • // -: UNUSED
            // - • X // (IN 2 POSITIONS)
            //           X X   • • • •
            let s  = [ [[0,8],[1,5,7,3]], [[2,6],[1,5,7,3]] ] // s === strategy
            setO.current.clear()
            do {
              sI.current = Math.floor(Math.random() * s.length)
              if (!setO.current.has(sI.current)) {
                setO.current.add(sI.current)
                let success2 = false
                if (
                  rC.current[s[sI.current][0][0]].value === "X" &&
                  rC.current[s[sI.current][0][1]].value === "X"
                ) {
                  set2O.current.clear()
                  do {
                    s2I.current = Math.floor(Math.random() * 4)
                    if (!set2O.current.has(s2I.current)) {
                      set2O.current.add(s2I.current)
                      if (rC.current[s[sI.current][1][s2I.current]].value === "") {
                        rC.current[s[sI.current][1][s2I.current]].value = "O"
                        success = true
                        success2 = true
                      }
                    }
                  } while (success2 === false && set2O.current.size < 4)
                }
              }
            } while (success === false && setO.current.size < s.length)
          }

          if ( // X BEGINS // 2nd MOVEMENT
            !success &&
            rC.current.filter(e => e.value === "X").length === 2 &&
            rC.current[4].value === "X" &&
            rC.current.filter(e => e.value === "O").length === 1
          ) {
            // X - • // •: TARGET PLACE
            // - X - // -: UNUSED
            // • - O // (IN 4 POSITIONS)
            //           X X O   • •
            let s  = [ [[0,4,8],[2,6]], [[2,4,6],[8,0]], [[8,4,0],[6,2]], [[6,4,2],[0,8]] ] // s === strategy
            setO.current.clear()
            do {
              sI.current = Math.floor(Math.random() * s.length)
              if (!setO.current.has(sI.current)) {
                setO.current.add(sI.current)
                let success2 = false
                if (
                  rC.current[s[sI.current][0][0]].value === "X" &&
                  rC.current[s[sI.current][0][1]].value === "X" &&
                  rC.current[s[sI.current][0][2]].value === "O" &&
                  rC.current[s[sI.current][1][0]].value === "" &&
                  rC.current[s[sI.current][1][1]].value === ""
                ) {
                  set2O.current.clear()
                  do {
                    s2I.current = Math.floor(Math.random() * 2)
                    if (!set2O.current.has(s2I.current)) {
                      set2O.current.add(s2I.current)
                      if (rC.current[s[sI.current][1][s2I.current]].value === "") {
                        rC.current[s[sI.current][1][s2I.current]].value = "O"
                        success = true
                        success2 = true
                      }
                    }
                  } while (success2 === false && set2O.current.size < 2)
                }
              }
            } while (success === false && setO.current.size < s.length)
          }

          if ( // X BEGINS // 2nd MOVEMENT //
            !success && //
            rC.current.filter(e => e.value === "X").length === 2 &&
            rC.current.filter(e => e.value === "O").length === 1
          ) {
            // O X - /or/ • X - // •: TARGET PLACE
            // X • - /or/ X O - // -: UNUSED
            // - - - /or/ - - - // (IN 4 POSITIONS)
            //          X X   O •   O •
            let s  = [[[1,3],[0,4],[4,0]],      [[5,1],[2,4],[4,2]],      [[7,5],[8,4],[4,8]],      [[3,7],[6,4],[4,6]]] // s === strategy
            setO.current.clear()
            do {
              sI.current = Math.floor(Math.random() * s.length)
              if (!setO.current.has(sI.current)) {
                setO.current.add(sI.current)
                if (
                  rC.current[s[sI.current][0][0]].value === "X" &&
                  rC.current[s[sI.current][0][1]].value === "X" &&
                  rC.current[s[sI.current][1][0]].value === "O" &&
                  rC.current[s[sI.current][1][1]].value === ""
                ) {
                  rC.current[s[sI.current][1][1]].value = "O"
                  success = true
                }
                else if (
                  rC.current[s[sI.current][0][0]].value === "X" &&
                  rC.current[s[sI.current][0][1]].value === "X" &&
                  rC.current[s[sI.current][2][0]].value === "O" &&
                  rC.current[s[sI.current][2][1]].value === ""
                ) {
                  rC.current[s[sI.current][2][1]].value = "O"
                  success = true
                }
              }
            } while (success === false && setO.current.size < s.length)
          }

          if ( // X BEGINS // 2nd MOVEMENT //
            !success &&
            rC.current.filter(e => e.value === "X").length === 2 &&
            rC.current[4].value === "" &&
            rC.current.filter(e => e.value === "O").length === 1
          ) {
            // O X - /or/ - X O // •: TARGET PLACE
            // - • - /or/ - • - // -: UNUSED
            // X - - /or/ - - X // (IN 4 POSITIONS)
            //          X X   O
            let s = [ [[1,6],[0]], [[5,0],[2]], [[7,2],[8]], [[3,8],[6]],
                      [[1,8],[2]], [[5,6],[8]], [[7,0],[6]], [[3,2],[0]] ] // s === strategy
            setO.current.clear()
            do {
              sI.current = Math.floor(Math.random() * s.length)
              if (!setO.current.has(sI.current)) {
                setO.current.add(sI.current)
                if (
                  rC.current[s[sI.current][0][0]].value === "X" &&
                  rC.current[s[sI.current][0][1]].value === "X" &&
                  rC.current[s[sI.current][1][0]].value === "O"
                ) {
                  rC.current[4].value = "O"
                  success = true
                }
              }
            } while (success === false && setO.current.size < s.length)
          }

          if ( // X BEGINS // 3rd MOVEMENT //
            !success && //
            rC.current[4].value === "" &&
            rC.current.filter(e => e.value === "X").length === 3 &&
            rC.current.filter(e => e.value === "O").length === 2
          ) {
            // - X - // •: TARGET PLACE
            // X • • // -: UNUSED
            // - • - // (IN 4 POSITIONS)
            //           X X   • •
            let s  = [ [[1,3],[5,7]],      [[5,1],[7,3]],      [[7,5],[3,1]],      [[3,7],[1,5]] ] // s === strategy
            setO.current.clear()
            do {
              sI.current = Math.floor(Math.random() * s.length)
              if (!setO.current.has(sI.current)) {
                setO.current.add(sI.current)
                if (
                  rC.current[s[sI.current][0][0]].value === "X" &&
                  rC.current[s[sI.current][0][1]].value === "X" &&
                  rC.current[s[sI.current][1][0]].value === "" &&
                  rC.current[s[sI.current][1][1]].value === ""
                ) {
                  rC.current[4].value = "O"
                  success = true
                }
              }
            } while (success === false && setO.current.size < s.length)
          }

          // END IF X BEGINS //

          if (!success) { // EXECUTE ANY LINEAR STRATEGY
            //           0       1       2       3       4       5       6       7
            let s = [ [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6] ]
            setO.current.clear()
            do {
              sI.current = Math.floor(Math.random() * s.length)
              if (!setO.current.has(sI.current)) {
                setO.current.add(sI.current)
                if (executeRandomStrategy(s[sI.current])) success = true
              }
            } while (success === false && setO.current.size < s.length)
          }

          if (!success) { // EXECUTE ANY RANDOM MOVEMENT
            while (success === false) {
              AIRandomGridIndex.current = Math.floor(Math.random() * 9)
              if (rC.current[AIRandomGridIndex.current].value === "") {
                rC.current[AIRandomGridIndex.current].value = "O"
                success = true
              }
            }
          }

          if (allowFXSound.current) playSound({ file: aF.Omove })
          success = true
          setShouldAIstartState(false)
          setUserPlaying(true)
        }
      }
      checkRoundWinner()
      .then(() => { if (!roundEnd.current) clickBlocked.current = false })
    }, randomTimes[Math.floor(Math.random() * 5)])
  }

  const userAction = async ( target: any) => {
    if (target !== undefined && rC.current[target].value === "") {
      rC.current[target].value = "X"
      if (allowFXSound.current) playSound({ file: aF.Xmove })
      setUserPlaying(false)
      validClick.current = true
      clickBlocked.current = true
    } else validClick.current = false // CLICK IS NOT VALID
  }

  const handleSequence = async ({ target }: handleSequenceI) => {
    userAction(target)
    .then(() => { if (validClick.current) checkRoundWinner() })
    .then(() => { if (!roundEnd.current && validClick.current) AIAction() })
  }

  const countdownHandler = () => {
    setTimeout(() => { // START COUNTDOWN ROUND
      if (showCountdownRound.current) { // PREVENT EXECUTION WHEN USER CLICK "NEW GAME"
        setShowCountdownRoundState(true)
        setCountdownRound(3)
        if (allowFXSound.current) playSound({ file: aF.ticTac3Sec })
      }
    }, 3000)
    setTimeout(() => {
      if (showCountdownRound.current) setCountdownRound(2) // PREVENT EXECUTION WHEN USER CLICK "NEW GAME"
    }, 4000)
    setTimeout(() => {
      if (showCountdownRound.current) setCountdownRound(1) // PREVENT EXECUTION WHEN USER CLICK "NEW GAME"
    }, 5000)
    setTimeout(() => {
      if (showCountdownRound.current) {
        setCountdownRound(0) // PREVENT EXECUTION WHEN USER CLICK "NEW GAME"
        if (allowFXSound.current) playSound({ file: aF.startRound })
      }
    }, 6000)
    setTimeout(() => {
      if (showCountdownRound.current) { // PREVENT EXECUTION WHEN USER CLICK "NEW GAME"
        setShowCountdownRoundState(false)
        setCountdownRound(3)
        userHasStartedThisRound.current = !userHasStartedThisRound.current
      }
      if (userHasStartedThisRound.current && showCountdownRound.current) { // AUTO-START USER // PREVENT EXECUTION WHEN USER CLICK "NEW GAME"
        softResetGame()
        userHasStartedThisRound.current = true
        setShouldAIstartState(false)
        startTimer()
        clickBlocked.current = false
        showCountdownRound.current = false
      } else if (showCountdownRound.current) { // AUTO-START AI // PREVENT EXECUTION WHEN USER CLICK "NEW GAME"
        softResetGame()
        userHasStartedThisRound.current = false
        clickBlocked.current = true
        setShouldAIstartState(true)
        startTimer()
        AIAction()
        showCountdownRound.current = false
      }
    }, 7000)
  }

  const highlighter = async ({ array, letter }: highlighterI) => { // GAME END WITH A WINNER
    actionPoints = actionPoints + 100
    clickBlocked.current = true
    roundEnd.current = true
    setTimeout(() => {
      $(`#${array[0].id}`)
        .css("background", "yellow");
        if (allowFXSound.current) playSound({ file: actionPoints === 100 ? aF.revealedOne : aF.revealedTwo , pitch: -400 })
    }, actionPoints === 100 ? 400 : 300)
    setTimeout(() => {
      $(`#${array[1].id}`)
        .css("background", "yellow");
        if (allowFXSound.current) playSound({ file: actionPoints === 100 ? aF.revealedOne : aF.revealedTwo })
    }, actionPoints === 100 ? 700 : 600)
    setTimeout(() => {
      $(`#${array[2].id}`)
        .css("background", "yellow");
        if (allowFXSound.current) playSound({ file: actionPoints === 100 ? aF.revealedOne : aF.revealedTwo, pitch: 300 })
    }, actionPoints === 100 ? 1000 : 900)

    setTimeout(() => {
      let copyPoints: pointsI = {...points}
      copyPoints[letter] = copyPoints[letter] + actionPoints
      setPoints(copyPoints)
      winnerRound.current = `${letter}`
      setTimeout(() => {
        setWinnerRoundState(`${letter}`) // SYNC WITH POP-UP
      }, 300)
    }, 1200)
  }

  const updateScore = () => {
    setTimeout(() => {
      let min // MINUTES
      let sec // SECONDS
      let mss // MILLISECONDS
      let mn = document.getElementById('timer_minutes')
      if (mn !== null) min = mn.innerHTML
      let sc = document.getElementById('timer_seconds')
      if (sc !== null) sec = sc.innerHTML
      let ms = document.getElementById('timer_ms')
      if (ms !== null) mss = ms.innerHTML

      score.current.push({
        id: score.current.length,
        //timeX: winnerRound.current === "X" || winnerRound.current === "TIED" ? `${min}:${sec}:555` : `00:00:000`, // FAKE MS FOR TEST (TIED BY POINTS & TIME) // WEIRD TIED
        timeX: winnerRound.current === "X" || winnerRound.current === "TIED" ? `${min}:${sec}:${mss}` : `00:00:000`,
        scoreX: winnerRound.current === "X" ? actionPoints : 0,
        X: winnerRound.current === "TIED" ? "➖" : winnerRound.current === "X" ? "✔️" : "❌",
        O: winnerRound.current === "TIED" ? "➖" : winnerRound.current === "O" ? "✔️" : "❌",
        scoreO: winnerRound.current === "O" ? actionPoints : 0,
        //timeO: winnerRound.current === "O" || winnerRound.current === "TIED" ? `${min}:${sec}:555` : `00:00:000` // FAKE MS FOR TEST (TIED BY POINTS & TIME) // WEIRD TIED
        timeO: winnerRound.current === "O" || winnerRound.current === "TIED" ? `${min}:${sec}:${mss}` : `00:00:000`
      })
    }, 1200) // SYNC WITH HIGHLIGHTER FUNC UPDATE
  }

  let actionPoints: number = 0

  const checkRoundWinner = async () => {
    let rT = [0,3,6,9] // rowTargets
    let cT = [0,1,2,3] // columnsTargets
    let dT = [0,2,4]   // diagonalTargets
    rT.slice(0,-1).forEach((e, i) => { // ROW
      //                        (6, rt[2+1])
      //                        (3, rt[1+1])
      //                        (0, rt[0+1])
      let row = rC.current.slice(e, rT[i+1])
      if (row.every((e: eachBoxI) => e.value === 'X')) highlighter({ array: row, letter: "X" })
      if (row.every((e: eachBoxI) => e.value === 'O')) highlighter({ array: row, letter: "O" })
    })

    cT.slice(0,-1).forEach((e) => { // COLUMN
      let column: eachBoxI[] = []
      cT.slice(0,-1).forEach((_,i) => {
        //                    [2 + 0 * 3] --> [2 + 1 * 3] --> [2 + 2 * 3]
        //                    [1 + 0 * 3] --> [1 + 1 * 3] --> [1 + 2 * 3]
        //                    [0 + 0 * 3] --> [0 + 1 * 3] --> [0 + 2 * 3]
        column.push(rC.current[e + i * cT.slice(-1)[0]])
      })
      if (column.every((e: eachBoxI) => e.value === 'X')) highlighter({ array: column, letter: "X" })
      if (column.every((e: eachBoxI) => e.value === 'O')) highlighter({ array: column, letter: "O" })
    })

    let diagonal: eachBoxI[][] = [[],[]]
    dT.forEach((e) => { // DIAGONAL
      //                         [0*2] --> [2*2] --> [4*2]
      //                         [0+2] --> [2+2] --> [4+2]
      diagonal[0].push(rC.current[e*2]) // --> \ <--
      diagonal[1].push(rC.current[e+2]) // --> / <--
    })

    diagonal.forEach(e => {
      if (e.every((e: eachBoxI) => e.value === 'X')) highlighter({ array: e, letter: "X" })
      if (e.every((e: eachBoxI) => e.value === 'O')) highlighter({ array: e, letter: "O" })
    })

    if (rC.current.filter(e => e.value === '').length === 0 && !roundEnd.current) {
      roundEnd.current = true // STOP GAME WHEN NO MORE STEPS AVAILABLE
      setTimeout(() => {
        winnerRound.current = "TIED"
        setTimeout(() => {
          setWinnerRoundState("TIED") // SYNC WITH POP-UP
        }, 300)
      }, 1200)
    }

    if (rC.current.filter(e => e.value === '').length === 0) {
      roundEnd.current = true // STOP GAME WHEN NO MORE STEPS AVAILABLE
    }

    if (roundEnd.current) {
      stopTimer()
      updateScore()
      checkGameEndByRounds()

      setTimeout(() => {
        if (continueFlowPopUp.current && !gameEndRoundsBoolean.current) {

          if (allowFXSound.current) {
            if (winnerRound.current === "X") playSound({ file: aF.roundWin })
            else if (winnerRound.current === "O") playSound({ file: aF.roundLost })
            else playSound({ file: aF.trill })
          }

          Swal.fire({
            title:
              winnerRound.current === "X" ?
              `YOU WIN !` :
              winnerRound.current === "O" ?
              `AI WIN !` :
              `ROUND TIED`,
            text:
              actionPoints === 100 ?
              `+100 Points` :
              actionPoints === 200 ?
              `+200 Points !! Supperrrb !!!` :
              `no winner, no points.`,
            heightAuto: false, // PREVENTS SWAL CHANGE BACKGROUND POSITION
            icon:
              winnerRound.current === "X" || winnerRound.current === "O" ?
              'success' :
              'info', // TIED
            showConfirmButton: false,
            showDenyButton: false,
            showCancelButton: false,
            timer: 2000,
          })
        }
      }, 1200)

      if (!gameEndRoundsBoolean.current) showCountdownRound.current = true // ENABLES COUNTDOWN VISUALIZATION
      countdownHandler() // START COUNTDOWN FOR NEXT ROUND

      setTimeout(() => {
        if (roundEnd.current) addTimerChangeColor() // MAKE SURE THERE ISN'T A NEW GAME TO MAKE THE ANIMATION
      }, 3200)
    }
  }

  const addButtonAnimation = () => $(`#buttonStart`).addClass(`${css.shakeAnimation}`)
  const removeButtonAnimation = () => $(`#buttonStart`).removeClass(`${css.shakeAnimation}`);
  const addTimerChangeColor = () => $(`#timerBox`).addClass(`${css.changeColor}`);
  const removeTimerChangeColor = () => $(`#timerBox`).removeClass(`${css.changeColor}`);
  const addFinalWinnerChangeColor = () => $(`#finalWinnerBox`).addClass(`${css.changeColor}`);
  const removeFinalWinnerChangeColor = () => $(`#finalWinnerBox`).removeClass(`${css.changeColor}`);
  const addFlowPopUp = () => continueFlowPopUp.current = true;
  const removeFlowPopUp = () => continueFlowPopUp.current = false;

  useEffect(() => { // BUTTON SHAKE ANIMATION AT VERY FIRST TIME
    setTimeout(function() {
      addButtonAnimation()
    },300);
  },[])

  const basicOptions = () => {
    startsIn()
    setNewGameStarted(true) // ADD TIMER IN SCREEN
  }

  const softResetGame = () => {
    addFlowPopUp()
    stopTimer()
    resetTimer()
    rC.current = Array.from({length: 9}, (e,i) => ({ id: i, value: '' }))
    clickBlocked.current = true
    roundEnd.current = false;
    winnerRound.current = ""
    setWinnerRoundState("")
    setUserPlaying(true);
    removeButtonAnimation()
    removeTimerChangeColor()
    actionPoints = 0;
    AIRandomGridIndex.current = Math.floor(Math.random() * 9) // BETWEEN 0 & 8
    rC.current.forEach(e => {
      $(`#${e.id}`)
        .css("background", "red")
    })
  }

  const hardResetGame = () => {
    score.current = []
    roundEnd.current = false
    setWinnerGameState("")
    setWinnerRoundState("")
    removeFinalWinnerChangeColor()

    XfinalMin.current = 0
    XfinalSec.current = 0
    XfinalMs.current = 0
    OfinalMin.current = 0
    OfinalSec.current = 0
    OfinalMs.current = 0

    addFlowPopUp()
    stopTimer()
    resetTimer()

    rC.current = Array.from({length: 9}, (e,i) => ({ id: i, value: '' })) // rowsAndColumns

    clickBlocked.current = true
    setPoints({ "X": 0, "O": 0 });
    roundEnd.current = false;
    winnerRound.current = ""
    setWinnerRoundState("")
    setUserPlaying(true);
    removeButtonAnimation()
    removeTimerChangeColor()
    actionPoints = 0;
    AIRandomGridIndex.current = Math.floor(Math.random() * 9) // BETWEEN 0 & 8
    rC.current.forEach(e => {
      $(`#${e.id}`)
      .css("background", "red")
    })
  }

  const selectOptions = () => {
    showCountdownRound.current = false
    setShowCountdownRoundState(false)
    hardResetGame();
    removeButtonAnimation()
    setNewGameStarted(false) // REMOVE TIMER FROM SCREEN
    gameEndRoundsBoolean.current = false
    welcomeTicTacToe()
    .then((result) => {
      if (result.isConfirmed) { // START USER
        if (allowFXSound.current) playSound({ file: aF.menu })
        selectDifficulty()
        .then((result) => {
          if (result.isConfirmed) {
            gameMode.current = "easy"
            selectNumberOfRoundsUser()
          }
          else if (result.isDenied) {
            gameMode.current = "hard"
            selectNumberOfRoundsUser()
          }
          else if (result.isDismissed && typeof result.dismiss === "string" && result.dismiss === "cancel") {
            gameMode.current = "nightmare"
            selectNumberOfRoundsUser()
          }
        })
      }
      else if (result.isDenied) { // START AI
        if (allowFXSound.current) playSound({ file: aF.menu })
        selectDifficulty()
        .then((result) => {
          if (result.isConfirmed) {
            gameMode.current = "easy"
            selectNumberOfRoundsAI()
          }
          else if (result.isDenied) {
            gameMode.current = "hard"
            selectNumberOfRoundsAI()
          }
          else if (result.isDismissed && typeof result.dismiss === "string" && result.dismiss === "cancel") {
            gameMode.current = "nightmare"
            selectNumberOfRoundsAI()
          }
        })
      }
      else { // ESCAPE KEY OR CLICK OUTSIDE POPUP
        setTimeout(function() {
          addButtonAnimation()
        },300);
      }
    })
  }

  const buttonNewGameHandler = () => {
    stopConfetti()
    if (allowFXSound.current) playSound({ file: aF.menu })
    removeFlowPopUp() // CANCEL WINNER POP-UP WHEN USER CLICK "NEW GAME" BUTTON
    removeButtonAnimation()
    if (newGameStarted) {
      Swal.fire({
        title: `DO YOU WANT TO START A NEW GAME ?`,
        text: 'All points gonna be lost !..',
        heightAuto: false, // PREVENTS SWAL CHANGE BACKGROUND POSITION
        icon: 'info',
        showDenyButton: true,
        confirmButtonText: `<div style="width:167px">START NEW GAME !</div>`,
        denyButtonText: `<div style="width:167px">CONTINUE PLAYING !</div>`,
        confirmButtonColor: '#800080', // LEFT OPTION
        denyButtonColor: '#008000', // RIGHT OPTION
      })
      .then((result) => {
        if (result.isConfirmed) {
          if (allowFXSound.current) playSound({ file: aF.menu })
          selectOptions() // CONFIRM NEW GAME
        }
        else {
          addFlowPopUp() // ELSE CONTINUE GAME
        }
      })

    } else {
      selectOptions() // WHEN NO CURRENT GAME
    }
  }

  let offset = useRef(0);
  let paused = useRef(true);

  render();

  function startTimer() {
    if (paused.current) {
      paused.current = false;
      offset.current -= Date.now();
      render();
    }
  }

  function stopTimer() {
    if (!paused.current) {
      paused.current = true;
      offset.current += Date.now();
      render()
    }
  }

  function resetTimer() {
    if (paused.current) {
      offset.current = 0;
      render();
    } else offset.current =- Date.now();
  }

  function format(value: any, scale: any, modulo: any, padding: any) {
    value = Math.floor(value / scale) % modulo;
    return value.toString().padStart(padding, 0);
  }

  function render() {

    var value = paused.current ? offset.current : Date.now() + offset.current;
    //var value = paused.current ? offset.current : Date.now() + 3595000 + offset.current; // ONLY FOR DEV, TO FAKE TIME // 59:55:000

    let milliseconds = document.getElementById('timer_ms')
    if (milliseconds !== null) milliseconds.textContent = format(value, 1, 1000, 3);
    let seconds = document.getElementById('timer_seconds')
    if (seconds !== null) seconds.textContent = format(value, 1000, 60, 2);
    let minutes = document.getElementById('timer_minutes')
    if (minutes !== null) minutes.textContent = format(value, 60000, 60, 2);

    if (minutes && seconds && milliseconds) {
      if (
        minutes && minutes.textContent && minutes.textContent === '59' &&
        seconds && seconds.textContent && seconds.textContent === '59' &&
        milliseconds && milliseconds.textContent && milliseconds.textContent > '900' // > 900 COMPATIBILITY WITH LOW PERFOMANCE DEVICES
      ) {
        stopTimer()
        var timeReached = new Date();
        timeReached.setMinutes(59);
        timeReached.setSeconds(59);
        timeReached.setMilliseconds(999);
        offset.current = timeReached.getTime()
        minutes.textContent = '59';
        seconds.textContent = '59';
        milliseconds.textContent = '999';
      }
    }

    if(!paused.current) requestAnimationFrame(render);
  }

  const startsIn = () => {
    setTimeout(() => {
      if (allowFXSound.current) playSound({ file: aF.countDownA })
      Swal.fire({
        title: `STARTS IN\n3..`,
        heightAuto: false, // PREVENTS SWAL CHANGE BACKGROUND POSITION
        showConfirmButton: false,
        showDenyButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        timer: 1000
      })
    }, 0)
    setTimeout(() => {
      if (allowFXSound.current) playSound({ file: aF.countDownA })
      Swal.fire({
        title: `STARTS IN\n2..`,
        heightAuto: false, // PREVENTS SWAL CHANGE BACKGROUND POSITION
        showConfirmButton: false,
        showDenyButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        timer: 1000
      })
    }, 1000)
    setTimeout(() => {
      if (allowFXSound.current) playSound({ file: aF.countDownA })
      Swal.fire({
        title: `STARTS IN\n1..`,
        heightAuto: false, // PREVENTS SWAL CHANGE BACKGROUND POSITION
        showConfirmButton: false,
        showDenyButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        timer: 1000
      })
    }, 2000)
    setTimeout(() => {
      if (allowFXSound.current) playSound({ file: aF.countDownB })
      Swal.fire({
        title: `GO !!!`,
        heightAuto: false, // PREVENTS SWAL CHANGE BACKGROUND POSITION
        showConfirmButton: false,
        showDenyButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        timer: 1300,
      })
    }, 3000)
  }

  let XfinalMin = useRef(0)
  let XfinalSec = useRef(0)
  let XfinalMs = useRef(0)
  let OfinalMin = useRef(0)
  let OfinalSec = useRef(0)
  let OfinalMs = useRef(0)

  const sumTime = () => {
    let Xmin = score.current.reduce((partial, el) => partial + parseInt(el.timeX.split(":")[0], 10), 0)
    let Xsec = score.current.reduce((partial, el) => partial + parseInt(el.timeX.split(":")[1], 10), 0)
    let Xms = score.current.reduce((partial, el) => partial + parseInt(el.timeX.split(":")[2], 10), 0)
    let Omin = score.current.reduce((partial, el) => partial + parseInt(el.timeO.split(":")[0], 10), 0)
    let Osec = score.current.reduce((partial, el) => partial + parseInt(el.timeO.split(":")[1], 10), 0)
    let Oms = score.current.reduce((partial, el) => partial + parseInt(el.timeO.split(":")[2], 10), 0)

    let XsecondsToAdd = 0
    let XminutesToAdd = 0

    if (Xms.toString().length>3) {
      XfinalMs.current = Xms.toString().slice(-3)
      XsecondsToAdd = parseInt(Xms.toString().slice(0, -3), 10)
    } else XfinalMs.current = parseInt(Xms.toString(), 10)

    if (Xsec > 59) {
      XminutesToAdd = Math.floor(Xsec / 60)
      let XremainingSec = Xsec - (XminutesToAdd * 60)
      XfinalSec.current = XremainingSec + XsecondsToAdd
    } else XfinalSec.current = Xsec + XsecondsToAdd

    let OsecondsToAdd = 0
    let OminutesToAdd = 0

    if (Oms.toString().length>3) {
      OfinalMs.current = Oms.toString().slice(-3)
      OsecondsToAdd = parseInt(Oms.toString().slice(0, -3), 10)
    } else OfinalMs.current = parseInt(Oms.toString(), 10)

    if (Osec > 59) {
      OminutesToAdd = Math.floor(Osec / 60)
      let OremainingSec = Osec - (OminutesToAdd * 60)
      OfinalSec.current = OremainingSec + OsecondsToAdd
    } else OfinalSec.current = Osec + OsecondsToAdd

    XfinalMin.current = XminutesToAdd + Xmin
    OfinalMin.current = OminutesToAdd + Omin
  }

  sumTime()

  const checkGameEndByRounds = () => { // GAME END BY ROUNDS HANDLER
    if (gameEndRoundsNumber.current === score.current.length ) { // GAME END BY ROUNDS
      gameEndRoundsBoolean.current = true;
      showCountdownRound.current = false
      setNewGameStarted(false)

      setTimeout(() => {
        addButtonAnimation()
      }, 1800) // BUTTON SHAKE AFTER FINAL POPUP (1700ms)

      setTimeout(() => {
        let XSumScore = score.current.reduce((partial, el) => partial + el.scoreX, 0)
        let OSumScore = score.current.reduce((partial, el) => partial + el.scoreO, 0)
        let XSumTime = parseInt(XfinalMin.current.toString().concat(XfinalSec.current.toString(), XfinalMs.current.toString()), 10)
        let OSumTime = parseInt(OfinalMin.current.toString().concat(OfinalSec.current.toString(), OfinalMs.current.toString()), 10)

        let finalWinner =
          XSumScore === OSumScore && XSumTime === OSumTime ?
          "TIED" : // WEIRD TIED :S
          XSumScore === OSumScore && XSumTime > OSumTime ?
          "OByTime" :
          XSumScore === OSumScore && XSumTime < OSumTime ?
          "XByTime" :
          XSumScore > OSumScore ?
          "X" :
          "O"

        setTimeout(() => {
          setWinnerGameState(finalWinner)
          addFinalWinnerChangeColor()
        }, 200) // DELAY WAITS FOR FINAL POPUP

        if (finalWinner === "X") {
          if (confettiAllowed) startConfetti()
          if (firstMenuConfettiAutoShown) {
            setFirstMenuConfettiAutoShown(false)

            $(`#sliderBoxMenuConfetti`)
              .stop()
              .animate( { left: '0px' }, { queue: false, easing: 'easeOutCubic', duration: 800 })
            setTimeout(() => {
              setMenuConfettiShown(true)
              clearTimeout(timeoutMenuConfetti)
              setTimeoutMenuConfetti(setTimeout(autoHideMenuConfetti, 5500))
            }, 1000)

          }
        }

        if (allowFXSound.current) {
          if (finalWinner === "X") playSound({ file: aF.taDah, pitch: 100 }); // X win entire game
          else if (finalWinner === "O") playSound({ file: aF.looser, pitch: 125 }) // O win entire game
          else if (finalWinner === "XByTime") playSound({ file: aF.XTime }) // X win entire game by time
          else if (finalWinner === "OByTime") playSound({ file: aF.OTime }) // O win entire game by time //                                                                     If tied, the same time is added for both teams.
          else if (score.current.filter(e => e.timeX !== '59:59:999' && e.timeO !== '59:59:999').some(e => e.X === "✔️" || e.O === "✔️")) playSound({ file: aF.tiedWeird }) // Tied by points & time & has at least a winning round, no way !
          else playSound({ file: aF.tied }) // Normal tied game
        }

        Swal.fire({
          title:
            finalWinner === "XByTime" || finalWinner === "X" ?
            `GAME END !\nYOU WIN !` :
            finalWinner === "OByTime" || finalWinner === "O" ?
            `GAME END !\nAI WIN !` :
            score.current.filter(e => e.timeX !== '59:59:999' && e.timeO !== '59:59:999').some(e => e.X === "✔️" || e.O === "✔️") ? // Check if tied by points & time & has at least a winning round, no way !
            `GAME END !\nTIED, INCREDIBLE !!`: // Tied by points & time & has at least a winning round, no way !
            `GAME END !\nTIED !`,
          html:
            finalWinner === `XByTime` ?
              `<div>
                <div>You have tied in points, but you won by time !</div>
                <div>Points: ${XSumScore}</div>
                <div>Time: ${XfinalMin.current.toString().padStart(2,'0')}:${XfinalSec.current.toString().padStart(2,'0')}:${XfinalMs.current.toString().padStart(3,'0')}</div>
              </div>` :
            finalWinner === `OByTime` ?
              `<div>
                <div>You have tied in points, but AI won by time !</div>
                <div>Points: ${OSumScore}</div>
                <div>Time: ${OfinalMin.current.toString().padStart(2,'0')}:${OfinalSec.current.toString().padStart(2,'0')}:${OfinalMs.current.toString().padStart(3,'0')}</div>
              </div>` :
            finalWinner === `X` ?
              `<div>
                <div>You have won by points !</div>
                <div>Points: ${XSumScore}</div>
                <div>Time: ${XfinalMin.current.toString().padStart(2,'0')}:${XfinalSec.current.toString().padStart(2,'0')}:${XfinalMs.current.toString().padStart(3,'0')}</div>
              </div>` :
            finalWinner === `O` ?
              `<div>
                <div>AI have won by points !</div>
                <div>Points: ${OSumScore}</div>
                <div>Time: ${OfinalMin.current.toString().padStart(2,'0')}:${OfinalSec.current.toString().padStart(2,'0')}:${OfinalMs.current.toString().padStart(3,'0')}</div>
              </div>` :
            score.current.filter(e => e.timeX !== '59:59:999' && e.timeO !== '59:59:999').some(e => e.X === "✔️" || e.O === "✔️") ? // CHECK IF TIED BY POINTS & TIME HAS AT LEAST A WINNING ROUND // ↓↓↓ no way ! ↓↓↓
              `<div>
                <div>The game is tied, this is really incredible !!</div>
                <div>Tied by points & time !!!</div>
                <div>Points: ${XSumScore}</div>
                <div>Time: ${XfinalMin.current.toString().padStart(2,'0')}:${XfinalSec.current.toString().padStart(2,'0')}:${XfinalMs.current.toString().padStart(3,'0')}</div>
              </div>` :
              `<div>
                <div>The game is tied !</div>
                <div>Tied by points & time !</div>
                <div>Points: ${XSumScore}</div>
                <div>Time: ${XfinalMin.current.toString().padStart(2,'0')}:${XfinalSec.current.toString().padStart(2,'0')}:${XfinalMs.current.toString().padStart(3,'0')}</div>
              </div>`,
          heightAuto: false, // PREVENTS SWAL CHANGE BACKGROUND POSITION
          icon:
            finalWinner === "XByTime" ||
            finalWinner === "X" ||
            finalWinner === "OByTime" ||
            finalWinner === "O" ?
            'success' :
            'info', // TIED
          showConfirmButton: true,
          showDenyButton: false,
          showCancelButton: false,
        })
      }, 1700) // WAITS FINAL TIME & POINTS TO UPDATE
    }
  }

  let roundsValueLS: string | null = localStorage.getItem('roundsValue');
  if (roundsValueLS !== null) gameEndRoundsNumber.current = parseInt(roundsValueLS, 10)

  useEffect(() => { // SHOW/HIDE SCORE HANDLER
    $(function() {
      if (!scoreShown) { // show --> hidden
        $(`.buttonShow`)
          .on("click", function() {
          $(`#sliderBox`)
            .stop()
            .animate( { right: '0px' }, { queue: false, easing: 'easeOutCubic', duration: 800 }) // INITIAL POSITION
        })
        $(`#sliderBox`)
          .css("left", "auto")
          .css("right", "-415px") // DIV WIDTH
      }
      else if (scoreShown) { // hidden -> show
        $(`.buttonShow`)
          .on("click", function() {
            $(`#sliderBox`)
              .stop()
              .animate( { right: '-415px' }, { queue: false, easing: 'easeOutCubic', duration: 800 })
          })
        $(`#sliderBox`)
          .css("left", "auto")
          .css("right", "0px") // ABSOLUTE
      }
    })
  },[scoreShown])

  useEffect(() => { // SHOW/HIDE ABOUT HANDLER
    $(function() {
      if (!aboutShown) { // show --> hidden
        $(`.buttonShowAbout`)
          .on("click", function() {
          $(`#sliderBoxAbout`)
            .stop()
            .animate( { left: '250px' }, { queue: false, easing: 'easeOutCubic', duration: 800 })
        })
        $(`#sliderBoxAbout`)
          .css("left", "auto")
          .css("left", "0px")
      }
      else if (aboutShown) { // hidden -> show
        $(`.buttonShowAbout`)
          .on("click", function() {
            $(`#sliderBoxAbout`)
              .stop()
              .animate( { left: '0px' }, { queue: false, easing: 'easeOutCubic', duration: 800 })
          })
        $(`#sliderBoxAbout`)
          .css("left", "auto")
          .css("left", "250px")
      }
    })
  },[aboutShown])

  useEffect(() => { // SHOW/HIDE MENU CONFETTI HANDLER
    $(function() {
      if (!menuConfettiShown) { // show --> hidden
        $(`.buttonMenuConfettiShow`)
          .on("click", function() {
          $(`#sliderBoxMenuConfetti`)
            .stop()
            .animate( { left: '0px' }, { queue: false, easing: 'easeOutCubic', duration: 800 })
        })
        $(`#sliderBoxMenuConfetti`)
          .css("left", "auto")
          .css("left", "105px")
      }
      else if (menuConfettiShown) { // hidden -> show
        $(`.buttonMenuConfettiShow`)
          .on("click", function() {
            $(`#sliderBoxMenuConfetti`)
              .stop()
              .animate( { left: '105px' }, { queue: false, easing: 'easeOutCubic', duration: 800 })
          })
        $(`#sliderBoxMenuConfetti`)
          .css("left", "auto")
          .css("left", "0px")
      }
    })
  },[menuConfettiShown])

  useEffect(() => { // SHOW/HIDE BG SLIDER
    $(function() {
      if (BGMusicShown) { // show --> hidden
        $(`.buttonBGSlider`)
          .on("click", function() {
            $(`#divBGSlider`)
              .stop()
              .animate( { left: '-117px' }, { queue: false, easing: 'easeOutCubic', duration: 800 })
        })
        $(`#divBGSlider`)
          .css("left", "35px")
      }
      else if (!BGMusicShown) { // hidden -> show
        $(`.buttonBGSlider`)
          .on("click", function() {
            $(`#divBGSlider`)
              .stop()
              .animate( { left: '35px' }, { queue: false, easing: 'easeOutCubic', duration: 800 })
          })
        $(`#divBGSlider`)
          .css("left", "-117px")
      }
    })
  },[BGMusicShown])

  useEffect(() => { // SHOW/HIDE FX SLIDER
    $(function() {
      if (FXMusicShown) { // show --> hidden
        $(`.buttonFXSlider`)
          .on("click", function() {
            $(`#divFXSlider`)
              .stop()
              .animate( { left: '-117px' }, { queue: false, easing: 'easeOutCubic', duration: 800 })
        })
        $(`#divFXSlider`)
          .css("left", "35px")
      }
      else if (!FXMusicShown) { // hidden -> show
        $(`.buttonFXSlider`)
          .on("click", function() {
            $(`#divFXSlider`)
              .stop()
              .animate( { left: '35px' }, { queue: false, easing: 'easeOutCubic', duration: 800 })
          })
        $(`#divFXSlider`)
          .css("left", "-117px")
      }
    })
  },[FXMusicShown])

  const [ heightDev, setHeightDev ] = useState<number>(window.innerHeight)

  useEffect(() => { // INNER HEIGHT HANDLER
    function handleResize() {
      let { innerHeight } = window
      setHeightDev(innerHeight);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize)
  })

  useEffect(() => { // MOUSE GRAB & DRAG EFFECT ON MOUSE DEVICES
    const el = document.getElementById('sliderBox');
    if (el !== null) {
      const mouseEnterOnScore = () => {
        if (heightDev <= 550) el.style.cursor = 'grab'; // GRAB WHEN ENTER (MOUSEENTER)
        let pos = { top: 0, left: 0, x: 0, y: 0 };

        const mouseDownHandler = function (e: any) {
          el.style.cursor = 'grabbing';
          el.style.userSelect = 'none';
          pos = {
            left: el.scrollLeft,
            top: el.scrollTop,
            x: e.clientX,
            y: e.clientY,
          }
          if (heightDev <= 550) {
            el.addEventListener('mousemove', mouseMoveHandler)
            el.addEventListener('mouseup', mouseUpHandler)
          } else {
            el.removeEventListener('mousemove', mouseMoveHandler);
            el.removeEventListener('mouseup', mouseUpHandler);
            el.style.cursor = 'default';
          }
        }

        const mouseMoveHandler = function (e: any) { // HOW MUCH MOUSE HAS MOVED
          const dx = e.clientX - pos.x;
          const dy = e.clientY - pos.y;
          el.scrollTop = pos.top - dy;
          el.scrollLeft = pos.left - dx;
        }

        const mouseUpHandler = function () {
          el.style.cursor = 'grab'
          el.style.removeProperty('user-select')
          el.removeEventListener('mousemove', mouseMoveHandler)
          el.removeEventListener('mouseup', mouseUpHandler)
        }

        el.addEventListener('mousedown', mouseDownHandler);
        el.addEventListener('mouseleave', function() {
          el.removeEventListener('mouseup', mouseUpHandler);
          el.removeEventListener('mousedown', mouseDownHandler)
          el.removeEventListener('mousemove', mouseMoveHandler);
          el.style.cursor = 'default'
        })
      }
      el.addEventListener("mouseenter", mouseEnterOnScore)

      return () => el.removeEventListener("mouseenter", mouseEnterOnScore)
    }
  })

  let { width, height } = window.screen
  let orientation = window.matchMedia("(orientation: portrait)").matches
  // eslint-disable-next-line
  const [ isSmallDevice, setIsSmallDevice ] = useState<boolean>(((width < 450 && orientation) || (height < 450 && !orientation)) ? true : false)

  // BEGIN CONFETTI //

  let countConfetti = 200;
  let defaultsConfetti = { origin: { y: 0.7 } };

  const fireConfetti = (particleRatio: any, opts: any) => {
    confetti({
      ...defaultsConfetti,
      ...opts,
      particleCount: isSmallDevice ? 10 : Math.floor(countConfetti * particleRatio)
    });
  }

  const fireAllConfetti = () => {
    if (isSmallDevice) {
      fireConfetti(0.25, { spread: 26, startVelocity: 55 });
    } else {
      fireConfetti(0.25, { spread: 26, startVelocity: 55 });
      fireConfetti(0.2, { spread: 60 });
      fireConfetti(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
      fireConfetti(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
      fireConfetti(0.1, { spread: 120, startVelocity: 45 });
    }
  }

  let intervalID: any = useRef()
  const startConfetti = () => {
    fireAllConfetti()
    intervalID.current = setInterval(fireAllConfetti, 2000);
  }

  const stopConfetti = () => {
    clearInterval(intervalID.current);
    intervalID.current = null;
  }

  // END CONFETTI //

  const playBackgroundSong = () => {
    startNotificationOnlyBGAudio()
    playSound({ file: aF.bG, cV: BgSoundValueState, loop: true })
    .then((res: any) => {
      if (res.state === "suspended") {
        document.addEventListener('click', () => {
          if (allowBgSound.current) {
            contextArray[aF.bG.i].resume()
            startNotificationOnlyBGAudio()
          }
        }, { once: true })
      }
    })
  }

  const handleBgValue = (value: string) => {
    clearTimeout(timeoutBG)
    setTimeoutBG(setTimeout(autoHideBG, 5000))
    if (soundsArray[aF.bG.i] !== undefined) gainArray[aF.bG.i].gain.value = parseInt(value,10) / 100
    dispatch(setBgSoundValue(parseInt(value, 10) / 100))
    localStorage.setItem('BgSoundValue', JSON.stringify(parseInt(value,10) / 100))
  }

  const handleFXValue = (value: string) => {
    clearTimeout(timeoutFX)
    setTimeoutFX(setTimeout(autoHideFX, 5000))
    gainArray.forEach((e, idx) => {
      if (idx !== aF.bG.i) e.gain.value = e.maxVolume * parseInt(value, 10) / 100
    })
    dispatch(setFXSoundValue(parseInt(value,10) / 100))
    localStorage.setItem('FXSoundValue', JSON.stringify(parseInt(value,10) / 100))
  }

  const autoHideBG = () => $(() => $(`.buttonBGSlider`).trigger("click"))
  const autoHideAbout = () => $(() => $(`.buttonShowAbout`).trigger("click"))
  const autoHideMenuConfetti = () => $(() => $(`.buttonMenuConfettiShow`).trigger("click"))
  const autoHideFX = () => $(() => $(`.buttonFXSlider`).trigger("click"))

  const [ timeoutAbout, setTimeoutAbout ] = useState<ReturnType<typeof setTimeout>>()
  const [ timeoutMenuConfetti, setTimeoutMenuConfetti ] = useState<ReturnType<typeof setTimeout>>()
  const [ timeoutBG, setTimeoutBG ] = useState<ReturnType<typeof setTimeout>>()
  const [ timeoutFX, setTimeoutFX ] = useState<ReturnType<typeof setTimeout>>()

  let degrees: number = 0;
  let newDegrees: number = 0;
  let eachDegree: number = 360 / Object.keys(aF).length

  useEffect(() => { // LOAD ALL SOUNDS
    let fileCounter: number = 0;
    Object.keys(aF).forEach(async (e: any, i: any) => {
      setTimeout(() => {
        loadAllSounds({ file: aF[e] })
        .then(() => {
          fileCounter += 1
          // eslint-disable-next-line
          newDegrees += eachDegree
          spinnerLoader()
        })
        .then(() => {
          if (fileCounter === Object.keys(aF).length) {
            allSoundsLoaded.current = true
            if (allowBgSound.current) playBackgroundSong()
          }
        })
      }, i * 100)
    })
  // eslint-disable-next-line
  },[])

  const spinnerLoader = () => {
    let spinner = document.getElementById("spinner") as HTMLCanvasElement
    let ctx = spinner.getContext("2d");
    let widthSpinner;
    let heightSpinner;
    let color = "turquoise";
    let bgcolor = "#222";
    let text;
    let animation_loop: any;

    function animate_to() {
      if (degrees > newDegrees) clearInterval(animation_loop);
      else degrees++

      if (ctx !== null) {
        widthSpinner = spinner.width;
        heightSpinner = spinner.height;
        ctx.clearRect(0, 0, widthSpinner, heightSpinner);
        ctx.beginPath();
        ctx.strokeStyle = bgcolor;
        ctx.lineWidth = 30;
        ctx.arc(widthSpinner/2, widthSpinner/2, 100, 0, Math.PI*2, false);
        ctx.stroke();
        let radians = degrees * Math.PI / 180;
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 30;
        ctx.arc(widthSpinner/2, heightSpinner/2, 100, 0 - 90*Math.PI/180, radians - 90*Math.PI/180, false);
        ctx.stroke();
        ctx.fillStyle = color;
        ctx.font = "50px arial";
        text = Math.floor(degrees/360*100) + "%";
        let text_width = ctx.measureText(text).width;
        ctx.fillText(text, widthSpinner/2 - text_width/2, heightSpinner/2 + 15);
      }

      if (Math.floor(degrees/360*100) === 100) {
        let bottomText = document.querySelector('[class*="spinnerBottomText"]')
        setTimeout(() => {
          if (bottomText) bottomText.innerHTML = "Loaded."
        }, 200)
        setTimeout(() => {
          $(`[class*="backgroundSpinner"]`)
            .css("display", "none")
          $(`[class*="App_background"]`)
            .css("overflow-y", "visible")
        }, 800)
      }
    }
    animation_loop = setInterval(animate_to, 5)
  }

  if ("mediaSession" in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: 'TicTacToe !',
      artist: 'Demo App by Juan Pablo Azambuyo',
      artwork: [{ src: 'data:image/jpeg;base64,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' }]
    })

    navigator.mediaSession.setPositionState({ // DISABLES SEEKBAR
      duration: 0,
      playbackRate: 1,
      position: 0
    })
  }

  const startNotificationOnlyBGAudio = () => {
    const audio = document.querySelector("audio"); // WORKAROUND FOR NOTIFICATION
    if (audio !== null) {
      audio.src = silence
      audio.play()
      .catch(() => console.log(""))
    }
  }

  const startBGAudio = () => {
    playSound({ file: aF.bG, cV: BgSoundValueState, loop: true })
    dispatch(setAllowBgSound(true))
    allowBgSound.current = true
    localStorage.setItem('allowBgSound', JSON.stringify(true))
    const audio = document.querySelector("audio"); // WORKAROUND FOR NOTIFICATION
    if (audio !== null) {
      audio.src = silence
      audio.play()
    }
  }

  const stopBGAudio = () => {
    soundsArray[aF.bG.i].stop()
    dispatch(setAllowBgSound(false))
    allowBgSound.current = false
    localStorage.setItem('allowBgSound', JSON.stringify(false))
    const audio = document.querySelector("audio"); // WORKAROUND FOR NOTIFICATION
    if (audio !== null) audio.src = ""
  }

  const pauseBGAudio = () => {
    soundsArray[aF.bG.i].stop()
    dispatch(setAllowBgSound(false))
    allowBgSound.current = false
    localStorage.setItem('allowBgSound', JSON.stringify(false))
    const audio = document.querySelector("audio"); // WORKAROUND FOR NOTIFICATION
    if (audio !== null) {
      audio.pause();
      audio.currentTime = 0;
    }
  }

  navigator.mediaSession.setActionHandler("play", startBGAudio);
  navigator.mediaSession.setActionHandler("pause", pauseBGAudio);
  navigator.mediaSession.setActionHandler("stop", stopBGAudio);
  navigator.mediaSession.setActionHandler("seekbackward", null);
  navigator.mediaSession.setActionHandler("seekforward", null);
  navigator.mediaSession.setActionHandler("seekto", null);
  navigator.mediaSession.setActionHandler("previoustrack", null);
  navigator.mediaSession.setActionHandler("nexttrack", null);

  return (
    <div className={`${css.background} ${com.noSelect}`}>
      <audio loop>
        <source src={silence} />
      </audio>
      <div className={css.backgroundSpinner}>
        <canvas className={css.spinner} id={`spinner`} width="300" height="300" />
        <div className={css.spinnerBottomText}>Loading..</div>
      </div>
      <Button
        focusRipple={false}
        id={`buttonStart`}
        className={css.buttonNewGame}
        variant="outlined"
        sx={{ color: 'white', background: 'blue', '&:hover': { background: 'green' } }}
        onClick={() => buttonNewGameHandler()}
      >
        NEW GAME
      </Button>
      <div className={css.participants}>
        <div className={css.participant}>
          <div className={css.pointsTitle}>Points:</div>
        </div>
        <div className={css.participant}>
          <div className={css.turn}>{ shouldAIstartState ? null : newGameStarted && userPlaying && !roundEnd.current ? `TURN ` : null }</div>
          <div className={css.participantName}>You:</div>
          <div className={css.points}><div className={css.innerPoints}> {points.X} </div></div>
        </div>
        <div className={css.participant}>
          <div className={css.turn}>{ shouldAIstartState ? `TURN ` : newGameStarted && !userPlaying && !roundEnd.current ? `TURN ` : null }</div>
          <div className={css.participantName}>AI:</div>
          <div className={css.points}><div className={css.innerPoints}> {points.O} </div></div>
        </div>
        <div className={css.finalWinner}>
          <div id={`finalWinnerBox`}>
            {
              gameEndRoundsBoolean.current && roundEnd.current && (winnerGameState === "X" || winnerGameState === "XByTime") ?
              `GAME WINNER: YOU !` :
              gameEndRoundsBoolean.current && roundEnd.current && (winnerGameState === "O" || winnerGameState === "OByTime") ?
              `GAME WINNER: AI !` :
              gameEndRoundsBoolean.current && roundEnd.current && winnerGameState === "TIED" ?
              `GAME WINNER: TIED !` :
              !gameEndRoundsBoolean.current && roundEnd.current && winnerRoundState === "X" ?
              `ROUND WINNER: YOU !` :
              !gameEndRoundsBoolean.current && roundEnd.current && winnerRoundState === "O" ?
              `ROUND WINNER: AI !` :
              !gameEndRoundsBoolean.current && roundEnd.current && winnerRoundState === "TIED" ?
              `ROUND WINNER: TIED !` :
              null
            }
          </div>
        </div>
        <div
          style={{
            display: newGameStarted || gameEndRoundsBoolean.current ? 'flex' : 'none'
          }}
          className={css.rounds}
        >
          Rounds: {gameEndRoundsNumber.current + 1}
        </div>
        <div
          style={{ display: newGameStarted ? 'flex' : 'none' }}
          id={`timerBox`}
          className={css.timer}
        >
          <div className={css.timeContainer}> TIME: </div>
          <div className={css.numbersContainer}>
            <div id={`timer_minutes`} className={css.eachTime}>00</div>:
            <div id={`timer_seconds`} className={css.eachTime}>00</div>
            <div className={css.smallerMili}>:</div>
            <div id={`timer_ms`} className={`${css.smallerMili} ${css.eachTimeMini}`}>000</div>
          </div>
        </div>
      </div >
      <div className={css.rowsAndColumns}>
        {
          rC.current.map((e, index) => {
            return (
              <div
                key={index}
                id={`${index}`}
                onClick={(e) => {
                  if (!clickBlocked.current) handleSequence({ target: index })
                }}
                className={css.eachBox}
              >
                {/* {<div style={{ fontSize: '10px', marginTop: '-25px', marginLeft: '-10px' }}> {index} </div>} */}
                { rC.current[index].value }
              </div>
            )
          })
        }
        <div
          style={{
            display:
              showCountdownRoundState && showCountdownRound.current ?
              'flex' :
              'none'
          }}
          className={css.nextGameIn}
        >
          {
            countdownRound === 0 ?
            <div className={css.nextGameInInner}>Go !!!</div> :
            <div className={css.nextGameInInner}>
              <div className={css.nextGameText}>Next round in </div>
              <div className={css.nextGameNumber}>{countdownRound}</div>
            </div>
          }
        </div>
      </div>
      <Button
        className={`buttonShow`}
        id={css.buttonShow}
        onClick={() => setScoreShown(!scoreShown) }
      >
        <div className={css.buttonTypo} />
      </Button>
      <div className={css.boxHelperLeft}>
        <div className={css.stopperHelper} />
        <Button
          className={`buttonShowAbout`}
          id={css.buttonShowAbout}
          onClick={() => {
            clearTimeout(timeoutAbout)
            if (!aboutShown) setTimeoutAbout(setTimeout(autoHideAbout, 5500))
            setAboutShown(!aboutShown)
            aboutShown ?
            $(`[class*="containerAbout"]`)
              .css("transform", "rotateY(0deg)") :
            $(`[class*="containerAbout"]`)
              .css("transform", "rotateY(180deg)")
          }}
        >
          <div className={css.containerAbout}>
            <HelpOutlineIcon className={css.iconQuestion} />
            <ErrorOutlineIcon className={css.iconExclamation} />
          </div>
        </Button>
        <div
          className={css.sliderAbout}
          id={`sliderBoxAbout`}
        >
          <div>
            <div>This App is made by</div>
            <div>Juan Pablo Azambuyo.</div>
          </div>
          <a href="https://linkedin.com/in/juan-pablo-azambuyo" target="blank">
            <LinkedInSvg className={css.linkedInSVG} />
          </a>
        </div>
      </div>
      <div className={css.boxHelperRight}>
        <div className={css.stopperHelperRight} />
        <div
          className={css.sliderMenuConfetti}
          id={`sliderBoxMenuConfetti`}
        >
          <Button
            className={`buttonMenuConfettiShow`}
            id={css.buttonShowMenuConfetti}
            onClick={() => {
              clearTimeout(timeoutMenuConfetti)
              if (!menuConfettiShown) setTimeoutMenuConfetti(setTimeout(autoHideMenuConfetti, 5500))
              setMenuConfettiShown(!menuConfettiShown)
            }}
          >
            <div className={css.containerMenuConfetti}>
              <CelebrationIcon className={css.iconConfetti} />
            </div>
          </Button>
          <div className={css.barConfettiUpper}>
            <Button
              variant="outlined"
              className={css.buttonStopConfetti}
              onClick={() => stopConfetti()}
            >
              STOP
            </Button>
          </div>
          <div className={css.barConfettiLower}>
            <Checkbox
              className={css.buttonCheckboxConfetti}
              size="small"
              checked={confettiAllowed}
              onClick={() => {
                setConfettiAllowed(!confettiAllowed)
                localStorage.setItem('confettiAllowed', JSON.stringify(!confettiAllowed))
              }}
            />
            <div className={css.textConfetti}>ALLOWED</div>
          </div>
        </div>
      </div>
      <div
        className={css.scoreTable}
        id={`sliderBox`}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            className={css.scoreTableTitlesContainerUpper}
          >
            <div id={`evenTarget`} className={css.scoreTableNumeral}>#</div>
            <div id={`evenTarget`} className={css.scoreTableTime}>TIME</div>
            <div id={`evenTarget`} className={css.scoreTableScore}>SCORE</div>
            <div id={`evenTarget`} className={css.scoreTableYouAI}>YOU</div>
            <div id={`evenTarget`} className={css.scoreTableYouAI}>AI</div>
            <div id={`evenTarget`} className={css.scoreTableScore}>SCORE</div>
            <div id={`evenTarget`} className={css.scoreTableTime}>TIME</div>
          </div>
          {
            score.current.map((e,i)=> {
              return (
                <div key={i} className={css.scoreTableEachScore}>
                  <div id={`evenTarget`} className={css.scoreTableNumeral}>{e.id + 1}</div>
                  <div id={`evenTarget`} className={css.scoreTableTimePNG}>
                    {
                      e.timeX === '00:00:000' ?
                      <img className={css.test123} src={dash} alt=""></img> :
                      <div className={css.scoreTableTimeInner}>
                        <div>{e.timeX.split(":").slice(0,2).join(":")}</div>
                        <div className={css.smallerMili}>:{e.timeX.split(":")[2]}</div>
                      </div>
                    }
                  </div>
                  <div id={`evenTarget`} className={css.scoreTableScorePNG}>
                    {
                      e.scoreX === 0 ?
                      <img className={css.test123} src={dash} alt=""></img> :
                      e.scoreX
                    }
                  </div>
                  <div id={`evenTarget`} className={css.scoreTableYouAIPNG}>
                    {
                      e.X === "✔️" ?
                      <img className={css.test123} src={check} alt=""></img> :
                      e.X === "❌" ?
                      <img className={css.test123} src={cross} alt=""></img> :
                      <img className={css.test123} src={dash} alt=""></img>
                    }
                  </div>
                  <div id={`evenTarget`} className={css.scoreTableYouAIPNG}>
                    {
                      e.O === "✔️" ?
                      <img className={css.test123} src={check} alt=""></img> :
                      e.O === "❌" ?
                      <img className={css.test123} src={cross} alt=""></img> :
                      <img className={css.test123} src={dash} alt=""></img>
                    }
                  </div>
                  <div id={`evenTarget`} className={css.scoreTableScorePNG}>
                    {
                      e.scoreO === 0 ?
                      <img className={css.test123} src={dash} alt=""></img> :
                      e.scoreO
                    }
                  </div>
                  <div id={`evenTarget`} className={css.scoreTableTimePNG}>
                    {
                      e.timeO === '00:00:000' ?
                      <img className={css.test123} src={dash} alt=""></img> :
                      <div className={css.scoreTableTimeInner}>
                        <div>{e.timeO.split(":").slice(0,2).join(":")}</div>
                        <div className={css.smallerMili}>:{e.timeO.split(":")[2]}</div>
                      </div>
                    }
                  </div>
                </div>
              )
            })
          }
        </div>
        <div className={css.scoreBackgroundLight1}></div>
        <div className={css.scoreBackgroundLight2}></div>
        <div className={css.scoreBackgroundLight3}></div>
        <div className={css.scoreBackgroundLight4}></div>
        <div className={css.scoreBackgroundLight5}></div>
        <div className={css.scoreBackgroundLight6}></div>
        <div className={css.scoreBackgroundLight7}></div>
        <div className={css.scoreBackgroundLight8}></div>
        <div className={css.scoreBackgroundLight9}></div>
        <div className={css.scoreBackgroundLight10}></div>
        <div className={css.scoreBackgroundLight11}>
          <div className={css.scoreTableTitlesContainerLower}>
            <div id={`evenTarget`} className={css.scoreTableNumeralLast}></div>
            <div id={`evenTarget`} className={css.scoreTableTime}>
              {
                <div className={css.scoreTableTimeInner}>
                  <div>{XfinalMin.current.toString().padStart(2,'0')}:{XfinalSec.current.toString().padStart(2,'0')}</div>
                  <div className={css.smallerMili}>:{XfinalMs.current.toString().padStart(3,'0')}</div>
                </div>
              }
            </div>
            <div id={`evenTarget`} className={css.scoreTableScore}>{ score.current.reduce((partial, el) => partial + el.scoreX, 0) }</div>
            <div id={`evenTarget`} className={css.scoreTableTotal}>TOTAL</div>
            <div id={`evenTarget`} className={css.scoreTableScore}>{ score.current.reduce((partial, el) => partial + el.scoreO, 0) }</div>
            <div id={`evenTarget`} className={css.scoreTableTimeLast}>
              {
                <div className={css.scoreTableTimeInner}>
                  <div>{OfinalMin.current.toString().padStart(2,'0')}:{OfinalSec.current.toString().padStart(2,'0')}</div>
                  <div className={css.smallerMili}>:{OfinalMs.current.toString().padStart(3,'0')}</div>
                </div>
              }
            </div>
          </div>
        </div>
      </div>

      <div id={`divBGSlider`} className={css.sliderBGContainer}>
        <Slider
          className={css.slider}
          value={BgSoundValueState * 100}
          onChange={(e) => { handleBgValue((e.target as HTMLInputElement).value) }}
        />
        <Button
          id={css.buttonBGSlider}
          className={`buttonBGSlider`}
          onClick={() => {
            clearTimeout(timeoutBG)
            if (!BGMusicShown) setTimeoutBG(setTimeout(autoHideBG, 5000))
            setBGMusicShown(!BGMusicShown)
          }}
        >
          <MusicNoteIcon />
        </Button>
      </div>
      <div id={css.bgAndSliderContainer}>
        <Button
          id={css.buttonMute}
          onClick={() => {
            dispatch(setAllowBgSound(!allowBgSoundState))
            allowBgSound.current = !allowBgSound.current
            localStorage.setItem('allowBgSound', JSON.stringify(!allowBgSoundState))
            if (allSoundsLoaded.current && !allowBgSound.current) stopBGAudio()
            else if (allSoundsLoaded.current && allowBgSound.current) startBGAudio()
          }}
        >
          {
            allowBgSoundState ?
            <VolumeUpIcon /> :
            <VolumeOffIcon />
          }
        </Button>
      </div>

      <div id={`divFXSlider`} className={css.sliderFXContainer}>
        <Slider
          className={css.slider}
          value={FXSoundValueState * 100}
          onChange={(e) => { handleFXValue((e.target as HTMLInputElement).value) }}
        />
        <Button
          id={css.buttonFXSlider}
          className={`buttonFXSlider`}
          onClick={() => {
            clearTimeout(timeoutFX)
            if (!FXMusicShown) setTimeoutFX(setTimeout(autoHideFX, 5000))
            setFXMusicShown(!FXMusicShown)
          }}
        >
          <FXSvg style={{ width: '23px', height: '23px' }} />
        </Button>
      </div>
      <div id={css.fxAndSliderContainer}>
        <Button
          id={css.buttonMute}
          onClick={() => {
            dispatch(setAllowFXSound(!allowFXSoundState))
            allowFXSound.current = !allowFXSound.current
            localStorage.setItem('allowFXSound', JSON.stringify(!allowFXSoundState))
            if (allSoundsLoaded.current && !allowFXSound.current) {
              soundsArray.forEach((e,index) => {
                if (aF.bG.i !== index && e.context.state === 'running') e.stop()
              })
            }
          }}
        >
          {
            allowFXSoundState ?
            <VolumeUpIcon /> :
            <VolumeOffIcon />
          }
        </Button>
      </div>

      <div className={css.gameMode}>
        {
          (newGameStarted && gameMode.current === "easy") || (gameEndRoundsBoolean.current && gameMode.current === "easy") ?
          `Mode: Easy` :
          (newGameStarted && gameMode.current === "hard") || (gameEndRoundsBoolean.current && gameMode.current === "hard") ?
          `Mode: Hard` :
          (newGameStarted && gameMode.current === "nightmare") || (gameEndRoundsBoolean.current && gameMode.current === "nightmare") ?
          `Mode: Nightmare` :
          null
        }
      </div>
    </div>
  );
}

export default Main;