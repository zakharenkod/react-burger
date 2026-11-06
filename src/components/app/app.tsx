import { Button, Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';

import { AppHeader } from '@components/app-header/app-header';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor.tsx';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients.tsx';
import { useAppDispatch, useAppSelector } from '@hooks/useStore.ts';
import { loadIngredients } from '@services/ingredients/actions.ts';
import {
  getIngredients,
  getIngredientsError,
  getIngredientsLoading,
} from '@services/ingredients/slice.ts';

import type * as React from 'react';

import styles from './app.module.css';

export const App = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(getIngredientsLoading);
  const error = useAppSelector(getIngredientsError);
  const ingredients = useAppSelector(getIngredients);

  useEffect(() => {
    void dispatch(loadIngredients());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
        Соберите бургер
      </h1>

      {error ? (
        <main className={`${styles.main} pl-5 pr-5`}>
          <div className={styles.error}>
            <h2 className="text text_type_main-medium mb-10">Что-то пошло не так</h2>

            <Button
              htmlType="button"
              size="large"
              type="primary"
              onClick={() => {
                void dispatch(loadIngredients());
              }}
            >
              Повторить
            </Button>
          </div>
        </main>
      ) : (
        <main className={`${styles.main} pl-5 pr-5`}>
          {isLoading ? (
            <Preloader />
          ) : (
            ingredients !== null && (
              <>
                <BurgerIngredients />
                <BurgerConstructor />
              </>
            )
          )}
        </main>
      )}
    </div>
  );
};

export default App;
