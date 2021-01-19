import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useCallback, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { usePopup } from './popup';

export interface FinancialItem {
  id: string;
  category: string;
  name: string;
  value: number;
  recurring: boolean;
  first?: string;
  times?: number;
}

export interface FinancialStorage {
  items: FinancialItem[];
}

export interface Financial {
  expenses: FinancialStorage;
  incomes: FinancialStorage;
}

interface FinancialContextData {
  addExpense(data: Omit<FinancialItem, 'id'>): void;
  addIncome(data: Omit<FinancialItem, 'id'>): void;
  getExpenses(): FinancialStorage;
  getIncomes(): FinancialStorage;
  removeAllExpenses(): void;
  // getFinancial(): Financial;
}

const FinancialContext = createContext<FinancialContextData>(
  {} as FinancialContextData,
);

export const FinancialProvider: React.FC = ({ children }) => {
  const { showPopup } = usePopup();
  const [expenses, setExpenses] = useState<FinancialStorage>({ items: [] });
  const [incomes, setIncomes] = useState<FinancialStorage>({ items: [] });

  const addExpense = useCallback(
    async ({
      category,
      name,
      value,
      recurring,
      first,
      times,
    }: Omit<FinancialItem, 'id'>) => {
      if (!category || !name || !value) {
        showPopup({
          title: 'Erro ao adicionar gasto',
          type: 'x',
          description: `Você precisa preencher todos os campos.`,
        });
        return;
      }
      const key = `@GoFinance:expenses`;
      const expense: FinancialItem = {
        id: uuid(),
        category,
        name,
        value,
        recurring,
        first,
        times,
      };
      const newExpenses: FinancialStorage = {
        items: [expense, ...expenses.items],
      };
      setExpenses(newExpenses);
      await AsyncStorage.setItem(key, JSON.stringify(newExpenses));

      showPopup({
        title: 'Gasto adicionado',
        type: 'check',
        description: `O gasto foi adicionado com sucesso.`,
      });
    },
    [expenses.items, showPopup],
  );

  const addIncome = useCallback(
    async ({
      category,
      name,
      value,
      recurring,
      first,
      times,
    }: Omit<FinancialItem, 'id'>) => {
      if (!category || !name || !value) {
        showPopup({
          title: 'Erro ao adicionar entrada',
          type: 'x',
          description: `Você precisa preencher todos os campos.`,
        });
        return;
      }
      const key = `@GoFinance:incomes`;
      const income: FinancialItem = {
        id: uuid(),
        category,
        name,
        value,
        recurring,
        first,
        times,
      };
      const newIncomes: FinancialStorage = {
        items: [income, ...incomes.items],
      };
      setIncomes(newIncomes);
      await AsyncStorage.setItem(key, JSON.stringify(newIncomes));

      showPopup({
        title: 'Entrada adicionada',
        type: 'check',
        description: `A entrada foi adicionada com sucesso.`,
      });
    },
    [incomes.items, showPopup],
  );

  const getExpenses = useCallback(() => {
    return expenses;
  }, [expenses]);

  const getIncomes = useCallback(() => {
    return incomes;
  }, [incomes]);

  const removeAllExpenses = useCallback(async () => {
    const key = `@GoFinance:expenses`;
    await AsyncStorage.removeItem(key);
    setExpenses({ items: [] });
  }, []);

  return (
    <FinancialContext.Provider
      value={{
        addExpense,
        getExpenses,
        removeAllExpenses,
        addIncome,
        getIncomes,
      }}
    >
      {children}
    </FinancialContext.Provider>
  );
};

export function useFinancial(): FinancialContextData {
  const context = useContext(FinancialContext);

  if (!context) {
    throw new Error('useFinancial must be used whitin a FinancialProvider');
  }

  return context;
}
