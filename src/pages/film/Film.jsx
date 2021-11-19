import { useState, useEffect } from "react";
import "./film.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Chart from "../../components/chart/Chart";
import { Publish } from "@material-ui/icons";
import {
  getAllFilms,
  getFilmById,
  updateFilm,
} from "../../redux/actions/action";

export default function Film() {
  const dispatch = useDispatch();

  const { filmId } = useParams();
  useEffect(() => {
    dispatch(getFilmById(filmId));
    dispatch(getAllFilms());
  }, [dispatch, filmId]);

  let film = useSelector((state) => state.ListFilm.curFilm);

  let initEditFilm = {
    _id: filmId,
    title: null,
    desc: null,
    poster: "",
    posterFile: null,
    trailer: "",
    trailerFile: null,
    video: "",
    videoFile: null,
    year: null,
    limitAge: null,
    genre: null,
    country: null,
    actors: null,
    isSeries: null,
    posterTitle: "",
    posterTitleFile: null,
    imdb: null,
    posterSm: "",
    posterCard: "",
    posterCardFile: null,
    posterSmFile: null,
  };

  let [editFilm, setEditFilm] = useState(initEditFilm);

  const handleChange = (e, name) => {
    setEditFilm({
      ...editFilm,
      [name]: e.target.value,
    });
  };

  const handleMedia = (e) => {
    let img = e.target.files[0];
    let name = e.target.name;
    let imgUrl = URL.createObjectURL(img);

    setEditFilm({
      ...editFilm,
      [name]: imgUrl,
      [name + "File"]: img,
    });
  };

  const handleSubmit = () => {
    let data = editFilm;
    Object.keys(data).map((k) => {
      if (data[k] === null) {
        delete data[k];
      }
      return null;
    });
    console.log(data);
    dispatch(updateFilm(data));
  };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Film</h1>
        <Link to="/newfilm">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={film.poster} alt="" className="productInfoImg" />
            <span className="productName">{film.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">Id:</span>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <span className="productInfoValue">{film._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Created at:</span>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <span className="productInfoValue">
                {new Date((film.createdAt || "").toString()).toGMTString()}
              </span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Last editted:</span>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <span className="productInfoValue">
                {new Date((film.updatedAt || "").toString()).toGMTString()}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <div className="productForm">
          <div className="productFormLeft">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={editFilm.title === null ? film.title : editFilm.title}
              onChange={(e) => handleChange(e, "title")}
            />
            <label>Country</label>
            <input
              type="text"
              name=""
              value={
                editFilm.country === null ? film.country : editFilm.country
              }
              onChange={(e) => handleChange(e, "country")}
            />
            <label>Is Series</label>
            <select name="isSeries" id="isSeries">
              <option
                value="yes"
                selected={
                  editFilm.isSeries === null ? film.isSeries : editFilm.isSeries
                }
                onChange={(e) => handleChange(e, "isSeries")}
              >
                Yes
              </option>
              <option
                value="no"
                selected={
                  !editFilm.isSeries === null
                    ? film.isSeries
                    : editFilm.isSeries
                }
                onChange={(e) => handleChange(e, "isSeries")}
              >
                No
              </option>
            </select>
            <label>Description</label>
            <textarea
              rows="5"
              value={editFilm.desc === null ? film.desc : editFilm.desc}
              onChange={(e) => handleChange(e, "desc")}
            />
            <label>Genre</label>
            <input
              type="text"
              value={editFilm.genre === null ? film.genre : editFilm.genre}
              onChange={(e) => handleChange(e, "genre")}
            />
            <label>Limit Age</label>
            <input
              type="text"
              value={
                editFilm.limitAge === null ? film.limitAge : editFilm.limitAge
              }
              onChange={(e) => handleChange(e, "limitAge")}
            />
            <label>Year</label>
            <input
              type="number"
              value={editFilm.year === null ? film.year : editFilm.year}
              onChange={(e) => handleChange(e, "year")}
            />
            <label>Imdb</label>
            <input
              type="number"
              value={editFilm.imdb === null ? film.imdb : editFilm.imdb}
              onChange={(e) => handleChange(e, "imdb")}
            />
            <label>Actors</label>
            <input
              type="text"
              value={editFilm.actors === null ? film.actors : editFilm.actors}
              onChange={(e) => handleChange(e, "actors")}
            />
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img
                src={
                  editFilm.posterSm === "" ? film.posterSm : editFilm.posterSm
                }
                alt="Poster Small"
                className="productUploadImg"
              />
              <label for="posterSm">
                Poster Small
                <Publish />
              </label>
              <input
                type="file"
                id="posterSm"
                style={{ display: "none" }}
                onChange={handleMedia}
                name="posterSm"
              />
            </div>

            <div className="productUpload">
              <img
                src={editFilm.poster === "" ? film.poster : editFilm.poster}
                alt="Poster"
                className="productUploadImg"
              />
              <label for="poster">
                Poster
                <Publish />
              </label>
              <input
                type="file"
                id="poster"
                style={{ display: "none" }}
                onChange={handleMedia}
                name="poster"
              />
            </div>

            <div className="productUpload">
              <img
                src={
                  editFilm.posterCard === ""
                    ? film.posterCard
                    : editFilm.posterCard
                }
                alt="Poster Card"
                className="productUploadImg"
              />
              <label for="posterCard">
                Poster Card
                <Publish />
              </label>
              <input
                type="file"
                id="posterCard"
                style={{ display: "none" }}
                onChange={handleMedia}
                name="posterCard"
              />
            </div>

            <div className="productUpload">
              <img
                src={
                  editFilm.posterTitle === ""
                    ? film.posterTitle
                    : editFilm.posterTitle
                }
                alt="Poster Title"
                className="productUploadImg"
              />
              <label for="posterTitle">
                Poster Title
                <Publish />
              </label>
              <input
                type="file"
                id="posterTitle"
                style={{ display: "none" }}
                onChange={handleMedia}
                name="posterTitle"
              />
            </div>

            <div className="productUpload">
              <label for="trailer">
                Trailer
                <Publish />
              </label>
              <input
                type="file"
                id="trailer"
                onChange={handleMedia}
                name="trailer"
              />
            </div>

            <div className="productUpload">
              <label for="video">
                Video
                <Publish />
              </label>
              <input
                type="file"
                id="video"
                onChange={handleMedia}
                name="video"
              />
            </div>
          </div>
        </div>
        <button className="productButton" onClick={handleSubmit}>
          Update
        </button>
      </div>
    </div>
  );
}
