import { createSlice } from "@reduxjs/toolkit";


const rootslice = createSlice({
    name:'root',
    initialState:{
        loading:false,
        portfolioData:null,
        reloadData:false
        },
       reducers:{
        ShowLoading : (state,action) => {
            state.loading = true;
        },
        HideLoading : (state,action) =>{
            state.loading = false;
        },
        SetPortfolioData: (state,action) =>{
         state.portfolioData = action.payload;   
        },
        ReloadData:(state,action)=>{
        state.reloadData=action.payload;
        }
        } 
});

export default rootslice.reducer;

export const {ShowLoading,HideLoading,SetPortfolioData,ReloadData} = rootslice.actions;

