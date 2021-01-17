import React, { useCallback, useState } from 'react';
import { TextInputProps } from 'react-native';
import { TextInputMask, TextInputMaskProps } from 'react-native-masked-text';

import Input from '../Input';

interface InputMaskProps extends TextInputMaskProps {
  name: string;
}

const InputMask: React.ForwardRefRenderFunction<
  TextInputProps,
  InputMaskProps
> = ({ type, ...rest }) => {
  const [value, setValue] = useState('');
  const [rawValue, setRawValue] = useState('');

  const handleOnChangeText = useCallback((maskedValue, unmaskedValue) => {
    setValue(maskedValue);
    setRawValue(unmaskedValue);
  }, []);

  return (
    <TextInputMask
      type={type}
      includeRawValueInChangeText
      value={value}
      onChangeText={handleOnChangeText}
      customTextInput={Input}
      customTextInputProps={{
        rawValue,
        ...rest,
      }}
      {...rest}
    />
  );
};

export default InputMask;
