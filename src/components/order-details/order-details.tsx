import doneImage from '@/assets/images/done.png';

import styles from './order-details.module.css';

type TOrderDetailsProps = {
  id: string;
  title: string;
  description: string;
};

export const OrderDetails = ({
  id,
  title,
  description,
}: TOrderDetailsProps): React.JSX.Element => {
  return (
    <div className={`${styles.card} pt-15 pb-15`}>
      <div className="text text_type_digits-large">{id}</div>

      <div className="mt-8 text text_type_main-medium">идентификатор заказа</div>

      <div className={`${styles.image_wrapper} mt-15`}>
        <img src={doneImage} alt="" width={120} height={120} />
      </div>

      <div className={`${styles.title} mt-15 text text_type_main-default`}>{title}</div>

      <div
        className={`${styles.description} mt-2 text text_type_main-default text_color_inactive`}
      >
        {description}
      </div>
    </div>
  );
};
