import React, { useState } from 'react'
import '../Css/CreateItem.css'
import {IoFastFoodOutline} from 'react-icons/io5'
import {MdCloudUpload,MdFoodBank,MdAttachMoney} from 'react-icons/md'
import {category} from '../Utils/foodData'
import Loader from './Loader'
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '../firebase'
import { getFoodItems, saveItem } from '../Utils/fireBaseFunction'
import { useStateValue } from '../context/StateProvider'
import { actionType } from '../context/reducer'
function CreateItem() {
  const [color,setColor]=useState({})
  const [selectCategory, setSelectCategory] = useState("Select Category")
  const [isLoading,setIsLoading]=useState(false)
  const [imageAsset,setImageAsset]=useState(null)
  const [title,setTitle]=useState('')
  const [price,setPrice]=useState('')
  const [calories,setCalories]=useState('')
  const [msg,setMsg]=useState('')
  const [{},dispatch]=useStateValue()
  const fetchData=async()=>{
    await getFoodItems().then((data)=>{
     dispatch({type:actionType.SETFOODITEMS,foodItems:data})
    })
 }
  const clearData=()=>{
    setSelectCategory('Select Category')
    setImageAsset(null)
    setTitle('')
    setPrice('')
    setCalories('')
  }
  const changeCategory=(e)=>{
    setSelectCategory(e.target.value)
  }
  const uploadImage=(e)=>{
    setIsLoading(true)
    const imageFile=e.target.files[0]
    const storageRef=ref(storage,`Images/${Date.now()}-${imageFile.name}`)
    const uploadProgress=uploadBytesResumable(storageRef,imageFile)
    uploadProgress.on('state_changed',(snapshot)=>{
      const uploadBar=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
    },(error)=>{
      console.log(error)
    },()=>{
      getDownloadURL(uploadProgress.snapshot.ref)
      .then((downloadUrl)=>{
        setImageAsset(downloadUrl)
        setTimeout(() => {
          setIsLoading(false)
        }, 3000);
        
      })
    })
  }
  const deleteImage=()=>{
    setIsLoading(true)
    const deletRef=ref(storage,imageAsset)
    deleteObject(deletRef).then(()=>{
      setIsLoading(false)
      setImageAsset(null)
    })
  }
  const saveData=()=>{
    if((!imageAsset || !title || !price || !calories)){
      setColor({backgroundColor:"red"})
      setMsg('Please fill all the fields')
    }
    else{
      const data={
        title:title,
        imgUrl:imageAsset,
        price:price,
        calories:calories,
        category:selectCategory,
        qty:1,
        id:`${Date.now()}`
      }
      saveItem(data)
      fetchData()
      setColor({backgroundColor:"green"})
      setMsg('Item added successfully')
      setTimeout(() => {
        setMsg('')
        setColor({})
      }, 2000);
      clearData()
    }
  }
  return (
    <>
     <div className="every-component">
      <div className="create-component">
         <section className="edit-section">
          <h1 style={color} >{msg}</h1>
        <div className="title-section">
          <IoFastFoodOutline size={30}/>
          <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder='Give Title' />
        </div>
        <div className="category-box">
          <select className='selector' value={selectCategory} onChange={changeCategory}>
            <option>Select Category</option>
            {
              category.map((item,index)=>
              <option key={index}>{item.name}</option>
              )
            }
          </select>
        </div>
        <div className="uploader">
          {
          isLoading ? <Loader/>:<>
            {
              !imageAsset?( <>
              <label className='label'>
              <div className='upload-data'>
               <MdCloudUpload size={40} cursor='pointer'/>
                <p>Click here to upload file</p>
               </div>
               <input type="file" accept='image/*' name='uploadimage' onChange={uploadImage} />
               </label>
              </>
              ):
              <div className='image-asset'>
               <img src={imageAsset} alt="" />
               <div className="btn bg-red">
                <button onClick={deleteImage}>Delete</button>
               </div>
              </div>
            }
            </>
          }
        </div>
        <div className="title-section">
          <MdFoodBank size={30}/>
          <input type="text" value={calories} onChange={(e)=>setCalories(e.target.value)} name="" id="" />
        </div>
        <div className="title-section">
          <MdAttachMoney size={30}/>
          <input type="number" value={price} onChange={(e)=>setPrice(e.target.value)} name="" id="" />
        </div>
        <div className="btn">
          <button onClick={saveData}>Save</button>
        </div>
         </section>
      </div>
     </div>
    </>
  )
}
export default CreateItem