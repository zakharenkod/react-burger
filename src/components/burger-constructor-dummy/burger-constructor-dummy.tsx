import type * as React from 'react';

import styles from './burger-constructor-dummy.module.css';

type TBurgerConstructorDummyProps = {
  type?: 'top' | 'bottom';
  text: string;
  isHighlighted?: boolean;
};

export const BurgerConstructorDummy = ({
  type,
  text,
  isHighlighted = false,
}: TBurgerConstructorDummyProps): React.JSX.Element => {
  const typeClass = type === 'top' ? styles.dummy_top : styles.dummy_bottom;
  const className = [
    styles.dummy,
    type ? typeClass : '',
    isHighlighted ? styles.highlighted : '',
    'text',
    'text_type_main-default',
  ].join(' ');

  return <div className={className}>{text}</div>;
};
