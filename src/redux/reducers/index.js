import { combineReducers } from "redux";
import User from "./userReducer";
import ListFilm from "./listFilmReducer";
import alert from "./alertReducer";

export default combineReducers({ User, ListFilm, alert });
