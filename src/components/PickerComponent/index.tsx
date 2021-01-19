import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { useField } from '@unform/core';
import { PickerContainer } from './styles';

interface PickerProps {
  itemList: { label: string; value: string }[];
  addRemoveOption?: boolean;
  placeholder: string;
  name: string;
}

interface InputValueReference {
  value: string;
}

const PickerComponent: React.FC<PickerProps> = ({
  itemList,
  placeholder,
  addRemoveOption = false,
  name,
}) => {
  const pickerRef = useRef<any>(null);

  const { navigate } = useNavigation();

  const [selectedValue, setSelectedValue] = useState<React.ReactText>('');
  const [addRemove, setAddRemove] = useState(false);

  const { fieldName, registerField, defaultValue = '', error } = useField(name);
  const pickerValueRef = useRef<InputValueReference>({ value: defaultValue });

  const handlePickerChange = useCallback(
    (itemValue: React.ReactText) => {
      if (itemValue === 'add') {
        navigate('AddCategory');
        return;
      }
      if (itemValue === 'remove') {
        navigate('RemoveCategory');
        return;
      }
      if (pickerRef.current) {
        pickerRef.current.value = itemValue;
      }
      setSelectedValue(itemValue);
    },
    [navigate],
  );

  const pickerStyling = {
    color: '#EEE',
  };

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: pickerRef.current,
      path: 'value',
      clearValue() {
        pickerValueRef.current.value = '';
        pickerRef.current.clear();
      },
      setValue(value) {
        pickerValueRef.current.value = value;
        pickerRef.current.setNativeProps({ text: value });
      },
    });
  }, [fieldName, registerField]);

  useEffect(() => {
    setAddRemove(addRemoveOption);
  }, [addRemoveOption]);

  useEffect(() => {
    pickerRef.current.value = defaultValue;
  }, [defaultValue]);

  return addRemove ? (
    <PickerContainer isErrored={!!error}>
      <Picker
        ref={pickerRef}
        selectedValue={selectedValue}
        onValueChange={handlePickerChange}
        style={pickerStyling}
        dropdownIconColor="#eeeeee"
      >
        <Picker.Item color="gray" label={placeholder} value="" />
        {itemList.map(item => (
          <Picker.Item
            color="black"
            key={item.value}
            label={item.label}
            value={item.value}
          />
        ))}
        <Picker.Item
          color="green"
          key="add"
          label="Adicionar uma nova categoria"
          value="add"
        />
        <Picker.Item
          color="red"
          key="remove"
          label="Remover uma categoria"
          value="remove"
        />
      </Picker>
    </PickerContainer>
  ) : (
    <PickerContainer isErrored={!!error}>
      <Picker
        ref={pickerRef}
        selectedValue={selectedValue}
        onValueChange={handlePickerChange}
        style={pickerStyling}
        dropdownIconColor="#eeeeee"
      >
        <Picker.Item color="gray" label={placeholder} value="" />
        {itemList.map(item => (
          <Picker.Item key={item.value} label={item.label} value={item.value} />
        ))}
      </Picker>
    </PickerContainer>
  );
};

export default PickerComponent;
