import "./listMovie.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Button } from "@material-ui/core";
import { filmRows, productRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function FilmTable({ films }) {
  const [data, setData] = useState(films);

  const handleSelect = (rows) => {

  }

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

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
    { field: "limitAge", headerName: "Limit Age", width: 140 }
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
      />
      {/* <Button>Cancel</Button>
      <Button>Ok</Button> */}
    </div>
  );
}
