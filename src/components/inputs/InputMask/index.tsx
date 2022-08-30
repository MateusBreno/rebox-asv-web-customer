// ./src/components/inputs/InputMask/index.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { useField } from '@unform/core';
import { FiAlertCircle } from 'react-icons/fi';
import { Props as ReactInputMaskProps } from 'react-input-mask';

import { Container, ReactInputMaskStyled } from './styles';

interface InputProps extends ReactInputMaskProps {
  name: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  containerStyle?: object;
  alertVisible?: boolean;
  isDisable?: boolean;
}

const InputMask: React.FC<InputProps> = ({
  name,
  containerStyle = {},
  alertVisible,
  isDisable = false,
  ...rest
}) => {
  const inputRef = useRef(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { fieldName, defaultValue, error, registerField } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    // Verifica se o inputRef tem um valor/value. Se tiver preenchido = true. Se tiver vazio = false. !! Transforma o value em booleano.
    setIsFilled(!!inputRef.current); // inputRef pega o valor direto do Input. document.querySelector('input') e etc.
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
    >
      <ReactInputMaskStyled
        isDisable={isDisable}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />
    </Container>
  );
};
export default InputMask;
