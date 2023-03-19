import React, { useEffect, useState } from 'react'
import { HomeContainer, RowContainer } from './index'
import '../Css/Main.css'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { useStateValue } from '../context/StateProvider'
import { getFoodItems } from '../Utils/fireBaseFunction'
import { actionType } from '../context/reducer'
function MainContainer() {
  const [{},dispatch]=useStateValue()
  const fetchData=async()=>{
    await getFoodItems().then((data)=>{
     dispatch({type:actionType.SETFOODITEMS,foodItems:data})
    })
 }
 useEffect(() => {
    const DataSetter=async()=>{
      await fetchData()
      setLoading(false)
    }
    DataSetter()
 }, [])
 
  // const [food,setFood]=useState([[]])
  const [loading,setLoading]=useState(true)
  const [{foodItems}]=useStateValue()
  return (
    <>
      <div className="every-component">
        <HomeContainer />
        <div className="row-container">
          <div className="row-title">
            <h1>Our Fresh and Healthy Fruits</h1>
          </div>
          <div className="row-buttons">
            <button><MdChevronLeft size={35} /></button>
            <button><MdChevronRight size={35} /></button>
          </div>
        </div>
        <div className="category-content">
            <RowContainer foodItems={foodItems} loading={loading}/>
        </div>
        </div>
    </>
  )
}

export default MainContainer