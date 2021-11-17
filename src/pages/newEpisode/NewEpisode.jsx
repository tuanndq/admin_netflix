import { useState } from "react";
import "./newEpisode.css";
import { Publish } from "@material-ui/icons";
import { createNewEpisode } from "../../redux/actions/action";
import { useDispatch } from "react-redux";

export default function NewEpisode() {
  const [newEpisode, setNewEpisode] = useState({});
  const dispatch = useDispatch();

  const handleChange = (e, name) => {
    const belongsto = ["seasonName", "movieName"];
    if (belongsto.includes(name)) {
      let temp = newEpisode.belongsToMovie || {};
      temp[name] = e.target.value;
      setNewEpisode({
        ...newEpisode,
        belongsToMovie: temp,
      });
    } else {
      setNewEpisode({
        ...newEpisode,
        [name]: e.target.value,
      });
    }
  };

  const handleFile = (e) => {
    let file = e.target.files[0];
    let url = URL.createObjectURL(file);
    setNewEpisode({
      ...newEpisode,
      thumbnail: url,
      thumbnailFile: file,
    });
  };

  const handleSubmit = () => {
    dispatch(createNewEpisode(newEpisode));
  };

  return (
    <div className="new-episode">
      <div className="new-episode-element">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          onChange={(e) => handleChange(e, "title")}
        />
      </div>
      <div className="new-episode-element">
        <label htmlFor="desc">Description</label>
        <textarea
          rows="4"
          id="desc"
          onChange={(e) => handleChange(e, "desc")}
        />
      </div>
      <div className="new-episode-element">
        <label htmlFor="thumbnail">
          Thumbnail
          <Publish className="userUpdateIcon" />
        </label>
        <input type="file" id="thumbnail" hidden onChange={handleFile} />
        {newEpisode.thumbnail && (
          <img
            className="new-episode-img"
            src={newEpisode.thumbnail}
            alt="Preview Thumbnail"
          />
        )}
      </div>
      <div className="new-episode-element">
        <label htmlFor="duration">Duration</label>
        <input
          type="number"
          id="duration"
          onChange={(e) => handleChange(e, "duration")}
        />
      </div>
      <div className="new-episode-element">
        <label htmlFor="seasonName">Belongs To Movie</label>
        <div className="new-episode-element-child">
          <label htmlFor="seasonName">Season name</label>
          <input
            type="text"
            id="seasonName"
            onChange={(e) => handleChange(e, "seasonName")}
          />
          <label htmlFor="movieName">Movie name</label>
          <input
            type="text"
            id="movieName"
            onChange={(e) => handleChange(e, "movieName")}
          />
        </div>
      </div>
      <button className="episode_submit_btn" onClick={handleSubmit}>
        Create
      </button>
    </div>
  );
}
