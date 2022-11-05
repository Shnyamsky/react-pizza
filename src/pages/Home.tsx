import React, { useEffect, useCallback } from 'react';

import { RootState, useAppDispatch } from '../redux/store';
import { useSelector } from 'react-redux';
import { fetchPizzas } from '../redux/pizza/asyncActions';
import { Status } from '../redux/pizza/types';

import { Categories, PizzaBlock, Skeleton, Sort, Pagination } from '../components/';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  const { searchValue, categoryId, sort, currentPage } = useSelector(
    (state: RootState) => state.filter,
  );
  const { status, items } = useSelector((state: RootState) => state.pizza);

  const fetchData = useCallback(async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const searchItems = searchValue ? `search=${searchValue}` : '';
    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'desc' : 'asc';

    dispatch(
      fetchPizzas({
        currentPage: String(currentPage),
        category,
        searchItems,
        sortBy,
        order,
      }),
    );
  }, [categoryId, sort, searchValue, currentPage, dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, [fetchData]);

  const renderItems = () => {
    return status === Status.LOADING
      ? [...new Array(4)].map((_, index) => <Skeleton key={index} />)
      : items.map((item) => <PizzaBlock key={item.id} {...item} />);
  };

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === Status.ERROR ? (
        <div className="content__error-info">
          <h2>
            Произошла ошибка <span>😕</span>
          </h2>
          <p>Повторите попытку позже</p>
        </div>
      ) : (
        <div className="content__items">{renderItems()}</div>
      )}
      <Pagination />
    </div>
  );
};

export default Home;
