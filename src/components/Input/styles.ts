import styled from 'styled-components/native';

interface InputContainer {
  isErrored?: boolean;
}

export const Container = styled.View<InputContainer>`
  background-color: #293240;
  margin: 8px 0px 0px;
  padding: 0 16px;
  border-width: 1px;
  border-style: solid;
  border-color: ${props => (props.isErrored ? '#f00' : '#293240')};
`;

export const TextInput = styled.TextInput`
  color: #eee;
  font-size: 16px;
`;
