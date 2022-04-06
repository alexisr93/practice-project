import { createSlice } from '@reduxjs/toolkit';

export const initModalData = {
  record: {
    id: '',
    username: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    accountCreatedDate: '',
  },
  rowIndex: '',
  visible: false,
}

export const editUserModalSlice = createSlice({
  name: 'modalData',
  initialState: initModalData,
  reducers: {
    setModalData: (state, action) => {
      return action.payload;

    },
    updateModalData: (state, action) => {
      state[action.payload.name] = action.payload.value;
    },
  },
  extraReducers: {
    // async reducers go in this section
  }
})

// Action creators
export const { setModalData, updateModalData } = editUserModalSlice.actions;
export const selectModalData = (state) => state.modalData;
export default editUserModalSlice.reducer;