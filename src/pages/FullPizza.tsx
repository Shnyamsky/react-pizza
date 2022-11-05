import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const FullPizza: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState<{
    title: string;
    price: number;
    imageUrl: string;
  }>();

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

  if (!data) {
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
