import React from 'react'
import axios from 'axios'
import './newList.css'
import { Modal, Button, Box } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import FilmTable from '../../components/listMovie/ListMovie'
// import { filmRows } from '../../dummyData'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import { createNewList } from '../../redux/actions/action'

export default function NewList() {
  const selectedFilm = useSelector(state => state.ListFilm.selectedFilm)
  let films = useSelector(state => state.ListFilm.allFilms)
  films = films.map((f, idx) => ({
    ...f,
    id: idx
  }))

  console.log(films)

  const initNewList = {
    title: '',
    type: '',
    genre: '',
    content: []
  }

  let [newList, setNewList] = React.useState(initNewList)

  const open = useSelector(state => state.ListFilm.isModalOpen)
  const dispatch = useDispatch()

  const handleOpen = () => { dispatch({ type: GLOBALTYPES.TOGGLE_MODAL, payload: true }) }
  const handleClose = () => { dispatch({ type: GLOBALTYPES.TOGGLE_MODAL, payload: false }) }
  const handleSubmit = async () => {
    let cSelectedFilm = selectedFilm.map(f => ({ _id: f }))
    let data = {
      ...newList,
      content: cSelectedFilm
    }
    dispatch(createNewList(data))
  }

  return (
    <div className="newList">
      <h2>New List</h2>
      <br />
      
      <div className="form_element">
        <label htmlFor="list_title">Title</label>
        <input type="text" id="list_title" 
          value={newList.title} onChange={(e) => setNewList({ ...newList, title: e.target.value })} 
        />
      </div>

      <div className="form_element">
        <label htmlFor="list_type">Type</label>
        <input type="text" id="list_type" 
          value={newList.type} onChange={(e) => setNewList({ ...newList, type: e.target.value })} 
        />
      </div>

      <div className="form_element">
        <label htmlFor="list_genre">Genre</label>
        <input type="text" id="list_genre" 
          value={newList.genre} onChange={(e) => setNewList({ ...newList, genre: e.target.value })} 
        />
      </div>

      <Button className="modal_btn" onClick={handleOpen}>Select film</Button>
      <br />
      <span>{ selectedFilm.length } films chose</span>
      <Modal
        className="film_modal"
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <FilmTable films={films} />
      </Modal>

      <br />
      <br />

      <Button className="submit_btn" onClick={handleSubmit} >Submit</Button>
    </div>
  )
}
