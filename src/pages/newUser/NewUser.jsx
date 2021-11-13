import "./newUser.css";
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createNewUser } from "../../redux/actions/action";

export default function NewUser() {
  let initNewUser = {
    username: null,
    email: null,
    password: null,
    birthday: {
      day: null,
      month: null,
      year: null
    },
    isAdmin: false,
  }

  const [newUser, setNewUser] = useState(initNewUser)

  const handleChange = (e, name) => {
    setNewUser({
      ...newUser,
      [name]: e.target.value
    })
  }

  const handleBirthday = (e, name) => {
    let birthday = newUser.birthday
    birthday[name] = e.target.value
    setNewUser({
      ...newUser,
      birthday
    })
  }

  const handleSubmit = () => {
    createNewUser(newUser)
  }

  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <div className="newUserForm">
        <div className="newUserItem">
          <label>Username</label>
          <input type="text" placeholder="name" onChange={(e) => handleChange(e, 'username')} />
        </div>
        <div className="newUserItem">
          <label>Full Name</label>
          <input type="text" placeholder="fullname" />
        </div>
        <div className="newUserItem">
          <label>Date Of Birth</label>
          <div className="dateOB">
            <input type="number" placeholder="day" onChange={(e) => handleBirthday(e, 'day')} />
            <input type="number" placeholder="month" onChange={(e) => handleBirthday(e, 'month')} />
            <input type="number" placeholder="year" onChange={(e) => handleBirthday(e, 'year')} />
          </div>
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input type="email" placeholder="email" onChange={(e) => handleChange(e, 'email')} />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input type="password" placeholder="password" onChange={(e) => handleChange(e, 'password')} />
        </div>
        <div className="newUserItem">
          <label>Phone</label>
          <input type="text" placeholder="phone number" />
        </div>
        <div className="newUserItem">
          <label>Address</label>
          <input type="text" placeholder="address" />
        </div>
        <div className="newUserItem">
          <label>Gender</label>
          <div className="newUserGender">
            <input type="radio" name="gender" id="male" value="male" />
            <label for="male">Male</label>
            <input type="radio" name="gender" id="female" value="female" />
            <label for="female">Female</label>
          </div>
        </div>
        <div className="newUserItem">
          <label>Is Admin</label>
          <select className="newUserSelect" name="isAdmin" id="isAdmin"
            value={newUser.isAdmin}
            onChange={(e) => handleChange(e, 'isAdmin')}
          >
            <option value="true" >Yes</option>
            <option value="false" >No</option>
          </select>
        </div>
        <button className="newUserButton" onClick={handleSubmit} >Create</button>
      </div>
    </div>
  );
}
