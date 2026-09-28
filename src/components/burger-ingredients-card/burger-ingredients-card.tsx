import { Counter, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';

import { IngredientDetails } from '@components/ingredient-details/ingredient-details.tsx';
import { Modal } from '@components/modal/modal.tsx';
import { useModal } from '@hooks/useModal.ts';

import type { TIngredient } from '@utils/types.ts';
import type * as React from 'react';

import styles from './burger-ingredients-card.module.css';

type TBurgerIngredientsCardProps = {
  data: TIngredient;
  count?: number;
};

export const BurgerIngredientsCard = ({
  data,
  count,
}: TBurgerIngredientsCardProps): React.JSX.Element => {
  const { image, name, price } = data;
  const { isModalOpen, openModal, closeModal } = useModal();

  return (
    <>
      <a className={styles.card} onClick={() => openModal()}>
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

      {isModalOpen && (
        <Modal title="Детали ингредиента" onClose={closeModal}>
          <IngredientDetails data={data} />
        </Modal>
      )}
    </>
  );
};
