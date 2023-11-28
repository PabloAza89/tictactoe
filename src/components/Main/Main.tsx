import css from './MainCSS.module.css';
import com from '../../commons/commonsCSS.module.css';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from '@mui/material/';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import $ from 'jquery';
import { pointsI, highlighterI, handleClickI } from '../../interfaces/interfaces';

const Main = () => {

  const [ rowsAndColumns, setRowsAndColumns ] = useState<any[]>(Array.from({length: 9}, (e,i) => ({ id: i, value: '' })))
  let clickBlocked = useRef(false)
  const [ points, setPoints ] = useState<pointsI>({ "X": 0, "O": 0 })
  let gameEnd = useRef(false)
  const [ gameEndState, setGameEndState ] = useState(false)
  let winner = useRef("")
  const [ winnerState, setWinnerState ] = useState("")
  const [ userTurn, setUserTurn ] = useState(true)
  let shouldAIstart = useRef(false)
  const [ shouldAIstartState, setShouldAIstartState ] = useState(false)
  //const [ startUser, setStartUser ] = useState(false)
  const [ newGameStarted, setNewGameStarted ] = useState(false) 
  //const [ newGameStarted, setNewGameStarted ] = useState(true) // START IMMEDIATELY
  let newGameStartedRecently = useRef(false)
  let IAvalue = useRef(Math.floor(Math.random() * 9)) // BETWEEN 0 & 8

  const handleClick = async ({ target }: handleClickI) => {

    //console.log("123 TARGET", target)

    const userAction = async () => {
      let copyRowsAndColumns = [...rowsAndColumns]
      console.log("123", copyRowsAndColumns)

      if (target !== undefined && copyRowsAndColumns[target].value === "" && !clickBlocked.current && !gameEnd.current && userTurn) {
        console.log("123 USUARIO EJECUTO NORMALMENTE")
        //setClickBlocked(true)
        clickBlocked.current = true
        
        rowsAndColumns[target].value = "X"
        setRowsAndColumns(copyRowsAndColumns)
        setUserTurn(false)
      }
    }

    const IAResponse = async () => {
      let copyRowsAndColumns = [...rowsAndColumns]

      if (copyRowsAndColumns.filter(e => e.value === '').length >= 1) {
        console.log("123 entro AI 1")
        // if (copyRowsAndColumns[IAvalue.current].value === "") {
        //   copyRowsAndColumns[IAvalue.current].value = "O"
        //   setRowsAndColumns(copyRowsAndColumns)
        //   clickBlocked.current = false
        //   //setClickBlocked(false)
          
        //   setUserTurn(true)
        //   shouldAIstart.current = false
        //   setShouldAIstartState(false)

        // } else {
          console.log("123 entro AI 2")
          let success = false
          do {
            IAvalue.current = Math.floor(Math.random() * 9)
            if (copyRowsAndColumns[IAvalue.current].value === "") {
              copyRowsAndColumns[IAvalue.current].value = "O"
              setRowsAndColumns(copyRowsAndColumns)
              //setClickBlocked(false)
              clickBlocked.current = false
              success = true
              shouldAIstart.current = false
              setShouldAIstartState(false)
              setUserTurn(true)
            }
          } while (success === false)
          checkWinner()
        }
      //if (!gameEnd.current) checkWinner()
      //}
    }

    //if (startUser) {

    if (shouldAIstart.current) {
      let randomTimes = [ 700, 800, 900, 1000, 1100 ]
        setTimeout(() => {
          //let randomTimes = [ 700, 800, 900, 1000, 1100 ]
          //setTimeout(() => IAResponse(), randomTimes[Math.floor(Math.random() * 5)])
          IAResponse()
        }, 4300 + randomTimes[Math.floor(Math.random() * 5)])
    } else if (!clickBlocked.current) {
      shouldAIstart.current = false
      userAction()
      .then(() => {
        //console.log("123 valor de clickBlocked antes", clickBlocked)
        //if (!clickBlocked.current && !gameEnd.current) checkWinner()
        //if (!clickBlocked.current && !gameEnd.current) checkWinner()
        checkWinner()
      })
      .then(() => {
        //if (!gameEnd.current) checkWinner()
        console.log("123 valor de clickBlocked", clickBlocked)
        if (clickBlocked.current && !gameEnd.current) {
          //console.log("123 entro aca 1?")
          console.log("123 SE EJECUTO IA")
         
            console.log("123 entro aca 3")
            let randomTimes = [ 700, 800, 900, 1000, 1100 ]
            setTimeout(() => IAResponse(), randomTimes[Math.floor(Math.random() * 5)])
          
          // checkWinner()
        }
       // if (!gameEnd.current) checkWinner()
      })

    }





  }

  const highlighter = async ({ array, letter }: highlighterI) => {
    actionPoints = actionPoints + 100
    clickBlocked.current = true
    //stopTimer()
    gameEnd.current = true
    setGameEndState(true)
    //setGameEndState(true)
    // setGameEndState(true)


    
    setTimeout(() => {
      //gameEnd.current = true
      //setGameEndState(true)
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
        setWinnerState(`${letter}`) // APPEARS WHEN POP-UP
      }, 300)
    }, 1200)
  }

  let actionPoints: number = 0

  const checkWinner = async () => {
    let arr = [...rowsAndColumns]
    let rowTargets = [0,3,6]
    let columnsTargets = [0,1,2]
    //let diagonalTargets = [0,2]
    rowTargets.forEach(e => {
      if (arr.slice(e,e+3).every(e => e.value === 'X')) highlighter({ array: arr.slice(e,e+3), letter: "X" })
      if (arr.slice(e,e+3).every(e => e.value === 'O')) highlighter({ array: arr.slice(e,e+3), letter: "O" })
    })

    columnsTargets.forEach((e, index) => {
      if ([arr[e],arr[e+3],arr[e+6]].every(e => e.value === 'X')) highlighter({ array: [arr[e],arr[e+3],arr[e+6]], letter: "X" })
      if ([arr[e],arr[e+3],arr[e+6]].every(e => e.value === 'O')) highlighter({ array: [arr[e],arr[e+3],arr[e+6]], letter: "O" })
    })

    if ([arr[0],arr[4],arr[8]].every(e => e.value === 'X')) highlighter({ array: [arr[0],arr[4],arr[8]], letter: "X" })
    if ([arr[0],arr[4],arr[8]].every(e => e.value === 'O')) highlighter({ array: [arr[0],arr[4],arr[8]], letter: "O" })
    if ([arr[2],arr[4],arr[6]].every(e => e.value === 'X')) highlighter({ array: [arr[2],arr[4],arr[6]], letter: "X" })
    if ([arr[2],arr[4],arr[6]].every(e => e.value === 'O')) highlighter({ array: [arr[2],arr[4],arr[6]], letter: "O" })

    if (arr.filter(e => e.value === '').length === 0 || gameEnd.current) {
      setGameEndState(true)
      stopTimer()

      // $(`#timerBox`)
      //   .addClass(`${css.changeColor}`)

      //stopTimer()
      //stopTimer()
      setTimeout(() => {
        Swal.fire({
          title:
            winner.current !== "" && winner.current === "X" ?
            `YOU WIN !` :
            winner.current !== "" && winner.current === "O" ?
            `IA WIN !` :
            `TIED GAME`,
          text:
            actionPoints === 100 ?
            `+100 Points` :
            actionPoints === 200 ?
            `+200 Points !! Supperrrb !!!` :
            `no winner, no points.`,
          icon: 'success',
          showConfirmButton: false,
          showDenyButton: false,
          showCancelButton: false,
          timer: 2000,
        })

        setTimeout(() => {
          if (!(winner.current !== "" && winner.current === "X") && !(winner.current !== "" && winner.current === "O")) {
            setWinnerState("TIED")
          }
        }, 1200)

      }, 1200)

      setTimeout(() => {
        $(`#timerBox`)
          .addClass(`${css.changeColor}`)
      }, 3200)

    }
  }

  const resetGame = () => {

    resetTimer()
    setPoints({ "X": 0, "O": 0 })
    $(`#buttonStart`)
      .removeClass(`${css.shakeAnimation}`);
    $(`#timerBox`)
      .removeClass(`${css.changeColor}`)
    setNewGameStarted(false)
    setRowsAndColumns(Array.from({length: 9}, (e,i) => ({ id: i, value: '' })))
    gameEnd.current = false;
    setGameEndState(false)
    setUserTurn(true)
    winner.current = "";
    setWinnerState("")
    actionPoints = 0;
    //setClickBlocked(false)
    //clickBlocked.current = false
    IAvalue.current = Math.floor(Math.random() * 9) // BETWEEN 0 & 8
    rowsAndColumns.forEach(e => {
      $(`#${e.id}`)
      .css("background", "red")
    })
  }

  const selectOptions = () => {
    $(`#buttonStart`)
      .removeClass(`${css.shakeAnimation}`);

    Swal.fire({
      title: `WELCOME TO TIC-TAC-TOE !`,
      text: 'Please, select who start first..',
      //icon: 'info',
      showDenyButton: true,
      confirmButtonText: 'LET ME START !',
      denyButtonText: `    IA STARTS !   `,
      confirmButtonColor: '#800080', // LEFT OPTION
      denyButtonColor: '#008000', // RIGHT OPTION
    })
    .then((result) => {
      if (result.isConfirmed) { // START USER
        startsIn()
        console.log("CONFIRMED")
        //setStartUser(true)
        setNewGameStarted(true)
        shouldAIstart.current = false
        setShouldAIstartState(false)
        clickBlocked.current = false
        //clickBlocked.current = false
        //setClickBlocked(false)
        //newGameStartedRecently.current = true
        //startTimer()
        $(`#buttonStart`)
          .removeClass(`${css.shakeAnimation}`);
        setTimeout(() => {
          startTimer()
        }, 4300) // SYNC WITH POP-UP CLOSES
      }
      else if (result.isDenied) { // START AI
        startsIn()
        console.log("REJECTED")
        //setStartUser(false)
        setNewGameStarted(true)
        shouldAIstart.current = true
        clickBlocked.current = true
        setShouldAIstartState(true)
        //clickBlocked.current = true
        //setClickBlocked(true)
        //newGameStartedRecently.current = true
        //startTimer()
        $(`#buttonStart`)
          .removeClass(`${css.shakeAnimation}`);
        setTimeout(() => {
          startTimer()
        }, 4300) // SYNC WITH POP-UP CLOSES
      }
      else {
        console.log("OTHER")
        $(`#buttonStart`)
          .addClass(`${css.shakeAnimation}`)
      }
    })

  }

  const buttonHandler = () => {

    // $(`#buttonStart`)
    //   .removeClass(`${css.shakeAnimation}`);

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
        if (result.isConfirmed) {
          //setNewGameStartedRecently(true)
          resetGame()
          selectOptions()
          // $(`#buttonStart`)
          //   .removeClass(`${css.shakeAnimation}`);
        }
      })

    } else {
      selectOptions()
    }
  }

  useEffect(() => {
    console.log("EXECUTED IA")
    if (shouldAIstart.current && newGameStarted) {
      console.log("123 EXECUTED INNER IA")
      handleClick({})
      //clickBlocked.current = true
    }
  //},[newGameStarted,shouldAIstart.current])
  },[newGameStarted])

  $(function() {
    if (!newGameStarted && !newGameStartedRecently.current) {
      $(`#buttonStart`)
        .addClass(`${css.shakeAnimation}`)
    } else {
      $(`#buttonStart`)
        .removeClass(`${css.shakeAnimation}`);
    }
  })

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
    console.log("PAUSED VALUE", paused.current)
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

    let miliseconds = document.getElementById('s_ms')
    if (miliseconds !== null) miliseconds.textContent = format(value, 1, 1000, 3);
    let seconds = document.getElementById('s_seconds')
    if (seconds !== null) seconds.textContent = format(value, 1000, 60, 2);
    let minutes = document.getElementById('s_minutes')
    if (minutes !== null) minutes.textContent = format(value, 60000, 60, 2);

    if(!paused.current) requestAnimationFrame(render);
  }

  // startTimer() //
  // stopTimer() //
  // resetTimer() //

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


  return (
    <div className={`${css.background} ${com.noSelect}`}>
      <Button
        id={`buttonStart`}
        className={css.button}
        variant="outlined"
        sx={{ color: 'white', background: 'blue', '&:hover': { background: 'green' } }}
        //onClick={() => resetGame() }
        onClick={() => { buttonHandler() } }
      >
        NEW GAME
      </Button>
      <div className={css.participants}>
        <div className={css.participant}>
          <div className={css.pointsTitle}>Points:</div>
        </div>
        <div className={css.participant}>
          <div className={css.turn}>{ shouldAIstartState ? null : newGameStarted && userTurn && !gameEndState ? `TURN ` : null }</div>
          <div className={css.participantName}>You:</div>
          <div className={css.points}><div className={css.innerPoints}> {points.X} </div></div>
        </div>
        <div className={css.participant}>
          <div className={css.turn}>{ shouldAIstartState ? `TURN ` : newGameStarted && !userTurn && !gameEndState ? `TURN ` : null }</div>
          <div className={css.participantName}>IA:</div>
          <div className={css.points}><div className={css.innerPoints}> {points.O} </div></div>
        </div>
        <div className={css.finalWinner}>
          {
            winner.current !== "" && winnerState === "X" ?
            `WINNER: YOU !` :
            winner.current !== "" && winnerState === "O" ?
            `WINNER: IA !` :
            winner.current === "" && winnerState === "TIED" ?
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
          <div id={`s_minutes`} className={css.eachTime}>00</div>:
          <div id={`s_seconds`} className={css.eachTime}>00</div>
          <div className={css.smallerMili}>:</div>
          <div id={`s_ms`} className={`${css.smallerMili} ${css.eachTimeMini}`}>000</div>
        </div>
      </div >

      

      <div id={`rowsAndColumns`} className={css.rowsAndColumns}>
        {
          rowsAndColumns.map((e, index) => {
            return (
              <div
                key={index}
                id={`${index}`}
                onClick={(e) => {
                  if (newGameStarted) {
                    handleClick({ target: index })
                  }

                }}
                className={css.eachBox}
              >
                { rowsAndColumns[index].value }
              </div>
            )
          })
        }
      </div>

      <Button
        id={`buttonStart`}
        className={css.button}
        variant="outlined"
        onClick={() => { console.log("clicked") } }
      >
        TEST
      </Button>


    </div>
  );
}

export default Main;