
import css from './MainCSS.module.css';
import com from '../../commons/commonsCSS.module.css';
import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material/';
import { easings } from '../../commons/easingsCSS';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import { ReactComponent as FXSvg } from '../../images/fxIcon.svg';
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

const Main = () => {

  easings() // JQuery easings..
  const dispatch = useDispatch()

  let rC = useRef<eachBoxI[]>(Array.from({length: 9}, (e,i) => ({ id: i, value: '' }))) // rowsAndColumns

  let allSoundsLoaded = useRef<boolean>(false)
  let score = useRef<any[]>([])

  //const [ gameMode, setGameMode ] = useState<string>("easy")
  const [ gameMode, setGameMode ] = useState<string>("hard")

  const allowBgSoundState = useSelector((state: { allowBgSound: boolean }) => state.allowBgSound)
  let allowBgSound = useRef(allowBgSoundState)
  const BgSoundValueState = useSelector((state: { BgSoundValue: number }) => state.BgSoundValue)

  const allowFXSoundState = useSelector((state: { allowFXSound: boolean }) => state.allowFXSound)
  let allowFXSound = useRef(allowFXSoundState)
  const FXSoundValueState = useSelector((state: { FXSoundValue: number }) => state.FXSoundValue)

  const [ scoreShown, setScoreShown ] = useState<boolean>(false)
  const [ BGMusicShown, setBGMusicShown ] = useState<boolean>(false)
  const [ FXMusicShown, setFXMusicShown ] = useState<boolean>(false)
  let clickBlocked = useRef(true)
  let validClick = useRef(false)
  let continueFlowPopUp = useRef(true)
  const [ points, setPoints ] = useState<pointsI>({ "X": 0, "O": 0 })
  let roundEnd = useRef(false)
  //let gameEndRoundsNumber = useRef(9) // 10 ROUNDS
  //let gameEndRoundsNumber = useRef(1) // 2 ROUNDS
  let gameEndRoundsNumber = useRef(0) // 1 ROUNDS
  //let gameEndRoundsNumber = useRef(2) // 3 ROUNDS
  //let gameEndRoundsNumber = useRef(1) // 2 ROUNDS
  let gameEndRoundsBoolean = useRef(false)
  let winnerRound = useRef("")
  const [ winnerRoundState, setWinnerRoundState ] = useState("") // ONLY FOR GAME UI DISPLAY REASONS..
  const [ winnerGameState, setWinnerGameState ] = useState("") // ONLY FOR GAME UI DISPLAY REASONS..
  const [ userPlaying, setUserPlaying ] = useState(true)
  let userHasStartedThisRound = useRef(true)
  const [ countdownRound, setCountdownRound ] = useState<number>(3)
  //let countdownRound = useRef<number>(3)
  let showCountdownRound = useRef<boolean>(false)
  const [ showCountdownRoundState, setShowCountdownRoundState ] = useState<boolean>(false)
  const [ shouldAIstartState, setShouldAIstartState ] = useState(false) // ONLY FOR GAME UI DISPLAY REASONS..
  const [ newGameStarted, setNewGameStarted ] = useState(false)
  let AIRandomGridIndex = useRef(Math.floor(Math.random() * 9)) // BETWEEN 0 & 8

  const AIAction = async () => {
    let randomTimes = [ 700, 800, 900, 1000, 1100 ]
    setTimeout(() => {
      if (rC.current.filter((e: any) => e.value === '').length >= 1) {
        let success = false

        if (gameMode === 'easy') {
          do {
            AIRandomGridIndex.current = Math.floor(Math.random() * 9)
            if (rC.current[AIRandomGridIndex.current].value === "") {
              rC.current[AIRandomGridIndex.current].value = "O"
              //Omove.play()
              if (allowFXSound.current) playSound({ file: aF.Omove })
              success = true
              setShouldAIstartState(false)
              setUserPlaying(true)
            }
          } while (success === false)
        } else { // BEGINS EVIL STRATEGY >-)

          // BEGIN TRY TO MATCH ALL 3 O POSSIBLE //
          if (rC.current[0].value === "O" && rC.current[2].value === "O" && rC.current[1].value === "") rC.current[1].value = "O"      // O • O
          else if (rC.current[3].value === "O" && rC.current[5].value === "O" && rC.current[4].value === "") rC.current[4].value = "O" // O • O
          else if (rC.current[6].value === "O" && rC.current[8].value === "O" && rC.current[7].value === "") rC.current[7].value = "O" // O • O

          else if (rC.current[0].value === "O" && rC.current[1].value === "O" && rC.current[2].value === "") rC.current[2].value = "O" // O O •
          else if (rC.current[3].value === "O" && rC.current[4].value === "O" && rC.current[5].value === "") rC.current[5].value = "O" // O O •
          else if (rC.current[6].value === "O" && rC.current[7].value === "O" && rC.current[8].value === "") rC.current[8].value = "O" // O O •

          else if (rC.current[1].value === "O" && rC.current[2].value === "O" && rC.current[0].value === "") rC.current[0].value = "O" // • O O
          else if (rC.current[4].value === "O" && rC.current[5].value === "O" && rC.current[3].value === "") rC.current[3].value = "O" // • O O
          else if (rC.current[7].value === "O" && rC.current[8].value === "O" && rC.current[6].value === "") rC.current[6].value = "O" // • O O

          else if (rC.current[0].value === "O" && rC.current[6].value === "O" && rC.current[3].value === "") rC.current[3].value = "O" // O O O
          else if (rC.current[1].value === "O" && rC.current[7].value === "O" && rC.current[4].value === "") rC.current[4].value = "O" // • • •
          else if (rC.current[2].value === "O" && rC.current[8].value === "O" && rC.current[5].value === "") rC.current[5].value = "O" // O O O

          else if (rC.current[0].value === "O" && rC.current[3].value === "O" && rC.current[6].value === "") rC.current[6].value = "O" // O O O
          else if (rC.current[1].value === "O" && rC.current[4].value === "O" && rC.current[7].value === "") rC.current[7].value = "O" // O O O
          else if (rC.current[2].value === "O" && rC.current[5].value === "O" && rC.current[8].value === "") rC.current[8].value = "O" // • • •

          else if (rC.current[3].value === "O" && rC.current[6].value === "O" && rC.current[0].value === "") rC.current[0].value = "O" // • • •
          else if (rC.current[4].value === "O" && rC.current[7].value === "O" && rC.current[1].value === "") rC.current[1].value = "O" // O O O
          else if (rC.current[5].value === "O" && rC.current[8].value === "O" && rC.current[2].value === "") rC.current[2].value = "O" // O O O

          else if (rC.current[0].value === "O" && rC.current[8].value === "O" && rC.current[4].value === "") rC.current[4].value = "O" // O • • // O • • // • • •
          else if (rC.current[0].value === "O" && rC.current[4].value === "O" && rC.current[8].value === "") rC.current[8].value = "O" // • • • // • O • // • O •
          else if (rC.current[4].value === "O" && rC.current[8].value === "O" && rC.current[0].value === "") rC.current[0].value = "O" // • • O // • • • // • • O

          else if (rC.current[2].value === "O" && rC.current[6].value === "O" && rC.current[4].value === "") rC.current[4].value = "O" // • • O // • • O // • • •
          else if (rC.current[2].value === "O" && rC.current[4].value === "O" && rC.current[6].value === "") rC.current[6].value = "O" // • • • // • O • // • O •
          else if (rC.current[4].value === "O" && rC.current[6].value === "O" && rC.current[2].value === "") rC.current[2].value = "O" // O • • // • • • // O • •
          // END TRY TO MATCH ALL 3 O POSSIBLE //

          // BEGIN TRY TO BLOCK 3 XXX FROM HUMAN ENEMY //
          else if (rC.current[3].value === "O" && rC.current[5].value === "O" && rC.current[4].value === "") rC.current[4].value = "O" // X • •
          else if (rC.current[3].value === "O" && rC.current[5].value === "O" && rC.current[4].value === "") rC.current[4].value = "O" // • • •
          else if (rC.current[3].value === "O" && rC.current[5].value === "O" && rC.current[4].value === "") rC.current[4].value = "O" // • • •


          // END TRY TO BLOCK 3 XXX FROM HUMAN ENEMY //

          else if (rC.current[4].value === "") rC.current[4].value = "O" // TRY MARK CENTER

          else if (rC.current[4].value === "O") { // IF CENTER IS "O" TRY DIAGONALS: 0+4+8 // 2+4+6
            if (rC.current[0].value === "O" && rC.current[8].value === "") rC.current[8].value = "O"
            else if (rC.current[2].value === "O" && rC.current[6].value === "") rC.current[6].value = "O"
            else if (rC.current[0].value === "") rC.current[0].value = "O"
            else if (rC.current[2].value === "") rC.current[2].value = "O"
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
      console.log("while se ejecuto func de user, valid click")
      rC.current[target].value = "X"
      //Omove.play()
      //Xmove.play()
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
        showCountdownRound.current = false // TEST
      } else if (showCountdownRound.current) { // AUTO-START AI // PREVENT EXECUTION WHEN USER CLICK "NEW GAME"
        softResetGame()
        userHasStartedThisRound.current = false
        clickBlocked.current = true
        setShouldAIstartState(true)
        startTimer()
        AIAction()
        showCountdownRound.current = false // TEST
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

    // console.log("123 actionPoints", actionPoints)
    // if (actionPoints === 100) setTimeout(() => { $(`#${array[2].id}`).css("background", "blue") }, 1000)
    // else setTimeout(() => { $(`#${array[2].id}`).css("background", "gray") }, 900)

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
        //timeX: winnerRound.current === "X" || winnerRound.current === "TIED" ? `${min}:${sec}:339` : `00:00:000`, // FAKE MS FOR TEST (TIED BY POINTS & TIME)
        timeX: winnerRound.current === "X" || winnerRound.current === "TIED" ? `${min}:${sec}:${mss}` : `00:00:000`,
        scoreX: winnerRound.current === "X" ? actionPoints : 0,
        X: winnerRound.current === "TIED" ? "➖" : winnerRound.current === "X" ? "✔️" : "❌",
        O: winnerRound.current === "TIED" ? "➖" : winnerRound.current === "O" ? "✔️" : "❌",
        scoreO: winnerRound.current === "O" ? actionPoints : 0,
        timeO: winnerRound.current === "O" || winnerRound.current === "TIED" ? `${min}:${sec}:${mss}` : `00:00:000`,
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
              winnerRound.current === "" ?
              'info' :
              'success',
            showConfirmButton: false,
            showDenyButton: false,
            showCancelButton: false,
            timer: 2000,
          })
          setTimeout(() => {
            // if (winnerRound.current === "") {
            //   setWinnerRoundState("TIED") // SYNC WITH POP-UP
            //   clickBlocked.current = true
            // }
          }, 1200)
        }
      }, 1200)

      if (!gameEndRoundsBoolean.current) showCountdownRound.current = true // ARREGLAR ESTO // ENABLES COUNTDOWN VISUALIZATION
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
    // XfinalMin = 0
    // XfinalSec = 0
    // XfinalMs = 0
    // OfinalMin = 0
    // OfinalSec = 0
    // OfinalMs = 0
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
//   score.current = [
//   {
//     id: 0,
//     timeX: `10:34:112`,
//     scoreX: 100,
//     X: "✔️",
//     O: "❌",
//     scoreO: 0,
//     timeO: `00:00:000`
//   },
//   {
//     id: 1,
//     timeX: `00:00:000`,
//     scoreX: 0,
//     X: "❌",
//     O: "✔️",
//     scoreO: 100,
//     timeO: `10:34:112`
//   }
// ]



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

    // CONTINUE CHECK OF DOUBLE SOUND GAME WHEN 200 POINTS
// rC.current = [ // rowsAndColumns
// { id: 0, value: 'X' },
// { id: 1, value: 'O' },
// { id: 2, value: 'X' },
// { id: 3, value: 'X' },
// { id: 4, value: 'X' },
// { id: 5, value: 'O' },
// { id: 6, value: '' },
// { id: 7, value: 'O' },
// { id: 8, value: 'O' }
// ]

// rC.current = [ // rowsAndColumns
// { id: 0, value: 'X' },
// { id: 1, value: '' },
// { id: 2, value: 'X' },
// { id: 3, value: 'O' },
// { id: 4, value: 'X' },
// { id: 5, value: 'O' },
// { id: 6, value: 'O' },
// { id: 7, value: 'X' },
// { id: 8, value: 'O' }
// ]

    clickBlocked.current = true
    setPoints({ "X": 0, "O": 0 });
    //actionPoints = 0;
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
    // roundEnd.current = false
    // setWinnerGameState("")
    // setWinnerRoundState("")
    // removeFinalWinnerChangeColor()
    Swal.fire({
      title: `WELCOME TO TIC-TAC-TOE !`,
      text: 'Please, select who start first..',
      heightAuto: false, // PREVENTS SWAL CHANGE BACKGROUND POSITION
      showDenyButton: true,
      confirmButtonText: 'LET ME START !',
      denyButtonText: `    AI STARTS !   `,
      confirmButtonColor: '#800080', // LEFT OPTION
      denyButtonColor: '#008000', // RIGHT OPTION
    })
    .then((result) => {
      //console.log("123123 result", result)
      if (result.isConfirmed) { // START USER
        if (allowFXSound.current) playSound({ file: aF.menu })
        Swal.fire({
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
            //console.log("123123 value", value)
            gameEndRoundsNumber.current = parseInt(value, 10) - 1 // ONLY SEND WHEN result.isConfirmed
            localStorage.setItem('roundsValue', JSON.stringify(parseInt(value, 10) - 1))
          }
        })
        .then((result) => {
          if (result.isConfirmed) {
            if (allowFXSound.current) playSound({ file: aF.menu })
            basicOptions()
            userHasStartedThisRound.current = true
            setShouldAIstartState(false)
            setTimeout(() => {
              startTimer()
              clickBlocked.current = false
              showCountdownRound.current = true // ARREGLAR ESTO // ENABLES COUNTDOWN VISUALIZATION
            }, 4300) // SYNC WITH POP-UP CLOSES
          }
          else { // ESCAPE KEY OR CLICK OUTSIDE POPUP
            //console.log("123123 rejected")
            if (allowFXSound.current) playSound({ file: aF.menu })
            setTimeout(function() {
              addButtonAnimation()
            },300);
          }
        })
      }
      else if (result.isDenied) { // START AI
        if (allowFXSound.current) playSound({ file: aF.menu })
        Swal.fire({
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
            gameEndRoundsNumber.current = parseInt(value, 10) - 1
            localStorage.setItem('roundsValue', JSON.stringify(parseInt(value, 10) - 1))
          }
        })
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
              showCountdownRound.current = true // ARREGLAR ESTO // ENABLES COUNTDOWN VISUALIZATION
            }, 4300) // SYNC WITH POP-UP CLOSES
          }
          else { // ESCAPE KEY OR CLICK OUTSIDE POPUP
            //console.log("123123 rejected")
            if (allowFXSound.current) playSound({ file: aF.menu })
            setTimeout(function() {
              addButtonAnimation()
            },300);
          }
        })
      }
      else { // ESCAPE KEY OR CLICK OUTSIDE POPUP
        if (allowFXSound.current) playSound({ file: aF.menu })
        setTimeout(function() {
          addButtonAnimation()
        },300); // NECESSARY FOR ADD ANIMATION WHEN USER PRESS SCAPE.. DON'T ASK WHY.
      }
    })
  }

  const buttonNewGameHandler = () => {
    //stopConfetti()
    stopConfetti()
    if (allowFXSound.current) playSound({ file: aF.menu })
    removeFlowPopUp() // CANCEL WINNER POP-UP WHEN USER CLICK "NEW GAME" BUTTON
    removeButtonAnimation()
    if (newGameStarted/*  || gameEndRoundsBoolean.current */) {
      Swal.fire({
        title: `DO YOU WANT TO START A NEW GAME ?`,
        text: 'All points gonna be lost !..',
        heightAuto: false, // PREVENTS SWAL CHANGE BACKGROUND POSITION
        icon: 'info',
        showDenyButton: true,
        confirmButtonText: 'START NEW GAME !',
        denyButtonText: `CONTINUE PLAYING !`,
        confirmButtonColor: '#800080', // LEFT OPTION
        denyButtonColor: '#008000', // RIGHT OPTION
      })
      .then((result) => {
        if (result.isConfirmed) {
          selectOptions() // CONFIRM NEW GAME
          //showCountdownRound.current = true // ARREGLAR ESTO // ENABLES COUNTDOWN VISUALIZATION
        }
        else {
          addFlowPopUp() // ELSE CONTINUE GAME
          //showCountdownRound.current = true // ARREGLAR ESTO // ENABLES COUNTDOWN VISUALIZATION
        }
      })

    } else {
      selectOptions() // WHEN NO CURRENT GAME
      //showCountdownRound.current = true // ARREGLAR ESTO // ENABLES COUNTDOWN VISUALIZATION
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

    let miliseconds = document.getElementById('timer_ms')
    if (miliseconds !== null) miliseconds.textContent = format(value, 1, 1000, 3);
    let seconds = document.getElementById('timer_seconds')
    if (seconds !== null) seconds.textContent = format(value, 1000, 60, 2);
    let minutes = document.getElementById('timer_minutes')
    if (minutes !== null) minutes.textContent = format(value, 60000, 60, 2);

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

  // let XfinalMin = 0
  // let XfinalSec = 0
  // let XfinalMs = 0
  // let OfinalMin = 0
  // let OfinalSec = 0
  // let OfinalMs = 0
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
    console.log("score.current.length", score.current)

    if (gameEndRoundsNumber.current === score.current.length ) { // GAME END BY ROUNDS
      // gameEndRoundsBoolean.current = true;
      // showCountdownRound.current = false // PREVENT DEFAULT NEXT ROUND COUNTDOWN

      //gameEndRoundsBoolean.current = true;
      gameEndRoundsBoolean.current = true;
      showCountdownRound.current = false
      setNewGameStarted(false)

      setTimeout(() => {
        addButtonAnimation()
        //gameEndRoundsBoolean.current = true;
         // PREVENT DEFAULT NEXT ROUND COUNTDOWN
      }, 1800) // BUTTON SHAKE AFTER FINAL POPUP (1700ms)
      //setShowCountdownRoundState(false)

      //console.log("123123 333", XfinalMin.current.toString().concat(XfinalSec.current.toString(), XfinalMs.current.toString()))
      setTimeout(() => {

        //console.log("123123", XfinalMin.current.toString().concat(XfinalSec.current.toString(), XfinalMs.current.toString()))
        let XSumScore = score.current.reduce((partial, el) => partial + el.scoreX, 0)
        let OSumScore = score.current.reduce((partial, el) => partial + el.scoreO, 0)
        let XSumTime = parseInt(XfinalMin.current.toString().concat(XfinalSec.current.toString(), XfinalMs.current.toString()), 10)
        let OSumTime = parseInt(OfinalMin.current.toString().concat(OfinalSec.current.toString(), OfinalMs.current.toString()), 10)

        //let finalWinner =
        //setWinnerGameState(
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
        //)

        setTimeout(() => {
          setWinnerGameState(finalWinner)
          addFinalWinnerChangeColor()
        }, 200) // DELAY WAITS FOR FINAL POPUP
 

        if (finalWinner === "X") startConfetti()

        if (allowFXSound.current) {
          if (finalWinner === "X") playSound({ file: aF.taDah, pitch: 100 }); // X win entire game
          else if (finalWinner === "O") playSound({ file: aF.looser, pitch: 125 }) // O win entire game
          else if (finalWinner === "XByTime") playSound({ file: aF.XTime }) // X win entire game by time
          else if (finalWinner === "OByTime") playSound({ file: aF.OTime }) // O win entire game by time
          else if (score.current.some(e => e.X === "✔️" || e.O === "✔️")) playSound({ file: aF.tiedWeird }) // Tied by points & time & has at least a winning round, no way !
          else playSound({ file: aF.tied }) // Normal tied game
        }
        

        


        
        // do {
        //   setTimeout(() => {
        //     console.log("ABASDBASDASDASDASDASD")
        //     //totalFire()
        //   }, 1000)
        // } while (gameEndRoundsBoolean.current)

        Swal.fire({
          title:
            finalWinner === "XByTime" || finalWinner === "X" ?
            `GAME END !\nYOU WIN !` :
            finalWinner === "OByTime" || finalWinner === "O" ?
            `GAME END !\nAI WIN !` :
            score.current.some(e => e.X === "✔️" || e.O === "✔️") ? // Check if tied by points & time & has at least a winning round, no way !
            `GAME END !\nTIED, INCREDIBLE !!`: // Tied by points & time & has at least a winning round, no way !
            `GAME END !\nTIED !`,
          html:
            finalWinner === `XByTime` ? // CHECKED
              `<div>
                <div>You have tied in points, but you won by time !</div>
                <div>Points: ${XSumScore}</div>
                <div>Time: ${XfinalMin.current.toString().padStart(2,'0')}:${XfinalSec.current.toString().padStart(2,'0')}:${XfinalMs.current.toString().padStart(3,'0')}</div>
              </div>` :
            finalWinner === `OByTime` ? // CHECKED
              `<div>
                <div>You have tied in points, but AI won by time !</div>
                <div>Points: ${OSumScore}</div>
                <div>Time: ${OfinalMin.current.toString().padStart(2,'0')}:${OfinalSec.current.toString().padStart(2,'0')}:${OfinalMs.current.toString().padStart(3,'0')}</div>
              </div>` :
            finalWinner === `X` ? // CHECKED
              `<div>
                <div>You have won by points !</div>
                <div>Points: ${XSumScore}</div>
                <div>Time: ${XfinalMin.current.toString().padStart(2,'0')}:${XfinalSec.current.toString().padStart(2,'0')}:${XfinalMs.current.toString().padStart(3,'0')}</div>
              </div>` :
            finalWinner === `O` ? // CHECKED
              `<div>
                <div>AI have won by points !</div>
                <div>Points: ${OSumScore}</div>
                <div>Time: ${OfinalMin.current.toString().padStart(2,'0')}:${OfinalSec.current.toString().padStart(2,'0')}:${OfinalMs.current.toString().padStart(3,'0')}</div>
              </div>` :
            score.current.some(e => e.X === "✔️" || e.O === "✔️") ? // CHECK IF TIED BY POINTS & TIME HAS AT LEAST A WINNING ROUND
              `<div>
                <div>The game is tied, this is really incredible !!</div>
                <div>Tied by points & time !!!</div>
                <div>Points: ${XSumScore}</div>
                <div>Time: ${XfinalMin.current.toString().padStart(2,'0')}:${XfinalSec.current.toString().padStart(2,'0')}:${XfinalMs.current.toString().padStart(3,'0')}</div>
              </div>` : // ↓↓↓ CHECKED, no way ! ↓↓↓
              `<div>
                <div>The game is tied !</div>
                <div>Tied by points & time !</div>
                <div>Points: ${XSumScore}</div>
                <div>Time: ${XfinalMin.current.toString().padStart(2,'0')}:${XfinalSec.current.toString().padStart(2,'0')}:${XfinalMs.current.toString().padStart(3,'0')}</div>
              </div>`,
          heightAuto: false, // PREVENTS SWAL CHANGE BACKGROUND POSITION
          icon:
            'success',
          showConfirmButton: true,
          showDenyButton: false,
          showCancelButton: false,
          //timer: 2000,
        })

        //startConfetti()

      }, 1700) // WAITS FINAL TIME & POINTS TO UPDATE

      // confetti({
      //   particleCount: 100,
      //   spread: 70,
      //   origin: { y: 0.6 }
      // });

      //confetti()

      //totalFire()



    }
  }


  //console.log("123 score.current", score.current)
  //console.log("123 rC", rC) // rowsAndColumns
  //console.log("123 winnerRound.current", winnerRound.current) // rowsAndColumns

  let roundsValueLS: string | null = localStorage.getItem('roundsValue');
  if (roundsValueLS !== null) gameEndRoundsNumber.current = parseInt(roundsValueLS, 10)

  useEffect(() => { // SHOW/HIDE SCORE HANDLER
    $(function() {
      if (!scoreShown) { // show --> hidden
        $(`.buttonShow`)
          .on("click", function() {
          $(`#sliderBox`)
            .stop() // ↓↓ ABSOLUTE ↓↓
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
              .stop() // DIV WIDTH
              .animate( { right: '-415px' }, { queue: false, easing: 'easeOutCubic', duration: 800 })
          })
        $(`#sliderBox`)
          .css("left", "auto")
          .css("right", "0px") // ABSOLUTE
      }
    })
  },[scoreShown])

  useEffect(() => { // SHOW/HIDE BG SLIDER
    $(function() {
      if (BGMusicShown) { // show --> hidden
        $(`.buttonBGSlider`)
          .on("click", function() {
            $(`#divBGSlider`)
              .stop()
              .animate( { left: '-117px' }, { queue: false, easing: 'easeOutCubic', duration: 800 }) // INITIAL POSITION
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
          .css("left", "-117px") // ABSOLUTE
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
              .animate( { left: '-117px' }, { queue: false, easing: 'easeOutCubic', duration: 800 }) // INITIAL POSITION
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
          .css("left", "-117px") // ABSOLUTE
      }
    })
  },[FXMusicShown])

  const [ height, setHeight ] = useState<number>(window.innerHeight)

  useEffect(() => { // INNER HEIGHT HANDLER
    function handleResize() {
      let { innerHeight } = window
      setHeight(innerHeight)
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize)
  })

  useEffect(() => { // MOUSE GRAB EFFECT ON MOUSE DEVICES
    const el = document.getElementById('sliderBox');
    if (el !== null) {
      const mouseEnterOnScore = () => {
        if (height <= 550) el.style.cursor = 'grab'; // GRAB WHEN ENTER (MOUSEENTER)
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
          if (height <= 550) {
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
          el.removeEventListener('mousedown', mouseDownHandler)
          el.style.cursor = 'default'
        })
      }
      el.addEventListener("mouseenter", mouseEnterOnScore)
      return () => el.removeEventListener("mouseenter", mouseEnterOnScore)
    }
  })

  // BEGIN CONFETTI //

  let countConfetti = 200;
  let defaultsConfetti = {
    origin: { y: 0.7 }
  };

  const fireConfetti = (particleRatio: any, opts: any) => {
    confetti({
      ...defaultsConfetti,
      ...opts,
      particleCount: Math.floor(countConfetti * particleRatio)
    });
  }

  const fireAllConfetti = () => {
    fireConfetti(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fireConfetti(0.2, {
      spread: 60,
    });
    fireConfetti(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });
    fireConfetti(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    });
    fireConfetti(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }

  let intervalID: any = useRef()
  const startConfetti = () => {
    fireAllConfetti()
    intervalID.current = setInterval(fireAllConfetti, 2000);
  }

  const stopConfetti = () => {
    console.log("EXECUTED CLEAR")
    clearInterval(intervalID.current);
    intervalID.current = null;
  }

  // END CONFETTI //

  const playBackgroundSong = () => {
    playSound({ file: aF.bG, cV: BgSoundValueState, loop: true })
    .then((res: any) => {
      if (res.state === "suspended") {
        document.addEventListener('click', () => {
          if (allowBgSound.current) {
            console.log("se ejecuto este 2")
            contextArray[aF.bG.i].resume()
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

  const autoHideBG = () => {
    $(function() {
      $(`.buttonBGSlider`)
        .trigger( "click" )
    })
  }

  const autoHideFX = () => {
    $(function() {
      $(`.buttonFXSlider`)
        .trigger( "click" )
    })
  }

  const [ timeoutBG, setTimeoutBG ] = useState<ReturnType<typeof setTimeout>>()
  const [ timeoutFX, setTimeoutFX ] = useState<ReturnType<typeof setTimeout>>()


  useEffect(() => { // LOAD ALL SOUNDS
    let fileCounter: number = 0;
    Object.keys(aF).forEach((e: any, i: any) => {
      loadAllSounds({ file: aF[e] })
      .then(() => {
        fileCounter += 1
      })
      .then(() => {
        if (fileCounter === Object.keys(aF).length) {
          allSoundsLoaded.current = true
          if (allowBgSound.current) playBackgroundSong()
        }
      })
    })
  },[])

  console.log("111 GAME MODE", gameMode)

  return (
    <div className={`${css.background} ${com.noSelect}`}>
      <Button
        focusRipple={false}
        id={`buttonStart`}
        className={css.buttonNewGame}
        variant="outlined"
        sx={{ color: 'white', background: 'blue', '&:hover': { background: 'green' } }}
        onClick={() => {
          buttonNewGameHandler()
        }}
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
        <div
          className={css.finalWinner}
        >
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
          style={{
            display: newGameStarted ? 'flex' : 'none'
          }}
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
              <div className={css.nextGameText}> Next round in</div>
              <div className={css.nextGameNumber}>{countdownRound} </div>
            </div>
          }
        </div>
      </div>
      <Button
        className={`buttonShow`}
        id={css.buttonShow}
        onClick={() => setScoreShown(!scoreShown) }
      >
        <div className={css.buttonTypo}>
          { `TOTAL SCORE` }
        </div>
      </Button>
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
            if (allSoundsLoaded.current && !allowBgSound.current) {
              console.log("MUTED se ejecuto este otro 1")
              soundsArray[aF.bG.i].stop()
            } else if (allSoundsLoaded.current && allowBgSound.current) {
              console.log("PLAY se ejecuto este otro 2")
              playSound({ file: aF.bG, cV: BgSoundValueState, loop: true })
            }
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
          <FXSvg style={{ width: '23px', height: '23px' }}/>
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
              console.log("MUTED se ejecuto este otro 1")
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

      
        <Button
          focusRipple={false}
          variant="outlined"
          id={`mmb`}
          onClick={() => {
            setGameMode("easy")
          }}
        >
          EASY MODE
        </Button>

        <Button
          focusRipple={false}
          variant="outlined"
          id={`mmb`}
          onClick={() => {
            setGameMode("hard")
          }}
        >
          HARD MODE
        </Button>
    
    
        {/* <Button
          focusRipple={false}
          variant="outlined"
          id={`mmb`}
          onClick={() => {
            //soundsArray[aF.bG.i].start()
            //soundsArray[aF.bG.i].start()

            //contextArray[aF.bG.i].resume()
            //playSound({ file: aF.bG, volume: 0.4, loop: true })

            //soundsArray[aF.bG.i].start()

            //contextArray[aF.bG.i].resume()
            console.log("soundsArray 333", soundsArray)
            //soundsArray[aF.bG.i].start()
            //soundsArray[aF.bG.i].resume()            
            //if (allowBgSound.current) playSound({ file: aF.bG, volume: 0.4, loop: true })
            //soundsArray[aF.bG.i].start(0)

          }}
        >
          TEST 1
        </Button>
        <Button
          focusRipple={false}
          variant="outlined"
          onClick={() => {
            //soundsArray[aF.bG.i].stop()
            //soundsArray[aF.bG.i].close()
            //soundsArray[aF.bG.i].pause()
            //contextArray[aF.bG.i].suspend()

            //contextArray[aF.bG.i].suspend()
            //contextArray[aF.bG.i].close()
            contextArray[aF.bG.i].close()
            //soundsArray[aF.bG.i].stop()

            //soundsArray[aF.bG.i].stop()
            //contextArray[aF.bG.i].close()
          }}
        >
          TEST 2
        </Button>
        <Button
          focusRipple={false}
          variant="outlined"
          onClick={() => {
            //source.current.stop()
            //source.current.resume()
            //source.current.resume()
            //source.current.start(0)
            //stopConfetti()
          }}
        >
          TEST 3
        </Button> */}
        <div>
          This App it's currently on development. So you will see my work done in real time.. day by day..
        </div>
    </div>
  );
}

export default Main;
