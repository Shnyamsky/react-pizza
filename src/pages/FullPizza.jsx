import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const FullPizza = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`https://62e016ec98dd9c9df60d8371.mockapi.io/items/${id}`);
        setData(data);
      } catch (error) {
        console.log(error);
        navigate('/');
      }
    })();
  }, []);

  if (!Object.keys(data).length) {
    return (
      <div className="container">
        <h3>Загрузка...</h3>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>{data.title}</h1>
      <h3>
        {new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(
          Number(data.price),
        )}
      </h3>
      <img src={data.imageUrl} alt="picture" />
    </div>
  );
};

export default FullPizza;
