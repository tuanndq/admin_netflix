import "./episodes.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { getAllEpisodes } from "../../redux/actions/action";

export default function Episodes() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllEpisodes())
  }, [])

  let episodes = useSelector(state => {
    let temp = state.ListFilm.episodes
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
            <img className="productListImg" src={params.row.thumbnail} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "duration", headerName: "Duration", width: 120 },
    { field: "belongsToMovie.seasonName", headerName: "Season", width: 120,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.belongsToMovie.seasonName}
          </div>
        );
      }
    },
    { field: "belongsToMovie.movieName", headerName: "Series", width: 120,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.belongsToMovie.movieName}
          </div>
        );
      }
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/episode/" + params.row._id}>
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
        rows={episodes}
        disableSelectionOnClick
        columns={columns}
        pageSize={9}
        checkboxSelection
      />
    </div>
  );
}
