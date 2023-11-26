import css from './MainCSS.module.css';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from '@mui/material/';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import $ from 'jquery';
import { pointsI, highlighterI } from '../../interfaces/interfaces';

const Main = () => {

  const [ rowsAndColumns, setRowsAndColumns ] = useState<any[]>(Array.from({length: 9}, (e,i) => ({ id: i, value: '' })))
  const [ clickBlocked, setClickBlocked ] = useState(false)
  const [ points, setPoints ] = useState<pointsI>({ "X": 0, "O": 0 })
  let gameEnd = useRef(false)
  const [ gameEndState, setGameEndState ] = useState(false)
  let winner = useRef("")
  const [ winnerState, setWinnerState ] = useState("")
  const [ youTurn, setYouTurn ] = useState(true)
  let IAvalue = useRef(Math.floor(Math.random() * 9)) // BETWEEN 0 & 8

  const handleClick = async ({ target }: any) => {

    const userAction = async () => {
      let copyRowsAndColumns = [...rowsAndColumns]

      if (copyRowsAndColumns[target].value === "" && !clickBlocked && !gameEnd.current && youTurn) {
        setClickBlocked(true)
        rowsAndColumns[target].value = "X"
        setRowsAndColumns(copyRowsAndColumns)
        setYouTurn(false)
      }
    }

    const IAResponse = async () => {
      let copyRowsAndColumns = [...rowsAndColumns]

      if (copyRowsAndColumns.filter(e => e.value === '').length > 1) {

        if (copyRowsAndColumns[IAvalue.current].value === "") {
          copyRowsAndColumns[IAvalue.current].value = "O"
          setRowsAndColumns(copyRowsAndColumns)
          setClickBlocked(false)
          setYouTurn(true)
        } else {
          let success = false
          do {
            IAvalue.current = Math.floor(Math.random() * 9)
            if (copyRowsAndColumns[IAvalue.current].value === "") {
              copyRowsAndColumns[IAvalue.current].value = "O"
              setRowsAndColumns(copyRowsAndColumns)
              setClickBlocked(false)
              success = true
              setYouTurn(true)
            }
          } while (copyRowsAndColumns[IAvalue.current].value !== "" && success === false)
        }
      checkWinner()
      }
    }

    userAction()
    .then(() => {
      if (!clickBlocked && !gameEnd.current) checkWinner()
    })
    .then(() => {
      if (!clickBlocked && !gameEnd.current) {
        let randomTimes = [ 400, 500, 700, 800, 900 ]
        setTimeout(() => IAResponse(), randomTimes[Math.floor(Math.random() * 5)])
      }
    })
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
            `YOU WINS !` :
            winner.current !== "" && winner.current === "O" ?
            `IA WINS !` :
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
    setYouTurn(true)
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

  return (
    <div className={css.background}>
      <Button
        className={css.button}
        variant="outlined"
        sx={{ color: 'white', background: 'blue', '&:hover': { background: 'green' } }}
        onClick={() => resetGame() }
      >
        NEW GAME
      </Button>
      <div className={css.participants}>
        <div className={css.participant}>
          <div className={css.pointsTitle}>Points:</div>
        </div>
        <div className={css.participant}>
          <div className={css.turn}>{ youTurn && !gameEndState ? `TURN ` : null }</div>
          <div className={css.participantName}>You:</div>
          <div className={css.points}><div className={css.innerPoints}> {points.X} </div></div>
        </div>
        <div className={css.participant}>
          <div className={css.turn}>{ !youTurn && !gameEndState ? `TURN ` : null }</div>
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

      <div className={css.rowsAndColumns}>
        {
          rowsAndColumns.map((e, index) => {
            return (
              <div
                key={index}
                id={`${index}`}
                onClick={(e) => { handleClick({ target: index }) }}
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