import React, { useEffect, useState } from 'react'
import { MdDelete } from 'react-icons/md'
import { actionType } from '../context/reducer'
import { useStateValue } from '../context/StateProvider'
import '../Css/Cart.css'
function Cart() {
    const [data,setData]=useState([])
    const [{cart,count},dispatch]=useStateValue()
    const [countCart,setCountCart]=useState(count)
    const deleteItem=(e)=>{
        const filterData=data.filter((item)=>item!==e)
        setData(filterData)
        setCountCart(countCart-1)
    }
    useEffect(() => {
        setData(cart)
        
    }, [])
    useEffect(() => {
        dispatch({type:actionType.SETCOUNT,count:countCart})
    }, [countCart])
  return (
    <>
     <div className="every-component">
        <div className="cart-boxes">
        {
            data?.map((item,index)=>
    <div className="carts" key={index}>
       <div className="row-box">
            <img src={item.imgUrl} alt="" />
            <MdDelete size={50} onClick={()=>deleteItem(item)}/>
       </div>
        <div className="row-containers">
          <h1>{item.title}</h1>
          <p>{item.calories}</p>
          <strong><span>$</span>{item.price}</strong>
        </div>
     </div>
     )
}
       </div>
    </div>
    </>
  )
}

export default Cart