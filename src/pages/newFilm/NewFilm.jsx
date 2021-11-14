import { useState } from "react";
import axios from 'axios'
import "./newFilm.css";
import { URL } from "../../redux/actions/globalTypes";

export default function NewFilm() {
  let initPreview = {
    poster: { file: null, url: '' },
    posterTitle: { file: null, url: '' },
    posterSm: { file: null, url: '' },
    video: { file: null, url: '' },
    trailer: { file: null, url: '' },
  }
  
  let initNewFilm = {
    title: '',
    desc: '',
    poster: '',
    trailer: '',
    video: '',
    year: 0,
    limitAge: 0,
    genre: [],
    country: '',
    actors: [],
    isSeries: false,
    posterTitle: '',
    posterSm: '',
    imdb: ''
  }

  let [preview, setPreview] = useState(initPreview)
  let [newFilm, setNewFilm] = useState(initNewFilm)

  const handleGenreChange = (e) => {
    let genres = e.target.value.split(', ')
    setNewFilm({ ...newFilm, genre: e.target.value })
  }

  const handlePoster = (e) => {
    let file = e.target.files[0]
    let url = window.URL.createObjectURL(file)
    setPreview({ ...preview,
      poster: {
        file,
        url
      }
    })
  }

  const handlePosterTitle = (e) => {
    let file = e.target.files[0]
    let url = window.URL.createObjectURL(file)
    setPreview({ ...preview,
      posterTitle: {
        file,
        url
      }
    })
  }

  const handlePosterSm = (e) => {
    let file = e.target.files[0]
    let url = window.URL.createObjectURL(file)
    setPreview({ ...preview,
      posterSm: {
        file,
        url
      }
    })
  }

  const handleVideo = (e) => {
    let file = e.target.files[0]
    // let url = URL.createObjectURL(file)
    setPreview({ ...preview,
      video: {
        file,
        // url
      }
    })
  }

  const handleTrailer = (e) => {
    let file = e.target.files[0]
    // let url = URL.createObjectURL(file)
    setPreview({ ...preview,
      trailer: {
        file,
      }
    })
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

  const handleSubmit = async () => {
    try {
      let posterUrl = await upload(preview.poster.file, 'image')
      let posterTitleUrl = await upload(preview.posterTitle.file, 'image')
      let posterSmUrl = await upload(preview.posterSm.file, 'image')
      let videoUrl = await upload(preview.video.file, 'video')
      let trailerUrl = await upload(preview.trailer.file, 'video')
      console.log(trailerUrl);

      setNewFilm({
        ...newFilm,
        poster: posterUrl,
        posterTitle: posterTitleUrl,
        posterSm: posterSmUrl,
        video: videoUrl,
        trailer: trailerUrl
      })

      console.log(newFilm)

      let response = await axios({
        method: 'post',
        url: `${URL.BASE_URL}/api/movie`,
        data: newFilm,
        headers: { 'Content-Type': 'application/json' }
      })

      console.log('resposne', response)

      alert('Create successfully!')

    } catch(err) {
      console.log(err)
    }
  }

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Film</h1>
      <div className="addProductForm">
        <div className="addProductItem">
          <label>Poster Image</label>
          <input type="file" id="poster" onChange={handlePoster} />
          {/* <button className="upload_btn" onClick={uploadPoster}>Upload</button> */}
          { preview.poster.url && <img className="preview_img" src={preview.poster.url} alt="Preview poster" /> }
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input type="text" onChange={e => setNewFilm({ ...newFilm, title: e.target.value })} />
        </div>
        <div className="addProductItem">
          <label>Poster Title</label>
          <input type="file" id="posterTitle" onChange={handlePosterTitle} />
          { preview.posterTitle.url && <img className="preview_img" src={preview.posterTitle.url} alt="Preview poster title" /> }
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <textarea rows="5" onChange={e => setNewFilm({ ...newFilm, desc: e.target.value })} />
        </div>
        <div className="addProductItem">
          <label>Is Series</label>
          <select name="isSeries" id="isSeries" onChange={e => setNewFilm({ ...newFilm, isSeries: e.target.value })} >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Year</label>
          <input type="number" min="1900" onChange={e => setNewFilm({ ...newFilm, year: e.target.value })} />
        </div>
        <div className="addProductItem">
          <label>Genre</label>
          <input type="text" onChange={handleGenreChange} />
        </div>
        <div className="addProductItem">
          <label>Limit Age</label>
          <input type="number" min="0" onChange={e => setNewFilm({ ...newFilm, limitAge: e.target.value })} />
        </div>
        <div className="addProductItem">
          <label>Country</label>
          <input type="text" onChange={e => setNewFilm({ ...newFilm, country: e.target.value })} />
        </div>
        <div className="addProductItem">
          <label>Imdb</label>
          <input type="number" min="0" onChange={e => setNewFilm({ ...newFilm, imdb: e.target.value })} />
        </div>
        <div className="addProductItem">
          <label>Poster Sm</label>
          <input type="file" id="posterSm" onChange={handlePosterSm} />
          { preview.posterSm.url && <img className="preview_img" src={preview.posterSm.url} alt="Preview poster sm" /> }
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
        <button className="addProductButton" onClick={handleSubmit} >Create</button>
      </div>
    </div>
  );
}
