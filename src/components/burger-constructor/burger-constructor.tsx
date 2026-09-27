import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from '@krgaa/react-developer-burger-ui-components';
import * as React from 'react';

import { BurgerConstructorCard } from '@components/burger-constructor-card/burger-constructor-card.tsx';
import { Modal } from '@components/modal/modal.tsx';
import { OrderDetails } from '@components/order-details/order-details.tsx';

import type { TIngredient, TOrder } from '@utils/types';

import styles from './burger-constructor.module.css';

type TBurgerConstructorProps = {
  ingredients: TIngredient[];
};

const orderData: TOrder = {
  id: '034536',
  title: 'Ваш заказ начали готовить',
  description: 'Дождитесь готовности на орбитальной станции',
};

export const BurgerConstructor = ({
  ingredients,
}: TBurgerConstructorProps): React.JSX.Element => {
  const buns = ingredients.filter(({ type }) => type === 'bun');
  const mainIngredients = ingredients.filter(({ type }) => type !== 'bun');
  const [bun] = buns;

  const [isOpen, setIsOpen] = React.useState(false);
  const [order, setOrder] = React.useState<TOrder | null>(null);

  const handleClose = (): void => setIsOpen(false);

  const completeOrder = (): void => {
    setOrder({ ...orderData });
  };

  const handleOrderComplete = (): void => {
    completeOrder();
    setIsOpen(true);
  };

  return (
    <section className={`${styles.burger_constructor}`}>
      {bun && (
        <BurgerConstructorCard className="mb-4 pr-4 pl-4">
          <ConstructorElement
            price={bun.price}
            text={bun.name}
            thumbnail={bun.image}
            extraClass={styles.element}
            type="top"
            isLocked
          />
        </BurgerConstructorCard>
      )}

      <ul className={`${styles.list} custom-scroll`}>
        {mainIngredients.map((ingredient, index) => (
          <li key={ingredient._id} className={index !== 0 ? 'mt-4' : ''}>
            <BurgerConstructorCard draggable className="pl-4">
              <ConstructorElement
                price={ingredient.price}
                text={ingredient.name}
                thumbnail={ingredient.image}
                extraClass={styles.element}
              />
            </BurgerConstructorCard>
          </li>
        ))}
      </ul>

      {bun && (
        <BurgerConstructorCard className="mt-4 pr-4 pl-4">
          <ConstructorElement
            price={bun.price}
            text={bun.name}
            thumbnail={bun.image}
            extraClass={styles.element}
            type="bottom"
            isLocked
          />
        </BurgerConstructorCard>
      )}

      <div className={`${styles.total} mt-10 pr-4 pl-4`}>
        <div className={`${styles.price} mr-10`}>
          <span className="mr-2 text text_type_digits-medium">610</span>

          <CurrencyIcon type="primary" />
        </div>

        <Button
          htmlType="button"
          size="large"
          type="primary"
          onClick={handleOrderComplete}
        >
          Оформить заказ
        </Button>
      </div>

      {order && isOpen && (
        <Modal onClose={handleClose}>
          <OrderDetails
            id={order.id}
            title={order.title}
            description={order.description}
          />
        </Modal>
      )}
    </section>
  );
};
