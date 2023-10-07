import {createSlice} from '@reduxjs/toolkit'

const INITIAL_STATE = {
    userToken:null,
    userName:null,
    userId:null
}

const userSlice = createSlice({
    name:'user',
    initialState:INITIAL_STATE,
    reducers:{
        userLogin(state,actions){
            const userDetail = actions.payload;
            state.userName = userDetail.name
            state.userToken = userDetail.token
            state.userId = userDetail._id
        },
        userLogout(state,actions){
            state.userName = ""
            state.userToken  = ""
        }
    }
})

export const userActions = userSlice.actions
export default userSlice.reducer