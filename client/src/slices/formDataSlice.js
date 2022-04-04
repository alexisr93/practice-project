import { createSlice } from '@reduxjs/toolkit';

export const initFormData = {
  id: '',
  username: '',
  firstName: '',
  lastName: '',
  phoneNumber: '',
  accountCreatedDate: '',
}

export const formDataSlice = createSlice({
  name: 'formData',
  initialState: initFormData,
  reducers: {
    setFormData: (state, action) => {
      return action.payload;
    },
    updateFormData: (state, action) => {
      state[action.payload.name] = action.payload.value;
    },
  },
  extraReducers: {
    // async reducers go in this section
  }
})

// Action creators
export const { setFormData, updateFormData } = formDataSlice.actions;
export const selectFormData = (state) => state.formData;
export default formDataSlice.reducer;