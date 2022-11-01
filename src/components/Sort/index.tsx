import React from 'react';
import { useState, useRef, useEffect } from 'react';

import { useSelector } from 'react-redux';
import {
  selectSort,
  setSortType,
  SortPropertyEnum,
  SortType,
} from '../../redux/slices/filterSlice';
import { useAppDispatch } from '../../redux/store';

type PopupClick = MouseEvent & {
  path: Node[];
};

export const sortList: SortType[] = [
  { name: 'популярности (убыв)', sortProperty: SortPropertyEnum.RATING_DESC },
  { name: 'популярности (возр)', sortProperty: SortPropertyEnum.RATING_ASC },
  { name: 'цене (убыв)', sortProperty: SortPropertyEnum.PRICE_DESC },
  { name: 'цене (возр)', sortProperty: SortPropertyEnum.PRICE_ASC },
  { name: 'алфавиту (обр)', sortProperty: SortPropertyEnum.TITLE_DESC },
  { name: 'алфавиту', sortProperty: SortPropertyEnum.TITLE_ASC },
];

const Sort: React.FC = () => {
  const sortRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleClickOutSide = (event: MouseEvent) => {
      const _event = event as PopupClick;

      if (sortRef.current && !_event.path.includes(sortRef.current)) {
        setOpen(false);
      }
    };
    document.body.addEventListener('click', handleClickOutSide);
    return () => document.body.removeEventListener('click', handleClickOutSide);
  }, []);

  const sort = useSelector(selectSort);
  const dispatch = useAppDispatch();

  const onClickSort = (item: SortType) => {
    dispatch(setSortType(item));
    setOpen(false);
  };

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setOpen(!open)}>{sort.name}</span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {sortList.map((item) => (
              <li
                className={item.sortProperty === sort.sortProperty ? 'active' : ''}
                key={item.name}
                onClick={() => onClickSort(item)}>
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;