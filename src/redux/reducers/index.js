import { combineReducers } from "redux";
import User from "./userReducer";
import ListFilm from "./listFilmReducer";

export default combineReducers({ User, ListFilm });
