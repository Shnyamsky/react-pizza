import React, { useContext, useEffect, useState } from 'react';
import { SearchContext } from '../App';

import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';
import Pagination from '../components/Pagination';

const Home = () => {
  const { searchValue } = useContext(SearchContext);

  const [items, setItems] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({
    name: 'популярности (убыв)',
    sortProperty: '-rating',
  });

  useEffect(() => {
    async function fetchData() {
      try {
        setIsloading(true);
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const searchItems = searchValue ? `search=${searchValue}` : '';
        const sortBy = sortType.sortProperty.replace('-', '');
        const order = sortType.sortProperty.includes('-') ? 'desc' : 'asc';

        await fetch(
          `https://62e016ec98dd9c9df60d8371.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${searchItems}`,
        )
          .then((res) => res.json())
          .then((json) => {
            setItems(json);
            setIsloading(false);
          });
      } catch (error) {
        alert('Не удалось загрузить данные');
        console.error(error);
      }
    }
    fetchData();
    window.scrollTo(0, 0);
  }, [currentPage, searchValue, categoryId, sortType]);

  const renderItems = () => {
    // const filteredItems = items.filter((item) =>
    //   item.title.toLowerCase().includes(searchValue.toLowerCase()),
    // );
    return isLoading
      ? [...new Array(4)].map((_, index) => <Skeleton key={index} />)
      : items.map((item) => <PizzaBlock key={item.id} {...item} />);
  };

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId} onClickCategory={(id) => setCategoryId(id)} />
        <Sort sortType={sortType} onChangeSort={(obj) => setSortType(obj)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{renderItems()}</div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
};

export default Home;
