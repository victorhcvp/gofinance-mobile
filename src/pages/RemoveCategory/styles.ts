import { RectButton, RectButtonProperties } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

interface CategoryContainerProps extends RectButtonProperties {
  selected: boolean;
}

export const Container = styled.View`
  flex: 1;
  background-color: #222831;
  padding: 0 16px;
`;

export const TitleContainer = styled.View`
  padding: 16px 0 8px;
  margin-bottom: 8px;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
`;

export const Title = styled.Text`
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  color: #eee;
`;

export const CategoriesContainer = styled.ScrollView`
  margin: 16px 0px;
  max-height: 50px;
`;

export const CategoryContainer = styled(RectButton)<CategoryContainerProps>`
  align-items: center;
  justify-content: center;
  background: #7d8796;
  padding: 10px 8px;
  border-radius: 8px;
`;

export const CategoryTitle = styled.Text<CategoryContainerProps>`
  font-size: 18px;
  color: ${props => (props.selected ? '#bbb' : '#eee')};
`;

export const CategoryBorder = styled.View<CategoryContainerProps>`
  align-items: center;
  justify-content: center;
  background: #7d8796;
  border: 2px solid ${props => (props.selected ? '#ff4530' : '#7d8796')};
  border-radius: 8px;
  margin: 0 8px;
`;
