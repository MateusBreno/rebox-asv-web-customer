// ./src/components/inputs/InputCheckBox/index.tsx
import React, { InputHTMLAttributes } from 'react';

import { Container, Label, CheckBox } from './styles';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  label: any;
  onChange(): void;
  defaultChecked: boolean;
}

const InputCheckBox: React.FC<IProps> = ({
  label,
  onChange,
  defaultChecked,
  ...rest
}) => {
  return (
    <Container {...rest}>
      <Label
        label={label}
        control={
          <CheckBox
            color="primary"
            size="small"
            onChange={onChange}
            defaultChecked={defaultChecked}
          />
        }
      />
    </Container>
  );
};

export default InputCheckBox;
