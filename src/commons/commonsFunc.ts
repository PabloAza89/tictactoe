import Swal from 'sweetalert2';
import { landingHidden, setIndexChoosen, setTabChoosen } from '../actions';
import { recipesI } from '../interfaces/interfaces';
import store from '../store/store'

// USED IN CARD & DETAIL

interface handleDeleteI {
  id: string | number,
  fd_tkn: string,
  setUserData: any
  handleReload: any
}

export const handleDelete = async ({ id, fd_tkn, setUserData, handleReload }: handleDeleteI ) => {

  Swal.fire({
    title: 'Are you sure do you want to delete&nbspthis recipe&nbsp?',
    text: 'No undo.',
    icon: 'info',
    showDenyButton: true,
    confirmButtonText: 'DELETE',
    denyButtonText: `CANCEL`,
    confirmButtonColor: '#d14141', // NEW ACTION COLOR
    denyButtonColor: '#3085d6', // NO ACTION COLOR
  })
  .then((result) => {
    if (result.isConfirmed) {
      fetch(`${process.env.REACT_APP_SV}/delete`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
          id: id,
          fd_tkn: fd_tkn
        })
      })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 400 && res.message === 'Invalid Credentials') {
          setUserData({ email: '', fd_tkn: '' })
          Swal.fire({
            title: `There was an error when cheking your loggin.. `,
            text: `Please, log in again.`,
            icon: 'info',
            showConfirmButton: false,
            showDenyButton: false,
            showCancelButton: false,
            timer: 3000,
          })
        }
        if (res.status === 400 && res.message === `0 item deleted`) {
          Swal.fire({
            title: `There was and error..`,
            html: `Please, try again.`,
            icon: 'info',
            showConfirmButton: false,
            showDenyButton: false,
            showCancelButton: false,
            timer: 3000,
          })
        }
        if (res.status === 200 && res.message === `1 item deleted`) {
          Swal.fire({
            title: `Recipe deleted successfully..`,
            icon: 'success',
            showConfirmButton: false,
            showDenyButton: false,
            showCancelButton: false,
            timer: 3000,
          })

          // NEXT CHECKS IF RECIPE WAS THE LAST IN THE TAB, THEN GO ONE LEVEL LOWER
          console.log("se ejecuto aca")

          let copyToShow: any[] = store.getState().toShow
          let actualIndexChoosen = store.getState().indexChoosen
          if (copyToShow.length > 1 && copyToShow[copyToShow.length - 1].id === id && (copyToShow.length - 1) % 9 === 0) {
            store.dispatch(setIndexChoosen( actualIndexChoosen === 0 ? 4 : actualIndexChoosen - 1))
            if (actualIndexChoosen === 0) store.dispatch(setTabChoosen( store.getState().tabChoosen - 1 ))
          }

          handleReload({ statusResponse: 200, messageResponse: `1 item deleted` })
        }
      })
    }
  })
  .catch((rej) => {
    console.log(rej)
    Swal.fire({
      title: `It looks like server its sleeping..`,
      html: `So you cannot save your recipe.<br>We are sorry. Please try againg later..<br><br>Don't worry about everything you wrote, it will be saved in browser memory :) `,
      icon: 'error',
      showConfirmButton: false,
      showDenyButton: false,
      showCancelButton: false,
      timer: 3000,
    })
  })
}

// USED IN CARD & DETAIL

interface handleEditI { navigate: any }
interface handleEditRecipesI extends handleEditI, recipesI {}

export const handleEdit = ({
    navigate, id, title, image, healthScore, diets, email,
    dishTypes, userRecipe, summary, analyzedInstructions
  }: handleEditRecipesI) => {

  Swal.fire({
    title: 'Do you want to edit this&nbsprecipe&nbsp?',
    icon: 'question',
    showDenyButton: true,
    confirmButtonText: 'EDIT',
    denyButtonText: `CANCEL`,
    confirmButtonColor: '#d14141', // NEW ACTION COLOR
    denyButtonColor: '#3085d6', // NO ACTION COLOR
  })
  .then((result) => {
    if (result.isConfirmed) {
      navigate("/MyRecipe", {
        state: {
          editing: true, id, title, image,
          healthScore, diets, email, dishTypes,
          userRecipe, summary, analyzedInstructions
        }
      });
    }
  })
  .catch((rej) => {
    console.log(rej)
    Swal.fire({
      title: `It looks like server its sleeping..`,
      html: `So you cannot save your recipe.<br>We are sorry. Please try againg later..<br><br>Don't worry about everything you wrote, it will be saved in browser memory :) `,
      icon: 'error',
      showConfirmButton: false,
      showDenyButton: false,
      showCancelButton: false,
      timer: 3000,
    })
  })
}

export const handleReturn = ({
  location, navigate, recipeCreatedOrEdited, inDetail, origin
}: any) => {
  if (location.pathname.toLowerCase() === `/myrecipe` && !origin && (location.state && location.state.editing) && !recipeCreatedOrEdited) {
    Swal.fire({
      title: 'Do you want to cancel editing and go back ?',
      text: 'Any changes you have made gonna be lost.',
      icon: 'info',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'CANCEL EDITING',
      denyButtonText: `CONTINUE EDITING`,
      confirmButtonColor: '#d14141', // NEW ACTION COLOR
      denyButtonColor: '#3085d6' // NO ACTION COLOR
    })
    .then((result) => {
      if (result.isConfirmed) navigate("/")
    })
  }
  else if (location.pathname.toLowerCase() === `/myrecipe` && !origin && !(location.state && location.state.editing) && !recipeCreatedOrEdited) {
    Swal.fire({
      title: 'Do you want to cancel create a new recipe and go back ?',
      text: `Don't worry about everything you wrote, it will be saved in browser memory :)`,
      icon: 'info',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'CANCEL CREATING',
      denyButtonText: `CONTINUE CREATING`,
      confirmButtonColor: '#d14141', // NEW ACTION COLOR
      denyButtonColor: '#3085d6' // NO ACTION COLOR
    })
    .then((result) => {
      if (result.isConfirmed) navigate("/")
    })
  }
  else if (location.pathname.toLowerCase() === `/myrecipe` && origin === `settings` && (location.state && location.state.editing) && !recipeCreatedOrEdited) {
    Swal.fire({
      title: 'Do you want to cancel editing and go to setttings ?',
      text: 'Any changes you have made gonna be lost.',
      icon: 'info',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'CANCEL EDITING',
      denyButtonText: `CONTINUE EDITING`,
      confirmButtonColor: '#d14141', // NEW ACTION COLOR
      denyButtonColor: '#3085d6' // NO ACTION COLOR
    })
    .then((result) => {
      if (result.isConfirmed) navigate("/Settings")
    })
  }
  else if (location.pathname.toLowerCase() === `/myrecipe` && origin === `settings` && !(location.state && location.state.editing) && !recipeCreatedOrEdited) {
    Swal.fire({
      title: 'Do you want to cancel create a new recipe and go to settings ?',
      text: `Don't worry about everything you wrote, it will be saved in browser memory :)`,
      icon: 'info',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'CANCEL CREATING',
      denyButtonText: `CONTINUE CREATING`,
      confirmButtonColor: '#d14141', // NEW ACTION COLOR
      denyButtonColor: '#3085d6' // NO ACTION COLOR
    })
    .then((result) => {
      if (result.isConfirmed) navigate("/Settings")
    })
  }
  else if (origin === `settings`) {
    navigate("/Settings")
  }
  else navigate("/")
}

export function checkPrevLogin ({
  setUserData, userData, navigate
}: any) {

  fetch(`${process.env.REACT_APP_SV}/user`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-type': 'application/json; charset=UTF-8' }
  })
  .then((res) => res.json())
  .then((res) => {
    if (res.status === 200) {
      setUserData({ email: res.email, fd_tkn: res.fd_tkn })
      store.dispatch(landingHidden(true))
      localStorage.setItem('landingHidden', 'true')
    }
    if (res.status === 400 &&
      res.message === `User not logged`) setUserData({ email: "", fd_tkn: "" })
    if (res.status === 400 &&
      res.message === `Invalid Credentials`) setUserData({ email: "", fd_tkn: "" })
  })
  .catch(rej => console.log(rej))
}