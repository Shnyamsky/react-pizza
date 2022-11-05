import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { PizzaItem, SearchPizzaParams } from './types';

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
