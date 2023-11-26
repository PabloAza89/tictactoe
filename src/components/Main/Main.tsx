import css from './MainCSS.module.css';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from '@mui/material/';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import $ from 'jquery';
import { pointsI, highlighterI, handleClickI } from '../../interfaces/interfaces';

const Main = () => {

  const [ rowsAndColumns, setRowsAndColumns ] = useState<any[]>(Array.from({length: 9}, (e,i) => ({ id: i, value: '' })))
  const [ clickBlocked, setClickBlocked ] = useState(false)
  const [ points, setPoints ] = useState<pointsI>({ "X": 0, "O": 0 })
  let gameEnd = useRef(false)
  const [ gameEndState, setGameEndState ] = useState(false)
  let winner = useRef("")
  const [ winnerState, setWinnerState ] = useState("")
  const [ userTurn, setUserTurn ] = useState(true)
  //const [ startUser, setStartUser ] = useState(true)
  const [ startUser, setStartUser ] = useState(false)
  const [ newGameStarted, setNewGameStarted ] = useState(false)
  let IAvalue = useRef(Math.floor(Math.random() * 9)) // BETWEEN 0 & 8

  const handleClick = async ({ target }: handleClickI) => {

    console.log("123 TARGET", target)

    const userAction = async () => {
      let copyRowsAndColumns = [...rowsAndColumns]

      if (target !== undefined && copyRowsAndColumns[target].value === "" && !clickBlocked && !gameEnd.current && userTurn) {
        setClickBlocked(true)
        rowsAndColumns[target].value = "X"
        setRowsAndColumns(copyRowsAndColumns)
        setUserTurn(false)
      }
    }

    const IAResponse = async () => {
      let copyRowsAndColumns = [...rowsAndColumns]

      if (copyRowsAndColumns.filter(e => e.value === '').length > 1) {

        if (copyRowsAndColumns[IAvalue.current].value === "") {
          copyRowsAndColumns[IAvalue.current].value = "O"
          setRowsAndColumns(copyRowsAndColumns)
          setClickBlocked(false)
          setUserTurn(true)
        } else {
          let success = false
          do {
            IAvalue.current = Math.floor(Math.random() * 9)
            if (copyRowsAndColumns[IAvalue.current].value === "") {
              copyRowsAndColumns[IAvalue.current].value = "O"
              setRowsAndColumns(copyRowsAndColumns)
              setClickBlocked(false)
              success = true
              setUserTurn(true)
            }
          } while (copyRowsAndColumns[IAvalue.current].value !== "" && success === false)
        }
      checkWinner()
      }
    }

    //if (startUser) {
      userAction()
      .then(() => {
        if (!clickBlocked && !gameEnd.current) checkWinner()
      })
      .then(() => {
        if (!clickBlocked && !gameEnd.current) {
          let randomTimes = [ 700, 800, 900, 1000, 1100 ]
          setTimeout(() => IAResponse(), randomTimes[Math.floor(Math.random() * 5)])
        }
      })
    // } else {
    //   IAResponse()
    // }
      



  }

  const highlighter = async ({ array, letter }: highlighterI) => {
    actionPoints = actionPoints + 100
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
    }
  }

  const resetGame = () => {
    setRowsAndColumns(Array.from({length: 9}, (e,i) => ({ id: i, value: '' })))
    gameEnd.current = false;
    setGameEndState(false)
    setUserTurn(true)
    winner.current = "";
    setWinnerState("")
    actionPoints = 0;
    setClickBlocked(false)
    IAvalue.current = Math.floor(Math.random() * 9) // BETWEEN 0 & 8
    rowsAndColumns.forEach(e => {
      $(`#${e.id}`)
      .css("background", "red")
    })
  }

  const selectOptions = () => {
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
      if (result.isConfirmed) {
        console.log("CONFIRMED")
        setStartUser(true)
        setNewGameStarted(true)
      }
      if (result.isDenied) {
        console.log("REJECTED")
        setStartUser(false)
        setNewGameStarted(true)
      }
      
      //else { console.log("REJECTED") }
    })  
  }

  useEffect(() => {
    console.log("EXECUTED IA")
    if (!startUser && newGameStarted) {
      console.log("EXECUTED INNER IA")
      handleClick({})
    }
  },[newGameStarted, !startUser])

  // $.keyframe.define([{
  //   name: 'myfirst',
  //   '0%':   {top:"0px"},
  //   '50%': {top:$("#testcontainer").innerHeight() + "px"},
  //   '100%': {top:"0px"}
  // }]);

  $(function() {
    $(`#rowsAndColumns`)
      .on("mouseenter", function() {
        $(`#buttonStart`)
          //.addClass(`${css.animation}`);
          .addClass(`${css.shakeAnimation}`);
          // .css(`animation-name`,`shakeLTR`)
          // .css(`animation-duration`,`2.5s`)
          // .css(`animation-iteration-count`,`infinite`)
          console.log("hover")
      })
      .on("mouseleave", function() {
        $(`#buttonStart`)
          .removeClass(`${css.shakeAnimation}`);
          // .stop()
          // .css(`animationName`,`none`)
          // .css(`animationDuration`,`0s`)
          // .css(`animationIterationCount`,`none`)
          console.log("leave")
      })

  })
    
  

  return (
    <div className={css.background}>
      <Button
        id={`buttonStart`}
        className={css.button}
        variant="outlined"
        sx={{ color: 'white', background: 'blue', '&:hover': { background: 'green' } }}
        //onClick={() => resetGame() }
        onClick={() => selectOptions() }
      >
        NEW GAME
      </Button>
      <div className={css.participants}>
        <div className={css.participant}>
          <div className={css.pointsTitle}>Points:</div>
        </div>
        <div className={css.participant}>
          <div className={css.turn}>{ newGameStarted && userTurn && !gameEndState ? `TURN ` : null }</div>
          <div className={css.participantName}>You:</div>
          <div className={css.points}><div className={css.innerPoints}> {points.X} </div></div>
        </div>
        <div className={css.participant}>
          <div className={css.turn}>{ newGameStarted && !userTurn && !gameEndState ? `TURN ` : null }</div>
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
      </div>

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
    </div>
  );
}

export default Main;