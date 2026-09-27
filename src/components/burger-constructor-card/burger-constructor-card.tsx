import { DragIcon } from '@krgaa/react-developer-burger-ui-components';

import styles from './burger-constructor-card.module.css';

type TBurgerConstructorCardProps = {
  children: React.ReactNode;
  draggable?: boolean;
  className?: string;
};

export const BurgerConstructorCard = ({
  children,
  draggable = false,
  className,
}: TBurgerConstructorCardProps): React.JSX.Element => {
  return (
    <div className={`${styles.card} ${className ?? ''}`}>
      <div className={styles.icon_wrapper}>
        {draggable && <DragIcon type="primary" />}
      </div>

      <div className={styles.element}>{children}</div>
    </div>
  );
};
