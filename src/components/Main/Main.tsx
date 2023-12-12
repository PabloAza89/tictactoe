
import css from './MainCSS.module.css';
import com from '../../commons/commonsCSS.module.css';
import { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material/';
import { easings } from '../../commons/easingsCSS';
//import simulate from '../../commons/simulate';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import Swal from 'sweetalert2';
import $ from 'jquery';
import check from '../../images/check.png';
import cross from '../../images/cross.png';
import dash from '../../images/dash.png';
import aF from '../../commons/aF';
import { pointsI, highlighterI, handleSequenceI, eachBoxI } from '../../interfaces/interfaces';
import { playSound, soundsArray, context, source, arraySoundResetter } from '../../commons/playSound';
import { setAllowSound } from '../../actions';
import silence from '../../audio/silence.mp3'
import testTest from '../../audio/testTest.mp3'
//const confetti = require('canvas-confetti');
import confetti from 'canvas-confetti';
//import  confetti from 'canvas-confetti';

const Main = () => {

  easings() // JQuery easings..
  const dispatch = useDispatch()

  //let Omove = new Audio('/assets/Omove.mp3');
  //let Xmove = new Audio(XmoveImp);
  //let Omove = new Audio(OmoveImp);

  //const scoreShown = useSelector((state: { scoreShown: boolean }) => state.scoreShown)

  let rC = useRef<eachBoxI[]>(Array.from({length: 9}, (e,i) => ({ id: i, value: '' }))) // rowsAndColumns



  let score = useRef<any[]>([])

  //const [ animateButton, setAnimateButton ] = useState<boolean>(false)
  //const [ scoreShown, setScoreShown ] = useState<boolean>(false)
  const allowSoundState = useSelector((state: { allowSound: boolean }) => state.allowSound)
  let allowSound = useRef(allowSoundState)
  //const menuShown = useSelector((state: {menuShown:boolean}) => state.menuShown)
  const [ scoreShown, setScoreShown ] = useState<boolean>(true)
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
        do {
          AIRandomGridIndex.current = Math.floor(Math.random() * 9)
          if (rC.current[AIRandomGridIndex.current].value === "") {
            rC.current[AIRandomGridIndex.current].value = "O"
            //Omove.play()
            playSound({ file: aF.Omove, volume: 0.6})
            success = true
            setShouldAIstartState(false)
            setUserPlaying(true)
          }
        } while (success === false)
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
      playSound({ file: aF.Xmove, volume: 0.6 })
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
        playSound({ file: aF.ticTac3Sec, volume: 0.1 })
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
        playSound({ file: aF.startRound, volume: 0.2 })
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
        playSound({ file: aF.revealed, pitch: -500 , volume: actionPoints === 100 ? 0.3 : 0.5 })
    }, actionPoints === 100 ? 400 : 300)
    //}, actionPoints === 100 ? 375 : 300)
    //}, actionPoints === 100 ? 400 : 300)
    setTimeout(() => {
      $(`#${array[1].id}`)
        .css("background", "yellow");
        playSound({ file: aF.revealed, pitch: -100, volume: actionPoints === 100 ? 0.3 : 0.5 })
    }, actionPoints === 100 ? 700 : 600)
    //}, actionPoints === 100 ? 675 : 600)
    //}, actionPoints === 100 ? 700 : 600)
    setTimeout(() => {
      $(`#${array[2].id}`)
        .css("background", "yellow")
        playSound({ file: aF.revealed, pitch: 200, volume: actionPoints === 100 ? 0.3 : 0.5 })
    }, actionPoints === 100 ? 1000 : 900)
    //}, actionPoints === 100 ? 975 : 900)
    //}, actionPoints === 100 ? 1000 : 900)

    setTimeout(() => {
      let copyPoints: pointsI = {...points}
      copyPoints[letter] = copyPoints[letter] + actionPoints
      setPoints(copyPoints)
      winnerRound.current = `${letter}`
      setTimeout(() => {
        setWinnerRoundState(`${letter}`) // SYNC WITH POP-UP
      }, 300)
    }, 1200)

    // setTimeout(() => { // TEST
    //     //setWinnerRoundState(`${letter}`) // SYNC WITH POP-UP
    //     setWinnerGameState(`${letter}`) // SYNC WITH POP-UP
    // }, 1800) // WINNER SIGN AFTER FINAL POPUP (1700ms)

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

    if (
      rC.current.filter(e => e.value === '').length === 0
      && !roundEnd.current
    ) {
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

      //playSound(taDah)

      setTimeout(() => {
        if (continueFlowPopUp.current && !gameEndRoundsBoolean.current) {

          
            if (winnerRound.current === "X") playSound({ file: aF.roundWin })
            else if (winnerRound.current === "O") playSound({ file: aF.roundLost, volume: 0.6 })
            else playSound({ file: aF.trill, volume: 0.9 })
          
          


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
    //rC.current = Array.from({length: 9}, (e,i) => ({ id: i, value: '' })) // rowsAndColumns

    // CONTINUE CHECK OF DOUBLE SOUND GAME WHEN 200 POINTS
rC.current = [ // rowsAndColumns
{ id: 0, value: 'X' },
{ id: 1, value: 'O' },
{ id: 2, value: 'X' },
{ id: 3, value: 'X' },
{ id: 4, value: 'X' },
{ id: 5, value: 'O' },
{ id: 6, value: '' },
{ id: 7, value: 'O' },
{ id: 8, value: 'O' }
]

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
    //playSound(menu, 0, 0.5)
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
        playSound({ file: aF.menu })
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
            playSound({ file: aF.menu })
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
            playSound({ file: aF.menu })
            setTimeout(function() {
              addButtonAnimation()
            },300);
          }
        })
      }
      else if (result.isDenied) { // START AI
        playSound({ file: aF.menu })
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
            playSound({ file: aF.menu })
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
            playSound({ file: aF.menu })
            setTimeout(function() {
              addButtonAnimation()
            },300);
          }
        })
      }
      else { // ESCAPE KEY OR CLICK OUTSIDE POPUP
        playSound({ file: aF.menu })
        setTimeout(function() {
          addButtonAnimation()
        },300); // NECESSARY FOR ADD ANIMATION WHEN USER PRESS SCAPE.. DON'T ASK WHY.
      }
    })
  }

  const buttonNewGameHandler = () => {
    //stopConfetti()
    stopConfetti()
    playSound({ file: aF.menu })
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
          //playSound(menu)
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
      //playSound(countDown2, -400)
      playSound({ file: aF.countDownA, volume: 0.5 })
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
      //playSound(countDown2, -400)
      playSound({ file: aF.countDownA, volume: 0.5 })
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
      //playSound(countDown2, -400)
      playSound({ file: aF.countDownA, volume: 0.5 })
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
      //playSound(countDown2, 800)
      playSound({ file: aF.countDownB, volume: 0.4 })
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

        // finalWinner === "XByTime" || 
        // finalWinner === "OByTime"
        //if (allowSound.current) 

        if (finalWinner === "X") startConfetti()

        
          if (finalWinner === "X") {
            playSound({ file: aF.taDah, volume: 0.8 }); // X win entire game
          }
          else if (finalWinner === "O") playSound({ file: aF.looser, volume: 0.7 }) // O win entire game
          else if (finalWinner === "XByTime") playSound({ file: aF.XTime, volume: 1 }) // X win entire game by time
          else if (finalWinner === "OByTime") playSound({ file: aF.OTime, volume: 1 }) // O win entire game by time
          else if (score.current.some(e => e.X === "✔️" || e.O === "✔️")) playSound({ file: aF.tiedWeird, volume: 0.9 }) // Tied by points & time & has at least a winning round, no way !
          else playSound({ file: aF.tied }) // Normal tied game
        

        


        
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

  // let context: any =  useRef();
  // let buffer: any = useRef();
  // let source: any = useRef();
 
  //console.log("test123", soundsArray)
  //console.log("123 soundsArray", soundsArray)

  // var audio = document.createElement("AUDIO")
  // document.body.appendChild(audio);
  // audio.src = '../../audio/testTest.mp3'

  // document.body.addEventListener("mousemove", function () {
  //     audio.play()
  // })

  let response: any = useRef()

  useEffect(() => { // FOR AUTOPLAY POLICY
    
    //do {
     // setTimeout(() => {
        playSound({ file: aF.testTest })
        .then((res) => { 
          console.log("RES RES", res.state);
          //response.current = res.state
          if (res.state === "suspended") {
            document.addEventListener('click', () => {
              playSound({ file: aF.testTest })
            }, { once: true }) 
          }

        })
      //}, 3000)

    //   console.log("ANOTHER ROUND")
    // } while (response.current === 'suspended')
      
    // suspended
    // running



  },[])


  
  // useEffect(() => { // FIRED ONLY WHEN TAB IS FOCUSED, CHECK VALID USER
  //   const onFocusGoogle = () => {
  //     setTimeout(() => {
  //       console.log("123 FOCUS")
  //       playSound({ file: aF.testTest })
  //     }, 2000)
        
  //   }
  //   window.addEventListener("load", onFocusGoogle);
  //   return () => window.removeEventListener("load", onFocusGoogle);
  // })



  return (
    <div
      //volume="0"
      //muted={true}
      className={`${css.background} ${com.noSelect}`}
    >
      {/* <p><a href='../../audio/testTest.mp3'>Play mp3</a></p> */}
      {/* <embed src={testTest} autostart="true" loop={false}></embed> */}
      {/* <div>
        <embed src={testTest}/> 
      </div> */}
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
          //id={`finalWinnerBox`}
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
                  //Omove.play()
                  //Audio(Omove).play();
                  if (!clickBlocked.current) {
                    handleSequence({ target: index })
                  }
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
        onClick={() => {
          //dispatch(setScoreShown(!scoreShown))
          setScoreShown(!scoreShown)
          //localStorage.setItem('scoreShown', JSON.stringify(!scoreShown))
        }}
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
      <Button
        //className={`buttonShow`}
        id={css.buttonMute}
        //id={css.buttonShow}
        onClick={() => {
          //dispatch(setScoreShown(!scoreShown))
          //setScoreShown(!scoreShown)
          dispatch(setAllowSound(!allowSoundState))
          allowSound.current = !allowSound.current
          localStorage.setItem('allowSound', JSON.stringify(!allowSoundState))
          if (!allowSound.current) soundsArray.forEach((e) => e.stop())
          //localStorage.setItem('scoreShown', JSON.stringify(!scoreShown))
        }}
      >
        
        {
          allowSoundState ?
          <VolumeUpIcon /> :
          <VolumeOffIcon />
          
        }
      </Button>
    
        <Button
          focusRipple={false}
          variant="outlined"
          id={`mmb`}
          onClick={() => {
            //timeoutId()
            //startTest(testTest)
            // startTest(trill)
            // startTest(taDah)
            
           //playTest({ file: taDah })
            ////playTest({ file: trill })
            //if (!context) {
              //console.log("test123 play 1")
              //playTest({ file: aF.testTest })

              // playSound({ file: aF.trill })
              // playSound({ file: aF.taDah })

              playSound({ file: aF.trill })
              
              //playTest({ file: trill, index: 1 })
              
            // } else /* if (context.state !== `running`) */ {
            //   console.log("test123 play 2")
            //   playTest({ buffered: true })
            // }

          }}
        >
          TEST 1
        </Button>
        <Button
          focusRipple={false}
          variant="outlined"
          onClick={() => {
            //source.current.stop()
            //source.current.disconnect()
            //source.current.suspended() // THIS MAKE "suspended" THE CONTEXT NW
            //source.current.close() // THIS MAKE "closed" THE CONTEXT NW
            // if (context && context.state === `running`) {
            //   //context.current.close() // THIS MAKE "closed" THE CONTEXT NW
            //   source.stop()
            // }

            // clearTimeout(timeoutId.current);
            // timeoutId.current = null
            //source.stop()
                   //e.suspend()
              //e.close()
            soundsArray.forEach((e) => e.stop())
            //soundsArray = []
            //arraySoundResetter()
            //arr[0].stop()
            //context.current.suspend()
            //context.current.suspend() // NW
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
        </Button>

    </div>
  );
}

export default Main;
