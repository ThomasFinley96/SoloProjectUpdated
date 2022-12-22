import Navbar from "../../components/navbar/Navbar"
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import "./profile.css"
import { updateUser } from "../../features/currentUser/currentUserSlice"

const Profile = () => {

  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.currentUser.user)
  
  const [userInfo, setUserInfo] = useState({
    firstname: currentUser.firstname,
    lastname: currentUser.lastname,
    email: currentUser.email,
    address: currentUser.address,
    city: currentUser.city,
    state: currentUser.state,
  })

  const handleChange = (e) => {
    setUserInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch(updateUser(userInfo))
  }

  const {
    firstname, lastname, email, address, city, state
  } = userInfo

  return (
    <>
      <Navbar />
      <section className="profile-container">
        <div className="profile">
          <div className="profile-about-container">
            <h2>Account Info</h2>
            <div className="profile-about">
              <div className="input-grp">
                <label htmlFor="" className="register-label">First Name:</label>
                <input type="text" className="register-input" value={firstname} name="firstname" onChange={handleChange} autoComplete="off" />
              </div>
              <div className="input-grp">
                <label htmlFor="" className="register-label">Last Name:</label>
                <input type="text" className="register-input" value={lastname} name="lastname" onChange={handleChange} autoComplete="off" />
              </div>
              <div className="input-grp">
                <label htmlFor="" className="register-label">Email:</label>
                <input type="text" className="register-input" value={email} name="email" onChange={handleChange} autoComplete="off" />
              </div>
              <div className="input-grp">
                <label htmlFor="" className="register-label">Address:</label>
                <input type="text" className="register-input" value={address} name="address" onChange={handleChange} autoComplete="off" />
              </div>
              <div className="input-grp2">
                <div className='div-grp'>
                  <label htmlFor="" className="register-label2">City:</label>
                  <input type="text" className="register-input3" value={city} name="city" onChange={handleChange} autoComplete="off" />
                </div>
                <div className='div-grp'>
                  <label htmlFor="" className="register-label2">State:</label>
                  <input type="number" className="register-input3" value={state} name="state" onChange={handleChange} autoComplete="off" />
                </div>
              </div>
              <button className="profile-btn" disabled={!firstname || !lastname || !email || !address || !city} onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
export default Profile