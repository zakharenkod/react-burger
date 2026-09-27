import { BurgerIngredientsCard } from '@components/burger-ingredients-card/burger-ingredients-card.tsx';

import type { TIngredient } from '@utils/types.ts';

import styles from './burger-ingredients-section.module.css';

type TBurgerIngredientsSectionProps = {
  name: string;
  ingredients: TIngredient[];
};

const getItemLeftOffsetClass = (index: number): string => {
  return index % 2 !== 0 ? 'ml-6' : '';
};

export const BurgerIngredientsSection = ({
  name,
  ingredients,
}: TBurgerIngredientsSectionProps): React.JSX.Element => {
  return (
    <section className={styles.section}>
      <h3 className={`${styles.title} text text_type_main-medium`}>{name}</h3>

      <ul className={`${styles.list} pt-6 pb-10 pl-4`}>
        {ingredients.map((ingredient, index) => (
          <li
            key={ingredient._id}
            className={`${styles.item} ${getItemLeftOffsetClass(index)} mt-8`}
          >
            <BurgerIngredientsCard
              data={ingredient}
              count={index === 0 ? 1 : undefined}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};
