import type { TIngredient } from '@utils/types.ts';

import styles from './ingredient-details.module.css';

type TIngredientDetailsProps = {
  data: TIngredient;
};

type NutrientKey = keyof Pick<
  TIngredient,
  'calories' | 'proteins' | 'fat' | 'carbohydrates'
>;

type NutrientItem = { key: NutrientKey; label: string };

const nutrients: NutrientItem[] = [
  { key: 'calories', label: 'Калории,ккал' },
  { key: 'proteins', label: 'Белки, г' },
  { key: 'fat', label: 'Жиры, г' },
  { key: 'carbohydrates', label: 'Углеводы, г' },
];

export const IngredientDetails = ({
  data,
}: TIngredientDetailsProps): React.JSX.Element => {
  return (
    <div className={styles.card}>
      <div className={styles.image_wrapper}>
        <img src={data.image_large} alt={data.name} />
      </div>

      <div className={`${styles.title} mt-4 text text_type_main-medium`}>
        {data.name}
      </div>

      <ul className={`${styles.nutrients} mt-8`}>
        {nutrients.map(({ key, label }) => (
          <li
            key={key}
            className={`${styles.nutrient_item} ml-5 text text_type_main-default text_color_inactive`}
          >
            <dl className={styles.nutrient_definition}>
              <dt className={styles.nutrient_definition_label}>{label}</dt>
              <dd
                className={`${styles.nutrient_definition_value} text text_type_digits-default`}
              >
                {data[key]}
              </dd>
            </dl>
          </li>
        ))}
      </ul>
    </div>
  );
};
