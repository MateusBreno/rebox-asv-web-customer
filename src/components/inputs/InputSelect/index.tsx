/* eslint-disable @typescript-eslint/ban-types */
import React, {
  SelectHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { useField } from '@unform/core';
import { FiAlertCircle } from 'react-icons/fi';

import { Container } from './styles';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  options: Array<{
    value: string;
    label: string;
  }>;
  containerStyle?: object;
  alertVisible?: boolean;
  isDisable?: boolean;
  selectedDefault?: string;
}

const InputSelect: React.FC<SelectProps> = ({
  name,
  options,
  containerStyle,
  alertVisible,
  selectedDefault,
  isDisable = false,
  ...rest
}) => {
  const inputRef = useRef<HTMLSelectElement>(null); // HTMLInputElement - vai dar ao inputRef as propriedades de um input

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { fieldName, defaultValue, error, registerField } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    // Verifica se o inputRef tem um valor/value. Se tiver preenchido = true. Se tiver vazio = false. !! Tranforma o value em booleano.
    setIsFilled(!!inputRef.current?.value); // inputRef pega o valor direto do Input. document.querySelector('input') e etc.
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container
      style={containerStyle}
      isErrored={!!error}
      isFilled={isFilled}
      isFocused={isFocused}
      isDisable={isDisable}
    >
      <select
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        id={name}
        {...rest}
      >
        <option value="" hidden>
          {rest.placeholder}
        </option>

        {options.map(option => (
          <option
            key={option.value}
            value={option.value}
            selected={selectedDefault === option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </Container>
  );
};

export default InputSelect;
