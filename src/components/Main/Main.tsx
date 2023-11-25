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

  const checkWinner = async () => {
    let arr = [...rowsAndColumns]
    console.log("123 UPDATE")
    let rowTargets = [0,3,6]
    let columnsTargets = [0,1,2]
    //let diagonalTargets = [0,2]
    rowTargets.forEach(e => {
      if (arr.slice(e,e+3).every(e => e.value === 'X')) {
        console.log("123 X WINS !")
        //setGameEnd(true)
        gameEnd.current = true
        //winner.current = "X"
        winner.current = "X"
        setWinnerState("X")

        arr.slice(e,e+3).forEach(e => {
          $(`#${e.id}`)
            .css("background", "yellow")
        })
        
  
      }
      if (arr.slice(e,e+3).every(e => e.value === 'O')) {
        console.log("123 O WINS !")
        //setGameEnd(true)
        gameEnd.current = true
        winner.current = "O"
        setWinnerState("O")

        arr.slice(e,e+3).forEach(e => {
          $(`#${e.id}`)
            .css("background", "yellow")
        })

      }
    })

    columnsTargets.forEach((e, index) => {
      if ([arr[e],arr[e+3],arr[e+6]].every(e => e.value === 'X')) {
        console.log("123 X WINS !")
        //setGameEnd(true)
        gameEnd.current = true
        winner.current = "X"
        setWinnerState("X");

        [arr[e],arr[e+3],arr[e+6]].forEach(e => {
          $(`#${e.id}`)
            .css("background", "yellow")
        })
  
      }
      if ([arr[e],arr[e+3],arr[e+6]].every(e => e.value === 'O')) {
        console.log("123 O WINS !")
        //setGameEnd(true)
        gameEnd.current = true
        winner.current = "O"
        setWinnerState("O");

        [arr[e],arr[e+3],arr[e+6]].forEach(e => {
          $(`#${e.id}`)
            .css("background", "yellow")
        })


      }
    })

    
      if ([arr[0],arr[4],arr[8]].every(e => e.value === 'X')) {
        console.log("123 X WINS !")
        //setGameEnd(true)
        gameEnd.current = true
        winner.current = "X"
        setWinnerState("X");

        [arr[0],arr[4],arr[8]].forEach(e => {
          $(`#${e.id}`)
            .css("background", "yellow")
        })
        
        
  
      }
      if ([arr[0],arr[4],arr[8]].every(e => e.value === 'O')) {
        console.log("123 O WINS !")
        //setGameEnd(true)
        gameEnd.current = true
        winner.current = "O"
        setWinnerState("O");

        [arr[0],arr[4],arr[8]].forEach(e => {
          $(`#${e.id}`)
            .css("background", "yellow")
        })

      }

      if ([arr[2],arr[4],arr[6]].every(e => e.value === 'X')) {
        console.log("123 X WINS !")
        //setGameEnd(true)
        gameEnd.current = true
        winner.current = "X"
        setWinnerState("X");

        [arr[2],arr[4],arr[6]].forEach(e => {
          $(`#${e.id}`)
            .css("background", "yellow")
        })
  
      }
      if ([arr[2],arr[4],arr[6]].every(e => e.value === 'O')) {
        console.log("123 O WINS !")
        //setGameEnd(true)
        gameEnd.current = true
        winner.current = "O"
        setWinnerState("O");

        [arr[2],arr[4],arr[6]].forEach(e => {
          $(`#${e.id}`)
            .css("background", "yellow")
        })

      }

    //let copyRowsAndColumns = [...rowsAndColumns]
        if (arr.filter(e => e.value === '').length === 0 || gameEnd.current) {
          console.log("123 GAME END")
          setTimeout(() => {
            Swal.fire({
              title: winner.current !== "" ? `GAME END\n${winner.current} WINS !` : `GAME END\n TIED GAME`,
              icon: 'success',
              showConfirmButton: false,
              showDenyButton: false,
              showCancelButton: false,
              timer: 1500,
            })
          }, 500)
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