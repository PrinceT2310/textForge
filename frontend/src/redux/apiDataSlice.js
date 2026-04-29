import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../utilis/axios";
import { toast } from "react-toastify";

// const API_URL = import.meta.env.VITE_API_URL;

export const generateTest = createAsyncThunk("api/generateTest",
  async (payload)=>{
    try{
      const {topic, content, difficulty} = payload;
      const response = await axios.post(`/generate`,{
        topic,content,difficulty
      },{
        headers:{
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      toast.success("Test Generated ✅")
      return response.data
    }catch(error){
      console.error("Error generating test:", error);
      toast.error("Somethinng went wrong ⚠️")
      throw error;
    }
  }
)

const apiDataSlice = createSlice({
  name: "apiData",
  initialState:{
    loading:false,
    data:[],
    error:null
  },
  reducers:{
  },
  extraReducers:(builder)=>{
    builder
      .addCase(generateTest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateTest.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(generateTest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
})

export default apiDataSlice.reducer;