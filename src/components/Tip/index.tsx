import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { Container, Text, IconContainer } from './styles';

const Tip: React.FC = ({ children }) => (
  <Container>
    <IconContainer>
      <Icon name="info" size={24} color="#eee" />
    </IconContainer>
    <Text>{children}</Text>
  </Container>
);

export default Tip;
