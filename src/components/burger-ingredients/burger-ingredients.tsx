import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { useCallback, useEffect, useRef, useState } from 'react';

import { BurgerIngredientsSection } from '@components/burger-ingredients-section/burger-ingredients-section.tsx';
import { IngredientDetails } from '@components/ingredient-details/ingredient-details.tsx';
import { Modal } from '@components/modal/modal.tsx';
import { useAppDispatch, useAppSelector } from '@hooks/useStore.ts';
import {
  clearIngredientInfo,
  getSelectedIngredient,
} from '@services/ingredient-info/slice.ts';
import { getIngredients } from '@services/ingredients/slice.ts';

import type { TIngredient, TIngredientType } from '@utils/types';

import styles from './burger-ingredients.module.css';

const ingredientTypes: Record<TIngredientType, string> = {
  bun: 'Булки',
  main: 'Начинки',
  sauce: 'Соусы',
} as const;

const sectionOrder: TIngredientType[] = ['bun', 'main', 'sauce'];

export const BurgerIngredients = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const ingredients = useAppSelector(getIngredients);
  const ingredientInfo = useAppSelector(getSelectedIngredient);

  const scrollContainerRef = useRef<HTMLUListElement>(null);
  const headingRefs = useRef(new Map<TIngredientType, HTMLHeadingElement>());
  const [activeType, setActiveType] = useState<TIngredientType>('bun');

  const sectionsMap = ingredients.reduce<Map<TIngredientType, TIngredient[]>>(
    (acc, ingredient) => {
      const { type } = ingredient;

      if (!acc.has(type)) {
        acc.set(type, [ingredient]);

        return acc;
      }

      const sectionIngredients = acc.get(type);

      if (sectionIngredients) {
        acc.set(type, [...sectionIngredients, ingredient]);
      }

      return acc;
    },
    new Map()
  );

  const handleScroll = useCallback(() => {
    const scrollContainer = scrollContainerRef.current;

    if (!scrollContainer) return;

    const containerTop = scrollContainer.getBoundingClientRect().top;
    let closestType: TIngredientType | null = null;
    let closestDistance = Infinity;

    sectionOrder.forEach((type) => {
      const heading = headingRefs.current.get(type);

      if (!heading) return;

      const distance = Math.abs(heading.getBoundingClientRect().top - containerTop);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestType = type;
      }
    });

    if (closestType !== null) setActiveType(closestType);
  }, []);

  useEffect(() => {
    handleScroll();
  }, [handleScroll, ingredients]);

  const handleTabClick = (type: TIngredientType): void => {
    const scrollContainer = scrollContainerRef.current;
    const heading = headingRefs.current.get(type);

    if (!scrollContainer || !heading) return;

    const top =
      scrollContainer.scrollTop +
      heading.getBoundingClientRect().top -
      scrollContainer.getBoundingClientRect().top;

    scrollContainer.scrollTo({
      top,
      behavior: 'smooth',
    });
  };

  return (
    <section className={styles.burger_ingredients}>
      <nav>
        <ul className={styles.menu}>
          {sectionOrder.map((type) => (
            <Tab
              key={type}
              value={type}
              active={activeType === type}
              onClick={() => {
                handleTabClick(type);
              }}
            >
              {ingredientTypes[type]}
            </Tab>
          ))}
        </ul>
      </nav>

      <ul
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className={`${styles.list} mt-10 custom-scroll`}
      >
        {[...sectionsMap].map(([type, sectionIngredients]) => {
          return (
            <li key={type}>
              <BurgerIngredientsSection
                name={ingredientTypes[type]}
                ingredients={sectionIngredients}
                headingRef={(element) => {
                  if (element) {
                    headingRefs.current.set(type, element);
                  }

                  return () => {
                    headingRefs.current.delete(type);
                  };
                }}
              />
            </li>
          );
        })}
      </ul>

      {ingredientInfo && (
        <Modal
          title="Детали ингредиента"
          onClose={() => dispatch(clearIngredientInfo())}
        >
          <IngredientDetails data={ingredientInfo} />
        </Modal>
      )}
    </section>
  );
};
