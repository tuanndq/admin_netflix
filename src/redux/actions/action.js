import axios from "axios"
import { URL, GLOBALTYPES } from './globalTypes'

export const getAllFilms = () => async (dispatch) => {
  try {
    let res = await axios.get(`${URL.BASE_URL}/api/movies`)
    dispatch({ type: GLOBALTYPES.GET_ALL_FILM, payload: res.data })
  } catch(err) {
    console.log(err)
  }
}

export const getFilmById = (id) => async (dispatch) => {
  try {
    let res = await axios.get(`${URL.BASE_URL}/api/movie/get/${id}`)
    console.log(res.data)
    dispatch({ type: GLOBALTYPES.GET_FILM_BY_ID, payload: res.data })
  } catch(err) {
    console.log(err)
  }
}

export const getAllUser = () => async (dispatch) => {
  try {
    let res = await axios.get(`${URL.BASE_URL}/api/users`)
    dispatch({ type: GLOBALTYPES.GET_ALL_USER, payload: res.data })
  } catch(err) {
    console.log(err)
  }
}