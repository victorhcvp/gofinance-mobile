import React, { useCallback, useState } from 'react';
import { Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Container, PopupContainer, IconContainer, Title } from './styles';

const Popup: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(true);

  const handleContainerPress = useCallback(() => {
    setModalVisible(false);
  }, []);

  return (
    <Modal animationType="fade" transparent visible={modalVisible}>
      <Container>
        <PopupContainer onPress={handleContainerPress}>
          <IconContainer>
            <Icon name="check" size={100} color="#00cf3e" />
          </IconContainer>
          <Title>Sucesso!</Title>
        </PopupContainer>
      </Container>
    </Modal>
  );
};

export default Popup;
