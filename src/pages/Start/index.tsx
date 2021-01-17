import React, { useCallback } from 'react';

import { useNavigation } from '@react-navigation/native';
import { Container } from './styles';

import { usePopup } from '../../hooks/popup';

import Button from '../../components/Button';
import Header from '../../components/Header';

const Start: React.FC = () => {
  const { showPopup } = usePopup();
  const { navigate } = useNavigation();

  const goToExpense = useCallback(() => {
    navigate('AddExpense');
  }, [navigate]);
  const goToAddCategory = useCallback(() => {
    navigate('AddCategory');
  }, [navigate]);
  const goToRemoveCategory = useCallback(() => {
    navigate('RemoveCategory');
  }, [navigate]);

  const showModal = useCallback(() => {
    showPopup({
      title: 'Sucesso!',
      type: 'check',
      description: 'Sucesso em executar a ação desejada ou clicada.',
    });
  }, [showPopup]);

  return (
    <Container>
      <Header type="home" title="" />
      <Button color="yellow" icon="dollar-sign">
        Resumo
      </Button>
      <Button color="red" onPress={goToExpense} icon="minus-circle">
        Adicionar Gasto
      </Button>
      <Button color="green" onPress={showModal} icon="plus-circle">
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
