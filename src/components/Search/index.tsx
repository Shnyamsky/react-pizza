import { useEffect, useRef, useMemo, useState } from 'react';
import debounce from 'lodash.debounce';

import { useAppDispatch } from '../../redux/store';
import { setSearchValue } from '../../redux/filter/slice';

import styles from './Search.module.scss';

export const Search: React.FC = () => {
  const dispatch = useAppDispatch();

  const [value, setValue] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const updateSearchValue = useMemo(
    () =>
      debounce((strInput) => {
        dispatch(setSearchValue(strInput));
      }, 500),
    [dispatch],
  );

  useEffect(() => {
    return () => {
      updateSearchValue.cancel();
    };
  }, [updateSearchValue]);

  const onClearClick = () => {
    setValue('');
    dispatch(setSearchValue(''));
    //NOTE: Optional chaining
    inputRef.current?.focus();
  };

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        enableBackground="new 0 0 32 32"
        id="Editable-line"
        version="1.1"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg">
        <circle
          cx="14"
          cy="14"
          fill="none"
          id="XMLID_42_"
          r="9"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
        />
        <line
          fill="none"
          id="XMLID_44_"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
          x1="27"
          x2="20.366"
          y1="27"
          y2="20.366"
        />
      </svg>
      <input
        ref={inputRef}
        className={styles.input}
        placeholder="Ищем пиццу..."
        onChange={onChangeInput}
        value={value}
      />
      {value && (
        <svg
          className={styles.clear}
          onClick={onClearClick}
          data-name="Capa 1"
          id="Capa_1"
          viewBox="0 0 20 19.84"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M10.17,10l3.89-3.89a.37.37,0,1,0-.53-.53L9.64,9.43,5.75,5.54a.37.37,0,1,0-.53.53L9.11,10,5.22,13.85a.37.37,0,0,0,0,.53.34.34,0,0,0,.26.11.36.36,0,0,0,.27-.11l3.89-3.89,3.89,3.89a.34.34,0,0,0,.26.11.35.35,0,0,0,.27-.11.37.37,0,0,0,0-.53Z" />
        </svg>
      )}
    </div>
  );
};
