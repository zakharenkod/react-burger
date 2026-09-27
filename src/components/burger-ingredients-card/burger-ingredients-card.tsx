import { Counter, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import * as React from 'react';

import { IngredientDetails } from '@components/ingredient-details/ingredient-details.tsx';
import { Modal } from '@components/modal/modal.tsx';

import type { TIngredient } from '@utils/types.ts';

import styles from './burger-ingredients-card.module.css';

type TBurgerIngredientsCardProps = {
  data: TIngredient;
  count?: number;
};

export const BurgerIngredientsCard = ({
  data,
  count,
}: TBurgerIngredientsCardProps): React.JSX.Element => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { image, name, price } = data;

  const handleClose = (): void => setIsOpen(false);

  return (
    <>
      <a className={styles.card} onClick={() => setIsOpen(true)}>
        {count !== undefined && (
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

      {isOpen && (
        <Modal title="Детали ингредиента" onClose={handleClose}>
          <IngredientDetails data={data} />
        </Modal>
      )}
    </>
  );
};
