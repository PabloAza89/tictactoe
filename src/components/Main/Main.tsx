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

  let IAvalue = useRef(Math.floor(Math.random() * 9))

  const clickHandler = ({ target }: any) => {

    let copyRowsAndColumns = [...rowsAndColumns]

    if (copyRowsAndColumns[target].value === "") {
      rowsAndColumns[target].value = "X"
      setRowsAndColumns(copyRowsAndColumns)


      /* BEGIN RANDOM IA SECTION */
      if (copyRowsAndColumns.filter(e => e.value === '').length > 1) {
        if (copyRowsAndColumns[IAvalue.current].value === "") {
          copyRowsAndColumns[IAvalue.current].value = "O"
          setRowsAndColumns(copyRowsAndColumns)
        } else {
          let success = false
          do {
            IAvalue.current = Math.floor(Math.random() * 9)
            if (copyRowsAndColumns[IAvalue.current].value === "") {
              copyRowsAndColumns[IAvalue.current].value = "O"
              setRowsAndColumns(copyRowsAndColumns)
              success = true
            }
          } while (copyRowsAndColumns[IAvalue.current].value !== "" && success === false)
        }
      } 
      /* END RANDOM IA SECTION */


    }
      

    

    console.log("123 filter(e => e.value === '').length", copyRowsAndColumns.filter(e => e.value === '').length)

    if (copyRowsAndColumns.filter(e => e.value === '').length === 0) {
      console.log("123 GAME END")
    }

  }

  console.log("123 actual", rowsAndColumns)

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
                onClick={(e) => { clickHandler({ target: index }) }}
                className={css.eachBox}
              >
                {/* {rowsAndColumns[parseInt((e.target as HTMLInputElement).id, 10)].value} */}
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