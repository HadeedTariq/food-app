import { createContext,useContext,useReducer } from "react";

const State=createContext()

export const StateProvider=({reducer,initialState,children})=>{
    return(
        <State.Provider value={useReducer(reducer,initialState)}>
            {children}
        </State.Provider>
    )
}
export const useStateValue=()=>useContext (State);