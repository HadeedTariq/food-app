import { fetchUser } from "../Utils/fetchUser"

 const userInfo=fetchUser()
export const initialState={
    user:userInfo,
    foodItems:null,
    cart:null,
    count:0
}