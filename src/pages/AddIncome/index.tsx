import React, { useCallback, useEffect, useRef, useState } from 'react';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { ScrollView } from 'react-native-gesture-handler';
import CheckBox from '@react-native-community/checkbox';
import ptBR from 'date-fns/locale/pt-BR';
import { format } from 'date-fns';
import * as Yup from 'yup';
import { Container, CheckboxContainer, TinyLabel } from './styles';
import { Label } from '../../components/Label/styles';

import Header from '../../components/Header';
import Button from '../../components/Button';
import Input from '../../components/Input';
import PickerComponent from '../../components/PickerComponent';
import InputMask from '../../components/InputMask';

import { useCategories } from '../../hooks/categories';
import { useFinancial } from '../../hooks/financial';
import { usePopup } from '../../hooks/popup';

import getValidationErrors from '../../utils/getValidationErrors';

interface CategoriesForPicker {
  label: string;
  value: string;
}

interface ExpenseFormData {
  category: string;
  name: string;
  value: number;
  first: string;
  times: number;
}

const AddIncome: React.FC = () => {
  const { getCategories } = useCategories();
  const { addIncome } = useFinancial();
  const { showPopup } = usePopup();
  const formRef = useRef<FormHandles>(null);

  const [categoriesIncomesForPicker, setCategoriesIncomesForPicker] = useState<
    CategoriesForPicker[]
  >([]);

  const [checkboxRecurring, setCheckboxRecurring] = useState(true);

  const handleSubmit = useCallback(
    async (data: ExpenseFormData) => {
      try {
        const { category, name, value, first, times } = data;
        formRef.current?.setErrors([]);

        const schema = Yup.object().shape({
          name: Yup.string().required('O nome é obrigatório'),
          category: Yup.string().required('A categoria é obrigatória'),
          value: Yup.number().required('O valor é obrigatório'),
          times: checkboxRecurring
            ? Yup.number().required('Digite o número de parcelas')
            : Yup.number().optional(),
          first: checkboxRecurring
            ? Yup.string().required('Selecione o mês da primeira parcela')
            : Yup.string().optional(),
        });

        await schema.validate(
          {
            category,
            name,
            value,
            times: times || undefined,
            first: first || undefined,
          },
          {
            abortEarly: false,
          },
        );
        addIncome({
          category,
          name,
          value,
          first,
          times,
          recurring: checkboxRecurring,
        });
        formRef.current?.clearField('name');
        formRef.current?.clearField('value');
        formRef.current?.clearField('times');
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
        }

        showPopup({
          title: 'Erro ao adicionar a entrada',
          description: 'Um dos campos não foi preenchido corretamente.',
          type: 'x',
        });
      }
    },
    [addIncome, checkboxRecurring, showPopup],
  );

  const handleCheckboxRecurring = useCallback((newValue: boolean) => {
    setCheckboxRecurring(newValue);
  }, []);

  useEffect(() => {
    async function loadCategories() {
      const cats = getCategories();

      if (cats.incomes) {
        setCategoriesIncomesForPicker(
          cats.incomes.categories.map(item => {
            return {
              label: item.name,
              value: item.id,
            };
          }),
        );
      }
    }
    loadCategories();
  }, [getCategories]);

  const monthList = [];
  const actualDate = new Date();

  for (let i = -1; i < 6; i++) {
    const changedDate = new Date(
      actualDate.getFullYear(),
      actualDate.getMonth() + i,
      1,
    );
    monthList.push({
      month: changedDate.getMonth() + 1,
      name: format(changedDate, 'MMMM', { locale: ptBR }),
      year: changedDate.getFullYear(),
    });
  }

  const dateForPicker: CategoriesForPicker[] = monthList.map(item => {
    return {
      label: `${item.name} / ${item.year}`,
      value: JSON.stringify(item),
    };
  });

  return (
    <Container>
      <Header type="entrada" title="Adicionar entrada" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Form
          ref={formRef}
          onSubmit={handleSubmit}
          style={{ marginBottom: 16 }}
        >
          <Label>Categoria da entrada:</Label>
          <PickerComponent
            name="category"
            placeholder="Toque para escolher a categoria da entrada"
            itemList={categoriesIncomesForPicker}
            addRemoveOption
          />
          <Label>Nome da entrada:</Label>
          <Input
            name="name"
            placeholder="Digite o nome da entrada (exemplo: aluguel)"
          />
          <Label>Valor:</Label>
          <InputMask
            type="money"
            name="value"
            placeholder="Digite o valor da entrada, apenas números"
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
            <Label>É uma entrada recorrente?</Label>
          </CheckboxContainer>
          {checkboxRecurring && (
            <>
              <Label>Quando é a primeira?</Label>
              <PickerComponent
                name="first"
                itemList={dateForPicker}
                placeholder="Selecione a primeira"
              />
              <Label>Quantas vezes?</Label>
              <Input
                keyboardType="numeric"
                name="times"
                placeholder="Digite o número de parcelas"
              />
              <TinyLabel>
                Dica: digite 0 para entradas mensais fixas (por tempo
                indeterminado)
              </TinyLabel>
            </>
          )}
          <Button
            color="green"
            onPress={() => {
              formRef.current?.submitForm();
            }}
          >
            Adicionar entrada
          </Button>
        </Form>
      </ScrollView>
    </Container>
  );
};

export default AddIncome;
