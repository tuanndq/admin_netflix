import React from 'react'
import { Button } from '@material-ui/core'
import './login.css'
import { useState } from 'react'
import { loginAction } from '../../redux/actions/action'

export default function Login() {
  const [user, setUser] = useState({})
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(user)
    loginAction(user)
  }
  return (
    <div className="loginForm">
      <form className="form">
        <div className="form_element">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" 
            className="login_input" 
            onChange={e => setUser({...user, email: e.target.value})}
            required
          />
        </div>
        <br />
        <div className="form_element">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" 
            className="login_input" 
            onChange={e => setUser({...user, password: e.target.value})}
            required
          />
        </div>
        <button className="login_btn" onClick={handleSubmit} >Login</button>
      </form>
    </div>
  )
}
