import { createSlice, createAsyncThunk  } from '@reduxjs/toolkit'
import { api } from "../api/api";

export const sendDataToApi = createAsyncThunk(
  'data/sendData',

  async (data, { rejectWithValue }) => {


    try {
         const res =  await api.post(`orders`, data); 
        console.log("action.payload", res, data)
       if(res.data.success == true){
        return true;
       }
 
     } catch (error) {
       console.error(error);
 
     }  
  }
);








const dataSlice = createSlice({
  name: 'data',
  initialState: {
    loading: false,
    error: null,
    successMessage: null,
    data: null,
  },
  reducers: {
    clearStatus: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendDataToApi.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(sendDataToApi.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = 'Data sent successfully!';
        state.data = action.payload; 
      })
      .addCase(sendDataToApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to send data.';
      });
  },
});

export const { clearStatus } = dataSlice.actions;

export default dataSlice.reducer;