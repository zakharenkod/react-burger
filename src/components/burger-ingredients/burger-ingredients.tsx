import { Tab } from '@krgaa/react-developer-burger-ui-components';

import { BurgerIngredientsSection } from '@components/burger-ingredients-section/burger-ingredients-section.tsx';

import type { TIngredient, TIngredientType } from '@utils/types';

import styles from './burger-ingredients.module.css';

type TBurgerIngredientsProps = {
  ingredients: TIngredient[];
};

const ingredientTypes: Record<TIngredientType, string> = {
  bun: 'Булки',
  main: 'Начинки',
  sauce: 'Соусы',
} as const;

export const BurgerIngredients = ({
  ingredients,
}: TBurgerIngredientsProps): React.JSX.Element => {
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

  return (
    <section className={styles.burger_ingredients}>
      <nav>
        <ul className={styles.menu}>
          {Object.entries(ingredientTypes).map(([type, name], index) => (
            <Tab
              key={type}
              value={type}
              active={index === 0}
              onClick={() => {
                /* TODO */
              }}
            >
              {name}
            </Tab>
          ))}
        </ul>
      </nav>

      <ul className={`${styles.list} mt-10 custom-scroll`}>
        {[...sectionsMap].map(([type, sectionIngredients]) => {
          return (
            <li key={type}>
              <BurgerIngredientsSection
                name={ingredientTypes[type]}
                ingredients={sectionIngredients}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
};
