import css from './ScoreTableCSS.module.css';
import com from '../../commons/commonsCSS.module.css';
import { useEffect, useState, useRef, useLayoutEffect, createContext, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material/';
import { easings } from '../../commons/easingsCSS';
import Swal from 'sweetalert2';
import $ from 'jquery';
import { pointsI, highlighterI, handleSequenceI, eachBoxI } from '../../interfaces/interfaces';
//import { setScoreShown } from '../../actions';

interface ScoreTableI {
  score: any
}

const ScoreTable = ({ score }: ScoreTableI) => {

  const [ scoreShown, setScoreShown ] = useState<boolean>(true)
  //let score = useRef<any[]>([])

  //const value = useContext();

  //console.log("123", value)

  // let score = useRef<any[]>([
  //     {
  //       id: 0,
  //       timeX: `10:34:112`,
  //       scoreX: 100,
  //       X: "❌",
  //       O: "❌",
  //       scoreO: 0,
  //       timeO: `00:00:000`
  //     },
  //     {
  //       id: 1,
  //       timeX: `00:00:000`,
  //       scoreX: 0,
  //       X: "❌",
  //       O: "❌",
  //       scoreO: 100,
  //       timeO: `00:39:124`
  //     },
  //     {
  //       id: 2,
  //       timeX: `00:00:000`,
  //       scoreX: 0,
  //       X: "❌",
  //       O: "❌",
  //       scoreO: 100,
  //       timeO: `00:52:356`
  //     },
  //     {
  //       id: 3,
  //       timeX: `53:45:544`,
  //       scoreX: 200,
  //       X: "❌",
  //       O: "❌",
  //       scoreO: 0,
  //       timeO: `00:00:000`
  //     },
  //     {
  //       id: 4,
  //       timeX: `03:15:821`,
  //       scoreX: 100,
  //       X: "❌",
  //       O: "❌",
  //       scoreO: 0,
  //       timeO: `00:00:000`
  //     },
  //     {
  //       id: 5,
  //       timeX: `00:00:000`,
  //       scoreX: 0,
  //       X: "❌",
  //       O: "❌",
  //       scoreO: 200,
  //       timeO: `00:15:231`
  //     },
  //     {
  //       id: 6,
  //       timeX: `00:00:000`,
  //       scoreX: 0,
  //       X: "❌",
  //       O: "❌",
  //       scoreO: 100,
  //       timeO: `03:52:339`
  //     },
  //     {
  //       id: 7,
  //       timeX: `00:02:234`,
  //       scoreX: 200,
  //       X: "❌",
  //       O: "✔️",
  //       scoreO: 0,
  //       timeO: `00:00:000`
  //     },
  //     {
  //       id: 8,
  //       timeX: `00:02:234`,
  //       scoreX: 200,
  //       X: "❌",
  //       O: "❌",
  //       scoreO: 0,
  //       timeO: `00:00:000`
  //     }
  //   ])

  useEffect(() => { // SHOW/HIDE SCORE HANDLER
    $(function() {
      if (!scoreShown) { // show --> hidden
        $(`.buttonShow`)
          .on("click", function() {
          $(`#sliderBox`)
            .stop() // ↓↓ ABSOLUTE ↓↓
            .animate( { right: '0px' }, { queue: false, easing: 'easeOutCubic', duration: 800 }) // INITIAL POSITION
        })
        $(`#sliderBox`)
          .css("left", "auto")
          .css("right", "-415px") // DIV WIDTH
      }
      else if (scoreShown) { // hidden -> show
        $(`.buttonShow`)
          .on("click", function() {
            $(`#sliderBox`)
              .stop() // DIV WIDTH
              .animate( { right: '-415px' }, { queue: false, easing: 'easeOutCubic', duration: 800 })
          })
        $(`#sliderBox`)
          .css("left", "auto")
          .css("right", "0px") // ABSOLUTE
      }
    })
  },[scoreShown])

  return (
    <div className={`${css.background} ${com.noSelect}`}>
      <Button
        className={`buttonShow`}
        id={css.buttonShow}
        onClick={() => { 
          //dispatch(setScoreShown(!scoreShown))
          setScoreShown(!scoreShown)
          //localStorage.setItem('scoreShown', JSON.stringify(!scoreShown))
        }}
      >
        <div className={css.buttonTypo}>
          { `TOTAL SCORE` }
        </div>
      </Button>
      <div
        className={css.scoreTable}
        id={`sliderBox`}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            className={css.scoreTableTitlesContainerUpper}
          >
            <div id={`evenTarget`} className={css.scoreTableNumeral}>#</div>
            <div id={`evenTarget`} className={css.scoreTableTime}>TIME</div>
            <div id={`evenTarget`} className={css.scoreTableScore}>SCORE</div>
            <div id={`evenTarget`} className={css.scoreTableYouAI}>YOU</div>
            <div id={`evenTarget`} className={css.scoreTableYouAI}>AI</div>
            <div id={`evenTarget`} className={css.scoreTableScore}>SCORE</div>
            <div id={`evenTarget`} className={css.scoreTableTime}>TIME</div>
          </div>
          {
            score.map((e,i)=> {
              return (
                <div key={i} className={css.scoreTableEachScore}>
                  <div id={`evenTarget`} className={css.scoreTableNumeral}>{e.id + 1}</div>
                  <div id={`evenTarget`} className={css.scoreTableTime}>{ e.timeX === '00:00:000' ? "➖" : e.timeX }</div>
                  <div id={`evenTarget`} className={css.scoreTableScore}>{ e.scoreX === 0 ? "➖" : e.scoreX }</div>
                  <div id={`evenTarget`} className={css.scoreTableYouAI}>{ e.X }</div>
                  <div id={`evenTarget`} className={css.scoreTableYouAI}>{ e.O }</div>
                  <div id={`evenTarget`} className={css.scoreTableScore}>{ e.scoreO === 0 ? "➖" : e.scoreO }</div>
                  <div id={`evenTarget`} className={css.scoreTableTime}>{ e.timeO === '00:00:000' ? "➖" : e.timeO }</div>
                </div>
              )
            })
          }
          
          
        </div>
        <div className={css.scoreTableTitlesContainerLower}>
          <div id={`evenTarget`} className={css.scoreTableNumeralLast}></div>
          <div id={`evenTarget`} className={css.scoreTableTime}>{/* { `${XfinalMin.current.toString().padStart(2,'0')}:${XfinalSec.current.toString().padStart(2,'0')}:${XfinalMs.current.toString().padStart(3,'0')}` } */}</div>
          <div id={`evenTarget`} className={css.scoreTableScore}>{ score.reduce((partial, el) => partial + el.scoreX, 0) }</div>
          <div id={`evenTarget`} className={css.scoreTableTotal}>TOTAL</div>
          <div id={`evenTarget`} className={css.scoreTableScore}>{ score.reduce((partial, el) => partial + el.scoreO, 0) }</div>
          <div id={`evenTarget`} className={css.scoreTableTimeLast}>{/* { `${OfinalMin.current.toString().padStart(2,'0')}:${OfinalSec.current.toString().padStart(2,'0')}:${OfinalMs.current.toString().padStart(3,'0')}` } */}</div>
        </div>


          <div className={css.scoreBackgroundLight1}></div>
          <div className={css.scoreBackgroundLight2}></div>
          <div className={css.scoreBackgroundLight3}></div>
          <div className={css.scoreBackgroundLight4}></div>
          <div className={css.scoreBackgroundLight5}></div>
          <div className={css.scoreBackgroundLight6}></div>
          <div className={css.scoreBackgroundLight7}></div>
          <div className={css.scoreBackgroundLight8}></div>
          <div className={css.scoreBackgroundLight9}></div>
          <div className={css.scoreBackgroundLight10}></div>
          <div className={css.scoreBackgroundLight11}></div>
          



      </div>
    </div>
  );
}

export default ScoreTable;