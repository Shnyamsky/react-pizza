import axios from 'axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

// NOTE: if all fields have a string type: ... = Record<string, string> (Record<key, value>)
export type FetchPizzas = {
  currentPage: number;
  category: string;
  searchItems: string;
  sortBy: string;
  order: 'asc' | 'desc';
};

type PizzaItem = {
  id: string;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface PizzaSliceState {
  status: Status;
  items: PizzaItem[];
}

export type SearchPizzaParams = {
  currentPage: string;
  category: string;
  searchItems: string;
  sortBy: string;
  order: string;
};

const initialState: PizzaSliceState = {
  status: Status.LOADING,
  items: [],
};

export const fetchPizzas = createAsyncThunk<PizzaItem[], SearchPizzaParams>(
  'pizza/fetchPizzaStatus',
  async (filters /*, thunkAPI*/) => {
    const { currentPage, category, searchItems, sortBy, order } = filters;
    const { data } = await axios.get<PizzaItem[]>(
      `https://62e016ec98dd9c9df60d8371.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${searchItems}`,
    );

    //NOTE: check it!
    // if (!data.length) {
    //   return thunkAPI.rejectWithValue('Пицц нет...');
    // }
    // return thunkAPI.fulfillWithValue(data);

    return data;
  },
);

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

export const selectPizza = (state: RootState) => state.filter.sort;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
