import { useState } from "react";
import axios from "axios";
import "./newFilm.css";
import { GLOBALTYPES, URL } from "../../redux/actions/globalTypes";
import { useDispatch } from "react-redux";

export default function NewFilm() {
  let initPreview = {
    poster: { file: null, url: "" },
    posterTitle: { file: null, url: "" },
    posterSm: { file: null, url: "" },
    posterCard: { file: null, url: "" },
    video: { file: null, url: "" },
    trailer: { file: null, url: "" },
  };

  let initNewFilm = {
    title: "",
    desc: "",
    poster: "",
    trailer: "",
    video: "",
    year: 0,
    limitAge: 0,
    genre: "",
    country: "",
    actors: "",
    isSeries: false,
    posterTitle: "",
    posterSm: "",
    posterCard: "",
    imdb: "",
  };

  let [preview, setPreview] = useState(initPreview);
  let [newFilm, setNewFilm] = useState(initNewFilm);
  const dispatch = useDispatch();

  const handleGenreChange = (e) => {
    let genres = e.target.value.split(", ");
    setNewFilm({ ...newFilm, genre: e.target.value });
  };

  const handleActorChange = (e) => {
    let actors = e.target.value.split(", ");
    setNewFilm({ ...newFilm, actors: e.target.value });
  };

  const handlePoster = (e) => {
    let file = e.target.files[0];
    let url = window.URL.createObjectURL(file);
    setPreview({
      ...preview,
      poster: {
        file,
        url,
      },
    });
  };

  const handlePosterTitle = (e) => {
    let file = e.target.files[0];
    let url = window.URL.createObjectURL(file);
    setPreview({
      ...preview,
      posterTitle: {
        file,
        url,
      },
    });
  };

  const handlePosterSm = (e) => {
    let file = e.target.files[0];
    let url = window.URL.createObjectURL(file);
    setPreview({
      ...preview,
      posterSm: {
        file,
        url,
      },
    });
  };

  const handlePosterCard = (e) => {
    let file = e.target.files[0];
    let url = window.URL.createObjectURL(file);
    setPreview({
      ...preview,
      posterCard: {
        file,
        url,
      },
    });
  };

  const handleVideo = (e) => {
    let file = e.target.files[0];
    // let url = URL.createObjectURL(file)
    setPreview({
      ...preview,
      video: {
        file,
        // url
      },
    });
  };

  const handleTrailer = (e) => {
    let file = e.target.files[0];
    // let url = URL.createObjectURL(file)
    setPreview({
      ...preview,
      trailer: {
        file,
      },
    });
  };

  const upload = async (file, type) => {
    let formData = new FormData();
    formData.append(type, file);
    try {
      type = type.toLowerCase();
      let response = await axios({
        method: "post",
        url: `${URL.BASE_URL}/upload/${type}`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data.url;
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async () => {
    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
      let posterUrlPromise = upload(preview.poster.file, "image", dispatch);
      let posterTitleUrlPromise = upload(
        preview.posterTitle.file,
        "image",
        dispatch
      );
      let posterSmUrlPromise = upload(preview.posterSm.file, "image", dispatch);
      let posterCardUrlPromise = upload(
        preview.posterCard.file,
        "image",
        dispatch
      );
      let videoUrlPromise = upload(preview.video.file, "video", dispatch);
      let trailerUrlPromsie = upload(preview.trailer.file, "video", dispatch);

      Promise.all([
        posterUrlPromise,
        posterTitleUrlPromise,
        posterSmUrlPromise,
        posterCardUrlPromise,
        videoUrlPromise,
        trailerUrlPromsie,
      ]).then(async (values) => {
        const requestMovie = {
          ...newFilm,
          poster: values[0],
          posterTitle: values[1],
          posterSm: values[2],
          posterCard: values[3],
          video: values[4],
          trailer: values[5],
        };

        console.log(requestMovie);

        let response = await axios({
          method: "post",
          url: `${URL.BASE_URL}/api/movie`,
          data: requestMovie,
          headers: { "Content-Type": "application/json" },
        });

        console.log("resposne", response);
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });

        alert("Create successfully!");
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Film</h1>
      <div className="addProductForm">
        <div className="addProductItem">
          <label>Poster</label>
          <input type="file" id="poster" onChange={handlePoster} />
          {/* <button className="upload_btn" onClick={uploadPoster}>Upload</button> */}
          {preview.poster.url && (
            <img
              className="preview_img"
              src={preview.poster.url}
              alt="Preview poster"
            />
          )}
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input
            type="text"
            onChange={(e) => setNewFilm({ ...newFilm, title: e.target.value })}
          />
        </div>
        <div className="addProductItem">
          <label>Poster Title</label>
          <input type="file" id="posterTitle" onChange={handlePosterTitle} />
          {preview.posterTitle.url && (
            <img
              className="preview_img"
              src={preview.posterTitle.url}
              alt="Preview poster title"
            />
          )}
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <textarea
            rows="5"
            onChange={(e) => setNewFilm({ ...newFilm, desc: e.target.value })}
          />
        </div>
        <div className="addProductItem">
          <label>Is Series</label>
          <select
            name="isSeries"
            id="isSeries"
            onChange={(e) =>
              setNewFilm({ ...newFilm, isSeries: e.target.value })
            }
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Year</label>
          <input
            type="number"
            min="1900"
            onChange={(e) => setNewFilm({ ...newFilm, year: e.target.value })}
          />
        </div>
        <div className="addProductItem">
          <label>Genre</label>
          <input type="text" onChange={handleGenreChange} />
        </div>
        <div className="addProductItem">
          <label>Actors</label>
          <input type="text" onChange={handleActorChange} />
        </div>
        <div className="addProductItem">
          <label>Limit Age</label>
          <input
            type="number"
            min="0"
            onChange={(e) =>
              setNewFilm({ ...newFilm, limitAge: e.target.value })
            }
          />
        </div>
        <div className="addProductItem">
          <label>Country</label>
          <input
            type="text"
            onChange={(e) =>
              setNewFilm({ ...newFilm, country: e.target.value })
            }
          />
        </div>
        <div className="addProductItem">
          <label>Imdb</label>
          <input
            type="number"
            min="0"
            onChange={(e) => setNewFilm({ ...newFilm, imdb: e.target.value })}
          />
        </div>
        <div className="addProductItem">
          <label>Poster Small</label>
          <input type="file" id="posterSm" onChange={handlePosterSm} />
          {preview.posterSm.url && (
            <img
              className="preview_img"
              src={preview.posterSm.url}
              alt="Preview poster sm"
            />
          )}
        </div>
        <div className="addProductItem">
          <label>Poster Card</label>
          <input type="file" id="posterCard" onChange={handlePosterCard} />
          {preview.posterCard.url && (
            <img
              className="preview_img"
              src={preview.posterCard.url}
              alt="Preview poster card"
            />
          )}
        </div>
        <div className="addProductItem">
          <label>Video</label>
          <input type="file" id="video" onChange={handleVideo} />
          {/* <video className="preview_video" src={preview.trailer.url}></video> */}
        </div>
        <div className="addProductItem">
          <label>Trailer</label>
          <input type="file" id="trailer" onChange={handleTrailer} />
          {/* <video className="preview_video" src={preview.trailer.url}></video> */}
        </div>
        <button className="addProductButton" onClick={handleSubmit}>
          Create
        </button>
      </div>
    </div>
  );
}
