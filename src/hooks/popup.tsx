import React, { createContext, useContext, useCallback, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {
  Container,
  PopupContainer,
  IconContainer,
  Title,
  Description,
  ModalCloseTip,
} from '../components/Popup/styles';

export interface PopupMessage {
  id: string;
  type: 'check' | 'x' | 'info';
  title: string;
  description?: string;
}

interface PopupContextData {
  showPopup(message: Omit<PopupMessage, 'id'>): void;
  hidePopup(): void;
}

const PopupContext = createContext<PopupContextData>({} as PopupContextData);

export const PopupProvider: React.FC = ({ children }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState<PopupMessage>();
  const [color, setColor] = useState('#0083cf');

  const showPopup = useCallback(
    ({ type, title, description }: Omit<PopupMessage, 'id'>) => {
      const id = uuid();

      const popup = {
        id,
        type,
        title,
        description,
      };
      if (popup.type === 'check') {
        setColor('#00cf3e');
      } else if (popup.type === 'x') {
        setColor('#cf000a');
      } else {
        setColor('#0083cf');
      }

      setMessage(popup);
      setModalVisible(true);
    },
    [],
  );

  const hidePopup = useCallback(() => {
    setModalVisible(false);
  }, []);

  return (
    <PopupContext.Provider value={{ showPopup, hidePopup }}>
      {children}
      {message && (
        <Modal animationType="fade" transparent visible={modalVisible}>
          <Container>
            <PopupContainer onPress={hidePopup}>
              <IconContainer>
                <Icon name={message.type} size={100} color={color} />
              </IconContainer>
              <Title>{message.title}</Title>
              {message.description && (
                <Description>{message.description}</Description>
              )}
              <ModalCloseTip>Toque para fechar</ModalCloseTip>
            </PopupContainer>
          </Container>
        </Modal>
      )}
    </PopupContext.Provider>
  );
};

export function usePopup(): PopupContextData {
  const context = useContext(PopupContext);

  if (!context) {
    throw new Error('usePopup must be used whitin a PopupProvider');
  }

  return context;
}
