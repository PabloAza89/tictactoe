import css from './MainCSS.module.css';
import com from '../../commons/commonsCSS.module.css';
import { useEffect, useState, useRef } from 'react';
import { Button } from '@mui/material/';
import Swal from 'sweetalert2';
import $ from 'jquery';
import { pointsI, highlighterI, handleSequenceI, eachBoxI } from '../../interfaces/interfaces';

const Main = () => {

  let rC = useRef<eachBoxI[]>(Array.from({length: 9}, (e,i) => ({ id: i, value: '' }))) // rowsAndColumns
  //let score = useRef<any[]>([{ "id": 0, "X": 0, "O": 0, "score": 0, "time": 0 }])
  let score = useRef<any[]>([])
  //const [ animateButton, setAnimateButton ] = useState<boolean>(false)

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
      }
    }, 3000)
    setTimeout(() => {
      if (showCountdownRound.current) setCountdownRound(2) // PREVENT EXECUTION WHEN USER CLICK "NEW GAME"
    }, 4000)
    setTimeout(() => {
      if (showCountdownRound.current) setCountdownRound(1) // PREVENT EXECUTION WHEN USER CLICK "NEW GAME"
    }, 5000)
    setTimeout(() => {
      if (showCountdownRound.current) setCountdownRound(0) // PREVENT EXECUTION WHEN USER CLICK "NEW GAME"
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
        .css("background", "yellow")
    }, 300)
    setTimeout(() => {
      $(`#${array[1].id}`)
        .css("background", "yellow")
    }, 600)
    setTimeout(() => {
      $(`#${array[2].id}`)
        .css("background", "yellow")
    }, 900)

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
        timeX: winnerRound.current === "X" || winnerRound.current === "TIED" ? `${min}:${sec}:${mss}` : `00:00:000`, // FAKE MS FOR TEST (TIED BY POINTS & TIME)
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

     // if (winnerRound.current === "") {
            //   setWinnerRoundState("TIED") // SYNC WITH POP-UP
            //   clickBlocked.current = true
            // }

    if (
      rC.current.filter(e => e.value === '').length === 0
      && !roundEnd.current
    ) {
      roundEnd.current = true // STOP GAME WHEN NO MORE STEPS AVAILABLE
      setTimeout(() => {
        //let copyPoints: pointsI = {...points}
        //copyPoints[letter] = copyPoints[letter] + actionPoints
        setPoints({ "X": 0, "O": 0 })
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
          Swal.fire({
            title:
              winnerRound.current === "X" ?
              `YOU WIN !` :
              winnerRound.current === "O" ?
              `AI WIN !` :
              `TIED GAME`,
            text:
              actionPoints === 100 ?
              `+100 Points` :
              actionPoints === 200 ?
              `+200 Points !! Supperrrb !!!` :
              `no winner, no points.`,
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
    actionPoints = 0;
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
    actionPoints = 0;
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
      showDenyButton: true,
      confirmButtonText: 'LET ME START !',
      denyButtonText: `    AI STARTS !   `,
      confirmButtonColor: '#800080', // LEFT OPTION
      denyButtonColor: '#008000', // RIGHT OPTION
    })
    .then((result) => {
      console.log("123123 result", result)
      if (result.isConfirmed) { // START USER
        Swal.fire({
          title: "Select number of rounds:",
          input: "select",
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
            console.log("123123 value", value)
            gameEndRoundsNumber.current = parseInt(value, 10) - 1 // ONLY SEND WHEN result.isConfirmed
            localStorage.setItem('roundsValue', JSON.stringify(parseInt(value, 10) - 1))
          }
        })
        .then((result) => {
          if (result.isConfirmed) {
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
            console.log("123123 rejected")
            setTimeout(function() {
              addButtonAnimation()
            },300);
          }
        })
      }
      else if (result.isDenied) { // START AI
        Swal.fire({
          title: "Select number of rounds:",
          input: "select",
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
            console.log("123123 rejected")
            setTimeout(function() {
              addButtonAnimation()
            },300);
          }
        })
      }
      else { // ESCAPE KEY OR CLICK OUTSIDE POPUP
        setTimeout(function() {
          addButtonAnimation()
        },300); // NECESSARY FOR ADD ANIMATION WHEN USER PRESS SCAPE.. DON'T ASK WHY.
      }
    })
  }

  const buttonNewGameHandler = () => {
    removeFlowPopUp() // CANCEL WINNER POP-UP WHEN USER CLICK "NEW GAME" BUTTON
    removeButtonAnimation()
    if (newGameStarted/*  || gameEndRoundsBoolean.current */) {
      Swal.fire({
        title: `DO YOU WANT TO START A NEW GAME ?`,
        text: 'All points gonna be lost !..',
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
      Swal.fire({
        title: `STARTS IN\n3..`,
        showConfirmButton: false,
        showDenyButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        timer: 1000
      })
    }, 0)
    setTimeout(() => {
      Swal.fire({
        title: `STARTS IN\n2..`,
        showConfirmButton: false,
        showDenyButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        timer: 1000
      })
    }, 1000)
    setTimeout(() => {
      Swal.fire({
        title: `STARTS IN\n1..`,
        showConfirmButton: false,
        showDenyButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        timer: 1000
      })
    }, 2000)
    setTimeout(() => {
      Swal.fire({
        title: `GO !!!`,
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
          "TIED" :
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
        

        Swal.fire({
          title:
            winnerGameState === "XByTime" || finalWinner === "X" ?
            `GAME END !\nYOU WIN !` :
            finalWinner === "OByTime" || finalWinner === "O" ?
            `GAME END !\nAI WIN !` :
            score.current.some(e => e.X === "✔️" || e.O === "✔️") ? // CHECK IF TIED BY POINTS & TIME HAS AT LEAST A WINNING ROUND, no way !
            `GAME END !\nTIED, INCREDIBLE !!` :
            `GAME END !\nTIED !`
            ,
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
              </div>`
          ,
          icon:
            'success',
          showConfirmButton: true,
          showDenyButton: false,
          showCancelButton: false,
          //timer: 2000,
        })
      }, 1700) // WAITS FINAL TIME & POINTS TO UPDATE
    }
  }


  console.log("123 score.current", score.current)
  console.log("123 rC", rC) // rowsAndColumns
  console.log("123 winnerRound.current", winnerRound.current) // rowsAndColumns

  let roundsValueLS: string | null = localStorage.getItem('roundsValue');
  if (roundsValueLS !== null) gameEndRoundsNumber.current = parseInt(roundsValueLS, 10)

  return (
    <div className={`${css.background} ${com.noSelect}`}>
      <Button
        focusRipple={false}
        id={`buttonStart`}
        className={css.button}
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
              //gameEndRoundsBoolean.current && roundEnd.current && winnerRoundState === "X" ?
              gameEndRoundsBoolean.current && roundEnd.current && (winnerGameState === "X" || winnerGameState === "XByTime") ?
              `GAME WINNER: YOU !` :
              //gameEndRoundsBoolean.current && roundEnd.current && winnerRoundState === "O" ?
              gameEndRoundsBoolean.current && roundEnd.current && (winnerGameState === "O" || winnerGameState === "OByTime") ?
              `GAME WINNER: AI !` :
              //gameEndRoundsBoolean.current && roundEnd.current && winnerRoundState === "TIED" ?
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
          // style={{
          //   display: newGameStarted ? 'flex' : 'none'
          // }}
          //id={`roundsBox`}
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
          <div>TIME:  </div>
          <div id={`timer_minutes`} className={css.eachTime}>00</div>:
          <div id={`timer_seconds`} className={css.eachTime}>00</div>
          <div className={css.smallerMili}>:</div>
          <div id={`timer_ms`} className={`${css.smallerMili} ${css.eachTimeMini}`}>000</div>
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
              //showCountdownRoundState ?
              //showCountdownRound.current ?
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
      <div className={css.scoreTable}>
        <div>
          <div className={css.scoreTableTitlesContainer}>
            <div className={css.scoreTableNumeral}>#</div>
            <div className={css.scoreTableTime}>TIME</div>
            <div className={css.scoreTableScore}>SCORE</div>
            <div className={css.scoreTableYou}>YOU</div>
            <div className={css.scoreTableAI}>AI</div>
            <div className={css.scoreTableScore}>SCORE</div>
            <div className={css.scoreTableTime}>TIME</div>
          </div>

          {
            score.current.map((e,i)=> {
              return (
                <div key={i} className={css.scoreTableEachScore}>
                  <div className={css.scoreTableNumeral}>{e.id + 1}</div>
                  <div className={css.scoreTableTime}>{ e.timeX === '00:00:000' ? "➖" : e.timeX }</div>
                  <div className={css.scoreTableScore}>{ e.scoreX === 0 ? "➖" : e.scoreX }</div>
                  <div className={css.scoreTableYou}>{ e.X }</div>
                  <div className={css.scoreTableAI}>{ e.O }</div>
                  <div className={css.scoreTableScore}>{ e.scoreO === 0 ? "➖" : e.scoreO }</div>
                  <div className={css.scoreTableTime}>{ e.timeO === '00:00:000' ? "➖" : e.timeO }</div>
                </div>
              )
            })
          }
        </div>
        <div className={css.scoreTableTitlesContainerLower}>
          <div className={css.scoreTableNumeral}>#</div>
          <div className={css.scoreTableTime}>{ `${XfinalMin.current.toString().padStart(2,'0')}:${XfinalSec.current.toString().padStart(2,'0')}:${XfinalMs.current.toString().padStart(3,'0')}` }</div>
          <div className={css.scoreTableScore}>{ score.current.reduce((partial, el) => partial + el.scoreX, 0) }</div>
          <div className={css.scoreTableTotal}>TOTAL</div>
          <div className={css.scoreTableScore}>{ score.current.reduce((partial, el) => partial + el.scoreO, 0) }</div>
          <div className={css.scoreTableTime}>{ `${OfinalMin.current.toString().padStart(2,'0')}:${OfinalSec.current.toString().padStart(2,'0')}:${OfinalMs.current.toString().padStart(3,'0')}` }</div>
        </div>


      </div>

    </div>
  );
}

export default Main;