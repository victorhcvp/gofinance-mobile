import styled from 'styled-components/native';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HeaderComponentProps } from './interfaces';

export const Container = styled.View`
  padding: 32px 0px 24px 0px;
  position: relative;
`;

export const TitleContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
export const TitleBold = styled.Text`
  color: white;
  font-size: 38px;
  font-weight: bold;
`;
export const TitleNormal = styled.Text`
  color: white;
  font-size: 38px;
`;

export const Line = styled.View<HeaderComponentProps>`
  width: 100%;
  height: 1.3px;
  background-color: ${props => {
    if (props.type === 'resumo') {
      return '#FFD369';
    }
    if (props.type === 'gasto') {
      return '#FFC2C2';
    }
    if (props.type === 'entrada') {
      return '#F0FFD1';
    }
    return '#eee';
  }};
  margin-top: 16px;
`;

export const Title = styled.Text<HeaderComponentProps>`
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;
  margin-top: 16px;
  color: ${props => {
    if (props.type === 'resumo') {
      return '#FFD369';
    }
    if (props.type === 'gasto') {
      return '#FFC2C2';
    }
    if (props.type === 'entrada') {
      return '#F0FFD1';
    }
    return '#eee';
  }};
`;

export const BackButton = styled.TouchableOpacity`
  position: absolute;
  top: 48px;
  left: 0px;
`;
