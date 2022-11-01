import React from 'react';
import { useSelector } from 'react-redux';
import { setCategoryId } from '../../redux/slices/filterSlice';
import { RootState, useAppDispatch } from '../../redux/store';

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

const Categories: React.FC = () => {
  const categoryId = useSelector((state: RootState) => state.filter.categoryId);
  const dispatch = useAppDispatch();

  // Note: if it's in Props: onChangeCategory: (arg: number) => void
  const onChangeCategory = (index: number) => {
    dispatch(setCategoryId(index));
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((value, index) => (
          <li
            key={value}
            onClick={() => onChangeCategory(index)}
            className={categoryId === index ? 'active' : ''}>
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
