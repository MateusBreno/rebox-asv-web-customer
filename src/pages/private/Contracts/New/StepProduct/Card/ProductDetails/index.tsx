import React, { useCallback, useEffect, useState } from 'react';

import { Link, useHistory } from 'react-router-dom';

import { IconClose, IconConfirmation, IconStar } from '@assets/icons';
import { ButtonMain, ButtonOutline, LinkMain } from '@components/index';
import { ConfigValues, ConfigBase, ConfigRoutes } from '@config/index';
import Product from '@models/Product';
import { apiRebox, newContractStorageService } from '@services/index';
import { formatMoney, formatText } from '@utils/formatters';

import {
  AnnualSubscriptionText,
  BorderHeader,
  BorderHeaderText,
  Container,
  Divider,
  DividerTitle,
  DividerLine,
  EconomizeDiscount,
  EconomizeDiscountText,
  Economy,
  Items,
  InformationsExtra,
  InformationsExtraView,
  InformationsExtraLabel,
  InformationsExtraText,
  MaximumUsesText,
  PriceBig,
  PriceCents,
  PriceColumn,
  PriceContainer,
  PricePerMonthText,
  PricePrefix,
  ProductItem,
  ScratchedPrice,
  Title,
} from './styles';

interface IProps {
  product: Product;
}

interface ICarsClassifications {
  label: string;
  value: string;
}

const ProductDetails: React.FC<IProps> = ({ product }) => {
  const { push } = useHistory();

  const getDescount = (current_price: number, promotional_price: number) => {
    let discount = promotional_price * 100;
    discount /= current_price;
    discount = 100 - discount;
    return discount.toFixed(0);
  };

  const getAnnualPrice = () => {
    const { current_price, promotional_price, coverage_months_limit } = product;
    const price_new = promotional_price || current_price;
    return formatMoney.fromNumberToPrice(price_new * coverage_months_limit);
  };

  const [price, cents] = formatMoney
    .fromNumberToPrice(product.promotional_price)
    .replace('R$', '')
    .trim()
    .split(',');

  return (
    <Container>
      {product.tag === ConfigValues.rebox.product.tag.best_seller && (
        <BorderHeader>
          <BorderHeaderText>MAIS VENDIDO</BorderHeaderText>
        </BorderHeader>
      )}

      <Title>{product.name}</Title>

      <Economy>
        <ScratchedPrice>
          De {formatMoney.fromNumberToPrice(product.current_price)}
        </ScratchedPrice>
        <EconomizeDiscount>
          <EconomizeDiscountText>
            Economize{' '}
            {getDescount(product.current_price, product.promotional_price)}%
          </EconomizeDiscountText>
        </EconomizeDiscount>
      </Economy>

      <PriceContainer>
        <PricePrefix>R$</PricePrefix>
        <PriceBig>{price}</PriceBig>
        <PriceColumn>
          <PriceCents>{cents}</PriceCents>
          <PricePerMonthText>por mês</PricePerMonthText>
        </PriceColumn>
      </PriceContainer>

      <AnnualSubscriptionText>
        Total no ano {getAnnualPrice()}
      </AnnualSubscriptionText>

      <MaximumUsesText>
        {product.description
          ? formatText.capitalizedFirstLetter(product.description)
          : `Direito a ${product.available_uses} utilizações durante um ano.`}
      </MaximumUsesText>

      <Divider>
        <DividerLine />
        <DividerTitle>PARA SEU VEÍCULO</DividerTitle>
        <DividerLine />
      </Divider>

      <Items key={product.id}>
        {product.product_items.map(product_item => (
          <>
            {product_item.type ===
              ConfigValues.rebox.product_items.type.for_vehicle && (
              <ProductItem key={product_item.id}>
                <div>
                  <IconConfirmation />
                </div>
                <p>{product_item.description}</p>
              </ProductItem>
            )}
          </>
        ))}
      </Items>

      <Divider>
        <DividerLine />
        <DividerTitle>PARA VOCÊ</DividerTitle>
        <DividerLine />
      </Divider>

      <Items key={product.id}>
        {product.product_items
          .map(product_item => (
            <>
              {product_item.type ===
                ConfigValues.rebox.product_items.type.for_person && (
                <ProductItem key={product_item.id}>
                  <div>
                    <IconStar />
                  </div>
                  <p>{product_item.description}</p>
                </ProductItem>
              )}
            </>
          ))
          .reverse()}
      </Items>
    </Container>
  );
};

export default ProductDetails;
