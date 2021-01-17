import React, { useCallback, useRef, useState } from 'react';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { ScrollView } from 'react-native-gesture-handler';
import CheckBox from '@react-native-community/checkbox';
import { Container, CheckboxContainer, TinyLabel } from './styles';
import { Label } from '../../components/Label/styles';

import Header from '../../components/Header';
import Button from '../../components/Button';
import Input from '../../components/Input';
import PickerComponent from '../../components/PickerComponent';
import InputMask from '../../components/InputMask';

const AddExpense: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const [checkboxRecurring, setCheckboxRecurring] = useState(false);

  const handleSubmit = useCallback(() => {}, []);

  const handleCheckboxRecurring = useCallback((newValue: boolean) => {
    setCheckboxRecurring(newValue);
  }, []);

  const itemList = [
    {
      label: 'Gasto Fixo',
      value: 'fixo',
    },
    {
      label: 'Parcelamentos',
      value: 'parcelamentos',
    },
  ];

  return (
    <Container>
      <Header type="gasto" title="Adicionar gasto" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Form
          ref={formRef}
          onSubmit={handleSubmit}
          style={{ marginBottom: 16 }}
        >
          <Label>Categoria do gasto:</Label>
          <PickerComponent
            name="category"
            placeholder="Toque para escolher a categoria do gasto"
            itemList={itemList}
            addRemoveOption
          />
          <Label>Nome do gasto:</Label>
          <Input
            name="name"
            placeholder="Digite o nome do gasto (exemplo: aluguel)"
          />
          <Label>Valor:</Label>
          <InputMask
            type="money"
            name="value"
            placeholder="Digite o valor do gasto, apenas números"
            defaultValue="0,00"
            keyboardType="numeric"
            options={{
              precision: 2,
              separator: ',',
              delimiter: '.',
              unit: '',
              suffixUnit: '',
            }}
          />
          <CheckboxContainer>
            <CheckBox
              style={{ marginTop: 16 }}
              tintColors={{ false: '#eee', true: '#eee' }}
              tintColor="#eee"
              boxType="square"
              onCheckColor="#000"
              onFillColor="#eee"
              onTintColor="#eee"
              disabled={false}
              value={checkboxRecurring}
              onValueChange={newValue => handleCheckboxRecurring(newValue)}
            />
            <Label>É um gasto recorrente?</Label>
          </CheckboxContainer>
          {checkboxRecurring && (
            <>
              <Label>Quando é a primeira?</Label>
              <PickerComponent
                itemList={itemList}
                placeholder="Selecione a primeira"
                name="first"
              />
              <Label>Quantas vezes?</Label>
              <Input name="times" placeholder="Digite o número de parcelas" />
              <TinyLabel>
                Dica: digite 0 para gastos mensais fixos (por tempo
                indeterminado)
              </TinyLabel>
            </>
          )}
          <Button color="red">Adicionar gasto</Button>
        </Form>
      </ScrollView>
    </Container>
  );
};

export default AddExpense;
