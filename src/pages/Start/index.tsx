import React, { useCallback, useEffect } from 'react';

import { useNavigation } from '@react-navigation/native';
import { Container } from './styles';

import Button from '../../components/Button';
import Header from '../../components/Header';
import { useFinancial } from '../../hooks/financial';

const Start: React.FC = () => {
  const { navigate } = useNavigation();
  const { getExpenses, getIncomes, addIncome, addExpense } = useFinancial();

  const goToExpense = useCallback(() => {
    navigate('AddExpense');
  }, [navigate]);
  const goToIncome = useCallback(() => {
    navigate('AddIncome');
  }, [navigate]);
  const goToAddCategory = useCallback(() => {
    navigate('AddCategory');
  }, [navigate]);
  const goToRemoveCategory = useCallback(() => {
    navigate('RemoveCategory');
  }, [navigate]);

  const showExpenses = useCallback(() => {
    console.log(getExpenses());
    console.log(getIncomes());
  }, [getExpenses, getIncomes]);

  useEffect(() => {
    addIncome({
      category: 'Supersonic',
      name: 'Salário',
      recurring: true,
      value: 4370,
      first: 'fev',
      times: 0,
    });
    addExpense({
      category: 'Contas fixas',
      name: 'Aluguel',
      value: 1070,
      recurring: true,
      first: 'fev',
      times: 0,
    });
    addExpense({
      category: 'Contas fixas',
      name: 'Spotify',
      value: 26.9,
      recurring: true,
      first: 'fev',
      times: 0,
    });
    addExpense({
      category: 'Débito',
      name: 'Gasto 1',
      value: 150,
      recurring: false,
    });
    addExpense({
      category: 'Débito',
      name: 'Gasto 2',
      value: 300,
      recurring: false,
    });
  }, []);

  return (
    <Container>
      <Header type="home" title="" />
      <Button color="yellow" onPress={showExpenses} icon="dollar-sign">
        Resumo
      </Button>
      <Button color="red" onPress={goToExpense} icon="minus-circle">
        Adicionar Gasto
      </Button>
      <Button color="green" onPress={goToIncome} icon="plus-circle">
        Adicionar Entrada
      </Button>
      <Button
        containerStyle={{ marginTop: 28 }}
        onPress={goToAddCategory}
        icon="plus-circle"
      >
        Adicionar Categorias
      </Button>
      <Button onPress={goToRemoveCategory} icon="minus-circle">
        Remover Categorias
      </Button>
    </Container>
  );
};

export default Start;
