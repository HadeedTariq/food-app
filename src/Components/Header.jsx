import React, { useEffect, useState } from 'react'
import '../Css/Header.css'
import logo from '../images/logo.jpg'
import {RiShoppingBasket2Fill,RiAccountCircleFill,RiMenu2Line} from 'react-icons/ri'
import {MdAdd,MdLogout} from 'react-icons/md'
import {motion} from 'framer-motion'
import { signInWithPopup, signOut } from 'firebase/auth'
import { auth, provider } from '../firebase'
import { useStateValue } from '../context/StateProvider'
import { actionType } from '../context/reducer'
import { useNavigate } from 'react-router-dom'
function Header() {
    const navigate=useNavigate()
    const [transformation,setTransformation]=useState({
        transform: "translateY(0%)"
    })
    const setMenu=()=>{
        if(transformation.transform==='translateY(0%)')
        setTransformation({
            transform:'translateY(-100%)'
        })
        else{
            setTransformation({
                transform: "translateY(0%)"
            })
        }
    }
    
    
    const [{user,count},dispatch]=useStateValue()
    const [dropDown,setDropDown]=useState(false)
    const login=async()=>{
        const {user:{providerData}}=await signInWithPopup(auth,provider)
        dispatch({type:actionType.SETUSER,user:providerData[0]})
        localStorage.setItem('user',JSON.stringify(providerData[0]))
    }
    const logOut=async()=>{
        await signOut(auth)
        localStorage.clear()
        dispatch({type:actionType.SETUSER,user:null})
        setDropDown(!dropDown)
        navigate('/')
    }
    const showMenu=()=>{
        if(user){
        setDropDown(!dropDown)
        }
    }
    const newItem=(e)=>{
        navigate(e)
        setDropDown(false)
    }
  return (
    <>
    <div className="menu-bar">
     <div className="header">
        <div className="ham-burger" onClick={setMenu}>
            <RiMenu2Line size={30}/>
        </div>
        <nav className="nav" style={transformation}>
            <div className="logo">
                <img src={logo} alt="" />
                <h3 onClick={()=>newItem('/')}>Al-Halal</h3>
            </div>
     <div className="nav-content">
         <ul className="ul">
              <li onClick={()=>newItem('/')}>Home</li>
              <div className="cart">
              <li onClick={()=>newItem('/cart')}>
                <RiShoppingBasket2Fill size={30}/>
              </li>
              <p>{count}</p>
              </div>
              <div className="account">
              <motion.li whileTap={{scale:0.3}} >
                {
                 user?
                  <img onClick={showMenu} className='user-logo' src={user.photoURL} alt='user'/>:<RiAccountCircleFill size={30} onClick={login}/>
                }
                 </motion.li>
                {
               dropDown && <div className="cart-information">
                   <p onClick={()=>newItem('/createItem')}>New Item <MdAdd/></p>
                   <p onClick={logOut}>LogOut <MdLogout/></p>
                </div>
                }
                    </div>
                </ul>
            </div>
        </nav>
     </div>
     </div>
    </>
  )
}

export default Header