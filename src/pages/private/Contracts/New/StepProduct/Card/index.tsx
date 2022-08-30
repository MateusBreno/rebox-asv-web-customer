import React, { useCallback, useState } from 'react';

import {
  IoClose,
  IoCubeOutline,
  IoInformationCircle,
  IoPricetags,
} from 'react-icons/io5';

import { ButtonDefault, ButtonOutline, Paragraph } from '@components/index';
import { ConfigStyles, ConfigValues } from '@config/index';
import { formatMoney, formatText } from '@utils/formatters';

import ProductDetails from './ProductDetails';
import { IProps } from './typing';

import {
  Container,
  PriceBig,
  PriceCents,
  PriceColumn,
  PriceContainer,
  PricePerMonthText,
  PricePrefix,
  ModalProduct,
} from './styles';

const CardProduct: React.FC<IProps> = ({ product, isSelected, onClick }) => {
  const [modalProductIsOpen, setModalProductIsOpen] = useState<boolean>(false);

  const [price, cents] = formatMoney
    .fromNumberToPrice(product.promotional_price)
    .replace('R$', '')
    .trim()
    .split(',');

  const changeModalProductIsOpen = () => {
    setModalProductIsOpen(prevState => !prevState);
  };

  return (
    <Container isSelected={isSelected}>
      <IoInformationCircle
        className="info"
        color={ConfigStyles.rebox.colors.black.main}
        size={18}
        onClick={changeModalProductIsOpen}
      />

      <Paragraph fontWeight={600}>{product.name.toUpperCase()}</Paragraph>

      <PriceContainer>
        <PricePrefix>R$</PricePrefix>
        <PriceBig>{price}</PriceBig>
        <PriceColumn>
          <PriceCents>{cents}</PriceCents>
          <PricePerMonthText>por mês</PricePerMonthText>
        </PriceColumn>
      </PriceContainer>

      <Paragraph
        nameColor="black"
        fontWeight={500}
        style={{ marginBottom: '2vh' }}
      >
        {product.description
          ? formatText.capitalizedFirstLetter(product.description)
          : `Direito a ${product.available_uses} utilizações durante um ano.`}
      </Paragraph>

      <ButtonOutline
        onClick={onClick}
        style={
          isSelected
            ? { borderColor: ConfigStyles.rebox.colors.white.main }
            : {}
        }
      >
        {isSelected ? 'Selecionado' : 'Selecionar'}
      </ButtonOutline>

      <ModalProduct
        isOpen={modalProductIsOpen}
        onRequestClose={changeModalProductIsOpen}
        contentLabel="Product"
      >
        <ButtonDefault
          iconLeft={IoClose}
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            maxWidth: 50,
            padding: 0,
          }}
          onClick={changeModalProductIsOpen}
        />
        <ProductDetails product={product} />
      </ModalProduct>
    </Container>
  );
};

export default CardProduct;
