import {configureStore } from '@reduxjs/toolkit'
import userAuth from './userAuthentification'
import adminDashboard  from './AdminHome'

export const store = configureStore({
    reducer:{
        user:userAuth,
        admin:adminDashboard
    }
})