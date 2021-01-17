import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.View`
  margin: 16px 0px;
  padding: 16px 16px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 1px solid #eee;
  border-radius: 8px;
`;

export const IconContainer = styled.View`
  justify-content: center;
  align-items: center;
  margin-right: 16px;
`;

export const Text = styled.Text`
  flex: 1;
  color: #eee;
  font-size: 16px;
`;
