import React, { useCallback, useRef } from 'react';

import { v4 as uuid } from 'uuid';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Container } from './styles';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Input from '../../components/Input';
import PickerComponent from '../../components/PickerComponent';
import SubButtonLink from '../../components/SubButtonLink';

import { Label } from '../../components/Label/styles';

import { usePopup } from '../../hooks/popup';

interface CategoryFormData {
  type: 'gasto' | 'entrada';
  name: string;
}

interface CategoryStorage {
  categories: { id: string; name: string; type: 'gasto' | 'entrada' }[];
}

const AddCategory: React.FC = () => {
  const { navigate } = useNavigation();
  const { showPopup } = usePopup();
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: CategoryFormData) => {
      const key = `@GoFinance:${data.type}`;
      const catsJson = await AsyncStorage.getItem(key);
      const cats: CategoryStorage = catsJson
        ? JSON.parse(catsJson)
        : { categories: [] };

      const newCats: CategoryStorage = {
        categories: [
          {
            id: uuid(),
            name: data.name,
            type: data.type,
          },
          ...cats.categories,
        ],
      };

      await AsyncStorage.setItem(key, JSON.stringify(newCats));

      showPopup({
        title: 'Categoria adicionada',
        type: 'check',
        description: `A categoria [${data.name}] foi adicionada ${
          data.type === 'gasto' ? 'aos gastos' : 'às entradas'
        }`,
      });
    },
    [showPopup],
  );

  const goToCategoryRemove = useCallback(() => {
    navigate('RemoveCategory');
  }, [navigate]);

  const itemList = [
    {
      label: 'Categoria de gasto',
      value: 'gasto',
    },
    {
      label: 'Categoria de entrada',
      value: 'entrada',
    },
  ];

  return (
    <Container>
      <Header type="categoria" title="Adicionar categoria" />
      <Form ref={formRef} onSubmit={handleSubmit} style={{ marginBottom: 16 }}>
        <Label>Tipo da categoria:</Label>
        <PickerComponent
          name="type"
          placeholder="Toque para escolher o tipo da categoria"
          itemList={itemList}
          addRemoveOption={false}
        />
        <Label>Nome da categoria:</Label>
        <Input name="name" placeholder="Digite o nome da categoria" />
        <Button
          onPress={() => formRef.current?.submitForm()}
          containerStyle={{ marginTop: 32 }}
        >
          Adicionar categoria
        </Button>
        <SubButtonLink onPress={goToCategoryRemove}>
          Ir para a remoção de categorias
        </SubButtonLink>
      </Form>
    </Container>
  );
};

export default AddCategory;
