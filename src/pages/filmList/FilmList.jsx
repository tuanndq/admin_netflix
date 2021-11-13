import "./filmList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { getAllFilms } from "../../redux/actions/action";

export default function FilmList() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllFilms())  
  }, [])

  let films = useSelector(state => {
    let temp = state.ListFilm.allFilms
    temp = temp.map((f, id) => ({ ...f, id: id }))
    return temp
  })

  const handleDelete = (id) => {
    
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "title",
      headerName: "Title",
      width: 280,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.posterSm} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "country", headerName: "Country", width: 120 },
    { field: "year", headerName: "Year", width: 120 },
    { field: "genre", headerName: "Genre", width: 200 },
    { field: "limitAge", headerName: "Limit Age", width: 120 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/film/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="film_list_container">
      <DataGrid
        rows={films}
        disableSelectionOnClick
        columns={columns}
        pageSize={9}
        checkboxSelection
      />
    </div>
  );
}
