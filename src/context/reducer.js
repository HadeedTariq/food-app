export const actionType={
    SETUSER:"Set-User",
    SETFOODITEMS:"Set-Food-Items",
    SETCART:"Set-Cart",
    SETCOUNT:"Set-Count"
}
const reducer=(state,action)=>{
    if(actionType.SETUSER===action.type){
        return {
            ...state,
            user:action.user
        }
    }
    else if(actionType.SETFOODITEMS===action.type){
        return{
            ...state,
            foodItems:action.foodItems
        }
    }
    else if(actionType.SETCART===action.type){
        return{
            ...state,
            cart:action.cart
        }
    }
    else if(actionType.SETCOUNT===action.type){
        return{
            ...state,
            count:action.count
        }
    }
    else{
        return state
    }
}
export default reducer;