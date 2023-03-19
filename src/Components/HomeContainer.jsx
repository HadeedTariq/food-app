import React from 'react'
import '../Css/Home.css'
import {images} from '../images'
import { foodData } from '../Utils/foodData'
function HomeContainer() {
  return (
    <>
        <div className="home-page">
          <div className="delievery-boy">
            <h3>Bike delievery available</h3>
            <img src={images.bike} alt="" />
          </div>
          <div className="home-content">
             <div className="left-side">
               <h1>
                 The Best Halal Place In <span>Your City</span> For Halal Foods
               </h1>
               <p>Are you halal food enthausiast then you will happy to know that in your city. We are openning our halal food branch where you can eat your favourite food items and many other halal things so please visit us on our branch address xyz</p>
               <button>Order now</button>
             </div>
             <div className="right-side">
               <img className='bg' src={images.bg} alt="" />
               <div className="food-section">
                 {
                  foodData?.map((food,index)=>
                  <div className="food-box" key={index}>
                    <img src={food.img} alt="" />
                    <h3>{food.name}</h3>
                    <p>{food.desc}</p>
                    <strong><span>$</span>{food.price}</strong>
                  </div>
                  )
                 }
               </div>
             </div>
          </div>
        </div>
    </>
  )
}

export default HomeContainer