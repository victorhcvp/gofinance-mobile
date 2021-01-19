import styled from 'styled-components/native';

interface PickerContainerProps {
  isErrored?: boolean;
}

export const PickerContainer = styled.View<PickerContainerProps>`
  padding: 0 8px;
  margin-top: 8px;
  background-color: #293240;
  border-width: 1px;
  border-style: solid;
  border-color: ${props => (props.isErrored ? '#f00' : '#293240')};
`;
