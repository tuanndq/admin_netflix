import React from "react";
import axios from "axios";
import "./list.css";
import { Modal, Button, Box } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import FilmTable from "../../components/listMovie/ListMovie";
// import { filmRows } from '../../dummyData'
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import {
  getAllFilms,
  getAllLists,
  updateListById,
} from "../../redux/actions/action";
import { useParams } from "react-router";

export default function List() {
  const dispatch = useDispatch();

  const { id } = useParams();
  React.useEffect(() => {
    dispatch(getAllFilms());
    dispatch(getAllLists());
  }, []);

  const selectedFilm = useSelector((state) => state.ListFilm.selectedFilm);
  let films = useSelector((state) => state.ListFilm.allFilms);
  films = films.map((f, idx) => ({
    ...f,
    id: idx,
  }));
  let list =
    useSelector((state) => {
      let lists = state.ListFilm.lists;
      let temp = lists.filter((l) => l._id == id)[0];
      return temp;
    }) || {};

  let initEditList = { ...list };

  let [editList, setEditList] = React.useState(initEditList);

  const open = useSelector((state) => state.ListFilm.isModalOpen);

  const handleOpen = () => {
    dispatch({ type: GLOBALTYPES.TOGGLE_MODAL, payload: true });
  };
  const handleClose = () => {
    dispatch({ type: GLOBALTYPES.TOGGLE_MODAL, payload: false });
  };
  const handleSubmit = async () => {
    let cSelectedFilm = selectedFilm.map((f) => ({ _id: f }));
    let data = {
      ...editList,
      content: cSelectedFilm,
    };
    dispatch(updateListById(data));
  };

  return (
    <div className="newList">
      <h2>Edit List</h2>
      <br />

      <div className="form_element">
        <label htmlFor="list_title">Title</label>
        <input
          type="text"
          id="list_title"
          value={editList.title}
          onChange={(e) => setEditList({ ...editList, title: e.target.value })}
        />
      </div>

      <div className="form_element">
        <label htmlFor="list_type">Type</label>
        <input
          type="text"
          id="list_type"
          value={editList.type}
          onChange={(e) => setEditList({ ...editList, type: e.target.value })}
        />
      </div>

      <div className="form_element">
        <label htmlFor="list_genre">Genre</label>
        <input
          type="text"
          id="list_genre"
          value={editList.genre}
          onChange={(e) => setEditList({ ...editList, genre: e.target.value })}
        />
      </div>

      <Button className="modal_btn" onClick={handleOpen}>
        Select film
      </Button>
      <br />
      <span>{selectedFilm.length || list.content.length} films chose</span>
      <Modal
        className="film_modal"
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <FilmTable films={films} selectedFilms={list.content} />
      </Modal>

      <br />
      <br />

      <Button className="submit_btn" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
}
