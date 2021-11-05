import "./newUser.css";

export default function NewUser() {
  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Username</label>
          <input type="text" placeholder="name" />
        </div>
        <div className="newUserItem">
          <label>Full Name</label>
          <input type="text" placeholder="fullname" />
        </div>
        <div className="newUserItem">
          <label>Date Of Birth</label>
          <div className="dateOB">
            <input type="number" placeholder="day" />
            <input type="number" placeholder="month" />
            <input type="number" placeholder="year" />
          </div>
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input type="email" placeholder="email" />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input type="password" placeholder="password" />
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
          <select className="newUserSelect" name="isAdmin" id="isAdmin">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <button className="newUserButton">Create</button>
      </form>
    </div>
  );
}
