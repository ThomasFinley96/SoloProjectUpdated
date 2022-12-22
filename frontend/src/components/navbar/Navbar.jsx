import { logout, resetAuth } from "../../features/currentUser/currentUserSlice"
import Button from '@mui/material/ButtonGroup';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, Link } from "react-router-dom";
import { getUserOrders } from "../../features/order/orderSlice"

import "./navbar.css"

const Navbar = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.currentUser)
  const { orders } = useSelector((state) => state.order)

  useEffect(() => {
    // getting order list which user created
    dispatch(getUserOrders(user.id))
  }, [dispatch])

  const count = orders? orders.length : 0 

  const handleLogout = async () => {
    await dispatch(logout())
    await dispatch(resetAuth())
    navigate('/')
  }

  return (
    <nav className="nav-wrapper">
      <div className="nav">
        <Link to="/home">
          <div className="nav-ank">Welcome to Stromboli Steves!</div>
        </Link>
        <div className="nav-links">
          {user && <Link to="/home" className="nav-link">Order({count})</Link>}
          {user && <Link to="/profile" className="nav-link">Account</Link>}
          {user && <Button className="group-btn" onClick={handleLogout}>Logout</Button>}         
        </div>
      </div>
    </nav>
  )
}

export default Navbar
