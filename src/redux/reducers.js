import { createSlice } from "@reduxjs/toolkit";

export const dataSlice = createSlice({
    name: "saibullion",
    initialState: {
        clientDetails: [],
        referanceDetails: [],
        mainProduct: [],
        referanceProduct: [],
        popup: {},

    },
    reducers: {
        setClientData: (state, action) => {
            // console.log("client",action.payload)
            return { ...state, clientDetails: action.payload };
        },
        setReferanceData: (state, action) => {
            return { ...state, referanceDetails: action.payload };
        },
        setMainProduct: (state, action) => {
            return { ...state, mainProduct: action.payload };
        },
        setReferanceProduct: (state, action) => {
            return { ...state, referanceProduct: action.payload };
        },
        setPopup: (state, action) => {
            return { ...state, popup: action.payload };
        }
    }
});
export const { setClientData, setMainProduct, setReferanceData, setReferanceProduct, setPopup } = dataSlice.actions;
export default dataSlice.reducer;