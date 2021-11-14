import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser, deleteUserById } from "../../redux/actions/action";

export default function UserList() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllUser())  
  }, [])

  let allUsers = useSelector(state => {
    return state.User.allUser.map((u, id) => ({ ...u, id }))
  })
  const handleDelete = (id) => {
    dispatch(deleteUserById(id))
  };
  
  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "username",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.profilePic} alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 250 },
    { field: "isAdmin", headerName: "Is Admin", width: 150,},
    { field: "birthday", headerName: "Birthday", width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            {Object.keys(params.row.birthday).map(k => params.row.birthday[k]).join('/')}
          </div>
        )
      }
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={allUsers}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
