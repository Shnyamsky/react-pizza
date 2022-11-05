import { RootState } from '../store';

export const selectCart = (state: RootState) => state.cart;
export const selecCartItemById = (id: string) => (state: RootState) =>
  state.cart.items.find((item) => item.id === id);
// Note
// export const selecCartItemById = (id, state) => state.cart.items.find((item) => item.id === id);
