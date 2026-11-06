import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { useAppDispatch, useAppSelector } from '@hooks/useStore.ts';
import {
  changeIngredientPosition,
  getConstructorIngredients,
} from '@services/constructor-ingredients/slice.ts';
import { CONSTRUCTOR_INGREDIENT } from '@utils/constants.ts';

import type { TConstructorDragItem, TConstructorDropResult } from '@utils/types.ts';
import type * as React from 'react';

import styles from './burger-constructor-sortable-item.module.css';

type TBurgerConstructorSortableItemProps = {
  customId: string;
  index: number;
  canSort: boolean;
  children: React.ReactNode;
};

export const BurgerConstructorSortableItem = ({
  customId,
  index,
  canSort,
  children,
}: TBurgerConstructorSortableItemProps): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const ingredients = useAppSelector(getConstructorIngredients);
  const rowRef = useRef<HTMLLIElement>(null);

  const [{ isDragging }, dragRef] = useDrag<
    TConstructorDragItem,
    TConstructorDropResult,
    { isDragging: boolean }
  >({
    type: CONSTRUCTOR_INGREDIENT,
    canDrag: canSort,
    item: () => ({ customId, originalIndex: index }),
    end: (item, monitor) => {
      if (!monitor.didDrop() || !monitor.getDropResult()?.movedWithinList) {
        dispatch(
          changeIngredientPosition({
            customId: item.customId,
            toIndex: item.originalIndex,
          })
        );
      }
    },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  });

  const [, dropRef] = useDrop<TConstructorDragItem>({
    accept: CONSTRUCTOR_INGREDIENT,
    canDrop: () => canSort,
    hover: (item, monitor) => {
      if (!canSort || !rowRef.current) return;

      const fromIndex = ingredients.findIndex(
        ({ _customId }) => _customId === item.customId
      );
      if (fromIndex === -1 || fromIndex === index) return;

      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) return;

      const { top, bottom } = rowRef.current.getBoundingClientRect();
      const middleY = (bottom - top) / 2;
      const pointerY = clientOffset.y - top;

      if (fromIndex < index && pointerY < middleY) return;
      if (fromIndex > index && pointerY > middleY) return;

      dispatch(changeIngredientPosition({ customId: item.customId, toIndex: index }));
    },
  });

  return (
    <li
      ref={(node) => {
        rowRef.current = node;
        dropRef(dragRef(node));
      }}
      className={[
        'mb-4',
        styles.item,
        isDragging ? styles.item_dragging : '',
        canSort ? styles.item_sortable : '',
      ].join(' ')}
    >
      {children}
    </li>
  );
};
