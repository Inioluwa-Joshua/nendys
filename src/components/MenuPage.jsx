import React from 'react'
import { useStateValue } from '../context/StateProvider'
import CartContainer from './CartContainer'
import MenuContainer from './MenuContainer'
import MenuContainerTwo from './MenuContainerTwo'

const MenuPage = () => {
  const [{ foodItems, cartShow }, dispatch] = useStateValue();
  return (
    <div>
        <MenuContainer />
        {/* <MenuContainerTwo /> */}
        {cartShow && <CartContainer />}
    </div>
  )
}

export default MenuPage