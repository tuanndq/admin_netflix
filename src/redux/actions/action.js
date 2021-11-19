import axios from "axios";
import { URL, GLOBALTYPES } from "./globalTypes";

const AUTH_TOKEN = localStorage.getItem("token");
axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;

export const loginAction =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
      let data = {
        email,
        password,
      };
      let res = await axios.post(`${URL.BASE_URL}/api/login`, data);
      let { access_token, user } = res.data;

      localStorage.setItem("token", access_token);
      localStorage.setItem("user", JSON.stringify(user));

      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          success: res.data.msg,
        },
      });
      dispatch({ type: GLOBALTYPES.LOGIN, payload: access_token });
      window.location = URL.CLIENT_URL;
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: err.response.data.msg,
        },
      });
    }
  };

export const updateFilm = (data) => async (dispatch) => {
  try {
    let editFilm = data;
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
    if (data) {
      let posterSmPromise = upload(data.posterSmFile, "image", dispatch);
      let posterTitlePromise = upload(data.posterTitleFile, "image", dispatch);
      let posterCardPromise = upload(data.posterCardFile, "image", dispatch);
      let posterPromise = upload(data.posterFile, "image", dispatch);
      let trailerPromise = upload(data.trailerFile, "image", dispatch);
      let videoPromise = upload(data.videoFile, "image", dispatch);

      Promise.all([
        posterSmPromise,
        posterTitlePromise,
        posterCardPromise,
        posterPromise,
        trailerPromise,
        videoPromise,
      ])
        .then((values) => {
          const requestMovie = {
            ...editFilm,
            posterSm: values[0],
            posterTitle: values[1],
            posterCard: values[2],
            poster: values[3],
            trailer: values[4],
            video: values[5],
          };
          return requestMovie;
        })
        .then(async (requestMovie) => {
          await axios.patch(
            `${URL.BASE_URL}/api/movie/update/${data._id}`,
            requestMovie
          );
          let res = await axios.get(
            `${URL.BASE_URL}/api/movie/get/${data._id}`
          );
          dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
          dispatch({ type: GLOBALTYPES.GET_FILM_BY_ID, payload: res.data });
          alert("Update successfully!");
        });
    }
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg,
      },
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch({ type: GLOBALTYPES.LOGOUT, payload: {} });
  } catch (err) {
    console.log(err);
  }
};

export const createNewList = (data) => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
    await axios.post(`${URL.BASE_URL}/api/lists`, data);
    let res = await axios.get(`${URL.BASE_URL}/api/lists`);
    dispatch({ type: GLOBALTYPES.GET_ALL_LIST, payload: res.data });
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
    alert("Create list successfully!");
  } catch (err) {
    console.log(err);
  }
};

export const getAllLists = () => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
    let res = await axios.get(`${URL.BASE_URL}/api/lists`);
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
    dispatch({ type: GLOBALTYPES.GET_ALL_LIST, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const updateListById = (data) => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
    await axios.patch(`${URL.BASE_URL}/api/lists/update/${data._id}`, data);
    let res = await axios.get(`${URL.BASE_URL}/api/lists`);
    dispatch({ type: GLOBALTYPES.GET_ALL_LIST, payload: res.data });
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
    alert("Update successfully!");
  } catch (err) {
    console.log(err);
  }
};

export const getAllEpisodes = () => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
    let res = await axios.get(`${URL.BASE_URL}/api/episodes`);
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
    dispatch({ type: GLOBALTYPES.GET_ALL_EPISODE, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const getFilmById = (id) => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
    let res = await axios.get(`${URL.BASE_URL}/api/movie/get/${id}`);
    console.log(res.data);
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
    dispatch({ type: GLOBALTYPES.GET_FILM_BY_ID, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const getAllUser = () => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
    let res = await axios.get(`${URL.BASE_URL}/api/users`);
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
    dispatch({ type: GLOBALTYPES.GET_ALL_USER, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const getAllFilms = () => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
    let res = await axios.get(`${URL.BASE_URL}/api/movies`);
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
    dispatch({ type: GLOBALTYPES.GET_ALL_FILM, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const deleteFilmById = (id) => async (dispatch) => {
  try {
    await axios.delete(`${URL.BASE_URL}/api/movie/delete/${id}`);
    let res = await axios.get(`${URL.BASE_URL}/api/movies`);
    dispatch({ type: GLOBALTYPES.GET_ALL_FILM, payload: res.data });
    alert("Delete successfully");
  } catch (err) {
    console.log(err);
  }
};

export const createNewUser = async (data, dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
    await axios.post(`${URL.BASE_URL}/api/newUser`, data);
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
    alert("Create successfully!");
  } catch (err) {
    console.log(err);
  }
};

export const editUserById = async (data, dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
    await axios.put(`${URL.BASE_URL}/api/user/${data._id}`, data);
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
    alert("Update successfully!");
  } catch (err) {
    alert("Update error!");
    console.log(err);
  }
};

export const deleteUserById = (id) => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
    await axios.delete(`${URL.BASE_URL}/api/user/delete/${id}`);
    let res = await axios.get(`${URL.BASE_URL}/api/users`);
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
    dispatch({ type: GLOBALTYPES.GET_ALL_USER, payload: res.data });
    alert("Delete successfully!");
  } catch (err) {
    console.log(err);
  }
};

export const deleteListById = (id) => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
    await axios.delete(`${URL.BASE_URL}/api/lists/delete/${id}`);
    let res = await axios.get(`${URL.BASE_URL}/api/lists`);
    dispatch({ type: GLOBALTYPES.GET_ALL_LIST, payload: res.data });
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
    alert("Delete successfully");
  } catch (err) {
    console.log(err);
  }
};

export const createNewEpisode = (data) => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
    let res = await upload(data.thumbnailFile, "image", dispatch);
    delete data.thumbnailFile;
    data.thumbnail = res;
    console.log(data);
    await axios.post(`${URL.BASE_URL}/api/episode`, data);
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
    alert("Create episode successfully!");
  } catch (err) {
    console.log(err);
  }
};

export const deleteEpisodeById = (id) => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
    await axios.delete(`${URL.BASE_URL}/api/episode/delete/${id}`);
    let res = await axios.get(`${URL.BASE_URL}/api/episodes`);
    dispatch({ type: GLOBALTYPES.GET_ALL_EPISODE, payload: res.data });
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
    alert("Delete successfully!");
  } catch (err) {
    console.log(err);
  }
};

export const updateEpisodeById = (data) => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
    await axios.patch(`${URL.BASE_URL}/api/episode/update/${data._id}`, data);
    let res = await axios.get(`${URL.BASE_URL}/api/episodes`);
    dispatch({ type: GLOBALTYPES.GET_ALL_EPISODE, payload: res.data });
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
    alert("Update successfully!");
  } catch (err) {
    console.log(err);
  }
};

const upload = async (file, type, dispatch) => {
  try {
    let formData = new FormData();
    formData.append(type, file);
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
    type = type.toLowerCase();
    let response = await axios({
      method: "post",
      url: `${URL.BASE_URL}/upload/${type}`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        loading: false,
      },
    });
    return response.data.url;
  } catch (err) {
    console.log(err);
  }
};
