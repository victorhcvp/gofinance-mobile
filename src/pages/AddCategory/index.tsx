import React, { useCallback, useRef } from 'react';
import { TextInput } from 'react-native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import { useNavigation } from '@react-navigation/native';
import { Container } from './styles';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Input from '../../components/Input';
import PickerComponent from '../../components/PickerComponent';
import SubButtonLink from '../../components/SubButtonLink';

import { Label } from '../../components/Label/styles';

import { usePopup } from '../../hooks/popup';
import { useCategories } from '../../hooks/categories';

interface CategoryFormData {
  type: 'gasto' | 'entrada';
  name: string;
}

const AddCategory: React.FC = () => {
  const { navigate } = useNavigation();
  const { showPopup } = usePopup();
  const { addCategory } = useCategories();
  const formRef = useRef<FormHandles>(null);
  const nameInputRef = useRef<TextInput>(null);

  const handleSubmit = useCallback(
    async (data: CategoryFormData) => {
      if (data.name.length === 0) {
        showPopup({
          title: 'Digite o nome da categoria',
          type: 'x',
          description: `Você deve digitar o nome da categoria que será adicionada.`,
        });
        return;
      }
      if (data.type.length === 0) {
        showPopup({
          title: 'Selecione o tipo da categoria',
          type: 'x',
          description: `Você deve selecionar o tipo da categoria.`,
        });
        return;
      }
      addCategory(data.name, data.type);
      formRef.current?.clearField('name');
    },
    [addCategory, showPopup],
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
        <Input
          ref={nameInputRef}
          name="name"
          placeholder="Digite o nome da categoria"
        />
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
