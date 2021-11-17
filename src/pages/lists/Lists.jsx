import "./lists.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { getAllLists } from "../../redux/actions/action";

export default function Lists() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllLists())  
  }, [])

  let lists = useSelector(state => {
    let temp = state.ListFilm.lists
    temp = temp.map((f, id) => ({ ...f, id: id }))
    return temp
  })

  const handleDelete = (id) => {
    
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 250 },
    {
      field: "title",
      headerName: "Title",
      width: 280,
    },
    { field: "type", headerName: "Type", width: 120 },
    { field: "genre", headerName: "Genre", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/list/" + params.row._id}>
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
    <div className="lists-container">
      <DataGrid
        rows={lists}
        disableSelectionOnClick
        columns={columns}
        pageSize={9}
        checkboxSelection
      />
    </div>
  );
}
