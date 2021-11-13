import React from 'react'
import axios from 'axios'
import './newList.css'
import { Modal, Button, Box } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import FilmTable from '../../components/listMovie/ListMovie'
import { filmRows } from '../../dummyData'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'

export default function NewList() {
  const selectedFilm = useSelector(state => state.ListFilm.selectedFilm)

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
    setNewList({ ...newList, content: cSelectedFilm })
    await axios.post('http://127.0.0.1:5000/api/lists', newList)
    alert('Create new list successfully!')
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
        <FilmTable films={filmRows} />
      </Modal>

      <br />
      <br />

      <Button className="submit_btn" onClick={handleSubmit} >Submit</Button>
    </div>
  )
}
