// ./src/components/inputs/InputText/index.tsx
/* eslint-disable @typescript-eslint/ban-types */
import React, {
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { useField } from '@unform/core';
import { FiEye, FiEyeOff, FiSearch } from 'react-icons/fi';
import { IoMdLocate } from 'react-icons/io';

import { ConfigStyles } from '@config/index';

import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  containerStyle?: object;
  isDisable?: boolean;
  alertVisible?: boolean;

  showIconPassword?: boolean;
  widthIconPassword?: number;
  nameColorIconPassword?: string;
  opacityIconPassword?: number;

  showIconSearch?: boolean;
  widthIconSearch?: number;
  nameColorIconSearch?: string;
  opacityIconSearch?: number;

  showIconCurrentLocation?: boolean;
  widthIconCurrentLocation?: number;
  nameColorCurrentLocation?: string;
  opacityCurrentLocation?: number;
  functionIconCurrentLocation?: any;
}

const InputText: React.FC<InputProps> = ({
  name,
  containerStyle = {},
  isDisable = false,
  alertVisible,
  showIconPassword = false,
  widthIconPassword = 20,
  nameColorIconPassword = 'blue',
  opacityIconPassword = 1,

  showIconSearch = false,
  widthIconSearch = 20,
  nameColorIconSearch = 'blue',
  opacityIconSearch = 1,

  showIconCurrentLocation = false,
  widthIconCurrentLocation = 20,
  nameColorCurrentLocation = 'blue',
  opacityCurrentLocation = 1,
  functionIconCurrentLocation,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null); // HTMLInputElement - vai dar ao inputRef as propriedades de um input

  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isFilled, setIsFilled] = useState<boolean>(false);
  const [passwordIsVisible, setPasswordIsVisible] = useState<boolean>(false);

  const { fieldName, defaultValue, error, registerField } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    // Verifica se o inputRef tem um valor/value. Se tiver preenchido = true. Se tiver vazio = false. !! Tranforma o value em booleano.
    setIsFilled(!!inputRef.current?.value); // inputRef pega o valor direto do Input. document.querySelector('input') e etc.
  }, []);

  const togglePasswordIsVisible = useCallback(() => {
    setPasswordIsVisible(prevState => !prevState);
  }, []);

  const getCurrentLocation = useCallback(() => {
    console.log('');
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
      <input
        ref={inputRef}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        type={showIconPassword && !passwordIsVisible ? 'password' : 'text'}
        {...rest}
      />

      {showIconPassword &&
        (passwordIsVisible ? (
          <FiEyeOff
            size={widthIconPassword}
            onClick={togglePasswordIsVisible}
            cursor="pointer"
            opacity={opacityIconPassword}
            color={
              nameColorIconPassword === 'blue'
                ? ConfigStyles.rebox.colors.blue.main
                : ConfigStyles.rebox.colors.black.main
            }
          />
        ) : (
          <FiEye
            size={widthIconPassword}
            onClick={togglePasswordIsVisible}
            cursor="pointer"
            opacity={opacityIconPassword}
            color={
              nameColorIconPassword === 'blue'
                ? ConfigStyles.rebox.colors.blue.main
                : ConfigStyles.rebox.colors.black.main
            }
          />
        ))}

      {showIconCurrentLocation && (
        <IoMdLocate
          size={widthIconCurrentLocation}
          cursor="pointer"
          onClick={functionIconCurrentLocation || getCurrentLocation}
          opacity={opacityCurrentLocation}
          color={
            nameColorCurrentLocation === 'blue'
              ? ConfigStyles.rebox.colors.blue.main
              : ConfigStyles.rebox.colors.black.main
          }
        />
      )}

      {showIconSearch &&
        (isFocused ? (
          <FiSearch
            size={widthIconSearch}
            cursor="pointer"
            onClick={handleInputFocus}
            opacity={1}
            color={ConfigStyles.rebox.colors.blue.main}
          />
        ) : (
          <FiSearch
            size={widthIconSearch}
            cursor="pointer"
            onClick={handleInputFocus}
            opacity={opacityIconSearch}
            color={
              nameColorIconSearch === 'blue'
                ? ConfigStyles.rebox.colors.blue.main
                : ConfigStyles.rebox.colors.black.main
            }
          />
        ))}
    </Container>
  );
};

export default InputText;
