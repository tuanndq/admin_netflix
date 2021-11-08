import React from 'react'
import './newList.css'
import { Modal, Button, Box } from '@material-ui/core'
import FilmTable from '../../components/listMovie/ListMovie'
import { filmRows } from '../../dummyData'

export default function NewList() {
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => { setOpen(true) }
  const handleClose = () => { setOpen(false) }

  return (
    <div className="newList">
      <h2>New List</h2>
      <br />
      
      <div className="form_element">
        <label htmlFor="list_title">Title</label>
        <input type="text" id="list_title" />
      </div>

      <div className="form_element">
        <label htmlFor="list_type">Type</label>
        <input type="text" id="list_type" />
      </div>

      <div className="form_element">
        <label htmlFor="list_genre">Genre</label>
        <input type="text" id="list_genre" />
      </div>

      <Button className="modal_btn" onClick={handleOpen}>Select film</Button>
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

      <Button className="submit_btn">Submit</Button>
    </div>
  )
}
