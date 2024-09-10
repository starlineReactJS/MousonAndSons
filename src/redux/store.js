import { configureStore } from "@reduxjs/toolkit";
import dataReducer from '../redux/reducers'

export const store = configureStore({
    reducer: dataReducer
})