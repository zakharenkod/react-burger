import doneImage from '@/assets/images/done.png';
import { Button, Preloader } from '@krgaa/react-developer-burger-ui-components';

import { useAppSelector } from '@hooks/useStore.ts';
import { getOrder, getOrderError, getOrderLoading } from '@services/order/slice.ts';

import type * as React from 'react';

import styles from './order-details.module.css';

type TOrderDetailsProps = {
  retryHandler: () => void;
};

export const OrderDetails = ({
  retryHandler,
}: TOrderDetailsProps): React.JSX.Element => {
  const orderData = useAppSelector(getOrder);
  const isOrderLoading = useAppSelector(getOrderLoading);
  const isOrderError = useAppSelector(getOrderError);
  const orderId = orderData?.order.number ?? '';

  if (isOrderLoading) {
    return (
      <div className={`${styles.card} ${styles.title} pt-15 pb-15`}>
        <h2 className="text text_type_main-medium mb-10">Идет оформление заказа...</h2>

        <Preloader />
      </div>
    );
  }

  if (isOrderError) {
    return (
      <div className={`${styles.card} ${styles.title} pt-15 pb-15`}>
        <h2 className="text text_type_main-medium mb-10">
          При оформлении заказа произошла ошибка
        </h2>

        <Button htmlType="button" size="large" type="primary" onClick={retryHandler}>
          Повторить
        </Button>
      </div>
    );
  }

  return (
    <div className={`${styles.card} pt-15 pb-15`}>
      <div className="text text_type_digits-large">{orderId}</div>

      <div className="mt-8 text text_type_main-medium">идентификатор заказа</div>

      <div className={`${styles.image_wrapper} mt-15`}>
        <img src={doneImage} alt="Заказ успешно оформлен" width={120} height={120} />
      </div>

      <div className={`${styles.title} mt-15 text text_type_main-default`}>
        Ваш заказ начали готовить
      </div>

      <div
        className={`${styles.description} mt-2 text text_type_main-default text_color_inactive`}
      >
        Дождитесь готовности на орбитальной станции
      </div>
    </div>
  );
};
