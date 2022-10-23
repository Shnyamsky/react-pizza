import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzaStatus', async (filters, thunkAPI) => {
  const { currentPage, category, searchItems, sortBy, order } = filters;
  const { data } = await axios.get(
    `https://62e016ec98dd9c9df60d8371.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${searchItems}`,
  );

  //NOTE: check it!
  // if (!data.length) {
  //   return thunkAPI.rejectWithValue('Пицц нет...');
  // }
  // return thunkAPI.fulfillWithValue(data);

  return data;
});

const initialState = {
  status: 'loading', // loading | success | error
  items: [],
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      console.log('Идет отправка');
      state.items = [];
      state.status = 'loading';
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      console.log('Данные получены', state);
      state.items = action.payload;
      state.status = 'success';
    },
    [fetchPizzas.rejected]: (state) => {
      console.log('Ошибка получания данных');
      state.items = [];
      state.status = 'error';
    },
  },
});

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
