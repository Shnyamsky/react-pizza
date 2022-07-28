import React, { useEffect, useState } from 'react';

import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';

const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsloading] = useState(true);

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
        const sortBy = sortType.sortProperty.replace('-', '');
        const order = sortType.sortProperty.includes('-') ? 'desc' : 'asc';

        await fetch(
          `https://62e016ec98dd9c9df60d8371.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`,
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
  }, [categoryId, sortType]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId} onClickCategory={(id) => setCategoryId(id)} />
        <Sort sortType={sortType} onChangeSort={(obj) => setSortType(obj)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(8)].map((_, index) => <Skeleton key={index} />)
          : items.map((item) => <PizzaBlock key={item.id} {...item} />)}
      </div>
    </div>
  );
};

export default Home;
