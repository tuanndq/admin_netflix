import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import "./user.css";
import { useState } from "react";
import { URL } from "../../redux/actions/globalTypes";
import { editUserById } from "../../redux/actions/action";

export default function User() {
  const { userId } = useParams()
  const user = useSelector(state => state.User.allUser.filter(u => u._id == userId)[0])

  const [editUser, setEditUser] = useState(user)

  const handleChange = (e, name) => {
    const birthday = ['day', 'month', 'year']
    if (!birthday.includes(name)) {
      setEditUser({
        ...editUser,
        [name]: e.target.value
      })
    } else {
      let tempBir = editUser.birthday
      tempBir[name] = e.target.value
      setEditUser({
        ...editUser,
        birthday: tempBir
      })
    }
  }

  const handleAvatar = (e) => {
    let file = e.target.files[0]
    let url = URL.createObjectUrl(file)
    setEditUser({
      ...editUser,
      profilePic: url,
      profilePicFile: file
    })
  }

  const upload = async (file, type) => {
    let formData = new FormData()
    formData.append(type, file)
    try {
      type = type.toLowerCase()
      let response = await axios({
        method: 'post',
        url: `${URL.BASE_URL}/upload/${type}`,
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      return response.data.url
    } catch(err) {
      console.log(err) 
    }
  }

  const handleUpdate = async () => {
    try {
      let data = editUser
      if (editUser.profilePicFile) {
        let url = await upload(editUser.profilePicFile, 'image')
        data = { ...editUser, profilePic: url }
      }
      editUserById(data)
    } catch (err) {

    }
  }

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src={user.profilePic}
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{user.username}</span>
              <span className="userShowUserTitle">{user.isAdmin ? "Admin" : "User"}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{user.username}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">{Object.keys(user.birthday).map(k => user.birthday[k]).join('/')}</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            {/* <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{user.phoneNumber || "todo"}</span>
            </div> */}
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{user.email}</span>
            </div>
            {/* <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">{user.country || "todo"}</span>
            </div> */}
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <div className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  value={editUser.username}
                  className="userUpdateInput"
                  onChange={(e) => handleChange(e, 'username')}
                />
              </div>
              {/* <div className="userUpdateItem">
                <label>Full Name</label>
                <input
                  type="text"
                  value={editUser.fullName || "todo"}
                  className="userUpdateInput"
                  onChange={handleFullName}
                />
              </div> */}
              <div className="userUpdateItem">
                <label>Date of birth</label>
                <div className="dateOB">
                  <input type="number" 
                    value={editUser.birthday.day}
                    className="userUpdateInput"
                    onChange={(e) => handleChange(e, 'day')}
                  />
                  <input type="number" 
                    value={editUser.birthday.month}
                    className="userUpdateInput"
                    onChange={(e) => handleChange(e, 'month')}
                  />
                  <input type="number" 
                    value={editUser.birthday.year}
                    className="userUpdateInput"
                    onChange={(e) => handleChange(e, 'year')}
                  />
                </div>
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  value={editUser.email}
                  className="userUpdateInput"
                  onChange={(e) => handleChange(e, 'email')}
                />
              </div>
              <div className="userUpdateItem">
                <label>New Password</label>
                <input
                  type="password"
                  className="userUpdateInput"
                  onChange={(e) => handleChange(e, 'newPassword')}
                />
              </div>
              <div className="userUpdateItem">
                <label>Is Admin</label>
                <select className="" name="isAdmin" id="isAdmin"
                  value={editUser.isAdmin || false}
                  onChange={(e) => handleChange(e, 'isAdmin')}
                >
                  <option value="true" >Yes</option>
                  <option value="false" >No</option>
                </select>
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src={editUser.profilePic}
                  alt="Profile picture"
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }}
                  onChange={handleAvatar}
                />
              </div>
              <button className="userUpdateButton" onClick={handleUpdate} >Update</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
