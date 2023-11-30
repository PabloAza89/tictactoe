import css from './MainCSS.module.css';
import com from '../../commons/commonsCSS.module.css';
import { useEffect, useState, useRef } from 'react';
import { Button } from '@mui/material/';
import Swal from 'sweetalert2';
import $ from 'jquery';
import { pointsI, highlighterI, handleSequenceI } from '../../interfaces/interfaces';

const Main = () => {

  let rowsAndColumns = useRef<any[]>(Array.from({length: 9}, (e,i) => ({ id: i, value: '' })))
  let clickBlocked = useRef(true)
  let validClick = useRef(false)
  let continueFlowPopUp = useRef(true)
  const [ points, setPoints ] = useState<pointsI>({ "X": 0, "O": 0 })
  let gameEnd = useRef(false)
  let winner = useRef("")
  const [ winnerState, setWinnerState ] = useState("") // ONLY FOR GAME UI DISPLAY REASONS..
  const [ userTurn, setUserTurn ] = useState(true)
  let shouldAIstart = useRef(false)
  const [ shouldAIstartState, setShouldAIstartState ] = useState(false) // ONLY FOR GAME UI DISPLAY REASONS..
  const [ newGameStarted, setNewGameStarted ] = useState(false)
  let AIRandomGridIndex = useRef(Math.floor(Math.random() * 9)) // BETWEEN 0 & 8

  const AIAction = async () => {

    let randomTimes = [ 700, 800, 900, 1000, 1100 ]
    setTimeout(() => {
      if (rowsAndColumns.current.filter((e: any) => e.value === '').length >= 1) {
        let success = false
        do {
          AIRandomGridIndex.current = Math.floor(Math.random() * 9)
          if (rowsAndColumns.current[AIRandomGridIndex.current].value === "") {
            rowsAndColumns.current[AIRandomGridIndex.current].value = "O"
            success = true
            shouldAIstart.current = false
            setShouldAIstartState(false)
            setUserTurn(true)
          }
        } while (success === false)
      }
      checkWinner()
      .then(() => { if (!gameEnd.current) clickBlocked.current = false })
    }, randomTimes[Math.floor(Math.random() * 5)])
  }

  const userAction = async ( target: any) => {
    if (target !== undefined && rowsAndColumns.current[target].value === "") {
      console.log("while se ejecuto func de user, valid click")
      rowsAndColumns.current[target].value = "X"
      setUserTurn(false)
      validClick.current = true
      clickBlocked.current = true
    } else validClick.current = false // CLICK IS NOT VALID
  }

  const handleSequence = async ({ target }: handleSequenceI) => {
    shouldAIstart.current = false
    userAction(target)
    .then(() => { if (validClick.current) checkWinner() })
    .then(() => { if (!gameEnd.current && validClick.current) AIAction() })
  }

  const highlighter = async ({ array, letter }: highlighterI) => { // GAME END WITH A WINNER
    actionPoints = actionPoints + 100
    clickBlocked.current = true
    gameEnd.current = true
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
      winner.current = `${letter}`
      setTimeout(() => {
        setWinnerState(`${letter}`) // SYNC WITH POP-UP
      }, 300)
    }, 1200)
  }

  let actionPoints: number = 0

  const checkWinner = async () => {
    let rowTargets = [0,3,6]
    let columnsTargets = [0,1,2]
    //let diagonalTargets = [0,2]
    rowTargets.forEach(e => { // ROW
      if (rowsAndColumns.current.slice(e, e + 3).every(e => e.value === 'X')) highlighter({ array: rowsAndColumns.current.slice(e, e + 3), letter: "X" })
      if (rowsAndColumns.current.slice(e, e + 3).every(e => e.value === 'O')) highlighter({ array: rowsAndColumns.current.slice(e, e + 3), letter: "O" })
    })

    columnsTargets.forEach((e, index) => { // COLUMN
      if ([rowsAndColumns.current[e],rowsAndColumns.current[e + 3],rowsAndColumns.current[e + 6]].every(e => e.value === 'X')) highlighter({ array: [rowsAndColumns.current[e],rowsAndColumns.current[e + 3],rowsAndColumns.current[e + 6]], letter: "X" })
      if ([rowsAndColumns.current[e],rowsAndColumns.current[e + 3],rowsAndColumns.current[e + 6]].every(e => e.value === 'O')) highlighter({ array: [rowsAndColumns.current[e],rowsAndColumns.current[e + 3],rowsAndColumns.current[e + 6]], letter: "O" })
    })

    // DIAGONAL
    if ([rowsAndColumns.current[0],rowsAndColumns.current[4],rowsAndColumns.current[8]].every(e => e.value === 'X')) highlighter({ array: [rowsAndColumns.current[0],rowsAndColumns.current[4],rowsAndColumns.current[8]], letter: "X" })
    if ([rowsAndColumns.current[0],rowsAndColumns.current[4],rowsAndColumns.current[8]].every(e => e.value === 'O')) highlighter({ array: [rowsAndColumns.current[0],rowsAndColumns.current[4],rowsAndColumns.current[8]], letter: "O" })
    if ([rowsAndColumns.current[2],rowsAndColumns.current[4],rowsAndColumns.current[6]].every(e => e.value === 'X')) highlighter({ array: [rowsAndColumns.current[2],rowsAndColumns.current[4],rowsAndColumns.current[6]], letter: "X" })
    if ([rowsAndColumns.current[2],rowsAndColumns.current[4],rowsAndColumns.current[6]].every(e => e.value === 'O')) highlighter({ array: [rowsAndColumns.current[2],rowsAndColumns.current[4],rowsAndColumns.current[6]], letter: "O" })

    if (rowsAndColumns.current.filter(e => e.value === '').length === 0) gameEnd.current = true // STOP GAME WHEN NO MORE STEPS AVAILABLE

    if (gameEnd.current) {
      stopTimer()
      setTimeout(() => {
        if (continueFlowPopUp.current) {
          Swal.fire({
            title:
              winner.current === "X" ?
              `YOU WIN !` :
              winner.current === "O" ?
              `AI WIN !` :
              `TIED GAME`,
            text:
              actionPoints === 100 ?
              `+100 Points` :
              actionPoints === 200 ?
              `+200 Points !! Supperrrb !!!` :
              `no winner, no points.`,
            icon:
              winner.current === "" ?
              'info' :
              'success',
            showConfirmButton: false,
            showDenyButton: false,
            showCancelButton: false,
            timer: 2000,
          })
          setTimeout(() => {
            if (winner.current === "") {
              setWinnerState("TIED") // SYNC WITH POP-UP
              clickBlocked.current = true
            }
          }, 1200)
        }
      }, 1200)

      setTimeout(() => {
        if (gameEnd.current) addTimerChangeColor() // MAKE SURE THERE ISN'T A NEW GAME TO MAKE THE ANIMATION
      }, 3200)
    }
  }

  const addButtonAnimation = () => $(`#buttonStart`).addClass(`${css.shakeAnimation}`);
  const removeButtonAnimation = () => $(`#buttonStart`).removeClass(`${css.shakeAnimation}`);
  const addTimerChangeColor = () => $(`#timerBox`).addClass(`${css.changeColor}`);
  const removeTimerChangeColor = () => $(`#timerBox`).removeClass(`${css.changeColor}`);

  useEffect(() => { // BUTTON SHAKE ANIMATION AT VERY FIRST TIME
    addButtonAnimation()
  },[])

  const basicOptions = () => {
    startsIn()
    setNewGameStarted(true) // ADD TIMER IN SCREEN
  }

  const resetGame = () => {
    continueFlowPopUp.current = true
    stopTimer()
    resetTimer()
    rowsAndColumns.current = Array.from({length: 9}, (e,i) => ({ id: i, value: '' }))
    clickBlocked.current = true
    setPoints({ "X": 0, "O": 0 });
    actionPoints = 0;
    gameEnd.current = false;
    winner.current = ""
    setWinnerState("")
    setUserTurn(true);
    removeButtonAnimation()
    removeTimerChangeColor()
    actionPoints = 0;
    AIRandomGridIndex.current = Math.floor(Math.random() * 9) // BETWEEN 0 & 8
    rowsAndColumns.current.forEach(e => {
      $(`#${e.id}`)
      .css("background", "red")
    })
  }

  const selectOptions = () => {
    resetGame();
    removeButtonAnimation()
    setNewGameStarted(false) // REMOVE TIMER FROM SCREEN
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
      if (result.isConfirmed) { // START USER
        basicOptions()
        shouldAIstart.current = false
        setShouldAIstartState(false)
        setTimeout(() => {
          startTimer()
          clickBlocked.current = false
        }, 4300) // SYNC WITH POP-UP CLOSES
      }
      else if (result.isDenied) { // START AI
        basicOptions()
        clickBlocked.current = true
        shouldAIstart.current = true
        setShouldAIstartState(true)
        setTimeout(() => {
          startTimer()
          AIAction()
        }, 4300) // SYNC WITH POP-UP CLOSES
      }
      else addButtonAnimation()
    })
  }

  const buttonNewGameHandler = () => {
    continueFlowPopUp.current = false // CANCEL WINNER POP-UP WHEN USER CLICK "NEW GAME" BUTTON
    removeButtonAnimation()
    if (newGameStarted) {
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
        if (result.isConfirmed) selectOptions() // CONFIRM NEW GAME
        // ELSE CONTINUE GAME === DO NOTHING
      })

    } else selectOptions() // WHEN NO CURRENT GAME
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

  console.log("rowsAndColumns", rowsAndColumns.current)

  return (
    <div className={`${css.background} ${com.noSelect}`}>
      <Button
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
          <div className={css.turn}>{ shouldAIstartState ? null : newGameStarted && userTurn && !gameEnd.current ? `TURN ` : null }</div>
          <div className={css.participantName}>You:</div>
          <div className={css.points}><div className={css.innerPoints}> {points.X} </div></div>
        </div>
        <div className={css.participant}>
          <div className={css.turn}>{ shouldAIstartState ? `TURN ` : newGameStarted && !userTurn && !gameEnd.current ? `TURN ` : null }</div>
          <div className={css.participantName}>AI:</div>
          <div className={css.points}><div className={css.innerPoints}> {points.O} </div></div>
        </div>
        <div className={css.finalWinner}>
          {
            gameEnd.current && winnerState === "X" ?
            `WINNER: YOU !` :
            gameEnd.current && winnerState === "O" ?
            `WINNER: AI !` :
            gameEnd.current && winnerState === "TIED" ?
            `TIED GAME !` :
            null
          }
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
      <div id={`rowsAndColumns`} className={css.rowsAndColumns}>
        {
          rowsAndColumns.current.map((e, index) => {
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
                { rowsAndColumns.current[index].value }
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default Main;