import React, { useContext, useEffect, useRef } from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setFilters } from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzaSlice';

import { sortList } from '../components/Sort';
import { SearchContext } from '../App';

import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';
import Pagination from '../components/Pagination';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { categoryId, sort, currentPage } = useSelector((state) => state.filter);
  const { status, items } = useSelector((state) => state.pizza);
  const { searchValue } = useContext(SearchContext);

  const fetchData = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const searchItems = searchValue ? `search=${searchValue}` : '';
    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'desc' : 'asc';

    dispatch(
      fetchPizzas({
        currentPage,
        category,
        searchItems,
        sortBy,
        order,
      }),
    );
  };

  //navigate dependency?
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [currentPage, categoryId, sort]);

  //useSearchParams (react-router-dom)?
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find((sortItem) => sortItem.sortProperty === params.sortProperty);
      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      fetchData();
    }
    isSearch.current = false;
  }, [currentPage, searchValue, categoryId, sort]);

  const renderItems = () => {
    // const filteredItems = items.filter((item) =>
    //   item.title.toLowerCase().includes(searchValue.toLowerCase()),
    // );
    return status === 'loading'
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
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>
            Произошла ошибка <icon>😕</icon>
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
