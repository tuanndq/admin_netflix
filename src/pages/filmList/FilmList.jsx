import "./filmList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { filmRows, productRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function FilmList() {
  const [data, setData] = useState(filmRows);

  console.log(data)

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
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
            <Link to={"/film/" + params.row.id}>
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
    <div className="productList">
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
