import css from "./SettingsButtonCSS.module.css";
import { useNavigate, useLocation, useMatch } from "react-router-dom";
import { useSelector } from 'react-redux';
import { Button } from '@mui/material/';
import SettingsIcon from '@mui/icons-material/Settings';
import { handleReturn } from '../../commons/commonsFunc';

const SettingsButton = ({ recipeCreatedOrEdited }: any) =>  {

  const location = useLocation()
  const navigate = useNavigate();

  const inHome = useMatch("/")?.pattern.path === "/" ? true : false; // "/" === Home
  const menuShown = useSelector((state: {menuShown:boolean}) => state.menuShown)

  return (
    <div
      className={css.background}
      style={{
        position: inHome ? 'absolute' : 'fixed',
        visibility: menuShown ? 'visible' : 'hidden'
      }}
    >
      <Button
        variant="contained"
        className={css.buttonIn}
        onClick={() => handleReturn({
          location, navigate, recipeCreatedOrEdited,
          origin: `settings`
        })}
      >
        <SettingsIcon className={css.iconEdit} />
      </Button>
    </div>
  );
}

export default SettingsButton;