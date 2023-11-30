import css from './MainCSS.module.css';
import com from '../../commons/commonsCSS.module.css';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from '@mui/material/';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import $ from 'jquery';
import { pointsI, highlighterI, handleSequenceI } from '../../interfaces/interfaces';

const Main = () => {

  //let [ rowsAndColumns, setRowsAndColumns ] = useState<any[]>(Array.from({length: 9}, (e,i) => ({ id: i, value: '' })))

  let rowsAndColumns = useRef<any[]>(Array.from({length: 9}, (e,i) => ({ id: i, value: '' })))
  let clickBlocked = useRef(true)
  let gridBlocked = useRef(true)
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
  let AIRandomGridIndex = useRef(Math.floor(Math.random() * 9)) // BETWEEN 0 & 8

  const AIAction = async () => {
    //clickBlocked.current = true
    //let copyRowsAndColumns = [...rowsAndColumns]

    let randomTimes = [ 700, 800, 900, 1000, 1100 ]
    //const abc = async () => {
      setTimeout(() => {
        if (rowsAndColumns.current.filter((e: any) => e.value === '').length >= 1) {
          //console.log("123 entro AI 2")
          let success = false
          do {
            AIRandomGridIndex.current = Math.floor(Math.random() * 9)
            if (rowsAndColumns.current[AIRandomGridIndex.current].value === "") {
              rowsAndColumns.current[AIRandomGridIndex.current].value = "O"
              //setRowsAndColumns(rowsAndColumns)
              //setClickBlocked(false)
              console.log("delay", AIRandomGridIndex.current)
              success = true
              shouldAIstart.current = false
              setShouldAIstartState(false)
              setUserTurn(true)
              console.log("while 1ro")
            }
          } while (success === false)
        }
        console.log("while 2do")
        checkWinner()
      }, randomTimes[Math.floor(Math.random() * 5)])
   // }

    // console.log("while 2do")
    //           checkWinner()

    //  abc().then(() => {
    //           console.log("while 2do")
    //           checkWinner()
    //         })


    // setTimeout(() => {
    //   console.log("while 2do")
    // }, 0)
   

  }

    const userAction = async ( target: any) => {
      //let copyRowsAndColumns = [...rowsAndColumns.current]
      //let copyRowsAndColumns = [...rowsAndColumns]
      //console.log("123", copyRowsAndColumns)

      //if (target !== undefined && copyRowsAndColumns[target].value === "" && !clickBlocked.current && !gameEnd.current && userTurn) {
      if (target !== undefined && rowsAndColumns.current[target].value === "") {
        //console.log("123 USUARIO EJECUTO NORMALMENTE")
        //setClickBlocked(true)
        
        rowsAndColumns.current[target].value = "X"
        //setRowsAndColumns(rowsAndColumns)
        setUserTurn(false)
        clickBlocked.current = true
      }
    }

  const handleSequence = async ({ target }: handleSequenceI) => {

    //else if (!clickBlocked.current) {
      shouldAIstart.current = false
      userAction(target)
      .then(() => {
        //let arr = [...rowsAndColumns]
        checkWinner()
        //.then(async() => checkWinner())
      })
      .then(() => {
        console.log("se ejecuta then de AIAction")
      
        if (!gameEnd.current) {
          
            AIAction()
            
            //console.log("123 primero este")
          
        }
     
        
      })
      //  .then(() => {
      //   console.log("se ejecuta then de checkWinner")
      //     // if (winner.current === '' && !gameEnd.current) {
      //     //   clickBlocked.current = false
      //     //   gridBlocked.current = false
      //     // }
      //     //let arr = [...rowsAndColumns]
      //     if (!gameEnd.current) {
      //       setTimeout(() => {
      //         checkWinner()
      //         console.log("123 primero este")
      //       }, AIRandomGridIndex.current + 1000)
      //     }
      //   })
     
      
   // }
  }

  const highlighter = async ({ array, letter }: highlighterI) => {
    actionPoints = actionPoints + 100
    clickBlocked.current = true
    gameEnd.current = true
    setGameEndState(true)
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
        setWinnerState(`${letter}`) // APPEARS WHEN POP-UP
      }, 300)
    }, 1200)
  }

  let actionPoints: number = 0
  

  const checkWinner = () => {
    //shouldAIstart.current = false
    //let arr = [...rowsAndColumns]
    //let arr: any[]

    // if (newGameStarted) arr =  [...rowsAndColumns]
    // else arr =  [...rowsAndColumns]
    
    //console.log("arr inner", arr)
    console.log("arr inner", rowsAndColumns.current)
    
    //let arr = rowsAndColumns
    
    let rowTargets = [0,3,6]
    let columnsTargets = [0,1,2]
    //let diagonalTargets = [0,2]
    rowTargets.forEach(e => { // ROW
      if (rowsAndColumns.current.slice(e,e+3).every(e => e.value === 'X')) {
        console.log("winner here 1")
        highlighter({ array: rowsAndColumns.current.slice(e,e+3), letter: "X" })
        
      }
      if (rowsAndColumns.current.slice(e,e+3).every(e => e.value === 'O')) {
        console.log("winner here 2")
        highlighter({ array: rowsAndColumns.current.slice(e,e+3), letter: "O" })
        
      }
    })

    columnsTargets.forEach((e, index) => { // COLUMN
      if ([rowsAndColumns.current[e],rowsAndColumns.current[e+3],rowsAndColumns.current[e+6]].every(e => e.value === 'X')) {
        console.log("winner here 3")
        highlighter({ array: [rowsAndColumns.current[e],rowsAndColumns.current[e+3],rowsAndColumns.current[e+6]], letter: "X" })
        
      }
      if ([rowsAndColumns.current[e],rowsAndColumns.current[e+3],rowsAndColumns.current[e+6]].every(e => e.value === 'O')) {
        console.log("winner here 4")
        highlighter({ array: [rowsAndColumns.current[e],rowsAndColumns.current[e+3],rowsAndColumns.current[e+6]], letter: "O" })
        
      }
    })

    if ([rowsAndColumns.current[0],rowsAndColumns.current[4],rowsAndColumns.current[8]].every(e => e.value === 'X')) { // DIAGONAL
      console.log("winner here 5")
      highlighter({ array: [rowsAndColumns.current[0],rowsAndColumns.current[4],rowsAndColumns.current[8]], letter: "X" })
      
    }
    if ([rowsAndColumns.current[0],rowsAndColumns.current[4],rowsAndColumns.current[8]].every(e => e.value === 'O')) {
      console.log("winner here 6")
      highlighter({ array: [rowsAndColumns.current[0],rowsAndColumns.current[4],rowsAndColumns.current[8]], letter: "O" })
      
    }
    if ([rowsAndColumns.current[2],rowsAndColumns.current[4],rowsAndColumns.current[6]].every(e => e.value === 'X')) {
      console.log("winner here 7")
      highlighter({ array: [rowsAndColumns.current[2],rowsAndColumns.current[4],rowsAndColumns.current[6]], letter: "X" })
      
    }
    if ([rowsAndColumns.current[2],rowsAndColumns.current[4],rowsAndColumns.current[6]].every(e => e.value === 'O')) {
      console.log("winner here 8")
      highlighter({ array: [rowsAndColumns.current[2],rowsAndColumns.current[4],rowsAndColumns.current[6]], letter: "O" })
      
    }

    if (rowsAndColumns.current.filter(e => e.value === '').length === 0) gameEnd.current = true // STOP GAME WHEN NO MORE STEPS AVAILABLE

    //if (rowsAndColumns.current.filter(e => e.value === '').length === 0 || gameEnd.current) {
    if (gameEnd.current) {
      setGameEndState(true)
      stopTimer()

      setTimeout(() => {
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
          if (!(winner.current !== "" && winner.current === "X") && !(winner.current !== "" && winner.current === "O")) {
            setWinnerState("TIED")
            clickBlocked.current = true
          }
        }, 1200)

      }, 1200)

      setTimeout(() => {
        //if (gameEnd.current) {
          $(`#timerBox`)
            .addClass(`${css.changeColor}`)
        //}
          

      }, 3200)

    } 
    // else {
    //   gridBlocked.current = false
    //   clickBlocked.current = false
    // }

  }

  function resetGame() {

    stopTimer()
    resetTimer()
    //let qq = Array.from({length: 9}, (e,i) => ({ id: i, value: '' }))
    // setRowsAndColumns([
    //   { id: 0, value: '' }, { id: 1, value: '' }, { id: 2, value: '' },
    //   { id: 3, value: '' }, { id: 4, value: '' }, { id: 5, value: '' },
    //   { id: 6, value: '' }, { id: 7, value: '' }, { id: 8, value: '' }
    // ])
    //setRowsAndColumns(Array.from({length: 9}, (e,i) => ({ id: i, value: '' })))
    rowsAndColumns.current = Array.from({length: 9}, (e,i) => ({ id: i, value: '' }))
    clickBlocked.current = true
    setPoints({ "X": 0, "O": 0 });
    actionPoints = 0;
    gameEnd.current = false;
    setGameEndState(false)
    winner.current = ""
    setWinnerState("")
    setUserTurn(true)
    //shouldAIstart.current = false;
    

    $(`#buttonStart`)
      .removeClass(`${css.shakeAnimation}`);
    $(`#timerBox`)
      .removeClass(`${css.changeColor}`);
    //setNewGameStarted(false)
    
    
    
    
    
    
    actionPoints = 0;
    AIRandomGridIndex.current = Math.floor(Math.random() * 9) // BETWEEN 0 & 8
    rowsAndColumns.current.forEach(e => {
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
      denyButtonText: `    AI STARTS !   `,
      confirmButtonColor: '#800080', // LEFT OPTION
      denyButtonColor: '#008000', // RIGHT OPTION
    })
    .then((result) => {
      //setRowsAndColumns(Array.from({length: 9}, (e,i) => ({ id: i, value: '' })))
      //resetGame()
      if (result.isConfirmed) { // START USER
        //resetGame()
        startsIn()
        //setRowsAndColumns(Array.from({length: 9}, (e,i) => ({ id: i, value: '' })))
        //console.log("CONFIRMED")
        setNewGameStarted(true)
        setShouldAIstartState(false)
        shouldAIstart.current = false
        $(`#buttonStart`)
          .removeClass(`${css.shakeAnimation}`);
        setTimeout(() => {
          startTimer()
          clickBlocked.current = false
          gridBlocked.current = false
        }, 4300) // SYNC WITH POP-UP CLOSES
      }
      else if (result.isDenied) { // START AI
        //handleSequence({})
        //resetGame()
        //resetGame()
        startsIn()
        
        //console.log("REJECTED")
        setNewGameStarted(true)
        shouldAIstart.current = true
        clickBlocked.current = true
        setShouldAIstartState(true)
        $(`#buttonStart`)
          .removeClass(`${css.shakeAnimation}`);
        setTimeout(() => {
          startTimer()
          //handleSequence({})
          AIAction()
        }, 4300) // SYNC WITH POP-UP CLOSES
      }
      else {
        //console.log("OTHER")
        $(`#buttonStart`)
          .addClass(`${css.shakeAnimation}`)
      }
    })

  }

  const buttonNewGameHandler = () => {

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
          resetGame()
          selectOptions()
        }
      })

    } else {
      resetGame()
      selectOptions()
    }
  }

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
    //console.log("PAUSED VALUE", paused.current)
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

  //console.log("rowsAndColumns", rowsAndColumns.current)
  console.log("rowsAndColumns", rowsAndColumns.current)
  //console.log(JSON.stringify(rowsAndColumns.current, null, 4))

  return (
    <div className={`${css.background} ${com.noSelect}`}>
      <Button
        id={`buttonStart`}
        className={css.button}
        variant="outlined"
        sx={{ color: 'white', background: 'blue', '&:hover': { background: 'green' } }}
        //onClick={() => resetGame() }
        onClick={() => { 
          //if (!gridBlocked.current) {
            buttonNewGameHandler()
          //}
            
        } }
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
          <div className={css.participantName}>AI:</div>
          <div className={css.points}><div className={css.innerPoints}> {points.O} </div></div>
        </div>
        <div className={css.finalWinner}>
          {
            winner.current !== "" && winnerState === "X" ?
            `WINNER: YOU !` :
            winner.current !== "" && winnerState === "O" ?
            `WINNER: AI !` :
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
          rowsAndColumns.current.map((e, index) => {
            return (
              <div
                key={index}
                id={`${index}`}
                onClick={(e) => {
                  //if (newGameStarted && !clickBlocked.current) {
                    handleSequence({ target: index })
                  //}

                }}
                className={css.eachBox}
              >
                { rowsAndColumns.current[index].value }
              </div>
            )
          })
        }
      </div>

      <Button
        id={`buttonStart`}
        className={css.button}
        variant="outlined"
        //onClick={() => { console.log("clicked") } }
      >
        TEST
      </Button>


    </div>
  );
}

export default Main;