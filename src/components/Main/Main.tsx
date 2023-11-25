import css from './MainCSS.module.css';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from '@mui/material/';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const Main = () => {

  const [ rowsAndColumns, setRowsAndColumns ] = useState<any[]>(
    [
      {checked: false, value: ''}, {checked: false, value: ''}, {checked: false, value: ''},
      {checked: false, value: ''}, {checked: false, value: ''}, {checked: false, value: ''},
      {checked: false, value: ''}, {checked: false, value: ''}, {checked: false, value: ''}
    ]
  )

  const [ clickBlocked, setClickBlocked ] = useState(false)
  //const [ gameEnd, setGameEnd ] = useState(false)
  let gameEnd = useRef(false)
  let winner = useRef("")

  let IAvalue = useRef(Math.floor(Math.random() * 9))


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
  .then(() => checkWinner())
  .then(() =>
    {  
      if (!clickBlocked && !gameEnd.current) {
      
        setTimeout(() => {  IAResponse()  }, 700)

        
      }   

      
      
    }
  )//.then(() => checkWinner())
}

  const checkWinner = async () => {
    let arr = [...rowsAndColumns]
    console.log("123 UPDATE")
    let rowTargets = [0,3,6]
    let columnsTargets = [0,1,2]
    let diagonalTargets = [0,2]
    rowTargets.forEach(e => {
      if (arr.slice(e,e+3).every(e => e.value === 'X')) {
        console.log("123 X WINS !")
        //setGameEnd(true)
        gameEnd.current = true
        winner.current = "X"
  
      }
      if (arr.slice(e,e+3).every(e => e.value === 'O')) {
        console.log("123 O WINS !")
        //setGameEnd(true)
        gameEnd.current = true
        winner.current = "O"
      }
    })

    columnsTargets.forEach((e, index) => {
      if ([arr[e],arr[e+3],arr[e+6]].every(e => e.value === 'X')) {
        console.log("123 X WINS !")
        //setGameEnd(true)
        gameEnd.current = true
        winner.current = "X"
  
      }
      if ([arr[e],arr[e+3],arr[e+6]].every(e => e.value === 'O')) {
        console.log("123 O WINS !")
        //setGameEnd(true)
        gameEnd.current = true
        winner.current = "O"
      }
    })

    
      if ([arr[0],arr[4],arr[8]].every(e => e.value === 'X')) {
        console.log("123 X WINS !")
        //setGameEnd(true)
        gameEnd.current = true
        winner.current = "X"
  
      }
      if ([arr[0],arr[4],arr[8]].every(e => e.value === 'O')) {
        console.log("123 O WINS !")
        //setGameEnd(true)
        gameEnd.current = true
        winner.current = "O"
      }

      if ([arr[2],arr[4],arr[6]].every(e => e.value === 'X')) {
        console.log("123 X WINS !")
        //setGameEnd(true)
        gameEnd.current = true
        winner.current = "X"
  
      }
      if ([arr[2],arr[4],arr[6]].every(e => e.value === 'O')) {
        console.log("123 O WINS !")
        //setGameEnd(true)
        gameEnd.current = true
        winner.current = "O"
      }

    //let copyRowsAndColumns = [...rowsAndColumns]
        if (arr.filter(e => e.value === '').length === 0 || gameEnd.current) {
          console.log("123 GAME END")
          setTimeout(() => {
            Swal.fire({
              title: `GAME END\n${winner.current} WINS !`,
              icon: 'success',
              showConfirmButton: false,
              showDenyButton: false,
              showCancelButton: false,
              timer: 3000,
            })
          }, 500)
        }


  }
  
  

  

  return (
    <div className={css.background}>
      <div className={css.crossCircle}>
        <div className={css.cross}>X</div>
        <div className={css.circle}>O</div>
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