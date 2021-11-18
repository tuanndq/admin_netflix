import { DataGrid } from "@material-ui/data-grid";
import { Button } from "@material-ui/core";
import "./listMovie.css";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { Global } from "recharts";
import { getAllFilms } from "../../redux/actions/action";

export default function FilmTable({ films, handleClose, selectedFilms = [] }) {
  const [data, setData] = useState(films);
  const [selected_, setSelected_] = useState(
    films.filter((f) => selectedFilms.includes(f._id)).map((f) => f.id)
  );
  const [selected, setSelected] = useState([]);

  const dispatch = useDispatch();

  const handleSelect = (rows) => {
    let cFilms = [];
    if (rows.length > 0) {
      cFilms = data.filter((f) => rows.includes(f.id)).map((f) => f._id);
    }
    setSelected(cFilms);
    setSelected_(rows);
  };

  const handleCloseModal = () => {
    dispatch({ type: GLOBALTYPES.TOGGLE_MODAL, payload: false });
  };

  const selectFilms = () => {
    dispatch({ type: GLOBALTYPES.SELECTED_FILM, payload: selected });
    dispatch({ type: GLOBALTYPES.TOGGLE_MODAL, payload: false });
  };

  // const selectedFilms = useSelector(state => state.ListFilm.selectedFilm)
  const cSelectedFilms = films
    .filter((f) => selectedFilms.includes(f._id))
    .map((f) => f.id);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "title",
      headerName: "Title",
      width: 290,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.posterSm} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "country", headerName: "Country", width: 160 },
    { field: "year", headerName: "Year", width: 110 },
    { field: "genre", headerName: "Genre", width: 260 },
    { field: "limitAge", headerName: "Limit Age", width: 140 },
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={data}
        disableSelectionOnClick
        onSelectionModelChange={handleSelect}
        columns={columns}
        pageSize={7}
        checkboxSelection
        selectionModel={selected_}
      />
      <div className="control_btn">
        <Button className="aBtn ok_btn" onClick={selectFilms}>
          Ok
        </Button>
        <Button className="aBtn cancel_btn" onClick={handleCloseModal}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
