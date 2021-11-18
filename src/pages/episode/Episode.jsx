import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import './episode.css'
import { Publish } from "@material-ui/icons"
import { createNewEpisode, getAllEpisodes, updateEpisodeById } from "../../redux/actions/action"

export default function NewEpisode() {
  const dispatch = useDispatch()

  const { id } = useParams()
  React.useEffect(() => {
    dispatch(getAllEpisodes())
  }, [])

  const ep = useSelector(state => {
    let cEpisodes = state.ListFilm.episodes
    let temp = cEpisodes.filter(e => e._id == id)[0]
    return temp
  })

  const initEpisode = { ...ep }
  console.log(initEpisode)

  const [newEpisode, setNewEpisode] = useState(initEpisode)

  const handleChange = (e, name) => {
    const belongsto = ['seasonName', 'movieName']
    if (belongsto.includes(name)) {
      let temp = newEpisode.belongsToMovie || {}
      temp[name] = e.target.value
      setNewEpisode({
        ...newEpisode,
        belongsToMovie: temp
      })  
    } else {
      setNewEpisode({
        ...newEpisode,
        [name]: e.target.value
      })
    }
  }

  const handleFile = (e) => {
    let file = e.target.files[0]
    let url = URL.createObjectURL(file)
    setNewEpisode({
      ...newEpisode,
      thumbnail: url,
      thumbnailFile: file,
    })
  }

  const handleSubmit = () => {
    updateEpisodeById(newEpisode)
  }

  return (
    <div className="new-episode">
      <div className="new-episode-element">
        <label htmlFor="title">Title</label>
        <input type="text" id="title" value={newEpisode.title} onChange={(e) => handleChange(e, 'title')} />
      </div>
      <div className="new-episode-element">
        <label htmlFor="desc">Description</label>
        <textarea rows="4" id="desc" value={newEpisode.desc} onChange={(e) => handleChange(e, 'desc')} />
      </div>
      <div className="new-episode-element">
        <label htmlFor="thumbnail">
          Thumbnail
          <Publish className="userUpdateIcon" />
        </label>
        <input type="file" id="thumbnail" hidden onChange={handleFile} />
        { newEpisode.thumbnail && <img className="new-episode-img" src={newEpisode.thumbnail} alt="Preview Thumbnail" /> }
      </div>
      <div className="new-episode-element">
        <label htmlFor="duration">Duration</label>
        <input type="number" id="duration" value={newEpisode.duration} onChange={(e) => handleChange(e, 'duration')} />
      </div>
      <div className="new-episode-element">
        <label htmlFor="seasonName">Belongs To Movie</label>
        <div className="new-episode-element-child">
          <label htmlFor="seasonName">Season name</label>
          <input type="text" id="seasonName" value={(newEpisode.belongsToMovie || {}).seasonName} onChange={(e) => handleChange(e, 'seasonName')} />
          <label htmlFor="movieName">Movie name</label>
          <input type="text" id="movieName" value={(newEpisode.belongsToMovie || {}).movieName} onChange={(e) => handleChange(e, 'movieName')} />
        </div>
      </div>
      <button className="episode_submit_btn" onClick={handleSubmit} >Submit</button>
    </div>
  )
}