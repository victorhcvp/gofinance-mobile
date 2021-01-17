import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

interface ButtonBackgroundColor {
  color: string;
}

interface ButtonTextContainer {
  icon: string;
}

export const Container = styled(RectButton)<ButtonBackgroundColor>`
  height: 60px;
  background-color: ${props => {
    if (props.color === 'yellow') {
      return '#FFD369';
    }
    if (props.color === 'red') {
      return '#FFC2C2';
    }
    if (props.color === 'green') {
      return '#F0FFD1';
    }
    return '#eee';
  }};
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  margin: 8px 0px;
`;

export const ButtonTextContainer = styled.View<ButtonTextContainer>`
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: ${props => (props.icon ? 'flex-start' : 'center')};
`;

export const ButtonText = styled.Text<ButtonTextContainer>`
  color: #393e46;
  font-size: 18px;
  text-transform: uppercase;
  font-weight: bold;
  align-items: center;
  margin-left: ${props => (props.icon ? '24px' : '0px')};
`;

export const IconContainer = styled.View`
  position: absolute;
  right: 0;
  margin-right: 24px;
`;
