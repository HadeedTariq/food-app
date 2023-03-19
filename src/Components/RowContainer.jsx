import React, { useEffect, useState } from 'react'
import { MdShoppingBag } from 'react-icons/md'
import { actionType } from '../context/reducer'
import { useStateValue } from '../context/StateProvider'
import '../Css/RowContainer.css'
function RowContainer({ foodItems,loading }) {
  const [count,setCount]=useState(0);
  const [carts, setCart] = useState([])
  const [{ }, dispatch] = useStateValue()
  const changeCart = (e) => {
    setCart([...carts, e])
    setCount(count+1)
  }
  useEffect(() => {
    dispatch({ type: actionType.SETCART, cart: carts })
    dispatch({type:actionType.SETCOUNT,count:count})
  }, [carts,count])

  return (
    <>
      {
        loading ? (<h1>Loading...</h1>) :
          (foodItems?.map((item, index) =>
            <div className="row-contents" key={index}>
              <div className="row-box">
                <img src={item.imgUrl} alt="" />
                <MdShoppingBag size={50} onClick={() => changeCart(item)} />
              </div>
              <div className="row-containers">
                <h1>{item.title}</h1>
                <p>{item.calories}</p>
                <strong><span>$</span>{item.price}</strong>
              </div>
            </div>
          ))
      }
    </>
  )
}

export default RowContainer