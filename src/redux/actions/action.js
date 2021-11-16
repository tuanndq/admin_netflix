import axios from "axios"
import { URL, GLOBALTYPES } from './globalTypes'

const AUTH_TOKEN = localStorage.getItem('token')
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

export const loginAction = ({ email, password }) => async (dispatch) => {
  try {
    let data = {
      email, password
    }
    let res = await axios.post(`${URL.BASE_URL}/api/login`, data)
    let { access_token, user } = res.data
    localStorage.setItem('token', access_token)
    dispatch({ type: GLOBALTYPES.LOGIN, payload: access_token })
    window.location = URL.CLIENT_URL
  } catch(err) {
    console.log(err)
  }
}

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

export const updateFilm = (data) => async (dispatch) => {
  try {
    let editFilm = data
    if (data.posterSmFile) {
      let posterSm = await upload(data.posterSmFile, 'image')
      delete(data.posterSmFile)
      editFilm = {
        ...data,
        posterSm
      }
    }
    await axios.patch(`${URL.BASE_URL}/api/movie/update/${data._id}`, editFilm)
    let res = await axios.get(`${URL.BASE_URL}/api/movie/get/${data._id}`)
    dispatch({ type: GLOBALTYPES.GET_FILM_BY_ID, payload: res.data })
    alert('Update successfully')
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

export const createNewUser = async (data) => {
  try {
    await axios.post(`${URL.BASE_URL}/api/newUser`, data)
    alert('Create successfully!')
  } catch(err) {
    console.log(err)
  }
}

export const editUserById = async (data) => {
  try {
    await axios.put(`${URL.BASE_URL}/api/user/${data._id}`, data)
    alert('Update successfully!')
  } catch(err) {
    alert('Update error!')
    console.log(err)
  }
}

export const deleteUserById = (id) => async (dispatch) => {
  try {
    await axios.delete(`${URL.BASE_URL}/api/user/delete/${id}`)
    let res = await axios.get(`${URL.BASE_URL}/api/users`)
    dispatch({ type: GLOBALTYPES.GET_ALL_USER, payload: res.data })
  } catch(err) {
    console.log(err)
  }
}

export const createNewEpisode = async (data) => {
  try {
    let res = await upload(data.thumbnailFile, 'image')
    delete(data.thumbnailFile)
    data.thumbnail = res
    await axios.post(`${URL.BASE_URL}/api/episode`, data)
    alert('Create episode successfully!')
  } catch(err) {
    console.log(err)
  } 
}

const upload = async (file, type) => {
  let formData = new FormData()
  formData.append(type, file)
  try {
    type = type.toLowerCase()
    let response = await axios({
      method: 'post',
      url: `${URL.BASE_URL}/upload/${type}`,
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return response.data.url
  } catch(err) {
    console.log(err) 
  }
}