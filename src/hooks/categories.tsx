import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuid } from 'uuid';
import React, {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
} from 'react';
import { usePopup } from './popup';

export interface Category {
  id: string;
  type: 'gasto' | 'entrada';
  name: string;
}

export interface CategoryStorage {
  categories: Category[];
}

export interface Categories {
  expenses: CategoryStorage;
  incomes: CategoryStorage;
}

interface CategoryContextData {
  getCategories(): Categories;
  removeCategories(ids: string[]): void;
  addCategory(name: string, type: 'gasto' | 'entrada'): void;
}

const CategoryContext = createContext<CategoryContextData>(
  {} as CategoryContextData,
);

export const CategoryProvider: React.FC = ({ children }) => {
  const { showPopup } = usePopup();
  const [categoriesExpenses, setCategoriesExpenses] = useState<CategoryStorage>(
    {
      categories: [],
    },
  );
  const [categoriesIncomes, setCategoriesIncomes] = useState<CategoryStorage>({
    categories: [],
  });

  useEffect(() => {
    async function loadCategories() {
      const keyExpenses = `@GoFinance:gasto`;
      const keyIncomes = `@GoFinance:entrada`;

      const expenses = await AsyncStorage.getItem(keyExpenses);
      const incomes = await AsyncStorage.getItem(keyIncomes);

      if (expenses) {
        setCategoriesExpenses(JSON.parse(expenses));
      }
      if (incomes) {
        setCategoriesIncomes(JSON.parse(incomes));
      }
    }
    loadCategories();
  }, []);

  const getCategories = useCallback(() => {
    return {
      expenses: categoriesExpenses,
      incomes: categoriesIncomes,
    };
  }, [categoriesExpenses, categoriesIncomes]);

  const addCategory = useCallback(
    async (name: string, type: 'gasto' | 'entrada') => {
      const key = `@GoFinance:${type}`;
      const cats = type === 'gasto' ? categoriesExpenses : categoriesIncomes;
      if (cats) {
        const newCats: CategoryStorage = {
          categories: [
            {
              id: uuid(),
              name,
              type,
            },
            ...cats.categories,
          ],
        };

        await AsyncStorage.setItem(key, JSON.stringify(newCats));

        if (type === 'gasto') {
          setCategoriesExpenses(newCats);
        } else {
          setCategoriesIncomes(newCats);
        }

        showPopup({
          title: 'Categoria adicionada',
          type: 'check',
          description: `A categoria [${name}] foi adicionada ${
            type === 'gasto' ? 'aos gastos' : 'às entradas'
          }`,
        });
      }
    },
    [categoriesExpenses, categoriesIncomes, showPopup],
  );

  const removeCategories = useCallback(
    async (ids: string[]) => {
      if (ids.length > 0) {
        const keyExpenses = `@GoFinance:gasto`;
        const keyIncomes = `@GoFinance:entrada`;

        const catsExpensesFiltered = categoriesExpenses.categories.filter(
          item => {
            if (
              ids.find(selected => {
                return item.id === selected;
              })
            ) {
              return false;
            }

            return true;
          },
        );
        const catsIncomesFiltered = categoriesIncomes.categories.filter(
          item => {
            if (
              ids.find(selected => {
                return item.id === selected;
              })
            ) {
              return false;
            }

            return true;
          },
        );

        setCategoriesExpenses({ categories: catsExpensesFiltered });
        setCategoriesIncomes({ categories: catsIncomesFiltered });

        await AsyncStorage.setItem(
          keyExpenses,
          JSON.stringify({ categories: catsExpensesFiltered }),
        );
        await AsyncStorage.setItem(
          keyIncomes,
          JSON.stringify({ categories: catsIncomesFiltered }),
        );

        showPopup({
          title: 'Categoria(s) removida(s)',
          type: 'check',
          description: `A(s) categoria(s) selecionada(s) foram removida(s).`,
        });
      } else {
        showPopup({
          title: 'Selecione as categorias',
          type: 'x',
          description: `Você deve selecionar uma ou mais categorias para serem removidas.`,
        });
      }
    },
    [categoriesExpenses.categories, categoriesIncomes.categories, showPopup],
  );

  return (
    <CategoryContext.Provider
      value={{ getCategories, removeCategories, addCategory }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export function useCategories(): CategoryContextData {
  const context = useContext(CategoryContext);

  if (!context) {
    throw new Error('useCategory must be used whitin a CategoryProvider');
  }

  return context;
}
