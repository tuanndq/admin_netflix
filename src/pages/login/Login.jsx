import React from 'react'
import { Button } from '@material-ui/core'
import './login.css'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginAction } from '../../redux/actions/action'

export default function Login() {
  const [user, setUser] = useState({})
  const dispatch = useDispatch()
  
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(loginAction(user))
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
            autoComplete="off"
          />
        </div>
        <br />
        <div className="form_element">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" 
            className="login_input" 
            onChange={e => setUser({...user, password: e.target.value})}
            required
            autoComplete="off"
          />
        </div>
        <button className="login_btn" onClick={handleSubmit} >Login</button>
      </form>
    </div>
  )
}
