import css from './MainCSS.module.css';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from '@mui/material/';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const Main = () => {
  console.log("AAAAAAAAAAAAAAAAAAAAAA")

  const [ rowsAndColumns, setRowsAndColumns ] = useState<any[]>(
    [
      {checked: false, value: ''}, {checked: false, value: ''}, {checked: false, value: ''},
      {checked: false, value: ''}, {checked: false, value: ''}, {checked: false, value: ''},
      {checked: false, value: ''}, {checked: false, value: ''}, {checked: false, value: ''}
    ]

  )

  // let rowsAndColumns = [
  //   {checked: false, value: ''}, {checked: false, value: ''}, {checked: false, value: ''},
  //   {checked: false, value: ''}, {checked: false, value: ''}, {checked: false, value: ''},
  //   {checked: false, value: ''}, {checked: false, value: ''}, {checked: false, value: ''}
  // ]

  const clickHandler = ({ target }: any) => {
    console.log("target", target)
    let copyRowsAndColumns = [...rowsAndColumns]
    copyRowsAndColumns[target].value = "X"
    setRowsAndColumns(copyRowsAndColumns)
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