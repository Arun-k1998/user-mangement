import {createSlice} from '@reduxjs/toolkit'

const INITIAL_STATE = {
    usersList : []
}

const dashBoardSlice = createSlice({
    name:'users Table',
    initialState:INITIAL_STATE,
    reducers:{
        UsersList(state,actions){
            const userDetails = actions.payload
            state.usersList = userDetails
        },
        DeleteUser(state,actions){
            const userId = actions.payload
            state.usersList = state.usersList.filter((user)=> user._id !== userId)
        },
        updateUser(status,actions){
            const {userId,updatedUser} = actions.payload
            status.usersList.forEach((user)=>{
                if(user._id === userId){
                    user = updatedUser
                }
            })
        }
        
    }
})

export const {UsersList,DeleteUser,updateUser} = dashBoardSlice.actions
export default dashBoardSlice.reducer