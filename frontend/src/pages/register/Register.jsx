import CircularProgress from '@mui/material/CircularProgress';
import { register } from "../../features/currentUser/currentUserSlice"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import "./register.css"

const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [registerUser, setRegisterUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    address: "",
    city: "",
    state: 1,
    password: "",
    confirmpwd: "",
  })

  const {
    firstname, lastname, email, address, city, state, password, confirmpwd,
  } = registerUser

  const { user, isSuccess, isLoading, isError } = useSelector((state) => state.currentUser)

  useEffect(() => {
    if ((user || isSuccess) && (!isError)) {
      navigate("/home")
    }
  }, [user, isSuccess, isError, navigate])

  const handleChange = (e) => {
    setRegisterUser((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch(register(registerUser))
    setTimeout(() => {
      if (user && !isLoading && !isError) {
        navigate("/home")
      }
    }, [2000]);
  }

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form" >
        <h2 className="register-title">Stromboli Steve</h2>
        <div className='input-grp2'>
          <div className='div-grp'>
            <label htmlFor="" className="register-label2">First&nbsp;Name:</label>
            <input type="text" className="register-input2" value={firstname} name="firstname" onChange={handleChange} autoComplete="off" />
          </div>
          <div className='div-grp'>
            <label htmlFor="" className="register-label2">Last&nbsp;Name:</label>
            <input type="text" className="register-input2" value={lastname} name="lastname" onChange={handleChange} autoComplete="off" />
          </div>
        </div>
        <div className="input-grp">
          <label htmlFor="" className="register-label">Email:</label>
          <input type="email" className="register-input" value={email} name="email" onChange={handleChange} autoComplete="off" />
        </div>
        <div className="input-grp">
          <label htmlFor="" className="register-label">Address:</label>
          <input type="text" className="register-input" value={address} name="address" onChange={handleChange} autoComplete="off" />
        </div>
        <div className="input-grp2">
          <div className='div-grp'>
            <label htmlFor="" className="register-label2">City:</label>
            <input type="text" className="register-input2" value={city} name="city" onChange={handleChange} autoComplete="off" />
          </div>
          <div className='div-grp'>
            <label htmlFor="" className="register-label2">State:</label>
            <input type="number" className="register-input2" value={state} name="state" onChange={handleChange} autoComplete="off" />
          </div>
        </div>
        <div className="input-grp">
          <label htmlFor="" className="register-label">Password:</label>
          <input type="password" className="register-input" value={password} name="password" onChange={handleChange} autoComplete="off" />
        </div>
        <div className="input-grp">
          <label htmlFor="" className="register-label">Confirm:</label>
          <input type="password" className="register-input" value={confirmpwd} name="confirmpwd" onChange={handleChange} autoComplete="off" />
        </div>
        {(password !== confirmpwd) ? <span className='validation'>Confirm password is not matched</span> : null}
        <button type="submit" className="register-btn" disabled={!firstname || !lastname || !email || !address || !city || !password || !confirmpwd || (password !== confirmpwd)}>{isLoading ? <CircularProgress size={16} color="inherit" /> : "Register"}</button>
        <Link to="/" className="return-btn">x</Link>
        <span className="register-f-password">By signing up, you agree to the Terms.</span>
        <span className="register-to-login-page">Do you have an account? <Link to="/">Login</Link></span>
      </form>
    </div>
  )
}

export default Register