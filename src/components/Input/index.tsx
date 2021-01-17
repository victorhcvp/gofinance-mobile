import React, { forwardRef, useCallback, useEffect, useRef } from 'react';
import { TextInputProps } from 'react-native';
import { useField } from '@unform/core';
import { Container, TextInput } from './styles';

interface InputProps extends TextInputProps {
  name: string;
}

interface InputValueReference {
  value: string;
}

const Input: React.ForwardRefRenderFunction<TextInputProps, InputProps> = (
  { name, onChangeText, ...rest },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ref,
) => {
  const inputRef = useRef<any>(null);

  const { fieldName, registerField, defaultValue = '' } = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

  useEffect(() => {
    inputRef.current.value = defaultValue;
  }, [defaultValue]);

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      clearValue() {
        inputValueRef.current.value = '';
        inputRef.current.clear();
      },
      setValue(value) {
        inputValueRef.current.value = value;
        inputRef.current.setNativeProps({ text: value });
      },
    });
  }, [fieldName, registerField]);

  const handleOnChange = useCallback(
    value => {
      if (inputRef.current) {
        inputRef.current.value = value;
      }
      if (onChangeText) onChangeText(value);
    },
    [onChangeText],
  );

  return (
    <Container>
      <TextInput
        ref={inputRef}
        keyboardAppearance="dark"
        defaultValue={defaultValue}
        placeholderTextColor="#eee"
        onChangeText={handleOnChange}
        {...rest}
      />
    </Container>
  );
};

export default forwardRef(Input);
