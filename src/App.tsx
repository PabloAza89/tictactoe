import { useState, useEffect, useRef } from "react";
import css from './App.module.css';
import './commons/globalSweetAlert2.css';
import { useSelector } from 'react-redux';
import { Route, Routes, useMatch, useLocation } from "react-router-dom";
import $ from 'jquery';
import Main from "./components/Main/Main";
//import Loading from "./components/Loading/Loading";

function App() {

  return (
   <div className={css.background}>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Main />
              {/* <Loading /> */}
              {/* <ScoreTable score={score} /> */}
            </>
          }
        />
      </Routes>
      </div>
  )
}

export default App;
