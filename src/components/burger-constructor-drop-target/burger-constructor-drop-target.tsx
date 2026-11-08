import { useDrop } from 'react-dnd';

import { useAppDispatch } from '@hooks/useStore.ts';
import { addIngredient } from '@services/constructor-ingredients/slice.ts';

import type { TIngredient, TIngredientType } from '@utils/types.ts';
import type * as React from 'react';

import styles from './burger-constructor-drop-target.module.css';

type TBurgerConstructorDummyProps = {
  children: (canDrop: boolean) => React.ReactNode;
  accept: TIngredientType | TIngredientType[];
  className?: string;
};

export const BurgerConstructorDropTarget = ({
  children,
  accept,
  className,
}: TBurgerConstructorDummyProps): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const [{ canDrop }, dropTarget] = useDrop({
    accept,
    drop(ingredient: TIngredient) {
      dispatch(addIngredient(ingredient));
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <div
      className={`${styles.target} ${className ?? ''}`}
      ref={(node) => {
        dropTarget(node);
      }}
    >
      {children(canDrop)}
    </div>
  );
};
