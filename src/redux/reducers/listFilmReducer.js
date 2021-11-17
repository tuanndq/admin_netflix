import { GLOBALTYPES } from "../actions/globalTypes";

const initState = {
  allFilms: [],
  lists: [],
  episodes: [],
  curFilm: {},
  selectedFilm: [],
  isModalOpen: false
}

export default function ListFilm(state = initState, action) {
  switch (action.type) {
    case GLOBALTYPES.GET_ALL_FILM:
      return {
        ...state,
        allFilms: action.payload
      }
    case GLOBALTYPES.GET_ALL_LIST:
      return {
        ...state,
        lists: action.payload
      }
    case GLOBALTYPES.GET_ALL_EPISODE:
      return {
        ...state,
        episodes: action.payload
      }
    case GLOBALTYPES.GET_FILM_BY_ID:
      return {
        ...state,
        curFilm: action.payload
      }
    case GLOBALTYPES.SELECTED_FILM:
      return {
        ...state,
        selectedFilm: action.payload
      }
    case GLOBALTYPES.TOGGLE_MODAL:
      return {
        ...state,
        isModalOpen: action.payload
      }
    case GLOBALTYPES.SUBMIT_NEW_LIST:
      return {
        ...state
      }
    default:
      return state
  }
}