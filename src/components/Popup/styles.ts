import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: #29324077;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const PopupContainer = styled.TouchableOpacity`
  background-color: #293240;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  padding: 16px 16px 48px 16px;
  width: 80%;
`;

export const IconContainer = styled.View`
  align-items: center;
  width: 100px;
  height: 100px;
  margin-bottom: 16px;
`;

export const Title = styled.Text`
  font-size: 22px;
  color: #eee;
`;

export const Description = styled.Text`
  font-size: 16px;
  text-align: center;
  margin-top: 16px;
  padding: 0 16px;
  color: #eee;
`;

export const ModalCloseTip = styled.Text`
  font-size: 14px;
  margin-top: 16px;
  color: #6e7683;
`;
