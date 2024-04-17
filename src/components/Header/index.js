import './index.css'

import {IoCartOutline} from 'react-icons/io5'

const Header = props => {
  const {count} = props
  return (
    <div className="header-container">
      <h1 className="logo-heading">UNI Resto Cafe</h1>
      <div className="nav-items">
        <p className="my-order-txt">My Orders</p>
        <div className="cart-card">
          <IoCartOutline className="cart-icon" />
          <span className="cart-count">{count}</span>
        </div>
      </div>
    </div>
  )
}

export default Header
