import React, { useCallback } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { RectButtonProperties } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import {
  Container,
  TitleContainer,
  TitleBold,
  TitleNormal,
  Line,
  Title,
  BackButton,
} from './styles';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HeaderProps } from './interfaces';

const Header: React.FC<HeaderProps> = ({ type, title }) => {
  const { goBack } = useNavigation();

  const handleGoBack = useCallback(() => {
    goBack();
  }, [goBack]);

  if (type !== 'home') {
    return (
      <Container>
        <TitleContainer>
          <TitleBold>Go</TitleBold>
          <TitleNormal>Finance</TitleNormal>
        </TitleContainer>
        <Line type={type} />
        <Title type={type}>{title}</Title>
        <BackButton onPress={handleGoBack}>
          <Icon name="chevron-left" size={24} color="#EEE" />
        </BackButton>
      </Container>
    );
  }
  return (
    <Container>
      <TitleContainer>
        <TitleBold>Go</TitleBold>
        <TitleNormal>Finance</TitleNormal>
      </TitleContainer>
    </Container>
  );
};

export default Header;
