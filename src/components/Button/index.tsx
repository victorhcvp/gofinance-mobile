import React, { useEffect, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { RectButtonProperties } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import {
  Container,
  ButtonTextContainer,
  ButtonText,
  IconContainer,
} from './styles';

interface ButtonProps extends RectButtonProperties {
  children: string;
  containerStyle?: {};
  color?: string;
  icon?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  containerStyle = {},
  color = '',
  icon = '',
  ...rest
}) => {
  const [iconState, setIconState] = useState(false);

  useEffect(() => {
    setIconState(!!icon);
  }, [icon]);

  return (
    <Container color={color} style={containerStyle} {...rest}>
      <ButtonTextContainer icon={icon}>
        <ButtonText icon={icon}>{children}</ButtonText>
        {iconState && (
          <IconContainer>
            <Icon name={icon} size={24} color="#312e38" />
          </IconContainer>
        )}
      </ButtonTextContainer>
    </Container>
  );
};

export default Button;
