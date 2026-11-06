import { Counter, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';

import { useAppDispatch } from '@hooks/useStore.ts';
import { setIngredientInfo } from '@services/ingredient-info/slice.ts';

import type { TIngredient } from '@utils/types.ts';
import type * as React from 'react';

import styles from './burger-ingredients-card.module.css';

type TBurgerIngredientsCardProps = {
  data: TIngredient;
  count: number;
};

export const BurgerIngredientsCard = ({
  data,
  count,
}: TBurgerIngredientsCardProps): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const { image, name, price, type } = data;

  const [{ isDrag }, dragRef] = useDrag({
    type,
    item: { ...data },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  return (
    <a
      ref={(node) => {
        dragRef(node);
      }}
      className={`${styles.card} ${isDrag && styles.card_drugged}`}
      onClick={() => dispatch(setIngredientInfo(data))}
    >
      {count !== 0 && (
        <span className={styles.counter}>
          <Counter count={count} size="default" />
        </span>
      )}

      <div className={`${styles.image} ml-4 mr-4`}>
        <img src={image} alt={name} />
      </div>

      <div className={`${styles.price} mt-1`}>
        <span className="mr-2 text text_type_digits-default">{price}</span>

        <CurrencyIcon type="primary" />
      </div>

      <div className={`${styles.title} mt-1 text text_type_main-default`}>{name}</div>
    </a>
  );
};
