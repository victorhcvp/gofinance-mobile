import React, { useCallback, useEffect, useRef, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  Container,
  TitleContainer,
  Title,
  CategoriesContainer,
  CategoryContainer,
  CategoryTitle,
  CategoryBorder,
} from './styles';
import Header from '../../components/Header';
import SubButtonLink from '../../components/SubButtonLink';
import Tip from '../../components/Tip';

import { useCategories } from '../../hooks/categories';

import Button from '../../components/Button';

interface CategoryStorage {
  categories: { id: string; name: string; type: 'gasto' | 'entrada' }[];
}

interface MarkedForRemove {
  ids: string[];
}

const RemoveCategory: React.FC = () => {
  const { navigate } = useNavigation();
  const { getCategories, removeCategories } = useCategories();

  const [categoriesGasto, setCategoriesGasto] = useState<CategoryStorage>({
    categories: [],
  });
  const [categoriesEntrada, setCategoriesEntrada] = useState<CategoryStorage>({
    categories: [],
  });
  const [
    markedForRemoveGasto,
    setMarkedForRemoveGasto,
  ] = useState<MarkedForRemove>({ ids: [] });
  const [
    markedForRemoveEntrada,
    setMarkedForRemoveEntrada,
  ] = useState<MarkedForRemove>({ ids: [] });
  const [categoriesSelected, setCategoriesSelected] = useState<MarkedForRemove>(
    { ids: [] },
  );

  const handleRemoveCategories = useCallback(async () => {
    removeCategories(categoriesSelected.ids);
  }, [categoriesSelected.ids, removeCategories]);

  const goToAddCategory = useCallback(() => {
    navigate('AddCategory');
  }, [navigate]);

  useEffect(() => {
    async function loadCategories() {
      const cats = getCategories();

      if (cats.expenses) {
        setCategoriesGasto(cats.expenses);
      }
      if (cats.incomes) {
        setCategoriesEntrada(cats.incomes);
      }
    }
    loadCategories();
  }, [getCategories]);

  const handleCategoryPress = useCallback(
    (id: string, type: string) => {
      if (!categoriesSelected.ids.find(catId => catId === id)) {
        if (type === 'gasto') {
          setMarkedForRemoveGasto({ ids: [...markedForRemoveGasto.ids, id] });
        } else {
          setMarkedForRemoveEntrada({
            ids: [...markedForRemoveEntrada.ids, id],
          });
        }
        setCategoriesSelected({ ids: [...categoriesSelected.ids, id] });
      } else {
        const newMarkedForRemove =
          type === 'gasto'
            ? markedForRemoveGasto.ids.filter(item => item !== id)
            : markedForRemoveEntrada.ids.filter(item => item !== id);
        const newMarkedForRemoveAll =
          type === 'gasto'
            ? [
                ...markedForRemoveGasto.ids.filter(item => item !== id),
                ...markedForRemoveEntrada.ids,
              ]
            : [
                ...markedForRemoveEntrada.ids.filter(item => item !== id),
                ...markedForRemoveGasto.ids,
              ];
        if (type === 'gasto') {
          setMarkedForRemoveGasto({ ids: newMarkedForRemove });
        } else {
          setMarkedForRemoveEntrada({ ids: newMarkedForRemove });
        }
        setCategoriesSelected({ ids: newMarkedForRemoveAll });
      }
    },
    [
      markedForRemoveGasto.ids,
      markedForRemoveEntrada.ids,
      categoriesSelected.ids,
    ],
  );

  const mapCategories = useCallback(
    (type: string) => {
      const categoriesToMap =
        type === 'gasto' ? categoriesGasto : categoriesEntrada;
      return categoriesToMap.categories.map(cat => (
        <CategoryBorder
          key={cat.id}
          selected={
            !!categoriesSelected.ids.find(
              catsSelected => catsSelected === cat.id,
            )
          }
        >
          <CategoryContainer
            selected={
              !!categoriesSelected.ids.find(
                catsSelected => catsSelected === cat.id,
              )
            }
            onPress={() => handleCategoryPress(cat.id, cat.type)}
          >
            <CategoryTitle
              selected={
                !!categoriesSelected.ids.find(
                  catsSelected => catsSelected === cat.id,
                )
              }
            >
              {cat.name}
            </CategoryTitle>
          </CategoryContainer>
        </CategoryBorder>
      ));
    },
    [
      categoriesEntrada,
      categoriesGasto,
      categoriesSelected.ids,
      handleCategoryPress,
    ],
  );

  return (
    <Container>
      <Header type="categoria" title="Remover categoria" />

      <ScrollView>
        <Tip>Toque para marcar as categorias que deseja remover</Tip>

        <TitleContainer>
          <Title>Categorias de gasto:</Title>
        </TitleContainer>

        <CategoriesContainer horizontal showsHorizontalScrollIndicator={false}>
          {categoriesGasto && mapCategories('gasto')}
        </CategoriesContainer>

        <TitleContainer>
          <Title>Categorias de entrada:</Title>
        </TitleContainer>

        <CategoriesContainer horizontal showsHorizontalScrollIndicator={false}>
          {categoriesEntrada && mapCategories('entrada')}
        </CategoriesContainer>

        <Button onPress={handleRemoveCategories}>
          Remover categorias selecionadas
        </Button>

        <SubButtonLink onPress={goToAddCategory}>
          Ir para a adição de categorias
        </SubButtonLink>
      </ScrollView>
    </Container>
  );
};

export default RemoveCategory;
