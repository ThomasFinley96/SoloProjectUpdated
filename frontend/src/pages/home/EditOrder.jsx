import Navbar from "../../components/navbar/Navbar"
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getOrder, updateOrder } from "../../features/order/orderSlice"
import { useNavigate, useParams } from "react-router-dom"
import Select from "react-select";
import * as constants from "../../assets/constants"

const EditOrder = () => {
  const [orderInfo, setOrderInfo] = useState({
    method: 0,    
    size: 0,
    cheese: 0,
    sauce: 0,
    favourites: 0,
    price: 32,
  })
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { order } = useSelector((state) => state.order)

  useEffect(() => {
    dispatch(getOrder(id))
    setOrderInfo({
      method: order.method,    
      size: order.size,
      cheese: order.cheese,
      sauce: order.sauce,
      favourites: order.favourites,
      price: order.price,
    })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch(updateOrder({...orderInfo, "id": id}))
    setTimeout(() => {
      navigate('/home')
    }, [1000]);
  }

  const handleCancel = () => {
    navigate('/home')
  }

  const handleMethodSelect = (e) => {
    // update the state of Order
    setOrderInfo((prev) => ({ ...prev, 'method': e.value }))
  }

  const handleSizeSelect = (e) => {
    // update the state of Order
    setOrderInfo((prev) => ({ ...prev, 'size': e.value }))
  }

  const handleCheeseSelect = (e) => {
    // update the state of Order
    setOrderInfo((prev) => ({ ...prev, 'cheese': e.value }))
  }

  const handleSauceSelect = (e) => {
    // update the state of Order
    setOrderInfo((prev) => ({ ...prev, 'sauce': e.value }))
  }

  const handleFavouritesSelect = (e) => {
    // update the state of Order
    setOrderInfo((prev) => ({ ...prev, 'favourites': e.value }))
  }

  const {
    method, size, cheese, sauce, favourites, price
  } = orderInfo

  return (
    <>
      <Navbar />
      <section className="profile-container">
        <div className="profile">
          <div className="profile-about-container">
            <h2>Edit Order</h2>
            <div className="profile-about">
              <div className="input-grp">
                <label htmlFor="" className="register-label">Method:</label>                
                <Select
                    className="select"
                    options={constants.METHODS_TYPES}
                    onChange={handleMethodSelect}
                    value={constants.METHODS_TYPES.filter(function(option) {
                      return option.value === method;
                    })}
                    label="Single Select"
                />
              </div>
              <div className="input-grp">
                <label htmlFor="" className="register-label">Size:</label>                
                <Select
                    className="select"
                    options={constants.SIZES_TYPES}
                    onChange={handleSizeSelect}
                    value={constants.SIZES_TYPES.filter(function(option) {
                      return option.value === size;
                    })}
                    label="Single Select"
                />
              </div>
              <div className="input-grp">
                <label htmlFor="" className="register-label">Cheese:</label>                
                <Select
                    className="select"
                    options={constants.CHEESES_TYPES}
                    onChange={handleCheeseSelect}
                    value={constants.CHEESES_TYPES.filter(function(option) {
                      return option.value === cheese;
                    })}
                    label="Single Select"
                />
              </div>
              <div className="input-grp">
                <label htmlFor="" className="register-label">Sauce:</label>                
                <Select
                    className="select"
                    options={constants.SAUCES_TYPES}
                    onChange={handleSauceSelect}
                    value={constants.SAUCES_TYPES.filter(function(option) {
                      return option.value === sauce;
                    })}
                    label="Single Select"
                />
              </div>
              <div className="input-grp">
                <label htmlFor="" className="register-label">Stromboli Type:</label>                
                <Select
                    className="select"
                    options={constants.STROMBOLI_TYPES}
                    onChange={handleFavouritesSelect}
                    value={constants.STROMBOLI_TYPES.filter(function(option) {
                      return option.value === favourites;
                    })}
                    label="Single Select"
                />
              </div>
              <div className="input-grp">
                <label htmlFor="" className="register-label">Price:</label>                
                <input type="text" className="order-input" value={price} disabled/>
              </div>
              <div className="btn-container">
                <button className="order-btn" onClick={handleSubmit}>Submit</button>
                <button className="order-btn" onClick={handleCancel}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
export default EditOrder