
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";

const initialState: {
    id: string,
    email: string,
    accesstoken: string
} = {
    id: "",
    email: "",
    accesstoken: ""
}

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        authData: initialState
    },
    reducers: {
        addAuth: (state, action) => {
            state.authData = action.payload
        },
        removeAuth: (state, action) => {
            state.authData = initialState
            AsyncStorage.setItem("auth", JSON.stringify(null))
        }
    }
})

export const authReducer = authSlice.reducer
export const {addAuth, removeAuth} = authSlice.actions

export const authSelector = (state: any) => state.authReducer.authData
