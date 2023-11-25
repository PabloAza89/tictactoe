import css from './MainCSS.module.css';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from '@mui/material/';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import $ from 'jquery';

const Main = () => {

  const [ rowsAndColumns, setRowsAndColumns ] = useState<any[]>(Array.from({length: 9}, (e,i) => ({ id: i, value: '' })))

  Array.from({length: 9}, (e,i) => ({ value: ''}))

  const [ clickBlocked, setClickBlocked ] = useState(false)
  //const [ gameEnd, setGameEnd ] = useState(false)
  let gameEnd = useRef(false)
  let winner = useRef("")
  const [ winnerState, setWinnerState ] = useState("")

  let IAvalue = useRef(Math.floor(Math.random() * 9)) // BETWEEN 0 & 8


  const handleClick = async ({ target }: any) => {

    const userAction = async () => {
      let copyRowsAndColumns = [...rowsAndColumns]

      if (copyRowsAndColumns[target].value === "" && !clickBlocked && !gameEnd.current) {
        setClickBlocked(true)
        rowsAndColumns[target].value = "X"
        setRowsAndColumns(copyRowsAndColumns)
      }

      //console.log("123 filter(e => e.value === '').length", copyRowsAndColumns.filter(e => e.value === '').length)
    }

    const IAResponse = async () => {
    
     
     
   
     /* BEGIN RANDOM IA SECTION */

     let copyRowsAndColumns = [...rowsAndColumns]

   if (copyRowsAndColumns.filter(e => e.value === '').length > 1) {
       
     if (copyRowsAndColumns[IAvalue.current].value === "") {        
         copyRowsAndColumns[IAvalue.current].value = "O"
         setRowsAndColumns(copyRowsAndColumns)
         //setClickBlocked(false)
         
     } else {
       let success = false
       do {
         IAvalue.current = Math.floor(Math.random() * 9)
         if (copyRowsAndColumns[IAvalue.current].value === "") {                
               copyRowsAndColumns[IAvalue.current].value = "O"
               setRowsAndColumns(copyRowsAndColumns)
               //setClickBlocked(false)
           success = true
         }
       } while (copyRowsAndColumns[IAvalue.current].value !== "" && success === false)
     }

     setClickBlocked(false)
     checkWinner()
   
   } //

 /* END RANDOM IA SECTION */

 // console.log("123 actual", rowsAndColumns)

 }




  userAction()
  .then(() => { if (!clickBlocked && !gameEnd.current) { checkWinner() }})
  .then(() =>
    {  
      if (!clickBlocked && !gameEnd.current) {
        let randomTimes = [ 400, 500, 700, 800, 900 ]
        setTimeout(() => {  IAResponse()  }, randomTimes[Math.floor(Math.random() * 4)])

        
      }   

      
      
    }
  )//.then(() => checkWinner())


  
}

  interface highlighterI {
    array: any[], 
    letter: string
  }

  const highlighter = async ({ array, letter }: highlighterI) => {
    gameEnd.current = true
    winner.current = `${letter}`
    setWinnerState(`${letter}`)

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
  }

  const checkWinner = async () => {
    let arr = [...rowsAndColumns]
    console.log("123 UPDATE")
    let rowTargets = [0,3,6]
    let columnsTargets = [0,1,2]
    //let diagonalTargets = [0,2]
    rowTargets.forEach(e => {
      if (arr.slice(e,e+3).every(e => e.value === 'X')) {
        highlighter({ array: arr.slice(e,e+3), letter: "X" })
      }
      if (arr.slice(e,e+3).every(e => e.value === 'O')) {
        highlighter({ array: arr.slice(e,e+3), letter: "O" })
      }
    })

    columnsTargets.forEach((e, index) => {
      if ([arr[e],arr[e+3],arr[e+6]].every(e => e.value === 'X')) {
        
        highlighter({ array: [arr[e],arr[e+3],arr[e+6]], letter: "X" })
      }
      if ([arr[e],arr[e+3],arr[e+6]].every(e => e.value === 'O')) {
        highlighter({ array: [arr[e],arr[e+3],arr[e+6]], letter: "O" })   
      }
    })

    
      if ([arr[0],arr[4],arr[8]].every(e => e.value === 'X')) {
        highlighter({ array: [arr[0],arr[4],arr[8]], letter: "X" })
      }
      if ([arr[0],arr[4],arr[8]].every(e => e.value === 'O')) {
        highlighter({ array: [arr[0],arr[4],arr[8]], letter: "O" })
      }

      if ([arr[2],arr[4],arr[6]].every(e => e.value === 'X')) {
        highlighter({ array: [arr[2],arr[4],arr[6]], letter: "X" })
      }
      if ([arr[2],arr[4],arr[6]].every(e => e.value === 'O')) {
       
        highlighter({ array: [arr[2],arr[4],arr[6]], letter: "O" })

      }

    //let copyRowsAndColumns = [...rowsAndColumns]
        if (arr.filter(e => e.value === '').length === 0 || gameEnd.current) {
          console.log("123 GAME END")
          setTimeout(() => {
            Swal.fire({
              title: winner.current !== "" ? `${winner.current} WINS !` : `TIED GAME`,
              icon: 'success',
              showConfirmButton: false,
              showDenyButton: false,
              showCancelButton: false,
              timer: 1000,
            })
          }, 1200)
        }
  }
  

  return (
    <div className={css.background}>
      <Button
        variant="outlined"
        sx={{ color: 'white', background: 'blue', '&:hover': { background: 'green' } }}
        onClick={() => {
          setRowsAndColumns(Array.from({length: 9}, (e,i) => ({ id: i, value: '' })));
          gameEnd.current = false;
          winner.current = "";
          setWinnerState("")
          setClickBlocked(false)
          rowsAndColumns.forEach(e => {
            $(`#${e.id}`)
            .css("background", "red")
          })


        }}
      >
        NEW GAME
      </Button>
      <div className={css.participants}>
        <div>You: X</div>
        <div>IA: O</div>
      </div>
      <div className={css.participants}>
        { winner.current !== "" ? `WINNER: ${winnerState}` : null}
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