import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';

import { AppHeader } from '@components/app-header/app-header';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor.tsx';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients.tsx';
import { api } from '@utils/api.ts';

import type { TIngredient } from '@utils/types.ts';

import styles from './app.module.css';

export const App = (): React.JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const [ingredients, setIngredients] = useState<TIngredient[] | null>(null);

  useEffect(() => {
    const loadIngredients = async (): Promise<void> => {
      setIsLoading(true);

      try {
        const data = await api.getIngredients();
        setIngredients(data);
      } catch {
        setIngredients(null);
      } finally {
        setIsLoading(false);
      }
    };

    void loadIngredients();
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
        Соберите бургер
      </h1>
      <main className={`${styles.main} pl-5 pr-5`}>
        {isLoading ? (
          <Preloader />
        ) : (
          ingredients !== null && (
            <>
              <BurgerIngredients ingredients={ingredients} />
              <BurgerConstructor ingredients={ingredients} />
            </>
          )
        )}
      </main>
    </div>
  );
};

export default App;
