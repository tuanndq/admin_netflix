import { Link } from "react-router-dom";
import { useState } from "react";
import "./film.css";
import Chart from "../../components/chart/Chart";
import { filmRows, productData } from "../../dummyData";
import { Publish } from "@material-ui/icons";

export default function Film(film) {
  let initEditFilm = {
    title: film.title,
    desc: film.desc,
    poster: film.poster,
    trailer: film.trailer,
    video: film.video,
    year: film.year,
    limitAge: film.limitAge,
    genre: film.genre,
    country: film.country,
    actors: film.actors,
    isSeries: film.isSeries,
    posterTitle: film.posterTitle,
    posterSm: film.posterSm,
    imdb: film.imdb
  }

  const [editFilm, setEditFilm] = useState(initEditFilm)

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Film</h1>
        <Link to="/newfilm">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        {/* <div className="productTopLeft">
              <Chart data={productData} dataKey="Sales" title="Views"/>
          </div> */}
        <div className="productTopRight">
          <div className="productInfoTop">
            <img
              src={editFilm.poster}
              alt=""
              className="productInfoImg"
            />
            <span className="productName">{editFilm.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <span className="productInfoValue">{editFilm._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Ngày tạo:</span>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <span className="productInfoValue">{new Date((editFilm.createdAt).toString()).toGMTString()}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Cập nhật lần cuối:</span>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <span className="productInfoValue">{new Date((editFilm.updatedAt).toString()).toGMTString()}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Title</label>
            <input type="text" placeholder="Name..." value={editFilm.title}/>
            <label>Country</label>
            <input type="text" value={editFilm.country}/>
            <label>Is Series</label>
            <select name="isSeries" id="isSeries">
              <option value="yes" selected={editFilm.isSeries}>Yes</option>
              <option value="no" selected={!editFilm.isSeries}>No</option>
            </select>
            <label>Description</label>
            <textarea rows="5" value={editFilm.desc}/>
            <label>Genre</label>
            <input type="text" value={editFilm.genre}/>
            <label>Limit Age</label>
            <input type="text" value={editFilm.limtAge}/>
            <label>Year</label>
            <input type="number" value={editFilm.year}/>
            <label>Imdb</label>
            <input type="number" value={editFilm.imdb.$numberDecimal}/>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img
                src={editFilm.posterSm}
                alt=""
                className="productUploadImg"
              />
              <label for="file">
                <Publish />
              </label>
              <input type="file" id="file" style={{ display: "none" }} />
            </div>
            <button className="productButton">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}
