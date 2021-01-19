import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import { TextInputProps } from 'react-native';
import { useField } from '@unform/core';
import { Container, TextInput } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  rawValue?: string;
}

interface InputValueReference {
  value: string;
}

interface InputRef {
  focus(): void;
}

const Input: React.ForwardRefRenderFunction<InputRef, InputProps> = (
  { name, onChangeText, rawValue, ...rest },
  ref,
) => {
  const inputRef = useRef<any>(null);

  const { fieldName, registerField, defaultValue = '', error } = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

  useEffect(() => {
    inputRef.current.value = defaultValue;
  }, [defaultValue]);

  useImperativeHandle(ref, () => ({
    focus() {
      inputRef.current.focus();
    },
  }));

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      // path: 'value',
      clearValue() {
        inputValueRef.current.value = '';
        inputRef.current.clear();
      },
      setValue(reference: any, value) {
        inputValueRef.current.value = value;
        inputRef.current.setNativeProps({ text: value });
      },
      getValue(inputRefGet) {
        return rawValue || inputRefGet.value;
      },
    });
  }, [fieldName, registerField, rawValue]);

  const handleOnChange = useCallback(
    value => {
      if (inputRef.current) {
        inputRef.current.value = value;
        inputValueRef.current.value = value;
      }
      if (onChangeText) onChangeText(value);
    },
    [onChangeText],
  );

  return (
    <Container isErrored={!!error}>
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
