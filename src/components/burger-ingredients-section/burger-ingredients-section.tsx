import { BurgerIngredientsCard } from '@components/burger-ingredients-card/burger-ingredients-card.tsx';
import { useAppSelector } from '@hooks/useStore.ts';
import { getIngredientCounts } from '@services/constructor-ingredients/slice.ts';

import type { TIngredient } from '@utils/types.ts';

import styles from './burger-ingredients-section.module.css';

type TBurgerIngredientsSectionProps = {
  name: string;
  ingredients: TIngredient[];
  headingRef: React.Ref<HTMLHeadingElement>;
};

const getItemLeftOffsetClass = (index: number): string => {
  return index % 2 !== 0 ? 'ml-6' : '';
};

export const BurgerIngredientsSection = ({
  name,
  ingredients,
  headingRef,
}: TBurgerIngredientsSectionProps): React.JSX.Element => {
  const ingredientCounts = useAppSelector(getIngredientCounts);

  return (
    <section className={styles.section}>
      <h3 ref={headingRef} className={`${styles.title} text text_type_main-medium`}>
        {name}
      </h3>

      <ul className={`${styles.list} pt-6 pb-10 pl-4`}>
        {ingredients.map((ingredient, index) => (
          <li
            key={ingredient._id}
            className={`${styles.item} ${getItemLeftOffsetClass(index)} mt-8`}
          >
            <BurgerIngredientsCard
              data={ingredient}
              count={ingredientCounts.get(ingredient._id) ?? 0}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};
