import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import qs from 'qs';

import { RootState, useAppDispatch } from '../redux/store';
import { useSelector } from 'react-redux';
import { setFilters } from '../redux/filter/slice';
import { fetchPizzas } from '../redux/pizza/asyncActions';
import { SearchPizzaParams, Status } from '../redux/pizza/types';

import { sortList } from '../components/Sort';

import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';
import Pagination from '../components/Pagination';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = useRef<boolean>(false);
  const isMounted = useRef<boolean>(false);

  const { searchValue, categoryId, sort, currentPage } = useSelector(
    (state: RootState) => state.filter,
  );
  const { status, items } = useSelector((state: RootState) => state.pizza);

  const fetchData = async () => {
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

    window.scrollTo(0, 0);
  };

  // // Если изменили параметры и был первый рендер
  // useEffect(() => {
  //   if (isMounted.current) {
  //     const params = {
  //       categoryId: categoryId > 0 ? categoryId : null,
  //       sortProperty: sort.sortProperty,
  //       currentPage,
  //     };

  //     const queryString = qs.stringify(params, { skipNulls: true });

  //     navigate(`/?${queryString}`);
  //   }

  //   if (!window.location.search) {
  //     dispatch(fetchPizzas({} as SearchPizzaParams));
  //   }
  // }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  useEffect(() => {
    fetchData();
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  // useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
  //     const sort = sortList.find((sortItem) => sortItem.sortProperty === params.sortBy);

  //     dispatch(
  //       setFilters({
  //         searchValue: params.searchItems,
  //         categoryId: Number(params.category),
  //         currentPage: Number(params.currentPage),
  //         sort: sort || sortList[0],
  //       }),
  //     );
  //     isSearch.current = true;
  //   }
  // }, [currentPage, searchValue, categoryId, sort]);

  ///////////////////////////////////////////////////////////////////

  // //navigate dependency?
  // useEffect(() => {
  //   if (isMounted.current) {
  //     const queryString = qs.stringify({
  //       sortProperty: sort.sortProperty,
  //       categoryId,
  //       currentPage,
  //     });
  //     navigate(`?${queryString}`);
  //   }
  //   isMounted.current = true;
  // }, [currentPage, categoryId, sort]);

  // //useSearchParams (react-router-dom)?
  // useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(window.location.search.substring(1));
  //     const sort = sortList.find((sortItem) => sortItem.sortProperty === params.sortProperty);
  //     dispatch(
  //       setFilters({
  //         ...params,
  //         sort,
  //       }),
  //     );
  //     isSearch.current = true;
  //   }
  // }, []);

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  //   if (!isSearch.current) {
  //     fetchData();
  //   }
  //   isSearch.current = false;
  // }, [currentPage, searchValue, categoryId, sort]);

  const renderItems = () => {
    // const filteredItems = items.filter((item) =>
    //   item.title.toLowerCase().includes(searchValue.toLowerCase()),
    // );
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
