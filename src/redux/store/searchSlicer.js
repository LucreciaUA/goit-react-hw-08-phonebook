import { createSlice } from '@reduxjs/toolkit';



export const searchSlicer = createSlice({
    name: 'filter',
    initialState: '',
    reducers: {
        onSearch:(state, action) => {
      return action.payload;
    },
    }
}
)

export const { onSearch } = searchSlicer.actions
export const searchReducer = searchSlicer.reducer