import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useDrop } from 'react-dnd';

import { BurgerConstructorCard } from '@components/burger-constructor-card/burger-constructor-card.tsx';
import { BurgerConstructorDropTarget } from '@components/burger-constructor-drop-target/burger-constructor-drop-target.tsx';
import { BurgerConstructorDummy } from '@components/burger-constructor-dummy/burger-constructor-dummy.tsx';
import { BurgerConstructorSortableItem } from '@components/burger-constructor-sortable-item/burger-constructor-sortable-item.tsx';
import { Modal } from '@components/modal/modal.tsx';
import { OrderDetails } from '@components/order-details/order-details.tsx';
import { useModal } from '@hooks/useModal.ts';
import { useAppDispatch, useAppSelector } from '@hooks/useStore.ts';
import {
  clearConstructorIngredients,
  getConstructorBun,
  getConstructorIngredients,
  getConstructorTotalPrice,
  removeIngredient,
} from '@services/constructor-ingredients/slice.ts';
import { createOrder } from '@services/order/actions.ts';
import { getOrder, getOrderLoading } from '@services/order/slice.ts';
import { CONSTRUCTOR_INGREDIENT } from '@utils/constants.ts';

import type { TConstructorDragItem, TConstructorDropResult } from '@utils/types.ts';
import type * as React from 'react';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const isOrderLoading = useAppSelector(getOrderLoading);
  const order = useAppSelector(getOrder);
  const bun = useAppSelector(getConstructorBun);
  const totalPrice = useAppSelector(getConstructorTotalPrice);
  const mainIngredients = useAppSelector(getConstructorIngredients);
  const canSort = mainIngredients.length > 1;
  const [, listDropRef] = useDrop<TConstructorDragItem, TConstructorDropResult>({
    accept: CONSTRUCTOR_INGREDIENT,
    canDrop: () => canSort,
    drop: () => ({ movedWithinList: true }),
  });

  const { isModalOpen, openModal, closeModal } = useModal();

  const elementCloseHandler = (customId: string): void => {
    dispatch(removeIngredient(customId));
  };

  const handleOrderComplete = (): void => {
    if (!bun) return;

    openModal();

    if (isOrderLoading) return;

    const mainIngredientIds = mainIngredients.map(({ _id }) => _id);
    const bunId = bun._id;
    const order = {
      ingredients: [bunId, ...mainIngredientIds, bunId],
    };

    void dispatch(createOrder(order));
  };

  const modalCloseHandler = (): void => {
    if (order?.success) {
      dispatch(clearConstructorIngredients());
    }

    closeModal();
  };

  return (
    <section className={`${styles.burger_constructor}`}>
      <BurgerConstructorDropTarget accept="bun" className={styles.dropTarget_bun}>
        {(canDrop) => (
          <BurgerConstructorCard className="mb-4 pr-4 pl-4">
            {!bun ? (
              <BurgerConstructorDummy
                type="top"
                text="Выберите булки"
                isHighlighted={canDrop}
              />
            ) : (
              <ConstructorElement
                price={bun.price}
                text={bun.name}
                thumbnail={bun.image}
                extraClass={styles.element}
                type="top"
                isLocked
              />
            )}
          </BurgerConstructorCard>
        )}
      </BurgerConstructorDropTarget>

      <BurgerConstructorDropTarget accept={['main', 'sauce']}>
        {(canDrop) => (
          <ul
            ref={(node) => {
              listDropRef(node);
            }}
            className={`${styles.list} custom-scroll`}
          >
            {mainIngredients.length === 0 ? (
              <li>
                <BurgerConstructorCard className="mb-4 pr-4 pl-4">
                  <BurgerConstructorDummy
                    text="Выберите начинку"
                    isHighlighted={canDrop}
                  />
                </BurgerConstructorCard>
              </li>
            ) : (
              mainIngredients.map((ingredient, index) => (
                <BurgerConstructorSortableItem
                  key={ingredient._customId}
                  customId={ingredient._customId}
                  index={index}
                  canSort={canSort}
                >
                  <BurgerConstructorCard draggable={canSort} className="pl-4">
                    <ConstructorElement
                      price={ingredient.price}
                      text={ingredient.name}
                      thumbnail={ingredient.image}
                      extraClass={styles.element}
                      handleClose={() => elementCloseHandler(ingredient._customId)}
                    />
                  </BurgerConstructorCard>
                </BurgerConstructorSortableItem>
              ))
            )}
          </ul>
        )}
      </BurgerConstructorDropTarget>

      <BurgerConstructorDropTarget accept="bun" className={styles.dropTarget_bun}>
        {(canDrop) => (
          <BurgerConstructorCard className="mb-4 pr-4 pl-4">
            {!bun ? (
              <BurgerConstructorDummy
                type="bottom"
                text="Выберите булки"
                isHighlighted={canDrop}
              />
            ) : (
              <ConstructorElement
                price={bun.price}
                text={bun.name}
                thumbnail={bun.image}
                extraClass={styles.element}
                type="bottom"
                isLocked
              />
            )}
          </BurgerConstructorCard>
        )}
      </BurgerConstructorDropTarget>

      <div className={`${styles.total} mt-10 pr-4 pl-4`}>
        <div className={`${styles.price} mr-10`}>
          <span className="mr-2 text text_type_digits-medium">{totalPrice}</span>

          <CurrencyIcon type="primary" />
        </div>

        <Button
          htmlType="button"
          size="large"
          type="primary"
          disabled={!bun}
          onClick={handleOrderComplete}
        >
          Оформить заказ
        </Button>
      </div>

      {isModalOpen && (
        <Modal onClose={modalCloseHandler}>
          <OrderDetails retryHandler={handleOrderComplete} />
        </Modal>
      )}
    </section>
  );
};
