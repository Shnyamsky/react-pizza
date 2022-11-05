import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchPizzas } from './asyncActions';

import { PizzaItem } from './types';
import { Status } from './types';
import { PizzaSliceState } from './types';

const initialState: PizzaSliceState = {
  status: Status.LOADING,
  items: [],
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<PizzaItem[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      console.log('Идет отправка');
      state.items = [];
      state.status = Status.LOADING;
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      console.log('Данные получены', state);
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      console.log('Ошибка получания данных');
      state.items = [];
      state.status = Status.ERROR;
    });
  },

  // NOTE: without TS may be useable
  // extraReducers: {
  //   [fetchPizzas.pending]: (state) => {
  //     console.log('Идет отправка');
  //     state.items = [];
  //     state.status = 'loading';
  //   },
  //   [fetchPizzas.fulfilled]: (state, action) => {
  //     console.log('Данные получены', state);
  //     state.items = action.payload;
  //     state.status = 'success';
  //   },
  //   [fetchPizzas.rejected]: (state) => {
  //     console.log('Ошибка получания данных');
  //     state.items = [];
  //     state.status = 'error';
  //   },
  // },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
